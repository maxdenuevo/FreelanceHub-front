import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

const Correo = () => {
  const { setEmail, setCodigo } = useContext(RecoveryContext);
  const [correo, setCorreo] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();

  const enviarCodigo = () => {
    setMensajeError('');

    if (!correo) {
      setMensajeError('Por favor ingresa tu correo electrónico');
      return;
    }

    const codigo = Math.floor(Math.random() * 9000 + 1000);
    setCodigo(codigo);

    // Asegúrate de que `correo` sea una lista de un solo elemento
    fetch('https://api-freelancehub.vercel.app/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Recuperación de Contraseña',
        recipients: [correo],  // Enviando el correo en una lista
        body: `Tu código de recuperación es: ${codigo}`
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(() => {
        setEmail(correo);
        navigate('/validarcodigo');
      })
      .catch((error) => {
        console.error('Error al enviar el código:', error);
        setMensajeError('Hubo un problema al enviar el código. Intenta nuevamente.');
      });
  };

  return (
    <div id='correo-form' className="container p-5">
      <h2>Recuperar Contraseña</h2>
      {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
      <div className='mt-4'>
        <label htmlFor="correo" className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ingresa tu correo"
        />
      </div>
      <button className="btn btn-primary" onClick={enviarCodigo}>
        Validar correo
      </button>
    </div>
  );
};

export default Correo;