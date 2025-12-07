import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LeaderProvider } from "./context/LeaderContext";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LeaderProvider>
        <NotificationProvider>  
          <App />
        </NotificationProvider>
      </LeaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);