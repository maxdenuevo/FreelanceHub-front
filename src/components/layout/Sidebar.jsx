import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileSignature, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logoWhite from '@/assets/logo-white.svg';

/**
 * Sidebar navigation component for dashboard
 */
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('usuario_email');
    navigate('/login', { state: { message: 'Sesión cerrada correctamente' } });
  };
  
  return (
    <div 
      className={cn(
        "h-screen bg-primary text-white flex flex-col transition-all duration-300 border-r border-primary-700",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and collapse button */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <Link to="/dashboardpage" className="flex items-center space-x-2">
            <img src={logoWhite} alt="FreelanceHub Logo" className="h-8 w-auto" />
            <span className="font-bold">FreelanceHub</span>
          </Link>
        )}
        
        {collapsed && (
          <Link to="/dashboardpage" className="mx-auto">
            <img src={logoWhite} alt="FreelanceHub Logo" className="h-8 w-auto" />
          </Link>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-primary-600"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      {/* Navigation links */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          <li>
            <Link
              to="/dashboardpage"
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboardpage") && !isActive("/dashboardpage/proyectos") && !isActive("/dashboardpage/clientes") && !isActive("/dashboardpage/contratos")
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <LayoutDashboard size={20} />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>
          
          <li>
            <Link
              to="/dashboardpage/proyectos"
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboardpage/proyectos")
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <FileText size={20} />
              {!collapsed && <span className="ml-3">Proyectos</span>}
            </Link>
          </li>
          
          <li>
            <Link
              to="/dashboardpage/clientes"
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboardpage/clientes")
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Users size={20} />
              {!collapsed && <span className="ml-3">Clientes</span>}
            </Link>
          </li>
          
          <li>
            <Link
              to="/dashboardpage/contratos"
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboardpage/contratos")
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <FileSignature size={20} />
              {!collapsed && <span className="ml-3">Contratos</span>}
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Bottom actions */}
      <div className="p-4 border-t border-primary-700">
        <ul className="space-y-1">
          <li>
            <Link
              to="/dashboardpage/perfil"
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive("/dashboardpage/perfil")
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Settings size={20} />
              {!collapsed && <span className="ml-3">Perfil</span>}
            </Link>
          </li>
          
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md transition-colors text-white/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={20} />
              {!collapsed && <span className="ml-3">Cerrar Sesión</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;