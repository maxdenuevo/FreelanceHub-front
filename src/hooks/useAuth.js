import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for authentication
 * Provides login, logout, and user info functionality
 * @returns {Object} Auth methods and state
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      
      try {
        const userId = localStorage.getItem('usuario_id');
        const token = localStorage.getItem('token');
        
        if (!userId || !token) {
          setUser(null);
          setLoading(false);
          return;
        }
        
        // Verify token and get user data
        const response = await fetch(`${API_URL}/api/usuarios/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Session expired');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Your session has expired. Please log in again.');
        localStorage.removeItem('usuario_id');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [API_URL]);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login result
   */
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Store auth data
      localStorage.setItem('usuario_id', data.usuario_id);
      localStorage.setItem('token', data.token);
      
      // Get full user data
      const userResponse = await fetch(`${API_URL}/api/usuarios/${data.usuario_id}`, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await userResponse.json();
      setUser(userData);
      
      // Redirect to dashboard
      navigate('/dashboardpage');
      return data;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [API_URL, navigate]);

  /**
   * Logout user
   * @param {boolean} redirect - Whether to redirect after logout
   * @returns {Object} Logout result
   */
  const logout = useCallback(() => {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('usuario_id');
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated
  };
};

export default useAuth; 