import csv
import io
import logging
from typing import Annotated

from fastapi import APIRouter, BackgroundTasks, File, Query, Response, UploadFile, status
from sqlalchemy import func, or_, select
from sqlalchemy.exc import IntegrityError

from app import models, schemas
from app.dependencies import Protected, SessionDep
from app.exceptions import ResourceNotFoundError

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1")


def log_activity(action: str, entity_id: int) -> None:
    logger.info("Student management activity: %s entity_id=%s", action, entity_id)


def get_student_or_raise(database: SessionDep, student_id: int) -> models.Student:
    student = database.get(models.Student, student_id)
    if student is None:
        raise ResourceNotFoundError("Student", student_id)
    return student


@router.post(
    "/students",
    response_model=schemas.StudentRead,
    status_code=status.HTTP_201_CREATED,
    tags=["Students"],
    summary="Register a student",
)
def create_student(
    student_data: schemas.StudentCreate,
    database: SessionDep,
    _api_key: Protected,
    background_tasks: BackgroundTasks,
) -> models.Student:
    student = models.Student(**student_data.model_dump())
    database.add(student)
    try:
        database.commit()
    except IntegrityError as error:
        database.rollback()
        raise ValueError("Student number or email already exists") from error
    database.refresh(student)
    background_tasks.add_task(log_activity, "student_created", student.id)
    return student


@router.get(
    "/students",
    response_model=schemas.StudentPage,
    tags=["Students"],
    summary="Search and paginate students",
)
def list_students(
    database: SessionDep,
    department: str | None = None,
    active: bool | None = None,
    search: str | None = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
    offset: Annotated[int, Query(ge=0)] = 0,
) -> schemas.StudentPage:
    filters = []
    if department:
        filters.append(models.Student.department == department)
    if active is not None:
        filters.append(models.Student.is_active == active)
    if search:
        term = f"%{search}%"
        filters.append(
            or_(
                models.Student.first_name.ilike(term),
                models.Student.last_name.ilike(term),
                models.Student.student_number.ilike(term),
            )
        )

    total = database.scalar(select(func.count(models.Student.id)).where(*filters)) or 0
    query = (
        select(models.Student)
        .where(*filters)
        .order_by(models.Student.last_name, models.Student.first_name)
        .offset(offset)
        .limit(limit)
    )
    students = list(database.scalars(query))
    return schemas.StudentPage(items=students, total=total, limit=limit, offset=offset)


@router.get("/students/{student_id}", response_model=schemas.StudentRead, tags=["Students"])
def get_student(student_id: int, database: SessionDep) -> models.Student:
    return get_student_or_raise(database, student_id)


@router.patch("/students/{student_id}", response_model=schemas.StudentRead, tags=["Students"])
def update_student(
    student_id: int,
    student_data: schemas.StudentUpdate,
    database: SessionDep,
    _api_key: Protected,
) -> models.Student:
    student = get_student_or_raise(database, student_id)
    for field, value in student_data.model_dump(exclude_unset=True).items():
        setattr(student, field, value.strip() if isinstance(value, str) else value)
    try:
        database.commit()
    except IntegrityError as error:
        database.rollback()
        raise ValueError("Email already exists") from error
    database.refresh(student)
    return student


@router.delete(
    "/students/{student_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Students"],
)
def delete_student(
    student_id: int,
    database: SessionDep,
    _api_key: Protected,
) -> Response:
    student = get_student_or_raise(database, student_id)
    database.delete(student)
    database.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post(
    "/courses",
    response_model=schemas.CourseRead,
    status_code=status.HTTP_201_CREATED,
    tags=["Courses"],
)
def create_course(
    course_data: schemas.CourseCreate,
    database: SessionDep,
    _api_key: Protected,
) -> models.Course:
    course = models.Course(**course_data.model_dump())
    database.add(course)
    try:
        database.commit()
    except IntegrityError as error:
        database.rollback()
        raise ValueError("Course code already exists") from error
    database.refresh(course)
    return course


@router.get("/courses", response_model=list[schemas.CourseRead], tags=["Courses"])
def list_courses(database: SessionDep) -> list[models.Course]:
    return list(database.scalars(select(models.Course).order_by(models.Course.code)))


@router.post(
    "/enrollments",
    response_model=schemas.EnrollmentRead,
    status_code=status.HTTP_201_CREATED,
    tags=["Enrollments"],
)
def enroll_student(
    enrollment_data: schemas.EnrollmentCreate,
    database: SessionDep,
    _api_key: Protected,
) -> models.Enrollment:
    if database.get(models.Student, enrollment_data.student_id) is None:
        raise ResourceNotFoundError("Student", enrollment_data.student_id)
    if database.get(models.Course, enrollment_data.course_id) is None:
        raise ResourceNotFoundError("Course", enrollment_data.course_id)

    enrollment = models.Enrollment(**enrollment_data.model_dump())
    database.add(enrollment)
    try:
        database.commit()
    except IntegrityError as error:
        database.rollback()
        raise ValueError("Student is already enrolled in this course") from error
    database.refresh(enrollment)
    return enrollment


@router.patch(
    "/enrollments/{enrollment_id}/grade",
    response_model=schemas.EnrollmentRead,
    tags=["Enrollments"],
)
def assign_grade(
    enrollment_id: int,
    grade_data: schemas.GradeUpdate,
    database: SessionDep,
    _api_key: Protected,
) -> models.Enrollment:
    enrollment = database.get(models.Enrollment, enrollment_id)
    if enrollment is None:
        raise ResourceNotFoundError("Enrollment", enrollment_id)
    enrollment.grade = grade_data.grade
    database.commit()
    database.refresh(enrollment)
    return enrollment


@router.get(
    "/analytics/departments",
    response_model=list[schemas.DepartmentSummary],
    tags=["Analytics"],
)
def department_summary(database: SessionDep) -> list[schemas.DepartmentSummary]:
    query = (
        select(models.Student.department, func.count(models.Student.id))
        .group_by(models.Student.department)
        .order_by(models.Student.department)
    )
    return [
        schemas.DepartmentSummary(department=department, student_count=count)
        for department, count in database.execute(query)
    ]


@router.post("/imports/students/preview", tags=["Imports"])
async def preview_student_csv(
    _api_key: Protected,
    file: Annotated[UploadFile, File(description="UTF-8 CSV file with a header row")],
) -> dict[str, object]:
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise ValueError("A .csv file is required")
    content = (await file.read()).decode("utf-8-sig")
    rows = list(csv.DictReader(io.StringIO(content)))
    return {"filename": file.filename, "row_count": len(rows), "preview": rows[:5]}