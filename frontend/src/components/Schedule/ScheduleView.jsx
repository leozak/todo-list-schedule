import { useContext } from "react";

import { DateContext } from "../../context/DateContext";

import { TasksContext } from "../../context/TasksContext";
import TaskCard from "./TaskCard";

const ScheduleView = ({ todos }) => {
  const { year, month, day } = useContext(DateContext);
  const { tasks } = useContext(TasksContext);

  return (
    <div>
      <div className="inline-block">
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleView;
