import { useEffect, useState } from "react";
import { PiUserCircleBold } from "react-icons/pi";
import { Modal } from "../Modal";
import { useUserUpdate } from "../../hooks/useUserUpdate";

const SidebarUser = () => {
  const [showUserEdit, setShowUserEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<
    string | null
  >(null);
  const [closeConfirm, setCloseConfirm] = useState<boolean>(false);
  const email = (localStorage.getItem("email") || "") as string;

  const { mutate, isSuccess, isPending } = useUserUpdate();

  const handleModalSubmit = () => {
    if (
      name === (localStorage.getItem("name") as string) &&
      newPassword === ""
    ) {
      setShowUserEdit(false);
      return;
    }
    let isOk = true;
    if (name === "") {
      setErrorName("Informe um nome.");
      isOk = false;
    } else {
      setErrorName(null);
    }
    if (newPassword !== confirmPassword) {
      setErrorConfirmPassword("Senhas não conferem.");
      isOk = false;
    } else {
      setErrorConfirmPassword(null);
    }

    if (isOk) {
      mutate({ name, email, password: newPassword });
    }
  };

  const handleModalClose = () => {
    if (name !== (localStorage.getItem("name") as string)) {
      setCloseConfirm(true);
      return;
    }
    setShowUserEdit(false);
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    setCloseConfirm(false);
    setName(name as string);
    setErrorName(null);
    setNewPassword("");
    setConfirmPassword("");
    setErrorConfirmPassword(null);
  }, [showUserEdit]);

  useEffect(() => {
    if (isSuccess) {
      setShowUserEdit(false);
    }
  }, [isSuccess]);

  return (
    <>
      <button
        onClick={() => setShowUserEdit(true)}
        className="hover:cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 dark:text-zinc-400"
      >
        <PiUserCircleBold className="w-7 h-7" />
      </button>

      {showUserEdit && (
        <Modal.Root>
          {closeConfirm && (
            <Modal.CloseConfirm>
              <Modal.Cancel text="Não" onClick={() => setCloseConfirm(false)} />
              <Modal.Confirm
                text="Sim"
                onClick={() => setShowUserEdit(false)}
              />
            </Modal.CloseConfirm>
          )}
          <Modal.Header>
            <Modal.Title title="Informações do Usuário" />
            <Modal.Close callbackClose={handleModalClose} />
          </Modal.Header>
          <Modal.Body>
            <Modal.InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entre com um nome"
              title="Nome do usuario"
              error={errorName}
            />
            <Modal.InputPassword
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Entre com uma nova senha"
              title="Nova senha"
            />
            <Modal.InputPassword
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
              title="Confirmar senha"
              error={errorConfirmPassword}
            />
          </Modal.Body>
          <Modal.Actions>
            <Modal.Cancel onClick={handleModalClose} />
            <Modal.Confirm onClick={handleModalSubmit} />
          </Modal.Actions>
        </Modal.Root>
      )}
    </>
  );
};

export default SidebarUser;
