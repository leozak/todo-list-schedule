import { useState } from "react";
import TaskManagerNav from "./TaskManagerNav";
import TaskManagerView from "./TaskManagerView";
import TaskManagerNewTask from "./TaskManagerNewTask";

const TaskManager = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="relative min-h-full w-full p-2 ml-14 sm:ml-0">
      <TaskManagerNav search={search} setSearch={setSearch} />

      <TaskManagerView search={search} />

      <TaskManagerNewTask />
    </div>
  );
};

export default TaskManager;
