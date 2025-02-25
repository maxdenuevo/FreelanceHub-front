import React, { useState, useContext, useEffect } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { 
  Loader2, 
  Lock,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import logoWhite from '@/assets/logo-white.svg';

/**
 * Password reset component for password recovery
 */
const Contraseña = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the recovery context from App.jsx
  const { 
    email, 
    codigo,
    codigoVerificado 
  } = useContext(RecoveryContext);
  
  // Check if code is verified in context
  useEffect(() => {
    if (!email || !codigo || !codigoVerificado) {
      navigate('/ingresarcorreo');
    }
  }, [email, codigo, codigoVerificado, navigate]);
  
  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (formData.password.length >= 8) strength += 25;
    
    // Contains lowercase
    if (/[a-z]/.test(formData.password)) strength += 25;
    
    // Contains uppercase
    if (/[A-Z]/.test(formData.password)) strength += 25;
    
    // Contains number or special char
    if (/[0-9!@#$%^&*]/.test(formData.password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [formData.password]);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const handleBack = () => {
    navigate('/validarcodigo');
  };
  
  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 25) return 'Débil';
    if (passwordStrength <= 50) return 'Regular';
    if (passwordStrength <= 75) return 'Buena';
    return 'Fuerte';
  };
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-yellow-500';
    if (passwordStrength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordStrength < 50) {
      setError('Por favor crea una contraseña más segura');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.resetPassword(email, codigo, formData.password);
      
      if (response.success) {
        toast({
          title: "¡Contraseña actualizada!",
          description: "Tu contraseña ha sido actualizada correctamente.",
        });
        
        // Redirect to login page
        navigate('/login', { 
          state: { message: 'Contraseña actualizada correctamente. Por favor inicia sesión.' } 
        });
      } else {
        setError(response.error || 'No se pudo actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      setError('Error al conectar con el servidor. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary p-3 rounded-full">
              <img 
                src={logoWhite} 
                alt="FreelanceHub Logo" 
                className="h-10 w-auto" 
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Nueva contraseña</CardTitle>
          <CardDescription>
            Crea una nueva contraseña segura para tu cuenta
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nueva contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span>Seguridad:</span>
                    <span className="font-medium">{getPasswordStrengthLabel()}</span>
                  </div>
                  <Progress value={passwordStrength} className={getPasswordStrengthColor()} />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Cambiar contraseña
                </>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Contraseña; 