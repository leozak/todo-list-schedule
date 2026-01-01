import { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";

import Modal from "../Modal/Modal";
import TaskEdit from "./TaskEdit";

import { DateContext } from "../../context/DateContext";

const AddNewTask = () => {
  const [openForm, setOpenForm] = useState(false);

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
  const handleSaveNewTask = () => {
    //
    // - Verifica se o título da tarefa foi preenchido
    // - Envia a tarefa para o backend
    // - Fecha o modal
    //
    console.log(task);
    console.log(task.title);
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
              className="bg-green-900 py-2 px-8 rounded-xl mx-4 hover:cursor-pointer hover:bg-green-800 active:bg-green-700"
            >
              Salvar
            </button>
            <button
              onClick={() => setOpenForm(false)}
              className="bg-red-900 py-2 px-8 rounded-xl mx-4 hover:cursor-pointer hover:bg-red-800 active:bg-red-700"
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
