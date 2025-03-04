import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { 
  Bell, 
  Search,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

/**
 * Barra de navegación superior para el dashboard
 */
const DashboardTopbar = ({ openMobileSidebar }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Notificaciones simuladas - se reemplazarían con llamada a API
  useEffect(() => {
    setNotifications([
      { id: 1, title: 'Nuevo cliente registrado', time: '10 min', read: false },
      { id: 2, title: 'Tarea completada', time: '1 hora', read: false },
      { id: 3, title: 'Recordatorio: Entrega de proyecto', time: '3 horas', read: true },
    ]);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
      {/* Left side - Mobile menu toggle & search */}
      <div className="flex items-center">
        <button 
          onClick={openMobileSidebar}
          className="mr-4 text-gray-500 md:hidden"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Right side - Notificaciones & Usuario */}
      <div className="flex items-center space-x-4">
        {/* Notificaciones */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (showUserMenu) setShowUserMenu(false);
            }}
            className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* Menú de notificaciones */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">Notificaciones</h3>
                <button className="text-xs text-primary hover:underline">
                  Marcar todas como leídas
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No tienes notificaciones
                  </div>
                ) : (
                  <div>
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100",
                          !notification.read && "bg-blue-50"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 text-center">
                <button className="text-sm text-primary hover:underline">
                  Ver todas
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Menú de usuario */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              if (showNotifications) setShowNotifications(false);
            }}
            className="flex items-center space-x-2 text-gray-700 hover:text-primary"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user?.nombre || 'Usuario'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={20} className="text-gray-600" />
              )}
            </div>
            <div className="hidden md:block">
              <span className="text-sm font-medium">{user?.nombre || 'Usuario'}</span>
              <ChevronDown size={16} className="inline-block ml-1" />
            </div>
          </button>
          
          {/* User dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium">{user?.nombre || 'Usuario'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'usuario@example.com'}</p>
              </div>
              <div className="py-1">
                <button 
                  onClick={() => {
                    navigate('/dashboardpage/perfil');
                    setShowUserMenu(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                >
                  <Settings size={16} className="mr-2" />
                  Mi perfil
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Dashboard layout component
 * Provides responsive sidebar and header navigation
 */
const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Cerrar barra lateral cuando se hace clic fuera en móvil
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileSidebarOpen && e.target.closest('.mobile-sidebar-overlay')) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileSidebarOpen]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay de barra lateral móvil */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden mobile-sidebar-overlay"
        />
      )}
      
      {/* Barra lateral - visible en escritorio, off-canvas en móvil */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:relative md:z-0 transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        {isMobileSidebarOpen && (
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute top-4 right-4 text-white bg-primary rounded-full p-1 md:hidden"
          >
            <X size={20} />
          </button>
        )}
        <Sidebar />
      </div>
      
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardTopbar 
          openMobileSidebar={() => setIsMobileSidebarOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;