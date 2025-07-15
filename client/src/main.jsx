import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import Registration from './components/Auth/Registration.jsx'
import Login from './components/Auth/Login.jsx';
import Dashboard from './components/Auth/Dashboard.jsx';
import Home from './components/Pages/Home.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx'; // ⬅️ Import here
import ChatBot from './components/ChatBot.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);