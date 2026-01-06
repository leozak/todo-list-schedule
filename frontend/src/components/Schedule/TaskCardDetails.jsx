import { useState, useContext } from "react";

import { TasksContext } from "../../context/TasksContext";

const url_base = "http://127.0.0.1:8000";

const TaskCardDetails = ({ task, showDetails }) => {
  const [done, setDone] = useState(task.done);

  const { refresh } = useContext(TasksContext);

  const handleDoneChange = async () => {
    setDone(!done);
    const response = await fetch(url_base + "/tasks/done/" + task.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: !done }),
    });

    if (response.status === 200) {
      refresh();
    }
  };

  return (
    <div
      className={`
      text-sm font-semibold text-gray-600 shadow shadow-black/50 border-2 border-t-0 rounded-b-xl -mt-1 ml-5 mr-2 p-2
      ${task.priority === 0 ? "bg-red-50/20 border-red-600/50" : ""}
      ${task.priority === 1 ? "bg-yellow-50/20 border-yellow-400" : ""}
      ${task.priority === 2 ? "bg-gray-50/20 border-gray-400" : ""}
      ${showDetails ? "h-auto visible mb-4" : "h-0 invisible mb-0"}
      `}
    >
      <div className="my-2 mb-4">{task.description}</div>

      <div className="my-2">
        <strong>Data:</strong>&nbsp;{task.date}
      </div>

      <div className="my-1">
        <label
          htmlFor={`done-${task.id}`}
          className="text-sm text-gray-600 font-bold flex items-center hover:cursor-pointer"
        >
          <input
            id={`done-${task.id}`}
            name="done"
            type="checkbox"
            checked={done}
            onChange={handleDoneChange}
            className="accent-cyan-600 w-4 h-4 mr-3 hover:cursor-pointer"
          />
          Concluida
        </label>
      </div>

      <div>{task.pin}</div>
      <div>{task.done}</div>
    </div>
  );
};

export default TaskCardDetails;
