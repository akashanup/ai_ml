import time
from contextlib import asynccontextmanager
from uuid import uuid4

from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.database import Base, engine
from app.exceptions import ResourceNotFoundError
from app.routes import router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield
    engine.dispose()


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="A teaching API demonstrating FastAPI through college student management.",
    lifespan=lifespan,
    contact={"name": "College IT Department"},
    license_info={"name": "Educational use"},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_request_metadata(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid4()))
    started_at = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time"] = f"{time.perf_counter() - started_at:.6f}"
    return response


@app.exception_handler(ResourceNotFoundError)
async def resource_not_found_handler(_request: Request, error: ResourceNotFoundError):
    return JSONResponse(
        status_code=404,
        content={"detail": str(error), "resource": error.resource, "id": error.resource_id},
    )


@app.exception_handler(ValueError)
async def value_error_handler(_request: Request, error: ValueError):
    return JSONResponse(status_code=409, content={"detail": str(error)})


@app.get("/", tags=["System"])
def root() -> dict[str, str]:
    return {"message": settings.app_name, "documentation": "/docs"}


@app.get("/health", tags=["System"])
def health_check() -> dict[str, str]:
    return {"status": "ok", "version": settings.app_version}


@app.websocket("/ws/announcements")
async def announcements(websocket: WebSocket) -> None:
    await websocket.accept()
    await websocket.send_json({"message": "Connected to college announcements"})
    try:
        while True:
            message = await websocket.receive_text()
            await websocket.send_json({"announcement": message})
    except WebSocketDisconnect:
        return


app.include_router(router)