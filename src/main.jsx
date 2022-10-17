import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./Error.page";
import Calendar from "./routes/Calendar";
import Timer from "./routes/Timer";
import Overview from "./routes/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "timer",
        element: <Timer />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
