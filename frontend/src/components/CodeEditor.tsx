import Editor from "@monaco-editor/react";
import { useComputedColorScheme } from "@mantine/core";

import { registerEditorThemes } from "../theme/editorThemes";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const colorScheme = useComputedColorScheme("light");

  return (
    <Editor
      height="100%"
      language="csharp"
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? "")}
      beforeMount={registerEditorThemes}
      theme={colorScheme === "dark" ? "vad-navy" : "light"}
      options={{
        ariaLabel: "C# source code",
        minimap: { enabled: false },
        fontSize: 13,
        padding: { top: 16, bottom: 16 },
        lineHeight: 22,
        fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        fontWeight: "500",
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
