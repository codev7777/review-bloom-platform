import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="hidden" id="isFirstLoad">
      1
    </div>
    <App />
  </React.StrictMode>
);
