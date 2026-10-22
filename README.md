# Visual Algorithm Debugger

A web application for exploring C# algorithms step by step.

## Status

The React frontend foundation and a minimal FastAPI health endpoint are implemented. The frontend displays a page header, a Workspace placeholder, and basic layout styles. A connection-check button calls the API health endpoint through the Vite development proxy. C# execution and visualizations are not yet implemented.

The project rebuilds an existing C# and Roslyn reference application using separate frontend, API, and execution services.

## Planned Features

- Source line highlighting and execution trace navigation.
- Variable inspection and value changes.
- Call stacks and recursive call visualization.
- Array, collection, linked list, and binary tree visualizations.
- Compilation and runtime error reporting.
- Educational time and space complexity estimates.

See [requirements](docs/requirements.md) for the current scope and follow-up requirements.

## Target Architecture

| Component | Technology | Responsibility |
| --- | --- | --- |
| Frontend | React, TypeScript, Vite | Code input, trace navigation, and visualizations |
| API | Python, FastAPI | Request validation and execution orchestration |
| Execution engine | C#, .NET, Roslyn | Compilation, instrumentation, execution, and trace collection |

The planned execution model is trace-first: the engine completes an execution and returns a recorded trace for frontend navigation.

## Run the Frontend

Use Node.js 22. Development checks have passed with Node.js v22.23.3.

From the repository root:

```bash
# If using nvm:
nvm use 22

cd frontend
npm ci
npm start
```

The development server uses http://localhost:5173 and requests that the browser open automatically. It exits with an error if port 5173 is already occupied. Stop it with `Ctrl+C`.

For commands, file responsibilities, and troubleshooting, see the [frontend README](frontend/README.md).

## Run the API

Use Python 3.12. The current local environment uses Python 3.12.10.

### First-time setup

From the repository root:

```bash
cd api
python3.12 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

The virtual environment keeps API dependencies separate from other projects. Its `.venv/` directory is excluded from Git. Package versions are pinned in `api/requirements.txt`. After intentional dependency changes, run `.venv/bin/python -m pip freeze > requirements.txt` from `api/` and review the changes before committing.

### Start the development server

From `api/`, run the virtual environment's Python directly; activation is not required:

```bash
.venv/bin/python -m uvicorn main:app --reload --port 8000
```

Alternatively, activate the environment and use `python`:

```bash
source .venv/bin/activate
python -m uvicorn main:app --reload --port 8000
```

Activation lasts for the current terminal session. Repeat it in a new terminal, or use the direct `.venv/bin/python` command instead. Run `deactivate` to leave an activated environment.

`main:app` selects the `app` object in `main.py`. The `--reload` option restarts the server when source files change and is intended for local development.

- Health endpoint: http://127.0.0.1:8000/health — expected response: `{"status":"ok"}`.
- Interactive API documentation: http://127.0.0.1:8000/docs.
- Stop the server with `Ctrl+C`.

Run the frontend and API in separate terminals when using both.

## Repository Layout

```text
visual-algorithm-debugger/
├── frontend/          # Implemented frontend foundation
├── api/               # Minimal FastAPI app with GET /health
├── docs/              # Requirements and project documentation
└── README.md
```

The target layout also includes `execution-engine/`, `.github/workflows/`, and `docker-compose.yml`. The execution engine directory is currently an empty placeholder; Git does not track empty directories. Workflow and Compose files have not been created.

## Deployment Roadmap

- Docker Compose deployment on a Linux server with HTTPS.
- GitHub Actions for CI and, after manual deployment is validated, CD.
- Deployment health checks and a documented rollback procedure.

The hosting provider remains undecided. Before public code execution, the runner must provide verified isolation and resource limits; a child process alone is not a security sandbox.
