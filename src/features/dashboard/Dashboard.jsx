import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { H2, H3, P, Muted } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { useFetch } from '@/hooks/useFetch';
import { Stack, HStack, Spacer } from '@/components/ui/spacing';
import { Text } from '@/components/ui/text';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { Grid } from '@/components/ui/grid';
import { Badge } from '@/components/ui/badge';
import { AnimatedList } from '@/components/ui/animated-list';
import { ShowAt, HideAt } from '@/components/ui/responsive';

const StatCard = ({ title, value, icon, trend = 0, description }) => (
  <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${
        trend > 0 ? 'text-green-500' : 
        trend < 0 ? 'text-red-500' : 
        'text-gray-500'
      }`}>
        {trend > 0 ? '↑' : trend < 0 ? '↓' : '○'} {Math.abs(trend)}% desde el mes pasado
      </p>
    </CardContent>
    <CardFooter className="pt-0">
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardFooter>
  </Card>
);

const ProjectCard = ({ project }) => (
  <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{project.title}</CardTitle>
      <p className="text-sm text-muted-foreground">Cliente: {project.client}</p>
    </CardHeader>
    <CardContent className="pb-2">
      <p className="text-sm line-clamp-2">{project.description}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          project.status === 'active' ? 'bg-green-100 text-green-800' :
          project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {project.status}
        </span>
        <span className="text-xs text-muted-foreground">
          Finaliza: {new Date(project.endDate).toLocaleDateString()}
        </span>
      </div>
    </CardContent>
    <CardFooter>
      <Button size="sm" variant="outline" className="w-full">Ver detalles</Button>
    </CardFooter>
  </Card>
);

const Dashboard = () => {
  const { toast } = useToast();
  const { data: stats, isLoading: statsLoading, error: statsError } = useFetch('api/estadisticas', true);
  const { data: recentProjects, isLoading: projectsLoading, error: projectsError } = useFetch('api/proyectos/recientes', true);
  const { data: user } = useFetch(`api/usuarios/${localStorage.getItem('usuario_id')}`, true);

  useEffect(() => {
    if (statsError || projectsError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los datos del dashboard"
      });
    }
  }, [statsError, projectsError, toast]);

  const isLoading = statsLoading || projectsLoading;

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard {user && `de ${user.nombre}`}
        </h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido de vuelta. Aquí está el resumen de tus proyectos y actividades.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Estadísticas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="h-4 w-24 animate-pulse bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 animate-pulse bg-muted rounded mb-2"></div>
                  <div className="h-3 w-32 animate-pulse bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <StatCard 
                title="Proyectos Activos" 
                value={stats?.activeProjects || 0} 
                icon="📊" 
                trend={5} 
                description="Proyectos en curso actualmente"
              />
              <StatCard 
                title="Ingresos Mensuales" 
                value={`$${stats?.monthlyRevenue?.toLocaleString() || 0}`} 
                icon="💰" 
                trend={12} 
                description="Ingresos del mes en curso"
              />
              <StatCard 
                title="Tareas Pendientes" 
                value={stats?.pendingTasks || 0} 
                icon="✓" 
                trend={-3} 
                description="Tareas por completar"
              />
              <StatCard 
                title="Clientes Activos" 
                value={stats?.activeClients || 0} 
                icon="👥" 
                trend={0} 
                description="Clientes con proyectos activos"
              />
            </>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Proyectos Recientes</h2>
          <Button variant="outline" size="sm">Ver todos</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="h-5 w-3/4 animate-pulse bg-muted rounded mb-2"></div>
                  <div className="h-4 w-1/2 animate-pulse bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-16 animate-pulse bg-muted rounded mb-2"></div>
                  <div className="h-4 w-1/3 animate-pulse bg-muted rounded"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-9 w-full animate-pulse bg-muted rounded"></div>
                </CardFooter>
              </Card>
            ))
          ) : recentProjects?.length > 0 ? (
            recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted flex items-center justify-center text-3xl">
                📋
              </div>
              <h3 className="text-xl font-semibold mb-2">No hay proyectos recientes</h3>
              <p className="text-muted-foreground mb-6">
                Comienza creando tu primer proyecto
              </p>
              <Button>Crear proyecto</Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-full md:col-span-2 bg-gradient-to-br from-primary/5 to-secondary/5 border-none shadow-md">
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button>
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Nuevo Proyecto
              </Button>
              <Button variant="secondary">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                Agregar Cliente
              </Button>
              <Button variant="secondary">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Nueva Factura
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="hidden md:block">
          <Card>
            <CardHeader>
              <CardTitle>Calendario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{new Date().getDate()}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('es-ES', { weekday: 'long', month: 'long', year: 'numeric' })}
                </div>
                <div className="mt-4 text-sm">
                  <p>Próximo evento: <span className="font-medium">Reunión con cliente</span></p>
                  <p className="text-muted-foreground">Hoy, 15:00 hrs.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 