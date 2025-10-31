import { useState, useEffect } from 'react';
import { clientsService } from '../services';
import { toast } from '../components/ui/Toast';

/**
 * Custom hook para clientes
 * Proporciona funciones CRUD para clientes
 */

export const useClients = (autoFetch = true) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    const userId = localStorage.getItem('usuario_id');
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await clientsService.getAll(userId);
      setClients(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cargar clientes';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchClients();
    }
  }, [autoFetch]);

  const createClient = async (clientData) => {
    setLoading(true);
    try {
      await clientsService.create(clientData);
      toast.success('Cliente creado exitosamente');
      await fetchClients(); // Refetch
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al crear cliente';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (clientId, clientData) => {
    setLoading(true);
    try {
      await clientsService.update(clientId, clientData);
      toast.success('Cliente actualizado exitosamente');
      await fetchClients(); // Refetch
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar cliente';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (clientId) => {
    setLoading(true);
    try {
      await clientsService.delete(clientId);
      toast.success('Cliente eliminado exitosamente');
      await fetchClients(); // Refetch
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al eliminar cliente';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    refreshClients: fetchClients,
  };
};
