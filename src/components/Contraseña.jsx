import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

function Contraseña() {
  const { email, codigoVerificado } = useContext(RecoveryContext);
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();

  const cambiarContrasena = () => {
    setMensajeError('');
    setMensajeExito('');

    if (!codigoVerificado) {
      setMensajeError('No has verificado el código correctamente.');
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setMensajeError('Las contraseñas no coinciden.');
      return;
    }

    fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, nuevaContrasena })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cambiar la contraseña');
        }
        return response.json();
      })
      .then(() => {
        setMensajeExito('Contraseña cambiada con éxito');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((error) => {
        console.error('Error al cambiar la contraseña:', error);
        setMensajeError('Hubo un problema al cambiar la contraseña. Intenta nuevamente.');
      });
  };

  return (
    <div id='contraseña-form' className="container p-5">
      <h2>Cambiar Contraseña</h2>
      {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
      {mensajeExito && <div className="alert alert-success" role="alert">{mensajeExito}</div>}
      <div className="mb-3 mt-4">
        <label htmlFor="nuevaContrasena" className="form-label">Nueva Contraseña</label>
        <input type="password" className="form-control" id="nuevaContrasena" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} placeholder="Ingresa tu nueva contraseña"/>
      </div>
      <div className="mb-3">
        <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña</label>
        <input type="password" className="form-control" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} placeholder="Confirma tu nueva contraseña"/>
      </div>
      <button className="btn" onClick={cambiarContrasena}>
        Cambiar Contraseña
      </button>
    </div>
  );
};

export default Contraseña;