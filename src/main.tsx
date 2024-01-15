import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SettingsProvider } from "./contexts/SettingsContext.tsx";
import { TimerProvider } from "./contexts/TimerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </SettingsProvider>
  </React.StrictMode>,
);
