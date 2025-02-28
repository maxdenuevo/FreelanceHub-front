import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Formnuevoproyecto = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectBudget: '',
    projectStartDate: '',
    projectEndDate: '',
    projectType: ''
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const clienteId = location.state?.clienteId;
  
  useEffect(() => {
    if (!clienteId) {
      navigate('/nuevocliente');
    }
  }, [clienteId, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    // Would include API call here
    alert('Proyecto creado con éxito');
    navigate('/dashboardpage/proyectos');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-2xl mx-auto shadow-md p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Nuevo Proyecto</h1>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="projectName" className="block text-sm font-medium">Nombre del Proyecto *</label>
            <input
              id="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="Nombre del proyecto"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="projectDescription" className="block text-sm font-medium">Descripción *</label>
            <textarea
              id="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              placeholder="Descripción del proyecto"
              className="w-full p-2 border rounded-md h-24"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="projectBudget" className="block text-sm font-medium">Presupuesto *</label>
              <input
                id="projectBudget"
                type="number"
                value={formData.projectBudget}
                onChange={handleInputChange}
                placeholder="Monto en $"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="projectType" className="block text-sm font-medium">Tipo de Proyecto *</label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Diseño Web">Diseño Web</option>
                <option value="Desarrollo Móvil">Desarrollo Móvil</option>
                <option value="Marketing Digital">Marketing Digital</option>
                <option value="Consultoría">Consultoría</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="projectStartDate" className="block text-sm font-medium">Fecha de Inicio *</label>
              <input
                id="projectStartDate"
                type="date"
                value={formData.projectStartDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="projectEndDate" className="block text-sm font-medium">Fecha de Término *</label>
              <input
                id="projectEndDate"
                type="date"
                value={formData.projectEndDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 border rounded-md"
          >
            Atrás
          </button>
          
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Crear Proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formnuevoproyecto;