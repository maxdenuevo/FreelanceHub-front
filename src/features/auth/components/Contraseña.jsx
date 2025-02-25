import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '@/App';
import { useToast } from '@/components/ui/use-toast';

const Contraseña = () => {
  const { email, codigo, codigoVerificado } = useContext(RecoveryContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if code is not verified
  if (!codigoVerificado) {
    navigate('/validarcodigo');
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }
    
    // Validate password strength
    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // API call would go here to reset password
      
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente. Por favor inicia sesión.",
        variant: "success",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error al actualizar tu contraseña.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-2 text-center">Cambiar Contraseña</h1>
      <p className="text-center text-gray-600 mb-6">Ingresa tu nueva contraseña para la cuenta {email}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  );
};

export default Contraseña; 