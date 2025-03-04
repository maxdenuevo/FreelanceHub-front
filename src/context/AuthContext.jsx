import React, { createContext, useContext, useState, useEffect } from 'react';

import { authApi } from '@/services/api';

// Crear contexto
const AuthContext = createContext({});

/**
 * Componente de proveedor de autenticación
 * Gestiona el estado de autenticación del usuario y proporciona métodos de autenticación
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si el usuario está autenticado al montar
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('usuario_id');
        
        if (!token || !userId) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Obtener datos del usuario
        const userData = await authApi.checkAuth();
        setUser(userData);
      } catch (err) {
        console.error('Error al verificar la autenticación:', err);
        setError('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario_id');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  /**
   * Iniciar sesión
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Resultado de la sesión
   */
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login({ usuario_email: email, usuario_password: password });
      
      // Almacenar datos de autenticación
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario_id', response.usuario_id);
      
      // Establecer datos del usuario
      setUser({
        id: response.usuario_id,
        email: response.usuario_email,
        nombre: response.usuario_nombre
      });
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Error al iniciar sesión. Por favor intente nuevamente.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
    * Registrar nuevo usuario
   * @param {Object} userData - Datos de registro del usuario
   * @returns {Promise<Object>} Resultado del registro
   */
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.register(userData);
      return { success: true, usuario_id: response.usuario_id };
    } catch (err) {
      const errorMessage = err.message || 'Error al registrarse. Por favor intente nuevamente.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Solicitar restablecimiento de contraseña
   * @param {string} email - Email del usuario
   * @returns {Promise<Object>} Resultado de la solicitud de restablecimiento
   */
  const requestPasswordReset = async (email) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authApi.forgotPassword(email);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Error al solicitar restablecimiento de contraseña.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verificar código de restablecimiento de contraseña
   * @param {string} email - Email del usuario
   * @param {string} code - Código de verificación
   * @returns {Promise<Object>} Resultado de la verificación
   */
  const verifyResetCode = async (email, code) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authApi.verifyCode(email, code);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Código inválido o expirado.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset password
   * @param {string} email - Email del usuario
   * @param {string} code - Código de verificación
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise<Object>} Resultado del restablecimiento
   */
  const resetPassword = async (email, code, newPassword) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authApi.resetPassword(email, code, newPassword);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Error al restablecer contraseña.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Actualizar perfil de usuario
   * @param {string} userId - ID del usuario
   * @param {Object} userData - Datos del usuario a actualizar
   * @returns {Promise<Object>} Resultado de la actualización
   */
  const updateProfile = async (userId, userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.updateProfile(userId, userData);
      
      // Update user data in state
      setUser(prev => ({
        ...prev,
        ...response
      }));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Error al actualizar perfil.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_id');
    setUser(null);
  };

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} Estado de autenticación
   */
  const isAuthenticated = !!user;

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    requestPasswordReset,
    verifyResetCode,
    resetPassword,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;