import { useState, useEffect } from 'react';
import { tasksService } from '../services';
import { toast } from '../components/ui/Toast';

/**
 * Custom hook para tareas
 * Proporciona funciones CRUD para tareas
 */

export const useTasks = (projectId, autoFetch = true) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await tasksService.getByProject(projectId);
      setTasks(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cargar tareas';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && projectId) {
      fetchTasks();
    }
  }, [projectId, autoFetch]);

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      await tasksService.create(taskData);
      toast.success('Tarea creada exitosamente');
      await fetchTasks(); // Refetch
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al crear tarea';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, taskData) => {
    setLoading(true);
    try {
      await tasksService.update(taskId, taskData);
      toast.success('Tarea actualizada exitosamente');
      await fetchTasks(); // Refetch
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar tarea';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await tasksService.delete(taskId);
      toast.success('Tarea eliminada exitosamente');
      await fetchTasks(); // Refetch
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al eliminar tarea';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
};
