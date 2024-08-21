import React from 'react';


function Formularioinicio() {
  return (
    <form className='formulario mt-5'>
        <h2 className="form-title">Inicio de Sesión</h2>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
    <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="exampleInputPassword1"></input>
  </div>
  <div className="mb-3">
    <a href="#" className="forgot-password-link">¿olvidaste tu contraseña?</a>
  </div>
  <button type="submit" className="btn">Ingresar</button>
</form>
  );
}

export default Formularioinicio;