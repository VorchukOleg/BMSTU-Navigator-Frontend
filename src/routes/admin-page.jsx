import React, {useState} from 'react';
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation
} from 'react-router-dom';
import PolygonsList from '../components/admin-page/polygons-list.jsx';
import FloorNavigation from '../components/shared/floor-navigation.jsx';
import styles from '../styles/admin-page.scss';
import ajax from '../modules/ajax.js';
import { API_ROUTES, BUILDING_NAMES } from '../config.js';

export const BUILDING_PROPERITES = {};

export async function loader({request}) {
  const url = new URL(request.url);
  const buildingCode = url.searchParams.get('building');
  const floorNum = url.searchParams.get('floor');

  const floors = [];

  await ajax.get(
    API_ROUTES.ADMIN_DATA(buildingCode),
    (data) => {
      Object.keys(data).map((key) => {
        const floor = {
          id: data[key].floor.uuid,
          floorNumber: data[key].floor.floor_number,
          selected: false,
        };

        BUILDING_PROPERITES[floor.floorNumber] = {
          basenodes: data[key].basenodes,
          rooms: data[key].rooms,
          connections: data[key].connections,
        };

        floors.push(floor);
      });
    }
  );

  return {buildingCode, floorNum, floors};
}

export default function AdminPage() {
  const sections =
    {
      '/admin/editing':'Редактирование',
      '/admin/markup': 'Разметка',
      '/admin/connection': 'Связывание Технические работы',
      '/admin/settings': 'Настройки полигона',
    };

  const {buildingCode, floorNum, floors} = useLoaderData();

  const location = useLocation();
  const activeRouteName = sections[location.pathname];
  const activeRoute = location.pathname;
  const activeBuilding = BUILDING_NAMES[buildingCode];

  const [isVisibleRoute, setIsVisibleRoute] = useState(false);
  const [isVisibleBuilding, setIsVisibleBuilding] = useState(false);

  const toggleVisibilityRoute = () => {
    setIsVisibleRoute(!isVisibleRoute);
    if(!isVisibleRoute && isVisibleBuilding) {
      setIsVisibleBuilding(!isVisibleBuilding);
    }
  };
  const toggleVisibilityBuidling = () => {
    setIsVisibleBuilding(!isVisibleBuilding);
    if(isVisibleRoute && !isVisibleBuilding) {
      setIsVisibleRoute(!isVisibleRoute);
    }
  };

  const buildFloorLink = (floorNum) => {
    return `${location.pathname}?building=${buildingCode}&floor=${floorNum}`;
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
            onClick={toggleVisibilityRoute}
          >
            <span>{activeRouteName}</span>
          </button>
          {isVisibleRoute && (
            <div className='routes-dropdown__content'>
              {Object.entries(sections).map((section, index) => (
                <Link
                  to={`${section[0]}${location.search}`}
                  key={index}
                  onClick={toggleVisibilityRoute}
                >{section[1]}</Link>
              ))}
            </div>
          )}
        </div>
        <div className='buildings-dropdown'>
          <button
            className='buildings-dropdown__btn dropdown__btn'
            onClick={toggleVisibilityBuidling}
          >
            <span>{activeBuilding}</span>
          </button>
          {isVisibleBuilding && (
            <div className='buildings-dropdown__content'>
              {Object.entries(BUILDING_NAMES).map((name, index) => (
                <Link
                  to={`${activeRoute}?building=${name[0]}&?floor=1`}
                  key={index}
                  onClick={toggleVisibilityBuidling}
                >{name[1]}</Link>
              ))}
            </div>
          )}
        </div>
        <FloorNavigation floors={floors} buildLink={buildFloorLink} />
        <PolygonsList />
      </div>
    </div>
  );
}
