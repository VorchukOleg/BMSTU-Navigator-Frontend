import React, { useState } from 'react';
import ConnectionListComponent from './connection-list-component.jsx';
import styles from '../../styles/connection-component.scss';

export default function ConnectionComponent() {
  const [polygonOptions, setPolygonOptions] = useState([
    { value: 'polygon1', label: 'Полигон 1' },
    { value: 'polygon2', label: 'Полигон 2' },
    { value: 'polygon3', label: 'Полигон 3' },
    { value: 'polygon4', label: 'Полигон 4' },
    { value: 'polygon5', label: 'Полигон 5' },
  ]);

  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateLink = () => {
    const selectedPolygon1Value = selectedPolygonRef.current.value;
    const selectedPolygon2Value = selectedPolygon2Ref.current.value;

    if (selectedPolygon1Value === selectedPolygon2Value) {
      setErrorMessage('Пожалуйста, выберите разные полигоны для создания связи.');
      return;
    }

    const newConnection = `${selectedPolygon1Value} - ${selectedPolygon2Value}`;

    const existingConnection = connections.find(
      (connection) => connection.connection === newConnection
    );

    if (existingConnection) {
      setErrorMessage('Эта связь уже создана.');
      return;
    }

    setConnections((prevConnections) => [
      ...prevConnections,
      { id: Math.random().toString(36).substring(2, 15), connection: newConnection },
    ], () => {
      console.log('Connections updated!');
      setErrorMessage('');
    });

    selectedPolygonRef.current.selectedIndex = 0;
    selectedPolygon2Ref.current.selectedIndex = 0;
  };

  const selectedPolygonRef = React.createRef();
  const selectedPolygon2Ref = React.createRef();

  return (
    <div className="connection-component">
      <div className="connection-component__addition">
        <div className="connection-window">
          <div className="dropdown-container">
            <div className="dropdown">
              <select ref={selectedPolygonRef} className="dropdown__btn">
                {polygonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown">
              <select ref={selectedPolygon2Ref} className="dropdown__btn">
                {polygonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          <button className="create-link-btn" onClick={handleCreateLink}>
            Создать связь
          </button>
        </div>
      </div>
      <div className="connection-component__list">
        <ConnectionListComponent connections={connections} />
      </div>
    </div>
  );
}
