import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import { appTheme } from "./theme/appTheme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={appTheme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>,
);
