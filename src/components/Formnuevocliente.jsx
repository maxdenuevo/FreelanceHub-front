import React, { useState } from 'react';

function Formnuevocliente() {
  let [esClienteNuevo, setEsClienteNuevo] = useState(false);
  let toggleNuevoCliente = (event) => {
    let seleccion = event.target.value;
    setEsClienteNuevo(seleccion === 'no');
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
        {!esClienteNuevo && (
          <div id="clienteExistenteCampos" className="mb-3">
            <label htmlFor="clienteID" className="form-label">Seleccionar Cliente</label>
            <select className="form-select" id="clienteID">
              <option>Seleccionar un cliente...</option>
              <option value="1">Jen</option>
              <option value="2">Max</option>
              <option value="3">Isaac</option>
            </select>
          </div>
        )}
        {esClienteNuevo && (
          <div id="nuevoClienteCampos">
            <div className="mb-3">
              <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
              <input type="text" className="form-control" id="nombreCliente" />
            </div>
            <div className="mb-3">
              <label htmlFor="nombreCliente" className="form-label">Rut</label>
              <input type="text" className="form-control" id="nombreCliente" />
            </div>
            <div className="mb-3">
              <label htmlFor="emailCliente" className="form-label">Email</label>
              <input type="email" className="form-control" id="emailCliente" />
            </div>
            <div className="mb-3">
              <label htmlFor="telefonoCliente" className="form-label">Teléfono</label>
              <input type="text" className="form-control" id="telefonoCliente" />
            </div>
            <div className="mb-3">
              <label htmlFor="direccionCliente" className="form-label">Dirección</label>
              <input type="text" className="form-control" id="direccionCliente" />
            </div>
          </div>
        )}
        <div className="text-center">
          <button id="nuevoCliente-btn" type="submit" className="btn">Guardar Cliente</button>
        </div>
      </form>
    </div>
  );
}

export default Formnuevocliente;