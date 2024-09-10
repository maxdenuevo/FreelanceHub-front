import React from 'react';
import Logo from '../images/Logo.png';


function Titulo() {
  return (
    <div id='titulo-encabezado' className="d-flex justify-content-center align-items-center flex-column flex-md-row mt-5">
      <img className='logo-titulo' src={Logo} alt="Logo FreelanceHub" />
      <h1 className="pt-md-0 ms-md-3 text-center text-md-start"><strong>FreelanceHub</strong></h1>
    </div>
  );
}

export default Titulo;