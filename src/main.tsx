import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css"; // this includes global styles and normalizeCSS
import "@mantine/charts/styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <div className="hidden" id="isFirstLoad">
        1
      </div>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
