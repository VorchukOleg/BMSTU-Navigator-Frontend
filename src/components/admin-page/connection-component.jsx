import React, { useState, useEffect } from 'react';
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
  const [selectedConnectionType, setSelectedConnectionType] = useState('');

  const connectionTypeOptions = [
    { value: 'corridor', label: 'Коридор' },
    { value: 'staircase', label: 'Лестница' },
    { value: 'elevator', label: 'Лифт' },
  ];

  const [polygon1FilterText, setPolygon1FilterText] = useState('');
  const [polygon2FilterText, setPolygon2FilterText] = useState('');
  const [filteredPolygon1Options, setFilteredPolygon1Options] = useState(polygonOptions);
  const [filteredPolygon2Options, setFilteredPolygon2Options] = useState(polygonOptions);

  const handleCreateLink = () => {
    const selectedPolygon1Value = selectedPolygon1Ref.current.value;
    const selectedPolygon2Value = selectedPolygon2Ref.current.value;

    if (selectedPolygon1Value === selectedPolygon2Value) {
      setErrorMessage('Пожалуйста, выберите разные полигоны для создания связи.');
      return;
    }

    if (!selectedConnectionType) {
      setErrorMessage('Пожалуйста, выберите тип связи.');
      return;
    }

    const newConnection = `${selectedPolygon1Value} - ${selectedPolygon2Value} | ${selectedConnectionType}`; // Include connection type

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

    selectedPolygon1Ref.current.selectedIndex = 0;
    selectedPolygon2Ref.current.selectedIndex = 0;
    setSelectedConnectionType(''); // Clear selected connection type
  };

  const selectedPolygon1Ref = React.createRef();
  const selectedPolygon2Ref = React.createRef();

  const handlePolygon1FilterChange = (event) => {
    const newFilterText = event.target.value.toLowerCase();
    setPolygon1FilterText(newFilterText);
    setFilteredPolygon1Options(
      polygonOptions.filter((option) => option.label.toLowerCase().includes(newFilterText))
    );
  };

  const handlePolygon2FilterChange = (event) => {
    const newFilterText = event.target.value.toLowerCase();
    setPolygon2FilterText(newFilterText);
    setFilteredPolygon2Options(
      polygonOptions.filter((option) => option.label.toLowerCase().includes(newFilterText))
    );
  };

  useEffect(() => {
    setFilteredPolygon1Options(polygonOptions);
    setFilteredPolygon2Options(polygonOptions);
  }, [polygonOptions]);

  return (
    <div className="connection-component">
      <div className="connection-component__addition">
        <div className="connection-window">
          <div className="dropdown-container">
            <div className="dropdown"> {/* First dropdown */}
              <input
                type="text"
                className="dropdown__search-bar"
                placeholder="Поиск полигона"
                value={polygon1FilterText}
                onChange={handlePolygon1FilterChange}
              />
              <select ref={selectedPolygon1Ref} className="dropdown__btn">
                {filteredPolygon1Options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown"> {/* Second dropdown */}
              <input
                type="text"
                className="dropdown__search-bar"
                placeholder="Поиск полигона"
                value={polygon2FilterText}
                onChange={handlePolygon2FilterChange}
              />
              <select ref={selectedPolygon2Ref} className="dropdown__btn">
                {filteredPolygon2Options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown"> {/* Added third dropdown */}
              <select
                value={selectedConnectionType}
                onChange={(e) => setSelectedConnectionType(e.target.value)}
                className="dropdown__btn"
              >
                <option value="">Выберите тип связи</option>
                {connectionTypeOptions.map((option) => (
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
