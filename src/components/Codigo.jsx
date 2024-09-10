import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

const Codigo = () => {
  const { codigo, setCodigo, setCodigoVerificado, email } = useContext(RecoveryContext);
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [reintentar, setReintentar] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();

  const verificarCodigo = () => {
    if (isNaN(codigoIngresado) || parseInt(codigoIngresado) !== codigo) {
      setMensajeError('El código ingresado es incorrecto. Intenta nuevamente.');
    } else {
      setCodigoVerificado(true);
      navigate('/cambiarcontraseña');
    }
  };

  const reenviarCodigo = () => {
    const nuevoCodigo = Math.floor(Math.random() * 9000 + 1000);
    setCodigo(nuevoCodigo);

    fetch('https://api-freelancehub.vercel.app/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Nuevo código de verificación para FreelanceHub',
        recipients: [email],
        body: 
        `¡Gracias por usar FreelanceHub!

        Para completar el proceso de verificación de tu correo electrónico, por favor utiliza el nuevo código:
        
        Código de Verificación: ${nuevoCodigo}
        
        Este código es válido por 1 min. Si tienes algún problema o necesitas ayuda, no dudes en contactarnos.
        
        El equipo de FreelanceHub
        
        freelancehub.cl
        [contacto@freelancehub.cl]`
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(() => {
        setMensajeExito('Nuevo código enviado.');
        setTiempoRestante(60);
        setReintentar(false);
      })
      .catch((error) => {
        console.error('Error al reenviar el código:', error);
        setMensajeError('Hubo un problema al reenviar el código. Intenta nuevamente.');
      });
  };

  useEffect(() => {
    if (tiempoRestante > 0) {
      const temporizador = setTimeout(() => setTiempoRestante(tiempoRestante - 1), 1000);
      return () => clearTimeout(temporizador);
    } else {
      setReintentar(true);
    }
  }, [tiempoRestante]);

  return (
    <div id='codigo-form' className="container p-5">
      <h2>Validar Código</h2>
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      <div className="mb-3 mt-4">
        <label htmlFor="codigo" className="form-label">Ingresa el código que recibiste</label>
        <input
          type="text"
          className="form-control"
          id="codigo"
          value={codigoIngresado}
          onChange={(e) => setCodigoIngresado(e.target.value)}
          placeholder="Código de verificación"
        />
      </div>
      <button className="btn btn-primary" onClick={verificarCodigo}>
        Verificar Código
      </button>
      <div className="mt-3">
        {reintentar ? (
          <a className="d-flex justify-content-center" onClick={reenviarCodigo} style={{ cursor: 'pointer' }}>
            Reenviar código
          </a>
        ) : (
          <p className='text-center'>Reenviar código disponible en {tiempoRestante} segundos</p>
        )}
      </div>
    </div>
  );
};

export default Codigo;
