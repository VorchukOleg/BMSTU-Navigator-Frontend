import React, { useState } from 'react';
import './polygonList.css';

const PolygonsList = ({ polygons, deletePolygon }) => {
    const [activeId, setActiveId] = useState(null);

    const handleClick = (id) => {
        setActiveId(activeId === id ? null : id); // Тoggles active state
    };

    return (
        <ul>
            {polygons.map((polygon) => (
                <li key={polygon.id}>
                    <span onClick={() => handleClick(polygon.id)} style={{ cursor: 'pointer' }}>{polygon.name}</span>
                    <input
                        type="text"
                        value={polygon.name}
                        readOnly
                        style={{ opacity: 0 }}
                        onFocus={() => setActiveId(polygon.id)} // Set active on focus
                        onBlur={() => setActiveId(null)} // Reset active on blur
                    />
                    <button onClick={() => deletePolygon(polygon.id)}>Удалить</button>
                </li>
            ))}
        </ul>
    );
};

export default PolygonsList;
