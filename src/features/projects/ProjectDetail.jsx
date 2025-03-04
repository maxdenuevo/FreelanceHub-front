import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle2,
  Calendar,
  DollarSign,
  Users,
  ClipboardList,
  Clock,
  FileText,
  CreditCard,
  Plus,
  MessageSquare,
  FileCheck,
  Loader2,
  AlertTriangle,
  XCircle,
  Tag
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';
import { cn } from '@/lib/utils';

// Tab para cambiar secciones
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 text-sm font-medium",
      active 
        ? "text-primary border-b-2 border-primary" 
        : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
    )}
  >
    {children}
  </button>
);

// Componente de barra de progreso
const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className={cn(
        "h-2.5 rounded-full",
        percentage < 30 ? "bg-red-500" :
        percentage < 70 ? "bg-yellow-500" :
        "bg-green-500"
      )}
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

// Status badge component
const StatusBadge = ({ status }) => {
  const statusClasses = {
    'En progreso': 'bg-blue-100 text-blue-800',
    'Completado': 'bg-green-100 text-green-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Cancelado': 'bg-red-100 text-red-800',
    'default': 'bg-gray-100 text-gray-800',
  };
  
  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
      statusClasses[status] || statusClasses.default
    }`}>
      {status}
    </span>
  );
};

// Componente de fila de tarea para la lista de tareas
const TaskRow = ({ task, onToggleComplete, onEdit, onDelete }) => (
  <div className="py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={() => onToggleComplete(task)}
          className={cn(
            "flex-shrink-0 mr-3",
            task.tarea_completada ? "text-green-500" : "text-gray-400 hover:text-gray-500"
          )}
        >
          <CheckCircle2 size={20} />
        </button>
        
        <div className="min-w-0">
          <p className={cn(
            "font-medium truncate",
            task.tarea_completada ? "text-gray-500 line-through" : "text-gray-900"
          )}>
            {task.tarea_nombre}
          </p>
          <div className="flex text-xs text-gray-500 mt-1">
            <div className="flex items-center mr-3">
              <Calendar size={12} className="mr-1" />
              {new Date(task.tarea_fecha).toLocaleDateString()}
            </div>
            {task.tarea_necesita_pago && (
              <div className="flex items-center">
                <DollarSign size={12} className="mr-1" />
                {task.pago ? (task.pago.pago_completado ? 'Pagado' : 'Pago pendiente') : 'Requiere pago'}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => onEdit(task)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(task)}
          className="p-1 text-gray-400 hover:text-red-600 ml-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    
    {task.tarea_descripcion && (
      <div className="pl-8 pr-2 mt-2">
        <p className="text-sm text-gray-600">{task.tarea_descripcion}</p>
      </div>
    )}
  </div>
);

// Componente de fila de pago para la lista de pagos
const PaymentRow = ({ payment, onEdit, onDelete }) => (
  <div className="py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-2 rounded-full mr-3 ${
          payment.pago_completado ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
        }`}>
          <DollarSign size={16} />
        </div>
        
        <div>
          <p className="font-medium text-gray-900">
            ${payment.pago_monto.toLocaleString()}
          </p>
          <div className="flex text-xs text-gray-500 mt-1">
            <div className="flex items-center mr-3">
              <Calendar size={12} className="mr-1" />
              {new Date(payment.pago_fecha).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Tag size={12} className="mr-1" />
              {payment.tarea_nombre}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
          payment.pago_completado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {payment.pago_completado ? 'Pagado' : 'Pendiente'}
        </span>
        
        <button 
          onClick={() => onEdit(payment)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(payment)}
          className="p-1 text-gray-400 hover:text-red-600 ml-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

// Componente de nota para la lista de notas
const NoteItem = ({ note, onEdit, onDelete }) => (
  <div className="border border-gray-100 rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between">
      <p className="text-sm text-gray-500">{new Date(note.fecha).toLocaleString()}</p>
      <div className="flex">
        <button 
          onClick={() => onEdit(note)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <Edit size={14} />
        </button>
        <button 
          onClick={() => onDelete(note)}
          className="p-1 text-gray-400 hover:text-red-600 ml-1"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
    <p className="mt-2 text-gray-800 whitespace-pre-line">{note.contenido}</p>
  </div>
);

// Componente principal de detalles del proyecto
const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Calcular porcentaje de finalización
  const completionPercentage = tasks.length > 0
    ? Math.round((tasks.filter(task => task.tarea_completada).length / tasks.length) * 100)
    : 0;

  // Calcular total pagado y pendiente
  const totalPaid = payments
    .filter(payment => payment.pago_completado)
    .reduce((sum, payment) => sum + payment.pago_monto, 0);
    
  const totalPending = payments
    .filter(payment => !payment.pago_completado)
    .reduce((sum, payment) => sum + payment.pago_monto, 0);

  // Cargar datos del proyecto
  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, we would fetch the actual data from our API
        // Mock data for project
        setTimeout(() => {
          // Mock project data
          const mockProject = {
            proyecto_id: parseInt(id),
            proyecto_nombre: 'Diseño de sitio web corporativo',
            cliente_id: 101,
            estado: 'En progreso',
            proyecto_descripcion: 'Diseño y desarrollo de sitio web responsivo con CMS personalizado para empresa de tecnología. Incluye secciones de productos, servicios, blog y formulario de contacto.',
            proyecto_termino: '2025-06-15',
            proyecto_inicio: '2025-02-15',
            proyecto_presupuesto: 1800000,
            proyecto_tipo: 'Diseño Web',
          };
          
          // Mock client data
          const mockClient = {
            cliente_id: 101,
            cliente_nombre: 'TechSolutions SpA',
            cliente_email: 'contacto@techsolutions.cl',
            cliente_tel: '+56 9 1234 5678',
            cliente_rut: '76.123.456-7',
          };
          
          // Mock tasks data
          const mockTasks = [
            {
              tarea_id: 1,
              tarea_nombre: 'Wireframes y estructura del sitio',
              tarea_descripcion: 'Crear esquemas de todas las páginas',
              tarea_fecha: '2025-03-01',
              tarea_completada: true,
              tarea_necesita_pago: true,
              pago: {
                pago_id: 1,
                pago_monto: 500000,
                pago_fecha: '2025-03-05',
                pago_completado: true,
              }
            },
            {
              tarea_id: 2,
              tarea_nombre: 'Diseño de UI',
              tarea_descripcion: 'Diseñar interfaz según manual de marca',
              tarea_fecha: '2025-03-20',
              tarea_completada: true,
              tarea_necesita_pago: true,
              pago: {
                pago_id: 2,
                pago_monto: 600000,
                pago_fecha: '2025-03-25',
                pago_completado: true,
              }
            },
            {
              tarea_id: 3,
              tarea_nombre: 'Desarrollo Frontend',
              tarea_descripcion: 'Implementar HTML/CSS/JS de todas las páginas',
              tarea_fecha: '2025-04-30',
              tarea_completada: false,
              tarea_necesita_pago: true,
              pago: {
                pago_id: 3,
                pago_monto: 400000,
                pago_fecha: '2025-05-05',
                pago_completado: false,
              }
            },
            {
              tarea_id: 4,
              tarea_nombre: 'Desarrollo Backend y CMS',
              tarea_descripcion: 'Implementar sistema de gestión de contenidos',
              tarea_fecha: '2025-05-30',
              tarea_completada: false,
              tarea_necesita_pago: true,
              pago: null, // No payment created yet
            },
            {
              tarea_id: 5,
              tarea_nombre: 'Testing y ajustes',
              tarea_descripcion: 'Pruebas de funcionamiento y correcciones',
              tarea_fecha: '2025-06-10',
              tarea_completada: false,
              tarea_necesita_pago: false,
            },
          ];
          
          // Mock payments data (we're getting them from tasks)
          const mockPayments = mockTasks
            .filter(task => task.pago)
            .map(task => ({
              ...task.pago,
              tarea_nombre: task.tarea_nombre,
            }));
          
          // Mock notes data
          const mockNotes = [
            {
              id: 1,
              contenido: 'Cliente pidió añadir una sección de testimonios en la página principal.',
              fecha: '2025-02-20T15:30:00',
            },
            {
              id: 2,
              contenido: 'Reunión de seguimiento programada para el 25 de marzo a las 10:00 AM.',
              fecha: '2025-03-15T09:45:00',
            },
          ];
          
          // Mock contract data
          const mockContract = {
            contrato_id: 1,
            plantilla_id: 1,
            fecha_creacion: '2025-02-10',
            estado: 'Firmado',
            archivo_url: '#',
          };
          
          setProject(mockProject);
          setClient(mockClient);
          setTasks(mockTasks);
          setPayments(mockPayments);
          setNotes(mockNotes);
          setContract(mockContract);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Error al cargar los datos del proyecto');
        setLoading(false);
        
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos del proyecto",
          variant: "destructive",
        });
      }
    };
    
    fetchProjectData();
  }, [id, toast]);

  // Handle toggle task completion
  const handleToggleTaskComplete = async (task) => {
    try {
      const updatedTask = { ...task, tarea_completada: !task.tarea_completada };
      
      // API call would go here
      // await api.tasks.update(task.tarea_id, updatedTask);
      
      // Update local state
      setTasks(tasks.map(t => 
        t.tarea_id === task.tarea_id ? updatedTask : t
      ));
      
      toast({
        title: updatedTask.tarea_completada ? "Tarea completada" : "Tarea pendiente",
        description: `La tarea "${task.tarea_nombre}" ha sido marcada como ${updatedTask.tarea_completada ? 'completada' : 'pendiente'}.`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la tarea",
        variant: "destructive",
      });
    }
  };

  // Manejar agregar nueva nota
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    setIsAddingNote(true);
    
    try {
      // Crear nuevo objeto de nota
      const noteObj = {
        id: Date.now(), // ID temporal
        contenido: newNote,
        fecha: new Date().toISOString(),
      };
      
      // Llamada a la API iría aquí
      // const response = await api.notes.create(noteObj);
      
      // Actualizar estado local
      setNotes([noteObj, ...notes]);
      setNewNote('');
      
      toast({
        title: "Nota agregada",
        description: "La nota ha sido agregada correctamente",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar la nota",
        variant: "destructive",
      });
    } finally {
      setIsAddingNote(false);
    }
  };

  // Handle delete note
  const handleDeleteNote = async (note) => {
    try {
      // API call would go here
      // await api.notes.delete(note.id);
      
      // Update local state
      setNotes(notes.filter(n => n.id !== note.id));
      
      toast({
        title: "Nota eliminada",
        description: "La nota ha sido eliminada correctamente",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la nota",
        variant: "destructive",
      });
    }
  };

  // Navigate back to projects list
  const handleBackClick = () => {
    navigate('/dashboardpage/proyectos');
  };

  // Manejar eliminar proyecto
  const handleDeleteProject = () => {
    // Mostrar diálogo de confirmación
    if (window.confirm(`¿Estás seguro de eliminar el proyecto "${project.proyecto_nombre}"?`)) {
      // Llamada a la API iría aquí
      // await api.projects.delete(project.proyecto_id);
      
      toast({
        title: "Proyecto eliminado",
        description: "El proyecto ha sido eliminado correctamente",
        variant: "success",
      });
      
      navigate('/dashboardpage/proyectos');
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <Loader2 size={48} className="animate-spin text-primary mb-4" />
          <div className="text-gray-500">Cargando proyecto...</div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
          </div>
          <p className="text-red-700">{error || "No se pudo encontrar el proyecto solicitado"}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            onClick={handleBackClick}
          >
            Volver a proyectos
          </button>
        </div>
      </div>
    );
  }

  // Calcular días restantes
  const today = new Date();
  const dueDate = new Date(project.proyecto_termino);
  const diffTime = dueDate - today;
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Fecha de inicio para mostrar
  const startDate = new Date(project.proyecto_inicio);

  return (
    <div className="space-y-6">
      {/* Encabezado/Navegación de vuelta */}
      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={handleBackClick}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Volver a proyectos
        </button>
      </div>
      
      {/* Título y acciones del proyecto */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{project.proyecto_nombre}</h1>
            <div className="flex items-center mt-2">
              <StatusBadge status={project.estado} />
              <span className="ml-3 text-sm text-gray-500">
                Cliente: {client.cliente_nombre}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/dashboardpage/proyectos/${id}/edit`)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit size={16} className="mr-1.5" />
              Editar
            </button>
            <button
              onClick={handleDeleteProject}
              className="flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-1.5" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
      
      {/* Navegación de pestañas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto">
            <TabButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
            >
              <ClipboardList size={16} className="mr-2 inline-block" />
              Resumen
            </TabButton>
            <TabButton 
              active={activeTab === 'tasks'} 
              onClick={() => setActiveTab('tasks')}
            >
              <CheckCircle2 size={16} className="mr-2 inline-block" />
              Tareas ({tasks.length})
            </TabButton>
            <TabButton 
              active={activeTab === 'payments'} 
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard size={16} className="mr-2 inline-block" />
              Pagos ({payments.length})
            </TabButton>
            <TabButton 
              active={activeTab === 'notes'} 
              onClick={() => setActiveTab('notes')}
            >
              <MessageSquare size={16} className="mr-2 inline-block" />
              Notas ({notes.length})
            </TabButton>
            <TabButton 
              active={activeTab === 'contract'} 
              onClick={() => setActiveTab('contract')}
            >
              <FileText size={16} className="mr-2 inline-block" />
              Contrato
            </TabButton>
          </div>
        </div>
        
        {/* Contenido de la pestaña */}
        <div className="p-6">
          {/* Pestaña de resumen */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Detalles del proyecto */}
              <div>
                <h3 className="text-lg font-medium mb-3">Detalles del proyecto</h3>
                <p className="text-gray-600 whitespace-pre-line mb-4">{project.proyecto_descripcion}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Presupuesto total</div>
                    <div className="text-xl font-semibold">${project.proyecto_presupuesto.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Fechas</div>
                    <div className="text-md font-medium">
                      {startDate.toLocaleDateString()} - {dueDate.toLocaleDateString()}
                    </div>
                    <div className={`text-sm mt-1 ${
                      daysRemaining < 0 ? 'text-red-600' : 
                      daysRemaining < 7 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {daysRemaining < 0 
                        ? `${Math.abs(daysRemaining)} días de retraso` 
                        : daysRemaining === 0 
                          ? 'Vence hoy' 
                          : `${daysRemaining} días restantes`}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Tipo de proyecto</div>
                    <div className="text-md font-medium">{project.proyecto_tipo}</div>
                  </div>
                </div>
              </div>
              
              {/* Sección de progreso */}
              <div>
                <h3 className="text-lg font-medium mb-3">Progreso del proyecto</h3>
                <div className="flex items-center mb-2">
                  <div className="text-2xl font-bold mr-2">{completionPercentage}%</div>
                  <div className="text-sm text-gray-500">completado</div>
                </div>
                <ProgressBar percentage={completionPercentage} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle2 size={20} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{tasks.filter(t => t.tarea_completada).length}</div>
                      <div className="text-sm text-gray-500">Tareas completadas</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <Clock size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{tasks.filter(t => !t.tarea_completada).length}</div>
                      <div className="text-sm text-gray-500">Tareas pendientes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{Math.max(daysRemaining, 0)}</div>
                      <div className="text-sm text-gray-500">Días restantes</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Información del cliente */}
              <div>
                <h3 className="text-lg font-medium mb-3">Información del cliente</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-lg">{client.cliente_nombre}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500">Email:</span>
                          <a href={`mailto:${client.cliente_email}`} className="text-primary ml-1 hover:underline">
                            {client.cliente_email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500">Teléfono:</span>
                          <a href={`tel:${client.cliente_tel}`} className="text-primary ml-1 hover:underline">
                            {client.cliente_tel}
                          </a>
                        </div>
                        {client.cliente_rut && (
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500">RUT:</span>
                            <span className="ml-1">{client.cliente_rut}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/dashboardpage/clientes/${client.cliente_id}`}
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  Ver perfil completo del cliente
                </Link>
              </div>
              
              {/* Resumen financiero */}
              <div>
                <h3 className="text-lg font-medium mb-3">Resumen financiero</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Presupuesto total</div>
                    <div className="text-xl font-semibold">${project.proyecto_presupuesto.toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-700 mb-1">Pagos recibidos</div>
                    <div className="text-xl font-semibold text-green-700">${totalPaid.toLocaleString()}</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-sm text-yellow-700 mb-1">Pagos pendientes</div>
                    <div className="text-xl font-semibold text-yellow-700">${totalPending.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Pestaña de tareas */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Tareas</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {tasks.filter(t => t.tarea_completada).length} de {tasks.length} tareas completadas
                  </p>
                </div>
                <Link 
                  to={`/dashboardpage/proyectos/${id}/tareas/nueva`}
                  className="flex items-center px-3 py-2 bg-primary text-white rounded-md text-sm font-medium"
                >
                  <Plus size={16} className="mr-1.5" />
                  Nueva tarea
                </Link>
              </div>
              
              {tasks.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Clock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay tareas</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Comienza creando la primera tarea para este proyecto.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-100">
                  {tasks.map((task) => (
                    <TaskRow
                      key={task.tarea_id}
                      task={task}
                      onToggleComplete={handleToggleTaskComplete}
                      onEdit={(task) => navigate(`/dashboardpage/tareas/${task.tarea_id}/edit`)}
                      onDelete={() => {
                        if (window.confirm(`¿Estás seguro de eliminar la tarea "${task.tarea_nombre}"?`)) {
                          setTasks(tasks.filter(t => t.tarea_id !== task.tarea_id));
                          toast({
                            title: "Tarea eliminada",
                            description: "La tarea ha sido eliminada correctamente",
                            variant: "success",
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Pestaña de pagos */}
          {activeTab === 'payments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Pagos</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Total: ${(totalPaid + totalPending).toLocaleString()} 
                    ({payments.filter(p => p.pago_completado).length} de {payments.length} pagos completados)
                  </p>
                </div>
                <Link 
                  to={`/dashboardpage/proyectos/${id}/pagos/nuevo`}
                  className="flex items-center px-3 py-2 bg-primary text-white rounded-md text-sm font-medium"
                >
                  <Plus size={16} className="mr-1.5" />
                  Nuevo pago
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-green-700 mb-1">Pagos recibidos</div>
                      <div className="text-xl font-semibold text-green-700">${totalPaid.toLocaleString()}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-yellow-700 mb-1">Pagos pendientes</div>
                      <div className="text-xl font-semibold text-yellow-700">${totalPending.toLocaleString()}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock size={20} className="text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              {payments.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay pagos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Aún no hay pagos registrados para este proyecto.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-100">
                  {payments.map((payment) => (
                    <PaymentRow
                      key={payment.pago_id}
                      payment={payment}
                      onEdit={(payment) => navigate(`/dashboardpage/pagos/${payment.pago_id}/edit`)}
                      onDelete={() => {
                        if (window.confirm(`¿Estás seguro de eliminar este pago de $${payment.pago_monto.toLocaleString()}?`)) {
                          setPayments(payments.filter(p => p.pago_id !== payment.pago_id));
                          toast({
                            title: "Pago eliminado",
                            description: "El pago ha sido eliminado correctamente",
                            variant: "success",
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Notes tab */}
          {activeTab === 'notes' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Notas</h3>
              
              {/* Add note form */}
              <div className="mb-6">
                <div className="relative">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Añade una nota sobre este proyecto..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || isAddingNote}
                    className={`absolute bottom-3 right-3 px-3 py-1 bg-primary text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
                  >
                    {isAddingNote ? (
                      <>
                        <Loader2 size={14} className="animate-spin mr-1" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="mr-1" />
                        Añadir nota
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Notes list */}
              {notes.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay notas</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Añade notas para llevar un registro de información importante.
                  </p>
                </div>
              ) : (
                <div>
                  {notes.map((note) => (
                    <NoteItem
                      key={note.id}
                      note={note}
                      onEdit={() => {
                        // This would open an edit form
                        // For simplicity, we're not implementing this
                      }}
                      onDelete={() => handleDeleteNote(note)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Contract tab */}
          {activeTab === 'contract' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Contrato</h3>
              
              {contract ? (
                <div className="bg-white rounded-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <FileCheck size={20} className="text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Contrato #{contract.contrato_id}</div>
                        <div className="text-sm text-gray-500">
                          Creado el {new Date(contract.fecha_creacion).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={contract.estado} />
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <a
                      href={contract.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-primary text-white rounded-md text-sm font-medium"
                    >
                      <FileText size={16} className="mr-1.5" />
                      Ver contrato
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay contrato</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Aún no has creado un contrato para este proyecto.
                  </p>
                  <div className="mt-6">
                    <Link
                      to={`/dashboardpage/proyectos/${id}/contrato/nuevo`}
                      className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                    >
                      <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
                      Crear contrato
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;