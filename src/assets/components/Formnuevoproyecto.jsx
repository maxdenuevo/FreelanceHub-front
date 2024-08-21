import React from 'react';


function Formnuevoproyecto() {
  return (
    <div className="formulario container mt-5 mb-5">
    <h2 className="form-title mb-4">Crea un nuevo proyecto</h2>
    <form>
      <div className="mb-3">
        <label for="projectName" className="form-label">Nombre del Proyecto</label>
        <input type="text" className="form-control" id="projectName" placeholder="Ingrese el nombre del proyecto"></input>
      </div>
      <div className="mb-3">
        <label for="projectBudget" className="form-label">Presupuesto</label>
        <input type="number" className="form-control" id="projectBudget" placeholder="Ingrese el presupuesto del proyecto"></input>
      </div>
      <div className="mb-3">
        <label for="startDate" className="form-label">Fecha de Inicio</label>
        <input type="date" className="form-control" id="startDate"></input>
      </div>
      <div className="mb-3">
        <label for="endDate" className="form-label">Fecha de Término</label>
        <input type="date" className="form-control" id="endDate"></input>
      </div>
      <div className="mb-3">
        <label for="projectDescription" className="form-label">Descripción del Proyecto</label>
        <textarea className="form-control" id="projectDescription" rows="4" placeholder="Ingrese la descripción del proyecto"></textarea>
      </div>
      <div className="mb-3">
        <label for="projectType" className="form-label">Tipo de Proyecto</label>
        <select className="form-select" id="projectType">
          <option selected disabled>Seleccione el tipo de proyecto</option>
          <option value="1">Desarrollo de Software</option>
          <option value="2">Diseño Gráfico</option>
          <option value="3">Investigación</option>
          <option value="4">Marketing</option>
          <option value="5">Otro</option>
        </select>
      </div>
      <div className="Nuevoproyecto-btns d-flex justify-content-around">
        <button type="button" className="btn btn-secondary m-4">Atrás</button>
        <button type="submit" className="btn btn-primary m-4">Siguiente</button>
      </div>
    </form>
    </div>
  );
}

export default Formnuevoproyecto;