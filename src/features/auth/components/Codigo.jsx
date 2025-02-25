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
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the recovery context from App.jsx
  const { 
    email, 
    setEmail: setContextEmail, 
    setCodigo: setContextCodigo,
    setCodigoVerificado 
  } = useContext(RecoveryContext);
  
  // Check if email is set in context
  useEffect(() => {
    if (!email) {
      navigate('/ingresarcorreo');
    }
  }, [email, navigate]);
  
  // Resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCooldown]);
  
  const handleCodeChange = (e) => {
    // Only allow numbers, maximum 6 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
  };
  
  const handleBack = () => {
    navigate('/ingresarcorreo');
  };
  
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.requestPasswordReset(email);
      
      if (response.success) {
        toast({
          title: "Código reenviado",
          description: "Se ha enviado un nuevo código de verificación a tu correo.",
        });
        
        // Set cooldown for 60 seconds
        setResendCooldown(60);
      } else {
        setError(response.error || 'No se pudo reenviar el código');
      }
    } catch (error) {
      console.error('Error al reenviar código:', error);
      setError('Error al conectar con el servidor. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Por favor ingresa el código de 6 dígitos');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.verifyPasswordResetCode(email, verificationCode);
      
      if (response.success) {
        // Save code in context for next steps
        setContextCodigo(verificationCode);
        setCodigoVerificado(true);
        
        toast({
          title: "Código verificado",
          description: "Ahora puedes crear una nueva contraseña.",
        });
        
        navigate('/cambiarcontraseña');
      } else {
        setError(response.error || 'Código inválido o expirado');
      }
    } catch (error) {
      console.error('Error al verificar código:', error);
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
          <CardTitle className="text-2xl font-bold">Verificar código</CardTitle>
          <CardDescription>
            Ingresa el código de 6 dígitos enviado a {email}
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
              <Label htmlFor="verificationCode">Código de verificación</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="verificationCode"
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  className="pl-10 text-center text-lg tracking-widest"
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Revisa tu correo electrónico para encontrar el código de 6 dígitos.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  Verificar código
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || isLoading}
              className="text-sm"
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              {resendCooldown > 0 
                ? `Reenviar código (${resendCooldown}s)` 
                : 'Reenviar código'}
            </Button>
          </div>
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

export default Codigo; 