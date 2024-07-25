import React, { useState } from 'react';
import { usePolygonContext } from './PolygonContext';

const PolygonList = () => {
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

      {/* Кнопка "Добавить полигон" */}
      <button onClick={handleAddPolygon}>Добавить новый полигон</button>

      {/* Кнопка "свернуть"/"развернуть" */}
      <button onClick={() => setArePolygonsVisible(!arePolygonsVisible)}>
        {arePolygonsVisible ? 'Свернуть' : 'Развернуть'}
      </button>
    </div>
  );
};

export default PolygonList;
