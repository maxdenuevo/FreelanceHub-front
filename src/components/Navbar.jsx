import React from 'react';
import Menu from '../images/menu.png'



function Navbar() {
  return (
    <nav id="navprincipal" className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand text-light" href="#">FreelanceHub</a>
    <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto text-end">
        <a className="nav-link active text-light" aria-current="page" href="/">Inicio</a>
        <a className="nav-link text-light" href="/login">Tu Portal de Proyectos</a>
        <a className="nav-link text-light" href="/registro">Registrarse</a>
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