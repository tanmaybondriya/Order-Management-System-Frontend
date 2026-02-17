import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      postion="top-right"
      reverseOrder="flase"
      toastOptions={{ duration: 3000 }}
    />
  </StrictMode>,
);
