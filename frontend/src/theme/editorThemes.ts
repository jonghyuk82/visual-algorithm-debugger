import type { Monaco } from "@monaco-editor/react";

export function registerEditorThemes(monaco: Monaco) {
  monaco.editor.defineTheme("vad-navy", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "7DD3FC" },
      { token: "string", foreground: "A7F3D0" },
      { token: "number", foreground: "FCD34D" },
      { token: "comment", foreground: "7F99AD", fontStyle: "italic" },
      { token: "type.identifier", foreground: "69E2B7" },
    ],
    colors: {
      "editor.background": "#182430",
      "editor.foreground": "#E4EDF5",
      "editorLineNumber.foreground": "#71899E",
      "editorLineNumber.activeForeground": "#69E2B7",
      "editor.lineHighlightBackground": "#203342",
      "editor.selectionBackground": "#315B70",
      "editor.inactiveSelectionBackground": "#294252",
      "editorCursor.foreground": "#69E2B7",
      "editorIndentGuide.background1": "#2B3F50",
      "editorIndentGuide.activeBackground1": "#56768C",
      "editorWidget.background": "#1D2F3E",
      "editorWidget.border": "#365167",
    },
  });
}
