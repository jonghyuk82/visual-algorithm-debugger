# Visual Algorithm Debugger Frontend

React, TypeScript, Vite, and Mantine frontend for the Visual Algorithm Debugger.

## Current Scope

The frontend displays a Mantine header with API status and a loading-aware connection button. The accessible workspace contains Code, Visualization, Variables, and Call Stack placeholder panels in two columns at the md breakpoint and above, and one column below it. An API connection-check button displays request progress and success/failure states. The code editor, execution controls, and visualizations are planned features.

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
| `src/main.tsx` | Mount the React application, configure MantineProvider, and import Mantine and global styles |
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

## API Connection Check

Start FastAPI in a separate terminal on port 8000 using the root README instructions. In the Vite development page, click **Check API Connection**. The status changes from `Not checked` to `Checking...`, then `Connected` for a successful JSON response with `status: "ok"`, or `Unable to connect` for a failed request or unexpected response. The button is disabled during the request.

Vite forwards `/api/health` to `http://127.0.0.1:8000/health`, removing the `/api` prefix. This proxy is development-only; production routing must be configured separately. To check failure handling, stop FastAPI and click the button again.

The health request and response validation live in `src/api/health.ts`; `App.tsx` handles user interaction and display state. Production build and lint passed after this separation.

## Color Theme

The header ActionIcon opens a menu with Light, Dark, and System options. Its sun, moon, or monitor icon reflects the selected preference; the menu marks the active choice. Mantine stores the preference locally, and System follows OS changes. MantineProvider defaults to auto when no preference is stored. Global background/text and header secondary text use Mantine color variables. Verify all three options, persistence after reload, OS changes in System mode, and keyboard menu navigation manually.
