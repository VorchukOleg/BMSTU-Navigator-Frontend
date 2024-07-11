import React from 'react';
import styles from '../../styles/set-coordinate.scss';

// eslint-disable-next-line react/prop-types
export default function CoordinateRow({xValue, yValue, onXChange, onYChange, onDelete}) {
  return (
    <div className='coordinate-section__element'>
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
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 28 28">
          <path fillRule="evenodd" d="M6.366 6.366a1.25 1.25 0 0 1 1.768 0L14 12.232l5.866-5.866a1.25 1.25 0 0 1 1.768
            1.768L15.768 14l5.866 5.866a1.25 1.25 0 0 1-1.768 1.768L14 15.768l-5.866 5.866a1.25 1.25 0
            0 1-1.768-1.768L12.232 14 6.366 8.134a1.25 1.25 0 0 1 0-1.768Z" clipRule="evenodd"/>\
        </svg>
      </button>
  </div>
  );
}
