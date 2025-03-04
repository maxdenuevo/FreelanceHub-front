import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFetch } from '@/hooks/useFetch';

const statusColors = {
  active: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  draft: "bg-gray-100 text-gray-800"
};

const Contracts = () => {
  const { toast } = useToast();
  const { data: contracts, isLoading, error, refetch } = 
    useFetch('api/contratos', true); // Updated endpoint for contracts
  
  const { data: clients } = 
    useFetch('api/clientes', true); // For reference if needed

  React.useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los contratos. Por favor intente nuevamente."
      });
    }
  }, [error, toast]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
            <p className="text-muted-foreground mt-2">
              Gestiona tus contratos con clientes y colaboradores
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo Contrato
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">Todos</Button>
              <Button variant="outline" size="sm" className="text-xs bg-green-50 text-green-700 border-green-200">Activos</Button>
              <Button variant="outline" size="sm" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">Pendientes</Button>
              <Button variant="outline" size="sm" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Completados</Button>
              <Button variant="outline" size="sm" className="text-xs bg-red-50 text-red-700 border-red-200">Cancelados</Button>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar contrato..." 
                className="w-full sm:w-60 h-9 px-3 rounded-md border border-input bg-background text-sm"
              />
              <span className="absolute right-3 top-2.5 text-muted-foreground">🔍</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts list */}
      <div className="grid gap-4">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, index) => (
            <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="p-6">
                <div className="h-6 w-1/4 bg-muted animate-pulse rounded mb-3"></div>
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
                  <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            </Card>
          ))
        ) : contracts?.length > 0 ? (
          contracts.map((contract) => (
            <Card key={contract.id} className="overflow-hidden shadow-sm hover:shadow-md transition-all border-l-4 border-l-primary">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold mb-1 sm:mb-0">{contract.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[contract.status] || statusColors.draft}`}>
                      {contract.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ID: {contract.id}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2 mb-4">{contract.description}</p>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col text-sm">
                    <span className="text-muted-foreground">Cliente:</span>
                    <span className="font-medium">{contract.client}</span>
                  </div>
                  
                  <div className="flex flex-col text-sm">
                    <span className="text-muted-foreground">Monto:</span>
                    <span className="font-medium">${contract.amount?.toLocaleString() || 0}</span>
                  </div>
                  
                  <div className="flex flex-col text-sm">
                    <span className="text-muted-foreground">Fecha Inicio:</span>
                    <span className="font-medium">{formatDate(contract.startDate)}</span>
                  </div>
                  
                  <div className="flex flex-col text-sm">
                    <span className="text-muted-foreground">Fecha Fin:</span>
                    <span className="font-medium">{formatDate(contract.endDate)}</span>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" className="text-xs mr-2">Ver Detalles</Button>
                  <Button variant="secondary" size="sm" className="text-xs">Descargar PDF</Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          // Empty state
          <Card className="py-12 text-center">
            <CardContent>
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted flex items-center justify-center text-3xl">
                📄
              </div>
              <CardTitle className="text-xl mb-2">No hay contratos disponibles</CardTitle>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Comienza creando tu primer contrato para gestionar tus acuerdos con clientes.
              </p>
              <Button>
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Crear Contrato
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Contracts; 