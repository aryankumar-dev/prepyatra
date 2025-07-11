import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Corrected here
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Checkauth from './components/CheckAuth/Checkauth.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/checkauth" element={<Checkauth />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
