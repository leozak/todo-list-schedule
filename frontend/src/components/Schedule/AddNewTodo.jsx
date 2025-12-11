import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import AddNewTodoForm from "./TodoForm";
import TodoForm from "./TodoForm";

const AddNewTodo = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleAddNewTodo = () => {
    setOpenForm(true);
  };

  return (
    <>
      <button
        title="Add New Todo"
        onClick={handleAddNewTodo}
        className="absolute bottom-8 active:bottom-7 right-8 hover:cursor-pointer"
      >
        <FaPlus className="w-16 h-16 p-4 bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-500 text-cyan-200 transition-colors rounded-full shadow-md active:shadow shadow-gray-900" />
      </button>

      <TodoForm
        openForm={openForm}
        setCloseForm={() => setOpenForm(false)}
        action="add"
      />
    </>
  );
};

export default AddNewTodo;
