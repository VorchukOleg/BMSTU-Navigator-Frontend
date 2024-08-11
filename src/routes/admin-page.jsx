import React, {useState} from 'react';
import {
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import PolygonsList from '../components/admin-page/polygons-list.jsx';
import styles from '../styles/admin-page.scss';
import ajax from '../modules/ajax.js';
import { API_ROUTES } from '../config.js';

export async function loader() {
  const url = API_ROUTES.ADMIN_DATA();
  ajax.get(
    API_ROUTES.ADMIN_DATA(),
    (data) => {
      console.log(data);
    }
  );

  return null;
}

export default function AdminPage() {
  const sections =
    {
      '/admin/editing':'Редактирование',
      '/admin/markup': 'Разметка',
      '/admin/connection': 'Связывание Технические работы',
      '/admin/settings': 'Настройки полигона',
    };

  const location = useLocation();
  const activeName = sections[location.pathname];

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='admin-page'>
      <div className='admin-page__left-section'>
        <div className='building-plug'>
        </div>
        <Outlet />
      </div>
      <div className='admin-page__right-section'>
        <div className='routes-dropdown'>
          <button
            className='routes-dropdown__btn dropdown__btn'
            onClick={toggleVisibility}
          >
            <span>{activeName}</span>
          </button>
          {isVisible && (
            <div className='routes-dropdown__content'>
              {Object.entries(sections).map((section, index) => (
                <Link
                  to={section[0]}
                  key={index}
                  onClick={toggleVisibility}
                >{section[1]}</Link>
              ))}
            </div>
          )}
        </div>
        <PolygonsList>
        </PolygonsList>
      </div>
    </div>
  );
}
