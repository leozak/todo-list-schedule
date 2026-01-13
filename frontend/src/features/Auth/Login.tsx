// import Sigin from "./Sigin";
import { useState } from "react";
import Sigup from "./Sigup";
import Sigin from "./Sigin";

const Login = () => {
  const [newUser, setNewUser] = useState<boolean>(false);
  return (
    <>
      {newUser ? (
        <Sigup setNewUser={setNewUser} />
      ) : (
        <Sigin setNewUser={setNewUser} />
      )}
    </>
  );
};

export default Login;
