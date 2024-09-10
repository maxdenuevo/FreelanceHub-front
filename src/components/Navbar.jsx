import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbardash from './Navbardash';
import Menu from '../images/Menu.png'
import Logo2 from '../images/Logo2.png'




function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const rutasDashboard = ['/dashboardpage', '/nuevocliente', '/nuevocliente/nuevoproyecto'];
  const esRutaDashboard = rutasDashboard.some(ruta => location.pathname.startsWith(ruta));

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
<<<<<<< HEAD
    <button title='Al Dashboard' className="nav-link text-light" onClick={irAPortal}>FreelanceHub</button>
=======
    <button className="nav-link text-light" onClick={irAPortal}>FreelanceHub</button>
>>>>>>> d26d8f1b86e135260d40de86611d713ea9d113ef
    <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto text-end">
        <button className="nav-link active text-light" aria-current="page" onClick={irAInicio}>Home</button>
        <button className="nav-link text-light" onClick={irARegistro}>Registrarse</button>
        <button className="nav-link text-light" onClick={irAInicioSesion}>Login</button>
      </div>
    </div>
    <div className="dropdown d-lg-none ms-auto">
      <button className="btn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><img src={Menu} alt="" /></button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><button className="dropdown-item" onClick={irAInicio}>Home</button></li>
        <li><button className="dropdown-item" onClick={irARegistro}>Registrate</button></li>
        <li><button className="dropdown-item" onClick={irAInicioSesion}>Login</button></li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;