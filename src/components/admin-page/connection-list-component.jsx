import React from 'react';
import styles from '../../styles/connection-list-component.scss';

//проблема: при переключении этажа названия полигонов в списке меняются
//на uuid этих полигонов. В целом не критично, так как человек будет
//работать за раз с одним этажом
export default function ConnectionListComponent({ connections, polygonOptions }) {
  const polygonNameMap = polygonOptions.reduce((acc, option) => {
    acc[option.value] = option.label;

    return acc;
  }, {});

  return (
    <div className="connection-list-component">
      <ul className="connection-list" style={{ overflowY: 'auto' }}>
        {connections.map((connection) => {
          const polygon1Name = polygonNameMap[connection.basepoint_1_uuid] || connection.basepoint_1_uuid;
          const polygon2Name = polygonNameMap[connection.basepoint_2_uuid] || connection.basepoint_2_uuid;

          return (
            <li key={connection.uuid}>
              {polygon1Name} - {polygon2Name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
