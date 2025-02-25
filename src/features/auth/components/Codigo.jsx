import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { RecoveryContext } from '@/App';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  KeyRound,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import logoWhite from '@/assets/logo-white.svg';

/**
 * Verification code entry component for password recovery
 */
const Codigo = () => {
  const { email, setCodigo, setCodigoVerificado } = useContext(RecoveryContext);
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if email is not set
  useEffect(() => {
    if (!email) {
      navigate('/ingresarcorreo');
    }
  }, [email, navigate]);
  
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    
    if (fullCode.length !== 4) {
      toast({
        title: "Error",
        description: "Por favor ingresa el código completo",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // API call would go here to verify code
      
      // Store code in context for next steps
      setCodigo(fullCode);
      setCodigoVerificado(true);
      
      toast({
        title: "Código verificado",
        description: "Código verificado correctamente",
        variant: "success",
      });
      
      navigate('/cambiarcontraseña');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Código incorrecto o expirado",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-2 text-center">Verificar Código</h1>
      <p className="text-center text-gray-600 mb-6">
        Ingresa el código de 4 dígitos enviado a {email}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl border rounded-md"
              required
            />
          ))}
        </div>
        
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Verificar Código'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">¿No recibiste el código?</p>
        <button 
          className="text-primary hover:underline"
          onClick={() => {
            toast({
              title: "Código reenviado",
              description: "Se ha enviado un nuevo código a tu correo electrónico",
            });
          }}
        >
          Reenviar código
        </button>
      </div>
      
      <p className="mt-4 text-center">
        <button 
          onClick={() => navigate('/ingresarcorreo')}
          className="text-primary hover:underline"
        >
          Volver
        </button>
      </p>
    </div>
  );
};

export default Codigo; 