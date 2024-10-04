import React from 'react';
import styles from '../../styles/connection-list-component.scss';

export default function ConnectionListComponent({ connections }) {
  return (
    <div className="connection-list-component">
      <ul className="connection-list" style={{ overflowY: 'auto' }}>
        {connections.length > 0 ? (
          connections.map((connection) => (
            <li key={connection.id}>{connection.connection}</li>
          ))
        ) : (
          <li className="empty-message">Нет созданных связей</li>
        )}
      </ul>
    </div>
  );
}