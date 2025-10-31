import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Users, FileCheck, DollarSign, Clock, CheckCircle2 } from 'lucide-react'
import { WelcomeSection } from './features/dashboard/WelcomeSection'
import { StatCard } from './features/dashboard/StatCard'
import { QuickActions } from './features/dashboard/QuickActions'
import { ChartCard } from './features/dashboard/ChartCard'
import { RecentActivity } from './features/dashboard/RecentActivity'
import { Card, CardHeader, CardTitle, CardContent, Spinner, Badge } from './ui'

/**
 * Dashboard Home v2.0 - Modern redesign
 */
function HomeV2() {
  const [usuarioNombre, setUsuarioNombre] = useState('')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    proyectosActivos: 0,
    tareasPendientes: 0,
    clientesActivos: 0,
    ingresosMes: 0,
  })
  const [chartData, setChartData] = useState({
    monthlyIncome: [],
    projectsStatus: [],
    tasksProgress: [],
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = localStorage.getItem('usuario_id')

      if (!userId) {
        setLoading(false)
        return
      }

      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api-freelancehub.vercel.app/get-usuario/${userId}`
        )
        const userData = await userResponse.json()
        setUsuarioNombre(userData.usuario.usuario_nombre)

        // Fetch projects to calculate stats
        const projectsResponse = await fetch(
          `https://api-freelancehub.vercel.app/proyectos/${userId}`
        )
        const projectsData = await projectsResponse.json()

        if (projectsData.proyectos) {
          const proyectos = projectsData.proyectos

          // Calculate active projects (you can add date logic here)
          const proyectosActivos = proyectos.length

          // Fetch tasks for all projects to count pending tasks
          let totalTareasPendientes = 0
          let totalIngresos = 0

          for (const proyecto of proyectos) {
            try {
              const tareasResponse = await fetch(
                `https://api-freelancehub.vercel.app/tareas/${proyecto.proyecto_id}`
              )
              const tareasData = await tareasResponse.json()

              if (tareasData.tareas) {
                totalTareasPendientes += tareasData.tareas.filter(
                  (t) => !t.tarea_completada
                ).length
              }

              // Fetch payments
              const pagosResponse = await fetch(
                `https://api-freelancehub.vercel.app/pagos/${proyecto.proyecto_id}`
              )
              const pagosData = await pagosResponse.json()

              if (pagosData.pagos) {
                const ingresosProyecto = pagosData.pagos
                  .filter((p) => p.pago_completado)
                  .reduce((sum, p) => sum + parseFloat(p.pago_monto || 0), 0)
                totalIngresos += ingresosProyecto
              }
            } catch (error) {
              console.error('Error fetching project data:', error)
            }
          }

          // Fetch clients
          const clientsResponse = await fetch(
            `https://api-freelancehub.vercel.app/clientes/${userId}`
          )
          const clientsData = await clientsResponse.json()
          const clientesActivos = clientsData.clientes?.length || 0

          setStats({
            proyectosActivos,
            tareasPendientes: totalTareasPendientes,
            clientesActivos,
            ingresosMes: totalIngresos,
          })

          // Prepare chart data
          // 1. Monthly Income (last 6 months)
          const monthlyIncome = generateMonthlyIncomeData(proyectos)

          // 2. Projects by Status (placeholder - you can extend this with real status)
          const projectsStatus = [
            { name: 'Activos', value: proyectosActivos },
            { name: 'Completados', value: 0 }, // Would need real data
            { name: 'En Pausa', value: 0 },
          ]

          // 3. Tasks Progress
          const tasksCompleted = await calculateCompletedTasks(proyectos)
          const tasksProgress = [
            { name: 'Completadas', value: tasksCompleted },
            { name: 'Pendientes', value: totalTareasPendientes },
          ]

          setChartData({
            monthlyIncome,
            projectsStatus,
            tasksProgress,
          })
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    // Helper: Generate monthly income data
    const generateMonthlyIncomeData = (proyectos) => {
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
      // Placeholder data - in real scenario, fetch payment dates
      return months.map((month, i) => ({
        mes: month,
        ingresos: Math.floor(Math.random() * 5000) + 1000, // Random for demo
      }))
    }

    // Helper: Calculate completed tasks
    const calculateCompletedTasks = async (proyectos) => {
      let completed = 0
      for (const proyecto of proyectos) {
        try {
          const tareasResponse = await fetch(
            `https://api-freelancehub.vercel.app/tareas/${proyecto.proyecto_id}`
          )
          const tareasData = await tareasResponse.json()
          if (tareasData.tareas) {
            completed += tareasData.tareas.filter((t) => t.tarea_completada).length
          }
        } catch (error) {
          console.error('Error fetching tasks:', error)
        }
      }
      return completed
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-primary-dark p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <WelcomeSection userName={usuarioNombre} loading={loading} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Proyectos Activos"
            value={stats.proyectosActivos}
            icon={<Briefcase size={24} />}
            color="yellow"
            loading={loading}
          />

          <StatCard
            title="Tareas Pendientes"
            value={stats.tareasPendientes}
            icon={<Clock size={24} />}
            color="blue"
            loading={loading}
          />

          <StatCard
            title="Clientes Activos"
            value={stats.clientesActivos}
            icon={<Users size={24} />}
            color="lime"
            loading={loading}
          />

          <StatCard
            title="Ingresos Totales"
            value={`$${stats.ingresosMes.toLocaleString()}`}
            icon={<DollarSign size={24} />}
            color="pink"
            loading={loading}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Income Chart */}
          <ChartCard
            title="Ingresos Mensuales"
            subtitle="Últimos 6 meses"
            type="line"
            data={chartData.monthlyIncome}
            xKey="mes"
            yKey="ingresos"
            color="#fada04"
            height={300}
          />

          {/* Tasks Progress Chart */}
          <ChartCard
            title="Progreso de Tareas"
            subtitle="Completadas vs Pendientes"
            type="pie"
            data={chartData.tasksProgress}
            xKey="name"
            yKey="value"
            color="#b9d84d"
            height={300}
          />
        </div>

        {/* Recent Activity & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Estado general</span>
                  <Badge variant="success">Activo</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Proyectos</span>
                  <span className="font-semibold text-gray-200">
                    {stats.proyectosActivos} activos
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Clientes</span>
                  <span className="font-semibold text-gray-200">
                    {stats.clientesActivos} totales
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tareas completadas</span>
                  <span className="font-semibold text-success">
                    {chartData.tasksProgress[0]?.value || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Google Calendar (Optional) */}
        <Card>
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Your_Time_Zone"
                style={{ border: 0, width: '100%', height: '400px' }}
                frameBorder="0"
                scrolling="no"
                title="Google Calendar"
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomeV2
