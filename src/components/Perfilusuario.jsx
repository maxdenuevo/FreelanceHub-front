import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Lock, Loader2 } from 'lucide-react';

const Perfilusuario = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userId = localStorage.getItem('usuario_id');
    if (!userId) {
      setError('No se encontró ID de usuario');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api-freelancehub.vercel.app/get-usuario/${userId}`);
      if (!response.ok) throw new Error('Error al obtener los datos del usuario');
      
      const data = await response.json();
      setUserData(data.usuario);
      setError('');
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('No se pudo obtener la información del usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = () => {
    navigate('/ingresarcorreo');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-16 w-16 text-gray-400" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight">
                {userData?.usuario_nombre || 'Usuario'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Perfil de Usuario
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={userData?.usuario_email || ''}
                readOnly
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rut">RUT</Label>
              <Input
                id="rut"
                type="text"
                value={userData?.usuario_rut || ''}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-6">
          <Button
            onClick={handleChangePassword}
            className="w-full sm:w-auto"
          >
            <Lock className="h-4 w-4 mr-2" />
            Cambiar contraseña
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Perfilusuario;