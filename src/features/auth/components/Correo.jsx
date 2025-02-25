import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '@/App';
import { useToast } from '@/components/ui/use-toast';

const Correo = () => {
  const { setEmail } = useContext(RecoveryContext);
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // API call would go here to send recovery code
      
      // Store email in context for next steps
      setEmail(emailInput);
      
      toast({
        title: "Código enviado",
        description: "Se ha enviado un código de verificación a tu correo electrónico",
        variant: "success",
      });
      
      navigate('/validarcodigo');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error al enviar el código",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-2 text-center">Recuperar Contraseña</h1>
      <p className="text-center text-gray-600 mb-6">
        Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Código'}
        </button>
      </form>
      
      <p className="mt-4 text-center">
        <button 
          onClick={() => navigate('/login')}
          className="text-primary hover:underline"
        >
          Volver al Inicio de Sesión
        </button>
      </p>
    </div>
  );
};

export default Correo; 