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

## Monaco Code Editor (VAD-106)

`src/components/CodeEditor.tsx` is a controlled C# editor: App owns the source string and passes `value` and `onChange`. Monaco provides syntax highlighting, line numbers, and editing; it does not compile or execute C#, or supply a C# semantic language service. Editor sizing responds to container changes, and its theme follows Mantine’s resolved color scheme. Source state is in memory and resets on refresh.

The current wrapper uses its default CDN loader. The installed `monaco-editor` dependency provides types but has not been wired as the local runtime. Initial runtime loading requires network access. Verify editing, clearing all text, resizing the browser, and Light/Dark/System changes manually. Build and lint passed during review. Docking and resizable panels are outside this branch.

## Docking Workspace (VAD-107)

Dockview replaces the fixed grid with draggable tabs and resizable groups. The workspace fills the available viewport below a compact header and above a status bar. Initial groups contain Solution.cs, Visualization, Variables, and Call Stack. Monaco fills its group; source state remains in App. Empty panels explain their future purpose. Thin separators and blue hover/drag highlights provide an IDE-style appearance in Light/Dark/System modes. Drag a tab onto another group to combine tabs, or toward an edge to split; drag the divider to resize. Layout persistence is not yet implemented; Reset layout restores closed panels, and refreshing restores the initial layout and sample source. Build and lint passed; visual and drag interactions require browser verification.

Docking groups use subtle 6px rounded corners, 4px top tab corners, and an 8px outer workspace inset.

Dockview themes also set a 6px gap between groups, keeping rounded panels visually separate while retaining divider resizing.

Panel outlines use real 1px borders rather than inset shadows, with a contrasting gutter and a separate tab-header divider so editor content cannot cover the outline.

Resize dividers display a centered three-dot grip: vertical dots between side-by-side groups and horizontal dots between stacked groups. The decorative grip does not intercept pointer events; the existing Dockview divider remains the drag target.

The selected tab in the active group uses semibold accent text: deep blue in Light mode and light blue in Dark mode.

## Reset Layout (VAD-108)

The workspace toolbar provides Reset layout. It clears the Dockview panels and recreates the four-group default layout defined in `src/workspace/defaultLayout.ts`. Initial setup and reset share that function. Reset restores closed panels and their default arrangement without changing the source string owned by App. It does not preserve editor cursor position or undo history. The button is disabled until Dockview is ready. Layout persistence is not implemented. Verify repeated resets after moving, resizing, tabbing, and closing panels, including all panels, and confirm edited source is retained.
