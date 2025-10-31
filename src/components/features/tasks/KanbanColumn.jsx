import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';

/**
 * KanbanColumn - Columna individual del tablero Kanban
 */
export const KanbanColumn = ({
  id,
  title,
  tasks,
  color,
  onEdit,
  onDelete,
  onToggleComplete,
  onAddTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const taskIds = tasks.map((task) => task.tarea_id);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 rounded-t-lg ${color}`}>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="bg-white/30 text-white text-sm font-medium px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddTask(id)}
          className="text-white hover:bg-white/20 p-1 rounded transition-colors"
          title="Agregar tarea"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 space-y-3 bg-gray-50 rounded-b-lg min-h-[200px] transition-colors ${
          isOver ? 'bg-blue-50 ring-2 ring-blue-300' : ''
        }`}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No hay tareas aquí</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.tarea_id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};
