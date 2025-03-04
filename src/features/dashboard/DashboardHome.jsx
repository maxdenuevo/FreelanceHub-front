import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  Plus, 
  Wallet,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  AlertTriangle,
  FolderKanban
} from 'lucide-react';
import { ColorLogo } from '@/components/ui/logos/FreelanceLogo';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { cn } from '@/lib/utils';

// Componente de tarjeta de estadísticas para mostrar métricas clave
const StatCard = ({ title, value, icon, trend, description, bgColor = 'bg-white' }) => (
  <div className={`rounded-lg shadow-sm border border-gray-100 ${bgColor} p-6 transition-transform duration-200 hover:shadow-md hover:-translate-y-1`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h4 className="text-2xl font-bold text-gray-900 mt-1">{value}</h4>
      </div>
      <div className={`p-3 rounded-full ${
        bgColor === 'bg-white' ? 'bg-primary/10 text-primary' : 'bg-white/20 text-white'
      }`}>
        {icon}
      </div>
    </div>
    
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        {trend > 0 ? (
          <ArrowUpRight className="text-green-500 mr-1" size={16} />
        ) : (
          <ArrowDownRight className="text-red-500 mr-1" size={16} />
        )}
        <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
          {Math.abs(trend)}% 
        </span>
        <span className="text-gray-500 ml-1">{description}</span>
      </div>
    )}
  </div>
);

// Componente de tarjeta de proyecto
const ProjectCard = ({ project, onClick }) => {
  const getStatusBadge = (status) => {
    const statusClasses = {
      'En progreso': 'bg-blue-100 text-blue-800',
      'Completado': 'bg-green-100 text-green-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Cancelado': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800',
    };
    
    return statusClasses[status] || statusClasses.default;
  };

  return (
    <div 
      className="rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">{project.proyecto_nombre}</h3>
            <p className="text-sm text-gray-500 mt-1">Cliente: {project.cliente_nombre}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(project.estado)}`}>
            {project.estado}
          </span>
        </div>
        
        <div className="mt-4 text-sm">
          <p className="text-gray-600 line-clamp-2">{project.proyecto_descripcion}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(project.proyecto_termino).toLocaleDateString()}</span>
          </div>
          <div className="font-medium text-primary">
            ${project.proyecto_presupuesto.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de lista de tareas
const TaskItem = ({ task, onClick }) => (
  <div 
    className={`p-3 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 last:border-b-0`}
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className={`mr-4 flex-shrink-0 ${task.tarea_completada ? 'text-green-500' : 'text-gray-400'}`}>
        {task.tarea_completada ? (
          <CheckCircle2 size={20} />
        ) : (
          <Clock size={20} />
        )}
      </div>
      <div>
        <p className={`font-medium ${task.tarea_completada ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
          {task.tarea_nombre}
        </p>
        <p className="text-xs text-gray-500">
          Proyecto: {task.proyecto_nombre}
        </p>
      </div>
    </div>
    <div className="flex-shrink-0 text-xs font-medium">
      <span className={`px-2 py-1 rounded-full ${
        new Date(task.tarea_fecha) < new Date() && !task.tarea_completada
          ? 'bg-red-100 text-red-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {new Date(task.tarea_fecha).toLocaleDateString()}
      </span>
    </div>
  </div>
);

// Componente de pago reciente
const PaymentItem = ({ payment }) => (
  <div className="p-3 border-b border-gray-100 flex items-center justify-between last:border-b-0">
    <div className="flex items-center">
      <div className={`mr-4 flex-shrink-0 p-2 rounded-full ${
        payment.pago_completado ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
      }`}>
        <DollarSign size={16} />
      </div>
      <div>
        <p className="font-medium text-gray-700">${payment.pago_monto.toLocaleString()}</p>
        <p className="text-xs text-gray-500">
          {payment.proyecto_nombre} - {payment.cliente_nombre}
        </p>
      </div>
    </div>
    <div className="flex-shrink-0 text-xs font-medium">
      <span className={`px-2 py-1 rounded-full ${
        payment.pago_completado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {payment.pago_completado ? 'Pagado' : 'Pendiente'}
      </span>
    </div>
  </div>
);

// Componente principal del dashboard
const DashboardHome = () => {
  const [stats, setStats] = useState({
    proyectosActivos: 0,
    clientesActivos: 0,
    pagosRecibidos: 0,
    tareasPendientes: 0,
  });
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, we would fetch the actual data from our API
        // For now, we'll use placeholder data
        
        // Example: const projectsData = await api.projects.getAllByUser(user.id);
        
        // Mock data
        setTimeout(() => {
          setStats({
            proyectosActivos: 4,
            clientesActivos: 7,
            pagosRecibidos: 2500000,
            tareasPendientes: 12,
          });
          
          setProjects([
            {
              proyecto_id: 1,
              proyecto_nombre: 'Diseño de sitio web',
              cliente_nombre: 'Empresa ABC',
              estado: 'En progreso',
              proyecto_descripcion: 'Diseño y desarrollo de sitio web responsivo con CMS personalizado.',
              proyecto_termino: '2025-04-30',
              proyecto_presupuesto: 1500000,
            },
            {
              proyecto_id: 2,
              proyecto_nombre: 'Campaña de marketing digital',
              cliente_nombre: 'Startup XYZ',
              estado: 'Pendiente',
              proyecto_descripcion: 'Estrategia y ejecución de campaña de marketing digital para lanzamiento de producto.',
              proyecto_termino: '2025-05-15',
              proyecto_presupuesto: 800000,
            },
            {
              proyecto_id: 3,
              proyecto_nombre: 'Desarrollo de app móvil',
              cliente_nombre: 'Corporación 123',
              estado: 'En progreso',
              proyecto_descripcion: 'Desarrollo de aplicación móvil para iOS y Android con sistema de reservas.',
              proyecto_termino: '2025-06-20',
              proyecto_presupuesto: 3000000,
            },
          ]);
          
          setTasks([
            {
              tarea_id: 1,
              tarea_nombre: 'Diseñar wireframes',
              proyecto_nombre: 'Diseño de sitio web',
              tarea_completada: true,
              tarea_fecha: '2025-03-15',
            },
            {
              tarea_id: 2,
              tarea_nombre: 'Desarrollar landing page',
              proyecto_nombre: 'Diseño de sitio web',
              tarea_completada: false,
              tarea_fecha: '2025-03-25',
            },
            {
              tarea_id: 3,
              tarea_nombre: 'Crear contenido para redes sociales',
              proyecto_nombre: 'Campaña de marketing digital',
              tarea_completada: false,
              tarea_fecha: '2025-04-10',
            },
            {
              tarea_id: 4,
              tarea_nombre: 'Diseñar UI para app móvil',
              proyecto_nombre: 'Desarrollo de app móvil',
              tarea_completada: false,
              tarea_fecha: '2025-03-20',
            },
          ]);
          
          setPayments([
            {
              pago_id: 1,
              pago_monto: 500000,
              proyecto_nombre: 'Diseño de sitio web',
              cliente_nombre: 'Empresa ABC',
              pago_completado: true,
            },
            {
              pago_id: 2,
              pago_monto: 800000,
              proyecto_nombre: 'Desarrollo de app móvil',
              cliente_nombre: 'Corporación 123',
              pago_completado: false,
            },
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Error al cargar los datos del dashboard');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <ColorLogo size={64} />
          <div className="mt-6 text-gray-500">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
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
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          Bienvenido, {user?.nombre?.split(' ')[0] || 'Usuario'}
        </h1>
        <p className="mt-2 text-white/80">
          Aquí tienes un resumen de tus proyectos y actividades recientes
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Link
            to="/dashboardpage/proyectos/nuevo"
            className="inline-flex items-center px-4 py-2 bg-white text-primary rounded-md font-medium text-sm"
          >
            <Plus className="mr-2" size={16} />
            Nuevo Proyecto
          </Link>
          <Link
            to="/dashboardpage/clientes/nuevo"
            className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-md font-medium text-sm hover:bg-white/30"
          >
            <Users className="mr-2" size={16} />
            Nuevo Cliente
          </Link>
        </div>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Proyectos Activos" 
          value={stats.proyectosActivos} 
          icon={<FolderKanban size={24} />}
          trend={10}
          description="vs mes pasado"
        />
        <StatCard 
          title="Clientes" 
          value={stats.clientesActivos} 
          icon={<Users size={24} />}
          trend={5}
          description="vs mes pasado"
        />
        <StatCard 
          title="Pagos Recibidos" 
          value={`$${(stats.pagosRecibidos / 1000000).toFixed(1)}M`} 
          icon={<Wallet size={24} />}
          trend={-3}
          description="vs mes pasado"
          bgColor="bg-primary text-white"
        />
        <StatCard 
          title="Tareas Pendientes" 
          value={stats.tareasPendientes} 
          icon={<Layers size={24} />}
          trend={15}
          description="vs mes pasado"
        />
      </div>
      
      {/* Área de contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección de proyectos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Proyectos Recientes</h2>
                <Link 
                  to="/dashboardpage/proyectos"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {projects.length === 0 ? (
                <div className="p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay proyectos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Comienza creando tu primer proyecto.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/dashboardpage/proyectos/nuevo"
                      className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                    >
                      <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
                      Nuevo Proyecto
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {projects.map((project) => (
                    <ProjectCard 
                      key={project.proyecto_id} 
                      project={project} 
                      onClick={() => {/* Navigate to project */}}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Área de gráfico */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Ingresos Mensuales</h2>
              <div className="flex space-x-2">
                <select 
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                  defaultValue="year"
                >
                  <option value="year">Este Año</option>
                  <option value="6months">Últimos 6 Meses</option>
                  <option value="quarter">Este Trimestre</option>
                </select>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              {/* Placeholder para el gráfico */}
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Aquí se mostrará el gráfico de ingresos mensuales
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Paneles laterales */}
        <div className="space-y-6">
          {/* Sección de tareas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Tareas Pendientes</h2>
                <Link 
                  to="/dashboardpage/tareas"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Ver todas
                </Link>
              </div>
            </div>
            
            <div>
              {tasks.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No hay tareas pendientes</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {tasks.map((task) => (
                    <TaskItem 
                      key={task.tarea_id} 
                      task={task} 
                      onClick={() => {/* Task detail */}}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <Link
                to="/dashboardpage/tareas/nueva"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20"
              >
                <Plus className="mr-2" size={16} />
                Nueva Tarea
              </Link>
            </div>
          </div>
          
          {/* Sección de pagos */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Pagos Recientes</h2>
                <Link 
                  to="/dashboardpage/pagos"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            
            <div>
              {payments.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No hay pagos recientes</p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {payments.map((payment) => (
                    <PaymentItem key={payment.pago_id} payment={payment} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;