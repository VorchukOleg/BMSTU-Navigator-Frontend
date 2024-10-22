import React, { useState, useEffect } from 'react';
import ConnectionListComponent from './connection-list-component.jsx';
import styles from '../../styles/connection-component.scss';
import { BUILDING_PROPERITES } from '../../routes/admin-page.jsx';
import { v4 as uuidv4 } from 'uuid';

export default function ConnectionComponent() {
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFloor, setCurrentFloor] = useState(1); // Текущий этаж
  const [searchPolygon, setSearchPolygon] = useState('');
  const [filteredConnections, setFilteredConnections] = useState([]);
  const [filteredPolygonOptions, setFilteredPolygonOptions] = useState([]);

  const handleCreateLink = () => {
    const selectedPolygon1Value = selectedPolygon1Ref.current.value;
    const selectedPolygon2Value = selectedPolygon2Ref.current.value;

    if (selectedPolygon1Value === selectedPolygon2Value) {
      setErrorMessage('Пожалуйста, выберите разные полигоны для создания связи.');
      return;
    }

    const newConnection = {
      uuid: uuidv4(),
      basepoint_1_uuid: selectedPolygon1Value,
      basepoint_2_uuid: selectedPolygon2Value,
      weight: 12345, // заглушка
      floor_number: currentFloor,
    };

    const existingConnection = connections.find(
      (connection) =>
        (connection.basepoint_1_uuid === selectedPolygon1Value &&
          connection.basepoint_2_uuid === selectedPolygon2Value) ||
        (connection.basepoint_1_uuid === selectedPolygon2Value &&
          connection.basepoint_2_uuid === selectedPolygon1Value)
    );

    if (existingConnection) {
      setErrorMessage('Эта связь уже создана.');
      return;
    }

    setConnections((prevConnections) => [...prevConnections, newConnection], () => {
      console.log('Connections updated!');
      setErrorMessage('');
    });

    selectedPolygon1Ref.current.selectedIndex = 0;
    selectedPolygon2Ref.current.selectedIndex = 0;
  };

  const handleSaveConnections = () => {
    const newConnections = connections.filter((connection) => !BUILDING_PROPERITES[currentFloor].connections.includes(connection));
    const newBuildingProperties = { ...BUILDING_PROPERITES };
    newBuildingProperties[currentFloor].connections = [...newBuildingProperties[currentFloor].connections, ...newConnections];
    BUILDING_PROPERITES[currentFloor].connections = newBuildingProperties[currentFloor].connections;
    alert('Связи успешно сохранены!');
  };

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value.toLowerCase();
    setSearchPolygon(newSearchText);

    if (newSearchText) {
      setFilteredConnections(
        connections.filter((connection) =>
          connection.basepoint_1_uuid.toLowerCase().includes(newSearchText) ||
          connection.basepoint_2_uuid.toLowerCase().includes(newSearchText)
        )
      );
    } else {
      setFilteredConnections(connections);
    }
  };

  const selectedPolygon1Ref = React.createRef();
  const selectedPolygon2Ref = React.createRef();

  useEffect(() => {
    const currentFloorProperties = BUILDING_PROPERITES[currentFloor];
    if (currentFloorProperties) {
      const floorPolygons = [...currentFloorProperties.basenodes, ...currentFloorProperties.rooms];
      const filteredPolygonOptions = floorPolygons.map((polygon) => ({
        value: polygon.displayed_name,
        label: polygon.displayed_name,
      }));
      setFilteredPolygonOptions(filteredPolygonOptions);
    } else {
      setFilteredPolygonOptions([]);
    }
  }, [BUILDING_PROPERITES, currentFloor]);

  useEffect(() => {
    setFilteredConnections(connections);
  }, [connections]);

  const [searchPolygon1, setSearchPolygon1] = useState('');
  const [searchPolygon2, setSearchPolygon2] = useState('');

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
                value={searchPolygon1}
                onChange={(e) => setSearchPolygon1(e.target.value)}
              />
              <select ref={selectedPolygon1Ref} className="dropdown__btn">
                {filteredPolygonOptions.filter((option) =>
                  option.label.toLowerCase().includes(searchPolygon1.toLowerCase())
                ).map((option) => (
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
                value={searchPolygon2}
                onChange={(e) => setSearchPolygon2(e.target.value)}
              />
              <select ref={selectedPolygon2Ref} className="dropdown__btn">
                {filteredPolygonOptions.filter((option) =>
                  option.label.toLowerCase().includes(searchPolygon2.toLowerCase())
                ).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown">
            </div>
            <div className="dropdown">
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
          <button className="save-btn" onClick={handleSaveConnections}>
            Сохранить
          </button>
        </div>
      </div>
      <div className="connection-component__list">
        <ConnectionListComponent connections={filteredConnections} />
      </div>
    </div>
  );
}
