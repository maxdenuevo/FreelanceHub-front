import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Perfil from '../images/Perfil.png';

function Perfilusuario() {
  const [usuario, setUsuario] = useState(null);
  const [usuarioNombre, setUsuarioNombre] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate();

  const irACambiarContraseña = () => {
    navigate('/ingresarcorreo');
  };

  useEffect(() => {
    const userId = localStorage.getItem('usuario_id');

    fetch(`https://api-freelancehub.vercel.app/get-usuario/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario.');
        }
        return response.json();
      })
      .then((data) => {
        setUsuario(data.usuario);
        setUsuarioNombre(data.usuario.usuario_nombre);
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
        setErrorMensaje('No se pudo obtener la información del usuario.');
      });
  }, []);

  return (
    <div className="perfil-usuario">
      <div className="row d-flex align-items-center">
        <div className="col-12 col-md-4 text-center">
          <img id="img-perfil" src={Perfil} alt="" className="" />
        </div>
        <div className="col-12 col-md-8">
          <h2 className="perfil-titulo">{usuarioNombre}</h2>
          {errorMensaje && (
            <div className="alert alert-danger" role="alert">
              {errorMensaje}
            </div>
          )}
          {usuario ? (
            <div className="perfil-detalles">
              <div className="mb-3">
                <label className="form-label mt-4">Tu correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={usuario.usuario_email}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tu RUT</label>
                <input
                  type="text"
                  className="form-control"
                  value={usuario.usuario_rut}
                  readOnly
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary me-2 mt-4"
                  onClick={irACambiarContraseña}
                >
                  Cambiar contraseña
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p>Cargando la información...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfilusuario;
