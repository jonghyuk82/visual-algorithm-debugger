import "./App.css";
import { useState } from "react";
import { checkApiHealth } from "./api/health";

function App() {
  const [apiStatus, setApiStatus] = useState("Not checked");
  const [isChecking, setIsChecking] = useState(false);

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
        <h1>Visual Algorithm Debugger</h1>
        <p>Explore C# algorithm execution step by step.</p>
        <button
          type="button"
          onClick={handleCheckApiHealth}
          disabled={isChecking}
        >
          Check API Connection
        </button>
        <p role="status">API: {apiStatus}</p>
      </header>

      <section aria-label="Debugger workspace">
        <h2>Workspace</h2>
        <p>Your code editor and visualizations will appear here.</p>
      </section>
    </main>
  );
}

export default App;
