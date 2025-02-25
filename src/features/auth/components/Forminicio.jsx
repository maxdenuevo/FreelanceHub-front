import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Forminicio = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      localStorage.setItem('usuario_id', '123'); // For demo purposes
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
        variant: "success",
      });
      
      navigate('/dashboardpage');
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales incorrectas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/ingresarcorreo')}
            className="text-sm text-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Iniciar sesión'}
        </button>
      </form>
      
      <p className="mt-4 text-center">
        ¿No tienes una cuenta?{' '}
        <button 
          onClick={() => navigate('/registro')}
          className="text-primary hover:underline"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
};

export default Forminicio; 