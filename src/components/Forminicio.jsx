import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Formularioinicio() {

  const [usuarioEmail, setUsuarioEmail] = useState('');
  const [usuarioPassword, setUsuarioPassword] = useState('');
  const navigate = useNavigate();

  function cambiarUsuarioEmail(e){
    setUsuarioEmail(e.target.value);
  }

  function cambiarUsuarioPassword(e){
    setUsuarioPassword(e.target.value);
  }

  function ingresarUsuario(e){
    e.preventDefault();
    console.log('Datos preparados para el ingreso 👨');
    console.log(usuarioEmail, usuarioPassword);

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
        return response.json();
      })
      .then(responseConverted => {
        console.log("El usuario se ha autenticado correctamente! 👨‍🚀");
        console.log(responseConverted);
        navigate('/dashboardpage');
      })
      .catch(error => {
        console.log(error)
        //NOTA: Se debe mostrar un mensaje de error al usuaro
      })
  }


  return (
    <form className='formulario mt-5'>
        <h2 className="form-title">Inicio de Sesión</h2>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input onChange={cambiarUsuarioEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
    <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
    <input onChange={cambiarUsuarioPassword} type="password" className="form-control" id="exampleInputPassword1"></input>
  </div>
  <div className="mb-3">
    <a href="#" className="forgot-password-link">¿olvidaste tu contraseña?</a>
  </div>
  <button type="button" 
  onClick={ingresarUsuario}
  className="btn">Ingresar</button>
</form>
  );
}

export default Formularioinicio;