import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import AddNewTodoForm from "./AddNewTodoForm";

const AddNewTodo = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleAddNewTodo = () => {
    console.log("Add New Todo");
    console.log(openForm);
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

      <AddNewTodoForm
        openForm={openForm}
        setCloseForm={() => setOpenForm(false)}
      />
    </>
  );
};

export default AddNewTodo;
