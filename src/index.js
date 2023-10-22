import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Pages/Login';
import HelloWorld from './Pages/HelloWorld'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/hello-world" element={<HelloWorld />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();


