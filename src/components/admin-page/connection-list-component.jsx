import React from 'react';
import styles from '../../styles/connection-list-component.scss';

export default function ConnectionListComponent({connections}) {
  return (
    <div className="connection-list-component">
      <ul className="connection-list">
        {connections.length > 0 ? (
          connections.map((connection) => (
            <li key={connection.id || connection}>
              {connection}
            </li>
          ))
        ) : (
          <li className="empty-message">Нет созданных связей</li>
        )}
      </ul>
      {connections.length > 5 && (
        <div className="scrollbar-container">
          <div className="scrollbar" />
        </div>
      )}
    </div>
  );
};
