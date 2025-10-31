import api from './api';

/**
 * Servicio de pagos
 * Maneja CRUD de pagos
 */

export const paymentsService = {
  /**
   * Obtener todos los pagos de un proyecto
   * @param {string} projectId
   */
  getByProject: async (projectId) => {
    const response = await api.get(`/pagos/${projectId}`);
    return response.data.pagos || [];
  },

  /**
   * Obtener un pago por ID
   * @param {string} paymentId
   */
  getById: async (paymentId) => {
    const response = await api.get(`/pago/${paymentId}`);
    return response.data.pago;
  },

  /**
   * Crear nuevo pago
   * @param {Object} paymentData
   */
  create: async (paymentData) => {
    const response = await api.post('/create-pago', paymentData);
    return response.data;
  },

  /**
   * Actualizar pago
   * @param {string} paymentId
   * @param {Object} paymentData
   */
  update: async (paymentId, paymentData) => {
    const response = await api.patch(`/pago/${paymentId}`, paymentData);
    return response.data;
  },

  /**
   * Eliminar pago
   * @param {string} paymentId
   */
  delete: async (paymentId) => {
    const response = await api.delete(`/pago/${paymentId}`);
    return response.data;
  },

  /**
   * Obtener estadísticas de pagos
   * @param {string} projectId
   */
  getStats: async (projectId) => {
    const payments = await paymentsService.getByProject(projectId);

    const total = payments.reduce((sum, p) => {
      const monto = parseFloat(p.pago_monto) || 0;
      return sum + monto;
    }, 0);

    const completados = payments.filter(p => p.pago_estado === 'Completado').length;
    const pendientes = payments.filter(p => p.pago_estado === 'Pendiente').length;

    return {
      total,
      totalMonto: total,
      completados,
      pendientes,
      payments,
    };
  },
};
