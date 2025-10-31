import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Grid3x3,
  List,
  SortAsc,
  Users,
  UserX
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ClientCard } from './ClientCard'
import { Input, Button, Select, Card, Spinner } from '../../ui'

/**
 * ClientList - Grid/List view of clients with search and sort
 */
export const ClientList = ({
  clientes = [],
  loading = false,
  onClientEdit,
  onClientDelete,
  ...props
}) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name') // 'name', 'email', 'projects'

  // Filter and sort clients
  const filteredClientes = useMemo(() => {
    let filtered = [...clientes]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((cliente) => {
        const searchLower = searchQuery.toLowerCase()
        return (
          cliente.cliente_nombre?.toLowerCase().includes(searchLower) ||
          cliente.cliente_email?.toLowerCase().includes(searchLower) ||
          cliente.cliente_tel?.toLowerCase().includes(searchLower) ||
          cliente.cliente_rut?.toLowerCase().includes(searchLower)
        )
      })
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.cliente_nombre || '').localeCompare(b.cliente_nombre || '')
        case 'email':
          return (a.cliente_email || '').localeCompare(b.cliente_email || '')
        case 'rut':
          return (a.cliente_rut || '').localeCompare(b.cliente_rut || '')
        default:
          return 0
      }
    })

    return filtered
  }, [clientes, searchQuery, sortBy])

  const handleNewClient = () => {
    navigate('/nuevocliente')
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Spinner size="lg" />
        <p className="text-gray-400 mt-4">Cargando clientes...</p>
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
              placeholder="Buscar clientes por nombre, email, teléfono o RUT..."
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
                { value: 'email', label: 'Email' },
                { value: 'rut', label: 'RUT' }
              ]}
              className="w-full lg:w-40"
            />

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-blue text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-blue text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* New Client Button */}
            <Button
              leftIcon={<Plus size={18} />}
              onClick={handleNewClient}
              className="whitespace-nowrap"
              variant="secondary"
            >
              Nuevo Cliente
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          {filteredClientes.length === clientes.length ? (
            <span>
              {clientes.length} {clientes.length === 1 ? 'cliente' : 'clientes'}
            </span>
          ) : (
            <span>
              Mostrando {filteredClientes.length} de {clientes.length}{' '}
              {clientes.length === 1 ? 'cliente' : 'clientes'}
            </span>
          )}
        </div>
      </Card>

      {/* Clients Grid/List */}
      {filteredClientes.length === 0 ? (
        <EmptyState hasSearch={searchQuery.length > 0} onNewClient={handleNewClient} />
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
            {filteredClientes.map((cliente) => (
              <motion.div
                key={cliente.cliente_id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ClientCard
                  cliente={cliente}
                  onEdit={onClientEdit}
                  onDelete={onClientDelete}
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
 * EmptyState - Shows when no clients exist or search has no results
 */
const EmptyState = ({ hasSearch, onNewClient }) => {
  return (
    <Card className="p-12">
      <div className="flex flex-col items-center justify-center text-center">
        {hasSearch ? (
          <>
            <UserX className="text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No se encontraron clientes
            </h3>
            <p className="text-gray-400 mb-6">
              Intenta con otros términos de búsqueda
            </p>
          </>
        ) : (
          <>
            <Users className="text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No tienes clientes aún
            </h3>
            <p className="text-gray-400 mb-6">
              Comienza agregando tu primer cliente para gestionar proyectos
            </p>
            <Button leftIcon={<Plus size={18} />} onClick={onNewClient} variant="secondary">
              Agregar Primer Cliente
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
