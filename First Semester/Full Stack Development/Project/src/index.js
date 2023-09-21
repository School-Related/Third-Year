import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./input.css";
import App from "./App";
import { BaseUrlProvider } from "./context/BaseUrlContext";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseUrlProvider>
        <App />
      </BaseUrlProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
