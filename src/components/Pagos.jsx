import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

  const formatoFecha = (fecha) => {
    try {
      const fechaDate = new Date(fecha);
      const fechaLocal = new Date(fechaDate.getTime() + fechaDate.getTimezoneOffset() * 60000);
      return format(fechaLocal, 'dd MMMM yyyy', { locale: es });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return fecha;
    }
  };

  return (
    <div className="contenido-pagos mt-5">
      <h2>Pagos del Proyecto</h2>
      <p className='text-center'>En esta sección podrás gestionar los pagos del proyecto: agregar, ver, eliminar y marcar pagos como completados.</p>
      <div className="table-responsive">
        <table className="table table-striped w-100">
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
                    <td>{pago && pago.pago_fecha ? formatoFecha(pago.pago_fecha) : ''}</td>
                    <td>{pago && pago.pago_completado ? 'Sí' : 'No'}</td>
                    <td>
                      {pago && pago.pago_comprobante ? (
                        <a href={pago.pago_comprobante} target="_blank" rel="noopener noreferrer">Ver Comprobante</a>
                      ) : ''}
                    </td>
                    <td>
                      <button onClick={() => manejarEdicionPago(pago)} className="btn btn-sm btn-primary m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </button>
                      <button onClick={() => eliminarPago(index)} className="btn btn-sm btn-danger m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                      </button>
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
      </div>
      <button className="btn btn-sm mb-3 mt-3" onClick={() => setMostrarAgregarPago(!mostrarAgregarPago)}>
      {mostrarAgregarPago ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
          <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 0 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414 2.707 14.707a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 1a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H1a1 1 0 0 1 0-2h6V2a1 1 0 0 1 1-1z"/>
        </svg>
      )}
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
          <button type="button" className="btn btn-sm" onClick={agregarPago}>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-floppy2" viewBox="0 0 16 16">
             <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
           </svg></button>
        </form>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Pagos;
