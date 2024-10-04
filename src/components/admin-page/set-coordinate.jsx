import React, {useState} from 'react';
import CoordinateRow from './coordinate-row.jsx';

export default function SetCoordinate() {
  const [points, setPoints] = useState([{ x: '', y: '' }]);

  const addPoint = () => {
    setPoints([...points, { x: '', y: '' }]);
  };

  const deletePoint = (indexToDelete) => {
    const newPoints = [...points];
    newPoints.splice(indexToDelete, 1);
    setPoints(newPoints);
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
      <button className="btn-success" onClick={addPoint}>Добавить</button>
    </div>
  );
}
