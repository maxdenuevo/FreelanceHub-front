import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clientsApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  UserPlus, 
  Loader2, 
  UserX,
  Mail,
  Phone,
  FileText,
  Filter
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

/**
 * Clients page component
 * Displays a list of clients with search and filter capabilities
 */
const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch clients on component mount
  useEffect(() => {
    const fetchClients = async () => {
      const userId = localStorage.getItem('usuario_id');

      if (!userId) {
        setError('No se pudo cargar la información del usuario');
        setIsLoading(false);
        return;
      }

      try {
        const data = await clientsApi.getUserClients(userId);
        
        if (data.clientes && Array.isArray(data.clientes)) {
          setClients(data.clientes);
          setFilteredClients(data.clientes);
        } else {
          throw new Error('La respuesta de la API no contiene un array de clientes');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError(error.message || 'Error al obtener los clientes');
        
        toast({
          title: "Error",
          description: "No se pudieron cargar los clientes. Intenta nuevamente.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [toast]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(client => 
        client.cliente_nombre.toLowerCase().includes(value) ||
        client.cliente_email.toLowerCase().includes(value) ||
        client.cliente_rut.toLowerCase().includes(value)
      );
      setFilteredClients(filtered);
    }
  };

  // Add new client button handler
  const handleAddNewClient = () => {
    navigate('/nuevocliente');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Tus Clientes</CardTitle>
              <CardDescription>
                Gestiona la información de tus clientes
              </CardDescription>
            </div>
            
            <Button 
              onClick={handleAddNewClient}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Agregar Cliente
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filtrar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilteredClients(clients)}>
                  Todos los clientes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  const filtered = [...clients].sort((a, b) => 
                    a.cliente_nombre.localeCompare(b.cliente_nombre)
                  );
                  setFilteredClients(filtered);
                }}>
                  Ordenar por nombre
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredClients.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                    <TableHead className="hidden lg:table-cell">RUT</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map(client => (
                    <TableRow key={client.cliente_id}>
                      <TableCell className="font-medium">{client.cliente_nombre}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {client.cliente_email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {client.cliente_tel}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {client.cliente_rut}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/dashboardpage/clientes/${client.cliente_id}`)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <UserX className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              {searchTerm ? (
                <p>No se encontraron clientes con ese criterio de búsqueda.</p>
              ) : (
                <div className="space-y-3">
                  <p>No tienes clientes registrados aún.</p>
                  <Button 
                    variant="outline"
                    onClick={handleAddNewClient}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar tu primer cliente
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients; 