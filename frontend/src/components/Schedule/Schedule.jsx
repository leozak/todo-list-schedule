import { FaCrosshairs, FaSearch } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ImSpinner3 } from "react-icons/im";

import NavBar from "./NavBar";
import ScheduleView from "./ScheduleView";
import AddNewTodo from "./AddNewTodo";

const Schedule = ({
  nowMonth,
  nowYear,
  nowDay,
  setMonth,
  setYear,
  setDay,
  todos,
  setTodos,
}) => {
  return (
    <div className="relative p-2 w-full bg-neutral-300">
      {/* Nav Bar Schedule View */}
      <NavBar
        nowMonth={nowMonth}
        nowYear={nowYear}
        nowDay={nowDay}
        setMonth={setMonth}
        setYear={setYear}
        setDay={setDay}
      />

      <hr className="my-2 text-gray-300" />

      {/* Schedule View */}
      <ScheduleView todos={todos} />

      <div className="p-20">
        <ImSpinner3 className="animate-spin w-20 h-20" />
      </div>

      <AddNewTodo />
    </div>
  );
};

export default Schedule;
