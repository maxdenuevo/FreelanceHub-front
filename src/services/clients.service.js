import api from './api';

/**
 * Servicio de clientes
 * Maneja CRUD de clientes
 */

export const clientsService = {
  /**
   * Obtener todos los clientes de un usuario
   * @param {string} userId
   */
  getAll: async (userId) => {
    const response = await api.get(`/clientes/${userId}`);
    return response.data.clientes || [];
  },

  /**
   * Obtener un cliente por ID
   * @param {string} clientId
   */
  getById: async (clientId) => {
    const response = await api.get(`/cliente/${clientId}`);
    return response.data.cliente;
  },

  /**
   * Crear nuevo cliente
   * @param {Object} clientData
   */
  create: async (clientData) => {
    const response = await api.post('/create-cliente', clientData);
    return response.data;
  },

  /**
   * Actualizar cliente
   * @param {string} clientId
   * @param {Object} clientData
   */
  update: async (clientId, clientData) => {
    const response = await api.patch(`/cliente/${clientId}`, clientData);
    return response.data;
  },

  /**
   * Eliminar cliente
   * @param {string} clientId
   */
  delete: async (clientId) => {
    const response = await api.delete(`/cliente/${clientId}`);
    return response.data;
  },

  /**
   * Obtener estadísticas de clientes
   * @param {string} userId
   */
  getStats: async (userId) => {
    const clients = await clientsService.getAll(userId);

    return {
      total: clients.length,
      clients,
    };
  },
};
