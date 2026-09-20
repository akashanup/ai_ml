from fastapi import FastAPI

app = FastAPI(
    title="FastAPI Setup Example",
    description="A minimal application for verifying a FastAPI installation.",
    version="1.0.0",
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "FastAPI is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}