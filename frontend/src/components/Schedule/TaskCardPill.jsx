import { useState, useContext } from "react";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { RiUnpinLine, RiPushpinFill } from "react-icons/ri";

import { TasksContext } from "../../context/TasksContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const TaskCardPill = ({ task, showDetails, setShowDetails }) => {
  const [pin, setPin] = useState(task.pin);

  const { refresh } = useContext(TasksContext);

  const handlePinChange = async () => {
    setPin(!pin);
    const response = await fetch(`${API_URL}/tasks/pin/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pin: !pin }),
    });

    if (response.status === 200) {
      setShowDetails(true);
      refresh();
    }
  };

  return (
    <div
      onClick={() => setShowDetails(!showDetails)}
      className={`
        ${task.priority === 0 ? "border-red-700" : ""}
        ${task.priority === 1 ? "border-yellow-600" : ""}
        ${task.priority === 2 ? "border-gray-500" : ""}
        ${showDetails ? "scale-98 bg-gray-300" : ""}
        flex group shadow-sm shadow-black/50 rounded-md overflow-hidden border-2 mb-1 scale-93 transition-all hover:bg-gray-300 hover:cursor-pointer hover:scale-100`}
    >
      <div
        className={`
        ${task.priority === 0 ? "bg-red-700" : ""}
        ${task.priority === 1 ? "bg-yellow-600" : ""}
        ${task.priority === 2 ? "bg-gray-500" : ""}
        w-2`}
      ></div>
      <div className="flex flex-row w-full items-center justify-between">
        <div
          className={`
          ${showDetails ? "font-bold" : "font-normal"}
          py-1 px-2 group-hover:font-bold
          `}
        >
          {task.title}
        </div>
        <div className="flex flex-row gap-2 py-1 px-2">
          <div
            onClick={handlePinChange}
            className={`
              text-gray-400 hover:text-gray-500
            ${
              pin && task.priority === 0
                ? "text-red-700/60 hover:text-red-700"
                : ""
            }
            ${
              pin && task.priority === 1
                ? "text-yellow-700/60 hover:text-yellow-700"
                : ""
            }
            ${
              pin && task.priority === 2
                ? "text-gray-700/60 hover:text-gray-700"
                : ""
            }
            `}
          >
            {pin ? (
              <RiPushpinFill title="Desafixar" className="w-5 h-5" />
            ) : (
              <RiUnpinLine title="Fixar" className="w-5 h-5" />
            )}
          </div>
          <div className="text-gray-400 hover:text-gray-500">
            {showDetails ? (
              <AiFillCaretUp className="w-5 h-5" />
            ) : (
              <AiFillCaretDown className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardPill;
