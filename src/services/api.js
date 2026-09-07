import axios from 'axios';

/**
 * Cliente API centralizado con configuración base
 * Incluye interceptors para autenticación y manejo de errores
 */

// URL base del API
const API_URL = import.meta.env.VITE_API_URL || 'https://api-freelancehub.vercel.app';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar errores específicos
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Sólo es una sesión vencida si la petición llevaba token. Un 401 en login
          // o en la validación del código de recuperación no debe cerrar nada.
          if (error.config?.headers?.Authorization) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('usuario_id');
            localStorage.removeItem('usuario_email');

            if (!window.location.pathname.includes('/login') &&
                !window.location.pathname.includes('/registro')) {
              window.location.href = '/login';
            }
          }
          break;

        case 403:
          console.error('Acceso denegado');
          break;

        case 404:
          console.error('Recurso no encontrado');
          break;

        case 500:
          console.error('Error del servidor');
          break;

        default:
          console.error('Error en la petición:', error.response.data);
      }
    } else if (error.request) {
      // Request enviado pero sin respuesta
      console.error('No hay respuesta del servidor');
    } else {
      // Error al configurar el request
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
