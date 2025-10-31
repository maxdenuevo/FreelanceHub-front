import api from './api';

/**
 * Servicio de autenticación
 * Maneja login, registro, recuperación de contraseña
 */

export const authService = {
  /**
   * Login de usuario
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    const response = await api.post('/login', {
      usuario_email: email,
      usuario_contraseña: password,
    });
    return response.data;
  },

  /**
   * Registro de nuevo usuario
   * @param {Object} userData
   */
  register: async (userData) => {
    const response = await api.post('/create-user', userData);
    return response.data;
  },

  /**
   * Solicitar código de recuperación
   * @param {string} email
   */
  requestPasswordReset: async (email) => {
    const response = await api.post('/send-recovery-email', {
      recipient_email: email,
    });
    return response.data;
  },

  /**
   * Validar código de recuperación
   * @param {string} email
   * @param {string} code
   */
  validateRecoveryCode: async (email, code) => {
    const response = await api.post('/validate-recovery', {
      usuario_email: email,
      codigo: code,
    });
    return response.data;
  },

  /**
   * Cambiar contraseña
   * @param {string} email
   * @param {string} newPassword
   */
  changePassword: async (email, newPassword) => {
    const response = await api.patch('/change-password', {
      usuario_email: email,
      nueva_contraseña: newPassword,
    });
    return response.data;
  },

  /**
   * Logout (limpiar localStorage)
   */
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('usuario_email');
  },

  /**
   * Obtener usuario actual
   */
  getCurrentUser: () => {
    return {
      id: localStorage.getItem('usuario_id'),
      email: localStorage.getItem('usuario_email'),
      token: localStorage.getItem('auth_token'),
    };
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('usuario_id');
  },
};
