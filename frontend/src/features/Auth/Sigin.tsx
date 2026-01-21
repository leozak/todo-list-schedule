import { PiUserCircleFill } from "react-icons/pi";
import Theme from "../../components/Theme/Theme";
import { useEffect, useState } from "react";

import { useAuthLogin } from "../../hooks/useUserLogin";

type Props = {
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
};

type Error = {
  error: boolean;
  message: string;
};

const Sigup = ({ setNewUser }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorLogin, setErrorLogin] = useState<Error>({
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

  const { mutate, isPending, isError } = useAuthLogin();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value != "" && validEmail(e.target.value))
      setErrorEmail({ error: false, message: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value != "") setErrorPassword({ error: false, message: "" });
  };

  const validEmail = (email_: string) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email_);
  };

  const formValidate = () => {
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

    return true;
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formValidate()) return;
    mutate({ username: email, password: password });
  };

  useEffect(() => {
    const storegedEmail = localStorage.getItem("email") || "";
    if (storegedEmail != "") {
      setEmail(storegedEmail);
    }
  }, []);

  useEffect(() => {
    if (isError)
      setErrorLogin({ error: true, message: "Email ou senha incorretos." });
  }, [isError]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className="
          bg-zinc-300 m-2 mb-12 min-w-2xs overflow-hidden rounded-3xl shadow-2xl
          dark:bg-zinc-800
          "
      >
        <div className="bg-zinc-600 dark:bg-zinc-700 h-5"></div>
        {/* User Icon */}
        <div className="flex justify-center m-1">
          <PiUserCircleFill className="h-25 w-25 text-zinc-600 dark:text-zinc-300" />
        </div>
        {/* Login title */}
        <h1 className="block text-xl text-center font-bold text-zinc-700 dark:text-zinc-300 px-4">
          Bem vindo de volta!
        </h1>
        <p className="text-zinc-600 text-sm dark:text-zinc-400 text-center m-1 px-4 mb-3">
          Por favor, insira seu e-mail e senha para entrar.
        </p>
        {errorLogin.error && (
          <p className="text-red-400/80 dark:text-red-400/60 text-xs text-center">
            {errorLogin.message}
          </p>
        )}
        {/* Login form */}
        <form>
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
          <div className="flex justify-center mx-4 mt-2 mb-2">
            <button
              onClick={handleLogin}
              className="bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-500/80 dark:bg-zinc-700 hover:dark:bg-zinc-600 active:dark:bg-zinc-600/80 text-zinc-100 dark:text-zinc-300 text-sm font-semibold py-1 px-8 rounded-lg hover:cursor-pointer"
            >
              {isPending ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
        <div className="text-xs text-center m-2 mt-4">
          Novo por aqui? &nbsp;
          <button
            onClick={() => {
              setNewUser(true);
            }}
            className="text-cyan-800 hover:underline hover:text-cyan-600 hover:cursor-pointer"
          >
            Criar Conta
          </button>
        </div>
        <div className="bg-zinc-600 dark:bg-zinc-700 h-5"></div>
      </div>

      <div className="absolute bottom-2">
        <Theme />
      </div>
    </div>
  );
};

export default Sigup;
