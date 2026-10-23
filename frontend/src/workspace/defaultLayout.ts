import type { DockviewApi } from "dockview-react";

export function createDefaultLayout(api: DockviewApi) {
  api.addPanel({
    id: "code",
    component: "code",
    title: "Solution.cs",
  });

  api.addPanel({
    id: "visualization",
    component: "placeholder",
    title: "Visualization",
    position: {
      referencePanel: "code",
      direction: "right",
    },
  });

  api.addPanel({
    id: "variables",
    component: "placeholder",
    title: "Variables",
    initialHeight: 200,
    position: { referencePanel: "code", direction: "below" },
  });
  api.addPanel({
    id: "callStack",
    component: "placeholder",
    title: "Call Stack",
    initialHeight: 200,
    position: { referencePanel: "visualization", direction: "below" },
  });
}
