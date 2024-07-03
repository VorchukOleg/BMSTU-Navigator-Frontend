import React from "react";
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as routeAction,
} from "./routes/root.jsx";
import Scheme, {loader as schemeLoader} from "./routes/scheme.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: routeAction,
    errorElement: <div>Error!</div>,
    children: [
      {
        index: true,
        // Здесь нужно что-то придумать. Возможно, в индексе должен отображаться первый этаж
        element: <div>Testing index...</div>
      },
      {
        path: "floor/:floorNum",
        element: <Scheme />,
        loader: schemeLoader,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
