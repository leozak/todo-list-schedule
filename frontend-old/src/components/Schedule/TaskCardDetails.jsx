import { useState, useContext } from "react";

import { FaEdit } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

import { BsTrash3Fill } from "react-icons/bs";

import { TasksContext } from "../../context/TasksContext";

import { API_URL } from "../../config";

const TaskCardDetails = ({ task, showDetails, editTask }) => {
  const [done, setDone] = useState(task.done);

  const { refresh } = useContext(TasksContext);

  const handleDoneChange = async () => {
    setDone(!done);
    const response = await fetch(`${API_URL}/tasks/done/${task.id}`, {
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

  const deleteTask = async () => {
    const response = await fetch(`${API_URL}/tasks/delete/${task.id}`, {
      method: "DELETE",
    }).catch((error) => {
      console.log(error);
      toast.error("Erro ao deletar tarefa");
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

      <div className="flex flex-row justify-between">
        <div>
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
        </div>

        {/* Opções */}
        <div className="flex flex-row gap-x-2">
          <button
            title="Editar"
            onClick={editTask}
            className="flex items-center p-1 gap-x-2 mt-1 hover:text-gray-400 hover:cursor-pointer"
          >
            <MdEditSquare className="w-8 h-8" />
          </button>
          <button
            title="Excluir"
            onClick={deleteTask}
            className="flex items-center p-1 gap-x-2 hover:text-gray-400 hover:cursor-pointer"
          >
            <BsTrash3Fill className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCardDetails;
