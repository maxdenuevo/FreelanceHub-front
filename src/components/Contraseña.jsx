import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Check, AlertTriangle, Loader2 } from 'lucide-react';

const Contraseña = () => {
  const { email, codigoVerificado } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nuevaContrasena: '',
    confirmarContrasena: ''
  });

  const [formState, setFormState] = useState({
    error: '',
    success: '',
    passwordValidation: {
      message: '',
      isValid: false
    }
  });

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = password.length >= minLength && hasUppercase && hasSymbol;

    return {
      isValid,
      message: isValid
        ? "La contraseña es válida"
        : "La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo"
    };
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'nuevaContrasena') {
      const validation = validatePassword(value);
      setFormState(prev => ({
        ...prev,
        passwordValidation: validation
      }));
    }
  };

  const handleSubmit = async () => {
    setFormState(prev => ({ ...prev, error: '', success: '' }));
    setIsLoading(true);

    if (!codigoVerificado) {
      setFormState(prev => ({ ...prev, error: 'No has verificado el código correctamente.' }));
      setIsLoading(false);
      return;
    }

    if (formData.nuevaContrasena !== formData.confirmarContrasena) {
      setFormState(prev => ({ ...prev, error: 'Las contraseñas no coinciden.' }));
      setIsLoading(false);
      return;
    }

    if (!email || !codigoVerificado || !formData.nuevaContrasena) {
      setFormState(prev => ({ 
        ...prev, 
        error: 'Email, código de verificación y nueva contraseña son requeridos.' 
      }));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api-freelancehub.vercel.app/usuarios/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_email: email,
          otp: codigoVerificado.toString(),
          new_password: formData.nuevaContrasena,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cambiar la contraseña');
      }

      setFormState(prev => ({ ...prev, success: 'Contraseña cambiada con éxito' }));
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setFormState(prev => ({ 
        ...prev, 
        error: `Hubo un problema al cambiar la contraseña. ${error.message}` 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
          <Lock className="h-6 w-6" />
          Cambiar Contraseña
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {formState.error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{formState.error}</AlertDescription>
          </Alert>
        )}
        
        {formState.success && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4" />
            <AlertDescription>{formState.success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nuevaContrasena">Nueva Contraseña</Label>
            <Input
              id="nuevaContrasena"
              type="password"
              value={formData.nuevaContrasena}
              onChange={handleInputChange('nuevaContrasena')}
              placeholder="Ingresa tu nueva contraseña"
              className="w-full"
            />
            <p className={`text-sm ${
              formState.passwordValidation.isValid 
                ? 'text-green-600' 
                : 'text-red-500'
            }`}>
              {formState.passwordValidation.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarContrasena">Confirmar Contraseña</Label>
            <Input
              id="confirmarContrasena"
              type="password"
              value={formData.confirmarContrasena}
              onChange={handleInputChange('confirmarContrasena')}
              placeholder="Confirma tu nueva contraseña"
              className="w-full"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Lock className="h-4 w-4 mr-2" />
            )}
            {isLoading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contraseña;