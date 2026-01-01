import { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Schedule from "./components/Schedule/Schedule";
import SideBar from "./components/Sidebar/Sidebar";

import DateProvider from "./context/DateContext.jsx";

import api from "./api.js";

function App() {
  const [todos, setTodos] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    name: "",
    username: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      setIsLoggedIn(true);
      setUser({
        name: sessionStorage.getItem("name"),
        username: sessionStorage.getItem("username"),
      });
    }
  }, []);

  useEffect(() => {
    setTodos(api("/todos"));
  }, []);

  return (
    <>
      <div className="flex h-screen">
        {/* Login */}
        {!isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        ) : (
          <>
            <DateProvider>
              <SideBar user={user} />

              <Schedule todos={todos} setTodos={setTodos} />
            </DateProvider>
          </>
        )}
      </div>
    </>
  );
}

export default App;
