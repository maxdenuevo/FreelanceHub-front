import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Grid3x3,
  List,
  Filter,
  SortAsc,
  Briefcase,
  FolderOpen
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ProjectCard } from './ProjectCard'
import { Input, Button, Select, Card, Spinner } from '../../ui'

/**
 * ProjectList - Grid/List view of projects with search, filter, and sort
 */
export const ProjectList = ({
  proyectos = [],
  loading = false,
  onProjectClick,
  onProjectDelete,
  ...props
}) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name') // 'name', 'budget', 'progress'
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'active', 'completed'

  // Filter and sort projects
  const filteredProyectos = useMemo(() => {
    let filtered = [...proyectos]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((proyecto) =>
        proyecto.proyecto_nombre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter (would need task data for completion status)
    // For now, we'll keep it simple
    if (filterStatus !== 'all') {
      // This would require fetching task data for each project
      // For now, showing all projects
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.proyecto_nombre.localeCompare(b.proyecto_nombre)
        case 'budget':
          return (
            parseFloat(b.proyecto_presupuesto || 0) -
            parseFloat(a.proyecto_presupuesto || 0)
          )
        case 'date':
          return new Date(b.proyecto_fecha || 0) - new Date(a.proyecto_fecha || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [proyectos, searchQuery, sortBy, filterStatus])

  const handleNewProject = () => {
    navigate('/nuevocliente/nuevoproyecto')
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" />
        <p className="text-gray-400 mt-4">Cargando proyectos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6" {...props}>
      {/* Header with Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="flex-1 w-full lg:max-w-md">
            <Input
              leftIcon={<Search size={18} />}
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Sort */}
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'name', label: 'Nombre' },
                { value: 'budget', label: 'Presupuesto' },
                { value: 'date', label: 'Fecha' }
              ]}
              className="w-full lg:w-40"
            />

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-yellow text-gray-900'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-yellow text-gray-900'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* New Project Button */}
            <Button
              leftIcon={<Plus size={18} />}
              onClick={handleNewProject}
              className="whitespace-nowrap"
            >
              Nuevo Proyecto
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          {filteredProyectos.length === proyectos.length ? (
            <span>
              {proyectos.length} {proyectos.length === 1 ? 'proyecto' : 'proyectos'}
            </span>
          ) : (
            <span>
              Mostrando {filteredProyectos.length} de {proyectos.length}{' '}
              {proyectos.length === 1 ? 'proyecto' : 'proyectos'}
            </span>
          )}
        </div>
      </Card>

      {/* Projects Grid/List */}
      {filteredProyectos.length === 0 ? (
        <EmptyState hasSearch={searchQuery.length > 0} onNewProject={handleNewProject} />
      ) : (
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredProyectos.map((proyecto) => (
              <motion.div
                key={proyecto.proyecto_id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProjectCard
                  proyecto={proyecto}
                  onClick={onProjectClick}
                  onDelete={onProjectDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

/**
 * EmptyState - Shows when no projects exist or search has no results
 */
const EmptyState = ({ hasSearch, onNewProject }) => {
  return (
    <Card className="p-12">
      <div className="flex flex-col items-center justify-center text-center">
        {hasSearch ? (
          <>
            <FolderOpen className="text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-gray-400 mb-6">
              Intenta con otros términos de búsqueda
            </p>
          </>
        ) : (
          <>
            <Briefcase className="text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No tienes proyectos aún
            </h3>
            <p className="text-gray-400 mb-6">
              Comienza creando tu primer proyecto para gestionar tareas y pagos
            </p>
            <Button leftIcon={<Plus size={18} />} onClick={onNewProject}>
              Crear Primer Proyecto
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
