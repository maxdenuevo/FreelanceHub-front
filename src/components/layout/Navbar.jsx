// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, User, Bell, LogOut, Settings
} from 'lucide-react';
import { ColorLogo, WhiteLogo, LogoWithText } from '@/components/ui/logos/FreelanceLogo';
import { useAuth } from '@/hooks/useAuth';

/**
 * Main navigation component for FreelanceHub 2.0
 * Responsive design with mobile menu and authentication state awareness
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Check if we're in the dashboard area
  const isInDashboard = location.pathname.includes('/dashboardpage');
  
  // Skip rendering on auth pages and dashboard
  if (
    location.pathname === '/login' || 
    location.pathname === '/registro' || 
    location.pathname === '/ingresarcorreo' || 
    location.pathname === '/validarcodigo' || 
    location.pathname === '/cambiarcontraseña' ||
    isInDashboard
  ) {
    return null;
  }

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <Link to="/" className="flex items-center space-x-2">
            {isScrolled ? (
              <ColorLogo size={36} />
            ) : (
              <WhiteLogo size={36} />
            )}
            <span 
              className={`text-xl font-bold ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              FreelanceHub
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
              } ${location.pathname === '/' ? 'border-b-2 border-primary' : ''}`}
            >
              Inicio
            </Link>
            <Link 
              to="/servicios" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
              } ${location.pathname === '/servicios' ? 'border-b-2 border-primary' : ''}`}
            >
              Servicios
            </Link>
            <Link 
              to="/contactanos" 
              className={`font-medium ${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
              } ${location.pathname === '/contactanos' ? 'border-b-2 border-primary' : ''}`}
            >
              Contáctanos
            </Link>
            
            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button 
                    className={`flex items-center space-x-1 font-medium ${
                      isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
                    }`}
                  >
                    <span>Mi Cuenta</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      <Link
                        to="/dashboardpage"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User size={16} className="mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboardpage/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Settings size={16} className="mr-2" />
                        Mi Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`font-medium ${
                      isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-gray-200'
                    }`}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/registro"
                    className={`px-4 py-2 rounded-md font-medium ${
                      isScrolled 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-white text-primary hover:bg-gray-100'
                    }`}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className={`md:hidden ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 mt-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className="font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/servicios" 
                className="font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                to="/contactanos" 
                className="font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contáctanos
              </Link>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboardpage"
                      className="block py-2 font-medium text-gray-700 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboardpage/perfil"
                      className="block py-2 font-medium text-gray-700 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block py-2 font-medium text-red-600 hover:text-red-700"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/login"
                      className="font-medium text-gray-700 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/registro"
                      className="px-4 py-2 bg-primary text-white text-center rounded-md font-medium hover:bg-primary/90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;