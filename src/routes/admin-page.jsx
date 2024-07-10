import React, {useState} from 'react';
import {
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import styles from '../styles/admin-page.scss';

export default function AdminPage() {
  const sections =
    {
      '/admin/editing':'Редактирование',
      '/admin/markup': 'Разметка',
      '/admin/connection': 'Свзяывание',
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
      </div>
    </div>
  );
}
