import api from './api';

/**
 * Servicio de contratos
 * Maneja CRUD de contratos
 */

export const contractsService = {
  /**
   * Obtener todos los contratos de un usuario
   * @param {string} userId
   */
  getAll: async (userId) => {
    const response = await api.get(`/contratos/${userId}`);
    return response.data.contratos || [];
  },

  /**
   * Obtener un contrato por ID
   * @param {string} contractId
   */
  getById: async (contractId) => {
    const response = await api.get(`/contrato/${contractId}`);
    return response.data.contrato;
  },

  /**
   * Crear nuevo contrato
   * @param {Object} contractData
   */
  create: async (contractData) => {
    const response = await api.post('/create-contrato', contractData);
    return response.data;
  },

  /**
   * Actualizar contrato
   * @param {string} contractId
   * @param {Object} contractData
   */
  update: async (contractId, contractData) => {
    const response = await api.patch(`/contrato/${contractId}`, contractData);
    return response.data;
  },

  /**
   * Eliminar contrato
   * @param {string} contractId
   */
  delete: async (contractId) => {
    const response = await api.delete(`/contrato/${contractId}`);
    return response.data;
  },
};
