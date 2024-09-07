import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from '../App';

const Codigo = () => {
  const { codigo, setCodigo, setCodigoVerificado, email } = useContext(RecoveryContext);
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [reintentar, setReintentar] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const navigate = useNavigate();

  const verificarCodigo = () => {
    if (parseInt(codigoIngresado) === codigo) {
      setCodigoVerificado(true);
      navigate('/cambiarcontraseña');
    } else {
      alert('El código ingresado es incorrecto. Intenta nuevamente.');
    }
  };

  const reenviarCodigo = () => {
    const nuevoCodigo = Math.floor(Math.random() * 9000 + 1000);
    setCodigo(nuevoCodigo);

    fetch('https://api-freelancehub.vercel.app/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email, codigo: nuevoCodigo }),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Nuevo código enviado.');
        setTiempoRestante(60);
        setReintentar(false);
      })
      .catch((error) => {
        console.error('Error al reenviar el código:', error);
        alert('Hubo un problema al reenviar el código. Intenta nuevamente.');
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
      <div className="mb-3 mt-4">
        <label htmlFor="codigo" className="form-label">Ingresa el código que recibiste</label>
        <input type="text" className="form-control" id="codigo" value={codigoIngresado} onChange={(e) => setCodigoIngresado(e.target.value)} placeholder="Código de verificación"/>
      </div>
      <button className="btn" onClick={verificarCodigo}>
        Verificar Código
      </button>
      <div className="mt-3">
        {reintentar ? (
          <a className="d-flex justify-content-center" onClick={reenviarCodigo}>
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