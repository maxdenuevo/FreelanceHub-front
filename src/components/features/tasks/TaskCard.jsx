import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Calendar, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '../../ui';

/**
 * TaskCard - Tarjeta de tarea draggable para Kanban
 */
export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.tarea_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    Alta: 'bg-red-500',
    Media: 'bg-yellow-500',
    Baja: 'bg-green-500',
  };

  const priorityTextColors = {
    Alta: 'text-red-700',
    Media: 'text-yellow-700',
    Baja: 'text-green-700',
  };

  const deadline = task.tarea_fecha_limite ? new Date(task.tarea_fecha_limite) : null;
  const isOverdue = deadline && deadline < new Date() && task.tarea_estado !== 'Completada';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start gap-2">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          {/* Título */}
          <h4 className="font-medium text-gray-900 mb-2 truncate">
            {task.tarea_nombre}
          </h4>

          {/* Descripción */}
          {task.tarea_descripcion && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {task.tarea_descripcion}
            </p>
          )}

          {/* Prioridad y Deadline */}
          <div className="flex items-center gap-2 mb-3">
            {task.tarea_prioridad && (
              <Badge variant="outline" className={priorityTextColors[task.tarea_prioridad]}>
                {task.tarea_prioridad}
              </Badge>
            )}

            {deadline && (
              <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                <Calendar className="w-3 h-3" />
                {format(deadline, 'd MMM', { locale: es })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleComplete(task)}
              className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                task.tarea_estado === 'Completada'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={task.tarea_estado === 'Completada' ? 'Marcar pendiente' : 'Marcar completada'}
            >
              <CheckCircle2 className="w-3 h-3" />
              {task.tarea_estado === 'Completada' ? 'Completada' : 'Completar'}
            </button>

            <button
              onClick={() => onEdit(task)}
              className="text-gray-600 hover:text-blue-600 transition-colors p-1"
              title="Editar"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(task)}
              className="text-gray-600 hover:text-red-600 transition-colors p-1"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
