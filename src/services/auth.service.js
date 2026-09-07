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
   * Enviar código de recuperación por correo.
   *
   * ADVERTENCIA DE SEGURIDAD: hoy el código se genera en el navegador y la API
   * (verify_otp en api/index.py) no lo valida. Este flujo NO protege la cuenta hasta
   * que la API genere y verifique el código por su cuenta.
   * @param {string} email
   * @param {number|string} code
   */
  sendRecoveryCode: async (email, code) => {
    const response = await api.post('/send-email', {
      subject: 'Código de verificación para FreelanceHub',
      recipients: [email],
      body: `¡Gracias por usar FreelanceHub!

Para completar el proceso de verificación de tu correo electrónico, utiliza el siguiente código:

Código de Verificación: ${code}

Este código es válido por 1 min. Si tienes algún problema o necesitas ayuda, no dudes en contactarnos.

El equipo de FreelanceHub
freelancehub.cl
[contacto@freelancehub.cl]`,
    });
    return response.data;
  },

  /**
   * Cambiar contraseña usando el código de recuperación (ver advertencia arriba).
   * @param {string} email
   * @param {number|string} code
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
