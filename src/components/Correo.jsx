import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

const Correo = () => {
  const { setEmail, setCodigo } = useContext(RecoveryContext);
  const [correo, setCorreo] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();

  const enviarCodigo = () => {
    setMensajeError('');
    setMensajeExito('');

    if (!correo) {
      setMensajeError('Por favor ingresa tu correo electrónico');
      return;
    }

    const codigo = Math.floor(Math.random() * 9000 + 1000);
    setCodigo(codigo);

    fetch('https://api-freelancehub.vercel.app/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Codigo de verificacion para FreelanceHub',
        recipients: [correo],
        body: 
        `¡Gracias por usar FreelanceHub!

        Para completar el proceso de verificación de tu correo electrónico, por favor utiliza el siguiente código:
        
        Código de Verificación: ${codigo}
        
        Este código es válido por 1 min. Si tienes algún problema o necesitas ayuda, no dudes en contactarnos.
        
        El equipo de FreelanceHub
        
        freelancehub.cl
        [contacto@freelancehub.cl]`
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
        setMensajeExito('El código de verificación ha sido enviado a tu correo electrónico.');
        setTimeout(() => navigate('/validarcodigo'), 2000);
      })
      .catch((error) => {
        console.error('Error al enviar el código:', error);
        setMensajeError('Hubo un problema al enviar el código. Intenta nuevamente.');
      });
  };

  return (
    <div id='correo-form' className="container p-5">
      <h2>Cambiar Contraseña</h2>
      {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
      {mensajeExito && <div className="alert alert-success" role="alert">{mensajeExito}</div>}
      <div className='mt-4'></div>
      {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
      <div className='mt-4'>
        <label htmlFor="correo" className="form-label">Correo electrónico</label>
        <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Ingresa tu correo"/>
      </div>
      <button className="btn btn-primary" onClick={enviarCodigo}>
        Validar correo
      </button>
    </div>
  );
};

export default Correo;