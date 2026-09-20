# College Student Management API

A runnable FastAPI project for managing college students, courses, enrollments,
grades, and department summaries. It is designed both as a working starter API
and as a demonstration of the major FastAPI features used in real projects.

## Features demonstrated

| FastAPI feature | Project example |
| --- | --- |
| Path operations and HTTP methods | Student, course, and enrollment CRUD routes |
| Pydantic request validation | Email, year, date, grade, and field constraints |
| Response models | Typed student, course, enrollment, and analytics responses |
| Path and query parameters | Student IDs, search, filters, limit, and offset |
| Dependency injection | SQLAlchemy sessions and API-key authorization |
| Security | Protected writes using the `X-API-Key` header |
| Status codes and errors | `201`, `204`, `401`, `404`, `409`, and `422` responses |
| Custom exception handlers | Consistent not-found and conflict responses |
| Background tasks | Activity logging after student registration |
| Middleware | Request IDs, process timing, and CORS |
| File upload | CSV student-import preview |
| WebSockets | Interactive college announcements channel |
| Application lifespan | Database table creation and engine cleanup |
| Async endpoints | Non-blocking CSV upload and WebSocket handling |
| Automatic OpenAPI docs | Swagger UI and ReDoc |
| Testing | Dependency override and isolated in-memory SQLite database |

The project demonstrates the framework's main application features; "all"
FastAPI capabilities is open-ended because integrations such as OAuth
providers, task queues, templates, and deployment platforms depend on the
application's requirements.

## Project structure

```text
StudentManagement/
|-- app/
|   |-- __init__.py
|   |-- config.py          # Environment-based settings
|   |-- database.py        # SQLAlchemy engine and session dependency
|   |-- dependencies.py    # Shared database and security dependencies
|   |-- exceptions.py      # Domain exceptions
|   |-- main.py            # FastAPI app, middleware, handlers, and WebSocket
|   |-- models.py          # SQLAlchemy database models
|   |-- routes.py          # REST endpoints
|   `-- schemas.py         # Pydantic request and response models
|-- tests/
|   |-- conftest.py        # Isolated test database and fixtures
|   `-- test_api.py        # API integration tests
|-- .env.example
|-- .gitignore
|-- pyproject.toml
|-- requirements.txt
`-- README.md
```

## Requirements

- Python 3.10 or newer
- A terminal opened in `FastApi/StudentManagement`

SQLite is included with Python, so no separate database server is required.

## Setup on Windows PowerShell

From the repository root:

```powershell
Set-Location .\FastApi\StudentManagement
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Activation temporarily adds `.venv\Scripts` to PATH in the current terminal.
No permanent system PATH change is needed.

## Setup on macOS or Linux

```bash
cd FastApi/StudentManagement
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## Configuration

The application reads these optional environment variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `API_KEY` | `college-demo-key` | Protects create, update, delete, and import routes |
| `DATABASE_URL` | `sqlite:///./student_management.db` | SQLAlchemy database connection URL |

For local development in PowerShell:

```powershell
$env:API_KEY = "my-local-secret"
$env:DATABASE_URL = "sqlite:///./student_management.db"
```

Use a secret manager and a strong generated API key in production. The default
key exists only to make the educational project immediately runnable.

## Run the application

With the virtual environment activated:

```powershell
uvicorn app.main:app --reload
```

If `uvicorn` is not recognized, use the environment's interpreter explicitly:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Open these URLs after the server starts:

- API: <http://127.0.0.1:8000>
- Health check: <http://127.0.0.1:8000/health>
- Swagger UI: <http://127.0.0.1:8000/docs>
- ReDoc: <http://127.0.0.1:8000/redoc>
- OpenAPI JSON: <http://127.0.0.1:8000/openapi.json>

The SQLite database file is created automatically on application startup.

## Authenticate in Swagger UI

1. Open <http://127.0.0.1:8000/docs>.
2. Select **Authorize**.
3. Enter `college-demo-key`, or the value assigned to `API_KEY`.
4. Select **Authorize**, then call a protected endpoint.

Read routes are public for demonstration. Routes that change data require the
`X-API-Key` header.

## Example requests

Create a student in PowerShell:

```powershell
$headers = @{ "X-API-Key" = "college-demo-key" }
$student = @{
    student_number = "CSE-2026-001"
    first_name = "Asha"
    last_name = "Sharma"
    email = "asha@example.edu"
    date_of_birth = "2005-04-12"
    department = "Computer Science"
    year = 2
    is_active = $true
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri http://127.0.0.1:8000/api/v1/students `
    -Method Post `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $student
```

Search and paginate students:

```powershell
Invoke-RestMethod "http://127.0.0.1:8000/api/v1/students?department=Computer%20Science&limit=10"
```

## Main endpoints

| Method | Endpoint | Authorization | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | Service health and version |
| `POST` | `/api/v1/students` | API key | Register a student |
| `GET` | `/api/v1/students` | Public | Search, filter, and paginate |
| `GET` | `/api/v1/students/{id}` | Public | Get one student |
| `PATCH` | `/api/v1/students/{id}` | API key | Partially update a student |
| `DELETE` | `/api/v1/students/{id}` | API key | Delete a student |
| `POST` | `/api/v1/courses` | API key | Create a course |
| `GET` | `/api/v1/courses` | Public | List courses |
| `POST` | `/api/v1/enrollments` | API key | Enroll a student |
| `PATCH` | `/api/v1/enrollments/{id}/grade` | API key | Assign a grade |
| `GET` | `/api/v1/analytics/departments` | Public | Student counts by department |
| `POST` | `/api/v1/imports/students/preview` | API key | Preview an uploaded CSV |
| `WS` | `/ws/announcements` | Public demo | Exchange live announcements |

## Run tests

```powershell
python -m pytest -v
```

Tests use an in-memory SQLite database and never modify
`student_management.db`. They verify health checks, middleware, authentication,
validation, CRUD, searching, courses, enrollments, grading, analytics, CSV
upload, and WebSockets.

## Production considerations

- Replace the demonstration API key with OAuth2/JWT or institutional identity.
- Use PostgreSQL or another managed database and schema migrations with Alembic.
- Restrict CORS to the actual college applications.
- Send long-running reports and bulk imports to a task queue.
- Add role-based permissions for administrators, faculty, and students.
- Run without `--reload`, behind HTTPS, with structured logs and monitoring.