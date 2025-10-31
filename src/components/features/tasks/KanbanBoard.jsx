import { useState, useEffect } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { useTasks } from '../../../hooks';
import { Spinner, Modal, Input, Button, Select, Alert } from '../../ui';
import { toast } from '../../ui/Toast';

/**
 * KanbanBoard - Tablero Kanban con drag & drop
 */
export const KanbanBoard = ({ projectId }) => {
  const { tasks, loading, error, updateTask, createTask, deleteTask, refreshTasks } = useTasks(projectId);

  const [activeTask, setActiveTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    tarea_nombre: '',
    tarea_descripcion: '',
    tarea_estado: 'Pendiente',
    tarea_prioridad: 'Media',
    tarea_fecha_limite: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const columns = [
    { id: 'Pendiente', title: 'Por Hacer', color: 'bg-gray-600' },
    { id: 'En Progreso', title: 'En Progreso', color: 'bg-blue-600' },
    { id: 'En Revisión', title: 'En Revisión', color: 'bg-yellow-600' },
    { id: 'Completada', title: 'Completadas', color: 'bg-green-600' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getTasksByColumn = (columnId) => {
    return tasks.filter((task) => task.tarea_estado === columnId);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.tarea_id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // Si el drop es sobre una columna, actualizar el estado
    const columnIds = columns.map((c) => c.id);
    if (columnIds.includes(newStatus)) {
      const task = tasks.find((t) => t.tarea_id === taskId);
      if (task && task.tarea_estado !== newStatus) {
        await updateTask(taskId, { tarea_estado: newStatus });
      }
    }
  };

  const handleAddTask = (columnId) => {
    setTaskFormData({
      tarea_nombre: '',
      tarea_descripcion: '',
      tarea_estado: columnId,
      tarea_prioridad: 'Media',
      tarea_fecha_limite: '',
    });
    setIsEditing(false);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setTaskFormData({
      tarea_nombre: task.tarea_nombre,
      tarea_descripcion: task.tarea_descripcion || '',
      tarea_estado: task.tarea_estado,
      tarea_prioridad: task.tarea_prioridad || 'Media',
      tarea_fecha_limite: task.tarea_fecha_limite ? task.tarea_fecha_limite.split('T')[0] : '',
    });
    setCurrentTaskId(task.tarea_id);
    setIsEditing(true);
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (task) => {
    if (window.confirm(`¿Estás seguro de eliminar la tarea "${task.tarea_nombre}"?`)) {
      await deleteTask(task.tarea_id);
    }
  };

  const handleToggleComplete = async (task) => {
    const newStatus = task.tarea_estado === 'Completada' ? 'Pendiente' : 'Completada';
    await updateTask(task.tarea_id, { tarea_estado: newStatus });
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    const taskData = {
      ...taskFormData,
      proyecto_id: projectId,
    };

    if (isEditing) {
      await updateTask(currentTaskId, taskData);
    } else {
      await createTask(taskData);
    }

    setShowTaskModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTaskFormData({
      tarea_nombre: '',
      tarea_descripcion: '',
      tarea_estado: 'Pendiente',
      tarea_prioridad: 'Media',
      tarea_fecha_limite: '',
    });
    setCurrentTaskId(null);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-250px)]">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={getTasksByColumn(column.id)}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onAddTask={handleAddTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="opacity-90">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
                onToggleComplete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <Modal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          resetForm();
        }}
        title={isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
      >
        <form onSubmit={handleSubmitTask} className="space-y-4 p-4">
          <Input
            label="Nombre de la tarea"
            value={taskFormData.tarea_nombre}
            onChange={(e) => setTaskFormData({ ...taskFormData, tarea_nombre: e.target.value })}
            required
            placeholder="Ej: Diseñar mockups"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              value={taskFormData.tarea_descripcion}
              onChange={(e) => setTaskFormData({ ...taskFormData, tarea_descripcion: e.target.value })}
              placeholder="Descripción detallada..."
            />
          </div>

          <Select
            label="Estado"
            value={taskFormData.tarea_estado}
            onChange={(e) => setTaskFormData({ ...taskFormData, tarea_estado: e.target.value })}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Completada">Completada</option>
          </Select>

          <Select
            label="Prioridad"
            value={taskFormData.tarea_prioridad}
            onChange={(e) => setTaskFormData({ ...taskFormData, tarea_prioridad: e.target.value })}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </Select>

          <Input
            type="date"
            label="Fecha límite"
            value={taskFormData.tarea_fecha_limite}
            onChange={(e) => setTaskFormData({ ...taskFormData, tarea_fecha_limite: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowTaskModal(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Actualizar' : 'Crear'} Tarea
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
