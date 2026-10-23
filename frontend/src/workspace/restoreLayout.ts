import type { DockviewApi, SerializedDockview } from "dockview-react";
import { loadLayout } from "./layoutStorage";
import { createDefaultLayout } from "./defaultLayout";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function restoreLayout(api: DockviewApi): boolean {
  const saved = loadLayout();

  if (isRecord(saved) && isRecord(saved.grid) && isRecord(saved.panels)) {
    try {
      api.fromJSON(saved as unknown as SerializedDockview);
      return true;
    } catch {
      // Restoration may have created some panels before failing.
      api.clear();
    }
  }

  createDefaultLayout(api);
  return false;
}
