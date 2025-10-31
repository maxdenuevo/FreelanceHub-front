import { useState } from 'react';
import { Modal, Tabs, Input, Button, Alert } from '../ui';
import { ThemeToggle } from '../ui/ThemeToggle';
import { User, Lock, Palette, Bell, Info } from 'lucide-react';

/**
 * SettingsModal - Modal de configuración de usuario
 */

export const SettingsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('perfil');

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'seguridad', label: 'Seguridad', icon: Lock },
    { id: 'apariencia', label: 'Apariencia', icon: Palette },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'acerca', label: 'Acerca de', icon: Info },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información del Perfil</h3>
            <Input
              label="Nombre"
              placeholder="Tu nombre"
              defaultValue={localStorage.getItem('usuario_email')}
            />
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              defaultValue={localStorage.getItem('usuario_email')}
              disabled
            />
            <Alert variant="info">
              El email no puede ser modificado. Contacta soporte si necesitas cambiarlo.
            </Alert>
            <div className="flex justify-end pt-4">
              <Button>Guardar Cambios</Button>
            </div>
          </div>
        );

      case 'seguridad':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Seguridad de la Cuenta</h3>
            <Input
              label="Contraseña Actual"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="Nueva Contraseña"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="Confirmar Nueva Contraseña"
              type="password"
              placeholder="••••••••"
            />
            <div className="flex justify-end pt-4">
              <Button>Cambiar Contraseña</Button>
            </div>
          </div>
        );

      case 'apariencia':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Apariencia</h3>
            <ThemeToggle variant="dropdown" />

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                El modo oscuro reduce el cansancio visual en ambientes con poca luz y ayuda a ahorrar batería en pantallas OLED.
              </p>
            </div>
          </div>
        );

      case 'notificaciones':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferencias de Notificaciones</h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium">Tareas próximas a vencer</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium">Nuevos pagos recibidos</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium">Actualizaciones de proyectos</span>
                <input type="checkbox" className="rounded" />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium">Notificaciones por email</span>
                <input type="checkbox" className="rounded" />
              </label>
            </div>

            <div className="flex justify-end pt-4">
              <Button>Guardar Preferencias</Button>
            </div>
          </div>
        );

      case 'acerca':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">FreelanceHub v2.0</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Versión:</strong> 2.0.0
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Última actualización:</strong> 30 de Octubre, 2025
              </p>
              <p>
                FreelanceHub es una plataforma moderna para gestión de proyectos freelance, diseñada para ayudarte a organizar tus proyectos, clientes, tareas y pagos de manera eficiente.
              </p>

              <div className="pt-4 border-t">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Tecnologías</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>React 18 + Vite</li>
                  <li>Tailwind CSS v4</li>
                  <li>Framer Motion</li>
                  <li>Zustand</li>
                  <li>Recharts</li>
                  <li>DnD Kit</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configuración" size="large">
      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="w-48 border-r dark:border-gray-700 pr-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 pl-6 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </Modal>
  );
};
