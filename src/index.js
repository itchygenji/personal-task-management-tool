import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Pages/Login/Login';
import HelloWorld from './Pages/HelloWorld'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="542153855763-k85eciiv5qopca6nglve5kben6fg3e8h.apps.googleusercontent.com">
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/hello-world" element={<HelloWorld />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();


