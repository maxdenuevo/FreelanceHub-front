import React, { useState, useEffect } from 'react';

function Tareas({ proyectoSeleccionado }) {
  const [tareas, setTareas] = useState([]);
  const [mostrarAgregarTarea, setMostrarAgregarTarea] = useState(false);
  const [tareaNombre, setTareaNombre] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');
  const [fechaLimiteTarea, setFechaLimiteTarea] = useState('');
  const [tareaCompletada, setTareaCompletada] = useState(false);
  const [pendientePagoTarea, setPendientePagoTarea] = useState(false);
  const [editarTareaId, setEditarTareaId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (proyectoSeleccionado) {
      fetchTareas();
    } else {
      setTareas([]);
    }
  }, [proyectoSeleccionado]);

  const fetchTareas = () => {
    fetch(`https://api-freelancehub.vercel.app/tareas/${proyectoSeleccionado}`)
      .then(response => {
        if (!response.ok) throw new Error('Error al obtener las tareas');
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos:', data);
        if (data && Array.isArray(data.tareas)) {
          setTareas(data.tareas);
        } else {
          console.error('Datos de tareas no están en el formato esperado');
          setTareas([]);
        }
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    const url = editarTareaId ? `https://api-freelancehub.vercel.app/tarea/${editarTareaId}` : 'https://api-freelancehub.vercel.app/create-tarea';
    const method = editarTareaId ? 'PATCH' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        proyecto_id: proyectoSeleccionado,
        tarea_nombre: tareaNombre,
        tarea_fecha: fechaLimiteTarea,
        tarea_descripcion: descripcionTarea,
        tarea_completada: tareaCompletada,
        tarea_necesita_pago: pendientePagoTarea,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al guardar la tarea');
        return response.json();
      })
      .then(responseConverted => {
        console.log('Respuesta de la API:', responseConverted);
        fetchTareas();
        setTareaNombre('');
        setFechaLimiteTarea('');
        setDescripcionTarea('');
        setTareaCompletada(false);
        setPendientePagoTarea(false);
        setMostrarAgregarTarea(false);
        setEditarTareaId(null);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const eliminarTarea = (id) => {
    fetch(`https://api-freelancehub.vercel.app/tarea/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al eliminar la tarea');
        return response.json();
      })
      .then(() => {
        console.log('¡La tarea se ha eliminado correctamente!');
        fetchTareas();
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const manejarEdicionTarea = (tarea) => {
    setTareaNombre(tarea?.tarea_nombre || '');
    setFechaLimiteTarea(tarea?.tarea_fecha || '');
    setDescripcionTarea(tarea?.tarea_descripcion || '');
    setTareaCompletada(tarea?.tarea_completada || false);
    setPendientePagoTarea(tarea?.tarea_necesita_pago || false);
    setEditarTareaId(tarea?.tarea_id || null);
    setMostrarAgregarTarea(true);
  };

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="contenido-tareas mt-5">
      <h2>Tareas del Proyecto</h2>
      <p className='text-center'>En esta sección podrás gestionar actividades del proyecto: agregar, ver, eliminar y marcar tareas como completadas, con fechas límite y recordatorios para un mejor seguimiento.</p>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tarea</th>
              <th scope="col">Fecha Límite</th>
              <th scope="col">Descripción</th>
              <th scope="col">Completada</th>
              <th scope="col">Pendiente de Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.length > 0 ? (
              tareas.map((tarea, index) => (
                <tr key={tarea?.tarea_id || index}>
                  <td>{index + 1}</td>
                  <td>{tarea?.tarea_nombre || ''}</td>
                  <td>{tarea?.tarea_fecha ? formatearFecha(tarea.tarea_fecha) : ''}</td>
                  <td>{tarea?.tarea_descripcion || ''}</td>
                  <td>{tarea?.tarea_completada ? 'Sí' : 'No'}</td>
                  <td>{tarea?.tarea_necesita_pago ? 'Sí' : 'No'}</td>
                  <td>
                    <button onClick={() => manejarEdicionTarea(tarea)} className="btn btn-sm btn-primary m-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                    </button>
                    <button onClick={() => eliminarTarea(tarea?.tarea_id)} className="btn btn-sm btn-danger m-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No hay tareas asignadas para este proyecto.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="btn btn-sm mb-3 mt-3" onClick={() => setMostrarAgregarTarea(!mostrarAgregarTarea)}>
  {mostrarAgregarTarea ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
      <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 0 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414 2.707 14.707a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
      <path d="M8 1a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H1a1 1 0 0 1 0-2h6V2a1 1 0 0 1 1-1z"/>
    </svg>
  )}
</button>
      {mostrarAgregarTarea && (
        <form onSubmit={agregarTarea}>
          <div className="mb-3">
            <label htmlFor="tareaNombre" className="form-label">Nombre de la Tarea:</label>
            <input type="text" className="form-control" id="tareaNombre" value={tareaNombre} onChange={(e) => setTareaNombre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcionTarea" className="form-label">Descripción:</label>
            <textarea className="form-control" id="descripcionTarea" rows="3" value={descripcionTarea} onChange={(e) => setDescripcionTarea(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaLimiteTarea" className="form-label">Fecha Límite:</label>
            <input type="date" className="form-control" id="fechaLimiteTarea" value={fechaLimiteTarea} onChange={(e) => setFechaLimiteTarea(e.target.value)} required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="tareaCompletada" checked={tareaCompletada} onChange={(e) => setTareaCompletada(e.target.checked)} />
            <label className="form-check-label" htmlFor="tareaCompletada">Completada</label>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="pendientePagoTarea" checked={pendientePagoTarea} onChange={(e) => setPendientePagoTarea(e.target.checked)} />
            <label className="form-check-label" htmlFor="pendientePagoTarea">Pendiente de Pago</label>
          </div>
          <button type="submit" className="btn btn-sm btn-primary">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-floppy2" viewBox="0 0 16 16">
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
           </svg>
          </button>
        </form>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Tareas;
