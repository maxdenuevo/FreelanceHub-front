import React, { useState } from 'react';

function Formularioregistro() {
  const [passwordMessage, setPasswordMessage] = useState('');

  const validarContraseña = (e) => {
    const contraseña = e.target.value;
    const longitudMinima = 8;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);

    if (contraseña.length >= longitudMinima && tieneMayuscula && tieneSimbolo) {
      setPasswordMessage("La contraseña es válida.");
    } else {
      setPasswordMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo.");
    }
  };

  return (
    <form className='formulario mt-5 mb-5'>
      <h2 className="form-title">Regístrate</h2>
      <div className="mb-3">
        <label htmlFor="inputName" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="inputUsername" className="form-label">Usuario</label>
        <input type="text" className="form-control" id="inputUsername" />
      </div>
      <div className="mb-3">
        <label htmlFor="inputRUT" className="form-label">RUT</label>
        <input type="text" className="form-control" id="inputRUT" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
        <input 
          type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          onInput={validarContraseña} 
        />
        <div id="passwordHelp" className="form-text" style={{ color: passwordMessage === "La contraseña es válida." ? "blue" : "red" }}>
          {passwordMessage}
        </div>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="termsCheck" />
        <label className="form-check-label" htmlFor="termsCheck">
          Acepto los <a href="#" className="terms-link">términos y condiciones</a>
        </label>
      </div>
      <button type="submit" className="btn" href="/nuevoproyecto">Registrar</button>
    </form>
  );
}

export default Formularioregistro;