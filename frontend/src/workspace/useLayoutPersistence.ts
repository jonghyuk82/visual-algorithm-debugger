import { useEffect } from "react";
import type { DockviewApi } from "dockview-react";
import { saveLayout } from "./layoutStorage";

export function useLayoutPersistence(api: DockviewApi | null) {
  useEffect(() => {
    if (!api) return;

    function persist() {
      if (api) {
        saveLayout(api.toJSON());
      }
    }

    // Save the restored layout or the default fallback.
    persist();

    const subscription = api.onDidLayoutChange(persist);

    return () => {
      subscription.dispose();
    };
  }, [api]);
}
