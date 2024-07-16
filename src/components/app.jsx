import React, { useState } from 'react';
import Header from './header';
import PolygonsList from './polygonList';
import './app.css';

const App = () => {
    const [polygons, setPolygons] = useState([
        { id: 1, name: 'Полигон 1' },
        { id: 2, name: 'Полигон 2' },
        { id: 3, name: 'Полигон 3' },
        { id: 3, name: 'Полигон 3' },
        { id: 3, name: 'Полигон 3' },
        { id: 3, name: 'Полигон 3' },
        { id: 3, name: 'Полигон 3' },
    ]);

    const deletePolygon = (id) => {
        setPolygons(polygons.filter(polygon => polygon.id !== id));
    };

    return (
        <div className="App">
            <Header />
            <PolygonsList polygons={polygons} deletePolygon={deletePolygon} />
        </div>
    );
};

export default App;
