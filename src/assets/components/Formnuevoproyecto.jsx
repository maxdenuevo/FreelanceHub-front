import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Formnuevoproyecto({ agregarProyecto }) {
  const [nombre, setNombre] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProyecto = {
      nombre,
      presupuesto: Number(presupuesto),
      fechaInicio,
      fechaTermino,
      descripcion,
      tipo,
      pagos: []
    };
    agregarProyecto(nuevoProyecto);
    navigate('/proyectos');
  };

  return (
    <div className="formulario container mt-5 mb-5">
      <h2 className="form-title mb-4">Crea un nuevo proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">Nombre del Proyecto</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            placeholder="Ingrese el nombre del proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectBudget" className="form-label">Presupuesto</label>
          <input
            type="number"
            className="form-control"
            id="projectBudget"
            placeholder="Ingrese el presupuesto del proyecto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Fecha de Inicio</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">Fecha de Término</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={fechaTermino}
            onChange={(e) => setFechaTermino(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">Descripción del Proyecto</label>
          <textarea
            className="form-control"
            id="projectDescription"
            rows="4"
            placeholder="Ingrese la descripción del proyecto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectType" className="form-label">Tipo de Proyecto</label>
          <select
            className="form-select"
            id="projectType"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="" disabled>Seleccione el tipo de proyecto</option>
            <option value="Desarrollo de Software">Desarrollo de Software</option>
            <option value="Diseño Gráfico">Diseño Gráfico</option>
            <option value="Investigación">Investigación</option>
            <option value="Marketing">Marketing</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="Nuevoproyecto-btns d-flex justify-content-around">
          <button type="button" className="btn m-4" onClick={() => navigate('/proyectos')}>Atrás</button>
          <button type="submit" className="btn m-4">Guardar Proyecto</button>
        </div>
      </form>
    </div>
  );
}

export default Formnuevoproyecto;