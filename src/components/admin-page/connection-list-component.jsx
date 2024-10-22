import React from 'react';
import styles from '../../styles/connection-list-component.scss';

export default function ConnectionListComponent({ connections }) {
  return (
    <div className="connection-list-component">
      <ul className="connection-list" style={{ overflowY: 'auto' }}>
        {connections.map((connection) => (
          <li key={connection.uuid}> {/* Используем уникальный uuid */}
            {connection.basepoint_1_uuid} - {connection.basepoint_2_uuid}
          </li>
        ))}
      </ul>
    </div>
  );
}