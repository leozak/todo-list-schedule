import NavBar from "./NavBar";
import ScheduleView from "./ScheduleView";
import AddNewTask from "./AddNewTask";

const Schedule = ({ todos, setTodos, user }) => {
  return (
    <div className="relative p-2 w-full bg-neutral-200">
      <NavBar />

      <hr className="my-2 text-gray-300" />

      <ScheduleView todos={todos} />

      <AddNewTask user={user} />
    </div>
  );
};

export default Schedule;
