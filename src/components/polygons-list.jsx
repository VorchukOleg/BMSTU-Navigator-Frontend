import React, { useState } from 'react';
import { usePolygonContext } from './polygon-context.jsx';

export default function PolygonList() {
  const { polygons, deletePolygon } = usePolygonContext();
  const [arePolygonsVisible, setArePolygonsVisible] = useState(true);

  const handleAddPolygon = () => {
    // Функция для добавления нового полигона
  };

  return (
    <div>
      {arePolygonsVisible ? polygons.map((polygon, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          {polygon}
          <button onClick={() => deletePolygon(index)}>Удалить</button>
        </div>
      )) : null}

      <button onClick={handleAddPolygon}>Добавить новый полигон</button>

      <button onClick={() => setArePolygonsVisible(!arePolygonsVisible)}>
        {arePolygonsVisible ? 'Свернуть' : 'Развернуть'}
      </button>
    </div>
  );
};
