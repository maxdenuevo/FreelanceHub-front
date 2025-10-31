import { create } from 'zustand';
import { projectsService } from '../services';

/**
 * Zustand Store para proyectos
 * Maneja el estado de proyectos, filtros, selección
 */

export const useProjectsStore = create((set, get) => ({
  // State
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all', // 'all', 'Activo', 'Completado', 'Pausado'
    sortBy: 'fecha', // 'fecha', 'nombre', 'presupuesto'
  },

  // Actions
  fetchProjects: async (userId) => {
    set({ loading: true, error: null });
    try {
      const projects = await projectsService.getAll(userId);
      set({ projects, loading: false, error: null });
      return { success: true, projects };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al cargar proyectos';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  fetchProjectById: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const project = await projectsService.getById(projectId);
      set({ selectedProject: project, loading: false, error: null });
      return { success: true, project };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al cargar proyecto';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const data = await projectsService.create(projectData);
      // Refetch projects después de crear
      const userId = localStorage.getItem('usuario_id');
      if (userId) {
        await get().fetchProjects(userId);
      }
      set({ loading: false, error: null });
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al crear proyecto';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  updateProject: async (projectId, projectData) => {
    set({ loading: true, error: null });
    try {
      const data = await projectsService.update(projectId, projectData);
      // Refetch projects después de actualizar
      const userId = localStorage.getItem('usuario_id');
      if (userId) {
        await get().fetchProjects(userId);
      }
      set({ loading: false, error: null });
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar proyecto';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  deleteProject: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const data = await projectsService.delete(projectId);
      // Refetch projects después de eliminar
      const userId = localStorage.getItem('usuario_id');
      if (userId) {
        await get().fetchProjects(userId);
      }
      set({ loading: false, error: null });
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error al eliminar proyecto';
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  setSelectedProject: (project) => {
    set({ selectedProject: project });
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  clearError: () => {
    set({ error: null });
  },

  // Computed selectors
  getFilteredProjects: () => {
    const { projects, filters } = get();
    let filtered = [...projects];

    // Filtrar por búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.proyecto_nombre?.toLowerCase().includes(searchLower) ||
          p.cliente_nombre?.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por estado
    if (filters.status !== 'all') {
      filtered = filtered.filter((p) => p.proyecto_estado === filters.status);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'nombre':
          return (a.proyecto_nombre || '').localeCompare(b.proyecto_nombre || '');
        case 'presupuesto':
          return parseFloat(b.proyecto_presupuesto || 0) - parseFloat(a.proyecto_presupuesto || 0);
        case 'fecha':
        default:
          return new Date(b.proyecto_fecha_creacion) - new Date(a.proyecto_fecha_creacion);
      }
    });

    return filtered;
  },
}));
