import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Get user info from localStorage
    const userId = localStorage.getItem('usuario_id');
    const userEmail = localStorage.getItem('usuario_email');
    
    if (userId && userEmail) {
      setUser({
        id: userId,
        email: userEmail
      });
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('usuario_email');
    window.location.href = '/login';
  };
  
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
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Bell size={20} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-100">
                  <User size={20} className="text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && (
                  <DropdownMenuLabel className="font-normal text-sm text-gray-500">
                    {user.email}
                  </DropdownMenuLabel>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/dashboardpage/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbardash;