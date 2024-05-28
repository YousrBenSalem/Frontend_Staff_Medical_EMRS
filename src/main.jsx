import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import ContextWrapper from "./contexts/ContextWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <ContextWrapper>
          <App />
        </ContextWrapper>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
