import { useContext, useEffect, useState } from "react";

import { TasksContext } from "../../context/TasksContext";
import TaskCard from "./TaskCard";

const ScheduleView = () => {
  const { tasks, refresh } = useContext(TasksContext);
  const [tasksZero, setTasksZero] = useState([]);
  const [tasksOne, setTasksOne] = useState([]);
  const [tasksTwo, setTasksTwo] = useState([]);

  useEffect(() => {
    if (tasks.length > 0) {
      setTasksZero(tasks.filter((task) => task.priority === 0));
      setTasksOne(tasks.filter((task) => task.priority === 1));
      setTasksTwo(tasks.filter((task) => task.priority === 2));
    }
  }, [tasks]);

  return (
    <div className="p-4 flex flex-wrap flex-col lg:flex-row">
      {tasks.length > 0 ? (
        <>
          {tasksZero.length > 0 && (
            <div className="lg:w-1/3 w-full">
              {tasksZero.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
            </div>
          )}
          {tasksOne.length > 0 && (
            <div className="lg:w-1/3 w-full">
              {tasksOne.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
            </div>
          )}
          {tasksTwo.length > 0 && (
            <div className="lg:w-1/3 w-full">
              {tasksTwo.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-xl mt-2 ml-2">
          Nenhuma tarefa encontrada.
        </p>
      )}
    </div>
  );
};

export default ScheduleView;
