import { useContext, useEffect, useState } from "react";

import { DateContext } from "../../context/DateContext";

import { TasksContext } from "../../context/TasksContext";
import TaskCard from "./TaskCard";

const ScheduleView = ({ todos }) => {
  const { year, month, day } = useContext(DateContext);
  const { tasks } = useContext(TasksContext);
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
    <div className="p-4 flex">
      {tasks.length > 0 ? (
        <>
          {tasksZero.length > 0 && (
            <div className="w-1/3">
              {tasksZero.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
            </div>
          )}
          {tasksOne.length > 0 && (
            <div className="w-1/3">
              {tasksOne.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
            </div>
          )}
          {tasksTwo.length > 0 && (
            <div className="w-1/3">
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
      {/* <div className="inline-block">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard task={task} />)
        ) : (
          <p className="text-gray-500 text-xl mt-2 ml-2">
            Nenhuma tarefa encontrada.
          </p>
        )}
      </div> */}
    </div>
  );
};

export default ScheduleView;
