import Editor from "@monaco-editor/react";
import { useComputedColorScheme } from "@mantine/core";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const colorScheme = useComputedColorScheme("light");

  return (
    <Editor
      height="360px"
      language="csharp"
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? "")}
      theme={colorScheme === "dark" ? "vs-dark" : "light"}
      options={{
        ariaLabel: "C# source code",
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
