import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Formregistro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rut: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call would go here
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente.",
        variant: "success",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ha ocurrido un error durante el registro.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Crear una cuenta</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">RUT</label>
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Registrarse'}
        </button>
      </form>
      
      <p className="mt-4 text-center">
        ¿Ya tienes una cuenta?{' '}
        <button 
          onClick={() => navigate('/login')}
          className="text-primary hover:underline"
        >
          Iniciar sesión
        </button>
      </p>
    </div>
  );
};

export default Formregistro; 