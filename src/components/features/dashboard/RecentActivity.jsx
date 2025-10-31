import { motion } from 'framer-motion';
import { Clock, CheckCircle, DollarSign, FileText, Users } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui';

/**
 * RecentActivity - Muestra actividad reciente del usuario
 */

const activityIcons = {
  proyecto: FileText,
  tarea: CheckCircle,
  pago: DollarSign,
  cliente: Users,
};

const activityColors = {
  proyecto: 'bg-blue-100 text-blue-600',
  tarea: 'bg-green-100 text-green-600',
  pago: 'bg-yellow-100 text-yellow-600',
  cliente: 'bg-pink-100 text-pink-600',
};

export const RecentActivity = ({ activities = [], loading = false }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay actividad reciente</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activityIcons[activity.type] || Clock;
            const colorClass = activityColors[activity.type] || 'bg-gray-100 text-gray-600';

            return (
              <motion.div
                key={activity.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className={`p-2 rounded-full ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(activity.timestamp), "d 'de' MMMM, HH:mm", { locale: es })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
