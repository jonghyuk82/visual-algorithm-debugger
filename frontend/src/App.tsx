import "./App.css";
import { useState } from "react";
import { checkApiHealth } from "./api/health";
import {
  Badge,
  Button,
  Group,
  Stack,
  Text,
  Title,
  ActionIcon,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
// import CodeEditor from "./components/CodeEditor";
import DebuggerWorkspace from "./components/DebuggerWorkspace";

export default function App() {
  const [apiStatus, setApiStatus] = useState("Not checked");
  const [isChecking, setIsChecking] = useState(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [code, setCode] = useState(`public class Solution
  {
      public int Add(int a, int b)
      {
          return a + b;
      }
  }`);

  async function handleCheckApiHealth() {
    setIsChecking(true);
    setApiStatus("Checking...");

    try {
      await checkApiHealth();
      setApiStatus("Connected");
    } catch {
      setApiStatus("Unable to connect");
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <main className="app">
      <header>
        <Group justify="space-between" align="center" gap="md">
          <Stack gap={4}>
            <Title order={1} size="h5">
              Visual Algorithm Debugger
            </Title>
            <Text size="xs" c="dimmed">
              Explore C# algorithm execution step by step.
            </Text>
          </Stack>

          <Group gap="sm">
            <span role="status">
              <Badge
                variant="light"
                color={
                  apiStatus === "Connected"
                    ? "teal"
                    : apiStatus === "Unable to connect"
                      ? "red"
                      : "gray"
                }
              >
                API: {apiStatus}
              </Badge>
            </span>

            <Button
              type="button"
              variant="subtle"
              size="xs"
              onClick={handleCheckApiHealth}
              loading={isChecking}
            >
              Check API Connection
            </Button>
            <Menu position="bottom-end" width={160}>
              <Menu.Target>
                <ActionIcon
                  type="button"
                  variant="default"
                  size="lg"
                  aria-label={`Choose color theme: ${colorScheme === "auto" ? "System" : colorScheme === "dark" ? "Dark" : "Light"}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {colorScheme === "auto" ? (
                      <>
                        <rect x="3" y="4" width="18" height="13" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </>
                    ) : colorScheme === "dark" ? (
                      <path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z" />
                    ) : (
                      <>
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
                      </>
                    )}
                  </svg>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Color theme</Menu.Label>
                {(
                  [
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                    { value: "auto", label: "System" },
                  ] as const
                ).map(({ value, label }) => (
                  <Menu.Item
                    key={value}
                    onClick={() => setColorScheme(value)}
                    rightSection={
                      colorScheme === value ? (
                        <span aria-hidden="true">✓</span>
                      ) : undefined
                    }
                    aria-label={`${label}${colorScheme === value ? ", selected" : ""}`}
                  >
                    {label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </header>

      <section aria-label="Debugger workspace">
        <DebuggerWorkspace code={code} onCodeChange={setCode} />
      </section>
      <footer className="app-statusbar">
        <span>C# · Solution.cs</span>
        <span>Drag tabs to arrange · Drag dividers to resize</span>
      </footer>
    </main>
  );
}
