import React from 'react';
import ReactDOM from 'react-dom/client'; // Assuming you're using React 18
import './index.css';
import ConnectionComponent from './components/ConnectionComponent.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <ConnectionComponent />
    </div>
  </React.StrictMode>
);
