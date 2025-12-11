import { IoClose } from "react-icons/io5";

const AddNewTodoForm = ({ openForm, setCloseForm }) => {
  return (
    <div
      className={`fixed flex inset-0 justify-center items-center transition-colors
        ${openForm ? "visible bg-black/90" : "invisible"}
        `}
      onClick={setCloseForm}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-neutral-100/80 text-lg m-20 rounded-2xl shadow-xl shadow-black p-6 transition-all
        ${openForm ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={setCloseForm}
          className="absolute top-2 right-2 p-1 rounded-sm text-neutral-600 hover:text-neutral-900 hover:cursor-pointer"
        >
          <IoClose className="w-6 h-6" />
        </button>

        {/* TITLE */}
        <h1 className="text-center font-bold text-xl -mt-4 mb-4">
          Add New To-do
        </h1>

        {/* FORM */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="title" className="font-semibold -mb-1">
            Title
          </label>
          <input id="title" type="text" className="w-full border rounded-lg" />

          <label htmlFor="description" className="font-semibold -mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="w-full border rounded-lg"
          />

          <label htmlFor="priority" className="font-semibold -mb-1">
            Priority
          </label>
          <select name="priority" id="priority" className="border rounded-lg">
            <option value="0">Mandatory</option>
            <option value="2">Optional</option>
            <option value="1">Not Important</option>
          </select>

          <fieldset className="mt-2">
            <input type="checkbox" name="archived" id="archived" />
            <label htmlFor="archived" className="ml-2">
              Archive this note.
            </label>
          </fieldset>

          <button className="text-neutral-300 hover:text-neutral-100 bg-cyan-800 hover:bg-cyan-700 hover:cursor-pointer rounded-lg px-4 my-4">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewTodoForm;
