import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <p className="text-neutral-800 font-bold text-4xl text-center pt-10 shadow-md">
      Coffe Warehouse Optimization Using Tabu Search
    </p>
    <App />
  </React.StrictMode>
);
