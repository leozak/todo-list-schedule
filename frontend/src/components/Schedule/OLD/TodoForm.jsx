import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const TodoForm = ({ openForm, setCloseForm, action, todo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [date, setDate] = useState("");
  const [done, setDone] = useState(false);
  const [pin, setPin] = useState(false);

  const [confirmDiscartChanges, setConfirmDiscartChanges] = useState(false);

  // Set the form initial values
  useEffect(() => {
    if (action === "edit") {
      setTitle(todo.title);
      setDescription(todo.description);
      setPriority(todo.priority);
      setDate(todo.date);
      setDone(todo.done);
      setPin(todo.pin);
    } else if (action === "add") {
      setTitle("");
      setDescription("");
      setPriority(0);
      setDate("");
      setDone(false);
      setPin(false);
    }
  }, []);

  const handleCloseForm = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const date = document.getElementById("date").value;
    const done = document.getElementById("done").checked;
    const pin = document.getElementById("pin").checked;

    if (action === "edit") {
      if (
        title === todo.title &&
        description === todo.description &&
        priority === todo.priority &&
        date === todo.date &&
        done === todo.done &&
        pin === todo.pin
      ) {
        setCloseForm();
      } else {
        setConfirmDiscartChanges(true);
      }
    } else if (action === "add") {
      if (
        title === "" &&
        description === "" &&
        priority === "0" &&
        pin === false &&
        done === false
      ) {
        setCloseForm();
      } else {
        setConfirmDiscartChanges(true);
      }
    }
  };

  // Press <Esc> t'o close the form
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // Get the form values
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const priority = document.getElementById("priority").value;
        const date = document.getElementById("date").value;
        const done = document.getElementById("done").checked;
        const pin = document.getElementById("pin").checked;

        // Verify if the form has been modified before closing
        if (action === "edit") {
          if (
            title === todo.title &&
            description === todo.description &&
            priority === todo.priority &&
            date === todo.date &&
            done === todo.done &&
            pin === todo.pin
          ) {
            setCloseForm();
          } else {
            setConfirmDiscartChanges(true);
          }
        } else if (action === "add") {
          if (
            title === "" &&
            description === "" &&
            priority === "0" &&
            pin === false &&
            done === false
          ) {
            setCloseForm();
          } else {
            setConfirmDiscartChanges(true);
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      onClick={() => {
        (e) => e.stopPropagation();
        handleCloseForm();
      }}
      className={`fixed flex inset-0 justify-center items-center opacity-90 transition-colors duration-300
        ${openForm ? "bg-black/90 visible" : "bg-black/0 invisible"}
        `}
    >
      {/* MODAL TASK */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-neutral-100/90 m-20 rounded-2xl shadow-xl shadow-black p-6 transition-all
        ${openForm ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {/* MODAL CLOSE BUTTON */}
        <button
          onClick={handleCloseForm}
          className="absolute top-2 right-2 p-1 rounded-sm text-neutral-600 hover:text-neutral-900 hover:cursor-pointer"
        >
          <IoClose className="w-6 h-6" />
        </button>

        {/* TITLE */}
        <h1 className="text-center font-bold text-xl -mt-4 mb-4">
          Add New To-do
        </h1>

        {/* TASK FORM */}
        <div className="flex flex-col gap-y-2 min-w-100">
          {/* TITLE: input */}
          <label htmlFor="title" className="font-semibold mb-1">
            Title
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-neutral-100/60 focus:bg-neutral-100 w-full border rounded-lg px-2 py-1"
            />
          </label>

          {/* DESCRIPTION: textarea */}
          <label htmlFor="description" className="font-semibold mb-1">
            Description
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="bg-neutral-100/60 focus:bg-neutral-100 w-full border rounded-lg px-2 py-1"
            ></textarea>
          </label>

          {/* PRIORITY: select */}
          <label htmlFor="priority" className="font-semibold mb-1">
            Priority
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-neutral-100/60 focus:bg-neutral-100 w-full border rounded-lg px-2 py-1"
            >
              <option value="0">Mandatory</option>
              <option value="1">Optional</option>
              <option value="2">Not Important</option>
            </select>
          </label>

          {/* PIN: checkbox */}
          <label
            htmlFor="pin"
            className="text-sm font-medium flex items-center mt-3 mb-1"
          >
            <input
              id="pin"
              name="pin"
              type="checkbox"
              checked={pin}
              onChange={(e) => setPin(e.target.checked)}
              className="accent-cyan-800 w-5 h-5 mr-3"
            />
            Pin this note
          </label>

          {/* DONE: checkbox */}
          <label className="inline-flex items-center cursor-pointer mt-2 mb-1">
            <input
              id="done"
              name="done"
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-12 h-6 bg-gray-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-blue-500   after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
            <span className="ms-3 text-sm font-medium">Pining this note</span>
          </label>

          {/* DATE: hidden */}
          <input type="hidden" id="date" name="date" value={date} />

          {/* SUBMIT: button */}
          <button className="text-neutral-300 hover:text-neutral-100 bg-cyan-800 hover:bg-cyan-700 hover:cursor-pointer rounded-lg px-4 my-4">
            Submit
          </button>
        </div>
      </div>

      {/* CONFIRM DISCARD CHANGES MODAL */}
      {confirmDiscartChanges && (
        <div className="fixed p-6 m-20 bg-neutral-300/90 rounded-2xl shadow-xl shadow-black">
          <h2 className="text-xl font-bold mb-6 text-red-700">
            Discard changes?
          </h2>
          <p>
            You have unsaved changes. Are you sure you want to discard them?
          </p>
          <div className="text-center">
            <button
              onClick={() => setConfirmDiscartChanges(false)}
              className="text-neutral-300 hover:text-neutral-100 bg-green-800 hover:bg-green-700 hover:cursor-pointer active:bg-green-600 rounded-lg py-2 px-4 mt-8 mx-4"
            >
              Continue editando
            </button>
            <button
              onClick={() => {
                setConfirmDiscartChanges(false);
                setCloseForm();
              }}
              className="text-neutral-300 hover:text-neutral-100 bg-red-800 hover:bg-red-700 hover:cursor-pointer active:bg-red-600 rounded-lg py-2 px-4 my-4 mx-4"
            >
              Descartar mudanças
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
