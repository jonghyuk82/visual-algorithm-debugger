import "./App.css";
import { useState } from "react";
import { checkApiHealth } from "./api/health";
import {
  Badge,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  ActionIcon,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";

function App() {
  const [apiStatus, setApiStatus] = useState("Not checked");
  const [isChecking, setIsChecking] = useState(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

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
            <Title order={1} size="h3">
              Visual Algorithm Debugger
            </Title>
            <Text size="sm" c="dimmed">
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
              variant="light"
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
                {([
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                  { value: "auto", label: "System" },
                ] as const).map(({ value, label }) => (
                  <Menu.Item
                    key={value}
                    onClick={() => setColorScheme(value)}
                    rightSection={colorScheme === value ? <span aria-hidden="true">✓</span> : undefined}
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
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Paper withBorder p="md" radius="md" mih={360}>
            <Title order={2} size="h5">
              Code
            </Title>
            <Text size="sm" c="dimmed" mt="sm">
              Your C# code editor will appear here.
            </Text>
          </Paper>

          <Paper withBorder p="md" radius="md" mih={360}>
            <Title order={2} size="h5">
              Visualization
            </Title>
            <Text size="sm" c="dimmed" mt="sm">
              Run your code to explore data structures.
            </Text>
          </Paper>

          <Paper withBorder p="md" radius="md" mih={220}>
            <Title order={2} size="h5">
              Variables
            </Title>
            <Text size="sm" c="dimmed" mt="sm">
              Variable values will appear during trace navigation.
            </Text>
          </Paper>

          <Paper withBorder p="md" radius="md" mih={220}>
            <Title order={2} size="h5">
              Call Stack
            </Title>
            <Text size="sm" c="dimmed" mt="sm">
              Active method calls will appear here.
            </Text>
          </Paper>
        </SimpleGrid>
      </section>
    </main>
  );
}

export default App;
