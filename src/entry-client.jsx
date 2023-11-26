import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Routes from "./pages";

const router = createBrowserRouter(Routes);

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
