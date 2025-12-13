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
      <NavBar
        nowMonth={nowMonth}
        nowYear={nowYear}
        nowDay={nowDay}
        setMonth={setMonth}
        setYear={setYear}
        setDay={setDay}
      />

      <hr className="my-2 text-gray-300" />

      <ScheduleView todos={todos} />

      <AddNewTodo />
    </div>
  );
};

export default Schedule;
