import React, { useState, useRef, useEffect } from 'react';
import './custom-dropdown.scss'; // Файл стилей

const CustomDropdown = ({ options, selectedValue, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentLabel = selectedValue 
    ? options.find(option => option.value === selectedValue)?.label 
    : placeholder;

  return (
    <div className="dropdown-select" ref={dropdownRef}>
      <div 
        className={`dropdown-select__current ${isOpen ? 'open' : ''}`} 
        onClick={toggleDropdown}
      >
        {currentLabel}
        <span className="dropdown-select__arrow"></span>
      </div>
      
      {isOpen && (
        <div className="dropdown-select__list">
          <div className="dd-search">
            <input 
              type="text" 
              className="dd-searchbox" 
              placeholder="Поиск..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul>
            {filteredOptions.map(option => (
              <li 
                key={option.value} 
                className={`option ${selectedValue === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
