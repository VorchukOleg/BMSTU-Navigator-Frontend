import React, { createContext, useContext, useState } from 'react';

const PolygonContext = createContext();

export const usePolygonContext = () => useContext(PolygonContext);

export default function PolygonProvider({children}) {
  const [polygons, setPolygons] = useState([
    'Полигоны 1',
    'Полигоны 2',
    'Полигоны 3',
    'Полигоны 4',
    'Полигоны 5',
    'Полигоны 6',
    'Полигоны 7',
    'Полигоны 8'
  ]);

  const addPolygon = (newPolygon) => {
    setPolygons([...polygons, newPolygon]);
  };

  const deletePolygon = (indexToDelete) => {
    const newPolygons = polygons.filter((_, index) => index !== indexToDelete);
    setPolygons(newPolygons);
  };

  return (
    <PolygonContext.Provider value={{ polygons, addPolygon, deletePolygon }}>
      {children}
    </PolygonContext.Provider>
  );
};
