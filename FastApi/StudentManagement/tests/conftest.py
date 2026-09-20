from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app

test_engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(bind=test_engine, autoflush=False, expire_on_commit=False)


def override_get_db() -> Generator[Session, None, None]:
    database = TestingSessionLocal()
    try:
        yield database
    finally:
        database.close()


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    Base.metadata.create_all(bind=test_engine)
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def api_headers() -> dict[str, str]:
    return {"X-API-Key": "college-demo-key"}


@pytest.fixture
def student_payload() -> dict[str, object]:
    return {
        "student_number": "CSE-2026-001",
        "first_name": "Asha",
        "last_name": "Sharma",
        "email": "asha@example.edu",
        "date_of_birth": "2005-04-12",
        "department": "Computer Science",
        "year": 2,
        "is_active": True,
    }