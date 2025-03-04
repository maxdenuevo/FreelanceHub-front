import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NavItem = ({ to, icon, label, active, collapsed }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2 my-1 rounded-md transition-colors",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-foreground hover:bg-secondary hover:text-secondary-foreground",
      collapsed ? "justify-center" : "space-x-3"
    )}
  >
    <span className="text-xl">{icon}</span>
    {!collapsed && <span className="font-medium">{label}</span>}
  </Link>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userId = localStorage.getItem('usuario_id');

  const navItems = [
    { to: '/dashboardpage', icon: '📊', label: 'Dashboard' },
    { to: '/dashboardpage/proyectos', icon: '📁', label: 'Proyectos' },
    { to: '/dashboardpage/clientes', icon: '👥', label: 'Clientes' },
    { to: '/dashboardpage/contratos', icon: '📝', label: 'Contratos' },
    { to: '/dashboardpage/perfil', icon: '👤', label: 'Perfil' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={cn(
      "flex h-full flex-col bg-card text-card-foreground border-r shadow-sm transition-all",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b">
        {collapsed ? (
          <span className="text-xl font-bold">F</span>
        ) : (
          <span className="text-xl font-bold">FreelanceHub</span>
        )}
      </div>

      {/* Nav Toggle Button */}
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2 pt-5">
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

      {/* User Section */}
      <div className="border-t p-4">
        {!collapsed && (
          <div className="mb-2 text-sm font-medium">Usuario: {userId}</div>
        )}
        <Link 
          to="/login" 
          onClick={() => localStorage.removeItem('usuario_id')}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors",
            collapsed ? "justify-center" : "space-x-2"
          )}
        >
          <span>🚪</span>
          {!collapsed && <span>Cerrar sesión</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;