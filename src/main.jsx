import './index.scss';
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
import AdminPage, {loader as adminLoader} from './routes/admin-page.jsx';
import ErrorPage from './routes/error.jsx';
import ConnectionComponent from './components/admin-page/connection-component.jsx';
import SetCoordinate from './components/admin-page/set-coordinate.jsx';
import PolygonSettings from './components/admin-page/polygon-settings.jsx';
import FindCoordinates from './components/admin-page/find-coordinates.jsx';
import ajax from './modules/ajax.js';
import { API_ROUTES } from './config.js';
import { useOutletContext } from 'react-router-dom';

ajax.initialize(API_ROUTES);

function ConnectionWrapper() {
  const context = useOutletContext();
  const floorNum = context ? context.floorNum : null;

  if (floorNum === null) {
    return <div>Loading...</div>; // или любой другой компонент загрузки
  }

  return <ConnectionComponent floorNum={floorNum} />;
}


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
  {
    path: '/admin',
    element: <AdminPage />,
    loader: adminLoader,
    children: [
      {
        path: 'editing',
        element: <SetCoordinate />,
      },
      {
        path: 'connection',
        element: <ConnectionWrapper />
      },
      {
        path: 'settings',
        element: <PolygonSettings />,
      },
      {
        path: 'findCoords',
        element: <FindCoordinates />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
