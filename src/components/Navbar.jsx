import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbardash from './Navbardash';
import Menu from '../images/Menu.png'
import Logo2 from '../images/Logo2.png'




function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const esRutaDashboard = location.pathname.startsWith('/dashboardpage');

  const irAInicio = () => {
    navigate('/');
  };

  const irAInicioSesion = () => {
    navigate('/login');
  };

  const irARegistro = () => {
    navigate('/registro');
  };

  const irAPortal = () => {
    navigate('/dashboardpage');
  };

  return esRutaDashboard ? <Navbardash /> : (
    <nav id="navprincipal" className="navbar navbar-expand-lg">
    <div className="container-fluid d-flex">
    <img id='logo-nav' src={Logo2} alt="" />
    <a className="navbar-brand text-light" href="#">FreelanceHub</a>
    <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto text-end">
        <button className="nav-link active text-light" aria-current="page" onClick={irAInicio}>Inicio</button>
        <button className="nav-link text-light" onClick={irAInicioSesion}>Iniciar sesion</button>
        <button className="nav-link text-light" onClick={irARegistro}>Registrarse</button>
        <button className="nav-link text-light" onClick={irAPortal}>Tu portal de proyectos</button>
      </div>
    </div>
    <div className="dropdown d-lg-none ms-auto">
      <button className="btn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><img src={Menu} alt="" /></button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><a className="dropdown-item" href="/">Inicio</a></li>
        <li><a className="dropdown-item" href="/login">Tu Portal de Proyectos</a></li>
        <li><a className="dropdown-item" href="/registrar">Registrate</a></li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;