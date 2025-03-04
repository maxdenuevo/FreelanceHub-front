import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useFetch } from '@/hooks/useFetch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  UserPlus,
  Users,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

/**
 * Form for creating a new client
 * Allows selecting an existing client or creating a new one
 */
const Formnuevocliente = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem('usuario_id');
  
  // State management and other variables
  const [activeTab, setActiveTab] = useState('new');
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    direccion: '',
    empresa: '',
    usuario_id: userId // Link to the current user
  });
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data
  const { data: userInfo, isLoading: userLoading } = 
    useFetch(`api/usuarios/${userId}`, true);
  
  // Fetch clients for the current user
  const { data: clients, isLoading: clientsLoading } = 
    useFetch(`api/clientes?usuario_id=${userId}`, true);

  // Form handlers and submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClientSelect = (e) => {
    const clientId = e.target.value;
    if (clientId === "") {
      setSelectedClient(null);
      return;
    }
    
    const client = clients.find(c => c.id === parseInt(clientId));
    setSelectedClient(client);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (activeTab === 'new' && !formData.nombre) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Por favor ingrese al menos el nombre del cliente"
        });
        setIsSubmitting(false);
        return;
      }
      
      if (activeTab === 'existing' && !selectedClient) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Por favor seleccione un cliente"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Create new client if needed
      let clientToUse = selectedClient;
      
      if (activeTab === 'new') {
        // Make API call to create a new client
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/clientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error('Error al crear el cliente');
        }
        
        clientToUse = await response.json();
      }
      
      toast({
        title: "Éxito",
        description: activeTab === 'new' ? "Cliente creado correctamente" : "Cliente seleccionado correctamente"
      });
      
      // Navigate to the next step (create project with this client)
      navigate('/nuevocliente/nuevoproyecto', { 
        state: { client: clientToUse } 
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo crear/seleccionar el cliente"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = userLoading || clientsLoading;

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <Card className="max-w-xl mx-auto shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-2xl">
            {activeTab === 'new' ? 'Nuevo Cliente' : 'Seleccionar Cliente'}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Paso 1 de 3: Información del cliente
          </div>
        </CardHeader>
        
        <div className="flex border-b">
          <button 
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'new' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('new')}
          >
            Nuevo Cliente
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'existing' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('existing')}
            disabled={clients?.length === 0}
          >
            Cliente Existente
          </button>
        </div>
        
        <CardContent className="pt-6">
          {isLoading ? (
            // Loading state
            <div className="space-y-3">
              <div className="h-10 bg-muted animate-pulse rounded w-full"></div>
              <div className="h-10 bg-muted animate-pulse rounded w-full"></div>
              <div className="h-10 bg-muted animate-pulse rounded w-full"></div>
            </div>
          ) : (
            // Form content
            <form onSubmit={handleSubmit}>
              {activeTab === 'new' ? (
                // New client form
                <div className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre<span className="text-red-500">*</span></Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre del cliente"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rut">RUT</Label>
                      <Input
                        id="rut"
                        name="rut"
                        value={formData.rut}
                        onChange={handleInputChange}
                        placeholder="12.345.678-9"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+56 9 12345678"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Nombre de la empresa"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      placeholder="Calle, número, comuna, ciudad"
                    />
                  </div>
                </div>
              ) : (
                // Existing client select
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Seleccionar Cliente<span className="text-red-500">*</span></Label>
                    <select
                      id="cliente"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                      onChange={handleClientSelect}
                      value={selectedClient?.id || ""}
                    >
                      <option value="">Seleccionar un cliente</option>
                      {clients?.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.nombre} {client.empresa ? `(${client.empresa})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedClient && (
                    <div className="border rounded-md p-4 bg-muted/20">
                      <h3 className="font-medium mb-2">Información del cliente</h3>
                      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 text-sm">
                        <div>
                          <span className="font-medium">Nombre:</span> {selectedClient.nombre}
                        </div>
                        {selectedClient.empresa && (
                          <div>
                            <span className="font-medium">Empresa:</span> {selectedClient.empresa}
                          </div>
                        )}
                        {selectedClient.email && (
                          <div>
                            <span className="font-medium">Email:</span> {selectedClient.email}
                          </div>
                        )}
                        {selectedClient.telefono && (
                          <div>
                            <span className="font-medium">Teléfono:</span> {selectedClient.telefono}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button 
            disabled={isSubmitting || isLoading}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              'Continuar'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Formnuevocliente; 