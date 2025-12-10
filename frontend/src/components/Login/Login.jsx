import { useState } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { PiUserCirclePlusFill } from "react-icons/pi";

const Login = () => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [newUser, setNewUser] = useState(false);

  return (
    <>
      {!newUser ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="border-cyan-800 border w-md m-2 overflow-hidden rounded-3xl shadow-2xl">
            <div className="bg-cyan-800 h-5"></div>

            {/* User Icon */}
            <div className="flex justify-center m-4">
              <PiUserCircleFill className="h-50 w-50 text-cyan-700" />
            </div>

            {/* Login title */}
            <h1 className="block text-3xl text-center font-bold text-gray-600">
              Welcome to To-do List
            </h1>

            {/* Login form */}
            <div className="p-6">
              Username:
              <input
                type="text"
                className="w-full p-2"
                placeholder="Enter your username"
              />
              Password:
              <input
                type="password"
                className="w-full p-2"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-center m-4">
              <button
                onClick={() => setNewUser(true)}
                className="hover:underline hover:text-cyan-600 hover:cursor-pointer"
              >
                Create new account.
              </button>
            </div>

            <div className="bg-cyan-800 h-5"></div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="border-cyan-800 border w-md m-2 overflow-hidden rounded-3xl shadow-2xl">
            <div className="bg-cyan-800 h-5"></div>

            {/* User Icon */}
            <div className="flex justify-center m-4">
              <PiUserCirclePlusFill className="h-50 w-50 text-cyan-700" />
            </div>

            {/* Login title */}
            <h1 className="block text-3xl text-center font-bold text-gray-600">
              Welcome to To-do List
            </h1>

            {/* Login form */}
            <div className="p-6">
              Username:
              <input
                type="text"
                className="w-full p-2"
                placeholder="Enter your username"
              />
              Name:
              <input
                type="text"
                className="w-full p-2"
                placeholder="Enter your name"
              />
              Password:
              <input
                type="password"
                className="w-full p-2"
                placeholder="Enter your password"
              />
              Re-password:
              <input
                type="password"
                className="w-full p-2"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-center m-4">
              <button
                onClick={() => setNewUser(false)}
                className="hover:underline hover:text-cyan-600 hover:cursor-pointer"
              >
                Login as user.
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
