import React from "react";
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, {loader as rootLoader} from "./routes/root.jsx";
import Scheme, {loader as schemeLoader} from "./routes/scheme.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <div>Error!</div>,
    children: [
      {
        index: true,
        element: <div>Testing index...</div>
      },
      {
        path: "floor/:floorUUID",
        element: <Scheme />,
        loader: schemeLoader,
      }
    ],
  },
]);

const root =ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);