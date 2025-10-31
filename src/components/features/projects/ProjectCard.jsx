import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  Trash2,
  Eye
} from 'lucide-react'
import { Card, Badge, Button } from '../../ui'
import { cn } from '../../../utils/cn'

/**
 * ProjectCard - Card component for displaying project information
 */
export const ProjectCard = ({
  proyecto,
  onClick,
  onDelete,
  loading = false,
  ...props
}) => {
  const [tasks, setTasks] = useState([])
  const [tasksLoading, setTasksLoading] = useState(true)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    if (proyecto?.proyecto_id) {
      fetchTasks()
    }
  }, [proyecto?.proyecto_id])

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `https://api-freelancehub.vercel.app/tareas/${proyecto.proyecto_id}`
      )
      const data = await response.json()
      setTasks(data.tareas || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setTasks([])
    } finally {
      setTasksLoading(false)
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.tarea_completada).length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      onDelete?.(proyecto.proyecto_id)
    }
    setShowActions(false)
  }

  const handleViewDetails = (e) => {
    e.stopPropagation()
    onClick?.(proyecto)
    setShowActions(false)
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-full bg-gray-700 rounded animate-pulse" />
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        hover
        className={cn(
          'p-6 cursor-pointer relative',
          'hover:border-primary-yellow/50 transition-all duration-200'
        )}
        onClick={() => onClick?.(proyecto)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="text-primary-yellow" size={20} />
              <h3 className="text-lg font-semibold text-gray-100 truncate">
                {proyecto.proyecto_nombre}
              </h3>
            </div>
            {proyecto.cliente_nombre && (
              <p className="text-sm text-gray-400">
                Cliente: {proyecto.cliente_nombre}
              </p>
            )}
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowActions(!showActions)
              }}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <MoreVertical size={18} className="text-gray-400" />
            </button>

            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10"
              >
                <button
                  onClick={handleViewDetails}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <Eye size={16} />
                  Ver detalles
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition-colors rounded-b-lg"
                >
                  <Trash2 size={16} />
                  Eliminar proyecto
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="text-success" size={18} />
          <span className="text-xl font-bold text-gray-100">
            ${parseFloat(proyecto.proyecto_presupuesto || 0).toLocaleString()}
          </span>
        </div>

        {/* Task Stats */}
        <div className="space-y-3 mb-4">
          {tasksLoading ? (
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
          ) : (
            <>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary-lime" />
                  <span className="text-gray-300">Tareas completadas</span>
                </div>
                <span className="font-semibold text-gray-100">
                  {completedTasks}/{totalTasks}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-lime to-success rounded-full"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{Math.round(progressPercentage)}% completado</span>
                {totalTasks - completedTasks > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{totalTasks - completedTasks} pendientes</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <Badge
            variant={progressPercentage === 100 ? 'success' : 'info'}
            className="text-xs"
          >
            {progressPercentage === 100 ? 'Completado' : 'En progreso'}
          </Badge>

          {proyecto.proyecto_fecha && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={12} />
              <span>{new Date(proyecto.proyecto_fecha).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
