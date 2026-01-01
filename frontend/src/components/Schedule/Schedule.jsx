import NavBar from "./NavBar";
import ScheduleView from "./ScheduleView";
import AddNewTask from "./AddNewTask";

const Schedule = ({ todos, setTodos }) => {
  return (
    <div className="relative p-2 w-full bg-neutral-300">
      <NavBar />

      <hr className="my-2 text-gray-300" />

      <ScheduleView todos={todos} />

      <AddNewTask />
    </div>
  );
};

export default Schedule;
