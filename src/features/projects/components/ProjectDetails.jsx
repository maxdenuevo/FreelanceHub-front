// src/features/projects/components/ProjectDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mock data - would be replaced with API call
    setTimeout(() => {
      setProject({
        id,
        name: 'Diseño de Sitio Web',
        client: 'Empresa XYZ',
        status: 'En progreso',
        startDate: '2023-10-15',
        dueDate: '2023-12-15',
        budget: 1200000,
        description: 'Diseño y desarrollo de sitio web corporativo con sistema de gestión de contenidos.',
        tasks: [
          { id: 1, name: 'Diseño de wireframes', completed: true, date: '2023-10-25' },
          { id: 2, name: 'Diseño de UI', completed: true, date: '2023-11-10' },
          { id: 3, name: 'Desarrollo Frontend', completed: false, date: '2023-11-30' },
          { id: 4, name: 'Desarrollo Backend', completed: false, date: '2023-12-10' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <p className="font-medium">Proyecto no encontrado</p>
          <button 
            onClick={() => navigate('/dashboardpage/proyectos')}
            className="mt-2 px-4 py-2 border rounded-md"
          >
            Volver a Proyectos
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-gray-500">Cliente: {project.client}</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'En progreso' 
              ? 'bg-blue-100 text-blue-800' 
              : project.status === 'Completado'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'overview' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Resumen
            </button>
            <button 
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'tasks' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Tareas
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Descripción</h3>
                <p className="text-gray-700">{project.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Presupuesto</h4>
                  <p className="text-lg">${project.budget.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha de Inicio</h4>
                  <p className="text-lg">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha de Entrega</h4>
                  <p className="text-lg">{new Date(project.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Tareas</h3>
                <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">
                  Nueva Tarea
                </button>
              </div>
              
              {project.tasks.length === 0 ? (
                <p className="text-gray-500">No hay tareas para este proyecto</p>
              ) : (
                <ul className="space-y-2">
                  {project.tasks.map(task => (
                    <li key={task.id} className="p-3 border rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          type="checkbox"
                          checked={task.completed}
                          readOnly
                          className="mr-3 h-5 w-5"
                        />
                        <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>
                          {task.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(task.date).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;