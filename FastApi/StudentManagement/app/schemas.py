from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class StudentBase(BaseModel):
    student_number: str = Field(min_length=3, max_length=20, examples=["CSE-2026-001"])
    first_name: str = Field(min_length=1, max_length=50)
    last_name: str = Field(min_length=1, max_length=50)
    email: EmailStr
    date_of_birth: date
    department: str = Field(min_length=2, max_length=100)
    year: int = Field(ge=1, le=8)
    is_active: bool = True

    @field_validator("student_number")
    @classmethod
    def normalize_student_number(cls, value: str) -> str:
        return value.strip().upper()

    @field_validator("first_name", "last_name", "department")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()

    @field_validator("date_of_birth")
    @classmethod
    def reject_future_birth_date(cls, value: date) -> date:
        if value >= date.today():
            raise ValueError("date_of_birth must be in the past")
        return value


class StudentCreate(StudentBase):
    pass


class StudentUpdate(BaseModel):
    first_name: str | None = Field(default=None, min_length=1, max_length=50)
    last_name: str | None = Field(default=None, min_length=1, max_length=50)
    email: EmailStr | None = None
    department: str | None = Field(default=None, min_length=2, max_length=100)
    year: int | None = Field(default=None, ge=1, le=8)
    is_active: bool | None = None


class StudentRead(StudentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class StudentPage(BaseModel):
    items: list[StudentRead]
    total: int
    limit: int
    offset: int


class CourseCreate(BaseModel):
    code: str = Field(min_length=2, max_length=20, examples=["CS101"])
    name: str = Field(min_length=2, max_length=100)
    credits: int = Field(ge=1, le=10)

    @field_validator("code")
    @classmethod
    def normalize_code(cls, value: str) -> str:
        return value.strip().upper()


class CourseRead(CourseCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int


class EnrollmentCreate(BaseModel):
    student_id: int = Field(gt=0)
    course_id: int = Field(gt=0)


class EnrollmentRead(EnrollmentCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    enrolled_at: datetime
    grade: str | None


class GradeUpdate(BaseModel):
    grade: str = Field(pattern=r"^(A\+|A|B\+|B|C\+|C|D|F)$")


class DepartmentSummary(BaseModel):
    department: str
    student_count: int


class Message(BaseModel):
    message: str