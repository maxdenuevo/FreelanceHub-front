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
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Pencil, 
  Trash2, 
  Plus, 
  X, 
  Save,
  Calendar,
  AlertCircle,
  Loader2 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Tareas = ({ proyectoSeleccionado }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [mostrarAgregarTarea, setMostrarAgregarTarea] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    tareaNombre: '',
    descripcionTarea: '',
    fechaLimiteTarea: '',
    tareaCompletada: false,
    pendientePagoTarea: false
  });
  
  const [editarTareaId, setEditarTareaId] = useState(null);

  useEffect(() => {
    if (proyectoSeleccionado) {
      fetchTareas();
    } else {
      setTareas([]);
    }
  }, [proyectoSeleccionado]);

  const fetchTareas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api-freelancehub.vercel.app/tareas/${proyectoSeleccionado}`);
      if (!response.ok) throw new Error('Error al obtener las tareas');
      
      const data = await response.json();
      if (data && Array.isArray(data.tareas)) {
        setTareas(data.tareas);
        setError('');
      } else {
        throw new Error('Formato de datos inválido');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = editarTareaId 
      ? `https://api-freelancehub.vercel.app/tarea/${editarTareaId}` 
      : 'https://api-freelancehub.vercel.app/create-tarea';

    try {
      const response = await fetch(url, {
        method: editarTareaId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proyecto_id: proyectoSeleccionado,
          tarea_nombre: formData.tareaNombre,
          tarea_fecha: formData.fechaLimiteTarea,
          tarea_descripcion: formData.descripcionTarea,
          tarea_completada: formData.tareaCompletada,
          tarea_necesita_pago: formData.pendientePagoTarea,
        }),
      });

      if (!response.ok) throw new Error('Error al guardar la tarea');
      
      await fetchTareas();
      resetForm();
      setMostrarAgregarTarea(false);
      
      if (!editarTareaId) {
        enviarCorreoRecordatorio(formData.tareaNombre, formData.fechaLimiteTarea);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) return;
    
    try {
      const response = await fetch(`https://api-freelancehub.vercel.app/tarea/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('No se pudo eliminar la tarea, aún tiene pagos asociados');
      
      await fetchTareas();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (tarea) => {
    setFormData({
      tareaNombre: tarea?.tarea_nombre || '',
      descripcionTarea: tarea?.tarea_descripcion || '',
      fechaLimiteTarea: tarea?.tarea_fecha?.split('T')[0] || '',
      tareaCompletada: tarea?.tarea_completada || false,
      pendientePagoTarea: tarea?.tarea_necesita_pago || false,
    });
    setEditarTareaId(tarea?.tarea_id);
    setMostrarAgregarTarea(true);
  };

  const resetForm = () => {
    setFormData({
      tareaNombre: '',
      descripcionTarea: '',
      fechaLimiteTarea: '',
      tareaCompletada: false,
      pendientePagoTarea: false,
    });
    setEditarTareaId(null);
  };

  const enviarCorreoRecordatorio = async (tareaNombre, fechaLimiteTarea) => {
    const email = localStorage.getItem('usuario_email');
    if (!email) return;

    try {
      const response = await fetch('https://api-freelancehub.vercel.app/send-email-recordatorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Recordatorio de Tarea Pendiente',
          recipients: [email],
          body: `Recordatorio: la tarea "${tareaNombre}" tiene su fecha límite hoy.\n\nAtentamente,\nFreelanceHub`,
        }),
      });

      if (!response.ok) throw new Error('Error al enviar el correo');
    } catch (err) {
      console.error('Error al enviar correo:', err);
    }
  };

  const formatoFecha = (fecha) => {
    try {
      return format(new Date(fecha), 'dd MMMM yyyy', { locale: es });
    } catch (err) {
      console.error('Error al formatear fecha:', err);
      return fecha;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Tareas del Proyecto</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Gestiona las actividades del proyecto: agrega, visualiza, elimina y marca tareas como completadas.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Tarea</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : tareas.length > 0 ? (
                tareas.map((tarea, index) => (
                  <TableRow key={tarea?.tarea_id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{tarea?.tarea_nombre}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatoFecha(tarea?.tarea_fecha)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Recibirás un recordatorio por correo
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{tarea?.tarea_descripcion}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tarea?.tarea_completada 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tarea?.tarea_completada ? 'Completada' : 'Pendiente'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tarea?.tarea_necesita_pago 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tarea?.tarea_necesita_pago ? 'Requiere Pago' : 'Sin Pago'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(tarea)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(tarea?.tarea_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No hay tareas asignadas para este proyecto.
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
            onClick={() => setMostrarAgregarTarea(!mostrarAgregarTarea)}
          >
            {mostrarAgregarTarea ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {mostrarAgregarTarea && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="tareaNombre">Nombre de la Tarea</Label>
                <Input
                  id="tareaNombre"
                  value={formData.tareaNombre}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tareaNombre: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcionTarea">Descripción</Label>
                <Textarea
                  id="descripcionTarea"
                  value={formData.descripcionTarea}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    descripcionTarea: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaLimiteTarea">Fecha Límite</Label>
                <Input
                  id="fechaLimiteTarea"
                  type="date"
                  value={formData.fechaLimiteTarea}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    fechaLimiteTarea: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tareaCompletada"
                  checked={formData.tareaCompletada}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    tareaCompletada: checked
                  }))}
                />
                <Label htmlFor="tareaCompletada">Tarea Completada</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pendientePagoTarea"
                  checked={formData.pendientePagoTarea}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    pendientePagoTarea: checked
                  }))}
                />
                <Label htmlFor="pendientePagoTarea">Requiere Pago</Label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default Tareas;