import React, { useState, useEffect } from 'react';

function Contratos() {
    const [contratos, setContratos] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [plantillas, setPlantillas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState('');
    const [contratoHTML, setContratoHTML] = useState('');
    const [mostrarContratoHTML, setMostrarContratoHTML] = useState(false);

    const [datosContrato, setDatosContrato] = useState({
        nombreFreelance: '',
        nombreCliente: '',
        fechaInicio: '',
        servicios: '',
        precio: '',
        metodoPago: '',
        fechaPagoFinal: '',
        entregables: ['', '', '', ''],
        periodoAviso: '',
        nombreProyecto: '',
        cliente: '',
        plantilla: '',
        archivo: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contratosRes, proyectosRes, clientesRes, plantillasRes] = await Promise.all([
                    fetch('https://api-freelancehub.vercel.app/contratos'),
                    fetch('https://api-freelancehub.vercel.app/proyectos'),
                    fetch('https://api-freelancehub.vercel.app/clientes'),
                    fetch('https://api-freelancehub.vercel.app/plantillas')
                ]);

                const [contratosData, proyectosData, clientesData, plantillasData] = await Promise.all([
                    contratosRes.json(),
                    proyectosRes.json(),
                    clientesRes.json(),
                    plantillasRes.json()
                ]);

                setContratos(contratosData.contratos);
                setProyectos(proyectosData.proyectos);
                setClientes(clientesData.clientes);
                setPlantillas(plantillasData.plantillas);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMensaje('Error al cargar los datos. Por favor, intente de nuevo.');
            }
        };

        fetchData();
    }, []);

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setDatosContrato(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const manejarCambioEntregable = (index, value) => {
        setDatosContrato(prevState => {
            const newEntregables = [...prevState.entregables];
            newEntregables[index] = value;
            return {
                ...prevState,
                entregables: newEntregables
            };
        });
    };

    const manejarCambioArchivo = (e) => {
        setDatosContrato(prevState => ({
            ...prevState,
            archivo: e.target.files[0]
        }));
    };

    const generarContratoHTML = () => {
        const html = `
            <h2>Contrato de prestación de servicios freelance</h2>
            <p>
              <strong>${datosContrato.nombreFreelance}</strong> (en adelante "CONTRATISTA")
              se obliga para con <strong>${datosContrato.nombreCliente}</strong> (en
              adelante "CONTRATANTE") a ejecutar los trabajos y actividades propias del
              servicio contratado, el cual se debe realizar de acuerdo a las condiciones y
              cláusulas del presente documento y que se detallan a continuación. Ambas
              partes acuerdan celebrar el presente CONTRATO DE PRESTACIÓN DE SERVICIOS
              FREELANCE, a ${datosContrato.fechaInicio}.
            </p>

            <h3>PRIMERA.- OBJETO:</h3>
            <p>
              El CONTRATISTA realizará ${datosContrato.servicios}, sin que exista relación
              de dependencia, ni horario determinado.
            </p>

            <h3>SEGUNDA.- PRECIO:</h3>
            <p>
              El CONTRATANTE pagará la suma de ${datosContrato.precio} al CONTRATISTA a
              través de ${datosContrato.metodoPago} según lo acordado por ambas partes, a
              más tardar ${datosContrato.fechaPagoFinal} del cronograma de pagos acordado,
              por el trabajo entregado y aceptado por el Cliente.
            </p>

            <h3>TERCERO.- FORMA DE PAGO:</h3>
            <p>
              El valor del contrato se pagará por ${datosContrato.metodoPago} a más tardar
              el ${datosContrato.fechaPagoFinal} de acuerdo al cronograma de entregas y
              pagos acordado y aceptado por el CONTRATANTE detallado a continuación:
            </p>
            <ul>
              ${datosContrato.entregables.map((entregable, index) => `
              <li>${entregable}</li>
              `).join('')}
            </ul>

            <h3>CUARTA.- DURACIÓN O PLAZO:</h3>
            <p>
              El CONTRATISTA se compromete a prestar los servicios hasta que el contrato
              haya finalizado en la fecha acordada.
            </p>

            <h3>QUINTA.- OBLIGACIONES:</h3>
            <p>
              El CONTRATANTE deberá facilitar acceso a la información y elementos que sean
              necesarios, de manera oportuna, para la debida ejecución del objeto del
              contrato, y, estará obligado a cumplir con lo estipulado en las demás
              cláusulas y condiciones previstas en este documento. El CONTRATISTA deberá
              cumplir en forma eficiente y oportuna los trabajos encomendados y aquellas
              obligaciones que se generen de acuerdo con la naturaleza del servicio. El
              CONTRATISTA declara que no puede garantizar que el trabajo terminado estará
              completamente libre de errores, por lo que no puede ser responsable ante el
              CONTRATANTE o TERCEROS por daños, incluyendo pérdida de beneficios u otros
              daños incidentales, consecuentes o especiales, incluso con asesoramiento
              previo. El CONTRATANTE supervisará la ejecución del servicio encomendado, y
              podrá formular las observaciones del caso, para ser analizadas conjuntamente
              con El CONTRATISTA.
            </p>

            <h3>SEXTA.- TERMINACIÓN</h3>
            <p>
              Este acuerdo puede ser terminado con un aviso por escrito de
              ${datosContrato.periodoAviso} días por cualquiera de las partes.
            </p>

            <h3>SEPTIMA.-INDEPENDENCIA:</h3>
            <p>
              El CONTRATISTA actuará por su cuenta, con autonomía y sin que exista relación
              laboral, ni subordinación con El CONTRATANTE. Sus derechos se limitarán por la
              naturaleza del contrato, a exigir el cumplimiento de las obligaciones del
              CONTRATANTE y el pago oportuno de su remuneración fijada en este documento.
            </p>

            <h3>OCTAVA.- DERECHOS</h3>
            <p>
              El CONTRATANTE será propietario de los derechos de autor de todo el material
              creado bajo este acuerdo una vez se haya completado el pago íntegro. El
              CONTRATISTA puede exhibir obras de muestra de este proyecto como piezas de su
              portafolio sólo con el consentimiento y la aprobación del CONTRATANTE.
            </p>

            <div style="display: flex; justify-content: space-between; margin-top: 50px">
              <div>
                <p>
                  <strong
                    >El CONTRATANTE acepta los términos mencionados anteriormente:</strong
                  >
                </p>
                <p>${datosContrato.nombreCliente}</p>
                <p>Fecha: ____________________</p>
              </div>
              <div>
                <p>
                  <strong
                    >El CONTRATISTA acepta los términos mencionados anteriormente:</strong
                  >
                </p>
                <p>${datosContrato.nombreFreelance}</p>
                <p>Fecha: ____________________</p>
              </div>
            </div>
        `;

        setContratoHTML(html);
        setMostrarContratoHTML(true);
    };

    const agregarContrato = async (e) => {
        e.preventDefault();

        const nuevoContrato = {
            ...datosContrato,
            cliente_id: datosContrato.cliente,
            plantilla_id: datosContrato.plantilla,
            proyecto_id: datosContrato.nombreProyecto,
            archivo: datosContrato.archivo ? URL.createObjectURL(datosContrato.archivo) : null,
        };

        try {
            const response = await fetch('https://api-freelancehub.vercel.app/contratos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoContrato),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el contrato');
            }

            const responseData = await response.json();
            console.log("¡El contrato se ha registrado correctamente!", responseData);
            setMostrarFormulario(false);
            generarContratoHTML();

            const contratosResponse = await fetch('https://api-freelancehub.vercel.app/contratos');
            const contratosData = await contratosResponse.json();
            setContratos(contratosData.contratos);
        } catch (error) {
            console.error(error);
            setErrorMensaje('No se pudo agregar el contrato. Verifica la información.');
        }
    };

    const eliminarContrato = async (index) => {
        const contrato = contratos[index];
        try {
            const response = await fetch(`https://api-freelancehub.vercel.app/contratos/${contrato.contrato_id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el contrato');
            }

            const responseData = await response.json();
            console.log("¡El contrato se ha eliminado correctamente!", responseData);
            setContratos(contratos.filter((_, i) => i !== index));
        } catch (error) {
            console.error(error);
            setErrorMensaje('No se pudo eliminar el contrato. Inténtalo de nuevo.');
        }
    };


            return (
              <div>
                <form onSubmit={agregarContrato}>
                  <div className="mb-3">
                    <label htmlFor="nombreFreelance" className="form-label">Nombre del Freelance</label>
                    <input type="text" className="form-control" id="nombreFreelance" name="nombreFreelance" value={datosContrato.nombreFreelance} onChange={manejarCambioInput} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nombreCliente" className="form-label">Nombre del Cliente</label>
                    <select className="form-select" id="nombreCliente" name="cliente" value={datosContrato.cliente} onChange={manejarCambioInput} required>
                      <option value="">Selecciona un cliente...</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.cliente_id} value={cliente.cliente_id}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
                    <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" value={datosContrato.fechaInicio} onChange={manejarCambioInput} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="servicios" className="form-label">Servicios</label>
                    <textarea className="form-control" id="servicios" name="servicios" value={datosContrato.servicios} onChange={manejarCambioInput} required></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input type="text" className="form-control" id="precio" name="precio" value={datosContrato.precio} onChange={manejarCambioInput} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="metodoPago" className="form-label">Método de Pago</label>
                    <input type="text" className="form-control" id="metodoPago" name="metodoPago" value={datosContrato.metodoPago} onChange={manejarCambioInput} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fechaPagoFinal" className="form-label">Fecha de Pago Final</label>
                    <input type="date" className="form-control" id="fechaPagoFinal" name="fechaPagoFinal" value={datosContrato.fechaPagoFinal} onChange={manejarCambioInput} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Entregables</label>
                    {datosContrato.entregables.map((entregable, index) => (
                      <input
                        key={index}
                        type="text"
                        className="form-control mb-2"
                        value={entregable}
                        onChange={(e) => manejarCambioEntregable(index, e.target.value)}
                        placeholder={`Entregable ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="periodoAviso" className="form-label">Periodo de Aviso (días)</label>
                    <input type="text" className="form-control" id="periodoAviso" name="periodoAviso" value={datosContrato.periodoAviso} onChange={manejarCambioInput} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nombreProyecto" className="form-label">Nombre del Proyecto</label>
                    <select className="form-select" id="nombreProyecto" name="nombreProyecto" value={datosContrato.nombreProyecto} onChange={manejarCambioInput} required>
                      <option value="">Selecciona un proyecto...</option>
                      {proyectos.map((proyecto) => (
                        <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>
                          {proyecto.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="plantilla" className="form-label">Plantilla</label>
                    <select className="form-select" id="plantilla" name="plantilla" value={datosContrato.plantilla} onChange={manejarCambioInput} required>
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
                    <input type="file" className="form-control" id="archivo" onChange={manejarCambioArchivo} />
                  </div>
                  <div className='btns-contratosform d-flex justify-content-center'>
                    <button type="button" className="btn me-5" onClick={() => setMostrarFormulario(false)}>Cerrar</button>
                    <button type="submit" className="btn ms-5">Guardar Contrato</button>
                  </div>
                </form>
                <div className={`modal ${mostrarContratoHTML ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mostrarContratoHTML ? 'block' : 'none' }}>
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Contrato Generado</h5>
                        <button type="button" className="close" onClick={() => setMostrarContratoHTML(false)}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div dangerouslySetInnerHTML={{ __html: contratoHTML }}></div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setMostrarContratoHTML(false)}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={() => window.print()}>Imprimir</button>
                      </div>
                    </div>
                  </div>
                </div>
                {mostrarContratoHTML && <div className="modal-backdrop fade show"></div>}
                {mostrarFormulario && <div className="modal-backdrop fade show"></div>}
                {errorMensaje && <div className="alert alert-danger mt-3">{errorMensaje}</div>}
              </div>
            )
          };

export default Contratos;