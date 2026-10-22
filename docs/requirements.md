# Visual Algorithm Debugger Requirements

## Purpose and document scope

Build a web application for exploring C# algorithm execution step by step. Rebuild the existing C# and Roslyn reference implementation using the architecture below and deploy a working application for real use.

This document records the current implementation scope and agreed follow-up requirements. It is not yet a complete consolidated replacement for the Notion requirements and technical design. Conflicting MVP statements in those sources, including Step Over/Out scope, must be resolved before implementation.

## Architecture

- Frontend: React + TypeScript + Vite.
- API: Python + FastAPI.
- Execution engine: .NET + Roslyn for C# execution.
- Use a trace-first model: execute the algorithm, return the recorded trace, and navigate it in the frontend.
- App UI text and canonical project documentation use English. Maintain Korean documentation companions locally as `*.ko.md`, update them alongside the English originals, and exclude them from Git.

## Delivery and deployment requirements

- Manage source code and pull requests in GitHub.
- Implement GitHub Actions CI for frontend builds/lint and backend tests as those components are introduced.
- Package services with Docker and use Docker Compose for the initial Linux server deployment.
- After validating manual deployment, implement CD with deployment health checks and a documented rollback procedure.
- Serve the public application over HTTPS through a reverse proxy.
- Keep hosting costs low for initial personal use and portfolio demonstrations. The provider and server size remain undecided; DigitalOcean, AWS Lightsail, and Hetzner are candidates.
- Before public code execution, verify execution isolation, resource limits, restricted network/filesystem access, and cleanup. A child process alone is not a security sandbox.
- Keep secrets out of the repository.

These delivery requirements are planned work and are outside VAD-102.

## Current scope: VAD-102 Frontend Setup

Build the minimum frontend foundation incrementally, with the developer implementing each small step and learning its purpose.

- Keep the React entry point and a minimal App component.
- Remove Vite demo UI, styles, and unused assets.
- Establish basic global styles and an app layout shell.
- Separate the app header from an accessible Workspace placeholder panel, with a centered container and page padding.
- Provide `npm start` to launch Vite and open the browser; retain `npm run dev` for startup without automatically opening the browser.
- Fix the development port at 5173 and fail if it is occupied rather than silently choosing another port.
- Use Node.js 22 for the current development setup.
- Verify development startup, production build, and lint.
- Defer Monaco integration, API connections, execution tracing, and the follow-up features below.

### Acceptance and verification status

- Implemented: minimal React shell, header and Workspace panel, global and panel styles, unused starter asset cleanup, startup scripts, and fixed port configuration.
- Verified: `npm run build` and `npm run lint` passed using Node.js v22.23.3.
- Pending independent verification: browser opening, development-server startup, occupied-port behavior, and layout at narrow viewport widths.
- Complete the frontend setup review and merge its pull request before creating an API implementation branch from the updated base branch. Installing local Python tooling does not itself change repository files.

## Follow-up requirements

These are recorded requirements, not implemented features. Detailed design and acceptance criteria remain to be refined.

Pause, Stop, breakpoints, and Run to Line require explicit semantics compatible with trace-first navigation. Do not assume that these requirements introduce live process debugging.

| Area | Requirement | Details to resolve later |
| --- | --- | --- |
| Layout and scrolling | Arrange the debugger screen in columns and allow each region to scroll independently. | Column assignments, sizing, responsive behavior, and scroll boundaries. |
| Variable changes | Display previous value → current value for variables. | Comparison baseline and handling of new, removed, or out-of-scope variables and complex values. |
| Call Stack | Show call depth, call order, and variables belonging to each frame. | Frame ordering, selection, and distinction between active stack order and historical call order. |
| Backtracking complexity | Support complexity analysis of backtracking algorithms. | Metrics, input size definition, and distinction between measured execution statistics and theoretical complexity. |
| Pause and Stop | Provide distinct Pause and Stop actions. | Exact lifecycle semantics, including resume behavior and state retained after Stop. |
| Breakpoint | Pause immediately before executing a line with a breakpoint. | Mapping source lines to executable locations and handling repeated visits. |
| Run to Line | Perform a single run toward the selected line. | Whether arrival pauses before execution; interaction with breakpoints; unreachable lines, completion, and repeated visits. |

## Implementation approach

- Preserve the architecture above.
- Explain each change and give the developer time to implement and verify it before advancing.
- Start with VAD-102's minimum frontend shell; do not implement all follow-up requirements together.
