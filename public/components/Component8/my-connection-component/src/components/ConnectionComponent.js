import React, { useState } from 'react';

const ConnectionComponent = () => {
  const [polygonOptions, setPolygonOptions] = useState([
    { value: 'polygon1', label: 'Полигон 1' },
    { value: 'polygon2', label: 'Полигон 2' },
    { value: 'polygon3', label: 'Полигон 3' },
    { value: 'polygon4', label: 'Полигон 4' },
    { value: 'polygon5', label: 'Полигон 5' },
  ]);

  const handleCreateLink = () => {
    const selectedPolygon1 = selectedPolygonRef.current.value;
    const selectedPolygon2 = selectedPolygon2Ref.current.value;
    console.log(`Создана связь между полигонами: ${selectedPolygon1} и ${selectedPolygon2}`);
  };

  const selectedPolygonRef = React.createRef();
  const selectedPolygon2Ref = React.createRef();

  return (
    <div className="connection-component">
      <div className="connection-window">
        <div className="dropdown-container">
          <div className="dropdown-wrapper">
            <select ref={selectedPolygonRef} className="dropdown">
              {polygonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-wrapper">
            <select ref={selectedPolygon2Ref} className="dropdown">
              {polygonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="create-link-btn" onClick={handleCreateLink}>
          Создать связь
        </button>
      </div>
    </div>
  );
};

export default ConnectionComponent;
