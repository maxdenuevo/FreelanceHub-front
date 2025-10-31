import { useState } from 'react'
import { Mail, User, Lock, Search, Heart, Star, Trash2, Settings, FileText, Bookmark } from 'lucide-react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Textarea,
  Badge,
  Avatar,
  AvatarGroup,
  Spinner,
  LoadingOverlay,
  Modal,
  ConfirmModal,
  Tooltip,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Alert,
  Toaster,
  toast,
  Tabs,
  Accordion,
} from '../components/ui'

/**
 * Component Showcase Page
 * Demuestra todos los componentes UI creados
 */
function ComponentShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const handleConfirm = () => {
    console.log('Confirmado!')
  }

  const handleLoadingTest = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

  const selectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ]

  const radioOptions = [
    { value: 'option1', label: 'Opción 1', description: 'Descripción de la opción 1' },
    { value: 'option2', label: 'Opción 2', description: 'Descripción de la opción 2' },
    { value: 'option3', label: 'Opción 3', description: 'Descripción de la opción 3' },
  ]

  const tabs = [
    {
      id: 'tab1',
      label: 'General',
      icon: <Settings size={16} />,
      content: (
        <div>
          <h3 className="font-bold mb-2">Configuración General</h3>
          <p className="text-gray-400">Contenido de la pestaña General</p>
        </div>
      ),
    },
    {
      id: 'tab2',
      label: 'Documentos',
      icon: <FileText size={16} />,
      content: (
        <div>
          <h3 className="font-bold mb-2">Mis Documentos</h3>
          <p className="text-gray-400">Contenido de la pestaña Documentos</p>
        </div>
      ),
    },
    {
      id: 'tab3',
      label: 'Favoritos',
      icon: <Bookmark size={16} />,
      content: (
        <div>
          <h3 className="font-bold mb-2">Elementos Favoritos</h3>
          <p className="text-gray-400">Contenido de la pestaña Favoritos</p>
        </div>
      ),
    },
  ]

  const accordionItems = [
    {
      id: '1',
      title: '¿Qué es FreelanceHub?',
      content: 'FreelanceHub es una plataforma completa para gestionar tus proyectos freelance, clientes, tareas y pagos en un solo lugar.',
    },
    {
      id: '2',
      title: '¿Cómo empiezo?',
      content: 'Simplemente crea una cuenta, agrega tus clientes y proyectos, y comienza a organizar tu trabajo.',
    },
    {
      id: '3',
      title: '¿Es gratis?',
      content: 'Ofrecemos un plan gratuito con funcionalidades básicas y planes premium con características avanzadas.',
    },
  ]

  return (
    <div className="min-h-screen bg-primary-dark p-8">
      {/* Toaster Provider */}
      <Toaster />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            FreelanceHub v2.0
          </h1>
          <p className="text-gray-400 text-lg">
            Sistema de Componentes UI Completo
          </p>
          <div className="mt-6">
            <Badge variant="success">17 Componentes Base</Badge>
            <Badge variant="info" className="ml-2">7 Componentes Avanzados</Badge>
          </div>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Diferentes variantes, tamaños y estados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Variants */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Variantes:</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Tamaños:</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Con iconos:</p>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={<Mail size={18} />}>Enviar Email</Button>
                  <Button rightIcon={<Star size={18} />} variant="secondary">
                    Favorito
                  </Button>
                  <Button leftIcon={<Trash2 size={18} />} variant="danger">
                    Eliminar
                  </Button>
                </div>
              </div>

              {/* States */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Estados:</p>
                <div className="flex flex-wrap gap-3">
                  <Button loading>Cargando...</Button>
                  <Button disabled>Deshabilitado</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Select/Dropdown */}
        <Card>
          <CardHeader>
            <CardTitle>Select / Dropdown</CardTitle>
            <CardDescription>
              Selects con búsqueda y validación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Select
                label="Framework"
                options={selectOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Selecciona un framework"
              />

              <Select
                label="Búsqueda"
                options={selectOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                searchable
                placeholder="Buscar framework..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Checkbox, Radio, Switch */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>
              Checkbox, Radio buttons y Switches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Checkbox */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Checkboxes:</p>
                <div className="space-y-2">
                  <Checkbox
                    label="Acepto los términos y condiciones"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <Checkbox
                    label="Notificaciones por email"
                    description="Recibir actualizaciones sobre mis proyectos"
                  />
                  <Checkbox
                    label="Deshabilitado"
                    disabled
                  />
                </div>
              </div>

              {/* Radio */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Radio Buttons:</p>
                <RadioGroup
                  label="Selecciona una opción"
                  options={radioOptions}
                  value={radioValue}
                  onChange={setRadioValue}
                  name="example-radio"
                />
              </div>

              {/* Switch */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Switches:</p>
                <div className="space-y-3">
                  <Switch
                    label="Activar dark mode"
                    checked={isSwitchOn}
                    onChange={(e) => setIsSwitchOn(e.target.checked)}
                  />
                  <Switch
                    label="Notificaciones push"
                    description="Recibir notificaciones en tiempo real"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Toasts</CardTitle>
            <CardDescription>
              Notificaciones inline y toast
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-3">Alerts inline:</p>
                <div className="space-y-3">
                  <Alert
                    variant="success"
                    title="Éxito"
                    message="Tu proyecto se guardó correctamente"
                  />
                  <Alert
                    variant="warning"
                    title="Advertencia"
                    message="Tienes tareas próximas a vencer"
                  />
                  <Alert
                    variant="error"
                    title="Error"
                    message="No se pudo conectar con el servidor"
                    dismissible
                  />
                  <Alert
                    variant="info"
                    message="Actualización disponible para FreelanceHub"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-3">Toast notifications:</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => toast.success('Guardado exitosamente')}>
                    Success Toast
                  </Button>
                  <Button size="sm" onClick={() => toast.error('Error al guardar')}>
                    Error Toast
                  </Button>
                  <Button size="sm" onClick={() => toast.warning('Advertencia')}>
                    Warning Toast
                  </Button>
                  <Button size="sm" onClick={() => toast.info('Información')}>
                    Info Toast
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => toast.promise(
                      new Promise((resolve) => setTimeout(resolve, 2000)),
                      {
                        loading: 'Guardando...',
                        success: 'Guardado!',
                        error: 'Error',
                      }
                    )}
                  >
                    Promise Toast
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>
              Navegación por pestañas con animaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-3">Style: Line</p>
                <Tabs tabs={tabs} variant="line" />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-3">Style: Pills</p>
                <Tabs tabs={tabs} variant="pills" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>
              Contenido colapsable con animaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-3">Single (solo uno abierto):</p>
                <Accordion items={accordionItems} />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-3">Multiple (varios abiertos):</p>
                <Accordion items={accordionItems} allowMultiple defaultOpen={['1']} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>
              Contenedores flexibles con efectos hover
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card hover>
                <h4 className="font-bold mb-2">Card con Hover</h4>
                <p className="text-sm text-gray-400">
                  Se eleva al pasar el mouse
                </p>
              </Card>

              <Card glow hover>
                <h4 className="font-bold mb-2">Card con Glow</h4>
                <p className="text-sm text-gray-400">
                  Efecto de brillo amarillo
                </p>
              </Card>

              <Card>
                <h4 className="font-bold mb-2">Card Simple</h4>
                <p className="text-sm text-gray-400">
                  Sin efectos adicionales
                </p>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs & Forms</CardTitle>
            <CardDescription>
              Campos de entrada con validación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                leftIcon={<Mail size={18} />}
              />

              <Input
                label="Usuario"
                placeholder="Nombre de usuario"
                leftIcon={<User size={18} />}
                helperText="Elige un nombre único"
              />

              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock size={18} />}
                required
              />

              <Input
                label="Búsqueda"
                placeholder="Buscar..."
                leftIcon={<Search size={18} />}
                error="Campo requerido"
              />

              <Textarea
                label="Descripción"
                placeholder="Escribe una descripción..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>
              Indicadores de estado y etiquetas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Variantes:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">Completado</Badge>
                  <Badge variant="warning">Pendiente</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Información</Badge>
                  <Badge variant="default">Default</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Con dot:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>Online</Badge>
                  <Badge variant="error" dot>Offline</Badge>
                  <Badge variant="warning" dot>Ocupado</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Outline:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" outline>Completado</Badge>
                  <Badge variant="error" outline>Cancelado</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Con icono:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="error" icon={<Heart size={14} />}>
                    Me gusta
                  </Badge>
                  <Badge variant="warning" icon={<Star size={14} />}>
                    Destacado
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avatars */}
        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
            <CardDescription>
              Avatares con fallback a iniciales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Tamaños:</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar name="Juan Pérez" size="sm" />
                  <Avatar name="María García" size="md" />
                  <Avatar name="Carlos López" size="lg" />
                  <Avatar name="Ana Martínez" size="xl" />
                  <Avatar name="Luis Rodríguez" size="2xl" />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Con estado online:</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar name="Usuario Online" online={true} />
                  <Avatar name="Usuario Offline" online={false} />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Grupo de avatares:</p>
                <AvatarGroup max={3}>
                  <Avatar name="Usuario 1" />
                  <Avatar name="Usuario 2" />
                  <Avatar name="Usuario 3" />
                  <Avatar name="Usuario 4" />
                  <Avatar name="Usuario 5" />
                </AvatarGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spinners */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>
              Indicadores de carga
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Tamaños:</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Colores:</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Spinner color="primary" />
                  <Spinner color="white" />
                  <Spinner color="gray" />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Overlay (3 segundos):</p>
                <Button onClick={handleLoadingTest}>
                  Probar Loading Overlay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <Card>
          <CardHeader>
            <CardTitle>Modals & Dialogs</CardTitle>
            <CardDescription>
              Ventanas modales con animaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setIsModalOpen(true)}>
                Abrir Modal
              </Button>
              <Button
                variant="danger"
                onClick={() => setIsConfirmOpen(true)}
              >
                Abrir Confirmación
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tooltips */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltips</CardTitle>
            <CardDescription>
              Información contextual al hover
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Tooltip content="Tooltip en la parte superior" position="top">
                <Button variant="ghost">Top</Button>
              </Tooltip>

              <Tooltip content="Tooltip a la derecha" position="right">
                <Button variant="ghost">Right</Button>
              </Tooltip>

              <Tooltip content="Tooltip abajo" position="bottom">
                <Button variant="ghost">Bottom</Button>
              </Tooltip>

              <Tooltip content="Tooltip a la izquierda" position="left">
                <Button variant="ghost">Left</Button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Example */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ejemplo de Modal"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Guardar
            </Button>
          </>
        }
      >
        <p className="text-gray-300 mb-4">
          Este es un ejemplo de modal con título, contenido y footer personalizado.
        </p>
        <Input label="Nombre" placeholder="Tu nombre" />
      </Modal>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="¿Eliminar proyecto?"
        message="Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
      />

      {/* Loading Overlay */}
      <LoadingOverlay visible={isLoading} text="Cargando componentes..." />
    </div>
  )
}

export default ComponentShowcase
