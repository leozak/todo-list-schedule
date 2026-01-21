import { useEffect, useState, useContext } from "react";

import { useTheme } from "./contexts/ThemeContext";

import ServerGuard from "./components/ServerGuard/ServerGuard";

import { api } from "./services/api";

import Login from "./features/Auth/Login";

import DateProvider from "./contexts/DateContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Responsividade from "./devutils/Responsividade";
import TaskManager from "./components/TaskManager/TaskManager";

function App() {
  const { theme } = useTheme();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      const verifyToken = async () => {
        try {
          const data = await api.get("/verify-token");
          return data;
        } catch (error) {
          console.log("error:", error);
        }
      };

      verifyToken().then(() => {
        setIsLogged(true);
      });
    }
  });

  return (
    <>
      <div
        className={`
          bg-white
          dark:bg-zinc-900 dark:text-zinc-300
          ${theme === "dark" ? "dark" : ""}
        `}
      >
        <ServerGuard>
          {!isLogged ? (
            <Login />
          ) : (
            <DateProvider>
              <div className="flex h-screen dark:bg-zinc-800">
                <Sidebar />
                <TaskManager />
              </div>
            </DateProvider>
          )}
        </ServerGuard>
      </div>
    </>
  );
}

export default App;
