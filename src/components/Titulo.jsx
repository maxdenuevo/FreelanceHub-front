import React from 'react';
import Logo from '../images/logo.png'

function Titulo() {
  return (
    <div className="titulo-encabezado d-flex justify-content-center mt-5">
      <img className='logo-titulo' src={Logo} alt="" />
    <h1 className="pt-3"><strong>FreelanceHub</strong></h1>
    </div>
  );
}

export default Titulo;