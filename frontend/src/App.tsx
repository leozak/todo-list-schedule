import Login from "./features/Auth/Login";

import { useTheme } from "./contexts/ThemeContext";
import ServerGuard from "./components/ServerGuard/ServerGuard";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div
        className={`
          bg-white dark:bg-zinc-900
          ${theme === "dark" ? "dark" : ""}
        `}
      >
        <ServerGuard>
          <Login />
        </ServerGuard>
      </div>
    </>
  );
}

export default App;
