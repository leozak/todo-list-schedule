import { PiInfoBold } from "react-icons/pi";
import { Modal } from "../Modal";
import { useState } from "react";

import { description, version, author, email } from "../../sets/info";

const SidebarInfo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalClose = () => setIsOpen(false);
  return (
    <>
      <button
        title="Informações"
        onClick={() => setIsOpen(true)}
        className="hover:cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 dark:text-zinc-400"
      >
        <PiInfoBold className="w-7 h-7" />
      </button>

      {isOpen && (
        <Modal.Root>
          <Modal.Header>
            <Modal.Title title="Gerenciador de Tarefas" />
            <Modal.Close callbackClose={handleModalClose} />
          </Modal.Header>
          <Modal.Body>
            <p className="text-zinc-900 dark:text-zinc-200 text-sm mb-4 sm:text-base text-center">
              {description}
            </p>
            <p className="text-zinc-900 dark:text-zinc-200 text-xs mb-4 text-center">
              <strong>v</strong>
              {version}
            </p>
            <p className="text-zinc-800 dark:text-zinc-300 text-xs text-center">
              {author}
            </p>
            <p className="text-zinc-700 dark:text-zinc-400 text-xs text-center">
              <a
                className="hover:text-zinc-600 dark:hover:text-zinc-300"
                href="mailto:{email}"
              >
                {email}
              </a>
            </p>
          </Modal.Body>
          <Modal.Actions>
            <Modal.Cancel text="Fechar" onClick={handleModalClose} />
          </Modal.Actions>
        </Modal.Root>
      )}
    </>
  );
};

export default SidebarInfo;
