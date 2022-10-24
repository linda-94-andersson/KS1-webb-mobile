import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Root from "./routes/Root";
import ErrorPage from "./Error.page";
import Calendar from "./routes/Calendar";
import TimerRender from "./routes/TimerRender";
import Overview from "./routes/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TimerRender />,
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
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
