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

  return (
    <div className="contenido-tareas mt-5">
      <h2>Tareas del Proyecto</h2>
      <p className='text-center'>En esta sección podrás gestionar actividades del proyecto: agregar, ver, eliminar y marcar tareas como completadas, con fechas límite y recordatorios para un mejor seguimiento.</p>
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
                <td>{tarea?.tarea_fecha || ''}</td>
                <td>{tarea?.tarea_descripcion || ''}</td>
                <td>{tarea?.tarea_completada ? 'Sí' : 'No'}</td>
                <td>{tarea?.tarea_necesita_pago ? 'Sí' : 'No'}</td>
                <td>
                  <button onClick={() => manejarEdicionTarea(tarea)} className="btn btn-sm btn-primary">Editar</button>
                  <button onClick={() => eliminarTarea(tarea?.tarea_id)} className="btn btn-sm btn-danger ms-2">Eliminar</button>
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
      <button className="btn mb-3" onClick={() => setMostrarAgregarTarea(!mostrarAgregarTarea)}>
        {mostrarAgregarTarea ? 'Cancelar' : 'Agregar Tarea'}
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
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Tareas;
