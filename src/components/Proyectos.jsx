import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, DollarSign } from 'lucide-react';
import { ProjectList } from './features/projects';
import { KanbanBoard } from './features/tasks';
import { Card, CardContent, Alert, Button, Tabs, TabPanel } from './ui';
import { useProjects } from '../hooks';
import Pagos from './Pagos';

/**
 * Proyectos v2.1 - Modern project management with useProjects hook
 * Usa la nueva arquitectura con custom hooks y servicios centralizados
 */
function ProyectosV2() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [nombreProyectoSeleccionado, setNombreProyectoSeleccionado] = useState('');
  const [presupuesto, setPresupuesto] = useState(0);

  // Usar el hook useProjects en lugar de fetch manual
  const {
    projects: proyectos,
    loading,
    error,
    deleteProject,
    selectProject,
    clearError,
  } = useProjects();

  const handleProjectClick = async (proyecto) => {
    setProyectoSeleccionado(proyecto.proyecto_id);
    setNombreProyectoSeleccionado(proyecto.proyecto_nombre);

    // Obtener detalles del proyecto usando el hook
    const result = await selectProject(proyecto.proyecto_id);
    if (result.success) {
      const presupuestoValor = parseFloat(result.project.proyecto_presupuesto);
      setPresupuesto(isNaN(presupuestoValor) ? 0 : presupuestoValor);
    }
  };

  const handleProjectDelete = async (proyectoId) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      return;
    }

    const result = await deleteProject(proyectoId);

    // Si el proyecto eliminado estaba seleccionado, cerrar detalles
    if (result.success && proyectoSeleccionado === proyectoId) {
      handleCloseDetails();
    }
  };

  const handleCloseDetails = () => {
    setProyectoSeleccionado(null);
    setNombreProyectoSeleccionado('');
    setPresupuesto(0);
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
          <Briefcase className="text-primary-yellow" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Mis Proyectos</h1>
            <p className="text-gray-400 mt-1">
              Gestiona tus proyectos, tareas y pagos
            </p>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" dismissible onClose={clearError}>
            {error}
          </Alert>
        )}

        {/* Project List */}
        <ProjectList
          proyectos={proyectos}
          loading={loading}
          onProjectClick={handleProjectClick}
          onProjectDelete={handleProjectDelete}
        />

        {/* Project Details Modal/Sidebar */}
        <AnimatePresence>
          {proyectoSeleccionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={handleCloseDetails}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-primary-dark border-l border-gray-800 overflow-y-auto"
              >
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between sticky top-0 bg-primary-dark pb-4 border-b border-gray-800">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {nombreProyectoSeleccionado}
                      </h2>
                      <div className="flex items-center gap-2 text-success">
                        <DollarSign size={20} />
                        <span className="text-xl font-semibold">
                          ${presupuesto.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCloseDetails}
                      leftIcon={<X size={18} />}
                    >
                      Cerrar
                    </Button>
                  </div>

                  {/* Tabs: Tasks & Payments */}
                  <Tabs defaultTab="tasks">
                    <TabPanel id="tasks" label="Tareas">
                      <div className="mt-4">
                        <KanbanBoard projectId={proyectoSeleccionado} />
                      </div>
                    </TabPanel>

                    <TabPanel id="payments" label="Pagos">
                      <Card className="mt-4">
                        <CardContent className="p-6">
                          <Pagos proyectoSeleccionado={proyectoSeleccionado} />
                        </CardContent>
                      </Card>
                    </TabPanel>
                  </Tabs>

                  {/* Delete Project Button */}
                  <div className="flex justify-center pt-4 pb-8">
                    <Button
                      variant="danger"
                      onClick={() => handleProjectDelete(proyectoSeleccionado)}
                    >
                      Eliminar Proyecto
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProyectosV2;
