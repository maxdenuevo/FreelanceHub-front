import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectsApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // For now, we'll use mock data
        // In a real app, we would use: const data = await projectsApi.getAll();
        setProjects([
          { 
            id: 1, 
            name: 'Diseño de Sitio Web', 
            client: 'Empresa XYZ', 
            status: 'En progreso', 
            dueDate: '2023-12-15',
            amount: 1200000,
            description: 'Diseño y desarrollo de sitio web corporativo con sistema de gestión de contenidos.'
          },
          { 
            id: 2, 
            name: 'Aplicación Móvil', 
            client: 'Startup ABC', 
            status: 'Completado', 
            dueDate: '2023-11-30',
            amount: 2500000,
            description: 'Desarrollo de aplicación móvil para Android y iOS con sistema de reservas y notificaciones.'
          },
          { 
            id: 3, 
            name: 'Campaña de Marketing', 
            client: 'Cliente Personal', 
            status: 'En progreso', 
            dueDate: '2023-12-20',
            amount: 800000,
            description: 'Diseño e implementación de campaña de marketing digital para lanzamiento de producto.'
          },
          { 
            id: 4, 
            name: 'Sistema de Facturación', 
            client: 'Comercial DEF', 
            status: 'Pendiente', 
            dueDate: '2024-01-15',
            amount: 1800000,
            description: 'Desarrollo de sistema de facturación electrónica integrado con plataforma de pagos.'
          },
          { 
            id: 5, 
            name: 'Rediseño de Marca', 
            client: 'Empresa GHI', 
            status: 'Completado', 
            dueDate: '2023-10-30',
            amount: 950000,
            description: 'Rediseño de identidad corporativa incluyendo logo, paleta de colores y aplicaciones.'
          }
        ]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los proyectos');
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los proyectos',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [toast]);
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'En progreso':
        return 'bg-blue-100 text-blue-800';
      case 'Completado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <Skeleton className="h-12 w-full" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full mt-1" />
          ))}
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <p className="font-medium">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-2"
            variant="outline"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Button onClick={() => navigate('/nuevocliente/nuevoproyecto')}>
          Nuevo Proyecto
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No hay proyectos para mostrar</p>
            <Button onClick={() => navigate('/nuevocliente/nuevoproyecto')}>
              Crear tu primer proyecto
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Proyecto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Entrega
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr 
                    key={project.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/dashboardpage/proyectos/${project.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {project.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {project.description.length > 50 
                          ? `${project.description.substring(0, 50)}...` 
                          : project.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{project.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(project.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${project.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 