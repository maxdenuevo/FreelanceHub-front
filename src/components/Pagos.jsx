import { useState, useEffect, useMemo } from 'react';
import { format, differenceInDays, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { DollarSign, FileText, CheckCircle, Edit2, Trash2, Plus, X, Upload, Download, Search, Filter, Bell, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Input, Select, Button, Badge, Alert, Spinner, Modal } from './ui';
import { ChartCard } from './features/dashboard/ChartCard';
import { useTasks } from '../hooks';
import { paymentsService } from '../services';
import { toast } from './ui/Toast';

/**
 * Pagos v2.2 - Advanced payment management
 * Features: Filtros, búsqueda, export CSV/Excel, gráficos, recordatorios
 */
function PagosV2({ proyectoSeleccionado }) {
  const [pagos, setPagos] = useState([]);
  const [mostrarAgregarPago, setMostrarAgregarPago] = useState(false);
  const [pagoMonto, setPagoMonto] = useState('');
  const [pagoFecha, setPagoFecha] = useState('');
  const [pagoCompletado, setPagoCompletado] = useState(false);
  const [pagoComprobante, setPagoComprobante] = useState(null);
  const [tareaSeleccionada, setTareaSeleccionada] = useState('');
  const [editarPagoId, setEditarPagoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos'); // todos, completados, pendientes
  const [showFilters, setShowFilters] = useState(false);

  // Usar hook de tareas para obtener la lista
  const { tasks: tareas, loading: tareasLoading } = useTasks(proyectoSeleccionado);

  useEffect(() => {
    if (proyectoSeleccionado) {
      fetchPagos();
    } else {
      setPagos([]);
    }
  }, [proyectoSeleccionado]);

  const fetchPagos = async () => {
    if (!proyectoSeleccionado) return;

    setLoading(true);
    setError('');

    try {
      const response = await paymentsService.getByProject(proyectoSeleccionado);
      setPagos(response.data.pagos || []);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al obtener los pagos';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar y buscar pagos
  const pagosFiltrados = useMemo(() => {
    let filtered = [...pagos];

    // Aplicar filtro de estado
    if (filterStatus === 'completados') {
      filtered = filtered.filter(p => p.pago_completado);
    } else if (filterStatus === 'pendientes') {
      filtered = filtered.filter(p => !p.pago_completado);
    }

    // Aplicar búsqueda
    if (searchTerm) {
      filtered = filtered.filter(pago => {
        const tarea = tareas.find(t => t.tarea_id === pago.tarea_id);
        const tareaNombre = tarea?.tarea_nombre?.toLowerCase() || '';
        const pagoMontoStr = pago.pago_monto?.toString() || '';
        const search = searchTerm.toLowerCase();

        return tareaNombre.includes(search) || pagoMontoStr.includes(search);
      });
    }

    return filtered;
  }, [pagos, filterStatus, searchTerm, tareas]);

  // Calcular datos para gráficos
  const chartData = useMemo(() => {
    if (pagos.length === 0) return [];

    // Agrupar pagos por mes (últimos 6 meses)
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 5);
    const months = eachMonthOfInterval({ start: sixMonthsAgo, end: now });

    return months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const pagosMes = pagos.filter(pago => {
        const pagoDate = new Date(pago.pago_fecha);
        return pagoDate >= monthStart && pagoDate <= monthEnd && pago.pago_completado;
      });

      const total = pagosMes.reduce((sum, p) => sum + parseFloat(p.pago_monto || 0), 0);

      return {
        mes: format(month, 'MMM', { locale: es }),
        ingresos: total,
      };
    });
  }, [pagos]);

  // Detectar pagos próximos a vencer (pendientes con fecha cercana)
  const pagosProximosAVencer = useMemo(() => {
    const now = new Date();
    return pagos.filter(pago => {
      if (pago.pago_completado) return false;
      const pagoDate = new Date(pago.pago_fecha);
      const daysUntil = differenceInDays(pagoDate, now);
      return daysUntil >= 0 && daysUntil <= 7; // Próximos 7 días
    });
  }, [pagos]);

  const agregarPago = async (e) => {
    e.preventDefault();

    if (!tareaSeleccionada || !pagoMonto || !pagoFecha) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('proyecto_id', proyectoSeleccionado);
      formData.append('tarea_id', tareaSeleccionada);
      formData.append('pago_monto', pagoMonto);
      formData.append('pago_fecha', pagoFecha);
      formData.append('pago_completado', pagoCompletado);

      if (pagoComprobante) {
        formData.append('pago_comprobante', pagoComprobante);
      }

      if (editarPagoId) {
        await paymentsService.update(editarPagoId, formData);
        toast.success('Pago actualizado correctamente');
      } else {
        await paymentsService.create(formData);
        toast.success('Pago creado correctamente');
      }

      setMostrarAgregarPago(false);
      resetFormulario();
      await fetchPagos();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al guardar el pago';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const eliminarPago = async (pago) => {
    if (!window.confirm(`¿Estás seguro de eliminar este pago de $${pago.pago_monto}?`)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await paymentsService.delete(pago.pago_id);
      toast.success('Pago eliminado correctamente');
      await fetchPagos();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al eliminar el pago';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const manejarEdicionPago = (pago) => {
    setTareaSeleccionada(pago.tarea_id || '');
    setPagoMonto(pago.pago_monto || '');
    setPagoFecha(pago.pago_fecha ? pago.pago_fecha.split('T')[0] : '');
    setPagoCompletado(pago.pago_completado || false);
    setEditarPagoId(pago.pago_id);
    setMostrarAgregarPago(true);
  };

  const resetFormulario = () => {
    setTareaSeleccionada('');
    setPagoMonto('');
    setPagoFecha('');
    setPagoCompletado(false);
    setPagoComprobante(null);
    setEditarPagoId(null);
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

  const calcularTotal = () => {
    return pagos.reduce((sum, pago) => sum + parseFloat(pago.pago_monto || 0), 0);
  };

  const calcularTotalCompletado = () => {
    return pagos
      .filter(p => p.pago_completado)
      .reduce((sum, pago) => sum + parseFloat(pago.pago_monto || 0), 0);
  };

  // Export a CSV
  const exportToCSV = () => {
    if (pagosFiltrados.length === 0) {
      toast.error('No hay pagos para exportar');
      return;
    }

    const headers = ['#', 'Tarea', 'Monto', 'Fecha', 'Estado', 'Comprobante'];
    const rows = pagosFiltrados.map((pago, index) => {
      const tarea = tareas.find(t => t.tarea_id === pago.tarea_id);
      return [
        index + 1,
        tarea?.tarea_nombre || 'N/A',
        `$${parseFloat(pago.pago_monto || 0).toLocaleString()}`,
        formatoFecha(pago.pago_fecha),
        pago.pago_completado ? 'Completado' : 'Pendiente',
        pago.pago_comprobante ? 'Sí' : 'No',
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `pagos_proyecto_${proyectoSeleccionado}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Archivo CSV descargado correctamente');
  };

  if (!proyectoSeleccionado) {
    return (
      <div className="text-center py-12">
        <DollarSign className="mx-auto text-gray-600 mb-4" size={64} />
        <p className="text-gray-400">Selecciona un proyecto para ver los pagos</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign size={28} className="text-success" />
            Pagos del Proyecto
          </h2>
          <p className="text-gray-400 mt-1">
            Gestiona pagos, exporta datos y visualiza estadísticas
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            leftIcon={<Download size={18} />}
            onClick={exportToCSV}
            disabled={loading || pagosFiltrados.length === 0}
          >
            Exportar CSV
          </Button>
          <Button
            leftIcon={<Plus size={18} />}
            onClick={() => setMostrarAgregarPago(true)}
            disabled={loading}
          >
            Agregar Pago
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="error" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Recordatorios de pagos próximos a vencer */}
      {pagosProximosAVencer.length > 0 && (
        <Alert variant="warning" icon={<Bell size={18} />}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold mb-1">Pagos próximos a vencer</p>
              <p className="text-sm">
                Tienes {pagosProximosAVencer.length} pago(s) pendiente(s) en los próximos 7 días
              </p>
            </div>
          </div>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Pagos</p>
                <p className="text-2xl font-bold text-white">{pagos.length}</p>
              </div>
              <FileText className="text-primary-blue" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Presupuesto</p>
                <p className="text-2xl font-bold text-white">
                  ${calcularTotal().toLocaleString()}
                </p>
              </div>
              <DollarSign className="text-primary-yellow" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Completado</p>
                <p className="text-2xl font-bold text-success">
                  ${calcularTotalCompletado().toLocaleString()}
                </p>
              </div>
              <CheckCircle className="text-success" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de pagos por mes */}
      {chartData.length > 0 && (
        <ChartCard
          title="Pagos Completados por Mes"
          subtitle="Últimos 6 meses"
          type="bar"
          data={chartData}
          xKey="mes"
          yKey="ingresos"
          color="#b9d84d"
          height={250}
        />
      )}

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por tarea o monto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
            </div>

            {/* Filtro de estado */}
            <div className="md:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option value="todos">Todos</option>
                <option value="completados">Completados</option>
                <option value="pendientes">Pendientes</option>
              </select>
            </div>
          </div>

          {/* Resultados de búsqueda */}
          {(searchTerm || filterStatus !== 'todos') && (
            <div className="mt-3 text-sm text-gray-400">
              Mostrando {pagosFiltrados.length} de {pagos.length} pagos
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payments List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : pagosFiltrados.length > 0 ? (
        <div className="space-y-3">
          {pagosFiltrados.map((pago) => {
            const tarea = tareas.find(t => t.tarea_id === pago.tarea_id);
            const pagoDate = new Date(pago.pago_fecha);
            const daysUntil = differenceInDays(pagoDate, new Date());
            const isUpcoming = !pago.pago_completado && daysUntil >= 0 && daysUntil <= 7;

            return (
              <Card key={pago.pago_id} className={`hover:border-primary-blue/50 transition-colors ${isUpcoming ? 'border-yellow-500/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {tarea?.tarea_nombre || 'Tarea no encontrada'}
                        </h3>
                        <Badge variant={pago.pago_completado ? 'success' : 'warning'}>
                          {pago.pago_completado ? 'Completado' : 'Pendiente'}
                        </Badge>
                        {isUpcoming && (
                          <Badge variant="error" icon={<Bell size={14} />}>
                            Vence en {daysUntil} {daysUntil === 1 ? 'día' : 'días'}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <DollarSign size={16} />
                          ${parseFloat(pago.pago_monto || 0).toLocaleString()}
                        </span>
                        <span>{formatoFecha(pago.pago_fecha)}</span>
                        {pago.pago_comprobante && (
                          <a
                            href={pago.pago_comprobante}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-blue hover:text-primary-yellow transition-colors flex items-center gap-1"
                          >
                            <FileText size={16} />
                            Ver Comprobante
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Edit2 size={16} />}
                        onClick={() => manejarEdicionPago(pago)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => eliminarPago(pago)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : searchTerm || filterStatus !== 'todos' ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="mx-auto text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 mb-4">No se encontraron pagos con los filtros aplicados</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('todos');
              }}
            >
              Limpiar filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign className="mx-auto text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 mb-4">No hay pagos registrados para este proyecto</p>
            <Button
              leftIcon={<Plus size={18} />}
              onClick={() => setMostrarAgregarPago(true)}
            >
              Agregar Primer Pago
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Payment Modal */}
      <Modal
        isOpen={mostrarAgregarPago}
        onClose={() => {
          setMostrarAgregarPago(false);
          resetFormulario();
        }}
        title={editarPagoId ? 'Editar Pago' : 'Agregar Pago'}
        size="md"
      >
        <form onSubmit={agregarPago} className="space-y-4 p-4">
          <Select
            label="Tarea"
            value={tareaSeleccionada}
            onChange={(e) => setTareaSeleccionada(e.target.value)}
            required
          >
            <option value="">Seleccionar tarea...</option>
            {tareas.map((tarea) => (
              <option key={tarea.tarea_id} value={tarea.tarea_id}>
                {tarea.tarea_nombre}
              </option>
            ))}
          </Select>

          <Input
            label="Monto del Pago"
            type="number"
            step="0.01"
            value={pagoMonto}
            onChange={(e) => setPagoMonto(e.target.value)}
            required
            placeholder="0.00"
          />

          <Input
            label="Fecha del Pago"
            type="date"
            value={pagoFecha}
            onChange={(e) => setPagoFecha(e.target.value)}
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pagoCompletado"
              checked={pagoCompletado}
              onChange={(e) => setPagoCompletado(e.target.checked)}
              className="w-4 h-4 text-primary-blue bg-gray-700 border-gray-600 rounded focus:ring-primary-blue focus:ring-2"
            />
            <label htmlFor="pagoCompletado" className="text-sm text-gray-300">
              Marcar como completado
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Comprobante (opcional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="pagoComprobante"
                onChange={(e) => setPagoComprobante(e.target.files[0])}
                className="hidden"
                accept="image/*,application/pdf"
              />
              <label
                htmlFor="pagoComprobante"
                className="flex-1 cursor-pointer bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                {pagoComprobante ? pagoComprobante.name : 'Seleccionar archivo'}
              </label>
              {pagoComprobante && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setPagoComprobante(null)}
                  leftIcon={<X size={16} />}
                >
                  Quitar
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Formatos permitidos: imágenes y PDF
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setMostrarAgregarPago(false);
                resetFormulario();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Guardando...
                </>
              ) : (
                <>{editarPagoId ? 'Actualizar' : 'Crear'} Pago</>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PagosV2;
