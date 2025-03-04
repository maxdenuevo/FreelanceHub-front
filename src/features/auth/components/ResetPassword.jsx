import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Check, AlertCircle } from 'lucide-react';
import { ColorLogo } from '@/components/ui/logos/FreelanceLogo';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Obtener email y código del almacenamiento local
  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    const storedCode = localStorage.getItem('resetCode');
    
    if (!storedEmail || !storedCode) {
      // Si falta información, redirigir a la página de restablecimiento de contraseña
      toast({
        title: "Información incompleta",
        description: "Por favor, comience el proceso de recuperación nuevamente",
        variant: "destructive",
      });
      navigate('/ingresarcorreo');
      return;
    }
    
    setEmail(storedEmail);
    setCode(storedCode);
  }, [navigate, toast]);

  // Indicadores de fortaleza de contraseña
  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordStrengthScore = Object.values(passwordStrength).filter(Boolean).length;

  const getPasswordStrengthColor = () => {
    if (passwordStrengthScore <= 2) return 'bg-red-500';
    if (passwordStrengthScore <= 3) return 'bg-yellow-500';
    if (passwordStrengthScore <= 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!password) {
      errors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (passwordStrengthScore < 3) {
      errors.password = 'La contraseña es demasiado débil';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await resetPassword(email, code, password);
      
      if (result.success) {
        toast({
          title: "Contraseña restablecida",
          description: "Tu contraseña ha sido restablecida correctamente",
          variant: "success",
        });
        
        // Limpiar datos de restablecimiento del almacenamiento local
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetCode');
        
        // Navegar a la página de inicio de sesión
        navigate('/login');
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo restablecer la contraseña",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al restablecer la contraseña",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ColorLogo size={64} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crea una nueva contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Establece una contraseña segura para tu cuenta
          <br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nueva contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationErrors.password) {
                      setValidationErrors({ ...validationErrors, password: undefined });
                    }
                  }}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    validationErrors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff size={16} aria-hidden="true" />
                    ) : (
                      <Eye size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              {validationErrors.password && (
                <p className="mt-2 text-sm text-red-600">{validationErrors.password}</p>
              )}
              
              {/* Medidor de fortaleza de contraseña */}
              <div className="mt-2">
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPasswordStrengthColor()}`} 
                    style={{ width: `${(passwordStrengthScore / 5) * 100}%` }}
                  ></div>
                </div>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <li className={`flex items-center ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check size={16} className={`mr-2 ${passwordStrength.length ? 'text-green-600' : 'text-gray-300'}`} />
                    Al menos 8 caracteres
                  </li>
                  <li className={`flex items-center ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check size={16} className={`mr-2 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-300'}`} />
                    Letra mayúscula
                  </li>
                  <li className={`flex items-center ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check size={16} className={`mr-2 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-300'}`} />
                    Letra minúscula
                  </li>
                  <li className={`flex items-center ${passwordStrength.number ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check size={16} className={`mr-2 ${passwordStrength.number ? 'text-green-600' : 'text-gray-300'}`} />
                    Número
                  </li>
                  <li className={`flex items-center ${passwordStrength.special ? 'text-green-600' : 'text-gray-500'}`}>
                    <Check size={16} className={`mr-2 ${passwordStrength.special ? 'text-green-600' : 'text-gray-300'}`} />
                    Carácter especial
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (validationErrors.confirmPassword) {
                      setValidationErrors({ ...validationErrors, confirmPassword: undefined });
                    }
                  }}
                  className={`block w-full pl-10 pr-10 py-2 border ${
                    validationErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} aria-hidden="true" />
                    ) : (
                      <Eye size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>

            <div>
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
                    Procesando...
                  </>
                ) : (
                  'Restablecer contraseña'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;