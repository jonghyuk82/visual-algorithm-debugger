import type { SerializedDockview } from "dockview-react";

const STORAGE_KEY = "vad.workspace-layout.v1";

export function saveLayout(layout: SerializedDockview): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    return true;
  } catch {
    return false;
  }
}

export function loadLayout(): unknown {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? null : JSON.parse(saved);
  } catch {
    return null;
  }
}
