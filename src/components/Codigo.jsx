import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

const Codigo = () => {
  const { codigo, setCodigo, setCodigoVerificado, email } = useContext(RecoveryContext);
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [reintentar, setReintentar] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(60);
<<<<<<< HEAD
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const navigate = useNavigate();

  const verificarCodigo = () => {
    if (isNaN(codigoIngresado) || parseInt(codigoIngresado) !== codigo) {
      setMensajeError('El código ingresado es incorrecto. Intenta nuevamente.');
    } else {
      setCodigoVerificado(true);
      navigate('/cambiarcontraseña');
=======
  const navigate = useNavigate();

  const verificarCodigo = () => {
    if (parseInt(codigoIngresado) === codigo) {
      setCodigoVerificado(true);
      navigate('/cambiarcontraseña');
    } else {
      alert('El código ingresado es incorrecto. Intenta nuevamente.');
>>>>>>> d26d8f1b86e135260d40de86611d713ea9d113ef
    }
  };

  const reenviarCodigo = () => {
    const nuevoCodigo = Math.floor(Math.random() * 9000 + 1000);
    setCodigo(nuevoCodigo);

    fetch('https://api-freelancehub.vercel.app/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
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
=======
      body: JSON.stringify({ correo: email, codigo: nuevoCodigo }),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Nuevo código enviado.');
>>>>>>> d26d8f1b86e135260d40de86611d713ea9d113ef
        setTiempoRestante(60);
        setReintentar(false);
      })
      .catch((error) => {
        console.error('Error al reenviar el código:', error);
<<<<<<< HEAD
        setMensajeError('Hubo un problema al reenviar el código. Intenta nuevamente.');
=======
        alert('Hubo un problema al reenviar el código. Intenta nuevamente.');
>>>>>>> d26d8f1b86e135260d40de86611d713ea9d113ef
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
<<<<<<< HEAD
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
=======
      <div className="mb-3 mt-4">
        <label htmlFor="codigo" className="form-label">Ingresa el código que recibiste</label>
        <input type="text" className="form-control" id="codigo" value={codigoIngresado} onChange={(e) => setCodigoIngresado(e.target.value)} placeholder="Código de verificación"/>
      </div>
      <button className="btn" onClick={verificarCodigo}>
>>>>>>> d26d8f1b86e135260d40de86611d713ea9d113ef
        Verificar Código
      </button>
      <div className="mt-3">
        {reintentar ? (
<<<<<<< HEAD
          <a className="d-flex justify-content-center" onClick={reenviarCodigo} style={{ cursor: 'pointer' }}>
=======
          <a className="d-flex justify-content-center" onClick={reenviarCodigo}>
>>>>>>> d26d8f1b86e135260d40de86611d713ea9d113ef
            Reenviar código
          </a>
        ) : (
          <p className='text-center'>Reenviar código disponible en {tiempoRestante} segundos</p>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Codigo;
=======
export default Codigo;
>>>>>>> d26d8f1b86e135260d40de86611d713ea9d113ef
