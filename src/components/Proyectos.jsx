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
          if (!response.ok) throw new Error('El proyecto aun tiene tareas y pagos asociados');
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
        <div id='sec-proyect' className="">
          <label htmlFor="project-select" className="form-label d-flex justify-content-center">Selecciona un Proyecto:</label>
          <select id="project-select" className="form-select" onChange={manejarSeleccionProyecto}>
            <option value="">Selecciona un proyecto...</option>
            {proyectos.map((proyecto) => (
              <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>
                {proyecto.proyecto_nombre}
              </option>
            ))}
          </select>
          <button id='btn-proyecto-nuevo' className='btn m-3' onClick={irAProyectoNuevo}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
          <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
          </svg></button>
        </div>
      </div>
      {proyectoSeleccionado ? (
        <div className="seccion-proyectos">
          <h1 className="d-flex justify-content-center">{nombreProyectoSeleccionado}</h1>
          <h5 className="d-flex justify-content-center mt-3">Presupuesto: ${presupuesto.toFixed(2)}</h5>
          <Tareas proyectoSeleccionado={proyectoSeleccionado} />
          <Pagos proyectoSeleccionado={proyectoSeleccionado} />
          <div className='d-flex justify-content-center'>
            <button id='btn-eliminar-proyecto' className='btn m-5' onClick={eliminarProyecto}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <p id='proyectos-p' className="text-center">Selecciona un proyecto para ver las tareas y pagos asociados.</p>
      )}
    </div>
  );
}

export default Proyectos;