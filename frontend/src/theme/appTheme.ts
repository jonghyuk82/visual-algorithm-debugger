import { createTheme } from "@mantine/core";

export const appTheme = createTheme({
  primaryColor: "mint",
  primaryShade: { light: 8, dark: 4 },
  colors: {
    mint: ["#e6fff5", "#c6f9e6", "#a0efd3", "#7ce7c2", "#69e2b7", "#42d6a2", "#26be88", "#159b6d", "#087953", "#045c40"],
  },
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontFamilyMonospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  headings: { fontWeight: "700" },
  defaultRadius: "md",
});
