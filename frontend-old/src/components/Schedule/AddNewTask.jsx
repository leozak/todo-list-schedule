import { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import Modal from "../Modal/Modal";
import TaskEdit from "./TaskEdit";

import { TasksContext } from "../../context/TasksContext";

import { API_URL } from "../../config";

const AddNewTask = ({ user }) => {
  const [openForm, setOpenForm] = useState(false);

  const { refresh } = useContext(TasksContext);

  const [task, setTask] = useState({
    id: 0,
    title: "",
    description: "",
    priority: 0,
    pin: false,
    done: false,
    date: "",
  });

  /*
   * Salva uma nova tarefa
   */
  const handleSaveNewTask = async () => {
    if (task.title === "") {
      toast.error("Entre com um título.");
    } else {
      const response = await fetch(`${API_URL}/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          title: task.title,
          description: task.description,
          priority: task.priority,
          pin: task.pin,
          done: task.done,
          username: user.username,
          date: task.date,
        }),
      }).catch((error) => {
        console.log(error);
        toast.error("Erro ao criar tarefa.");
      });

      if (response.status === 201) {
        toast.success("Tarefa criada com sucesso.");
        refresh();
        setOpenForm(false);
      } else {
        console.log(response.statusText);
        toast.error("Erro ao criar tarefa.");
      }
    }
  };

  return (
    <>
      <button
        title="Adicionar nova tarefa"
        onClick={() => setOpenForm(true)}
        className="absolute bottom-8 active:bottom-7 right-8 hover:cursor-pointer"
      >
        <FaPlus className="w-16 h-16 p-4 bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-500 text-cyan-200 transition-colors rounded-full shadow-md active:shadow shadow-gray-900" />
      </button>

      {openForm && (
        <Modal
          title="Adicionar Nova Tarefa"
          callbackClose={() => setOpenForm(false)}
        >
          <TaskEdit setTask={setTask} />

          {/* EDIT BUTTONS */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSaveNewTask}
              className="bg-green-800 text-white py-2 px-8 rounded-xl mx-4 hover:cursor-pointer hover:bg-green-700 active:bg-green-600"
            >
              Salvar
            </button>
            <button
              onClick={() => setOpenForm(false)}
              className="bg-red-800 text-white py-2 px-8 rounded-xl mx-4 hover:cursor-pointer hover:bg-red-700 active:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddNewTask;
