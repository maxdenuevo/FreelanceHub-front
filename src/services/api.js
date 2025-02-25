/**
 * FreelanceHub API Service
 * Centralized API functions for the application
 */

// Base API URL
const API_BASE_URL = 'https://api-freelancehub.vercel.app';

/**
 * Make an API request with proper error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, options);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

/**
 * Authentication API functions
 */
export const authApi = {
  /**
   * Login a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login result
   */
  login: async (email, password) => {
    try {
      const data = await apiRequest('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Store user data in localStorage
      localStorage.setItem('usuario_id', data.usuario_id);
      localStorage.setItem('usuario_email', email);
      
      return {
        success: true,
        usuario_id: data.usuario_id
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Credenciales incorrectas'
      };
    }
  },
  
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration result
   */
  register: async (userData) => {
    try {
      const data = await apiRequest('/agregar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      return {
        success: true,
        message: data.message || 'Usuario registrado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Error al registrar usuario'
      };
    }
  },
  
  /**
   * Request a password reset code
   * @param {string} email - User email
   * @returns {Promise<Object>} Request result
   */
  requestPasswordReset: async (email) => {
    // Simulate API call for password reset
    // In production, this would call the actual API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Código enviado exitosamente'
        });
      }, 1000);
    });
  },
  
  /**
   * Verify a password reset code
   * @param {string} email - User email
   * @param {string} code - Verification code
   * @returns {Promise<Object>} Verification result
   */
  verifyPasswordResetCode: async (email, code) => {
    // Simulate API call for code verification
    // In production, this would call the actual API
    return new Promise(resolve => {
      setTimeout(() => {
        if (code === '123456') { // Demo code
          resolve({
            success: true,
            message: 'Código verificado correctamente'
          });
        } else {
          resolve({
            success: false,
            error: 'Código inválido o expirado'
          });
        }
      }, 1000);
    });
  },
  
  /**
   * Reset user password
   * @param {string} email - User email
   * @param {string} code - Verification code
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Reset result
   */
  resetPassword: async (email, code, newPassword) => {
    // Simulate API call for password reset
    // In production, this would call the actual API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Contraseña actualizada correctamente'
        });
      }, 1000);
    });
  }
};

/**
 * Projects API functions
 */
export const projectsApi = {
  /**
   * Get user projects
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Projects data
   */
  getUserProjects: async (userId) => {
    return apiRequest(`/get-proyectos/${userId}`);
  },
  
  /**
   * Get project details
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} Project details
   */
  getProjectDetails: async (projectId) => {
    return apiRequest(`/get-proyecto/${projectId}`);
  },
  
  /**
   * Create a new project
   * @param {Object} projectData - Project data
   * @returns {Promise<Object>} Created project
   */
  createProject: async (projectData) => {
    return apiRequest('/agregar-proyecto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
  },
  
  /**
   * Update a project
   * @param {string} projectId - Project ID
   * @param {Object} projectData - Project data
   * @returns {Promise<Object>} Updated project
   */
  updateProject: async (projectId, projectData) => {
    return apiRequest(`/actualizar-proyecto/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
  }
};

/**
 * Clients API functions
 */
export const clientsApi = {
  /**
   * Get user clients
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Clients data
   */
  getUserClients: async (userId) => {
    return apiRequest(`/get-clientes/${userId}`);
  },
  
  /**
   * Get client details
   * @param {string} clientId - Client ID
   * @returns {Promise<Object>} Client details
   */
  getClientDetails: async (clientId) => {
    return apiRequest(`/get-cliente/${clientId}`);
  },
  
  /**
   * Create a new client
   * @param {Object} clientData - Client data
   * @returns {Promise<Object>} Created client
   */
  createClient: async (clientData) => {
    return apiRequest('/agregar-cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });
  }
};

/**
 * Tasks API functions
 */
export const tasksApi = {
  /**
   * Get project tasks
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} Tasks data
   */
  getProjectTasks: async (projectId) => {
    return apiRequest(`/get-tareas/${projectId}`);
  },
  
  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Created task
   */
  createTask: async (taskData) => {
    return apiRequest('/agregar-tarea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
  },
  
  /**
   * Update a task
   * @param {string} taskId - Task ID
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Updated task
   */
  updateTask: async (taskId, taskData) => {
    return apiRequest(`/actualizar-tarea/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
  }
};

/**
 * Payments API functions
 */
export const paymentsApi = {
  /**
   * Get project payments
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} Payments data
   */
  getProjectPayments: async (projectId) => {
    return apiRequest(`/get-pagos/${projectId}`);
  },
  
  /**
   * Create a new payment
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} Created payment
   */
  createPayment: async (paymentData) => {
    return apiRequest('/agregar-pago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
  }
};

/**
 * Contracts API functions
 */
export const contractsApi = {
  /**
   * Get project contract
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} Contract data
   */
  getProjectContract: async (projectId) => {
    return apiRequest(`/get-contrato/${projectId}`);
  },
  
  /**
   * Create a new contract
   * @param {Object} contractData - Contract data
   * @returns {Promise<Object>} Created contract
   */
  createContract: async (contractData) => {
    return apiRequest('/agregar-contrato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData),
    });
  }
};

// Export a default object with all APIs
export default {
  auth: authApi,
  projects: projectsApi,
  clients: clientsApi,
  tasks: tasksApi,
  payments: paymentsApi,
  contracts: contractsApi
}; 