import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase } from 'lucide-react';
import Navbardash from './Navbardash';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rutasDashboard = ['/dashboardpage', '/nuevocliente', '/nuevocliente/nuevoproyecto'];
  const esRutaDashboard = rutasDashboard.some(ruta => location.pathname.startsWith(ruta));

  const irAInicio = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const irAInicioSesion = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const irARegistro = () => {
    navigate('/registro');
    setIsMenuOpen(false);
  };

  const irAPortal = () => {
    navigate('/dashboardpage');
    setIsMenuOpen(false);
  };

  return esRutaDashboard ? <Navbardash /> : (
    <nav className="w-full bg-[#003598] z-[101]">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo y nombre */}
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#fada04]" />
          <button
            title='Al Dashboard'
            className="text-white font-semibold text-lg hover:text-[#fada04] transition-colors"
            onClick={irAPortal}
          >
            FreelanceHub
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            className="px-4 py-2 text-white hover:text-[#fada04] transition-colors"
            onClick={irAInicio}
          >
            Home
          </button>
          <button
            className="px-4 py-2 text-white hover:text-[#fada04] transition-colors"
            onClick={irARegistro}
          >
            Registrarse
          </button>
          <button
            className="px-4 py-2 text-white hover:text-[#fada04] transition-colors"
            onClick={irAInicioSesion}
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white hover:text-[#fada04] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-1 mr-4 bg-white rounded-lg shadow-lg py-2 min-w-[150px] lg:hidden">
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={irAInicio}
            >
              Home
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={irARegistro}
            >
              Registrarse
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={irAInicioSesion}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
