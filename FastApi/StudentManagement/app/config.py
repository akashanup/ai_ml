import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str = "College Student Management API"
    app_version: str = "1.0.0"
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./student_management.db")
    api_key: str = os.getenv("API_KEY", "college-demo-key")


settings = Settings()