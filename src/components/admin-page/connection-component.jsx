import React, { useState, useEffect } from 'react';
import ConnectionListComponent from './connection-list-component.jsx';
import styles from '../../styles/connection-component.scss';
import { BUILDING_PROPERITES } from '../../routes/admin-page.jsx';

export default function ConnectionComponent() {
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedConnectionType, setSelectedConnectionType] = useState('');

  const connectionTypeOptions = [
    { value: 'corridor', label: 'Коридор' },
    { value: 'staircase', label: 'Лестница' },
    { value: 'elevator', label: 'Лифт' },
  ];

  const [searchPolygon, setSearchPolygon] = useState('');
  const [filteredConnections, setFilteredConnections] = useState([]);

  // No need for separate filter states for each dropdown
  const [filteredPolygonOptions, setFilteredPolygonOptions] = useState([]);

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

    const newConnection = `${selectedPolygon1Value} - ${selectedPolygon2Value} | ${selectedConnectionType}`;

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

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value.toLowerCase();
    setSearchPolygon(newSearchText);

    if (newSearchText) {
      setFilteredConnections(
        connections.filter((connection) =>
          connection.connection.toLowerCase().includes(newSearchText)
        )
      );
    } else {
      setFilteredConnections(connections); // Reset filtering when search is empty
    }
  };

  useEffect(() => {
    // Get all polygon displayed names from BUILDING_PROPERITES
    const allPolygonOptions = Object.values(BUILDING_PROPERITES)
  .flatMap((floor) => {
    if (floor.basenodes && Array.isArray(floor.basenodes)) {
      return [...floor.basenodes, ...floor.rooms];
    }

    return []; // Or handle the case as needed
  })
  .map((polygon) => ({
    value: polygon.displayed_name,
    label: polygon.displayed_name,
  }));

    setFilteredPolygonOptions(allPolygonOptions);
    setFilteredConnections(connections); // Initialize filteredConnections on mount
  }, [BUILDING_PROPERITES, connections]);

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
                // No separate filter state needed
                // value={polygon1FilterText}
                // onChange={handlePolygon1FilterChange}
              />
              <select ref={selectedPolygon1Ref} className="dropdown__btn">
                {filteredPolygonOptions.map((option) => (
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
                // No separate filter state needed
                // value={polygon2FilterText}
                // onChange={handlePolygon2FilterChange}
              />
              <select ref={selectedPolygon2Ref} className="dropdown__btn">
                {filteredPolygonOptions.map((option) => (
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
            <div className="dropdown"> {/* Added search bar */}
              <input
                type="text"
                className="dropdown__search-bar"
                placeholder="Поиск связи"
                value={searchPolygon}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          <button className="create-link-btn" onClick={handleCreateLink}>
            Создать связь
          </button>
        </div>
      </div>
      <div className="connection-component__list">
        <ConnectionListComponent connections={filteredConnections} />
      </div>
    </div>
  );
}