import React, { useState, useEffect } from 'react';
import Perfil from '../images/Perfil.png';

function Perfilusuario() {

  
  // const [usuario, setUsuario] = useState(null);
  //const [errorMensaje, setErrorMensaje] = useState('');

  //useEffect(() => {
    //const userId = localStorage.getItem('usuario_id');

    //fetch("https://api-freelancehub.vercel.app/get-usuario/" + userId)
      //.then(response => {
       // if (!response.ok) {
          //throw new Error('Error al obtener los datos del usuario.');
        //}
       // return response.json();
      //})
      //.then(data => {
       // setUsuario(data.usuario);
      //})
      //.catch(error => {
        //console.error('Error al obtener el usuario:', error);
        //setErrorMensaje('No se pudo obtener la información del usuario.');
      //});
  //}, []);

  return (
    <div className="perfil-usuario">
      <div className="d-flex" >
      <img id='img-perfil' src={Perfil} alt="" />
      <div className='perfil-datos'>
      <h2 className="perfil-titulo">Nombre de usuario</h2>
        <div className="alert alert-danger" role="alert">
        </div>
        <div className="perfil-detalles">
          <div className="mb-3">
            <label className="form-label">Tu correo electrónico</label>
            <input type="email" className="form-control"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Tu RUT</label>
            <input type="text" className="form-control"/>
          </div>
        </div>
        <div className="text-center">
          <p>Cargando la información...</p>
        </div>
        <div className='d-flex justify-content-center'>
        <button type="button" className="btn me-2">Cambiar contraseña</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Perfilusuario;