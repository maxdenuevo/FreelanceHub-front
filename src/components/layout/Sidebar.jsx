import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  FileText, 
  CheckSquare, 
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ColorLogo, LogoIcon, MonochromeLogo } from '@/components/ui/logos/FreelanceLogo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const NavItem = ({ to, icon, label, active, collapsed }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2 my-1 rounded-md transition-colors",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-gray-700 hover:bg-primary/10 hover:text-primary",
      collapsed ? "justify-center" : "space-x-3"
    )}
    title={collapsed ? label : undefined}
  >
    {icon}
    {!collapsed && <span className="font-medium">{label}</span>}
  </Link>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { 
      to: '/dashboardpage', 
      icon: <LayoutDashboard size={collapsed ? 22 : 18} />, 
      label: 'Dashboard' 
    },
    { 
      to: '/dashboardpage/proyectos', 
      icon: <FolderKanban size={collapsed ? 22 : 18} />, 
      label: 'Proyectos' 
    },
    { 
      to: '/dashboardpage/clientes', 
      icon: <Users size={collapsed ? 22 : 18} />, 
      label: 'Clientes' 
    },
    { 
      to: '/dashboardpage/contratos', 
      icon: <FileText size={collapsed ? 22 : 18} />, 
      label: 'Contratos' 
    },
    { 
      to: '/dashboardpage/tareas', 
      icon: <CheckSquare size={collapsed ? 22 : 18} />, 
      label: 'Tareas' 
    },
    { 
      to: '/dashboardpage/pagos', 
      icon: <CreditCard size={collapsed ? 22 : 18} />, 
      label: 'Pagos' 
    },
    { 
      to: '/dashboardpage/perfil', 
      icon: <Settings size={collapsed ? 22 : 18} />, 
      label: 'Perfil' 
    },
  ];

  const isActive = (path) => {
    if (path === '/dashboardpage') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className={cn(
        "flex h-screen flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-gray-200">
        {collapsed ? (
          <LogoIcon size={32} />
        ) : (
          <div className="flex items-center">
            <ColorLogo size={32} />
            <span className="ml-2 text-lg font-bold text-gray-900">FreelanceHub</span>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-md text-gray-600 hover:text-primary"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Sección de navegación */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={isActive(item.to)}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      {/* Sección de usuario */}
      <div className="border-t border-gray-200 p-4">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.nombre || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'usuario@example.com'}
              </p>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center justify-center rounded-md p-2 text-red-600 hover:bg-red-50 transition-colors",
              collapsed ? "w-10 h-10" : ""
            )}
            title="Cerrar sesión"
          >
            <LogOut size={collapsed ? 22 : 18} />
            {!collapsed && <span className="ml-2 text-sm">Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;