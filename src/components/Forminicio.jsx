import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function Formularioinicio() {
  const [usuarioEmail, setUsuarioEmail] = useState('');
  const [usuarioPassword, setUsuarioPassword] = useState('');
  const [inicioExitoso, setInicioExitoso] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const irACorreo = (e) => {
    e.preventDefault();
    navigate('/ingresarcorreo');
  };

  function cambiarUsuarioEmail(e) {
    setUsuarioEmail(e.target.value);
  }

  function cambiarUsuarioPassword(e) {
    setUsuarioPassword(e.target.value);
  }

  function ingresarUsuario(e) {
    e.preventDefault();
    setErrorMensaje('');
    setInicioExitoso('');
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
        const token = responseConverted.token;
        const decoded = jwtDecode(token);
        localStorage.setItem('usuario_email', decoded.usuario_email);
        localStorage.setItem('usuario_id', decoded.usuario_id);
        setInicioExitoso('¡Inicio de sesión exitoso! Redirigiendo a tu portal...');
        setTimeout(() => {
          navigate('/dashboardpage');
        }, 2000);
      })
      .catch(error => {
        console.log(error);
        setErrorMensaje('No se pudo iniciar sesión. Verifica tus datos e intenta de nuevo.');
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <form className='formulario mt-5 mb-5 p-4 bg-white rounded shadow'>
            <h2 className="form-title text-center mb-4">Inicio de Sesión</h2>
            {location.state?.message && (
              <div className="alert alert-success" role="alert">
                {location.state.message}
              </div>
            )}
            {inicioExitoso && <div className="alert alert-success">{inicioExitoso}</div>}
            {errorMensaje && <div className="alert alert-danger">{errorMensaje}</div>}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input onChange={cambiarUsuarioEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
              <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
              <input onChange={cambiarUsuarioPassword} type="password" className="form-control" id="exampleInputPassword1" required />
            </div>
            <div className="mb-3">
              <a href="#" className="forgot-password-link" onClick={irACorreo}>¿Olvidaste tu contraseña?</a>
            </div>
            <div className="d-grid">
              <button type="submit" onClick={ingresarUsuario} className="btn btn-primary">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formularioinicio;