import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logoWhite from '@/assets/logo-white.svg';

/**
 * Main navigation component for public pages
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const userId = localStorage.getItem('usuario_id');
    setIsAuthenticated(!!userId);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isInDashboard = location.pathname.includes('/dashboardpage');

  const handleLogout = () => {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
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
    <header className={`fixed w-full z-10 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
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
              className={`text-gray-800 hover:text-primary ${
                location.pathname === '/' ? 'border-b-2 border-primary' : ''
              }`}
            >
              Inicio
            </Link>
            {!isInDashboard && (
              <Link 
                to="/contactanos" 
                className={`text-gray-800 hover:text-primary ${
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
                      className="text-gray-800 hover:text-primary"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="bg-transparent text-gray-800 hover:text-primary hover:bg-primary px-0"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="bg-transparent text-gray-800 hover:text-primary hover:bg-primary px-0"
                    onClick={() => navigate('/login')}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent text-gray-800 border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded"
                    onClick={() => navigate('/registro')}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-gray-800 hover:text-primary py-2 ${
                location.pathname === '/' ? 'border-b-2 border-primary' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            {!isInDashboard && (
              <Link 
                to="/contactanos" 
                className={`text-gray-800 hover:text-primary py-2 ${
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
                      className="text-gray-800 hover:text-primary"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="bg-transparent text-gray-800 hover:text-primary hover:bg-primary px-0 justify-start"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="bg-transparent text-gray-800 hover:text-primary hover:bg-primary px-0 justify-start"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent text-gray-800 border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded w-full"
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