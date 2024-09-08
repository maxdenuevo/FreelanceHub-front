import React, { useState, useEffect } from 'react';

function Pagos({ proyectoSeleccionado }) {
  const [pagos, setPagos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [mostrarAgregarPago, setMostrarAgregarPago] = useState(false);
  const [pagoMonto, setPagoMonto] = useState('');
  const [pagoFecha, setPagoFecha] = useState('');
  const [pagoCompletado, setPagoCompletado] = useState(false);
  const [pagoComprobante, setPagoComprobante] = useState(null);
  const [tareaSeleccionada, setTareaSeleccionada] = useState('');
  const [editarPagoId, setEditarPagoId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (proyectoSeleccionado) {
      fetchPagos();
      fetchTareas();
    } else {
      setPagos([]);
      setTareas([]);
    }
  }, [proyectoSeleccionado]);

  const fetchPagos = () => {
    fetch(`https://api-freelancehub.vercel.app/pagos/${proyectoSeleccionado}`)
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
  };

  const fetchTareas = () => {
    fetch(`https://api-freelancehub.vercel.app/tareas/${proyectoSeleccionado}`)
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
  };

  const agregarPago = (e) => {
    e.preventDefault();
    const url = editarPagoId ? `https://api-freelancehub.vercel.app/pago/${editarPagoId}` : 'https://api-freelancehub.vercel.app/create-pago';
    const method = editarPagoId ? 'PATCH' : 'POST';

    const formData = new FormData();
    formData.append('proyecto_id', proyectoSeleccionado);
    formData.append('tarea_id', tareaSeleccionada);
    formData.append('pago_monto', pagoMonto);
    formData.append('pago_fecha', pagoFecha);
    formData.append('pago_completado', pagoCompletado);
    if (pagoComprobante) {
      formData.append('pago_comprobante', pagoComprobante);
    }

    fetch(url, {
      method: method,
      body: formData,
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al guardar el pago');
        return response.json();
      })
      .then(responseConverted => {
        const nuevoPago = responseConverted.pago;
        if (editarPagoId) {
          setPagos(prevPagos => prevPagos.map(pago => pago.pago_id === editarPagoId ? nuevoPago : pago));
          setEditarPagoId(null);
        } else {
          setPagos(prevPagos => [...prevPagos, nuevoPago]);
        }
        setMostrarAgregarPago(false);
        resetFormulario();
        setError('');
        fetchPagos();
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

  const resetFormulario = () => {
    setTareaSeleccionada('');
    setPagoMonto('');
    setPagoFecha('');
    setPagoCompletado(false);
    setPagoComprobante(null);
  };

  const manejarEdicionPago = (pago) => {
    setTareaSeleccionada(pago.tarea_id || '');
    setPagoMonto(pago.pago_monto || ''); 
    setPagoFecha(pago.pago_fecha || '');
    setPagoCompletado(pago.pago_completado || false);
    setEditarPagoId(pago.pago_id);
    setMostrarAgregarPago(true);
  };

  return (
    <div className="contenido-pagos mt-5">
      <h2>Pagos del Proyecto</h2>
      <p className='text-center'>En esta sección podrás gestionar los pagos del proyecto: agregar, ver, eliminar y marcar pagos como completados.</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tarea</th>
            <th scope="col">Monto</th>
            <th scope="col">Fecha</th>
            <th scope="col">Completado</th>
            <th scope="col">Comprobante</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.length > 0 ? (
            pagos.map((pago, index) => {
              const tarea = tareas.find(tarea => tarea && tarea.tarea_id === (pago ? pago.tarea_id : undefined));
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tarea ? tarea.tarea_nombre : ''}</td>
                  <td>{pago && pago.pago_monto ? pago.pago_monto : ''}</td>
                  <td>{pago && pago.pago_fecha ? pago.pago_fecha : ''}</td>
                  <td>{pago && pago.pago_completado ? 'Sí' : 'No'}</td>
                  <td>
                    {pago && pago.pago_comprobante ? (
                      <a href={pago.pago_comprobante} target="_blank" rel="noopener noreferrer">Ver Comprobante</a>
                    ) : ''}
                  </td>
                  <td>
                    <button onClick={() => manejarEdicionPago(pago)} className="btn btn-sm btn-primary">Editar</button>
                    <button onClick={() => eliminarPago(index)} className="btn btn-sm btn-danger ms-2">Eliminar</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No hay pagos registrados para este proyecto.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="btn mb-3" onClick={() => setMostrarAgregarPago(!mostrarAgregarPago)}>
        {mostrarAgregarPago ? 'Cancelar' : 'Agregar Pago'}
      </button>
      {mostrarAgregarPago && (
        <form>
          <div className="mb-3">
            <label htmlFor="tareaSeleccionada" className="form-label">Tarea:</label>
            <select id="tareaSeleccionada" className="form-control" value={tareaSeleccionada} onChange={(e) => setTareaSeleccionada(e.target.value)} required>
              <option value="">Seleccionar tarea</option>
              {tareas.map(tarea => (
                <option key={tarea.tarea_id} value={tarea.tarea_id}>{tarea.tarea_nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="pagoMonto" className="form-label">Monto del Pago:</label>
            <input type="number" step="0.01" className="form-control" id="pagoMonto" value={pagoMonto} onChange={(e) => setPagoMonto(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="pagoFecha" className="form-label">Fecha del Pago:</label>
            <input type="date" className="form-control" id="pagoFecha" value={pagoFecha} onChange={(e) => setPagoFecha(e.target.value)} required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="pagoCompletado" checked={pagoCompletado} onChange={(e) => setPagoCompletado(e.target.checked)} />
            <label className="form-check-label" htmlFor="pagoCompletado">Pago Completado</label>
          </div>
          <div className="mb-3">
            <label htmlFor="pagoComprobante" className="form-label">Comprobante:</label>
            <input type="file" className="form-control" id="pagoComprobante" onChange={(e) => setPagoComprobante(e.target.files[0])} />
          </div>
          <button type="button" className="btn" onClick={agregarPago}>Guardar Pago</button>
        </form>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Pagos;
