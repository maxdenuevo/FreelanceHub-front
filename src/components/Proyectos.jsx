import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tareas from './Tareas';
import Pagos from './Pagos';

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [nombreProyectoSeleccionado, setNombreProyectoSeleccionado] = useState('');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [presupuesto, setPresupuesto] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('usuario_id');
    fetch(`https://api-freelancehub.vercel.app/proyectos/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error('Error al obtener los proyectos');
        return response.json();
      })
      .then(responseConverted => {
        setProyectos(responseConverted.proyectos);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (proyectoSeleccionado) {
      fetch(`https://api-freelancehub.vercel.app/proyecto/${proyectoSeleccionado}`)
        .then(response => {
          if (!response.ok) throw new Error('Error al obtener el presupuesto');
          return response.json();
        })
        .then(responseConverted => {
          console.log('Datos del proyecto:', responseConverted);
          const presupuestoValor = parseFloat(responseConverted.proyecto.proyecto_presupuesto);
          setPresupuesto(isNaN(presupuestoValor) ? 0 : presupuestoValor);
          setError('');
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [proyectoSeleccionado]);

  const manejarSeleccionProyecto = (e) => {
    const proyectoId = e.target.value;
    const proyecto = proyectos.find(proyecto => proyecto.proyecto_id === proyectoId);
    setProyectoSeleccionado(proyectoId);
    setNombreProyectoSeleccionado(proyecto ? proyecto.proyecto_nombre : '');
  };

  const eliminarProyecto = () => {
    if (!proyectoSeleccionado) {
      setError('No hay ningún proyecto seleccionado para eliminar.');
      return;
    }

    if (window.confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      fetch(`https://api-freelancehub.vercel.app/proyecto/${proyectoSeleccionado}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Error al eliminar el proyecto');
          return response.json();
        })
        .then(() => {
          console.log('¡El proyecto se ha eliminado correctamente!');
          setProyectos(prevProyectos => prevProyectos.filter(proyecto => proyecto.proyecto_id !== proyectoSeleccionado));
          setProyectoSeleccionado(null);
          setNombreProyectoSeleccionado('');
          setPresupuesto(0);
          setError('');
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const irAProyectoNuevo = () => {
    navigate('/nuevocliente');
  };

  return (
    <div id='proyectos-page'>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex m-5">
        <div id='sec-proyect' className="ms-5">
          <label htmlFor="project-select" className="form-label d-flex justify-content-center">Selecciona un Proyecto:</label>
          <select id="project-select" className="form-select" onChange={manejarSeleccionProyecto}>
            <option value="">Selecciona un proyecto...</option>
            {proyectos.map((proyecto) => (
              <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>
                {proyecto.proyecto_nombre}
              </option>
            ))}
          </select>
          <button id='btn-proyecto-nuevo' className='btn m-3' onClick={irAProyectoNuevo}>Agregar proyecto nuevo</button>
        </div>
      </div>
      {proyectoSeleccionado ? (
        <div className="seccion-proyectos">
          <h1 className="d-flex justify-content-center">{nombreProyectoSeleccionado}</h1>
          <h5 className="d-flex justify-content-center mt-3">Presupuesto: ${presupuesto.toFixed(2)}</h5>
          <Tareas proyectoSeleccionado={proyectoSeleccionado} />
          <Pagos proyectoSeleccionado={proyectoSeleccionado} />
          <div className='d-flex justify-content-center'>
            <button id='btn-eliminar-proyecto' className='btn m-5' onClick={eliminarProyecto}>Eliminar Proyecto</button>
          </div>
        </div>
      ) : (
        <p id='proyectos-p' className="text-center">Selecciona un proyecto para ver las tareas y pagos asociados.</p>
      )}
    </div>
  );
}

export default Proyectos;