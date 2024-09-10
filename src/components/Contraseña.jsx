import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

function Contraseña() {
  const { email, codigoVerificado } = useContext(RecoveryContext);
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeContraseña, setMensajeContraseña] = useState('');
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

    if (!email || !codigoVerificado || !nuevaContrasena) {
      setMensajeError('Email, código de verificación y nueva contraseña son requeridos.');
      return;
    }

    const codigoVerificadoString = codigoVerificado ? 'true' : 'false';

    fetch('https://api-freelancehub.vercel.app/usuarios/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_email: email,
        otp: codigoVerificadoString,
        new_password: nuevaContrasena,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Error al cambiar la contraseña');
          });
        }
        return response.json();
      })
      .then(() => {
        setMensajeExito('Contraseña cambiada con éxito');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((error) => {
        console.error('Error al cambiar la contraseña:', error);
        setMensajeError(`Hubo un problema al cambiar la contraseña. Intenta nuevamente. ${error.message}`);
      });
  };

  const validarContraseña = (e) => {
    const contraseña = e.target.value;
    const longitudMinima = 8;
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const tieneSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);

    if (contraseña.length >= longitudMinima && tieneMayuscula && tieneSimbolo) {
      setMensajeContraseña("La contraseña es válida.");
    } else {
      setMensajeContraseña("La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo.");
    }
  };

  return (
    <div id='contraseña-form' className="container p-5">
      <h2>Cambiar Contraseña</h2>
      {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
      {mensajeExito && <div className="alert alert-success" role="alert">{mensajeExito}</div>}
      <div className="mb-3 mt-4">
        <label htmlFor="nuevaContrasena" className="form-label">Nueva Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="nuevaContrasena"
          value={nuevaContrasena}
          onChange={(e) => { setNuevaContrasena(e.target.value); validarContraseña(e); }}
          placeholder="Ingresa tu nueva contraseña"
        />
        <div id="passwordHelp" className="form-text" style={{ color: mensajeContraseña === "La contraseña es válida." ? "blue" : "red" }}>
          {mensajeContraseña}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="confirmarContrasena"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
          placeholder="Confirma tu nueva contraseña"
        />
      </div>
      <button className="btn" onClick={cambiarContrasena}>
        Cambiar Contraseña
      </button>
    </div>
  );
}

export default Contraseña;