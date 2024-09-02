import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Formnuevoproyecto() {
  const [nombre, setNombre] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clientId, setClientId] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api-freelancehub.vercel.app/clientes")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.clientes)) {
          setClientes(data.clientes);
        } else {
          console.error('La respuesta de clientes no es un array:', data);
          setErrorMensaje('La respuesta de clientes no es un array.');
        }
      })
      .catch(error => {
        console.error('Error al obtener clientes:', error);
        setErrorMensaje('No se pudo obtener la lista de clientes.');
      });
  }, []);

  function agregarNombre(e) {
    setNombre(e.target.value);
  }

  function agregarPresupuesto(e) {
    setPresupuesto(e.target.value);
  }

  function agregarFechaInicio(e) {
    setFechaInicio(e.target.value);
  }

  function agregarFechaTermino(e) {
    setFechaTermino(e.target.value);
  }

  function agregarDescripcion(e) {
    setDescripcion(e.target.value);
  }

  function agregarTipo(e) {
    setTipo(e.target.value);
  }

  function seleccionarCliente(e) {
    setClientId(e.target.value);
  }

  const AgregarProyecto = (e) => {
    e.preventDefault();

    fetch("https://api-freelancehub.vercel.app/proyectos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 'USER_ID',
        proyecto_nombre: nombre,
        proyecto_presupuesto: Number(presupuesto),
        proyecto_inicio: fechaInicio,
        proyecto_termino: fechaTermino,
        proyecto_descripcion: descripcion,
        proyecto_tipo: tipo,
        client_id: clientId,
      })
    })
    .then(response => response.json())
    .then(responseConverted => {
      console.log("¡El proyecto se ha registrado correctamente!");
      console.log(responseConverted);
      navigate('/dashboardpage');
    })
    .catch(error => {
      console.log(error);
      setErrorMensaje('No se pudo agregar el proyecto. Verifica la información.');
    });
  }

  return (
    <div className="formulario container mt-5 mb-5">
      <h2 className="form-title mb-4">Crea un nuevo proyecto</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">Nombre del Proyecto</label>
          <input type="text" className="form-control" id="projectName" placeholder="Ingrese el nombre del proyecto" value={nombre} onChange={agregarNombre} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="projectBudget" className="form-label">Presupuesto</label>
          <input type="number" className="form-control" id="projectBudget" placeholder="Ingrese el presupuesto del proyecto" value={presupuesto} onChange={agregarPresupuesto} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Fecha de Inicio</label>
          <input type="date" className="form-control" id="startDate" value={fechaInicio} onChange={agregarFechaInicio} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">Fecha de Término</label>
          <input type="date" className="form-control" id="endDate" value={fechaTermino} onChange={agregarFechaTermino} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">Descripción del Proyecto</label>
          <textarea className="form-control" id="projectDescription" rows="4" placeholder="Ingrese la descripción del proyecto" value={descripcion} onChange={agregarDescripcion} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="projectType" className="form-label">Tipo de Proyecto</label>
          <select className="form-select" id="projectType" value={tipo} onChange={agregarTipo} required>
            <option value="" disabled>Seleccione el tipo de proyecto</option>
            <option value="Desarrollo de Software">Desarrollo de Software</option>
            <option value="Diseño Gráfico">Diseño Gráfico</option>
            <option value="Investigación">Investigación</option>
            <option value="Marketing">Marketing</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="clientSelect" className="form-label">Selecciona el Cliente</label>
          <select className="form-select" id="clientSelect" value={clientId} onChange={seleccionarCliente} required>
            <option value="" disabled>Seleccione el cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.cliente_id} value={cliente.cliente_id}>
                {cliente.cliente_nombre}
              </option>
            ))}
          </select>
        </div>
        {errorMensaje && (
          <div className="alert alert-danger" role="alert">
            {errorMensaje}
          </div>
        )}
        <div className="Nuevoproyecto-btns d-flex justify-content-around">
          <button type="button" className="btn m-4">Atrás</button>
          <button type="button" className="btn m-4" onClick={AgregarProyecto}>Siguiente</button>
        </div>
      </form>
    </div>
  );
}

export default Formnuevoproyecto;