import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Mail, CreditCard, Key, Shield } from 'lucide-react'
import { Card, Input, Button, Alert, Spinner, Badge, Avatar } from './ui'
import { toast } from './ui/Toast'

/**
 * Perfilusuario v2.0 - Modern user profile page
 */
function PerfilusuarioV2() {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsuario()
  }, [])

  const fetchUsuario = async () => {
    const userId = localStorage.getItem('usuario_id')

    if (!userId) {
      setError('No se encontró el ID de usuario')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://api-freelancehub.vercel.app/get-usuario/${userId}`
      )

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario.')
      }

      const data = await response.json()
      setUsuario(data.usuario)
      setError('')
    } catch (error) {
      console.error('Error al obtener el usuario:', error)
      setError('No se pudo obtener la información del usuario.')
      toast.error('Error al cargar perfil')
    } finally {
      setLoading(false)
    }
  }

  const irACambiarContraseña = () => {
    navigate('/ingresarcorreo')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark p-6 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="text-gray-400 mt-4">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="min-h-screen bg-primary-dark p-6 flex items-center justify-center">
        <Alert variant="error">No se pudo cargar la información del perfil</Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <User className="text-primary-lime" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
            <p className="text-gray-400 mt-1">
              Gestiona tu información personal y configuración
            </p>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Profile Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Image & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="relative mb-4">
                  <img
                    src={Perfil}
                    alt="Perfil"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-lime/20"
                  />
                  <div className="absolute -bottom-2 -right-2">
                    <Badge variant="success" className="text-xs">
                      Activo
                    </Badge>
                  </div>
                </div>

                {/* User Name */}
                <h2 className="text-2xl font-bold text-white mb-1">
                  {usuario.usuario_nombre}
                </h2>
                <p className="text-gray-400 text-sm mb-6">Freelancer</p>

                {/* Quick Info */}
                <div className="w-full space-y-3 pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-primary-blue flex-shrink-0" />
                    <span className="text-gray-400 truncate">{usuario.usuario_email}</span>
                  </div>
                  {usuario.usuario_rut && (
                    <div className="flex items-center gap-3 text-sm">
                      <CreditCard size={16} className="text-primary-yellow flex-shrink-0" />
                      <span className="text-gray-400">{usuario.usuario_rut}</span>
                    </div>
                  )}
                </div>

                {/* Change Password Button */}
                <Button
                  variant="secondary"
                  className="w-full mt-6"
                  leftIcon={<Key size={18} />}
                  onClick={irACambiarContraseña}
                >
                  Cambiar Contraseña
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Detailed Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="text-primary-lime" size={24} />
                <h3 className="text-xl font-semibold text-white">Información Personal</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Nombre Completo"
                  value={usuario.usuario_nombre || ''}
                  leftIcon={<User size={18} />}
                  readOnly
                />

                <Input
                  label="RUT"
                  value={usuario.usuario_rut || 'No especificado'}
                  leftIcon={<CreditCard size={18} />}
                  readOnly
                />

                <Input
                  label="Correo Electrónico"
                  type="email"
                  value={usuario.usuario_email || ''}
                  leftIcon={<Mail size={18} />}
                  readOnly
                  className="md:col-span-2"
                />
              </div>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-start gap-3">
                  <Shield className="text-primary-blue flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-200 mb-1">
                      Información de Solo Lectura
                    </p>
                    <p className="text-xs text-gray-400">
                      Estos campos no son editables desde esta vista. Si necesitas actualizar tu
                      información, contacta a soporte.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="text-primary-blue" size={24} />
                <h3 className="text-xl font-semibold text-white">Seguridad</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Key className="text-primary-yellow" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-200">Contraseña</p>
                        <p className="text-xs text-gray-400">
                          Última actualización: Hace tiempo
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={irACambiarContraseña}
                    >
                      Cambiar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Mantén tu cuenta segura actualizando tu contraseña regularmente
                  </p>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="text-success" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-200">Cuenta Verificada</p>
                      <p className="text-xs text-gray-400">
                        Tu cuenta ha sido verificada exitosamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Stats (Optional - for future enhancement) */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Estadísticas de Cuenta</h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-yellow mb-1">-</p>
                  <p className="text-xs text-gray-400">Proyectos</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-blue mb-1">-</p>
                  <p className="text-xs text-gray-400">Clientes</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-lime mb-1">-</p>
                  <p className="text-xs text-gray-400">Contratos</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                Las estadísticas se actualizarán próximamente
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PerfilusuarioV2
