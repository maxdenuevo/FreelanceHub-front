import { useAuthStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/Toast';

/**
 * Custom hook para autenticación
 * Proporciona funciones de login, logout, registro
 */

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login: loginStore,
    register: registerStore,
    logout: logoutStore,
    clearError,
  } = useAuthStore();

  const login = async (email, password) => {
    const result = await loginStore(email, password);

    if (result.success) {
      toast.success('Sesión iniciada correctamente');
      navigate('/dashboardpage');
    } else {
      toast.error(result.error || 'Error al iniciar sesión');
    }

    return result;
  };

  const register = async (userData) => {
    const result = await registerStore(userData);

    if (result.success) {
      toast.success('Registro exitoso. Por favor inicia sesión');
      navigate('/login');
    } else {
      toast.error(result.error || 'Error al registrar usuario');
    }

    return result;
  };

  const logout = () => {
    logoutStore();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};
