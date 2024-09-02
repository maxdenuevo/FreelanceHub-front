import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Formularioinicio() {

  const [usuarioEmail, setUsuarioEmail] = useState('');
  const [usuarioPassword, setUsuarioPassword] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate();

  function cambiarUsuarioEmail(e){
    setUsuarioEmail(e.target.value);
  }

  function cambiarUsuarioPassword(e){
    setUsuarioPassword(e.target.value);
  }

  function ingresarUsuario(e){
    e.preventDefault();
    setErrorMensaje('');
    console.log('Datos preparados para el ingreso 👨');

    fetch("https://api-freelancehub.vercel.app/login-usuario", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario_email: usuarioEmail,
        usuario_password: usuarioPassword
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la autenticación');
        }
        return response.json();
      })
      .then(responseConverted => {
        console.log("El usuario se ha autenticado correctamente! 👨‍🚀");
        console.log(responseConverted);
        navigate('/dashboardpage');
      })
      .catch(error => {
        console.log(error);
        setErrorMensaje('No se pudo iniciar sesión. Verifica tus datos e intenta de nuevo.');
      })
  }

  return (
    <form className='formulario mt-5'>
        <h2 className="form-title">Inicio de Sesión</h2>
        {errorMensaje && <div className="alert alert-danger">{errorMensaje}</div>}
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input onChange={cambiarUsuarioEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
            <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
            <input onChange={cambiarUsuarioPassword} type="password" className="form-control" id="exampleInputPassword1" required></input>
        </div>
        <div className="mb-3">
            <a href="#" className="forgot-password-link">¿olvidaste tu contraseña?</a>
        </div>
        <button type="submit" onClick={ingresarUsuario} className="btn" required>Ingresar</button>
    </form>
  );
}

export default Formularioinicio;