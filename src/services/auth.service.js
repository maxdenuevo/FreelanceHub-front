import api from './api';

/**
 * Servicio de autenticación
 * Maneja login, registro y recuperación de contraseña.
 * Todas las rutas corresponden a las que expone api/index.py en api-freelancehub.
 */

export const authService = {
  /**
   * Login de usuario. La API responde { message, token }; el usuario_id viene dentro del token.
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    const response = await api.post('/login-usuario', {
      usuario_email: email,
      usuario_password: password,
    });
    return response.data;
  },

  /**
   * Registro de nuevo usuario
   * @param {Object} userData - { usuario_email, usuario_rut, usuario_password, usuario_nombre }
   */
  register: async (userData) => {
    const response = await api.post('/register-usuario', userData);
    return response.data;
  },

  /**
   * Pedir un código de recuperación. La API lo genera, lo guarda con vencimiento
   * y lo envía por correo. Responde igual exista o no el email.
   * @param {string} email
   */
  requestPasswordReset: async (email) => {
    const response = await api.post('/solicitar-recuperacion', {
      usuario_email: email,
    });
    return response.data;
  },

  /**
   * Validar el código recibido por correo (máximo 5 intentos, 10 minutos).
   * @param {string} email
   * @param {string} code
   */
  validateRecoveryCode: async (email, code) => {
    const response = await api.post('/validar-codigo-recuperacion', {
      usuario_email: email,
      otp: String(code),
    });
    return response.data;
  },

  /**
   * Cambiar contraseña con el código de recuperación. La API consume el código.
   * @param {string} email
   * @param {string} code
   * @param {string} newPassword
   */
  changePasswordWithCode: async (email, code, newPassword) => {
    const response = await api.post('/usuarios/change-password', {
      usuario_email: email,
      otp: String(code),
      new_password: newPassword,
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
