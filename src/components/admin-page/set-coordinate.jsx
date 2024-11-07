import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import CoordinateRow from './coordinate-row.jsx';

export default function SetCoordinate() {
  const { selectedPolygon, onSavePolygon } = useOutletContext();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (selectedPolygon && selectedPolygon.coordinates) {
      const coordinatePairs = Object.entries(selectedPolygon.coordinates).map(([key, value]) => ({
        x: value.x,
        y: value.y
      }));
      setPoints(coordinatePairs);
    } else {
      setPoints([{ x: '', y: '' }]);
    }
  }, [selectedPolygon]);

  const addPoint = () => {
    setPoints([...points, { x: '', y: '' }]);
  };

  const deletePoint = (indexToDelete) => {
    const newPoints = [...points];
    newPoints.splice(indexToDelete, 1);
    setPoints(newPoints);
  };

  const handleSave = () => {
    const coordinates = points.reduce((acc, point, index) => {
      acc[index] = { x: parseFloat(point.x), y: parseFloat(point.y) };
      return acc;
    }, {});

    const updatedPolygon = {
      ...selectedPolygon,
      coordinates: coordinates
    };

    onSavePolygon(updatedPolygon);
  };

  return (
    <div className='coordinate-section'>
      <div className='coordinate-section__container'>
        {points.map((point, index) => (
          <CoordinateRow
            key={index}
            xValue={point.x}
            yValue={point.y}
            onXChange={(e) => {
              const newPoints = [...points];
              newPoints[index].x = e.target.value;
              setPoints(newPoints);
            }}
            onYChange={(e) => {
              const newPoints = [...points];
              newPoints[index].y = e.target.value;
              setPoints(newPoints);
            }}
            onDelete={() => deletePoint(index)}
            index={index}
          />
        ))}
      </div>
      <button className="coordinate-section__btn coordinate-section__btn--add" onClick={addPoint}>
        Добавить точку
      </button>
      <button className="coordinate-section__btn coordinate-section__btn--save" onClick={handleSave}>
        Сохранить полигон
      </button>
    </div>
  );
}
