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
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    totalEarnings: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Mock data - would be replaced with actual API calls
        setStats({
          totalProjects: 12,
          activeProjects: 5,
          completedProjects: 7,
          totalClients: 8,
          totalEarnings: 4500000,
        });
        
        setRecentProjects([
          { id: 1, name: 'Diseño de Página Web', client: 'Empresa XYZ', status: 'En progreso', dueDate: '2023-12-15' },
          { id: 2, name: 'Aplicación Móvil', client: 'Startup ABC', status: 'Completado', dueDate: '2023-11-30' },
          { id: 3, name: 'Campaña de Marketing', client: 'Cliente Personal', status: 'En progreso', dueDate: '2023-12-20' },
        ]);
        
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del dashboard');
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos del dashboard",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

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
  if (loading) {
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
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Proyectos Totales</h3>
          <p className="text-2xl font-bold">{stats.totalProjects}</p>
          <div className="flex mt-2">
            <div className="mr-4">
              <span className="text-sm text-gray-500">Activos: </span>
              <span className="font-medium">{stats.activeProjects}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Completados: </span>
              <span className="font-medium">{stats.completedProjects}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Clientes</h3>
          <p className="text-2xl font-bold">{stats.totalClients}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Ingresos Totales</h3>
          <p className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Proyectos Recientes</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Nombre del Proyecto</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Cliente</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Fecha de Entrega</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project) => (
                <tr 
                  key={project.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/dashboardpage/proyectos/${project.id}`)}
                >
                  <td className="px-4 py-2">{project.name}</td>
                  <td className="px-4 py-2">{project.client}</td>
                  <td className="px-4 py-2">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'En progreso' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(project.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/nuevocliente')}
          className="bg-primary text-white p-4 rounded-lg flex items-center justify-between"
        >
          <span>Nuevo Cliente</span>
          <span>→</span>
        </button>
        
        <button 
          onClick={() => navigate('/nuevocliente/nuevoproyecto')}
          className="bg-secondary text-white p-4 rounded-lg flex items-center justify-between"
        >
          <span>Nuevo Proyecto</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 