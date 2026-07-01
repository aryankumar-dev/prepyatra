import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { Toaster } from '@/components/ui/sonner.jsx'
import { AuthProvider } from '#context/AuthContext.jsx'
import Registration from '#components/Auth/Registration.jsx'
import Login from '#components/Auth/Login.jsx';
import Dashboard from '#components/Auth/Dashboard.jsx';
import Home from '#components/Pages/Home.jsx';
import PrivateRoute from '#components/Auth/PrivateRoute.jsx';
import AdminDashboard from '#components/Auth/AdminDashboard.jsx';
import ChatBot from '#components/ChatBot.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster theme="dark" richColors position="top-center" />
        <Routes>
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
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
