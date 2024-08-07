import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/root.jsx';
import Building, {
  loader as buildingLoader,
  action as buildingAction,
} from './routes/building.jsx';
import Scheme, {loader as schemeLoader} from './routes/scheme.jsx';
import ErrorPage from './routes/error.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:buildingCode',
    element: <Building />,
    loader: buildingLoader,
    action: buildingAction,
    errorElement: <ErrorPage />,
    children: [
      {
          index: true,
        element: <image className='rounded-lg' href="images/665730fdc94d5.jpg" width="100%" height="100%" />,
      },
      {
        path: 'floor/:floorNum',
        element: <Scheme />,
        loader: schemeLoader,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
