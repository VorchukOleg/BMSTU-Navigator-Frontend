import React, {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import styles from '../styles/admin-page.scss';

export default function AdminPage() {
  const sections = [
    {
      name: 'Редактирование',
      href: '/admin/editing',
    },
    {
      name: 'Разметка',
      href: '/admin/markup',
    },
    {
      name: 'Свзяывание',
      href: '/admin/connection',
    },
    {
      name: 'Настройки полигона',
      href: '/admin/settings',
    },
  ];

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
          <button className='routes-dropdown__btn' onClick={toggleVisibility}><span>Выберите опцию</span></button>
          {isVisible && (
            <div className='routes-dropdown__content'>
              {sections.map((section, index) => (
                <Link
                  to={section.href}
                  key={index}
                  onClick={toggleVisibility}
                >{section.name}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
