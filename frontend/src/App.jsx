import { useEffect, useState } from "react";
import Schedule from "./components/Schedule/Schedule";
import SideBar from "./components/Sidebar/Sidebar";

import api from "./api.js";

const nowDate = new Date();

function App() {
  const [month, setMonth] = useState(nowDate.getUTCMonth());
  const [year, setYear] = useState(nowDate.getUTCFullYear());
  const [day, setDay] = useState(nowDate.getUTCDate());

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    setTodo(api("/todos"));
  }, []);

  return (
    <>
      <div className="flex min-h-full">
        <SideBar
          nowMonth={month}
          nowYear={year}
          nowDay={day}
          setMonth={setMonth}
          setYear={setYear}
          setDay={setDay}
        />

        <Schedule
          nowMonth={month}
          nowYear={year}
          nowDay={day}
          setMonth={setMonth}
          setYear={setYear}
          setDay={setDay}
          todo={todo}
          setTodo={setTodo}
        />
      </div>
    </>
  );
}

export default App;
