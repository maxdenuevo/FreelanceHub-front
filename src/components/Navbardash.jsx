import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, User, Home, HelpCircle, Lock } from 'lucide-react';

function Navbardash() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const irAInicio = () => {
      navigate('/');
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    const irAContactanos = () => {
      navigate('/contactanos');
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    const irAPerfil = () => {
      navigate('/dashboardpage/perfil');
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    const irACambiarContraseña = () => {
      navigate('/ingresarcorreo');
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    };

  return (
    <nav className="w-full bg-[#003598] fixed top-0 z-[101]">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo y nombre */}
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#fada04]" />
          <button
            title='Al inicio'
            className="text-white font-semibold text-lg hover:text-[#fada04] transition-colors"
            onClick={irAInicio}
          >
            FreelanceHub
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            className="flex items-center gap-2 px-4 py-2 text-white hover:text-[#fada04] transition-colors"
            onClick={irAInicio}
          >
            <Home className="w-4 h-4" />
            Inicio
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white hover:text-[#fada04] transition-colors"
            onClick={irAContactanos}
          >
            <HelpCircle className="w-4 h-4" />
            ¿Necesitas ayuda?
          </button>

          {/* User Dropdown - Desktop */}
          <div className="relative ml-2">
            <button
              className="p-2 text-white hover:text-[#fada04] transition-colors rounded-full hover:bg-white/10"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="User menu"
            >
              <User className="w-6 h-6" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[180px]">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                  onClick={irAPerfil}
                >
                  <User className="w-4 h-4" />
                  Perfil
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                  onClick={irACambiarContraseña}
                >
                  <Lock className="w-4 h-4" />
                  Cambiar contraseña
                </button>
              </div>
            )}
          </div>
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
          <div className="absolute top-full right-0 mt-1 mr-4 bg-white rounded-lg shadow-lg py-2 min-w-[180px] lg:hidden">
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              onClick={irAInicio}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              onClick={irAContactanos}
            >
              <HelpCircle className="w-4 h-4" />
              ¿Necesitas ayuda?
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              onClick={irAPerfil}
            >
              <User className="w-4 h-4" />
              Perfil
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              onClick={irACambiarContraseña}
            >
              <Lock className="w-4 h-4" />
              Cambiar contraseña
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbardash;
