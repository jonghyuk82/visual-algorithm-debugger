# Visual Algorithm Debugger Frontend

React, TypeScript, and Vite frontend for the Visual Algorithm Debugger.

## Current Scope

The frontend currently displays a page header and an accessible Workspace placeholder with basic layout styles. The code editor, API integration, execution controls, and visualizations are planned features.

## Prerequisites

- Node.js 22; build and lint were verified using v22.23.3.
- npm, included with Node.js.

If using nvm, run `nvm use 22` once in the current terminal. Select the version again in new terminals unless Node 22 is already active. This repository does not currently include an `.nvmrc` file.

## Install and Start

From the repository root:

```bash
cd frontend
npm ci
npm start
```

`npm ci` installs the dependencies recorded in `package-lock.json`; it is needed for initial setup and after dependency changes, not every startup.

Open http://localhost:5173 if the browser does not open automatically. Saved source changes update the running page. Stop the server with `Ctrl+C`.

## Commands

Run these commands inside `frontend/`:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server and request automatic browser opening |
| `npm run dev` | Start the development server without opening the browser automatically |
| `npm run build` | Check TypeScript and produce a production build in `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve an existing production build locally for inspection |

Run `npm run build` before `npm run preview`. Preview is a local inspection tool, not the production deployment setup. Use the URL printed by the preview command; the fixed development port does not apply to preview.

## Development Port

`vite.config.ts` sets `server.port` to `5173` and `server.strictPort` to `true`. An occupied port causes startup to fail rather than selecting another port. Check other terminals for an existing project server and stop it with `Ctrl+C` before restarting.

## Source Files

| File | Responsibility |
| --- | --- |
| `index.html` | HTML entry page and React root element |
| `src/main.tsx` | Mount the React application and import global styles |
| `src/App.tsx` | Application header and Workspace markup |
| `src/App.css` | Application container and panel styles |
| `src/index.css` | Global typography, colors, and resets |
| `public/favicon.svg` | Browser tab icon referenced by `index.html` |
| `vite.config.ts` | Vite plugins and development server settings |

## Validation

```bash
npm run build
npm run lint
```

Both commands passed after the frontend setup and starter asset cleanup. Browser rendering and development-server behavior require a manual check.
