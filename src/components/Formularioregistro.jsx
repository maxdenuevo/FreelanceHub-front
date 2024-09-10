import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TerminosYCondiciones from './TerminosYCondiciones'

function Formularioregistro() {
  const [usuarioRut, setUsuarioRut] = useState('');
  const [usuarioEmail, setUsuarioEmail] = useState('');
  const [usuarioPassword, setUsuarioPassword] = useState('');
  const [usuarioNombre, setUsuarioNombre] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  function cambiarUsuarioRut(e) {
    setUsuarioRut(e.target.value);
  }

  function cambiarUsuarioEmail(e) {
    setUsuarioEmail(e.target.value);
  }

  function cambiarUsuarioPassword(e) {
    setUsuarioPassword(e.target.value);
  }

  function cambiarUsuarioNombre(e) {
    setUsuarioNombre(e.target.value);
  }

  function aceptarTerminos(e) {
    setTerminosAceptados(e.target.checked);
  }

  function registrarUsuario(e) {
    e.preventDefault();

    if (!terminosAceptados) {
      setErrorMensaje('Debes aceptar los términos y condiciones.');
      return;
    }

    fetch("https://api-freelancehub.vercel.app/register-usuario", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario_email: usuarioEmail,
        usuario_rut: usuarioRut,
        usuario_password: usuarioPassword,
        usuario_nombre: usuarioNombre,
      })
    })
      .then(response => {
        return response.json();
      })
      .then(responseConverted => {
        console.log("El usuario se ha registrado correctamente! 👨‍🚀");
        console.log(responseConverted);
        setRegistroExitoso(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch(error => {
        console.log(error)
        setErrorMensaje('No se pudo registrar el usuario. Verifica la informacion.');
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
      {registroExitoso && <div className="alert alert-success mt-3">¡Te has registrado correctamente! Redirigiendo al inicio de sesión...</div>}
      {errorMensaje && <div className="alert alert-danger mt-3">{errorMensaje}</div>}
      <div className="mb-3">
        <label htmlFor="inputNombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="inputNombre" onChange={cambiarUsuarioNombre}/>     
      </div>
      <div className="mb-3">
        <label htmlFor="inputRUT" className="form-label">RUT</label>
        <input type="text" className="form-control" id="inputRUT" onChange={cambiarUsuarioRut}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={cambiarUsuarioEmail}/>
        <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onInput={validarContraseña} onChange={cambiarUsuarioPassword}/>
        <div id="passwordHelp" className="form-text" style={{ color: passwordMessage === "La contraseña es válida." ? "blue" : "red" }}>
          {passwordMessage}
        </div>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="termsCheck" onChange={aceptarTerminos}/>
        <label className="form-check-label" htmlFor="termsCheck">
          Acepto los <a href="#" className="terms-link" onClick={() => setMostrarModal(true)}>términos y condiciones</a>
        </label>
      </div>
      <button type="submit" className="btn" onClick={registrarUsuario}>Registrar</button>
      {mostrarModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
           <div className="modal-dialog" style={{ position: 'fixed', bottom: '100px', right: '460px', margin: '0' }}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <p><TerminosYCondiciones /></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default Formularioregistro;