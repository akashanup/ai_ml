# FastAPI

FastAPI is a modern Python framework for building web APIs. It uses standard
Python type hints to validate request data, serialize responses, and generate
interactive API documentation automatically. It is built on Starlette for web
functionality and Pydantic for data validation.

## Why use FastAPI?

- **High performance:** It supports asynchronous request handling and performs
  well for data and machine-learning services.
- **Automatic validation:** Type hints define and validate request and response
  data, reducing repetitive validation code.
- **Interactive documentation:** OpenAPI, Swagger UI, and ReDoc are generated
  from the application code.
- **Easy integration:** It works naturally with Python libraries such as
  pandas, NumPy, scikit-learn, SQLAlchemy, and PySpark.
- **Production friendly:** It supports dependency injection, authentication,
  background tasks, middleware, and testing utilities.

## FastAPI with EDA and ETL

FastAPI does not replace pandas, PySpark, notebooks, or an ETL orchestrator.
Instead, it provides an API layer through which users and other applications
can start jobs, submit parameters, inspect results, and monitor status.

### Exploratory Data Analysis (EDA)

FastAPI can expose reusable analysis operations as endpoints. For example, an
endpoint can accept a dataset identifier and return summary statistics,
missing-value counts, distributions, or chart-ready JSON. This makes an
analysis available to dashboards and other clients without requiring them to
run a notebook or duplicate Python code.

Benefits for EDA include:

- consistent, validated analysis parameters;
- reusable analysis logic for notebooks, dashboards, and applications;
- controlled access to datasets and results;
- automatic documentation for available analysis operations.

### Extract, Transform, Load (ETL)

FastAPI can provide endpoints that trigger pipelines, validate incoming data,
report job status, or expose processed results. Pydantic models are especially
useful at ingestion boundaries because they reject malformed records before
the transformation stage.

Benefits for ETL include:

- schema validation at the API boundary;
- a standard interface for starting and monitoring pipelines;
- integration with queues, schedulers, databases, and cloud storage;
- clear error responses and operational health endpoints.

Long-running EDA or ETL work should normally be sent to a worker or job system
such as Celery, Airflow, or a cloud queue instead of running inside the request
process. The API can immediately return a job ID and provide another endpoint
for checking progress.

## Project files

```text
FastApi/
|-- main.py             # Example FastAPI application
|-- requirements.txt    # Runtime and test dependencies
|-- test_main.py        # Setup verification test
`-- README.md
```

## Working directory and PATH

No permanent system PATH or environment variable is required. The commands in
this guide are run from the `FastApi` directory. If the terminal is currently
at the repository root, move into that directory first:

### Windows PowerShell

```powershell
Set-Location .\FastApi
```

### macOS or Linux

```bash
cd FastApi
```

Activating `.venv` temporarily adds its executable directory to PATH for the
current terminal session:

- Windows: `.venv\Scripts`
- macOS or Linux: `.venv/bin`

This temporary change allows commands such as `python`, `pytest`, and `uvicorn`
to use the project environment. Closing the terminal removes the change. If
the environment is not activated, invoke its Python by path, for example:

```powershell
.\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

## Setup

Python 3.10 or newer is recommended. From the `FastApi` directory, create and
activate a virtual environment.

### Windows PowerShell

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If PowerShell blocks activation, either allow locally created scripts for the
current user or run the virtual environment's Python directly:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

### macOS or Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## Run the API

After activating the virtual environment, start the development server from
the `FastApi` directory:

```powershell
uvicorn main:app --reload
```

Here, `main` refers to `main.py`, `app` is the FastAPI object defined inside
that file, and `--reload` restarts the server when code changes.

The equivalent command below is useful if `uvicorn` is not recognized or if
multiple Python installations are present. It ensures Uvicorn runs with the
currently selected Python interpreter:

```powershell
python -m uvicorn main:app --reload
```

The API is available at <http://127.0.0.1:8000>. Useful URLs are:

- Health check: <http://127.0.0.1:8000/health>
- Swagger UI: <http://127.0.0.1:8000/docs>
- ReDoc: <http://127.0.0.1:8000/redoc>

## Verify the setup

Run the included test after installing the dependencies:

```powershell
python -m pytest -v
```

The test creates an in-process client, calls `/health`, and verifies both the
HTTP status and JSON response. A passing test confirms that FastAPI can import
the application, register its route, process a request, and serialize a
response. You can also check the running server manually:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## Production note

The `--reload` option is for local development only. In production, configure a
process manager or deployment platform, disable reload, add authentication for
EDA/ETL control endpoints, and keep secrets in environment variables or a
secret manager.