import { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Schedule from "./components/Schedule/Schedule";
import SideBar from "./components/Sidebar/Sidebar";

import DateProvider from "./context/DateContext.jsx";
import TasksProvider from "./context/TasksContext.jsx";

//
// Descontinuando
import api from "./api.js";
//

function App() {
  //
  // Desacoplando
  const [todos, setTodos] = useState([]);
  //

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

  //
  // Descontinuando
  useEffect(() => {
    setTodos(api("/todos"));
  }, []);
  //

  return (
    <>
      <div className="flex h-screen">
        {/* Login */}
        {!isLoggedIn ? (
          <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        ) : (
          <>
            <DateProvider>
              <TasksProvider>
                <SideBar user={user} />
                <Schedule todos={todos} setTodos={setTodos} user={user} />
              </TasksProvider>
            </DateProvider>
          </>
        )}
      </div>
    </>
  );
}

export default App;
