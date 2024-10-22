import React from 'react';
import styles from '../../styles/connection-list-component.scss';

export default function ConnectionListComponent({ connections, polygonOptions }) {
  return (
    <div className="connection-list-component">
      <ul className="connection-list" style={{ overflowY: 'auto' }}>
        {connections.map((connection) => {
          const polygon1 = polygonOptions.find(option => option.value === connection.basepoint_1_uuid);
          const polygon2 = polygonOptions.find(option => option.value === connection.basepoint_2_uuid);

          return (
            <li key={connection.uuid}>
              {polygon1 ? polygon1.label : connection.basepoint_1_uuid} - {polygon2 ? polygon2.label : connection.basepoint_2_uuid}
            </li>
          );
        })}
      </ul>
    </div>
  );
}