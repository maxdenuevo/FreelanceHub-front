import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../../../App';
import { toast } from '@/components/ui/use-toast';

const Correo = () => {
  const navigate = useNavigate();
  const { setEmail } = useContext(RecoveryContext);
  const [inputEmail, setInputEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputEmail.trim()) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
      setError('El correo electrónico no es válido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call - replace with your actual API
      setTimeout(() => {
        // Set the email in context to use in the next steps
        setEmail(inputEmail);
        
        toast({
          title: "Código enviado",
          description: "Hemos enviado un código de verificación a tu correo electrónico.",
          variant: "success",
        });
        
        navigate('/validarcodigo');
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el código. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h1>
        <p className="text-gray-600 mt-2">
          Ingresa tu correo electrónico y te enviaremos un código de verificación
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={inputEmail}
            onChange={(e) => {
              setInputEmail(e.target.value);
              setError('');
            }}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
              error ? 'border-red-500' : ''
            }`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Enviando...' : 'Enviar Código'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          ¿Recordaste tu contraseña?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="font-medium text-primary hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default Correo; 