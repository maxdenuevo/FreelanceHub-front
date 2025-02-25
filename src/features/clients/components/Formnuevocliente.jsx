import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clientsApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { useFetch } from '@/hooks/useFetch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
  // State for client form
  const [formData, setFormData] = useState({
    clientName: '',
    clientRut: '',
    clientEmail: '',
    clientPhone: ''
  });
  
  const [clientSelection, setClientSelection] = useState('existing');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [existingClients, setExistingClients] = useState([]);
  
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Fetch user ID (needed for API calls)
  const { 
    data: userData,
    isLoading: userLoading,
    error: userError
  } = useFetch(async () => {
    const userId = localStorage.getItem('usuario_id');
    if (!userId) {
      throw new Error('No se pudo obtener la información del usuario');
    }
    
    const response = await fetch(`https://api-freelancehub.vercel.app/get-usuario/${userId}`);
    if (!response.ok) {
      throw new Error('Error al obtener información del usuario');
    }
    
    const data = await response.json();
    return data.usuario;
  });
  
  // Fetch existing clients when user data is loaded
  const { 
    data: clientsData,
    isLoading: clientsLoading,
    error: clientsError
  } = useFetch(async () => {
    if (!userData?.usuario_id) return [];
    
    const data = await clientsApi.getUserClients(userData.usuario_id);
    return data.clientes || [];
  }, [userData]);
  
  // Update existing clients when data is loaded
  useEffect(() => {
    if (clientsData && Array.isArray(clientsData)) {
      setExistingClients(clientsData);
      
      // If there are clients, default to existing tab
      if (clientsData.length > 0) {
        setClientSelection('existing');
      } else {
        // If no clients, default to new client tab
        setClientSelection('new');
      }
    }
  }, [clientsData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle client selection tab change
  const handleClientSelectionChange = (value) => {
    setClientSelection(value);
  };
  
  // Handle selection of existing client
  const handleExistingClientSelect = (value) => {
    setSelectedClientId(value);
  };

  // Handle form back button
  const handleBack = () => {
    navigate(-1);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (clientSelection === 'existing') {
      if (!selectedClientId) {
        toast({
          title: "Error",
          description: "Por favor selecciona un cliente existente",
          variant: "destructive",
        });
        return;
      }
      
      navigate('/nuevocliente/nuevoproyecto', { 
        state: { clienteId: selectedClientId } 
      });
      return;
    }
    
    // Validate new client form
    if (!formData.clientName || !formData.clientEmail || !formData.clientRut) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (!userData?.usuario_id) {
        throw new Error('No se pudo obtener la información del usuario');
      }
      
      const clienteData = {
        usuario_id: userData.usuario_id,
        cliente_nombre: formData.clientName,
        cliente_email: formData.clientEmail,
        cliente_tel: formData.clientPhone,
        cliente_rut: formData.clientRut,
      };
      
      const response = await clientsApi.createClient(clienteData);
      
      toast({
        title: "Cliente creado",
        description: "El cliente se ha registrado correctamente",
        variant: "success",
      });
      
      navigate('/nuevocliente/nuevoproyecto', { 
        state: { clienteId: response.cliente_id } 
      });
    } catch (error) {
      console.error('Error al agregar cliente:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo agregar el cliente",
        variant: "destructive",
      });
    }
  };

  // Loading state
  const isLoading = userLoading || clientsLoading;
  const error = userError || clientsError;

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cliente para el Proyecto</CardTitle>
          <CardDescription>
            Selecciona un cliente existente o crea uno nuevo para asociar al proyecto
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs 
              value={clientSelection} 
              onValueChange={handleClientSelectionChange}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger 
                  value="existing" 
                  disabled={existingClients.length === 0}
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Cliente Existente
                </TabsTrigger>
                <TabsTrigger 
                  value="new"
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Nuevo Cliente
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="existing" className="space-y-4">
                {existingClients.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientSelect">Selecciona un Cliente</Label>
                      <Select onValueChange={handleExistingClientSelect} value={selectedClientId}>
                        <SelectTrigger id="clientSelect">
                          <SelectValue placeholder="Selecciona un cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {existingClients.map(client => (
                            <SelectItem 
                              key={client.cliente_id} 
                              value={client.cliente_id}
                            >
                              {client.cliente_nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedClientId && (
                      <div className="border rounded-md p-4 bg-muted/50">
                        {existingClients.map(client => 
                          client.cliente_id === selectedClientId && (
                            <div key={client.cliente_id} className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-muted-foreground">Nombre</Label>
                                  <p>{client.cliente_nombre}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">RUT</Label>
                                  <p>{client.cliente_rut}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-muted-foreground">Email</Label>
                                  <p>{client.cliente_email}</p>
                                </div>
                                <div>
                                  <Label className="text-muted-foreground">Teléfono</Label>
                                  <p>{client.cliente_tel}</p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>
                      No tienes clientes registrados. Por favor crea un nuevo cliente.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>
              
              <TabsContent value="new" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Nombre del Cliente *</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="clientRut">RUT *</Label>
                      <Input
                        id="clientRut"
                        value={formData.clientRut}
                        onChange={handleInputChange}
                        placeholder="Ej: 12.345.678-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">Email *</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={handleInputChange}
                        placeholder="ejemplo@correo.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="clientPhone">Teléfono</Label>
                      <Input
                        id="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleInputChange}
                        placeholder="Teléfono de contacto"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Formnuevocliente; 