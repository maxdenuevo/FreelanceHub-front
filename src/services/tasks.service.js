import api from './api';

/**
 * Servicio de tareas
 * Maneja CRUD de tareas
 */

export const tasksService = {
  /**
   * Obtener todas las tareas de un proyecto
   * @param {string} projectId
   */
  getByProject: async (projectId) => {
    const response = await api.get(`/tareas/${projectId}`);
    return response.data.tareas || [];
  },

  /**
   * Obtener una tarea por ID
   * @param {string} taskId
   */
  getById: async (taskId) => {
    const response = await api.get(`/tarea/${taskId}`);
    return response.data.tarea;
  },

  /**
   * Crear nueva tarea
   * @param {Object} taskData
   */
  create: async (taskData) => {
    const response = await api.post('/create-tarea', taskData);
    return response.data;
  },

  /**
   * Actualizar tarea
   * @param {string} taskId
   * @param {Object} taskData
   */
  update: async (taskId, taskData) => {
    const response = await api.patch(`/tarea/${taskId}`, taskData);
    return response.data;
  },

  /**
   * Eliminar tarea
   * @param {string} taskId
   */
  delete: async (taskId) => {
    const response = await api.delete(`/tarea/${taskId}`);
    return response.data;
  },

  /**
   * Obtener estadísticas de tareas
   * @param {string} projectId
   */
  getStats: async (projectId) => {
    const tasks = await tasksService.getByProject(projectId);

    const total = tasks.length;
    const completadas = tasks.filter(t => t.tarea_estado === 'Completada').length;
    const pendientes = tasks.filter(t => t.tarea_estado === 'Pendiente').length;
    const enProgreso = tasks.filter(t => t.tarea_estado === 'En Progreso').length;

    return {
      total,
      completadas,
      pendientes,
      enProgreso,
      tasks,
    };
  },
};
