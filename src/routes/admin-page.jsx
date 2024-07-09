import React, {useState} from 'react';
import SetCoordinate from '../components/admin-page/set-coordinate.jsx';
import ConnectionComponent from '../components/admin-page/connection-component.jsx';
import styles from '../styles/admin-page.scss';
import { Outlet } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div className='admin-page'>
      <div className='admin-page__left-section'>
        <div className='building-plug'>
        </div>
        <Outlet />
      </div>
      <div className='admin-page__right-section'></div>
    </div>
  );
}
