import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'
import { FileText, Download, Eye, X, Plus, Trash2 } from 'lucide-react'
import { Card, Input, Select, Textarea, Button, Alert, Spinner, Badge } from './ui'
import { toast } from './ui/Toast'
import { useProjects } from '../hooks'

const API_BASE_URL = 'https://api-freelancehub.vercel.app'

// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  section: { margin: 10, padding: 10 },
  heading: { fontSize: 14, marginBottom: 10, fontWeight: 'bold' },
  text: { marginBottom: 5, lineHeight: 1.5 },
  signature: { marginTop: 50, borderTop: 1, paddingTop: 10 },
})

// PDF Document Component
const ContractPDF = ({ datosContrato }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Contrato de prestación de servicios freelance</Text>

      <View style={styles.section}>
        <Text style={styles.text}>
          <Text style={styles.heading}>{datosContrato.nombreFreelance}</Text> (en adelante
          "CONTRATISTA") se obliga para con{' '}
          <Text style={styles.heading}>{datosContrato.nombreCliente}</Text> (en adelante
          "CONTRATANTE") a ejecutar los trabajos y actividades propias del servicio contratado,
          el cual se debe realizar de acuerdo a las condiciones y cláusulas del presente documento
          y que se detallan a continuación. Ambas partes acuerdan celebrar el presente CONTRATO DE
          PRESTACIÓN DE SERVICIOS FREELANCE, a {datosContrato.fechaInicio}.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>PRIMERA.- OBJETO:</Text>
        <Text style={styles.text}>
          El CONTRATISTA realizará {datosContrato.servicios}, sin que exista relación de
          dependencia, ni horario determinado.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SEGUNDA.- PRECIO:</Text>
        <Text style={styles.text}>
          El CONTRATANTE pagará la suma de ${datosContrato.precio} al CONTRATISTA a través de{' '}
          {datosContrato.metodoPago} según lo acordado por ambas partes, a más tardar{' '}
          {datosContrato.fechaPagoFinal} del cronograma de pagos acordado, por el trabajo entregado
          y aceptado por el Cliente.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>TERCERO.- FORMA DE PAGO:</Text>
        <Text style={styles.text}>
          El valor del contrato se pagará por {datosContrato.metodoPago} a más tardar el{' '}
          {datosContrato.fechaPagoFinal} de acuerdo al cronograma de entregas y pagos acordado y
          aceptado por el CONTRATANTE detallado a continuación:
        </Text>
        {datosContrato.entregables.map((entregable, index) => (
          <Text key={index} style={styles.text}>
            • {entregable}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>CUARTA.- DURACIÓN O PLAZO:</Text>
        <Text style={styles.text}>
          El CONTRATISTA se compromete a prestar los servicios hasta que el contrato haya
          finalizado en la fecha acordada ({datosContrato.fechaPagoFinal}).
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>QUINTA.- OBLIGACIONES:</Text>
        <Text style={styles.text}>
          El CONTRATANTE deberá facilitar acceso a la información y elementos que sean necesarios,
          de manera oportuna, para la debida ejecución del objeto del contrato, y, estará obligado
          a cumplir con lo estipulado en las demás cláusulas y condiciones previstas en este
          documento. El CONTRATISTA deberá cumplir en forma eficiente y oportuna los trabajos
          encomendados y aquellas obligaciones que se generen de acuerdo con la naturaleza del
          servicio.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SEXTA.- TERMINACIÓN</Text>
        <Text style={styles.text}>
          Este acuerdo puede ser terminado con un aviso por escrito de {datosContrato.periodoAviso}{' '}
          por cualquiera de las partes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SEPTIMA.-INDEPENDENCIA:</Text>
        <Text style={styles.text}>
          El CONTRATISTA actuará por su cuenta, con autonomía y sin que exista relación laboral, ni
          subordinación con El CONTRATANTE. Sus derechos se limitarán por la naturaleza del
          contrato, a exigir el cumplimiento de las obligaciones del CONTRATANTE y el pago oportuno
          de su remuneración fijada en este documento.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>OCTAVA.- DERECHOS</Text>
        <Text style={styles.text}>
          El CONTRATANTE será propietario de los derechos de autor de todo el material creado bajo
          este acuerdo una vez se haya completado el pago íntegro. El CONTRATISTA puede exhibir
          obras de muestra de este proyecto como piezas de su portafolio sólo con el consentimiento
          y la aprobación del CONTRATANTE.
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
)

/**
 * Contratos v2.1 - Modern contract generation with PDF export
 * Usa useProjects hook para obtener proyectos
 */
function ContratosV2() {
  // Usar hook de proyectos
  const { projects: proyectos, loading: loadingProjects, error: projectsError } = useProjects()

  const [selectedProyecto, setSelectedProyecto] = useState(null)
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
  })
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  // Set error from projects hook
  useEffect(() => {
    if (projectsError) {
      setError(projectsError)
    }
  }, [projectsError])

  const fetchProyectoDetails = useCallback(async (proyectoId) => {
    try {
      const [clienteResponse, usuarioResponse, tareasResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/cliente/${selectedProyecto.cliente_id}`),
        fetch(`${API_BASE_URL}/get-usuario/${selectedProyecto.usuario_id}`),
        fetch(`${API_BASE_URL}/tareas-with-pagos/${proyectoId}`),
      ])

      if (!clienteResponse.ok || !usuarioResponse.ok || !tareasResponse.ok) {
        throw new Error('Error al obtener detalles del proyecto')
      }

      const clienteData = await clienteResponse.json()
      const usuarioData = await usuarioResponse.json()
      const tareasData = await tareasResponse.json()

      setDatosContrato((prevDatos) => ({
        ...prevDatos,
        nombreFreelance: usuarioData.usuario?.usuario_nombre || '',
        nombreCliente: clienteData.cliente?.cliente_nombre || '',
        fechaInicio: selectedProyecto.proyecto_inicio || '',
        servicios: selectedProyecto.proyecto_descripcion || '',
        precio: selectedProyecto.proyecto_presupuesto || '',
        fechaPagoFinal: selectedProyecto.proyecto_termino || '',
        entregables: tareasData.tareas_with_pagos?.map((tarea) => tarea.tarea_nombre) || [],
      }))
    } catch (error) {
      setError('Error al obtener detalles del proyecto: ' + error.message)
      toast.error('Error al cargar detalles del proyecto')
    }
  }, [selectedProyecto])

  useEffect(() => {
    if (selectedProyecto) {
      fetchProyectoDetails(selectedProyecto.proyecto_id)
    }
  }, [selectedProyecto, fetchProyectoDetails])

  const handleProyectoSelect = (e) => {
    const proyectoId = e.target.value
    const proyecto = proyectos.find((p) => p.proyecto_id === proyectoId)
    setSelectedProyecto(proyecto)
  }

  const handleInputChange = useCallback((e, index = null) => {
    const { name, value } = e.target
    setDatosContrato((prev) => {
      if (name === 'entregables') {
        const newEntregables = [...prev.entregables]
        newEntregables[index] = value
        return { ...prev, entregables: newEntregables }
      }
      return { ...prev, [name]: value }
    })
  }, [])

  const addEntregable = useCallback(() => {
    setDatosContrato((prev) => ({
      ...prev,
      entregables: [...prev.entregables, ''],
    }))
  }, [])

  const removeEntregable = useCallback((index) => {
    setDatosContrato((prev) => ({
      ...prev,
      entregables: prev.entregables.filter((_, i) => i !== index),
    }))
  }, [])

  const formatDate = useCallback((dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('es-ES', options)
  }, [])

  const renderPlaceholder = useMemo(
    () => (text) => {
      return text ? text : <span className="text-warning">[POR COMPLETAR]</span>
    },
    []
  )

  const ContractPreview = () => (
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <h3 className="text-2xl font-bold text-white mb-6">Vista Previa del Contrato</h3>

      <p className="text-sm">
        <strong className="text-primary-yellow">{renderPlaceholder(datosContrato.nombreFreelance)}</strong>{' '}
        (en adelante "CONTRATISTA") se obliga para con{' '}
        <strong className="text-primary-blue">{renderPlaceholder(datosContrato.nombreCliente)}</strong>{' '}
        (en adelante "CONTRATANTE") a ejecutar los trabajos y actividades propias del servicio
        contratado, el cual se debe realizar de acuerdo a las condiciones y cláusulas del presente
        documento y que se detallan a continuación. Ambas partes acuerdan celebrar el presente
        CONTRATO DE PRESTACIÓN DE SERVICIOS FREELANCE, a{' '}
        {renderPlaceholder(formatDate(datosContrato.fechaInicio))}.
      </p>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">PRIMERA.- OBJETO:</h4>
        <p className="text-sm">
          El CONTRATISTA realizará {renderPlaceholder(datosContrato.servicios)}, sin que exista
          relación de dependencia, ni horario determinado.
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">SEGUNDA.- PRECIO:</h4>
        <p className="text-sm">
          El CONTRATANTE pagará la suma de ${renderPlaceholder(datosContrato.precio)} al
          CONTRATISTA a través de {renderPlaceholder(datosContrato.metodoPago)} según lo acordado
          por ambas partes, a más tardar {renderPlaceholder(formatDate(datosContrato.fechaPagoFinal))}{' '}
          del cronograma de pagos acordado, por el trabajo entregado y aceptado por el Cliente.
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">TERCERO.- FORMA DE PAGO:</h4>
        <p className="text-sm mb-3">
          El valor del contrato se pagará por {renderPlaceholder(datosContrato.metodoPago)} a más
          tardar el {renderPlaceholder(formatDate(datosContrato.fechaPagoFinal))} de acuerdo al
          cronograma de entregas y pagos acordado y aceptado por el CONTRATANTE detallado a
          continuación:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {datosContrato.entregables.length > 0 ? (
            datosContrato.entregables.map((entregable, index) => (
              <li key={index}>{renderPlaceholder(entregable)}</li>
            ))
          ) : (
            <li>{renderPlaceholder('')}</li>
          )}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">CUARTA.- DURACIÓN O PLAZO:</h4>
        <p className="text-sm">
          El CONTRATISTA se compromete a prestar los servicios hasta que el contrato haya
          finalizado en la fecha acordada ({renderPlaceholder(formatDate(datosContrato.fechaPagoFinal))}).
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">QUINTA.- OBLIGACIONES:</h4>
        <p className="text-sm">
          El CONTRATANTE deberá facilitar acceso a la información y elementos que sean necesarios,
          de manera oportuna, para la debida ejecución del objeto del contrato, y, estará obligado
          a cumplir con lo estipulado en las demás cláusulas y condiciones previstas en este
          documento. El CONTRATISTA deberá cumplir en forma eficiente y oportuna los trabajos
          encomendados y aquellas obligaciones que se generen de acuerdo con la naturaleza del
          servicio.
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">SEXTA.- TERMINACIÓN</h4>
        <p className="text-sm">
          Este acuerdo puede ser terminado con un aviso por escrito de{' '}
          {renderPlaceholder(datosContrato.periodoAviso)} por cualquiera de las partes.
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">SEPTIMA.-INDEPENDENCIA:</h4>
        <p className="text-sm">
          El CONTRATISTA actuará por su cuenta, con autonomía y sin que exista relación laboral, ni
          subordinación con El CONTRATANTE. Sus derechos se limitarán por la naturaleza del
          contrato, a exigir el cumplimiento de las obligaciones del CONTRATANTE y el pago oportuno
          de su remuneración fijada en este documento.
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white mb-2">OCTAVA.- DERECHOS</h4>
        <p className="text-sm">
          El CONTRATANTE será propietario de los derechos de autor de todo el material creado bajo
          este acuerdo una vez se haya completado el pago íntegro. El CONTRATISTA puede exhibir
          obras de muestra de este proyecto como piezas de su portafolio sólo con el consentimiento
          y la aprobación del CONTRATANTE.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-700">
        <div>
          <p className="font-semibold text-white mb-2">
            El CONTRATANTE acepta los términos mencionados anteriormente:
          </p>
          <p className="text-sm">{renderPlaceholder(datosContrato.nombreCliente)}</p>
          <p className="text-sm mt-4">Fecha: ____________________</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">
            El CONTRATISTA acepta los términos mencionados anteriormente:
          </p>
          <p className="text-sm">{renderPlaceholder(datosContrato.nombreFreelance)}</p>
          <p className="text-sm mt-4">Fecha: ____________________</p>
        </div>
      </div>
    </div>
  )

  if (loadingProjects) {
    return (
      <div className="min-h-screen bg-primary-dark p-6 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="text-gray-400 mt-4">Cargando proyectos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <FileText className="text-primary-pink" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Contratos</h1>
            <p className="text-gray-400 mt-1">
              Genera contratos profesionales para tus proyectos freelance
            </p>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Datos del Contrato</h3>

            <div className="space-y-4">
              {/* Project Selection */}
              <Select
                label="Seleccionar Proyecto"
                value={selectedProyecto?.proyecto_id || ''}
                onChange={handleProyectoSelect}
                options={[
                  { value: '', label: 'Seleccione un proyecto...' },
                  ...proyectos.map((p) => ({
                    value: p.proyecto_id,
                    label: p.proyecto_nombre,
                  })),
                ]}
              />

              {selectedProyecto && (
                <>
                  {/* Freelancer and Client Names */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Tu nombre completo"
                      name="nombreFreelance"
                      value={datosContrato.nombreFreelance}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Nombre del Cliente"
                      name="nombreCliente"
                      value={datosContrato.nombreCliente}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Fecha de Inicio"
                      type="date"
                      name="fechaInicio"
                      value={datosContrato.fechaInicio}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Fecha de Pago Final"
                      type="date"
                      name="fechaPagoFinal"
                      value={datosContrato.fechaPagoFinal}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Services */}
                  <Textarea
                    label="Servicios"
                    name="servicios"
                    value={datosContrato.servicios}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />

                  {/* Price and Payment Method */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Presupuesto"
                      type="number"
                      name="precio"
                      value={datosContrato.precio}
                      onChange={handleInputChange}
                      required
                    />
                    <Select
                      label="Método de Pago"
                      name="metodoPago"
                      value={datosContrato.metodoPago}
                      onChange={handleInputChange}
                      options={[
                        { value: 'Transferencia Electrónica', label: 'Transferencia Electrónica' },
                        { value: 'Efectivo', label: 'Efectivo' },
                        { value: 'Vale Vista', label: 'Vale Vista' },
                      ]}
                      required
                    />
                  </div>

                  {/* Deliverables */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Entregables
                    </label>
                    <div className="space-y-2">
                      {datosContrato.entregables.length > 0 ? (
                        datosContrato.entregables.map((entregable, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              name="entregables"
                              value={entregable}
                              onChange={(e) => handleInputChange(e, index)}
                              required
                              className="flex-1"
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeEntregable(index)}
                              disabled={datosContrato.entregables.length === 1}
                              leftIcon={<Trash2 size={16} />}
                            >
                              Eliminar
                            </Button>
                          </div>
                        ))
                      ) : (
                        <Input
                          name="entregables"
                          value=""
                          onChange={(e) => handleInputChange(e, 0)}
                          placeholder="Agregar entregable"
                          required
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={addEntregable}
                        leftIcon={<Plus size={16} />}
                      >
                        Agregar Entregable
                      </Button>
                    </div>
                  </div>

                  {/* Notice Period */}
                  <Select
                    label="Periodo de Aviso"
                    name="periodoAviso"
                    value={datosContrato.periodoAviso}
                    onChange={handleInputChange}
                    options={[
                      { value: '15 días', label: '15 días' },
                      { value: '30 días', label: '30 días' },
                      { value: '45 días', label: '45 días' },
                      { value: '90 días', label: '90 días' },
                    ]}
                    required
                  />

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      leftIcon={<Eye size={18} />}
                      onClick={() => setShowPreview(true)}
                      className="flex-1"
                    >
                      Vista Previa
                    </Button>
                    <PDFDownloadLink
                      document={<ContractPDF datosContrato={datosContrato} />}
                      fileName="contrato.pdf"
                      className="flex-1"
                    >
                      {({ loading: pdfLoading }) => (
                        <Button
                          variant="secondary"
                          leftIcon={<Download size={18} />}
                          loading={pdfLoading}
                          className="w-full"
                        >
                          {pdfLoading ? 'Generando...' : 'Descargar PDF'}
                        </Button>
                      )}
                    </PDFDownloadLink>
                  </div>
                </>
              )}

              {!selectedProyecto && (
                <div className="text-center py-12">
                  <FileText className="mx-auto text-gray-600 mb-4" size={64} />
                  <p className="text-gray-400">
                    Selecciona un proyecto para comenzar a generar el contrato
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Preview Section (Desktop) */}
          <div className="hidden lg:block">
            {selectedProyecto && (
              <Card className="p-6 sticky top-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <ContractPreview />
              </Card>
            )}
          </div>
        </div>

        {/* Preview Modal (Mobile) */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 h-full w-full bg-primary-dark border-l border-gray-800 overflow-y-auto"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between sticky top-0 bg-primary-dark pb-4 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Vista Previa</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPreview(false)}
                      leftIcon={<X size={18} />}
                    >
                      Cerrar
                    </Button>
                  </div>
                  <ContractPreview />
                  <div className="pb-8">
                    <PDFDownloadLink
                      document={<ContractPDF datosContrato={datosContrato} />}
                      fileName="contrato.pdf"
                    >
                      {({ loading: pdfLoading }) => (
                        <Button
                          variant="secondary"
                          leftIcon={<Download size={18} />}
                          loading={pdfLoading}
                          className="w-full"
                        >
                          {pdfLoading ? 'Generando...' : 'Descargar PDF'}
                        </Button>
                      )}
                    </PDFDownloadLink>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ContratosV2
