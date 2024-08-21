import React from 'react';


function Formularioregistro() {
  return (
<form className='formulario mt-5 mb-5'>
    <h2 className="form-title">Regístrate</h2>
    <div className="mb-3">
      <label for="inputName" className="form-label">Nombre</label>
      <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp"></input>
    </div>
    <div className="mb-3">
      <label for="inputUsername" className="form-label">Usuario</label>
      <input type="text" className="form-control" id="inputUsername"></input>
    </div>
    <div className="mb-3">
      <label for="inputRUT" className="form-label">RUT</label>
      <input type="text" className="form-control" id="inputRUT"></input>
    </div>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Email</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
      <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
    </div>
    <div className="mb-3">
      <label for="exampleInputPassword1" className="form-label">Contraseña</label>
      <input type="password" className="form-control" id="exampleInputPassword1"></input>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="termsCheck"></input>
      <label className="form-check-label" for="termsCheck">
        Acepto los <a href="#" className="terms-link">términos y condiciones</a>
      </label>
    </div>
    <button type="submit" className="btn" href="/nuevoproyecto">Registrar</button>
</form>
  );
}

export default Formularioregistro;