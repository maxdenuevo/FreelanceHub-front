import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon } from 'lucide-react';
import { ClientList } from './features/clients';
import { Alert, Modal, Input, Button } from './ui';
import { useClients } from '../hooks';

/**
 * Clientes v2.1 - Modern client management with useClients hook
 * Usa la nueva arquitectura con custom hooks y servicios centralizados
 */
function ClientesV2() {
  const [editingClient, setEditingClient] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Usar el hook useClients en lugar de fetch manual
  const {
    clients: clientes,
    loading,
    error,
    updateClient,
    deleteClient,
  } = useClients();

  const handleClientEdit = (cliente) => {
    setEditingClient(cliente);
    setShowEditModal(true);
  };

  const handleClientDelete = async (clienteId) => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) {
      return;
    }

    await deleteClient(clienteId);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingClient) return;

    const clientData = {
      cliente_nombre: editingClient.cliente_nombre,
      cliente_email: editingClient.cliente_email,
      cliente_tel: editingClient.cliente_tel,
      cliente_rut: editingClient.cliente_rut,
    };

    const result = await updateClient(editingClient.cliente_id, clientData);

    if (result.success) {
      setShowEditModal(false);
      setEditingClient(null);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingClient(null);
  };

  return (
    <div className="min-h-screen bg-primary-dark p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <UsersIcon className="text-primary-blue" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Mis Clientes</h1>
            <p className="text-gray-400 mt-1">
              Gestiona tu cartera de clientes y contactos
            </p>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" dismissible>
            {error}
          </Alert>
        )}

        {/* Client List */}
        <ClientList
          clientes={clientes}
          loading={loading}
          onClientEdit={handleClientEdit}
          onClientDelete={handleClientDelete}
        />

        {/* Edit Client Modal */}
        {showEditModal && editingClient && (
          <Modal
            isOpen={showEditModal}
            onClose={handleCancelEdit}
            title="Editar Cliente"
            size="md"
          >
            <form onSubmit={handleSaveEdit} className="space-y-4 p-4">
              <Input
                label="Nombre del Cliente"
                value={editingClient.cliente_nombre || ''}
                onChange={(e) =>
                  setEditingClient({
                    ...editingClient,
                    cliente_nombre: e.target.value,
                  })
                }
                required
              />

              <Input
                label="Email"
                type="email"
                value={editingClient.cliente_email || ''}
                onChange={(e) =>
                  setEditingClient({
                    ...editingClient,
                    cliente_email: e.target.value,
                  })
                }
              />

              <Input
                label="Teléfono"
                type="tel"
                value={editingClient.cliente_tel || ''}
                onChange={(e) =>
                  setEditingClient({
                    ...editingClient,
                    cliente_tel: e.target.value,
                  })
                }
              />

              <Input
                label="RUT"
                value={editingClient.cliente_rut || ''}
                onChange={(e) =>
                  setEditingClient({
                    ...editingClient,
                    cliente_rut: e.target.value,
                  })
                }
              />

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ClientesV2;
