import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ title, callbackClose, children }) => {
  const [openForm, setOpenForm] = useState(false);

  const handleCloseForm = () => {
    setOpenForm(false);
    if (callbackClose) callbackClose();
  };

  useEffect(() => {
    setOpenForm(true);
  }, []);
  return (
    <>
      <div
        className={`fixed flex inset-0 z-10 justify-center items-center opacity-90 transition-colors
            ${openForm ? "bg-black/90 visible" : "bg-black/0 invisible"}
            `}
      ></div>
      <div className="fixed flex inset-0 z-20 justify-center items-center">
        {/* MODAL TASK */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-neutral-100 m-20 rounded-2xl shadow-xl shadow-black p-6 transition-all
            ${openForm ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
        >
          {/* MODAL CLOSE BUTTON */}
          <button
            onClick={handleCloseForm}
            className="absolute top-2 right-2 p-1 rounded-sm text-neutral-700 hover:text-neutral-500 hover:cursor-pointer"
          >
            <IoClose className="w-6 h-6" />
          </button>

          {/* TITLE */}
          {title && (
            <h1 className="text-center font-bold text-xl -mt-4 mb-4 pl-4 pr-10">
              {title}
            </h1>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
