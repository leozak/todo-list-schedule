import { useState } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";

const url_base = "http://127.0.0.1:8000";

const Login = ({ setIsLoggedIn }) => {
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
      setErrorUsername({ error: true, message: "Please enter a username." });
    } else if (e.target.value.length < 6) {
      setErrorUsername({
        error: true,
        message: "Username must be at least 6 characters long.",
      });
    } else {
      setErrorUsername({ error: false, message: "" });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setErrorPassword({ error: true, message: "Please enter a password." });
    } else {
      setErrorPassword({ error: false, message: "" });
    }
  };

  const handleSignUp = async () => {
    let is_ok = true;
    if (name === "") {
      setErrorName({ error: true, message: "Please enter a name." });
      is_ok = false;
    } else {
      setErrorName({ error: false, message: "" });
    }

    if (username === "") {
      setErrorUsername({ error: true, message: "Please enter a username." });
      is_ok = false;
    } else if (username.length < 6) {
      setErrorUsername({
        error: true,
        message: "Username must be at least 6 characters long.",
      });
      is_ok = false;
    } else {
      setErrorUsername({ error: false, message: "" });
    }

    if (password === "") {
      setErrorPassword({ error: true, message: "Please enter a password." });
      is_ok = false;
    } else {
      setErrorPassword({ error: false, message: "" });
    }

    // Send the data to the backend
    try {
      const response = await fetch(url_base + "/users/create", {
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

      if (!data.sussess) {
        is_ok = false;
        const message = data.message;
        if (message.indexOf("exists") != -1) {
          setErrorUsername({
            error: true,
            message: "User already exists",
          });
        }
      }
    } catch (error) {
      is_ok = false;
      console.log(error);
    } finally {
      setLoading(false);
    }

    if (is_ok) {
      setNewUser(false);
    }
  };

  const handleSignIn = async () => {
    let is_ok = true;

    if (username === "") {
      setErrorUsername({ error: true, message: "Please enter a username." });
      is_ok = false;
    } else if (username.length < 6) {
      setErrorUsername({
        error: true,
        message: "Username must be at least 6 characters long.",
      });
      is_ok = false;
    } else {
      setErrorUsername({ error: false, message: "" });
    }

    if (password === "") {
      setErrorPassword({ error: true, message: "Please enter a password." });
      is_ok = false;
    } else {
      setErrorPassword({ error: false, message: "" });
    }

    // Send the data to the backend
    if (is_ok) {
      try {
        const response = await fetch(url_base + "/users/login", {
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
              Welcome Back!
            </h1>
            <p className="text-center mt-2">
              Sign in to organize your life efficiently.
            </p>

            {/* Login form */}
            <div className="py-4 px-8">
              {loginFailed && (
                <p className="text-red-500 text-base text-center mb-4">
                  Invalid username or password.
                </p>
              )}
              <label htmlFor="username">Username*</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Enter your username"
              />
              {errorUsername.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorUsername.message}
                </p>
              )}

              <label htmlFor="password">Password*</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Enter your password"
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
                    <ImSpinner6 /> &nbsp; Sending...
                  </>
                ) : (
                  <>
                    <FaUserEdit /> &nbsp; Sign in
                  </>
                )}
              </button>
            </div>

            <div className="text-center m-4">
              Don't have an account? &nbsp;
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
                Sign up
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
              Create Your Account?
            </h1>
            <p className="text-center m-2">
              Create an account and optimize your life.
            </p>
            {/* Login form */}
            <div className="py-4 px-8">
              <label htmlFor="name">Full Name*</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Enter your name"
              />
              {errorName.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorName.message}
                </p>
              )}

              <label htmlFor="username">Username*</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Enter your username"
              />
              {errorUsername.error && (
                <p className="text-red-500 text-xs mb-1 pl-2">
                  {errorUsername.message}
                </p>
              )}

              <label htmlFor="password">Password*</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border-gray-100 border rounded-xl"
                placeholder="Enter your password"
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
                    <ImSpinner6 /> &nbsp; Sending...
                  </>
                ) : (
                  <>
                    <FaUserEdit /> &nbsp; Sign up
                  </>
                )}
              </button>
            </div>
            <div className="text-center m-4">
              Already have an account? &nbsp;
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
                Sign in
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
