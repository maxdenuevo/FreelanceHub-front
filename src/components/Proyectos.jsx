import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Proyectos() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
  const [nombreProyectoSeleccionado, setNombreProyectoSeleccionado] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [pagoMonto, setPagoMonto] = useState('');
  const [pagoFecha, setPagoFecha] = useState('');
  const [pagoComprobante, setPagoComprobante] = useState(null);
  const [pagoCompletado, setPagoCompletado] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState('');
  const [tareaNombre, setTareaNombre] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');
  const [fechaLimiteTarea, setFechaLimiteTarea] = useState('');
  const [tareaCompletada, setTareaCompletada] = useState(false);
  const [pendientePagoTarea, setPendientePagoTarea] = useState(false);
  const [mostrarAgregarTarea, setMostrarAgregarTarea] = useState(false);
  const [mostrarAgregarPago, setMostrarAgregarPago] = useState(false);
  const [editarTareaId, setEditarTareaId] = useState(null);
  const [editarPagoId, setEditarPagoId] = useState(null);
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
      fetch(`https://api-freelancehub.vercel.app/tareas?proyecto_id=${proyectoSeleccionado}`)
        .then(response => {
          if (!response.ok) throw new Error('Error al obtener las tareas');
          return response.json();
        })
        .then(responseConverted => {
          setTareas(responseConverted.tareas);
          setError('');
        })
        .catch(error => {
          setError(error.message);
        });

      fetch(`https://api-freelancehub.vercel.app/pagos?proyecto_id=${proyectoSeleccionado}`)
        .then(response => {
          if (!response.ok) throw new Error('Error al obtener los pagos');
          return response.json();
        })
        .then(responseConverted => {
          setPagos(responseConverted.pagos);
          setError('');
        })
        .catch(error => {
          setError(error.message);
        });
    } else {
      setTareas([]);
      setPagos([]);
    }
  }, [proyectoSeleccionado]);

  const manejarSeleccionProyecto = (e) => {
    const proyectoId = e.target.value;
    const proyecto = proyectos.find(proyecto => proyecto.proyecto_id === proyectoId);
    setProyectoSeleccionado(proyectoId);
    setNombreProyectoSeleccionado(proyecto ? proyecto.proyecto_nombre : '');
  };

  const eliminarProyecto = () => {
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
          setProyectoSeleccionado('');
          setNombreProyectoSeleccionado('');
          setError('');
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  function agregarNombreTarea(e) {
    setTareaNombre(e.target.value);
  }

  function agregarDescripcionTarea(e) {
    setDescripcionTarea(e.target.value);
  }

  function agregarFechaLimiteTarea(e) {
    setFechaLimiteTarea(e.target.value);
  }

  function agregarTareaCompletada(e) {
    setTareaCompletada(e.target.checked);
  }

  function agregarPendientePago(e) {
    setPendientePagoTarea(e.target.checked);
  }

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
        tarea_descripcion: descripcionTarea,
        tarea_fecha: fechaLimiteTarea,
        tarea_completada: tareaCompletada,
        tarea_necesita_pago: pendientePagoTarea,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al guardar la tarea');
        return response.json();
      })
      .then(responseConverted => {
        console.log('¡La tarea se actualizó correctamente!');
        if (editarTareaId) {
          setTareas(prevTareas => prevTareas.map(tarea =>
            tarea.tarea_id === editarTareaId ? responseConverted.tarea : tarea
          ));
          setEditarTareaId(null);
        } else {
          setTareas(prevTareas => [...prevTareas, responseConverted.tarea]);
        }
        setMostrarAgregarTarea(false);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const eliminarTarea = (index) => {
    const tarea = tareas[index];
    fetch(`https://api-freelancehub.vercel.app/tarea/${tarea.tarea_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al eliminar la tarea');
        return response.json();
      })
      .then(() => {
        console.log('¡La tarea se ha eliminado correctamente!');
        setTareas(prevTareas => prevTareas.filter((_, i) => i !== index));
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  function agregarPagoMonto(e) {
    setPagoMonto(e.target.value);
  }

  function agregarPagoFecha(e) {
    setPagoFecha(e.target.value);
  }

  function agregarPagoCompletado(e) {
    setPagoCompletado(e.target.checked);
  }

  function agregarPagoComprobante(e) {
    setPagoComprobante(e.target.files[0]);
  }

  function seleccionarTarea(e) {
    setTareaSeleccionada(e.target.value);
  }

  const agregarPago = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tarea_id', tareaSeleccionada);
    formData.append('pago_monto', pagoMonto);
    formData.append('pago_fecha', pagoFecha);
    formData.append('pago_completado', pagoCompletado);
    if (pagoComprobante) {
      formData.append('pago_comprobante', pagoComprobante);
    }

    const url = editarPagoId ? `https://api-freelancehub.vercel.app/pago/${editarPagoId}` : 'https://api-freelancehub.vercel.app/create-pago';
    const method = editarPagoId ? 'PATCH' : 'POST';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al guardar el pago');
        return response.json();
      })
      .then(responseConverted => {
        console.log('¡El pago se actualizó correctamente!');
        if (editarPagoId) {
          setPagos(prevPagos => prevPagos.map(pago =>
            pago.pago_id === editarPagoId ? responseConverted.pago : pago
          ));
          setEditarPagoId(null);
        } else {
          setPagos(prevPagos => [...prevPagos, responseConverted.pago]);
        }
        setMostrarAgregarPago(false);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const eliminarPago = (index) => {
    const pago = pagos[index];
    fetch(`https://api-freelancehub.vercel.app/pago/${pago.pago_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al eliminar el pago');
        return response.json();
      })
      .then(() => {
        console.log('¡El pago se ha eliminado correctamente!');
        setPagos(prevPagos => prevPagos.filter((_, i) => i !== index));
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const manejarEdicionTarea = (tarea) => {
    setTareaNombre(tarea.tarea_nombre);
    setDescripcionTarea(tarea.tarea_descripcion);
    setFechaLimiteTarea(tarea.tarea_fecha);
    setTareaCompletada(tarea.tarea_completada);
    setPendientePagoTarea(tarea.tarea_necesita_pago);
    setEditarTareaId(tarea.tarea_id);
    setMostrarAgregarTarea(true);
  };

  const manejarEdicionPago = (pago) => {
    setPagoMonto(pago.pago_monto);
    setPagoFecha(pago.pago_fecha);
    setPagoCompletado(pago.pago_completado);
    setEditarPagoId(pago.pago_id);
    setMostrarAgregarPago(true);
  };

  const irAProyectoNuevo = () => {
    navigate('/nuevocliente');
  };

  return (
    <div>
      <div className="content flex-grow-1 p-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex m-5">
          <div className="sec-proyect">
            <label htmlFor="project-select" className="form-label">Selecciona un Proyecto:</label>
            <select id="project-select" className="form-select" onChange={manejarSeleccionProyecto}>
              <option value="">Selecciona un proyecto...</option>
              {proyectos.map((proyecto) => (
                <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>
                  {proyecto.proyecto_nombre}
                </option>
              ))}
            </select>
            <button id='btn-proyecto-nuevo' className='btn mt-5' onClick={irAProyectoNuevo}>Agregar proyecto nuevo</button>
          </div>
        </div>
        {proyectoSeleccionado ? (
          <div className="seccion-proyectos">
            <div className="tab-content p-3">
              <h1 className="d-flex justify-content-center">{nombreProyectoSeleccionado}</h1>
              <div className="contenido-tareas mt-5">
                <h2>Tareas del Proyecto</h2>
                <p className='text-center'>En esta sección podrás gestionar actividades del proyecto: agregar, ver, eliminar y marcar tareas como completadas, con fechas límite y recordatorios para un mejor seguimiento.</p>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tarea</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Fecha Límite</th>
                      <th scope="col">Completada</th>
                      <th scope="col">Pendiente de Pago</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tareas.length > 0 ? (
                      tareas.map((tarea, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{tarea.tarea_nombre}</td>
                          <td>{tarea.tarea_descripcion}</td>
                          <td>{tarea.tarea_fecha}</td>
                          <td>{tarea.tarea_completada ? 'Sí' : 'No'}</td>
                          <td>{tarea.tarea_necesita_pago ? 'Sí' : 'No'}</td>
                          <td>
                            <button onClick={() => manejarEdicionTarea(tarea)} className="btn btn-sm">Editar</button>
                            <button onClick={() => eliminarTarea(index)} className="btn btn-sm ms-2">Eliminar</button>
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
                <button className="btn" onClick={() => setMostrarAgregarTarea(!mostrarAgregarTarea)}>
                  {mostrarAgregarTarea ? 'Cancelar' : 'Agregar Tarea'}
                </button>
                {mostrarAgregarTarea && (
                  <form onSubmit={agregarTarea}>
                    <div className="mb-3">
                      <label htmlFor="tareaNombre" className="form-label">Nombre de la Tarea:</label>
                      <input type="text" className="form-control" id="tareaNombre" value={tareaNombre} onChange={agregarNombreTarea} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descripcionTarea" className="form-label">Descripción:</label>
                      <textarea className="form-control" id="descripcionTarea" rows="3" value={descripcionTarea} onChange={agregarDescripcionTarea} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fechaLimiteTarea" className="form-label">Fecha Límite:</label>
                      <input type="date" className="form-control" id="fechaLimiteTarea" value={fechaLimiteTarea} onChange={agregarFechaLimiteTarea} required />
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="tareaCompletada" checked={tareaCompletada} onChange={agregarTareaCompletada} />
                      <label className="form-check-label" htmlFor="tareaCompletada">Tarea Completada</label>
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="pendientePagoTarea" checked={pendientePagoTarea} onChange={agregarPendientePago} />
                      <label className="form-check-label" htmlFor="pendientePagoTarea">Pendiente de Pago</label>
                    </div>
                    <button type="submit" className="btn">Guardar Tarea</button>
                  </form>
                )}
              </div>

              <div className="contenido-pagos mt-5">
                <h2>Pagos del Proyecto</h2>
                <p className='text-center'>Aquí puedes gestionar los pagos asociados al proyecto: agregar, ver, eliminar y marcar pagos como completados.</p>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Monto</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Completado</th>
                      <th scope="col">Comprobante</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagos.length > 0 ? (
                      pagos.map((pago, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>${pago.pago_monto}</td>
                          <td>{pago.pago_fecha}</td>
                          <td>{pago.pago_completado ? 'Sí' : 'No'}</td>
                          <td>{pago.pago_comprobante ? <a href={pago.pago_comprobante} target="_blank" rel="noopener noreferrer">Ver Comprobante</a> : 'No Disponible'}</td>
                          <td>
                            <button onClick={() => manejarEdicionPago(pago)} className="btn btn-sm">Editar</button>
                            <button onClick={() => eliminarPago(index)} className="btn btn-sm ms-2">Eliminar</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No hay pagos registrados para este proyecto.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button className="btn" onClick={() => setMostrarAgregarPago(!mostrarAgregarPago)}>
                  {mostrarAgregarPago ? 'Cancelar' : 'Agregar Pago'}
                </button>
                {mostrarAgregarPago && (
                  <form onSubmit={agregarPago}>
                    <div className="mb-3">
                      <label htmlFor="pagoMonto" className="form-label">Monto del Pago:</label>
                      <input type="number" className="form-control" id="pagoMonto" value={pagoMonto} onChange={agregarPagoMonto} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pagoFecha" className="form-label">Fecha del Pago:</label>
                      <input type="date" className="form-control" id="pagoFecha" value={pagoFecha} onChange={agregarPagoFecha} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pagoComprobante" className="form-label">Comprobante:</label>
                      <input type="file" className="form-control" id="pagoComprobante" onChange={agregarPagoComprobante} />
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="pagoCompletado" checked={pagoCompletado} onChange={agregarPagoCompletado} />
                      <label className="form-check-label" htmlFor="pagoCompletado">Pago Completado</label>
                    </div>
                    <button type="submit" className="btn">Guardar Pago</button>
                  </form>
                )}
              </div>
            </div>
            <div className='d-flex justify-content-center'>
            <button className='btn' onClick={() => eliminarProyecto(index)}>Eliminar Proyecto</button>
          </div>
          </div>
        ) : (
          <p className="text-center">Selecciona un proyecto para ver las tareas y pagos asociados.</p>
        )}
      </div>
    </div>
  );
}

export default Proyectos;