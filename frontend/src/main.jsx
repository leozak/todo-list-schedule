import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <>
    {/* <StrictMode> */}
    <App />
    <ToastContainer
      className="mt-20"
      autoClose="2000"
      position="bottom-center"
    />
    {/* </StrictMode> */}
  </>
);
