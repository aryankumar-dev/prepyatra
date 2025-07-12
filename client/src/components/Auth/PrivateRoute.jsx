// components/Auth/PrivateRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    apiClient
      .getCurrentUser() // ✅ Call the method we just added
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;
  if (auth === false) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
