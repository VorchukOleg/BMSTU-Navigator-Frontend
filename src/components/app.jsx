import React, { useState } from 'react';
import Header from './header';
import { PolygonProvider } from './PolygonContext';
import PolygonList from './PolygonList';

const App = () => {
  return (
    <div style={{ width: '300px', height: '200px', overflowY: 'scroll', border: '1px solid black' }}>
      <PolygonProvider>
        <Header />
        <PolygonList />
      </PolygonProvider>
    </div>
  );
};
export default App;
