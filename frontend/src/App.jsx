import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Schedule from "./components/Schedule/Schedule";
import SideBar from "./components/Sidebar/Sidebar";

import api from "./api.js";

const nowDate = new Date();

function App() {
  const [month, setMonth] = useState(nowDate.getUTCMonth());
  const [year, setYear] = useState(nowDate.getUTCFullYear());
  const [day, setDay] = useState(nowDate.getUTCDate());

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
            <SideBar
              nowMonth={month}
              nowYear={year}
              nowDay={day}
              setMonth={setMonth}
              setYear={setYear}
              setDay={setDay}
              user={user}
            />

            <Schedule
              nowMonth={month}
              nowYear={year}
              nowDay={day}
              setMonth={setMonth}
              setYear={setYear}
              setDay={setDay}
              todos={todos}
              setTodos={setTodos}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
