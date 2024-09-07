import React, { useState, useEffect } from 'react';

const Contratos = ({ contratoId }) => {
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
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contratoId) {
      fetchContractData();
    }
  }, [contratoId]);

  const fetchContractData = async () => {
    setLoading(true);
    try {
      const contratoRes = await fetch(`https://api-freelancehub.vercel.app/contrato/${contratoId}`);
      if (!contratoRes.ok) throw new Error(`HTTP error! status: ${contratoRes.status}`);
      const contratoData = await contratoRes.json();
      const contrato = contratoData.contrato;

      const proyectoRes = await fetch(`https://api-freelancehub.vercel.app/proyecto/${contrato.proyecto_id}`);
      if (!proyectoRes.ok) throw new Error(`HTTP error! status: ${proyectoRes.status}`);
      const proyectoData = await proyectoRes.json();
      const proyecto = proyectoData.proyecto;

      const clienteRes = await fetch(`https://api-freelancehub.vercel.app/cliente/${contrato.cliente_id}`);
      if (!clienteRes.ok) throw new Error(`HTTP error! status: ${clienteRes.status}`);
      const clienteData = await clienteRes.json();
      const cliente = clienteData.cliente;

      const usuarioRes = await fetch(`https://api-freelancehub.vercel.app/get-usuario/${proyecto.usuario_id}`);
      if (!usuarioRes.ok) throw new Error(`HTTP error! status: ${usuarioRes.status}`);
      const usuarioData = await usuarioRes.json();
      const usuario = usuarioData.usuario;

      const tareasRes = await fetch(`https://api-freelancehub.vercel.app/tareas/${contrato.proyecto_id}`);
      if (!tareasRes.ok) throw new Error(`HTTP error! status: ${tareasRes.status}`);
      const tareasData = await tareasRes.json();
      const tareas = tareasData.tareas;

      setDatosContrato({
        nombreFreelance: usuario?.usuario_email || '',
        nombreCliente: cliente?.cliente_nombre || '',
        fechaInicio: proyecto?.proyecto_inicio || '',
        servicios: proyecto?.proyecto_descripcion || '',
        precio: proyecto?.proyecto_presupuesto || '',
        metodoPago: 'transferencia bancaria', 
        fechaPagoFinal: proyecto?.proyecto_termino || '',
        entregables: tareas?.slice(0, 4).map(tarea => tarea.tarea_nombre) || ['', '', '', ''],
        periodoAviso: '15', 
        nombreProyecto: proyecto?.proyecto_nombre || '',
        cliente: cliente?.cliente_id || '',
        plantilla: contrato?.plantilla_id || '',
      });
    } catch (err) {
      console.error('Error fetching contract data:', err);
      setError(`Error al cargar los datos del contrato: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'entregables') {
      setDatosContrato(prev => ({
        ...prev,
        entregables: prev.entregables.map((item, i) => i === index ? value : item)
      }));
    } else {
      setDatosContrato(prev => ({ ...prev, [name]: value }));
    }
  };

  const addEntregable = () => {
    setDatosContrato(prev => ({
      ...prev,
      entregables: [...prev.entregables, '']
    }));
  };

  const removeEntregable = (index) => {
    setDatosContrato(prev => ({
      ...prev,
      entregables: prev.entregables.filter((_, i) => i !== index)
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const renderPlaceholder = (text) => {
    return text ? text : <span style={{ color: '#DC8665' }}>[Por completar]</span>;
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="contract-template container">
      <h2 className="mb-4">Contrato de prestación de servicios freelance</h2>
      
      <div className="mb-4">
        <h3>Datos del Contrato</h3>        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre del Freelance:</label>
            <input
              type="text"
              className="form-control"
              name="nombreFreelance"
              value={datosContrato.nombreFreelance}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre del Cliente:</label>
            <input
              type="text"
              className="form-control"
              name="nombreCliente"
              value={datosContrato.nombreCliente}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha de Inicio:</label>
            <input
              type="date"
              className="form-control"
              name="fechaInicio"
              value={datosContrato.fechaInicio}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha de Pago Final:</label>
            <input
              type="date"
              className="form-control"
              name="fechaPagoFinal"
              value={datosContrato.fechaPagoFinal}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Servicios:</label>
          <textarea
            className="form-control"
            name="servicios"
            value={datosContrato.servicios}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              value={datosContrato.precio}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Método de Pago:</label>
            <select
              className="form-select"
              name="metodoPago"
              value={datosContrato.metodoPago}
              onChange={handleInputChange}
            >
              <option value="">Seleccione un método de pago</option>
              <option value="Transferencia Electrónica">Transferencia Electrónica</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Vale Vista">Vale Vista</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Entregables:</label>
          {datosContrato.entregables.map((entregable, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              value={entregable}
              onChange={(e) => handleInputChange(e, index)}
            />
          ))}
        </div>
        <div className="mb-3">
          <label className="form-label">Periodo de Aviso:</label>
          <select
            className="form-select"
            name="periodoAviso"
            value={datosContrato.periodoAviso}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un periodo de aviso</option>
            <option value="15 días">15 días</option>
            <option value="30 días">30 días</option>
            <option value="45 días">45 días</option>
            <option value="90 días">90 días</option>
          </select>
        </div>
      </div>

      <div className="contract-preview">
        <h3>Vista Previa del Contrato</h3>
        <p><strong>{renderPlaceholder(datosContrato.nombreFreelance)}</strong> (en adelante "CONTRATISTA") se
        obliga para con <strong>{renderPlaceholder(datosContrato.nombreCliente)}</strong> (en adelante
        "CONTRATANTE") a ejecutar los trabajos y actividades propias del
        servicio contratado, el cual se debe realizar de acuerdo a las
        condiciones y cláusulas del presente documento y que se detallan a
        continuación. Ambas partes acuerdan celebrar el presente CONTRATO DE
        PRESTACIÓN DE SERVICIOS FREELANCE, a {renderPlaceholder(formatDate(datosContrato.fechaInicio))}.</p>

        <h4>PRIMERA.- OBJETO:</h4>
        <p>El CONTRATISTA realizará {renderPlaceholder(datosContrato.servicios)}, sin que exista
        relación de dependencia, ni horario determinado.</p>

        <h4>SEGUNDA.- PRECIO:</h4>
        <p>El CONTRATANTE pagará la suma de ${renderPlaceholder(datosContrato.precio)} al CONTRATISTA
        a través de {renderPlaceholder(datosContrato.metodoPago)} según lo acordado por ambas
        partes, a más tardar {renderPlaceholder(formatDate(datosContrato.fechaPagoFinal))} del cronograma de
        pagos acordado, por el trabajo entregado y aceptado por el Cliente.</p>

        <h4>TERCERO.- FORMA DE PAGO:</h4>
        <p>El valor del contrato se pagará por {renderPlaceholder(datosContrato.metodoPago)} a más
        tardar el {renderPlaceholder(formatDate(datosContrato.fechaPagoFinal))} de acuerdo al cronograma de
        entregas y pagos acordado y aceptado por el CONTRATANTE detallado a
        continuación:</p>

        <ul>
          {datosContrato.entregables.map((entregable, index) => (
            <li key={index}>{renderPlaceholder(entregable)}</li>
          ))}
        </ul>

        <h4>CUARTA.- DURACIÓN O PLAZO:</h4>
        <p>El CONTRATISTA se compromete a prestar los servicios hasta que el
        contrato haya finalizado en la fecha acordada ({renderPlaceholder(formatDate(datosContrato.fechaPagoFinal))}).</p>

        <h4>QUINTA.- OBLIGACIONES:</h4>
        <p>El CONTRATANTE deberá facilitar acceso a la información y elementos que
        sean necesarios, de manera oportuna, para la debida ejecución del objeto
        del contrato, y, estará obligado a cumplir con lo estipulado en las
        demás cláusulas y condiciones previstas en este documento. El
        CONTRATISTA deberá cumplir en forma eficiente y oportuna los trabajos
        encomendados y aquellas obligaciones que se generen de acuerdo con la
        naturaleza del servicio.</p>

        <h4>SEXTA.- TERMINACIÓN</h4>
        <p>Este acuerdo puede ser terminado con un aviso por escrito de
        {renderPlaceholder(datosContrato.periodoAviso)} por cualquiera de las partes.</p>

        <h4>SEPTIMA.-INDEPENDENCIA:</h4>
        <p>El CONTRATISTA actuará por su cuenta, con autonomía y sin que exista
        relación laboral, ni subordinación con El CONTRATANTE. Sus derechos se
        limitarán por la naturaleza del contrato, a exigir el cumplimiento de
        las obligaciones del CONTRATANTE y el pago oportuno de su remuneración
        fijada en este documento.</p>

        <h4>OCTAVA.- DERECHOS</h4>
        <p>El CONTRATANTE será propietario de los derechos de autor de todo el
        material creado bajo este acuerdo una vez se haya completado el pago
        íntegro. El CONTRATISTA puede exhibir obras de muestra de este proyecto
        como piezas de su portafolio sólo con el consentimiento y la aprobación
        del CONTRATANTE.</p>

        <div className="signatures mt-5">
          <div className="row">
            <div className="col-md-6">
              <p><strong>El CONTRATANTE acepta los términos mencionados anteriormente:</strong></p>
              <p>{renderPlaceholder(datosContrato.nombreCliente)}</p>
              <p>Fecha: ____________________</p>
            </div>
            <div className="col-md-6">
              <p><strong>El CONTRATISTA acepta los términos mencionados anteriormente:</strong></p>
              <p>{renderPlaceholder(datosContrato.nombreFreelance)}</p>
              <p>Fecha: ____________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contratos;
