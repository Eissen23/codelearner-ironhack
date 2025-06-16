import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/custom/variable.css";

console.log('Environment Variables:', {
  VITE_BACKEND: import.meta.env.VITE_BACKEND,
  VITE_JUDGE0_API_HOST: import.meta.env.VITE_JUDGE0_API_HOST,
  VITE_JUDGE_API_KEY: import.meta.env.VITE_JUDGE_API_KEY,
  VITE_OLLAMA: import.meta.env.VITE_OLLAMA
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
