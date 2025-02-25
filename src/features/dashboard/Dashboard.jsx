import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectsApi, clientsApi, tasksApi, paymentsApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  UserPlus,
  FileText,
  PlusCircle,
  Clock,
  CheckCircle,
  DollarSign,
  BarChart3,
  Kanban,
  CalendarClock,
  Loader2,
  AlertTriangle,
  FileSignature
} from 'lucide-react';

/**
 * Dashboard Home Component
 * Displays overview statistics, recent projects, and quick action buttons
 */
const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    tasks: 0,
    income: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // For demo purposes, using mock data
        // In a real app, these would be API calls
        setTimeout(() => {
          setStats({
            projects: 5,
            clients: 3,
            tasks: 12,
            income: 2500
          });
          
          setRecentProjects([
            { id: 1, name: 'Website Redesign', client: 'ABC Corp', dueDate: '2023-06-30', status: 'In Progress' },
            { id: 2, name: 'Mobile App Development', client: 'XYZ Ltd', dueDate: '2023-07-15', status: 'Planning' },
            { id: 3, name: 'SEO Optimization', client: 'Local Business', dueDate: '2023-06-10', status: 'Completed' }
          ]);
          
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Error al cargar los datos del dashboard');
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los datos del dashboard",
        });
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format currency (CLP)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate task completion percentage
  const calculateTaskCompletion = (completed, pending) => {
    const total = completed + pending;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // Quick action handlers
  const handleNewProject = () => navigate('/nuevocliente/nuevoproyecto');
  const handleNewClient = () => navigate('/nuevocliente');
  const handleViewProjects = () => navigate('/dashboardpage/proyectos');

  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
          
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Proyectos Activos</h3>
          <p className="text-3xl font-bold">{stats.projects}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Clientes</h3>
          <p className="text-3xl font-bold">{stats.clients}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Tareas Pendientes</h3>
          <p className="text-3xl font-bold">{stats.tasks}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Ingresos del Mes</h3>
          <p className="text-3xl font-bold">${stats.income}</p>
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Proyectos Recientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Límite</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => window.location.href = '/nuevocliente'} 
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Nuevo Cliente
          </button>
          <button 
            onClick={() => window.location.href = '/nuevocliente/nuevoproyecto'} 
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Nuevo Proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 