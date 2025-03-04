import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, KeyRound, RefreshCw } from 'lucide-react';
import { ColorLogo } from '@/components/ui/logos/FreelanceLogo';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = Array(6).fill(0).map(() => useRef(null));
  
  const { verifyResetCode, requestPasswordReset } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Obtener email del almacenamiento local
  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    if (!storedEmail) {
      // Si no se encuentra email, redirigir a la página de restablecimiento de contraseña
      navigate('/ingresarcorreo');
      return;
    }
    
    setEmail(storedEmail);
  }, [navigate]);

  // Contador para el botón de reenvío
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  // Manejar cambio de entrada
  const handleInputChange = (index, value) => {
    // Solo permitir un dígito
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    // Solo permitir números
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    // Actualizar el array de código
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input si se ingresa un valor
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Manejar tecla presionada
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Mover a la entrada anterior en Backspace cuando esté vacía
      inputRefs[index - 1].current.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Mover a la entrada anterior en Left Arrow
      inputRefs[index - 1].current.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      // Mover a la entrada siguiente en Right Arrow
      inputRefs[index + 1].current.focus();
    }
  };

  // Manejar evento de pegado
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (!pastedData || !/^\d+$/.test(pastedData)) {
      return;
    }
    
    const digits = pastedData.slice(0, 6).split('');
    const newCode = [...code];
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    
    setCode(newCode);
    
    // Enfocar en la siguiente entrada vacía o la última entrada
    const nextEmptyIndex = newCode.findIndex(val => !val);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs[nextEmptyIndex].current.focus();
    } else {
      inputRefs[5].current.focus();
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar si el código está completo
    if (code.some(digit => !digit)) {
      toast({
        title: "Código incompleto",
        description: "Por favor ingresa el código completo de 6 dígitos",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const fullCode = code.join('');
      const result = await verifyResetCode(email, fullCode);
      
      if (result.success) {
        toast({
          title: "Código verificado",
          description: "El código ha sido verificado correctamente",
          variant: "success",
        });
        
        // Almacenar código en el almacenamiento local para el paso de restablecimiento de contraseña
        localStorage.setItem('resetCode', fullCode);
        
        // Navegar a la página de restablecimiento de contraseña
        navigate('/cambiarcontraseña');
      } else {
        toast({
          title: "Código inválido",
          description: result.error || "El código ingresado no es válido o ha expirado",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al verificar el código",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar reenvío de código
  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(60); // Deshabilitar por 60 segundos
    
    try {
      const result = await requestPasswordReset(email);
      
      if (result.success) {
        toast({
          title: "Código reenviado",
          description: "Hemos enviado un nuevo código a tu correo electrónico",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo reenviar el código",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al reenviar el código",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ColorLogo size={64} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verificar código
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingresa el código de 6 dígitos enviado a
          <br />
          <span className="font-medium text-gray-900">{email || 'tu correo electrónico'}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <KeyRound className="h-12 w-12 text-primary" />
              </div>
              
              <div className="flex space-x-2 my-5">
                {code.map((digit, index) => (
                  <div key={index} className="w-10 sm:w-12">
                    <input
                      ref={inputRefs[index]}
                      type="text"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-full h-12 sm:h-14 text-center text-xl font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      maxLength={1}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verificando...
                  </>
                ) : (
                  <>
                    Verificar código
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
              
              <div className="flex justify-between">
                <Link
                  to="/ingresarcorreo"
                  className="flex items-center text-sm text-primary hover:text-primary/80"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Volver
                </Link>
                
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                  className="flex items-center text-sm text-primary hover:text-primary/80 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Reenviar código {countdown > 0 && `(${countdown}s)`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;