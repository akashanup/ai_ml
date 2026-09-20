from fastapi.testclient import TestClient


def test_health_and_middleware(client: TestClient) -> None:
    response = client.get("/health", headers={"X-Request-ID": "test-request"})

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.headers["X-Request-ID"] == "test-request"
    assert "X-Process-Time" in response.headers


def test_protected_endpoint_requires_api_key(
    client: TestClient, student_payload: dict[str, object]
) -> None:
    response = client.post("/api/v1/students", json=student_payload)

    assert response.status_code == 401


def test_student_crud_search_and_validation(
    client: TestClient,
    api_headers: dict[str, str],
    student_payload: dict[str, object],
) -> None:
    created = client.post("/api/v1/students", json=student_payload, headers=api_headers)
    assert created.status_code == 201
    student_id = created.json()["id"]

    search = client.get("/api/v1/students?department=Computer%20Science&search=Asha")
    assert search.status_code == 200
    assert search.json()["total"] == 1

    updated = client.patch(
        f"/api/v1/students/{student_id}",
        json={"year": 3},
        headers=api_headers,
    )
    assert updated.status_code == 200
    assert updated.json()["year"] == 3

    invalid_payload = {**student_payload, "student_number": "CSE-2026-002", "year": 9}
    invalid = client.post("/api/v1/students", json=invalid_payload, headers=api_headers)
    assert invalid.status_code == 422

    deleted = client.delete(f"/api/v1/students/{student_id}", headers=api_headers)
    assert deleted.status_code == 204
    assert client.get(f"/api/v1/students/{student_id}").status_code == 404


def test_course_enrollment_grade_and_analytics(
    client: TestClient,
    api_headers: dict[str, str],
    student_payload: dict[str, object],
) -> None:
    student = client.post(
        "/api/v1/students", json=student_payload, headers=api_headers
    ).json()
    course_response = client.post(
        "/api/v1/courses",
        json={"code": "CS101", "name": "Programming Fundamentals", "credits": 4},
        headers=api_headers,
    )
    assert course_response.status_code == 201
    course = course_response.json()

    enrollment_response = client.post(
        "/api/v1/enrollments",
        json={"student_id": student["id"], "course_id": course["id"]},
        headers=api_headers,
    )
    assert enrollment_response.status_code == 201
    enrollment = enrollment_response.json()

    graded = client.patch(
        f"/api/v1/enrollments/{enrollment['id']}/grade",
        json={"grade": "A+"},
        headers=api_headers,
    )
    assert graded.status_code == 200
    assert graded.json()["grade"] == "A+"

    summary = client.get("/api/v1/analytics/departments")
    assert summary.json() == [{"department": "Computer Science", "student_count": 1}]


def test_csv_upload_and_websocket(
    client: TestClient, api_headers: dict[str, str]
) -> None:
    upload = client.post(
        "/api/v1/imports/students/preview",
        files={"file": ("students.csv", "student_number,email\nS001,s1@example.edu\n", "text/csv")},
        headers=api_headers,
    )
    assert upload.status_code == 200
    assert upload.json()["row_count"] == 1

    with client.websocket_connect("/ws/announcements") as websocket:
        assert websocket.receive_json()["message"] == "Connected to college announcements"
        websocket.send_text("Admissions close Friday")
        assert websocket.receive_json() == {"announcement": "Admissions close Friday"}