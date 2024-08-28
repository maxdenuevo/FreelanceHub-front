import React, { useState, useEffect } from 'react';


function Proyectos() {

  useEffect(() => {
  
  }, []);

  let [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
  let [pagos, setPagos] = useState([]);
  let [tareas, setTareas] = useState([]);
  let [porcentaje, setPorcentaje] = useState(0);
  let [monto, setMonto] = useState('');
  let [fecha, setFecha] = useState('');
  let [archivo, setArchivo] = useState(null);
  let [tarea, setTarea] = useState('');
  let [descripcion, setDescripcion] = useState('');
  let [fechaLimite, setFechaLimite] = useState('');
  let [completada, setCompletada] = useState(false);
  let [recordatorioTarea, setRecordatorioTarea] = useState('');

  useEffect(() => {
  
  }, []);

  let presupuesto = 50000;
  let totalRecibido = pagos.reduce((acc, pago) => acc + (pago.porcentaje / 100) * presupuesto, 0);
  let progreso = (totalRecibido / presupuesto) * 100;

  let agregarPago = () => {
    setPagos([...pagos, { porcentaje, monto, archivo, fecha }]);
    setPorcentaje(0);
    setMonto('');
    setFecha('');
    setArchivo(null);
  };

  let eliminarPago = (index) => {
    let nuevosPagos = [...pagos];
    nuevosPagos.splice(index, 1);
    setPagos(nuevosPagos);
  };

  let agregarTarea = () => {
    setTareas([...tareas, { tarea, descripcion, fechaLimite, completada, recordatorioTarea }]);
    setTarea('');
    setDescripcion('');
    setFechaLimite('');
    setCompletada(false);
    setRecordatorioTarea('');
  };

  let eliminarTarea = (index) => {
    let nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  let toggleCompletada = (index) => {
    let nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  };

  return (
    <div>
      <div className="content flex-grow-1 p-4">
        <div className="d-flex m-5">
          <div className="sec-proyect">
            <label htmlFor="project-select" className="form-label">Selecciona un Proyecto:</label>
            <select id="project-select" className="form-select" onChange={(e) => setProyectoSeleccionado(e.target.value)}>
              <option value="">Selecciona un proyecto...</option>
              <option value="Proyecto 1">Proyecto 1</option>
              <option value="Proyecto 2">Proyecto 2</option>
              <option value="Proyecto 3">Proyecto 3</option>
            </select>
          </div>
        </div>
      </div>
      {proyectoSeleccionado && (
        <div className="seccion-proyectos">
          <div className="tab-content p-3">
            <h1 className="d-flex justify-content-center">{proyectoSeleccionado}</h1>
            <div className="contenido-tareas mt-5">
              <h2>Tareas del Proyecto</h2>
              <p>En esta sección podrás gestionar actividades del proyecto: agregar, ver, eliminar y marcar tareas como completadas, con fechas límite y recordatorios para un mejor seguimiento.</p>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tarea</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha Límite</th>
                    <th scope="col">Recordatorio</th>
                    <th scope="col">Completada</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tareas.map((tarea, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tarea.tarea}</td>
                      <td>{tarea.descripcion}</td>
                      <td>{tarea.fechaLimite}</td>
                      <td>{tarea.recordatorioTarea}</td>
                      <td>
                        <input type="checkbox" checked={tarea.completada} onChange={() => toggleCompletada(index)} />
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminarTarea(index)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>{tareas.length + 1}</td>
                    <td>
                      <input type="text" className="form-control" placeholder="Tarea" value={tarea} onChange={(e) => setTarea(e.target.value)} />
                    </td>
                    <td>
                      <input type="text" className="form-control" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </td>
                    <td>
                      <input type="date" className="form-control" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
                    </td>
                    <td>
                      <input type="date" className="form-control" value={recordatorioTarea} onChange={(e) => setRecordatorioTarea(e.target.value)} />
                    </td>
                    <td>
                      <input type="checkbox" disabled />
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={agregarTarea}>Agregar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="Contenido-pagos">
              <h2>Pagos del Proyecto</h2>
              <p className="d-flex justify-content-center"><strong>Presupuesto del Proyecto:</strong> ${presupuesto.toLocaleString()}</p>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"># de Pago</th>
                    <th scope="col">Porcentaje Recibido (%)</th>
                    <th scope="col">Monto Recibido</th>
                    <th scope="col">Ver Comprobante</th>
                    <th scope="col">Fecha de Pago</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{pago.porcentaje}%</td>
                      <td>${((pago.porcentaje / 100) * presupuesto).toLocaleString()}</td>
                      <td>
                        {pago.archivo ? (
                          <a href={URL.createObjectURL(pago.archivo)} target="_blank" rel="noopener noreferrer">
                            Ver archivo
                          </a>
                        ) : 'Ningún archivo seleccionado'}
                      </td>
                      <td>{pago.fecha}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminarPago(index)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>{pagos.length + 1}</td>
                    <td>
                      <input type="number" className="form-control" placeholder="%" value={porcentaje} onChange={(e) => setPorcentaje(Number(e.target.value))} />
                    </td>
                    <td>
                      <input type="text" className="form-control" placeholder="$0" value={monto} onChange={(e) => setMonto(e.target.value)} />
                    </td>
                    <td>
                      <input type="file" className="form-control" onChange={(e) => setArchivo(e.target.files[0])} />
                    </td>
                    <td>
                      <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={agregarPago}>Agregar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={progreso} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{ width: `${progreso}%` }}>{progreso}%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proyectos;