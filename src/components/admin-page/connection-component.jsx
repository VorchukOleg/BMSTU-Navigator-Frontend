import React, { useState, useEffect } from 'react';
import ConnectionListComponent from './connection-list-component.jsx';
import styles from '../../styles/connection-component.scss';
import { BUILDING_PROPERITES } from '../../routes/admin-page.jsx';
import { v4 as uuidv4 } from 'uuid';

export default function ConnectionComponent() {
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFloor, setCurrentFloor] = useState(1);
  const [searchPolygon1, setSearchPolygon1] = useState('');
  const [searchPolygon2, setSearchPolygon2] = useState('');
  const [searchConnection, setSearchConnection] = useState('');
  const [filteredConnections, setFilteredConnections] = useState([]);
  const [filteredPolygonOptions, setFilteredPolygonOptions] = useState([]);

  const selectedPolygon1Ref = React.createRef();
  const selectedPolygon2Ref = React.createRef();

  useEffect(() => {
    const currentFloorProperties = BUILDING_PROPERITES[currentFloor];
    if (currentFloorProperties) {
      const floorPolygons = [...currentFloorProperties.basenodes, ...currentFloorProperties.rooms];
      const filteredPolygonOptions = floorPolygons.map((polygon) => ({
        value: polygon.uuid,
        label: polygon.displayed_name,
        coordinates: polygon.coordinates,
      }));
      setFilteredPolygonOptions(filteredPolygonOptions);
    } else {
      console.error(`Нет данных для этажа ${currentFloor}`);
      setFilteredPolygonOptions([]);
    }
  }, [currentFloor]);

  useEffect(() => {
    setFilteredConnections(connections);
  }, [connections]);

  const calculateManhattanDistance = (coords1, coords2) => {
    return Math.abs(coords1.x - coords2.x) + Math.abs(coords1.y - coords2.y);
  };

  const calculateCenter = (coordinates) => {
    const xValues = Object.values(coordinates).map(coord => parseFloat(coord.x));
    const yValues = Object.values(coordinates).map(coord => parseFloat(coord.y));

    const centerX = (Math.min(...xValues) + Math.max(...xValues)) / 2;
    const centerY = (Math.min(...yValues) + Math.max(...yValues)) / 2;

    return { x: centerX, y: centerY };
  };

  const handleCreateLink = () => {
    const selectedPolygon1Value = selectedPolygon1Ref.current.value;
    const selectedPolygon2Value = selectedPolygon2Ref.current.value;

    if (!selectedPolygon1Value || !selectedPolygon2Value) {
      setErrorMessage('Пожалуйста, выберите оба полигона.');
      return;
    }

    if (selectedPolygon1Value === selectedPolygon2Value) {
      setErrorMessage('Пожалуйста, выберите разные полигоны для создания связи.');
      return;
    }

    const polygon1 = filteredPolygonOptions.find(option => option.value === selectedPolygon1Value);
    const polygon2 = filteredPolygonOptions.find(option => option.value === selectedPolygon2Value);

    if (!polygon1 || !polygon2) {
      setErrorMessage('Не удалось найти выбранные полигоны.');
      return;
    }

    const center1 = calculateCenter(polygon1.coordinates);
    const center2 = calculateCenter(polygon2.coordinates);
    const distance = calculateManhattanDistance(center1, center2);

    const newConnection = {
      uuid: uuidv4(),
      basepoint_1_uuid: selectedPolygon1Value,
      basepoint_2_uuid: selectedPolygon2Value,
      weight: distance,
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

    setConnections((prevConnections) => [...prevConnections, newConnection]);
    setErrorMessage('');

    // Alert с информацией о созданной связи
    alert(`Создана связь:\n${JSON.stringify(newConnection, null, 2)}`);

    // Сброс значений в выпадающих списках
    selectedPolygon1Ref.current.selectedIndex = 0;
    selectedPolygon2Ref.current.selectedIndex = 0;
  };

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value.toLowerCase();
    if (event.target.placeholder === "Поиск связи") {
      setSearchConnection(newSearchText);
    } else if (event.target.placeholder === "Поиск полигона 1") {
      setSearchPolygon1(newSearchText);
    } else {
      setSearchPolygon2(newSearchText);
    }
  };

  useEffect(() => {
    // Фильтрация связей на основе текста поиска
    const filtered = connections.filter((connection) =>
      connection.basepoint_1_uuid.toLowerCase().includes(searchConnection) ||
      connection.basepoint_2_uuid.toLowerCase().includes(searchConnection)
    );
    setFilteredConnections(filtered);
  }, [connections, searchConnection]);

  const handleSaveConnections = () => {
    const currentFloorProperties = BUILDING_PROPERITES[currentFloor];
  
    if (!currentFloorProperties) {
      setErrorMessage('Нет данных для текущего этажа.');
      return;
    }
  
    // Убедитесь, что connections инициализированы
    if (!currentFloorProperties.connections) {
      currentFloorProperties.connections = [];
    }
  
    // Добавляем новые связи к существующим
    currentFloorProperties.connections = [
      ...currentFloorProperties.connections,
      ...connections,
    ];
  
    // Создаем строку для алерта с информацией о всех локально созданных связях
    const connectionsAlert = connections.map(connection => 
      `UUID: ${connection.uuid}, Полигон 1: ${connection.basepoint_1_uuid}, Полигон 2: ${connection.basepoint_2_uuid}, Вес: ${connection.weight}, Этаж: ${connection.floor_number}`
    ).join('\n');
  
    // Уведомление о сохранении и вывод всех созданных связей
    alert(`Связи успешно сохранены!\n\nСозданные связи:\n${connectionsAlert}`);
    setErrorMessage('');
  };

  return (
    <div className="connection-component">
      <div className="connection-component__addition">
        <div className="connection-window">
          <div className="dropdown-container">
            <div className="dropdown"> {/* Первый выпадающий список */}
              <input
                type="text"
                className="dropdown__search-bar"
                placeholder="Поиск полигона 1"
                value={searchPolygon1}
                onChange={handleSearchChange}
              />
              <select ref={selectedPolygon1Ref} className="dropdown__btn">
                <option value="">Выберите полигон 1</option>
                {filteredPolygonOptions.filter((option) =>
                  option.label.toLowerCase().includes(searchPolygon1.toLowerCase())
                ).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown"> {/* Второй выпадающий список */}
              <input
                type="text"
                className="dropdown__search-bar"
                placeholder="Поиск полигона 2"
                value={searchPolygon2}
                onChange={handleSearchChange}
              />
              <select ref={selectedPolygon2Ref} className="dropdown__btn">
                <option value="">Выберите полигон 2</option>
                {filteredPolygonOptions.filter((option) =>
                  option.label.toLowerCase().includes(searchPolygon2.toLowerCase())
                ).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown"> {/* Поле для поиска связей */}
              <input
                type="text"
                className="dropdown__search-bar"
                placeholder="Поиск связи"
                value={searchConnection}
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
          {/* Добавляем кнопку для сохранения связей */}
          <button className="save-data-btn" onClick={handleSaveConnections}>
            Сохранить данные
          </button>
        </div>
      </div>
      <div className="connection-component__list">
        <ConnectionListComponent connections={filteredConnections} polygonOptions={filteredPolygonOptions} />
      </div>
    </div>
  );
}
