import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Plus, X, Save, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Pagos = ({ proyectoSeleccionado }) => {
  const [pagos, setPagos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [mostrarAgregarPago, setMostrarAgregarPago] = useState(false);
  const [formData, setFormData] = useState({
    tareaSeleccionada: '',
    pagoMonto: '',
    pagoFecha: '',
    pagoCompletado: false,
    pagoComprobante: null
  });
  const [editarPagoId, setEditarPagoId] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (proyectoSeleccionado) {
      fetchData();
    } else {
      resetState();
    }
  }, [proyectoSeleccionado]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [pagosRes, tareasRes] = await Promise.all([
        fetch(`https://api-freelancehub.vercel.app/pagos/${proyectoSeleccionado}`),
        fetch(`https://api-freelancehub.vercel.app/tareas/${proyectoSeleccionado}`)
      ]);

      if (!pagosRes.ok || !tareasRes.ok) throw new Error('Error fetching data');

      const pagosData = await pagosRes.json();
      const tareasData = await tareasRes.json();

      setPagos(pagosData.pagos);
      setTareas(tareasData.tareas);
      setError('');
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = editarPagoId 
      ? `https://api-freelancehub.vercel.app/pago/${editarPagoId}` 
      : 'https://api-freelancehub.vercel.app/create-pago';

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formDataObj.append(key, value);
      });

      const response = await fetch(url, {
        method: editarPagoId ? 'PATCH' : 'POST',
        body: formDataObj,
      });

      if (!response.ok) throw new Error('Error al guardar el pago');

      await fetchData();
      resetForm();
      setMostrarAgregarPago(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (pagoId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este pago?')) return;

    try {
      const response = await fetch(`https://api-freelancehub.vercel.app/pago/${pagoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar el pago');
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (pago) => {
    setFormData({
      tareaSeleccionada: pago.tarea_id || '',
      pagoMonto: pago.pago_monto || '',
      pagoFecha: pago.pago_fecha?.split('T')[0] || '',
      pagoCompletado: pago.pago_completado || false,
      pagoComprobante: null
    });
    setEditarPagoId(pago.pago_id);
    setMostrarAgregarPago(true);
  };

  const resetForm = () => {
    setFormData({
      tareaSeleccionada: '',
      pagoMonto: '',
      pagoFecha: '',
      pagoCompletado: false,
      pagoComprobante: null
    });
    setEditarPagoId(null);
  };

  const resetState = () => {
    setPagos([]);
    setTareas([]);
    resetForm();
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'dd MMMM yyyy', { locale: es });
    } catch (err) {
      console.error('Error formatting date:', err);
      return date;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Pagos del Proyecto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Tarea</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comprobante</TableHead>
                  <TableHead className="w-24">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagos.length > 0 ? (
                  pagos.map((pago, index) => {
                    const tarea = tareas.find(t => t?.tarea_id === pago?.tarea_id);
                    return (
                      <TableRow key={pago.pago_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{tarea?.tarea_nombre}</TableCell>
                        <TableCell>${pago.pago_monto}</TableCell>
                        <TableCell>{formatDate(pago.pago_fecha)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            pago.pago_completado 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {pago.pago_completado ? 'Completado' : 'Pendiente'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {pago.pago_comprobante && (
                            <a 
                              href={pago.pago_comprobante}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Ver</span>
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(pago)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(pago.pago_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No hay pagos registrados para este proyecto.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMostrarAgregarPago(!mostrarAgregarPago)}
            >
              {mostrarAgregarPago ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>

          {mostrarAgregarPago && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tareaSeleccionada">Tarea</Label>
                  <select
                    id="tareaSeleccionada"
                    className="w-full rounded-md border p-2"
                    value={formData.tareaSeleccionada}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      tareaSeleccionada: e.target.value
                    }))}
                    required
                  >
                    <option value="">Seleccionar tarea</option>
                    {tareas.map(tarea => (
                      <option key={tarea.tarea_id} value={tarea.tarea_id}>
                        {tarea.tarea_nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pagoMonto">Monto del Pago</Label>
                  <Input
                    type="number"
                    step="0.01"
                    id="pagoMonto"
                    value={formData.pagoMonto}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pagoMonto: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pagoFecha">Fecha del Pago</Label>
                  <Input
                    type="date"
                    id="pagoFecha"
                    value={formData.pagoFecha}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pagoFecha: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pagoComprobante">Comprobante</Label>
                  <Input
                    type="file"
                    id="pagoComprobante"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pagoComprobante: e.target.files[0]
                    }))}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pagoCompletado"
                    checked={formData.pagoCompletado}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      pagoCompletado: e.target.checked
                    }))}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="pagoCompletado">Pago Completado</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Pagos;