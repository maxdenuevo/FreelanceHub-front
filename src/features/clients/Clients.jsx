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
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Clients page component
 * Displays a list of clients with search and filter capabilities
 */
const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch clients on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // For now, we'll use mock data
        // In a real app, we would use: const data = await clientsApi.getAll();
        setClients([
          { 
            id: 1, 
            name: 'Empresa XYZ', 
            contact: 'Juan Pérez',
            email: 'juan@xyz.com',
            phone: '+56 9 1234 5678',
            projects: 3,
            totalValue: 2500000
          },
          { 
            id: 2, 
            name: 'Startup ABC', 
            contact: 'María González',
            email: 'maria@abc.com',
            phone: '+56 9 8765 4321',
            projects: 1,
            totalValue: 3000000
          },
          { 
            id: 3, 
            name: 'Cliente Personal', 
            contact: 'Pedro Soto',
            email: 'pedro@mail.com',
            phone: '+56 9 5555 5555',
            projects: 2,
            totalValue: 900000
          },
          { 
            id: 4, 
            name: 'Comercial DEF', 
            contact: 'Ana Muñoz',
            email: 'ana@def.com',
            phone: '+56 9 4444 4444',
            projects: 1,
            totalValue: 1500000
          }
        ]);
        setFilteredClients(clients);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los clientes');
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los clientes',
          variant: 'destructive'
        });
        setLoading(false);
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
        client.name.toLowerCase().includes(value) ||
        client.email.toLowerCase().includes(value) ||
        client.contact.toLowerCase().includes(value)
      );
      setFilteredClients(filtered);
    }
  };

  // Add new client button handler
  const handleAddNewClient = () => {
    navigate('/nuevocliente');
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <Skeleton className="h-12 w-full" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full mt-1" />
          ))}
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <p className="font-medium">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-2"
            variant="outline"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

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
                    a.name.localeCompare(b.name)
                  );
                  setFilteredClients(filtered);
                }}>
                  Ordenar por nombre
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {clients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <UserX className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
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
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                    <TableHead className="hidden lg:table-cell">Proyectos</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map(client => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {client.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {client.phone}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {client.projects}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/dashboardpage/clientes/${client.id}`)}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients; 