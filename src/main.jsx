import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <p className="text-black w-full text-center text-2xl font-bold">
      cofe warehouse optimization using tabu search
    </p>
    <App />
  </React.StrictMode>
);
