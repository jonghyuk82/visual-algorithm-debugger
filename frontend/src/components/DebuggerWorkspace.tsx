import { createContext, useContext, useState } from "react";
import {
  DockviewReact,
  themeDark,
  themeLight,
  type DockviewReadyEvent,
  type IDockviewPanelProps,
  type DockviewApi,
} from "dockview-react";
import { Button, Group, useComputedColorScheme } from "@mantine/core";
import "dockview-react/dist/styles/dockview.css";
import CodeEditor from "./CodeEditor";
import { createDefaultLayout } from "../workspace/defaultLayout";
import { restoreLayout } from "../workspace/restoreLayout";
import { useLayoutPersistence } from "../workspace/useLayoutPersistence";
import { saveLayout } from "../workspace/layoutStorage";

type WorkspaceProps = {
  code: string;
  onCodeChange: (newCode: string) => void;
};

const CodeContext = createContext<WorkspaceProps | null>(null);

function CodePanel() {
  const context = useContext(CodeContext);

  if (!context) {
    throw new Error("CodePanel requires CodeContext");
  }

  return <CodeEditor value={context.code} onChange={context.onCodeChange} />;
}

function PlaceholderPanel({ api }: IDockviewPanelProps) {
  const descriptions: Record<string, string> = {
    visualization:
      "Execute an algorithm to explore its data structures step by step.",
    variables:
      "Local variables and value changes will appear during execution.",
    callStack: "Inspect active method calls and recursive execution here.",
  };

  return (
    <div className="workspace-empty">
      <span className="workspace-empty-symbol" aria-hidden="true">
        {api.id === "visualization"
          ? "◇"
          : api.id === "variables"
            ? "{ }"
            : "≡"}
      </span>
      <h2>{api.title}</h2>
      <p>{descriptions[api.id]}</p>
      <span className="workspace-empty-caption">
        Waiting for an execution trace
      </span>
    </div>
  );
}

const components = {
  code: CodePanel,
  placeholder: PlaceholderPanel,
};

const workspaceDarkTheme = { ...themeDark, gap: 6 };
const workspaceLightTheme = { ...themeLight, gap: 6 };

export default function DebuggerWorkspace({
  code,
  onCodeChange,
}: WorkspaceProps) {
  const colorScheme = useComputedColorScheme("light");

  const [workspaceApi, setWorkspaceApi] = useState<DockviewApi | null>(null);

  useLayoutPersistence(workspaceApi);

  function handleReady({ api }: DockviewReadyEvent) {
    restoreLayout(api);
    setWorkspaceApi(api);
  }

  function handleResetLayout() {
    if (!workspaceApi) return;

    workspaceApi.clear();
    createDefaultLayout(workspaceApi);
    saveLayout(workspaceApi.toJSON());
  }

  return (
    <CodeContext.Provider value={{ code, onCodeChange }}>
      <div className="workspace-dock-container">
        <Group justify="flex-end" className="workspace-toolbar">
          <Button
            size="xs"
            variant="subtle"
            onClick={handleResetLayout}
            disabled={!workspaceApi}
          >
            Reset layout
          </Button>
        </Group>
        <DockviewReact
          className="debugger-dock"
          components={components}
          onReady={handleReady}
          theme={
            colorScheme === "dark" ? workspaceDarkTheme : workspaceLightTheme
          }
        />
      </div>
    </CodeContext.Provider>
  );
}
