import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services';

// Hay sesión si existe un token y no venció. Si venció se limpia el storage.
const haySesionVigente = () => {
  const token = localStorage.getItem('auth_token');
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    if (exp && exp * 1000 < Date.now()) {
      authService.logout();
      return false;
    }
    return true;
  } catch {
    authService.logout();
    return false;
  }
};

const Rutaprotegida = ({ children }) => {
  if (haySesionVigente()) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default Rutaprotegida;
