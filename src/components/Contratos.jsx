import React, { useState } from 'react';

function Contratos() {
    const [contratos, setContratos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [cliente, setCliente] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [presupuesto, setPresupuesto] = useState('');
    const [archivo, setArchivo] = useState(null);

    const agregarContrato = (e) => {
        e.preventDefault();
        const nuevoContrato = {
            nombreProyecto,
            cliente,
            fechaInicio,
            fechaTermino,
            presupuesto,
            archivo: archivo ? URL.createObjectURL(archivo) : null,
            nombreArchivo: archivo ? archivo.name : 'No se cargó ningún archivo',
        };
        setContratos([...contratos, nuevoContrato]);
        setNombreProyecto('');
        setCliente('');
        setFechaInicio('');
        setFechaTermino('');
        setPresupuesto('');
        setArchivo(null);
        setMostrarFormulario(false);
    };

    const manejarCambioArchivo = (e) => {
        setArchivo(e.target.files[0]);
    };

    const eliminarContrato = (index) => {
        setContratos(contratos.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-5">
            <h1 className="d-flex justify-content-center m-5">Contratos</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                {contratos.map((contrato, index) => (
                    <div className="col" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{contrato.nombreProyecto}</h4>
                                <p className="card-text"><strong>Cliente:</strong> {contrato.cliente}</p>
                                <p className="card-text"><strong>Fecha de Inicio:</strong> {contrato.fechaInicio}</p>
                                <p className="card-text"><strong>Fecha de Término:</strong> {contrato.fechaTermino}</p>
                                <p className="card-text"><strong>Presupuesto:</strong> ${contrato.presupuesto}</p>
                                <p className="card-text"><strong>Archivo:</strong> 
                                    {contrato.archivo ? (
                                        <a href={contrato.archivo} target="_blank" rel="noopener noreferrer">
                                            {contrato.nombreArchivo}
                                        </a>
                                    ) : (
                                        'No se cargó ningún archivo'
                                    )}
                                </p>
                            </div>
                            <div className="card-footer d-flex justify-content-end">
                                <button className="btn" onClick={() => eliminarContrato(index)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="btns-contractosform d-flex justify-content-center mb-5">
                <button className="btn" onClick={() => setMostrarFormulario(true)}>
                    Agregar nuevo contrato
                </button>
            </div>

            <div className={`modal ${mostrarFormulario ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarFormulario ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h4 className="modal-title">Agregar Nuevo Contrato</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={agregarContrato}>
                                <div className="mb-3">
                                    <label htmlFor="nombreContrato" className="form-label">Nombre del Proyecto</label>
                                    <input type="text" className="form-control" id="nombreContrato" value={nombreProyecto} onChange={(e) => setNombreProyecto(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cliente" className="form-label">Cliente</label>
                                    <input type="text" className="form-control" id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
                                    <input type="date" className="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fechaTermino" className="form-label">Fecha de Término</label>
                                    <input type="date" className="form-control" id="fechaTermino" value={fechaTermino} onChange={(e) => setFechaTermino(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="presupuesto" className="form-label">Presupuesto</label>
                                    <input type="number" className="form-control" id="presupuesto" value={presupuesto} onChange={(e) => setPresupuesto(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="archivo" className="form-label">Adjuntar Archivo</label>
                                    <input type="file" className="form-control" id="archivo" onChange={manejarCambioArchivo} />
                                </div>
                                <div className='btns-contractosform d-flex justify-content-center'>
                                    <button type="button" className="btn me-5" onClick={() => setMostrarFormulario(false)}>
                                        Cerrar
                                    </button>
                                    <button type="submit" className="btn ms-5">Guardar Contrato</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {mostrarFormulario && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default Contratos;