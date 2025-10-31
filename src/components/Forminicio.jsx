import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Input, Button, Alert, Spinner } from './ui';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

/**
 * Forminicio v2.0 - Login form con nueva arquitectura
 * Usa useAuth hook y servicios centralizados
 */

function Formularioinicio() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const irACorreo = (e) => {
    e.preventDefault();
    navigate('/ingresarcorreo');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">¡Qué bueno verte de nuevo!</h2>
            <p className="text-gray-600 mt-2">Ingresa a tu espacio y continúa donde lo dejaste</p>
          </div>

          {/* Success message from navigation */}
          {location.state?.message && (
            <Alert variant="success" className="mb-4">
              {location.state.message}
            </Alert>
          )}

          {/* Error message */}
          {error && (
            <Alert variant="error" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              helperText="Tu privacidad es importante para nosotros."
            />

            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              icon={<Lock className="w-5 h-5 text-gray-400" />}
            />

            {/* Forgot password link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={irACorreo}
                className="text-sm text-[#003598] hover:text-[#002570] font-medium transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" />
                  Ingresando...
                </span>
              ) : (
                'Ingresar'
              )}
            </Button>
          </form>

          {/* Register link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Primera vez por aquí?{' '}
              <button
                onClick={() => navigate('/registro')}
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Únete a FreelanceHub
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Formularioinicio;
