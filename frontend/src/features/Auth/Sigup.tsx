import { useEffect, useState } from "react";

import { PiUserCirclePlusFill } from "react-icons/pi";

import Theme from "../../components/Theme/Theme";

import { useUserMutate } from "../../hooks/useUserNew";

type Props = {
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
};

type Error = {
  error: boolean;
  message: string;
};

const Sigup = ({ setNewUser }: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const [errorName, setErrorName] = useState<Error>({
    error: false,
    message: "",
  });
  const [errorEmail, setErrorEmail] = useState<Error>({
    error: false,
    message: "",
  });
  const [errorPassword, setErrorPassword] = useState<Error>({
    error: false,
    message: "",
  });
  const [errorRepassword, setErrorRepassword] = useState<Error>({
    error: false,
    message: "",
  });

  const { data, mutate, isSuccess, isPending } = useUserMutate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value != "") setErrorName({ error: false, message: "" });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value != "" && validEmail(e.target.value))
      setErrorEmail({ error: false, message: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value != "") setErrorPassword({ error: false, message: "" });
  };

  const handleRepasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepassword(e.target.value);
    if (e.target.value === password)
      setErrorRepassword({ error: false, message: "" });
  };

  const validEmail = (email_: string) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email_);
  };

  const formValidate = () => {
    // Validação do nome
    if (name === "") {
      setErrorName({ error: true, message: "Informe um nome." });
      return false;
    } else {
      setErrorName({ error: false, message: "" });
    }

    // Validação do email
    if (email === "") {
      setErrorEmail({ error: true, message: "Informe um email." });
      return false;
    } else {
      setErrorEmail({ error: false, message: "" });
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail(email)) {
      setErrorEmail({ error: true, message: "Email inválido." });
      return false;
    } else {
      setErrorEmail({ error: false, message: "" });
    }

    // Validação da senha
    if (password === "") {
      setErrorPassword({ error: true, message: "Informe uma senha." });
      return false;
    } else {
      setErrorPassword({ error: false, message: "" });
    }
    if (repassword === "") {
      setErrorRepassword({ error: true, message: "Repita a senha." });
      return false;
    } else {
      setErrorRepassword({ error: false, message: "" });
    }
    if (password !== repassword) {
      setErrorRepassword({ error: true, message: "Senhas diferentes." });
      return false;
    }

    return true;
  };

  const handleNewUser = (event: React.FormEvent) => {
    event.preventDefault();
    if (formValidate()) {
      mutate({ name, email, password });
    }
  };

  useEffect(() => {
    console.log(data);
    if (data?.success) {
      setErrorEmail({ error: false, message: "" });
      localStorage.setItem("email", email);
      setNewUser(false);
    } else if (data?.message === "User already exists") {
      setErrorEmail({ error: true, message: "Email ja cadastrado." });
    }
  }, [isSuccess]);

  // const handleNewUser = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (formValidate()) {
  //     await axios
  //       .post(`${API_URL}/users/create`, {
  //         name,
  //         email,
  //         password,
  //       })
  //       .then((response) => {
  //         if (response.data.sussess) {
  //           setErrorEmail({ error: false, message: "" });
  //           setNewUser(false);
  //         } else if (response.data.message === "User already exists") {
  //           setErrorEmail({ error: true, message: "Email ja cadastrado." });
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className="
          bg-zinc-300 m-2 min-w-2xs mb-12 overflow-hidden rounded-3xl shadow-2xl
          dark:bg-zinc-800
          "
      >
        <div className="bg-zinc-600 dark:bg-zinc-700 h-5"></div>
        {/* User Icon */}
        <div className="flex justify-center m-1">
          <PiUserCirclePlusFill className="h-25 w-25 text-zinc-600 dark:text-zinc-300" />
        </div>
        {/* Login title */}
        <h1 className="block text-xl text-center font-bold text-zinc-700 dark:text-zinc-300 px-4">
          Novo por aqui?
        </h1>
        <p className="text-zinc-600 text-sm dark:text-zinc-400 text-center m-1 px-4 mb-3">
          Por favor, insira seus dados para criar uma nova conta.
        </p>
        {/* Login form */}
        <form>
          <div className="py-2 px-4">
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="bg-zinc-100/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400 text-sm font-semibold w-full p-1 px-2 rounded-lg focus:outline-none"
              placeholder="Nome"
            />
            {errorName.error && (
              <p className="text-red-400/80 dark:text-red-400/60 text-xs mt-1 -mb-2 pl-2">
                {errorName.message}
              </p>
            )}
          </div>
          <div className="py-2 px-4">
            <input
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="bg-zinc-100/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400 text-sm font-semibold w-full p-1 px-2 rounded-lg focus:outline-none"
              placeholder="E-mail"
            />
            {errorEmail.error && (
              <p className="text-red-400/80 dark:text-red-400/60 text-xs mt-1 -mb-2 pl-2">
                {errorEmail.message}
              </p>
            )}
          </div>
          <div className="py-2 px-4">
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-zinc-100/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400 text-sm font-semibold w-full p-1 px-2 rounded-lg focus:outline-none"
              placeholder="Senha"
            />
            {errorPassword.error && (
              <p className="text-red-400/80 dark:text-red-400/60 text-xs mt-1 -mb-2 pl-2">
                {errorPassword.message}
              </p>
            )}
          </div>
          <div className="py-2 px-4">
            <input
              id="repassword"
              type="password"
              value={repassword}
              onChange={handleRepasswordChange}
              className="bg-zinc-100/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400 text-sm font-semibold w-full p-1 px-2 rounded-lg focus:outline-none"
              placeholder="Confirmar senha"
            />
            {errorRepassword.error && (
              <p className="text-red-400/80 dark:text-red-400/60 text-xs mt-1 -mb-2 pl-2">
                {errorRepassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-center mx-4 mt-2 mb-2">
            <button
              onClick={handleNewUser}
              className="bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-500/80 dark:bg-zinc-700 hover:dark:bg-zinc-600 active:dark:bg-zinc-600/80 text-zinc-100 dark:text-zinc-300 text-sm font-semibold py-1 px-8 rounded-lg hover:cursor-pointer"
            >
              {isPending ? "Enviando..." : "Cadastrar"}
              {/* Cadastrar */}
            </button>
          </div>
          <div className="text-xs text-center m-2 mt-4">
            Ja possui uma conta? &nbsp;
            <button
              onClick={() => {
                setNewUser(false);
              }}
              className="text-cyan-800 hover:underline hover:text-cyan-600 hover:cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>
        <div className="bg-zinc-600 dark:bg-zinc-700 h-5"></div>
      </div>

      <div className="absolute bottom-2">
        <Theme />
      </div>
    </div>
  );
};

export default Sigup;
