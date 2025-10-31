import api from './api';

/**
 * Servicio de proyectos
 * Maneja CRUD de proyectos
 */

export const projectsService = {
  /**
   * Obtener todos los proyectos de un usuario
   * @param {string} userId
   */
  getAll: async (userId) => {
    const response = await api.get(`/proyectos/${userId}`);
    return response.data.proyectos || [];
  },

  /**
   * Obtener un proyecto por ID
   * @param {string} projectId
   */
  getById: async (projectId) => {
    const response = await api.get(`/proyecto/${projectId}`);
    return response.data.proyecto;
  },

  /**
   * Crear nuevo proyecto
   * @param {Object} projectData
   */
  create: async (projectData) => {
    const response = await api.post('/create-proyecto', projectData);
    return response.data;
  },

  /**
   * Actualizar proyecto
   * @param {string} projectId
   * @param {Object} projectData
   */
  update: async (projectId, projectData) => {
    const response = await api.patch(`/proyecto/${projectId}`, projectData);
    return response.data;
  },

  /**
   * Eliminar proyecto
   * @param {string} projectId
   */
  delete: async (projectId) => {
    const response = await api.delete(`/proyecto/${projectId}`);
    return response.data;
  },

  /**
   * Obtener estadísticas de proyectos
   * @param {string} userId
   */
  getStats: async (userId) => {
    const projects = await projectsService.getAll(userId);

    const total = projects.length;
    const activos = projects.filter(p => p.proyecto_estado === 'Activo').length;
    const completados = projects.filter(p => p.proyecto_estado === 'Completado').length;
    const presupuestoTotal = projects.reduce((sum, p) => {
      const presupuesto = parseFloat(p.proyecto_presupuesto) || 0;
      return sum + presupuesto;
    }, 0);

    return {
      total,
      activos,
      completados,
      presupuestoTotal,
      projects,
    };
  },
};
