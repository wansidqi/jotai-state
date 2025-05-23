import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAtomStore } from "./atom";

function App() {
  const { exampleState, setExample } = useAtomStore();
  const { counter, name } = exampleState;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{name}</h1>
      <button onClick={() => setExample("name", "VR")}>change to VR</button>
      <button onClick={() => setExample("name", (prev) => prev + "!")}>
        !
      </button>
      <button onClick={() => setExample("name", "Vite + React")}>
        change to full
      </button>
      <div className="card">
        <button onClick={() => setExample("counter", (prev) => prev + 1)}>
          count is {counter}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
