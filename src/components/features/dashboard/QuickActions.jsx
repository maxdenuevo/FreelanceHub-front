import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, FileText, Users, Briefcase } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui'
import { cn } from '../../../utils/cn'

/**
 * QuickActions - Quick navigation cards for dashboard
 */
export const QuickActions = ({ className }) => {
  const navigate = useNavigate()

  const actions = [
    {
      title: 'Nuevo Proyecto',
      description: '¡Comienza algo increíble!',
      icon: <Plus size={24} />,
      color: 'yellow',
      onClick: () => navigate('/nuevocliente/nuevoproyecto'),
    },
    {
      title: 'Nuevo Cliente',
      description: 'Suma a tu equipo',
      icon: <Users size={24} />,
      color: 'blue',
      onClick: () => navigate('/nuevocliente'),
    },
    {
      title: 'Mis Proyectos',
      description: 'Revisa cómo vas',
      icon: <Briefcase size={24} />,
      color: 'lime',
      onClick: () => navigate('/dashboardpage/proyectos'),
    },
    {
      title: 'Contratos',
      description: 'Todo en orden',
      icon: <FileText size={24} />,
      color: 'pink',
      onClick: () => navigate('/dashboardpage/contratos'),
    },
  ]

  const colorClasses = {
    yellow: 'bg-primary-yellow bg-opacity-10 border-primary-yellow text-primary-yellow hover:bg-opacity-20',
    blue: 'bg-primary-blue bg-opacity-10 border-primary-blue text-primary-blue hover:bg-opacity-20',
    lime: 'bg-success bg-opacity-10 border-success text-success hover:bg-opacity-20',
    pink: 'bg-info bg-opacity-10 border-info text-info hover:bg-opacity-20',
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>¿Por dónde empezamos hoy?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className={cn(
                'p-4 rounded-lg border text-left',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-yellow',
                colorClasses[action.color]
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
