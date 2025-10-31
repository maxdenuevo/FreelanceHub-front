import { useEffect } from 'react';
import { useProjectsStore } from '../store';
import { toast } from '../components/ui/Toast';

/**
 * Custom hook para proyectos
 * Proporciona funciones CRUD y filtros para proyectos
 */

export const useProjects = (autoFetch = true) => {
  const {
    projects,
    selectedProject,
    loading,
    error,
    filters,
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    setSelectedProject,
    setFilters,
    clearError,
    getFilteredProjects,
  } = useProjectsStore();

  // Auto-fetch projects on mount
  useEffect(() => {
    if (autoFetch) {
      const userId = localStorage.getItem('usuario_id');
      if (userId) {
        fetchProjects(userId);
      }
    }
  }, [autoFetch]);

  const handleCreateProject = async (projectData) => {
    const result = await createProject(projectData);

    if (result.success) {
      toast.success('Proyecto creado exitosamente');
    } else {
      toast.error(result.error || 'Error al crear proyecto');
    }

    return result;
  };

  const handleUpdateProject = async (projectId, projectData) => {
    const result = await updateProject(projectId, projectData);

    if (result.success) {
      toast.success('Proyecto actualizado exitosamente');
    } else {
      toast.error(result.error || 'Error al actualizar proyecto');
    }

    return result;
  };

  const handleDeleteProject = async (projectId) => {
    const result = await deleteProject(projectId);

    if (result.success) {
      toast.success('Proyecto eliminado exitosamente');
    } else {
      toast.error(result.error || 'Error al eliminar proyecto');
    }

    return result;
  };

  const handleSelectProject = async (projectId) => {
    const result = await fetchProjectById(projectId);
    return result;
  };

  return {
    projects,
    filteredProjects: getFilteredProjects(),
    selectedProject,
    loading,
    error,
    filters,
    createProject: handleCreateProject,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
    selectProject: handleSelectProject,
    setSelectedProject,
    setFilters,
    refreshProjects: () => {
      const userId = localStorage.getItem('usuario_id');
      if (userId) {
        return fetchProjects(userId);
      }
    },
    clearError,
  };
};
