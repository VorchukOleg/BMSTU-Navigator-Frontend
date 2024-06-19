import React from "react";
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, {loader as rootLoader} from "../src/routes/root.jsx";
import Scheme, {loader as schemeLoader} from "../src/routes/scheme.jsx";

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);