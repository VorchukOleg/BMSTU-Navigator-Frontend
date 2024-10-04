import React, { useState } from 'react';
import styles from '../../styles/polygon-settings.scss';

export default function PolygonSettings() {
  const polygonTypes = [
    { value: 'rooms', label: 'Пространство общего пользования' },
    { value: 'service', label: 'Особое пространство' },
  ];

  const [selectedType, setSelectedType] = useState(polygonTypes[0].value);

  const polygonTitlesRooms = [
    { value: 'lecture', label: 'Лекционная' },
    { value: 'seminar', label: 'Семинарская' },
    { value: 'diningRoom', label: 'Столовая' },
    { value: 'cafe', label: 'Кафе' },
  ];
  const polygonTitlesService = [
    { value: 'toilet', label: 'Туалет' },
    { value: 'corridor', label: 'Коридор' },
    { value: 'serviceRoom', label: 'Служебное помещение' },
    { value: 'elevator', label: 'Лифт' },
  ];

  const handleChange = (event) => {
    setSelectedType(event.target.value === 'rooms' ? polygonTitlesRooms : polygonTitlesService);
  };

  const selectedTypeRef = React.createRef();
  const selectedNameRef = React.createRef();
  const selectedTitleRef = React.createRef();

  return (
    <div className='settings-container'>
      <div className='settings-container__dropdown settings-container__polygon-type'>
        <select
          ref={selectedTypeRef}
          className='dropdown__btn settings-container__polygon-type--btn'
          onChange={handleChange}
        >
          {polygonTypes.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className='settings-container__dropdown settings-container__polygon-name'>
        <select ref={selectedNameRef} className='dropdown__btn'>
            <option key='1' value='name'>
              Название
            </option>
        </select>
      </div>
      <div className='settings-container__dropdown settings-container__polygon-title'>
        <select ref={selectedTitleRef} className='dropdown__btn settings-container__polygon-title--btn'>
          {Array.isArray(selectedType) ? selectedType.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )) : polygonTitlesRooms.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>))}
        </select>
      </div>
    </div>
  );
}
