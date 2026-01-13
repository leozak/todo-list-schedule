import { useState, useContext } from "react";
import { toast } from "react-toastify";

import Modal from "../Modal/Modal";
import TaskEdit from "./TaskEdit";

import { TasksContext } from "../../context/TasksContext";

import { API_URL } from "../../config";

const TaskUpdate = ({ task, closeEditTask }) => {
  const [_task, _setTask] = useState(task);

  const { refresh } = useContext(TasksContext);

  const handleUpdateTask = async () => {
    if (_task.title === "") {
      toast.error("Entre com um título.");
    } else {
      const response = await fetch(`${API_URL}/tasks/update/${_task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: _task.title,
          description: _task.description,
          priority: _task.priority,
          pin: _task.pin,
          done: _task.done,
          date: _task.date,
        }),
      }).catch((error) => {
        console.log(error);
        toast.error("Erro ao atualizar tarefa.");
      });

      if (response.status === 200) {
        toast.success("Tarefa atualizada com sucesso.");
        closeEditTask();
        refresh();
      }
    }
  };

  return (
    <Modal title="Editar Tarefa" callbackClose={closeEditTask}>
      <TaskEdit task={_task} setTask={_setTask} />

      {/* EDIT BUTTONS */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleUpdateTask}
          className="bg-green-800 text-white py-2 px-8 rounded-xl mx-4 hover:cursor-pointer hover:bg-green-700 active:bg-green-600"
        >
          Salvar
        </button>
        <button
          onClick={closeEditTask}
          className="bg-red-800 text-white py-2 px-8 rounded-xl mx-4 hover:cursor-pointer hover:bg-red-700 active:bg-red-600"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default TaskUpdate;
