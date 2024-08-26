import React, { useState } from 'react';

function Proyectos() {
  let [proyectoSeleccionado, setproyectoSeleccionado] = useState('');
  let [pagos, setPagos] = useState([]);
  let [porcentaje, setPorcentaje] = useState(0);
  let [monto, setMonto] = useState('');
  let [fecha, setFecha] = useState('');
  let [archivo, setArchivo] = useState(null);

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

  return (
    <div>
      <div className="content flex-grow-1 p-4">
        <div className="d-flex justify-content-around align-items-center m-5">
          <div className=''>
            <label htmlFor="project-select" className="form-label">Selecciona un Proyecto:</label>
            <select id="project-select" className="form-select" onChange={(e) => setproyectoSeleccionado(e.target.value)}>
              <option value="">Selecciona un proyecto...</option>
              <option value="Proyecto 1">Proyecto 1</option>
              <option value="Proyecto 2">Proyecto 2</option>
              <option value="Proyecto 3">Proyecto 3</option>
            </select>
          </div>
        </div>
      </div>
      {proyectoSeleccionado && (
        <div className="seccion-proyectos d-flex">
          <div className="tab-content p-3">
            <h1 className="d-flex justify-content-center">{proyectoSeleccionado}</h1>
            <div className="contenido-tareas m-5">
              <h2>Tareas del Proyecto</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tarea</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha Límite</th>
                    <th scope="col">Completada</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Diseño de la página principal</td>
                    <td>Crear y diseñar la página principal del sitio web.</td>
                    <td>2024-09-15</td>
                    <td><input type="checkbox" /></td>
                    <td>
                      <button className="btn btn-sm me-3 btn-success">Editar</button>
                      <button className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button id="add-task-btn" className="btn btn-primary my-3">Agregar tarea</button>
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
                    <th scope="col">Subir Comprobante</th>
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
                      <td>{pago.archivo ? pago.archivo.name : 'Ningún archivo seleccionado'}</td>
                      <td>{pago.fecha}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminarPago(index)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>{pagos.length + 1}</td>
                    <td>
                      <input type="number" className="form-control" placeholder="%" value={porcentaje} onChange={(e) => setPorcentaje(Number(e.target.value))}/>
                    </td>
                    <td>
                      <input type="text" className="form-control" placeholder="$0" value={monto} onChange={(e) => setMonto(e.target.value)}/>
                    </td>
                    <td>
                      <input type="file" className="form-control" onChange={(e) => setArchivo(e.target.files[0])}
                      />
                    </td>
                    <td>
                      <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={agregarPago}>Agregar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={progreso} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{ width: `${progreso}%` }}>{progreso.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proyectos;