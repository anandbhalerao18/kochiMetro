import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TimetableProvider } from "./context/TimetableContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TimetableProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TimetableProvider>
    </AuthProvider>
  </React.StrictMode>
);
