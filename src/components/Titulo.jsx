import React from 'react';
import Logo from '../images/Logo.png'

function Titulo() {
  return (
    <div className="titulo-encabezado d-flex justify-content-center">
      <img className='logo-titulo' src={Logo} alt="Logo FreelanceHub" />
    <h1 className="pt-3"><strong>FreelanceHub</strong></h1>
    </div>
  );
}

export default Titulo;