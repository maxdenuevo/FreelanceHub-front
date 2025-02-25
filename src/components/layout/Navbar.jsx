import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logoWhite from '@/assets/logo-white.svg';

/**
 * Main navigation component for public pages
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAuthenticated = !!localStorage.getItem('usuario_id');
  const isInDashboard = location.pathname.includes('/dashboardpage');

  const handleLogout = () => {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Don't show navbar on auth pages
  if (
    location.pathname === '/login' || 
    location.pathname === '/registro' || 
    location.pathname === '/ingresarcorreo' || 
    location.pathname === '/validarcodigo' || 
    location.pathname === '/cambiarcontraseña'
  ) {
    return null;
  }

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoWhite} alt="FreelanceHub Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">FreelanceHub</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-white hover:text-white/80 ${
                location.pathname === '/' ? 'border-b-2 border-primary' : ''
              }`}
            >
              Inicio
            </Link>
            {!isInDashboard && (
              <Link 
                to="/contactanos" 
                className={`text-white hover:text-white/80 ${
                  location.pathname === '/contactanos' ? 'border-b-2 border-primary' : ''
                }`}
              >
                Contáctanos
              </Link>
            )}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {!isInDashboard && (
                    <Link 
                      to="/dashboardpage" 
                      className="text-white hover:text-white/80"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-white/80 hover:bg-primary-600"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-white/80 hover:bg-primary-600"
                    onClick={() => navigate('/login')}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-primary"
                    onClick={() => navigate('/registro')}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-white hover:text-white/80 py-2 ${
                location.pathname === '/' ? 'border-b-2 border-primary' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            {!isInDashboard && (
              <Link 
                to="/contactanos" 
                className={`text-white hover:text-white/80 py-2 ${
                  location.pathname === '/contactanos' ? 'border-b-2 border-primary' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contáctanos
              </Link>
            )}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {!isInDashboard && (
                    <Link
                      to="/dashboardpage"
                      className="text-white hover:text-white/80"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-white/80 hover:bg-primary-600 justify-start px-0"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-white/80 hover:bg-primary-600 justify-start px-0"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-primary w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/registro');
                    }}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;