import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  DollarSign, 
  Users, 
  FolderKanban,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Trash2,
  Edit,
  Eye,
  Loader2,
  CalendarClock,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { ColorLogo } from '@/components/ui/logos/FreelanceLogo';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Componente de etiqueta de estado
const StatusBadge = ({ status }) => {
  const statusClasses = {
    'En progreso': 'bg-blue-100 text-blue-800',
    'Completado': 'bg-green-100 text-green-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Cancelado': 'bg-red-100 text-red-800',
    'default': 'bg-gray-100 text-gray-800',
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      statusClasses[status] || statusClasses.default
    }`}>
      {status}
    </span>
  );
};

// Componente de tarjeta de proyecto
const ProjectCard = ({ project, onView, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  // Calcular días restantes
  const daysRemaining = useMemo(() => {
    const today = new Date();
    const dueDate = new Date(project.proyecto_termino);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [project.proyecto_termino]);
  
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900">{project.proyecto_nombre}</h3>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)} 
              className="text-gray-400 hover:text-gray-500 p-1 rounded-full"
            >
              <MoreHorizontal size={18} />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                <div className="py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(project);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Eye size={16} className="mr-2" />
                    Ver detalles
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(project);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Edit size={16} className="mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(project);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <StatusBadge status={project.estado} />
          <span className="text-xs text-gray-500 ml-2">
            Cliente: {project.cliente_nombre}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {project.proyecto_descripcion}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <DollarSign size={16} className="text-gray-400 mb-1" />
            <span className="text-xs font-medium text-gray-600">
              ${project.proyecto_presupuesto.toLocaleString()}
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <Calendar size={16} className="text-gray-400 mb-1" />
            <span className="text-xs font-medium text-gray-600">
              {new Date(project.proyecto_termino).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <CalendarClock size={16} className="text-gray-400 mb-1" />
            <span className={`text-xs font-medium ${
              daysRemaining < 0 ? 'text-red-600' : 
              daysRemaining < 7 ? 'text-yellow-600' : 
              'text-gray-600'
            }`}>
              {daysRemaining < 0 
                ? `${Math.abs(daysRemaining)} días de retraso` 
                : daysRemaining === 0 
                  ? 'Hoy vence' 
                  : `${daysRemaining} días restantes`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de estado vacío
const EmptyState = ({ onCreateNew }) => (
  <div className="bg-white rounded-lg shadow border border-gray-100 p-8 text-center">
    <FolderKanban className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay proyectos</h3>
    <p className="mt-1 text-sm text-gray-500">
      Comienza creando tu primer proyecto.
    </p>
    <div className="mt-6">
      <button
        type="button"
        onClick={onCreateNew}
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
      >
        <Plus className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
        Nuevo Proyecto
      </button>
    </div>
  </div>
);

// Componente de lista de proyectos
const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sortField, setSortField] = useState('fecha');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      
      try {   
        // Datos simulados
        setTimeout(() => {
          const mockProjects = [
            {
              proyecto_id: 1,
              proyecto_nombre: 'Diseño de sitio web',
              cliente_nombre: 'Empresa ABC',
              estado: 'En progreso',
              proyecto_descripcion: 'Diseño y desarrollo de sitio web responsivo con CMS personalizado para una empresa de tecnología.',
              proyecto_termino: '2025-04-30',
              proyecto_presupuesto: 1500000,
              proyecto_inicio: '2025-02-15'
            },
            {
              proyecto_id: 2,
              proyecto_nombre: 'Campaña de marketing digital',
              cliente_nombre: 'Startup XYZ',
              estado: 'Pendiente',
              proyecto_descripcion: 'Estrategia y ejecución de campaña de marketing digital para lanzamiento de producto nuevo enfocado en redes sociales.',
              proyecto_termino: '2025-05-15',
              proyecto_presupuesto: 800000,
              proyecto_inicio: '2025-03-01'
            },
            {
              proyecto_id: 3,
              proyecto_nombre: 'Desarrollo de app móvil',
              cliente_nombre: 'Corporación 123',
              estado: 'En progreso',
              proyecto_descripcion: 'Desarrollo de aplicación móvil para iOS y Android con sistema de reservas y notificaciones en tiempo real.',
              proyecto_termino: '2025-06-20',
              proyecto_presupuesto: 3000000,
              proyecto_inicio: '2025-02-01'
            },
            {
              proyecto_id: 4,
              proyecto_nombre: 'Rediseño de marca',
              cliente_nombre: 'Tienda Local',
              estado: 'Completado',
              proyecto_descripcion: 'Rediseño completo de identidad de marca incluyendo logo, paleta de colores, tipografía y aplicaciones.',
              proyecto_termino: '2025-01-30',
              proyecto_presupuesto: 500000,
              proyecto_inicio: '2024-12-15'
            },
            {
              proyecto_id: 5,
              proyecto_nombre: 'Consultoría SEO',
              cliente_nombre: 'Empresa ABC',
              estado: 'Pendiente',
              proyecto_descripcion: 'Análisis y optimización de posicionamiento en buscadores para aumentar visibilidad online.',
              proyecto_termino: '2025-04-15',
              proyecto_presupuesto: 600000,
              proyecto_inicio: '2025-03-15'
            },
          ];
          
          setProjects(mockProjects);
          setFilteredProjects(mockProjects);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Error al cargar los proyectos');
        setLoading(false);
        
        toast({
          title: "Error",
          description: "No se pudieron cargar los proyectos",
          variant: "destructive",
        });
      }
    };
    
    fetchProjects();
  }, [user, toast]);

  // Aplicar filtros y ordenar
  useEffect(() => {
    let result = [...projects];
    
    // Aplicar filtro de búsqueda
    if (searchTerm) {
      result = result.filter(project => 
        project.proyecto_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.proyecto_descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar filtro de estado
    if (statusFilter !== 'Todos') {
      result = result.filter(project => project.estado === statusFilter);
    }
    
    // Aplicar ordenamiento
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'nombre':
          comparison = a.proyecto_nombre.localeCompare(b.proyecto_nombre);
          break;
        case 'cliente':
          comparison = a.cliente_nombre.localeCompare(b.cliente_nombre);
          break;
        case 'presupuesto':
          comparison = a.proyecto_presupuesto - b.proyecto_presupuesto;
          break;
        case 'fecha':
          comparison = new Date(a.proyecto_termino) - new Date(b.proyecto_termino);
          break;
        default:
          comparison = new Date(a.proyecto_termino) - new Date(b.proyecto_termino);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredProjects(result);
  }, [projects, searchTerm, statusFilter, sortField, sortDirection]);

  // Manejar ordenamiento
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Manejar eliminación
  const handleDelete = (project) => {
    // Mostrar diálogo de confirmación
    if (window.confirm(`¿Estás seguro de eliminar el proyecto "${project.proyecto_nombre}"?`)) {

      setProjects(projects.filter(p => p.proyecto_id !== project.proyecto_id));
      
      toast({
        title: "Proyecto eliminado",
        description: "El proyecto ha sido eliminado correctamente",
        variant: "success",
      });
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <Loader2 size={48} className="animate-spin text-primary mb-4" />
          <div className="text-gray-500">Cargando proyectos...</div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
          </div>
          <p className="text-red-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <button
            type="button"
            onClick={() => navigate('/dashboardpage/proyectos/nuevo')}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
          >
            <Plus className="mr-2" size={16} />
            Nuevo Proyecto
          </button>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-auto flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="w-full md:w-auto flex items-center space-x-2">
            <label htmlFor="statusFilter" className="text-sm font-medium">
              Estado:
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Todos">Todos</option>
              <option value="En progreso">En progreso</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto flex items-center space-x-2">
            <label className="text-sm font-medium">
              Ordenar por:
            </label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => handleSort('nombre')}
                className={cn(
                  "px-3 py-2 text-sm flex items-center", 
                  sortField === 'nombre' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                )}
              >
                Nombre
                {sortField === 'nombre' && (
                  sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                )}
              </button>
              <button
                onClick={() => handleSort('fecha')}
                className={cn(
                  "px-3 py-2 text-sm flex items-center", 
                  sortField === 'fecha' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                )}
              >
                Fecha
                {sortField === 'fecha' && (
                  sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                )}
              </button>
              <button
                onClick={() => handleSort('presupuesto')}
                className={cn(
                  "px-3 py-2 text-sm flex items-center", 
                  sortField === 'presupuesto' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                )}
              >
                Presupuesto
                {sortField === 'presupuesto' && (
                  sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid/lista de proyectos */}
      {filteredProjects.length === 0 ? (
        <EmptyState onCreateNew={() => navigate('/dashboardpage/proyectos/nuevo')} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.proyecto_id}
              project={project}
              onView={(project) => navigate(`/dashboardpage/proyectos/${project.proyecto_id}`)}
              onEdit={(project) => navigate(`/dashboardpage/proyectos/${project.proyecto_id}/edit`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;