import React, {useState} from 'react';
import SetCoordinate from '../components/set-coordinate.jsx';

export default function AdminPage() {
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
    <div className='admin-page'>
      <div className='admin-page__left-section'>
        <div className='building-plug'>
        </div>
        <div className='coordinate-section'>
          {points.map((point, index) => (
            <SetCoordinate
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
          <button className="coordinate-section__add-btn" onClick={addPoint}>Добавить</button>
        </div>
      </div>
      <div className='admin-page__right-section'></div>
    </div>
  );
}
