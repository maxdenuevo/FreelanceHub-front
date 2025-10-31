import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  FileText,
  Briefcase,
  MoreVertical,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, Badge, Avatar } from '../../ui'
import { cn } from '../../../utils/cn'

/**
 * ClientCard - Card component for displaying client information
 */
export const ClientCard = ({
  cliente,
  onEdit,
  onDelete,
  loading = false,
  ...props
}) => {
  const navigate = useNavigate()
  const [proyectos, setProyectos] = useState([])
  const [proyectosLoading, setProyectosLoading] = useState(true)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    if (cliente?.cliente_id) {
      fetchProyectos()
    }
  }, [cliente?.cliente_id])

  const fetchProyectos = async () => {
    const userId = localStorage.getItem('usuario_id')

    try {
      const response = await fetch(
        `https://api-freelancehub.vercel.app/proyectos/${userId}`
      )
      const data = await response.json()

      // Filter projects for this client
      const clientProjects = (data.proyectos || []).filter(
        (p) => p.cliente_id === cliente.cliente_id
      )
      setProyectos(clientProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProyectos([])
    } finally {
      setProyectosLoading(false)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      onDelete?.(cliente.cliente_id)
    }
    setShowActions(false)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit?.(cliente)
    setShowActions(false)
  }

  const handleViewProjects = (e) => {
    e.stopPropagation()
    navigate('/dashboardpage/proyectos')
    setShowActions(false)
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
          </div>
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
          'p-6 relative',
          'hover:border-primary-blue/50 transition-all duration-200'
        )}
        {...props}
      >
        {/* Header with Avatar and Actions */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <Avatar name={cliente.cliente_nombre} size="lg" />

          {/* Client Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-100 truncate mb-1">
              {cliente.cliente_nombre}
            </h3>
            {cliente.cliente_rut && (
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <FileText size={14} />
                <span>{cliente.cliente_rut}</span>
              </div>
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
                  onClick={handleEdit}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <Edit size={16} />
                  Editar cliente
                </button>
                {proyectos.length > 0 && (
                  <button
                    onClick={handleViewProjects}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Ver proyectos
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition-colors rounded-b-lg"
                >
                  <Trash2 size={16} />
                  Eliminar cliente
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          {/* Email */}
          {cliente.cliente_email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-primary-blue flex-shrink-0" />
              <a
                href={`mailto:${cliente.cliente_email}`}
                className="text-gray-300 hover:text-primary-blue transition-colors truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {cliente.cliente_email}
              </a>
            </div>
          )}

          {/* Phone */}
          {cliente.cliente_tel && (
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-success flex-shrink-0" />
              <a
                href={`tel:${cliente.cliente_tel}`}
                className="text-gray-300 hover:text-success transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {cliente.cliente_tel}
              </a>
            </div>
          )}
        </div>

        {/* Projects Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-primary-lime" />
            <span className="text-sm text-gray-400">
              {proyectosLoading ? (
                <span className="inline-block h-4 w-16 bg-gray-700 rounded animate-pulse" />
              ) : (
                <>
                  {proyectos.length}{' '}
                  {proyectos.length === 1 ? 'proyecto' : 'proyectos'}
                </>
              )}
            </span>
          </div>

          {proyectos.length > 0 && (
            <Badge variant="info" className="text-xs">
              Activo
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
