import React, { useState, useEffect } from 'react';
import ContractVariablesDropdown from './ContractVariablesDropdown';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariable, setSelectedVariable] = useState(null);

  useEffect(() => {
    const fetchContractData = async () => {
      try {

        // Fetch contract data
        const contratoRes = await fetch(`https://api-freelancehub.vercel.app/contrato/${contratoId}`);
        const contratoData = await contratoRes.json();
        const contrato = contratoData.contrato;

        // Fetch related project data
        const proyectoRes = await fetch(`https://api-freelancehub.vercel.app/proyecto/${contrato.proyecto_id}`);
        const proyectoData = await proyectoRes.json();
        const proyecto = proyectoData.proyecto;

        // Fetch client data
        const clienteRes = await fetch(`https://api-freelancehub.vercel.app/cliente/${contrato.cliente_id}`);
        const clienteData = await clienteRes.json();
        const cliente = clienteData.cliente;

        // Fetch freelancer (user) data
        const usuarioRes = await fetch(`https://api-freelancehub.vercel.app/get-usuario/${proyecto.usuario_id}`);
        const usuarioData = await usuarioRes.json();
        const usuario = usuarioData.usuario;

        // Fetch tasks for the project
        const tareasRes = await fetch(`https://api-freelancehub.vercel.app/tareas/${contrato.proyecto_id}`);
        const tareasData = await tareasRes.json();
        const tareas = tareasData.tareas;

        setDatosContrato({
          nombreFreelance: usuario.usuario_email,
          nombreCliente: cliente.cliente_nombre,
          fechaInicio: proyecto.proyecto_inicio,
          servicios: proyecto.proyecto_descripcion,
          precio: proyecto.proyecto_presupuesto,
          metodoPago: 'transferencia bancaria', // You might want to add this to your database
          fechaPagoFinal: proyecto.proyecto_termino,
          entregables: tareas.slice(0, 4).map(tarea => tarea.tarea_nombre),
          periodoAviso: '15', // You might want to add this to your database
          nombreProyecto: proyecto.proyecto_nombre,
          cliente: cliente.cliente_id,
          plantilla: contrato.plantilla_id,
        });
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del contrato');
        setLoading(false);
      }
    };

    fetchContractData();
  }, [contratoId]);

  const handleVariableSelect = (key, value) => {
    setSelectedVariable({ key, value });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="contract-template">
      <div className="mb-4">
        <ContractVariablesDropdown datosContrato={datosContrato} onSelect={handleVariableSelect} />
      </div>
      
      {selectedVariable && (
        <div className="mb-4">
          <h3>Variable seleccionada: {selectedVariable.key}</h3>
          <p>Valor: {selectedVariable.value}</p>
        </div>
      )}

      <h2>Contrato de prestación de servicios freelance</h2>
      
      <p><strong>{datosContrato.nombreFreelance}</strong> (en adelante "CONTRATISTA") se
      obliga para con <strong>{datosContrato.nombreCliente}</strong> (en adelante
      "CONTRATANTE") a ejecutar los trabajos y actividades propias del
      servicio contratado, el cual se debe realizar de acuerdo a las
      condiciones y cláusulas del presente documento y que se detallan a
      continuación. Ambas partes acuerdan celebrar el presente CONTRATO DE
      PRESTACIÓN DE SERVICIOS FREELANCE, a {formatDate(datosContrato.fechaInicio)}.</p>

      <h3>PRIMERA.- OBJETO:</h3>
      <p>El CONTRATISTA realizará {datosContrato.servicios}, sin que exista
      relación de dependencia, ni horario determinado.</p>

      <h3>SEGUNDA.- PRECIO:</h3>
      <p>El CONTRATANTE pagará la suma de ${datosContrato.precio} al CONTRATISTA
      a través de {datosContrato.metodoPago} según lo acordado por ambas
      partes, a más tardar {formatDate(datosContrato.fechaPagoFinal)} del cronograma de
      pagos acordado, por el trabajo entregado y aceptado por el Cliente.</p>

      <h3>TERCERO.- FORMA DE PAGO:</h3>
      <p>El valor del contrato se pagará por {datosContrato.metodoPago} a más
      tardar el {formatDate(datosContrato.fechaPagoFinal)} de acuerdo al cronograma de
      entregas y pagos acordado y aceptado por el CONTRATANTE detallado a
      continuación:</p>

      <ul>
        {datosContrato.entregables.map((entregable, index) => (
          <li key={index}>{entregable}</li>
        ))}
      </ul>

      <h3>CUARTA.- DURACIÓN O PLAZO:</h3>
      <p>El CONTRATISTA se compromete a prestar los servicios hasta que el
      contrato haya finalizado en la fecha acordada ({formatDate(datosContrato.fechaPagoFinal)}).</p>

      <h3>QUINTA.- OBLIGACIONES:</h3>
      <p>El CONTRATANTE deberá facilitar acceso a la información y elementos que
      sean necesarios, de manera oportuna, para la debida ejecución del objeto
      del contrato, y, estará obligado a cumplir con lo estipulado en las
      demás cláusulas y condiciones previstas en este documento. El
      CONTRATISTA deberá cumplir en forma eficiente y oportuna los trabajos
      encomendados y aquellas obligaciones que se generen de acuerdo con la
      naturaleza del servicio.</p>

      <h3>SEXTA.- TERMINACIÓN</h3>
      <p>Este acuerdo puede ser terminado con un aviso por escrito de
      {datosContrato.periodoAviso} días por cualquiera de las partes.</p>

      <h3>SEPTIMA.-INDEPENDENCIA:</h3>
      <p>El CONTRATISTA actuará por su cuenta, con autonomía y sin que exista
      relación laboral, ni subordinación con El CONTRATANTE. Sus derechos se
      limitarán por la naturaleza del contrato, a exigir el cumplimiento de
      las obligaciones del CONTRATANTE y el pago oportuno de su remuneración
      fijada en este documento.</p>

      <h3>OCTAVA.- DERECHOS</h3>
      <p>El CONTRATANTE será propietario de los derechos de autor de todo el
      material creado bajo este acuerdo una vez se haya completado el pago
      íntegro. El CONTRATISTA puede exhibir obras de muestra de este proyecto
      como piezas de su portafolio sólo con el consentimiento y la aprobación
      del CONTRATANTE.</p>

      <div className="signatures">
        <div>
          <p><strong>El CONTRATANTE acepta los términos mencionados anteriormente:</strong></p>
          <p>{datosContrato.nombreCliente}</p>
          <p>Fecha: ____________________</p>
        </div>
        <div>
          <p><strong>El CONTRATISTA acepta los términos mencionados anteriormente:</strong></p>
          <p>{datosContrato.nombreFreelance}</p>
          <p>Fecha: ____________________</p>
        </div>
      </div>
    </div>
  );
};

export default Contratos;