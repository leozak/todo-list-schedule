import { useState } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";

import { API_URL } from "../../config";

const Login = ({ setIsLoggedIn, setUser }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const [errorName, setErrorName] = useState({
    error: false,
    message: "",
  });
  const [errorUsername, setErrorUsername] = useState({
    error: false,
    message: "",
  });
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    message: "",
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value != "") {
      setErrorName({ error: true, message: "" });
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value === "") {
      setErrorUsername({ error: true, message: "Informe um nome de usuário." });
    } else if (e.target.value.length < 6) {
      setErrorUsername({
        error: true,
        message: "Nome de usuário deve ter pelo menos 6 caracteres.",
      });
    } else {
      setErrorUsername({ error: false, message: "" });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setErrorPassword({ error: true, message: "Informe uma senha." });
    } else {
      setErrorPassword({ error: false, message: "" });
    }
  };

  const handleSignUp = async () => {
    let is_ok = true;
    if (name === "") {
      setErrorName({ error: true, message: "Informe um nome." });
      is_ok = false;
    } else {
      setErrorName({ error: false, message: "" });
    }

    if (username === "") {
      setErrorUsername({ error: true, message: "Informe um nome de usuário." });
      is_ok = false;
    } else if (username.length < 6) {
      setErrorUsername({
        error: true,
        message: "Nome de usuário deve ter pelo menos 6 caracteres.",
      });
      is_ok = false;
    } else {
      setErrorUsername({ error: false, message: "" });
    }

    if (password === "") {
      setErrorPassword({ error: true, message: "Informe uma senha." });
      is_ok = false;
    } else {
      setErrorPassword({ error: false, message: "" });
    }

    // Send the data to the backend
    if (is_ok) {
      try {
        const response = await fetch(`${API_URL}/users/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            name: name,
            password: password,
          }),
        }).catch((error) => {
          is_ok = false;
          console.log(error);
        });

        const data = await response.json();

        if (!data.success) {
          is_ok = false;
          const message = data.message;
          if (message.indexOf("exists") != -1) {
            setErrorUsername({
              error: true,
              message: "Nome de usuário já cadastrado.",
            });
          }
        }
      } catch (error) {
        is_ok = false;
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (is_ok) {
      setNewUser(false);
      setPassword("");
    }
  };

  const handleSignIn = async () => {
    let is_ok = true;

    if (username === "") {
      setErrorUsername({ error: true, message: "Informe um nome de usuário." });
      is_ok = false;
    } else if (username.length < 6) {
      setErrorUsername({
        error: true,
        message: "Nome de usuário deve ter pelo menos 6 caracteres.",
      });
      is_ok = false;
    } else {
      setErrorUsername({ error: false, message: "" });
    }

    if (password === "") {
      setErrorPassword({ error: true, message: "Informe uma senha." });
      is_ok = false;
    } else {
      setErrorPassword({ error: false, message: "" });
    }

    // Send the data to the backend
    if (is_ok) {
      try {
        const response = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }).catch((error) => {
          is_ok = false;
          console.log(error);
        });

        const data = await response.json();

        console.log(data.success);

        if (data.success) {
          setLoginFailed(false);
          setIsLoggedIn(true);
          setUser({
            name: data.name,
            username: data.username,
          });

          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("username", data.username);
        } else {
          is_ok = false;
          setLoginFailed(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!newUser ? (
        //
        // Login
        //
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="border-cyan-800 border w-md m-2 overflow-hidden rounded-3xl shadow-2xl">
            <div className="bg-cyan-800 h-5"></div>

            {/* User Icon */}
            <div className="flex justify-center m-4">
              <PiUserCircleFill className="h-50 w-50 text-cyan-700" />
            </div>

            {/* Login title */}
            <h1 className="block text-3xl text-center font-bold text-gray-600">
              Bem vindo de volta!
            </h1>
            <p className="text-center mt-2">
              Por favor, insira seu nome de usuário e senha para entrar.
            </p>

            {/* Login form */}
            <div className="py-4 px-8">
              {loginFailed && (
                <p className="text-red-500 text-base text-center mb-4">
                  Nome de usuário ou senha incorretos.
                </p>
              )}
              <label htmlFor="username">Nome de usuário*</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Entre com seu nome de usuário"
              />
              {errorUsername.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorUsername.message}
                </p>
              )}

              <label htmlFor="password">Senha*</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Entre com sua senha"
              />
              {errorPassword.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorPassword.message}
                </p>
              )}

              <button
                onClick={handleSignIn}
                className="w-full flex text-gray-200 bg-cyan-700 hover:bg-cyan-800 hover:cursor-pointer my-5 mt-6 rounded-xl p-2 items-center justify-center"
              >
                {loading ? (
                  <>
                    <ImSpinner6 /> &nbsp; Enviando...
                  </>
                ) : (
                  <>
                    <FaUserEdit /> &nbsp; Entrar
                  </>
                )}
              </button>
            </div>

            <div className="text-center m-4">
              Novo por aqui? &nbsp;
              <button
                onClick={() => {
                  setNewUser(true);
                  setErrorName({ error: false, message: "" });
                  setErrorUsername({ error: false, message: "" });
                  setErrorPassword({ error: false, message: "" });
                  setPassword("");
                }}
                className="text-cyan-800 hover:underline hover:text-cyan-600 hover:cursor-pointer"
              >
                Criar Conta
              </button>
            </div>

            <div className="bg-cyan-800 h-5"></div>
          </div>
        </div>
      ) : (
        //
        // New User
        //
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="border-cyan-800 border w-md m-2 overflow-hidden rounded-3xl shadow-2xl">
            <div className="bg-cyan-800 h-5"></div>
            {/* User Icon */}
            <div className="flex justify-center m-4">
              <PiUserCirclePlusFill className="h-50 w-50 text-cyan-700" />
            </div>
            {/* Login title */}
            <h1 className="block text-3xl text-center font-bold text-gray-600">
              Novo por aqui?
            </h1>
            <p className="text-center m-2">
              Por favor, insira seus dados para criar uma nova conta.
            </p>
            {/* Login form */}
            <div className="py-4 px-8">
              <label htmlFor="name">Nome*</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Insira seu nome"
              />
              {errorName.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorName.message}
                </p>
              )}

              <label htmlFor="username">Nome de usuário*</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Insira seu nome de usuário"
              />
              {errorUsername.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorUsername.message}
                </p>
              )}

              <label htmlFor="password">Senha*</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Insira sua senha"
              />
              {errorPassword.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorPassword.message}
                </p>
              )}

              <button
                onClick={handleSignUp}
                className="w-full flex text-gray-200 bg-cyan-700 hover:bg-cyan-800 hover:cursor-pointer my-5 mt-6 rounded-xl p-2 items-center justify-center"
              >
                {loading ? (
                  <>
                    <ImSpinner6 /> &nbsp; Enviando...
                  </>
                ) : (
                  <>
                    <FaUserEdit /> &nbsp; Criar Conta
                  </>
                )}
              </button>
            </div>
            <div className="text-center m-4">
              Ja possui uma conta? &nbsp;
              <button
                onClick={() => {
                  setNewUser(false);
                  setErrorName({ error: false, message: "" });
                  setErrorUsername({ error: false, message: "" });
                  setErrorPassword({ error: false, message: "" });
                  setPassword("");
                }}
                className="text-cyan-800 hover:underline hover:text-cyan-600 hover:cursor-pointer"
              >
                Entrar
              </button>
            </div>
            <div className="bg-cyan-800 h-5"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
