import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LeaderProvider } from "./context/LeaderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LeaderProvider>
        <App />
      </LeaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
