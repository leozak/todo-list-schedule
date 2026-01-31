import { useContext, useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";

import { Modal } from "../Modal";
import { useNewTask } from "../../hooks/useTasks";
import { DateContext } from "../../contexts/DateContext";

const TaskManagerNewTask = () => {
  const [addNewTask, setAddNewTask] = useState<boolean>(false);
  const [closeConfirm, setCloseConfirm] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);

  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  const { data, mutate, isPending } = useNewTask();

  const { year, month, day } = useContext(DateContext);

  const nowDate: string =
    year +
    "-" +
    (month < 9 ? "0" + (month + 1) : month + 1) +
    "-" +
    (day < 10 ? "0" + day : day);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === "" && description === "" && tags.length === 0) {
      setAddNewTask(false);
      return;
    }

    let isOK = true;
    if (title === "") {
      setErrorTitle("Informe um título.");
      isOK = false;
    } else {
      setErrorTitle(null);
    }

    if (isOK) {
      const _tags = tags.join(",");
      mutate({
        title,
        description,
        tags: _tags,
        pin: false,
        done,
        email: localStorage.getItem("email") as string,
        date,
      });
    }
  };

  useEffect(() => {
    if (data?.success) {
      setAddNewTask(false);
    }
  }, [data]);

  const handleClose = () => {
    console.log("ModalClose");
    if (title !== "" || description !== "" || tags.length !== 0) {
      setCloseConfirm(true);
      return;
    }
    setAddNewTask(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") setErrorTitle(null);
    setTitle(e.target.value);
  };

  useEffect(() => {
    setCloseConfirm(false);
    setTitle("");
    setErrorTitle(null);
    setDescription("");
    setTags([]);
    setDate(nowDate);
    setDone(false);
  }, [addNewTask]);

  return (
    <>
      {/* ADD NEW TASK BUTTON */}
      <button
        type="button"
        title="Nova tarefa"
        onClick={() => setAddNewTask(true)}
        className="fixed text-zinc-200 bg-zinc-600/90 hover:bg-zinc-700/90 dark:hover:bg-zinc-500 bottom-3 right-4 p-3 shadow-md active:shadow-sm shadow-black rounded-full active:scale-90 hover:cursor-pointer"
      >
        <TiPlus className="w-6 h-6" />
      </button>

      {/* ADD NEW TASK MODAL */}
      {addNewTask && (
        <Modal.Root>
          {closeConfirm && (
            <Modal.CloseConfirm>
              <Modal.Cancel text="Não" onClick={() => setCloseConfirm(false)} />
              <Modal.Confirm text="Sim" onClick={() => setAddNewTask(false)} />
            </Modal.CloseConfirm>
          )}
          <Modal.Header>
            <Modal.Title title="Nova Tarefa" />
            <Modal.Close callbackClose={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <Modal.InputText
              value={title}
              onChange={handleTitleChange}
              placeholder="Título"
              error={errorTitle}
            />
            <Modal.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
              className="mt-2"
            />
            <Modal.InputTags
              placeholder="Etiquetas"
              tags={tags}
              setTags={setTags}
            />
            <Modal.InputDate
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2"
            />
            <Modal.InputCheckbox
              label="Tarefa concluida"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
              className="mt-2"
            />
          </Modal.Body>
          <Modal.Actions>
            <Modal.Cancel onClick={handleClose} />
            <Modal.Confirm
              text={isPending ? "Salvando..." : "Salvar"}
              disabled={isPending || title === ""}
              onClick={handleSubmit}
            />
          </Modal.Actions>
        </Modal.Root>
      )}
    </>
  );
};

export default TaskManagerNewTask;
