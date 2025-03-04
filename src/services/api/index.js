import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      if (error.response.status === 401) {
        // No autorizado - limpiar datos de autenticación
        localStorage.removeItem('token');
        localStorage.removeItem('usuario_id');
      }
      
      // Devolver mensaje de error del servidor si está disponible
      const message = error.response.data?.message || 'Ocurrió un error';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Se realizó la solicitud pero no se recibió una respuesta
      return Promise.reject(new Error('No se pudo conectar con el servidor'));
    } else {
      // Algo sucedió al configurar la solicitud
      return Promise.reject(error);
    }
  }
);

/**
 * Servicio de autenticación API
 */
export const authApi = {
  // Iniciar sesión
  login: (credentials) => apiClient.post('/login-usuario', credentials),
  
  // Registrar usuario
  register: (userData) => apiClient.post('/register-usuario', userData),
  
  // Obtener perfil de usuario
  getUser: (userId) => apiClient.get(`/get-usuario/${userId}`),
  
  // Actualizar perfil de usuario
  updateProfile: (userId, userData) => apiClient.patch(`/usuario/${userId}/update`, userData),
  
  // Actualizar contraseña de usuario (cuando el usuario conoce su contraseña actual)
  updatePassword: (userId, passwordData) => apiClient.patch(`/usuario/${userId}/update-password`, passwordData),
  
  // Solicitar restablecimiento de contraseña (cuando el usuario olvidó su contraseña)
  forgotPassword: (email) => apiClient.post('/usuarios/request-reset', { usuario_email: email }),
  
  // Verificar código de restablecimiento
  verifyCode: (email, code) => apiClient.post('/usuarios/verify-code', { usuario_email: email, otp: code }),
  
  // Restablecer contraseña con código
  resetPassword: (email, code, newPassword) => 
    apiClient.post('/usuarios/change-password', { 
      usuario_email: email, 
      otp: code, 
      new_password: newPassword 
    }),
  
  // Verificar si el usuario está autenticado
  checkAuth: () => apiClient.get('/auth/me'),
};

/**
 * Proyectos API 
 */
export const projectsApi = {
  // Obtener todos los proyectos para un usuario
  getAllByUser: (userId) => apiClient.get(`/proyectos/${userId}`),
  
  // Obtener un proyecto específico
  getById: (projectId) => apiClient.get(`/proyecto/${projectId}`),
  
  // Crear un nuevo proyecto
  create: (projectData) => apiClient.post('/create-proyecto', projectData),
  
  // Actualizar un proyecto
  update: (projectId, projectData) => apiClient.patch(`/proyecto/${projectId}`, projectData),
  
  // Eliminar un proyecto
  delete: (projectId) => apiClient.delete(`/proyecto/${projectId}`),
};

/**
 * Servicio de clientes API
 */
export const clientsApi = {
  // Obtener todos los clientes para un usuario
  getAllByUser: (userId) => apiClient.get(`/clientes/${userId}`),
  
  // Obtener un cliente específico
  getById: (clientId) => apiClient.get(`/cliente/${clientId}`),
  
  // Crear un nuevo cliente
  create: (clientData) => apiClient.post('/create-cliente', clientData),
  
  // Actualizar un cliente
  update: (clientId, clientData) => apiClient.patch(`/cliente/${clientId}`, clientData),
  
  // Eliminar un cliente
  delete: (clientId) => apiClient.delete(`/cliente/${clientId}`),
};

/**
 * Servicio de tareas API
 */
export const tasksApi = {
  // Obtener todas las tareas para un proyecto
  getByProject: (projectId) => apiClient.get(`/tareas/${projectId}`),
  
  // Obtener una tarea específica
  getById: (taskId) => apiClient.get(`/tarea/${taskId}`),
  
  // Crear una nueva tarea
  create: (taskData) => apiClient.post('/create-tarea', taskData),
  
  // Actualizar una tarea
  update: (taskId, taskData) => apiClient.patch(`/tarea/${taskId}`, taskData),
  
  // Eliminar una tarea
  delete: (taskId) => apiClient.delete(`/tarea/${taskId}`),
  
  // Obtener tareas con información de pagos
  getTasksWithPayments: (projectId) => apiClient.get(`/tareas-with-pagos/${projectId}`),
};

/**
 * Servicio de pagos API
 */
export const paymentsApi = {
  // Obtener todos los pagos para un proyecto
  getByProject: (projectId) => apiClient.get(`/pagos/${projectId}`),
  
  // Obtener un pago específico
  getById: (paymentId) => apiClient.get(`/pago/${paymentId}`),
  
  // Crear un nuevo pago
  create: (paymentData, formData = true) => {
    // Si se está usando FormData (para subida de archivos)
    if (formData) {
      const form = new FormData();
      Object.keys(paymentData).forEach(key => {
        form.append(key, paymentData[key]);
      });
      
      return apiClient.post('/create-pago', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    
    // Carga JSON regular
    return apiClient.post('/create-pago', paymentData);
  },
  
  // Actualizar un pago
  update: (paymentId, paymentData, formData = true) => {
    // Si se está usando FormData (para subida de archivos)
    if (formData) {
      const form = new FormData();
      Object.keys(paymentData).forEach(key => {
        form.append(key, paymentData[key]);
      });
      
      return apiClient.patch(`/pago/${paymentId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    
    // Carga JSON regular
    return apiClient.patch(`/pago/${paymentId}`, paymentData);
  },
  
  // Eliminar un pago
  delete: (paymentId) => apiClient.delete(`/pago/${paymentId}`),
};

/**
 * Servicio de contratos API
 */
export const contractsApi = {
  // Obtener todos los contratos para un proyecto
  getByProject: (projectId) => apiClient.get(`/contratos/${projectId}`),
  
  // Obtener un contrato específico
  getById: (contractId) => apiClient.get(`/get-contrato/${contractId}`),
  
  // Crear un nuevo contrato
  create: (contractData) => apiClient.post('/create-contrato', contractData),
  
  // Obtener plantilla de contrato
  getTemplate: (templateId) => apiClient.get(`/get-plantilla/${templateId}`),
  
  // Crear plantilla de contrato
  createTemplate: (templateData) => apiClient.post('/create-plantilla', templateData),
};

/**
* Servicio de correo API
 */
export const emailApi = {
  // Enviar correo
  send: (emailData) => apiClient.post('/send-email', emailData),
  
  // Enviar recordatorios
  sendReminders: () => apiClient.get('/send-email-recordatorios'),
};

// Exportar todas las APIs como un solo objeto
export default {
  auth: authApi,
  projects: projectsApi,
  clients: clientsApi,
  tasks: tasksApi,
  payments: paymentsApi,
  contracts: contractsApi,
  email: emailApi,
};