import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const API_BASE_URL = 'https://api-freelancehub.vercel.app';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  section: { margin: 10, padding: 10 },
  heading: { fontSize: 14, marginBottom: 10, fontWeight: 'bold' },
  text: { marginBottom: 5 },
  signature: { marginTop: 50, borderTop: 1, paddingTop: 10 },
});

const ContractPDF = ({ datosContrato }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      <Text style={styles.title}>Contrato de prestación de servicios freelance</Text>
      
      <View style={styles.section}>
        <Text style={styles.text}>
          <Text style={styles.heading}>{datosContrato.nombreFreelance}</Text> (en adelante "CONTRATISTA") se
          obliga para con <Text style={styles.heading}>{datosContrato.nombreCliente}</Text> (en adelante
          "CONTRATANTE") a ejecutar los trabajos y actividades propias del
          servicio contratado, el cual se debe realizar de acuerdo a las
          condiciones y cláusulas del presente documento y que se detallan a
          continuación. Ambas partes acuerdan celebrar el presente CONTRATO DE
          PRESTACIÓN DE SERVICIOS FREELANCE, a {datosContrato.fechaInicio}.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>PRIMERA.- OBJETO:</Text>
        <Text style={styles.text}>
          El CONTRATISTA realizará {datosContrato.servicios}, sin que exista
          relación de dependencia, ni horario determinado.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SEGUNDA.- PRECIO:</Text>
        <Text style={styles.text}>
          El CONTRATANTE pagará la suma de ${datosContrato.precio} al CONTRATISTA
          a través de {datosContrato.metodoPago} según lo acordado por ambas
          partes, a más tardar {datosContrato.fechaPagoFinal} del cronograma de
          pagos acordado, por el trabajo entregado y aceptado por el Cliente.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>TERCERO.- FORMA DE PAGO:</Text>
        <Text style={styles.text}>
          El valor del contrato se pagará por {datosContrato.metodoPago} a más
          tardar el {datosContrato.fechaPagoFinal} de acuerdo al cronograma de
          entregas y pagos acordado y aceptado por el CONTRATANTE detallado a
          continuación:
        </Text>
        {datosContrato.entregables.map((entregable, index) => (
          <Text key={index} style={styles.text}>• {entregable}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>CUARTA.- DURACIÓN O PLAZO:</Text>
        <Text style={styles.text}>
          El CONTRATISTA se compromete a prestar los servicios hasta que el
          contrato haya finalizado en la fecha acordada ({datosContrato.fechaPagoFinal}).
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>QUINTA.- OBLIGACIONES:</Text>
        <Text style={styles.text}>
          El CONTRATANTE deberá facilitar acceso a la información y elementos que
          sean necesarios, de manera oportuna, para la debida ejecución del objeto
          del contrato, y, estará obligado a cumplir con lo estipulado en las
          demás cláusulas y condiciones previstas en este documento. El
          CONTRATISTA deberá cumplir en forma eficiente y oportuna los trabajos
          encomendados y aquellas obligaciones que se generen de acuerdo con la
          naturaleza del servicio.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SEXTA.- TERMINACIÓN</Text>
        <Text style={styles.text}>
          Este acuerdo puede ser terminado con un aviso por escrito de
          {datosContrato.periodoAviso} por cualquiera de las partes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SEPTIMA.-INDEPENDENCIA:</Text>
        <Text style={styles.text}>
          El CONTRATISTA actuará por su cuenta, con autonomía y sin que exista
          relación laboral, ni subordinación con El CONTRATANTE. Sus derechos se
          limitarán por la naturaleza del contrato, a exigir el cumplimiento de
          las obligaciones del CONTRATANTE y el pago oportuno de su remuneración
          fijada en este documento.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>OCTAVA.- DERECHOS</Text>
        <Text style={styles.text}>
          El CONTRATANTE será propietario de los derechos de autor de todo el
          material creado bajo este acuerdo una vez se haya completado el pago
          íntegro. El CONTRATISTA puede exhibir obras de muestra de este proyecto
          como piezas de su portafolio sólo con el consentimiento y la aprobación
          del CONTRATANTE.
        </Text>
      </View>

      <View style={styles.signature}>
        <Text style={styles.text}>El CONTRATANTE acepta los términos mencionados anteriormente:</Text>
        <Text style={styles.text}>{datosContrato.nombreCliente}</Text>
        <Text style={styles.text}>Fecha: ____________________</Text>
      </View>

      <View style={styles.signature}>
        <Text style={styles.text}>El CONTRATISTA acepta los términos mencionados anteriormente:</Text>
        <Text style={styles.text}>{datosContrato.nombreFreelance}</Text>
        <Text style={styles.text}>Fecha: ____________________</Text>
      </View>
      </Page>
  </Document>
);

const Contratos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [datosContrato, setDatosContrato] = useState({
    nombreFreelance: '',
    nombreCliente: '',
    fechaInicio: '',
    servicios: '',
    precio: '',
    metodoPago: 'Transferencia Electrónica',
    fechaPagoFinal: '',
    entregables: [],
    periodoAviso: '30 días',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchProyectos = useCallback(async () => {
    try {
      const userId = localStorage.getItem('usuario_id');
      const response = await fetch(`${API_BASE_URL}/proyectos/${userId}`);
      if (!response.ok) throw new Error('Error al obtener los proyectos');
      const data = await response.json();
      setProyectos(data.proyectos);
    } catch (error) {
      setError('Error al obtener los proyectos: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProyectos();
  }, [fetchProyectos]);

  const fetchProyectoDetails = useCallback(async (proyectoId) => {
    try {
      const [clienteResponse, usuarioResponse, tareasResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/cliente/${selectedProyecto.cliente_id}`),
        fetch(`${API_BASE_URL}/get-usuario/${selectedProyecto.usuario_id}`),
        fetch(`${API_BASE_URL}/tareas-with-pagos/${proyectoId}`)
      ]);

      if (!clienteResponse.ok || !usuarioResponse.ok || !tareasResponse.ok) {
        throw new Error('Error al obtener detalles del proyecto');
      }

      const clienteData = await clienteResponse.json();
      const usuarioData = await usuarioResponse.json();
      const tareasData = await tareasResponse.json();

      setDatosContrato(prevDatos => ({
        ...prevDatos,
        nombreFreelance: usuarioData.usuario?.usuario_nombre || '',
        nombreCliente: clienteData.cliente?.cliente_nombre || '',
        fechaInicio: selectedProyecto.proyecto_inicio || '',
        servicios: selectedProyecto.proyecto_descripcion || '',
        precio: selectedProyecto.proyecto_presupuesto || '',
        fechaPagoFinal: selectedProyecto.proyecto_termino || '',
        entregables: tareasData.tareas_with_pagos.map(tarea => tarea.tarea_nombre) || [],
      }));
    } catch (error) {
      setError('Error al obtener detalles del proyecto: ' + error.message);
    }
  }, [selectedProyecto]);

  useEffect(() => {
    if (selectedProyecto) {
      fetchProyectoDetails(selectedProyecto.proyecto_id);
    }
  }, [selectedProyecto, fetchProyectoDetails]);

  const handleProyectoSelect = (e) => {
    const proyectoId = e.target.value;
    const proyecto = proyectos.find(p => p.proyecto_id === proyectoId);
    setSelectedProyecto(proyecto);
  };

  const handleInputChange = useCallback((e, index = null) => {
    const { name, value } = e.target;
    setDatosContrato(prev => {
      if (name === 'entregables') {
        const newEntregables = [...prev.entregables];
        newEntregables[index] = value;
        return { ...prev, entregables: newEntregables };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const addEntregable = useCallback(() => {
    setDatosContrato(prev => ({
      ...prev,
      entregables: [...prev.entregables, '']
    }));
  }, []);

  const removeEntregable = useCallback((index) => {
    setDatosContrato(prev => ({
      ...prev,
      entregables: prev.entregables.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSaveContract = async () => {
    try {
      // Implement your save logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
    } catch (error) {
      setError('Error al guardar el contrato: ' + error.message);
    }
  };

  if (loading) return <div className="alert alert-info">Cargando...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="contract-template container">
      <h2 className="mb-4">Contrato de prestación de servicios freelance</h2>
      
      <div className="mb-4">
        <h3>Seleccionar Proyecto</h3>
        <select 
          className="form-select mb-3" 
          onChange={handleProyectoSelect}
          value={selectedProyecto?.proyecto_id || ''}
        >
          <option value="">Seleccione un proyecto...</option>
          {proyectos.map((proyecto) => (
            <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>
              {proyecto.proyecto_nombre}
            </option>
          ))}
        </select>

        {selectedProyecto && (
          <>
            <h3>Datos del Contrato</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Tu nombre completo:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombreFreelance"
                  value={datosContrato.nombreFreelance}
                  onChange={handleInputChange}
                  required
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
                  required
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
                  required
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
                  required
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
                required
              ></textarea>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Presupuesto:</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={datosContrato.precio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Método de Pago:</label>
                <select
                  className="form-select"
                  name="metodoPago"
                  value={datosContrato.metodoPago}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Transferencia Electrónica">Transferencia Electrónica</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Vale Vista">Vale Vista</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Entregables:</label>
              {datosContrato.entregables.map((entregable, index) => (
                <div key={index} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="entregables"
                    value={entregable}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                  />
                  <button 
                    className="btn btn-outline-danger btn-sm" 
                    type="button"
                    onClick={() => removeEntregable(index)}
                    disabled={datosContrato.entregables.length === 1}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button 
                className="btn btn-outline-primary btn-sm mt-2" 
                type="button"
                onClick={addEntregable}
              >
                Agregar Entregable
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label">Periodo de Aviso:</label>
              <select
                className="form-select"
                name="periodoAviso"
                value={datosContrato.periodoAviso}
                onChange={handleInputChange}
                required
              >
                <option value="15 días">15 días</option>
                <option value="30 días">30 días</option>
                <option value="45 días">45 días</option>
                <option value="90 días">90 días</option>
              </select>
            </div>
          </>
        )}
      </div>

      {selectedProyecto && (
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
      )}


{selectedProyecto && (
        <div className="mt-4">
          <button className="btn btn-primary btn-sm" onClick={() => setIsOffcanvasOpen(true)}>
            Vista Previa y Exportar Contrato
          </button>
        </div>
      )}

<div className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Vista Previa del Contrato</h5>
          <button type="button" className="btn-close text-reset" onClick={() => setIsOffcanvasOpen(false)} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ContractPreview />
          <div className="mt-4">
            <button className="btn btn-primary btn-sm me-2" onClick={handleSaveContract}>
              {saveSuccess ? 'Contrato Guardado' : 'Guardar Contrato'}
            </button>
            <PDFDownloadLink document={<ContractPDF datosContrato={datosContrato} />} fileName="contrato.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Cargando documento...' : (
                  <button className="btn btn-secondary btn-sm me-2">
                    Exportar como PDF
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contratos;