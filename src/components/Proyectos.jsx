import React, { useState, useEffect } from 'react';

function Proyectos() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
  const [nombreProyectoSeleccionado, setNombreProyectoSeleccionado] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [presupuestoProyecto, setPresupuestoProyecto] = useState(0);
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

  useEffect(() => {
    const userId = localStorage.getItem('usuario_id')
    fetch('https://api-freelancehub.vercel.app/proyectos/' + userId)
      .then(response => response.json())
      .then(responseConverted => {
        setProyectos(responseConverted.proyectos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (proyectoSeleccionado) {
      fetch(`https://api-freelancehub.vercel.app/tareas?proyecto_id=${proyectoSeleccionado}`)
        .then(response => response.json())
        .then(responseConverted => {
          setTareas(responseConverted.tareas);
        })
        .catch(error => {
          console.log(error);
        });

      fetch(`https://api-freelancehub.vercel.app/pagos?proyecto_id=${proyectoSeleccionado}`)
        .then(response => response.json())
        .then(responseConverted => {
          setPagos(responseConverted.pagos);
        })
        .catch(error => {
          console.log(error);
        });

      fetch(`https://api-freelancehub.vercel.app/proyectos/${proyectoSeleccionado}`)
        .then(response => response.json())
        .then(responseConverted => {
          setPresupuestoProyecto(responseConverted.proyecto_presupuesto);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setTareas([]);
      setPagos([]);
      setPresupuestoProyecto(0);
    }
  }, [proyectoSeleccionado]);

  const manejarSeleccionProyecto = (e) => {
    const proyectoId = e.target.value;
    const proyecto = proyectos.find(proyecto => proyecto.proyecto_id === proyectoId);
    setProyectoSeleccionado(proyectoId);
    setNombreProyectoSeleccionado(proyecto ? proyecto.proyecto_nombre : '');
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

    fetch('https://api-freelancehub.vercel.app/create-tarea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        proyecto_id: proyectoSeleccionado,
        tarea_nombre: tareaNombre,
        tarea_descripcion: descripcionTarea,
        tarea_fecha: fechaLimiteTarea,
        tarea_completada: tareaCompletada,
        tarea_necesita_pago: pendientePagoTarea,
      })
    })
      .then(response => response.json())
      .then(responseConverted => {
        console.log('¡La tarea se agregó correctamente!');
        setTareas([...tareas, responseConverted.tarea]);
        setMostrarAgregarTarea(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const eliminarTarea = (index) => {
    const tarea = tareas[index];
    fetch(`https://api-freelancehub.vercel.app/tareas/${tarea.tarea_id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        console.log('¡La tarea se ha eliminado correctamente!');
        setTareas(tareas.filter((_, i) => i !== index));
      })
      .catch(error => {
        console.log(error);
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

    fetch('https://api-freelancehub.vercel.app/create-pago', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(responseConverted => {
        console.log('¡El pago se agregó correctamente!');
        setPagos([...pagos, responseConverted.pago]);
        setMostrarAgregarPago(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const eliminarPago = (index) => {
    const pago = pagos[index];
    fetch(`https://api-freelancehub.vercel.app/pagos/${pago.pago_id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        console.log('¡El pago se ha eliminado correctamente!');
        setPagos(pagos.filter((_, i) => i !== index));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="content flex-grow-1 p-4">
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
                            <button onClick={() => eliminarTarea(index)} className="btn btn-danger btn-sm">Eliminar</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No hay tareas disponibles.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button className="btn btn-primary" onClick={() => setMostrarAgregarTarea(!mostrarAgregarTarea)}>
                  {mostrarAgregarTarea ? 'Atrás' : 'Agregar Nueva Tarea'}
                </button>
                {mostrarAgregarTarea && (
                  <form onSubmit={agregarTarea} className="mt-3">
                    <div className="mb-3">
                      <label htmlFor="tareaNombre" className="form-label">Nombre de la Tarea:</label>
                      <input type="text" className="form-control" id="tareaNombre" value={tareaNombre} onChange={agregarNombreTarea} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descripcionTarea" className="form-label">Descripción:</label>
                      <textarea className="form-control" id="descripcionTarea" value={descripcionTarea} onChange={agregarDescripcionTarea} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fechaLimiteTarea" className="form-label">Fecha Límite:</label>
                      <input type="date" className="form-control" id="fechaLimiteTarea" value={fechaLimiteTarea} onChange={agregarFechaLimiteTarea} required/>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="tareaCompletada" checked={tareaCompletada} onChange={agregarTareaCompletada}/>
                      <label htmlFor="tareaCompletada" className="form-check-label">Completada</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="pendientePagoTarea" checked={pendientePagoTarea} onChange={agregarPendientePago}/>
                      <label htmlFor="pendientePagoTarea" className="form-check-label">Pendiente de Pago</label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Agregar Tarea</button>
                  </form>
                )}
              </div>
              <div className="contenido-pagos mt-5">
                <h2>Pagos del Proyecto</h2>
                <p className='text-center'>Aquí puedes gestionar los pagos del proyecto, desde agregar pagos hasta eliminar o marcar como completados.</p>
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
                          <td>{pago.pago_monto}</td>
                          <td>{pago.pago_fecha}</td>
                          <td>{pago.pago_completado ? 'Sí' : 'No'}</td>
                          <td>
                            {pago.pago_comprobante ? (
                              <a href={pago.pago_comprobante} target="_blank" rel="noopener noreferrer">Ver Comprobante</a>
                            ) : 'N/A'}
                          </td>
                          <td>
                            <button onClick={() => eliminarPago(index)} className="btn btn-danger btn-sm">Eliminar</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No hay pagos disponibles.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button className="btn btn-primary" onClick={() => setMostrarAgregarPago(!mostrarAgregarPago)}>
                  {mostrarAgregarPago ? 'Atrás' : 'Agregar Nuevo Pago'}
                </button>
                {mostrarAgregarPago && (
                  <form onSubmit={agregarPago} className="mt-3">
                    <div className="mb-3">
                      <label htmlFor="tareaSelect" className="form-label">Selecciona Tarea:</label>
                      <select id="tareaSelect" className="form-select" value={tareaSeleccionada} onChange={seleccionarTarea} required>
                        <option value="">Selecciona una tarea...</option>
                        {tareas.map((tarea) => (
                          <option key={tarea.tarea_id} value={tarea.tarea_id}>
                            {tarea.tarea_nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pagoMonto" className="form-label">Monto del Pago:</label>
                      <input type="number" step="0.01" className="form-control" id="pagoMonto" value={pagoMonto} onChange={agregarPagoMonto} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pagoFecha" className="form-label">Fecha del Pago:</label>
                      <input type="date" className="form-control" id="pagoFecha" value={pagoFecha} onChange={agregarPagoFecha} required/>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="pagoCompletado" checked={pagoCompletado} onChange={agregarPagoCompletado}/>
                      <label htmlFor="pagoCompletado" className="form-check-label">Completado</label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pagoComprobante" className="form-label">Comprobante:</label>
                      <input type="file" className="form-control" id="pagoComprobante" onChange={agregarPagoComprobante}/>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Agregar Pago</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Selecciona un proyecto para ver sus tareas y pagos.</p>
        )}
      </div>
    </div>
  );
}

export default Proyectos;