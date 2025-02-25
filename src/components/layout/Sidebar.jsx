import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import logoWhite from '@/assets/logo-white.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem('usuario_id');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
      variant: "success",
    });
    navigate('/login');
  };
  
  const navItems = [
    { path: '/dashboardpage', label: 'Dashboard', icon: '📊' },
    { path: '/dashboardpage/proyectos', label: 'Proyectos', icon: '📁' },
    { path: '/dashboardpage/clientes', label: 'Clientes', icon: '👥' },
    { path: '/dashboardpage/contratos', label: 'Contratos', icon: '📄' },
    { path: '/dashboardpage/perfil', label: 'Perfil', icon: '👤' },
  ];
  
  return (
    <aside className="bg-white w-64 h-full shadow-md">
      <div className="p-6">
        <img 
          src={logoWhite} 
          alt="FreelanceHub Logo" 
          className="h-8 mb-6"
        />
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              end={item.path === '/dashboardpage'}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <span className="mr-3">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;