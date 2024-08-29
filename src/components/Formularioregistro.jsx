import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Formularioregistro() {
  const [usuarioRut, setUsuarioRut] = useState('');
  const [usuarioEmail, setUsuarioEmail] = useState('');
  const [usuarioPassword, setUsuarioPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const navigate = useNavigate();

  function cambiarUsuarioRut(e){
    setUsuarioRut(e.target.value);
  }

  function cambiarUsuarioEmail(e){
    setUsuarioEmail(e.target.value);
  }

  function cambiarUsuarioPassword(e){
    setUsuarioPassword(e.target.value);
  }

  function registrarUsuario(e){
    e.preventDefault();
    console.log('Datos preparados para el registro 👨');
    console.log(usuarioRut, usuarioEmail, usuarioPassword);

    fetch("https://api-freelancehub.vercel.app/register-usuario", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario_rut: usuarioRut,
        usuario_email: usuarioEmail,
        usuario_password: usuarioPassword
      })
    })
      .then(response => {
        return response.json();
      })
      .then(responseConverted => {
        console.log("El usuario se ha registrado correctamente! 👨‍🚀");
        console.log(responseConverted);
        navigate('/login');
      })
      .catch(error => {
        console.log(error)
        //NOTA: Se debe mostrar un mensaje de error al usuaro
      })
  }

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
        <label htmlFor="inputRUT" className="form-label">RUT</label>
        <input type="text" className="form-control" id="inputRUT" 
        onChange={cambiarUsuarioRut}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
        onChange={cambiarUsuarioEmail}
        />
        <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
        <input 
          type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          onInput={validarContraseña} 
          onChange={cambiarUsuarioPassword}
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
      <button type="button" className="btn" 
      onClick={registrarUsuario}
      >Registrar</button>
    </form>
  );
}

export default Formularioregistro;