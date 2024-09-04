import React, { useState, useEffect } from 'react';

function Contratos() {
    const [contratos, setContratos] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [plantillas, setPlantillas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [cliente, setCliente] = useState('');
    const [plantilla, setPlantilla] = useState('');
    const [archivo, setArchivo] = useState(null);

    useEffect(() => {
        fetch('https://api-freelancehub.vercel.app/contratos')
            .then(response => response.json())
            .then(responseConverted => setContratos(responseConverted.contratos))
            .catch(error => console.log(error));

        fetch('https://api-freelancehub.vercel.app/proyectos')
            .then(response => response.json())
            .then(responseConverted => setProyectos(responseConverted.proyectos))
            .catch(error => console.log(error));

        fetch('https://api-freelancehub.vercel.app/clientes')
            .then(response => response.json())
            .then(responseConverted => setClientes(responseConverted.clientes))
            .catch(error => console.log(error));

        fetch('https://api-freelancehub.vercel.app/plantillas')
            .then(response => response.json())
            .then(responseConverted => setPlantillas(responseConverted.plantillas))
            .catch(error => console.log(error));
    }, []);

    const agregarContrato = (e) => {
        e.preventDefault();

        const nuevoContrato = {
            cliente_id: cliente,
            plantilla_id: plantilla,
            proyecto_id: nombreProyecto,
            archivo: archivo ? URL.createObjectURL(archivo) : null,
        };

        fetch('https://api-freelancehub.vercel.app/contratos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoContrato),
        })
        .then(response => response.json())
        .then(responseConverted => {
            console.log("¡El contrato se ha registrado correctamente!");
            console.log(responseConverted);
            setMostrarFormulario(false);
        })
        .catch(error => {
            console.log(error);
            setErrorMensaje('No se pudo agregar el contrato. Verifica la información.');
        });
    };

    const eliminarContrato = (index) => {
        const contrato = contratos[index];
        fetch(`https://api-freelancehub.vercel.app/contratos/${contrato.contrato_id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(responseConverted => {
            console.log("¡El contrato se ha eliminado correctamente!");
            console.log(responseConverted);
            setContratos(contratos.filter((_, i) => i !== index));
        })
        .catch(error => {
            console.log(error);
            setErrorMensaje('No se pudo eliminar el contrato. Inténtalo de nuevo.');
        });
    };

    const manejarCambioArchivo = (e) => {
        setArchivo(e.target.files[0]);
    };

  return (
    <div id='contratos-div' className="container">
      <div id='titulo-contratos'>
        <h1 className="d-flex justify-content-center">Contratos</h1>
      </div>
        <p className='ms-5 me-5 mt-3 text-center'>Gestiona tus contratos de manera eficiente. Puedes agregar nuevos contratos, revisar los existentes, actualizar información y eliminar contratos innecesarios. Mantén un registro organizado de todos tus acuerdos contractuales.</p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
        {contratos.map((contrato, index) => (
        <div className="col" key={index}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{contrato.nombreProyecto}</h4>
              <p className="card-text"><strong>Cliente:</strong> {contrato.cliente}</p>
              <p className="card-text"><strong>Archivo:</strong> 
                {contrato.archivo ? (
                <a href={contrato.archivo} target="_blank" rel="noopener noreferrer">{contrato.nombreArchivo}</a>
                ) : (
                  'No se cargó ningún archivo'
                )}
              </p>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button className="btn" onClick={() => eliminarContrato(index)}>Eliminar</button>
            </div>
          </div>
        </div>
                ))}
      </div>
        <div className="btns-contratosform d-flex justify-content-center mb-5">
          <button className="btn" onClick={() => setMostrarFormulario(true)}>Agregar nuevo contrato</button>
        </div>
        <div className={`modal ${mostrarFormulario ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarFormulario ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header d-flex justify-content-center">
          <h4 className="modal-title">Agregar Nuevo Contrato</h4>
        </div>
        <div className="modal-body">
          <form>
              <div className="mb-3">
                <label htmlFor="nombreProyecto" className="form-label">Nombre del Proyecto</label>
                  <select className="form-select" id="nombreProyecto" value={nombreProyecto} onChange={(e) => setNombreProyecto(e.target.value)}required>
                      <option value="">Selecciona un proyecto...</option>
                        {proyectos.map((proyecto) => (
                      <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>
                        {proyecto.nombre}
                      </option>
                        ))}
                  </select>
              </div>
              <div className="mb-3">
                <label htmlFor="cliente" className="form-label">Cliente</label>
                  <select className="form-select" id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required>
                      <option value="">Selecciona un cliente...</option>
                        {clientes.map((cliente) => (
                      <option key={cliente.cliente_id} value={cliente.cliente_id}>
                        {cliente.nombre}
                      </option>
                        ))}
                  </select>
              </div>
              <div className="mb-3">
                <label htmlFor="plantilla" className="form-label">Plantilla</label>
                  <select className="form-select" id="plantilla" value={plantilla} onChange={(e) => setPlantilla(e.target.value)} required>
                      <option value="">Selecciona una plantilla...</option>
                        {plantillas.map((plantilla) => (
                      <option key={plantilla.plantilla_id} value={plantilla.plantilla_id}>
                        {plantilla.nombre}
                      </option>
                        ))}
                  </select>
              </div>
              <div className="mb-3">
                <label htmlFor="archivo" className="form-label">Adjuntar Archivo</label>
                <input type="file" className="form-control" id="archivo" onChange={manejarCambioArchivo}/>
              </div>
              <div className='btns-contratosform d-flex justify-content-center'>
                <button type="button" className="btn me-5" onClick={() => setMostrarFormulario(false)}>Cerrar</button>
                <button type="button" className="btn ms-5" onClick={agregarContrato}>Guardar Contrato</button>
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