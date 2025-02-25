import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API services
export const authApi = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  verifyCode: async (email, code) => {
    try {
      const response = await api.post('/auth/verify-code', { email, code });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  resetPassword: async (email, code, password) => {
    try {
      const response = await api.post('/auth/reset-password', { email, code, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  checkAuth: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Projects API services
export const projectsApi = {
  getAll: async (params) => {
    try {
      const response = await api.get('/projects', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  create: async (project) => {
    try {
      const response = await api.post('/projects', project);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  update: async (id, project) => {
    try {
      const response = await api.put(`/projects/${id}`, project);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Clients API services
export const clientsApi = {
  getAll: async (params) => {
    try {
      const response = await api.get('/clients', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  create: async (client) => {
    try {
      const response = await api.post('/clients', client);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  update: async (id, client) => {
    try {
      const response = await api.put(`/clients/${id}`, client);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Tasks API services
export const tasksApi = {
  getAll: async (params) => {
    try {
      const response = await api.get('/tasks', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getByProjectId: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/tasks`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  create: async (task) => {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  update: async (id, task) => {
    try {
      const response = await api.put(`/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Payments API services
export const paymentsApi = {
  getAll: async (params) => {
    try {
      const response = await api.get('/payments', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  create: async (payment) => {
    try {
      const response = await api.post('/payments', payment);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  update: async (id, payment) => {
    try {
      const response = await api.put(`/payments/${id}`, payment);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Contracts API services
export const contractsApi = {
  getAll: async (params) => {
    try {
      const response = await api.get('/contracts', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/contracts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  create: async (contract) => {
    try {
      const response = await api.post('/contracts', contract);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  update: async (id, contract) => {
    try {
      const response = await api.put(`/contracts/${id}`, contract);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/contracts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Export all APIs
export default {
  authApi,
  projectsApi,
  clientsApi,
  tasksApi,
  paymentsApi,
  contractsApi,
}; 