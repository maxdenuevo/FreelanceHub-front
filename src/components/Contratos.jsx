import React, { useState, useEffect } from 'react';

const Contratos = ({ contratoId }) => {
  const [datosContrato, setDatosContrato] = useState({
    nombreFreelance: '{{nombreFreelance}}',
    nombreCliente: '{{nombreCliente}}',
    fechaInicio: '{{fechaInicio}}',
    servicios: '{{servicios}}',
    precio: '{{precio}}',
    metodoPago: '{{metodoPago}}',
    fechaPagoFinal: '{{fechaPagoFinal}}',
    entregables: ['{{entregable1}}', '{{entregable2}}', '{{entregable3}}', '{{entregable4}}'],
    periodoAviso: '{{periodoAviso}}',
    nombreProyecto: '{{nombreProyecto}}',
    cliente: '{{cliente}}',
    plantilla: '{{plantilla}}',
  });
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const contratoRes = await fetch(`https://api-freelancehub.vercel.app/contrato/${contratoId}`);
        const contratoData = await contratoRes.json();
        const contrato = contratoData.contrato;

        const proyectoRes = await fetch(`https://api-freelancehub.vercel.app/proyecto/${contrato.proyecto_id}`);
        const proyectoData = await proyectoRes.json();
        const proyecto = proyectoData.proyecto;

        const clienteRes = await fetch(`https://api-freelancehub.vercel.app/cliente/${contrato.cliente_id}`);
        const clienteData = await clienteRes.json();
        const cliente = clienteData.cliente;

        const usuarioRes = await fetch(`https://api-freelancehub.vercel.app/get-usuario/${proyecto.usuario_id}`);
        const usuarioData = await usuarioRes.json();
        const usuario = usuarioData.usuario;

        const tareasRes = await fetch(`https://api-freelancehub.vercel.app/tareas/${contrato.proyecto_id}`);
        const tareasData = await tareasRes.json();
        const tareas = tareasData.tareas;

        setApiData({
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
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del contrato');
        setLoading(false);
      }
    };

    fetchContractData();
  }, [contratoId]);

  const handleVariableSelect = (key, value) => {
    setDatosContrato(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString.startsWith('{{')) return dateString;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="contract-template container">
      <h2 className="mb-4">Contrato de prestación de servicios freelance</h2>
      
      {apiData && (
        <div className="mb-4">
          <h3>Datos de la API</h3>
          {Object.entries(apiData).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="form-label">{key}:</label>
              <select 
                className="form-select" 
                onChange={(e) => handleVariableSelect(key, e.target.value)}
              >
                <option value={datosContrato[key]}>{datosContrato[key]}</option>
                <option value={Array.isArray(value) ? value.join(', ') : value}>
                  {Array.isArray(value) ? value.join(', ') : value}
                </option>
              </select>
            </div>
          ))}
        </div>
      )}

      <div className="contract-preview">
        <p><strong>{datosContrato.nombreFreelance}</strong> (en adelante "CONTRATISTA") se
        obliga para con <strong>{datosContrato.nombreCliente}</strong> (en adelante
        "CONTRATANTE") a ejecutar los trabajos y actividades propias del
        servicio contratado, el cual se debe realizar de acuerdo a las
        condiciones y cláusulas del presente documento y que se detallan a
        continuación. Ambas partes acuerdan celebrar el presente CONTRATO DE
        PRESTACIÓN DE SERVICIOS FREELANCE, a {formatDate(datosContrato.fechaInicio)}.</p>

        <h4>PRIMERA.- OBJETO:</h4>
        <p>El CONTRATISTA realizará {datosContrato.servicios}, sin que exista
        relación de dependencia, ni horario determinado.</p>

        <h4>SEGUNDA.- PRECIO:</h4>
        <p>El CONTRATANTE pagará la suma de ${datosContrato.precio} al CONTRATISTA
        a través de {datosContrato.metodoPago} según lo acordado por ambas
        partes, a más tardar {formatDate(datosContrato.fechaPagoFinal)} del cronograma de
        pagos acordado, por el trabajo entregado y aceptado por el Cliente.</p>

        <h4>TERCERO.- FORMA DE PAGO:</h4>
        <p>El valor del contrato se pagará por {datosContrato.metodoPago} a más
        tardar el {formatDate(datosContrato.fechaPagoFinal)} de acuerdo al cronograma de
        entregas y pagos acordado y aceptado por el CONTRATANTE detallado a
        continuación:</p>

        <ul>
          {datosContrato.entregables.map((entregable, index) => (
            <li key={index}>{entregable}</li>
          ))}
        </ul>

        <h4>CUARTA.- DURACIÓN O PLAZO:</h4>
        <p>El CONTRATISTA se compromete a prestar los servicios hasta que el
        contrato haya finalizado en la fecha acordada ({formatDate(datosContrato.fechaPagoFinal)}).</p>

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
        {datosContrato.periodoAviso} días por cualquiera de las partes.</p>

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
              <p>{datosContrato.nombreCliente}</p>
              <p>Fecha: ____________________</p>
            </div>
            <div className="col-md-6">
              <p><strong>El CONTRATISTA acepta los términos mencionados anteriormente:</strong></p>
              <p>{datosContrato.nombreFreelance}</p>
              <p>Fecha: ____________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contratos;