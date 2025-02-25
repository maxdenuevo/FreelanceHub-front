import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User,
  Search,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import logoWhite from '@/assets/logo-white.svg';

/**
 * Dashboard navbar component
 */
const Navbardash = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mock user data - would be replaced with actual API call
    setUser({
      id: '123',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3'
    });
    
    // Mock notifications - would be replaced with actual API call
    setNotifications([
      { id: 1, message: 'Nuevo comentario en tu proyecto', read: false, time: '10min' },
      { id: 2, message: 'Factura pagada por Cliente ABC', read: false, time: '1h' },
      { id: 3, message: 'Recordatorio: Entrega de proyecto mañana', read: true, time: '3h' },
    ]);
  }, []);
  
  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationOpen) setNotificationOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('usuario_email');
    navigate('/login');
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu toggle - visible on small screens */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          
          {/* Logo - visible on mobile only since sidebar has logo on desktop */}
          <div className="md:hidden">
            <Link to="/dashboardpage" className="flex items-center">
              <img 
                src={logoWhite} 
                alt="FreelanceHub Logo" 
                className="h-8 w-auto bg-primary p-1 rounded" 
              />
            </Link>
          </div>
          
          {/* Search - hidden on mobile */}
          <div className="hidden md:block md:w-72 lg:w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar..." 
                className="pl-10 bg-gray-50"
              />
            </div>
          </div>
          
          {/* Right section - user menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <span className="sr-only">Notificaciones</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
                  <div className="py-2 px-4 border-b">
                    <h3 className="text-sm font-medium">Notificaciones</h3>
                  </div>
                  
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500 p-4">No hay notificaciones</p>
                    ) : (
                      <div>
                        {notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 border-b ${!notification.read ? 'bg-blue-50' : ''}`}
                          >
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="py-2 px-4 border-t text-center">
                    <button className="text-sm text-primary hover:underline">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User menu */}
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center space-x-2"
              >
                <img 
                  src={user?.avatar || 'https://via.placeholder.com/32'} 
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block">{user?.name || 'Usuario'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* User dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <div className="py-2 px-4 border-b">
                    <p className="text-sm font-medium">{user?.name || 'Usuario'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'usuario@example.com'}</p>
                  </div>
                  
                  <div className="py-1">
                    <button 
                      onClick={() => navigate('/dashboardpage/perfil')}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Mi perfil
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbardash;