import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Formnuevocliente() {
  const [esClienteNuevo, setEsClienteNuevo] = useState(false);
  const [nombreCliente, setNombreCliente] = useState('');
  const [rutCliente, setRutCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('usuario_id');
    fetch("https://api-freelancehub.vercel.app/get-usuario/" + userId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => setUserId(data.usuario.usuario_id))
      .catch(error => {
        console.error('Error al obtener user_id:', error);
        setErrorMensaje('No se pudo obtener la información del usuario.');
      });
  }, []);

  let toggleNuevoCliente = (event) => {
    let seleccion = event.target.value;
    setEsClienteNuevo(seleccion === 'no');
  };

  function agregarNombreCliente(e) {
    setNombreCliente(e.target.value);
  }

  function agregarRutCliente(e) {
    setRutCliente(e.target.value);
  }

  function agregarEmailCliente(e) {
    setEmailCliente(e.target.value);
  }

  function agregarTelefonoCliente(e) {
    setTelefonoCliente(e.target.value);
  }

  function agregarClienteNuevo(e) {
    e.preventDefault();

    if (!esClienteNuevo) {
      navigate('/nuevocliente/nuevoproyecto');
      return;
    }

    const clienteData = {
      usuario_id: userId,
      cliente_nombre: nombreCliente,
      cliente_email: emailCliente,
      cliente_tel: telefonoCliente,
      cliente_rut: rutCliente,
    };

    fetch('https://api-freelancehub.vercel.app/create-cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clienteData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos. Intenta nuevamente');
        }
        return response.json();
      })
      .then(responseConverted => {
        console.log('El cliente se ha registrado correctamente!');
        console.log(responseConverted);
        navigate('/nuevocliente/nuevoproyecto', { state: { clienteId: responseConverted.cliente_id } });
      })
      .catch(error => {
        console.error('Error al agregar cliente:', error);
        setErrorMensaje('No se pudo agregar el cliente. Verifica la información.');
      });
  };

  return (
    <div className="formulario container mt-5">
      <h2 className="form-title">Crear Nuevo Cliente</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="clienteExistente" className="form-label">¿Es un cliente existente?</label>
          <select className="form-select" id="clienteExistente" onChange={toggleNuevoCliente}>
            <option value="si">Sí</option>
            <option value="no">No, es un cliente nuevo</option>
          </select>
        </div>
        {esClienteNuevo && (
          <div id="nuevoClienteCampos">
            <div className="mb-3">
              <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
              <input type="text" className="form-control" id="nombreCliente" value={nombreCliente} onChange={agregarNombreCliente} required />
            </div>
            <div className="mb-3">
              <label htmlFor="rutCliente" className="form-label">Rut</label>
              <input type="text" className="form-control" id="rutCliente" value={rutCliente} onChange={agregarRutCliente} required />
            </div>
            <div className="mb-3">
              <label htmlFor="emailCliente" className="form-label">Email</label>
              <input type="email" className="form-control" id="emailCliente" value={emailCliente} onChange={agregarEmailCliente} required />
            </div>
            <div className="mb-3">
              <label htmlFor="telefonoCliente" className="form-label">Teléfono</label>
              <input type="text" className="form-control" id="telefonoCliente" value={telefonoCliente} onChange={agregarTelefonoCliente} required />
            </div>
          </div>
        )}
        {errorMensaje && (
          <div className="alert alert-danger" role="alert">
            {errorMensaje}
          </div>
        )}
        <div className="text-center">
          <button id="nuevoCliente-btn" type="button" className="btn" onClick={agregarClienteNuevo}>Siguiente</button>
        </div>
      </form>
    </div>
  );
}

export default Formnuevocliente;