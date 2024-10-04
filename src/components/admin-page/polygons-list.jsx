import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUILDING_PROPERITES } from '../../routes/admin-page.jsx';
import styles from '../../styles/polygons-list.scss';

const PolygonContext = createContext();

export const usePolygonContext = () => useContext(PolygonContext);

// eslint-disable-next-line react/prop-types
export default function PolygonsList({currentFloor}) {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    let floorProperties = new Array(0);
    if (BUILDING_PROPERITES[currentFloor] !== undefined) {
      floorProperties = floorProperties.concat(BUILDING_PROPERITES[currentFloor].basenodes);
      floorProperties = floorProperties.concat(BUILDING_PROPERITES[currentFloor].rooms);
    }

    setPolygons(floorProperties);
  }, [currentFloor]);

  const addPolygon = () => {
    setPolygons([...polygons, '']);
  };

  const deletePolygon = (indexToDelete) => {
    const newPolygons = polygons.filter((_, index) => index !== indexToDelete);
    setPolygons(newPolygons);
  };

  const savePolygon = (ev) => {
    //Функция для сохранения полигона при изменении input
    console.log(ev.target.value);
  };

  return (
    <PolygonContext.Provider value={{ polygons, addPolygon, deletePolygon }}>
      <div className='polygons-list'>
        <div className='polygons-list__title'>
          Список полигонов:
        </div>
        {polygons.map((polygon, index) => (
          <div key={index} className='polygons-list__element'>
            <input
              className='polygons-list__element--input'
              value={polygon.displayed_name}
              onChange={savePolygon}
            ></input>
            <button
              className='polygons-list__element--btn'
              onClick={() => deletePolygon(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 28 28">
                <path fillRule="evenodd" d="M6.366 6.366a1.25 1.25 0 0 1 1.768 0L14 12.232l5.866-5.866a1.25 1.25 0
                  0 1 1.768 1.768L15.768 14l5.866 5.866a1.25 1.25 0 0 1-1.768 1.768L14 15.768l-5.866 5.866a1.25 1.25 0
                  0 1-1.768-1.768L12.232 14 6.366 8.134a1.25 1.25 0 0 1 0-1.768Z" clipRule="evenodd"/>\
              </svg>
            </button>
          </div>
        ))}
        <button
          className='btn-success polygons-list__add-btn'
          onClick={addPolygon}
        >
            Добавить новый полигон
        </button>
      </div>
    </PolygonContext.Provider>
  );
};
