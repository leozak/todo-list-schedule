import Login from "./features/Auth/Login";

import { useTheme } from "./contexts/ThemeContext";

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
        <Login />
      </div>
    </>
  );
}

export default App;
