import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../images/Menu.png'
import Usuario from '../images/Usuario.png'
import Logo2 from '../images/Logo2.png'

function Navbardash() {
    const navigate = useNavigate();
  
    const irAInicio = () => {
      navigate('/');
    };
  
    const irAContactanos = () => {
      navigate('/contactanos');
    };
  
    const irAPerfil = () => {
      navigate('/dashboardpage/perfil');
    };
  
    const irACambiarContraseña = () => {
      navigate('/ingresarcorreo');
    };

  return (
    <nav id="navprincipal" className="navbar navbar-expand-lg fixed-top">
    <div className="container-fluid d-flex">
    <img id='logo-nav' src={Logo2} alt="" />
    <button title='Al inicio' className="nav-link text-light" onClick={irAInicio}>FreelanceHub</button>
    <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto text-end">
        <button className="nav-link active text-light" aria-current="page" onClick={irAInicio}>Inicio</button>
        <button className="nav-link text-light" onClick={irAContactanos}>¿Necesitas ayuda?</button>
        <div className="dropdown ms-auto">
              <button className="btn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={Usuario} alt="" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={irAPerfil}>Perfil</button></li>
                <li><button className="dropdown-item" onClick={irACambiarContraseña}>Cambiar contraseña</button></li>
              </ul>
            </div>
      </div>
    </div>
    <div className="dropdown d-lg-none ms-auto">
      <button className="btn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><img src={Menu} alt="" /></button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><button className="dropdown-item" onClick={irAInicio}>Home</button></li>
        <li><button className="dropdown-item" onClick={irAContactanos}>¿Necesitas ayuda?</button></li>
        <li><button className="dropdown-item" onClick={irAPerfil}>Perfil</button></li>
        <li><button className="dropdown-item" onClick={irACambiarContraseña}>Cambiar contraseña</button></li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbardash;