import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '@/features/auth/api';

/**
 * Custom hook for authentication
 * Provides login, logout, and user info functionality
 * @returns {Object} Auth methods and state
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('usuario_id');
      const userEmail = localStorage.getItem('usuario_email');
      
      if (userId && userEmail) {
        setUser({
          id: userId,
          email: userEmail
        });
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login result
   */
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await loginUser(email, password);
      
      if (result.success) {
        setUser({
          id: result.user.usuario_id,
          email: result.user.usuario_email
        });
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Error desconocido al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout user
   * @param {boolean} redirect - Whether to redirect after logout
   * @returns {Object} Logout result
   */
  const logout = useCallback((redirect = true) => {
    setIsLoading(true);
    
    try {
      const result = logoutUser();
      
      if (result.success) {
        setUser(null);
        
        if (redirect) {
          navigate('/login', { 
            state: { message: 'Sesión cerrada correctamente' }
          });
        }
        
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Error al cerrar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  return {
    user,
    login,
    logout,
    isLoading,
    error,
    isAuthenticated
  };
};

export default useAuth; 