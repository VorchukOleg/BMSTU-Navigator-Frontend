import React from 'react';
import styles from '../styles/set-coordinate.scss';

// eslint-disable-next-line react/prop-types
export default function SetCoordinate({xValue, yValue, onXChange, onYChange, onDelete}) {
  return (
    <div className='coordinate-section__container'>
      <div className='coordinate-section__container--inputs'>
        <div className='coordinate-section__container--input-element'>
          X:
          <input
            type="number"
            value={xValue}
            onChange={onXChange}
            min="0"
          />
        </div>
        <div className='coordinate-section__container--input-element'>
          Y:
          <input
            type="number"
            value={yValue}
            onChange={onYChange}
            min="0"
          />
        </div>
      </div>
      <button
        className='coordinate-section__container--btn'
        onClick={onDelete}
      >Удалить</button>
  </div>
  );
}
