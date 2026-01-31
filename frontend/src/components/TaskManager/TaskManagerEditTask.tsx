import { useState } from "react";
import { Modal } from "../Modal";

interface TaskManagerEditTaskProps {
  id: number;
  title: string;
  description: string;
  tags: string;
  done: boolean;
  date: string;
  closeCallback: () => void;
}

const TaskManagerEditTask = ({
  id,
  title,
  description,
  tags,
  done,
  date,
  closeCallback,
}: TaskManagerEditTaskProps) => {
  const [_id, set_Id] = useState<number>(id);
  const [_title, set_Title] = useState<string>(title);
  const [_description, set_Description] = useState<string>(description);
  const [_tags, set_Tags] = useState<string[]>(tags.split(","));
  const [_done, set_Done] = useState<boolean>(done);
  const [_date, set_Date] = useState<string>(date);

  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") setErrorTitle(null);
    set_Title(event.target.value);
  };
  const isPending = false;

  const handleSubmit = () => {
    console.log("ModalSave");
  };

  const handleClose = () => {
    console.log("ModalClose");
    closeCallback();
  };

  return (
    <Modal.Root>
      <Modal.Header>
        <Modal.Title title="Editar Tarefa" />
        <Modal.Close callbackClose={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Modal.InputText
          value={_title}
          onChange={handleTitleChange}
          placeholder="Título"
          error={errorTitle}
        />
        <Modal.TextArea
          value={description}
          onChange={(e) => set_Description(e.target.value)}
          placeholder="Descrição"
          className="mt-2 h-auto max-h-30"
        />
        <Modal.InputTags
          placeholder="Etiquetas"
          tags={_tags}
          setTags={set_Tags}
        />
        <Modal.InputDate
          value={_date}
          onChange={(e) => set_Date(e.target.value)}
          className="mt-2"
        />
        <Modal.InputCheckbox
          label="Tarefa concluida"
          checked={_done}
          onChange={(e) => set_Done(e.target.checked)}
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
  );
};

export default TaskManagerEditTask;
