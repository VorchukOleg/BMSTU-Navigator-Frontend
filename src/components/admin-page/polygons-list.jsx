import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUILDING_PROPERITES } from '../../routes/admin-page.jsx';
import styles from '../../styles/polygons-list.scss';

const PolygonContext = createContext();

export const usePolygonContext = () => useContext(PolygonContext);

export default function PolygonsList({currentFloor, onPolygonSelect}) {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    let floorProperties = new Array(0);
    if (BUILDING_PROPERITES[currentFloor] !== undefined) {
      floorProperties = floorProperties.concat(BUILDING_PROPERITES[currentFloor].basenodes);
      floorProperties = floorProperties.concat(BUILDING_PROPERITES[currentFloor].rooms);
    }

    setPolygons(floorProperties);
  }, [currentFloor]);

  const handlePolygonClick = (polygon) => {
    onPolygonSelect(polygon);
  };

  const handleAddPolygon = () => {
    const newPolygonName = `NewPol${polygons.length + 1}`;
    const newPolygon = {
      displayed_name: newPolygonName,
      coordinates: {},
      isNew: true
    };
    setPolygons([...polygons, newPolygon]);
    onPolygonSelect(newPolygon);
  };

  return (
    <PolygonContext.Provider value={{ polygons }}>
      <div className='polygons-list'>
        <div className='polygons-list__title'>
          Список полигонов:
        </div>
        {polygons.map((polygon, index) => (
          <div key={index} className='polygons-list__element'>
            <button
              className='polygons-list__element--btn'
              onClick={() => handlePolygonClick(polygon)}
            >
              {polygon.displayed_name}
            </button>
          </div>
        ))}
        <button className='polygons-list__add-btn' onClick={handleAddPolygon}>
          Добавить полигон
        </button>
      </div>
    </PolygonContext.Provider>
  );
}
