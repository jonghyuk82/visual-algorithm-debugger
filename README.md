# Visual Algorithm Debugger

A web application for exploring C# algorithms step by step.

## Status

The React frontend foundation is implemented: a page header, a Workspace placeholder, and basic layout styles. C# execution, API integration, and visualizations are not yet implemented in this repository.

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

## Repository Layout

```text
visual-algorithm-debugger/
├── frontend/          # Implemented frontend foundation
├── docs/              # Requirements and project documentation
└── README.md
```

The target layout also includes `api/`, `execution-engine/`, `.github/workflows/`, and `docker-compose.yml`. Backend directories are currently empty placeholders; Git does not track empty directories. Workflow and Compose files have not been created.

## Deployment Roadmap

- Docker Compose deployment on a Linux server with HTTPS.
- GitHub Actions for CI and, after manual deployment is validated, CD.
- Deployment health checks and a documented rollback procedure.

The hosting provider remains undecided. Before public code execution, the runner must provide verified isolation and resource limits; a child process alone is not a security sandbox.
