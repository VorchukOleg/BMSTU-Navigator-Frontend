import React, { createContext, useContext, useState } from 'react';

const PolygonContext = createContext();

export const usePolygonContext = () => useContext(PolygonContext);

export default function PolygonsList() {
  const [polygons, setPolygons] = useState([
    'Полигоны 1',
    'Полигоны 2',
    'Полигоны 3',
    'Полигоны 4',
    'Полигоны 5',
    'Полигоны 6',
    'Полигоны 7',
    'Полигоны 8'
  ]);

  const addPolygon = (newPolygon) => {
    setPolygons([...polygons, newPolygon]);
  };

  const deletePolygon = (indexToDelete) => {
    const newPolygons = polygons.filter((_, index) => index !== indexToDelete);
    setPolygons(newPolygons);
  };

  const handleAddPolygon = () => {
    // Функция для добавления нового полигона
  };

  return (
    <PolygonContext.Provider value={{ polygons, addPolygon, deletePolygon }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', width: '100%' }}>
          Список полигонов:
        </div>
        {polygons.map((polygon, index) => (
          <div
            key={index}
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', width: '100%' }}
          >
            {polygon}
            <button onClick={() => deletePolygon(index)}>Удалить</button>
          </div>
        ))}
        <button onClick={handleAddPolygon}>Добавить новый полигон</button>
      </div>
    </PolygonContext.Provider>
  );
};
