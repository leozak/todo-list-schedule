import { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { Modal } from "../Modal";
import TagInput from "../Modal/Teste";

const TaskManagerNewTask = () => {
  const [addNewTask, setAddNewTask] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(["11111", "22222", "33333"]);
  }, []);

  return (
    <>
      {/* ADD NEW TASK BUTTON */}
      <button
        onClick={() => setAddNewTask(true)}
        className="absolute text-zinc-200 bg-zinc-500/90 hover:bg-zinc-600/60 dark:hover:bg-zinc-500 bottom-3 right-15 p-3 shadow-md active:shadow-sm shadow-black rounded-full active:scale-90 hover:cursor-pointer"
      >
        <TiPlus className="w-6 h-6" />
      </button>

      {/* ADD NEW TASK MODAL */}
      {addNewTask && (
        <Modal.Root>
          <Modal.Header>
            <Modal.Title title="Nova Tarefa" />
            <Modal.Close callbackClose={() => setAddNewTask(false)} />
          </Modal.Header>
          <Modal.Body>
            <Modal.InputText placeholder="Título" />
            <Modal.TextArea placeholder="Descrição" className="mt-2" />
            <Modal.InputTags
              placeholder="Etiquetas"
              tags={tags}
              setTags={setTags}
            />
            <Modal.InputDate className="mt-2" />
            <Modal.InputCheckbox
              label="Concluida"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
              className="mt-2"
            />
          </Modal.Body>
          <Modal.Actions>
            <Modal.Confirm />
            <Modal.Cancel />
          </Modal.Actions>
        </Modal.Root>
      )}
    </>
  );
};

export default TaskManagerNewTask;
