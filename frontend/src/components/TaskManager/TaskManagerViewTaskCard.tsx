import { useEffect, useState } from "react";
import { PiCheckFatFill } from "react-icons/pi";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiDeleteBinFill,
  RiFileEditFill,
} from "react-icons/ri";

import { colors } from "../../sets/colors";
import type { Task } from "../../interfaces/tasks";
import {
  useChangeTaskDone,
  useChangeTaskPin,
  useTaskDelete,
} from "../../hooks/useTasks";
import { Modal } from "../Modal";
import TaskManagerEditTask from "./TaskManagerEditTask";
import { FaArrowsSpin } from "react-icons/fa6";

const colorsLength = colors.length;

const TaskManagerViewTaskCard = ({
  id,
  title,
  description,
  tags,
  pin,
  done,
  date,
}: Omit<Task, "email">) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);

  const [_done, set_Done] = useState<boolean>(done);
  const [_pin, set_Pin] = useState<boolean>(pin);

  const { mutateDone, dataDone, isPendingDone, isErrorDone, errorDone } =
    useChangeTaskDone();

  const { mutatePin, dataPin, isPendingPin, isErrorPin, errorPin } =
    useChangeTaskPin();

  const {
    mutateDelete,
    dataDelete,
    isPendingDelete,
    isErrorDelete,
    errorDelete,
  } = useTaskDelete();

  const handleDoneChange = async (id: number) => {
    mutateDone({ id, done: !_done });
  };

  const handlePinChange = async (id: number) => {
    mutatePin({ id, pin: !pin });
  };

  const handleDeleteTask = async (id: number) => {
    mutateDelete(id);
  };

  const closeEditTask = () => {
    setEditTask(false);
  };

  useEffect(() => {
    if (dataDone?.success) {
      set_Done(dataDone.done as boolean);
    } else if (dataDone?.success == false || isErrorDone) {
      console.log(dataDone?.message);
      console.log(errorDone);
    }
  }, [dataDone]);

  useEffect(() => {
    if (dataPin?.success) {
      set_Pin(dataPin.pin as boolean);
    } else if (dataPin?.success === false || isErrorPin) {
      console.log(dataPin?.message);
      console.log(errorPin);
    }
  }, [dataPin]);

  useEffect(() => {
    if (dataDelete?.success == false || isErrorDelete) {
      console.log(dataDelete?.message);
      console.log(errorDelete);
    }
  }, [dataDelete]);

  return (
    <>
      <div className="mb-2 text-xs sm:text-sm">
        <div className="group relative flex scale-98 hover:scale-100">
          <div
            className={`z-20 w-full rounded-md p-1 pl-2 text-zinc-900 group-hover:bg-zinc-500/90 dark:text-zinc-200 dark:group-hover:bg-zinc-950/90
            ${showDetails ? "bg-zinc-500/80 dark:bg-zinc-900/90 " : "bg-zinc-400/70 dark:bg-zinc-900"}
            `}
          >
            <div className="flex flex-row justify-between items-center">
              <div
                onClick={() => setShowDetails(!showDetails)}
                className={`w-full group-hover:font-bold hover:cursor-pointer py-1 pl-2
                          ${done ? "text-zinc-600/80 decoration-zinc-500/60 dark:text-zinc-500 dark:decoration-zinc-400/50 line-through decoration-2" : ""}
                          ${showDetails ? "select-text font-bold" : "select-none"}`}
              >
                {title}
              </div>
              <div className="flex mr-2 items-center space-x-2">
                {pin ? (
                  <button
                    title="Desmarcar"
                    type="button"
                    onClick={() => handlePinChange(id)}
                    className="dark:text-zinc-400 dark:hover:text-zinc-300 hover:cursor-pointer active:scale-80"
                  >
                    <BsPinAngleFill />
                  </button>
                ) : (
                  <button
                    title="Marcar"
                    type="button"
                    onClick={() => handlePinChange(id)}
                    className="dark:text-zinc-400 dark:hover:text-zinc-300 hover:cursor-pointer active:scale-80"
                  >
                    <BsPinAngle />
                  </button>
                )}

                {showDetails ? (
                  <button
                    title="Ocultar detalhes"
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="dark:text-zinc-400 dark:hover:text-zinc-300 hover:cursor-pointer active:scale-80"
                  >
                    <RiArrowUpSFill className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    title="Exibir detalhes"
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="dark:text-zinc-400 dark:hover:text-zinc-300 hover:cursor-pointer active:scale-80"
                  >
                    <RiArrowDownSFill className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {showDetails && (
              <>
                <hr className="border-zinc-800/40 dark:border-zinc-600/40 my-1" />
                <div className="flex flex-col font-medium py-1 px-4 space-y-2">
                  <p className="text-zinc-900/90 dark:text-zinc-300">
                    {description}
                  </p>

                  {tags.length > 0 && (
                    <div className="flex flex-row flex-wrap mt-1">
                      {tags.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className={`text-zinc-900/60 dark:text-zinc-300/80 text-xs py-0.5 px-2 rounded-md mr-1
                          ${colors[index % colorsLength]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-row justify-between mt-2">
                    <div className="items-center">
                      <label
                        htmlFor={`done_${id}`}
                        className="relative flex text-zinc-700 dark:text-zinc-300/90 text-xs sm:text-sm items-center hover:cursor-pointer"
                      >
                        <input
                          id={`done_${id}`}
                          checked={_done}
                          onChange={() => handleDoneChange(id)}
                          type="checkbox"
                          className="appearance-none bg-zinc-300/70 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 border-zinc-500 dark:border-zinc-600 w-4 h-4 border-2 rounded active:scale-90 mr-1 mb-2 hover:cursor-pointer"
                        />
                        <PiCheckFatFill
                          className="absolute text-zinc-700 dark:text-zinc-300 bottom-2 left-0 w-5 h-5"
                          style={{ opacity: _done ? "100" : "0" }}
                        />
                        <span className="-mt-2 ml-1">Tarefa concluida</span>
                      </label>
                    </div>
                    <div className="dark:text-zinc-400 absolute flex flex-row items-center space-x-2 bottom-3 right-6">
                      <button
                        title="Editar"
                        type="button"
                        onClick={() => setEditTask(!editTask)}
                        className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 hover:cursor-pointer active:scale-90"
                      >
                        <RiFileEditFill className="w-6 h-6 mt-0.5" />
                      </button>
                      <button
                        title="Apagar"
                        type="button"
                        onClick={() => setConfirmDeleteTask(true)}
                        className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 hover:cursor-pointer active:scale-90"
                      >
                        <div className="relative">
                          <div>
                            <RiDeleteBinFill className="w-7 h-7" />
                          </div>
                          <div>
                            <FaArrowsSpin className="text-orange-700 absolute -top-1 -right-1 w-4 h-4 animate-spin-pulse" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {confirmDeleteTask && (
        <Modal.Root className="w-96">
          <Modal.Body>
            <p className="text-center font-semibold text-sm sm:text-base">
              Tem certeza que deseja apagar essa tarefa?
            </p>
          </Modal.Body>
          <Modal.Actions>
            <Modal.Confirm text="Sim" onClick={() => handleDeleteTask(id)} />
            <Modal.Cancel
              text="Não"
              onClick={() => setConfirmDeleteTask(false)}
            />
          </Modal.Actions>
        </Modal.Root>
      )}

      {editTask && (
        <TaskManagerEditTask
          {...{ id, title, description, tags, done, date }}
          closeCallback={closeEditTask}
        />
      )}
    </>
  );
};

export default TaskManagerViewTaskCard;
