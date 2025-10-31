import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

/**
 * StatCard - Card for displaying metrics with trend indicators
 *
 * @param {Object} props
 * @param {string} props.title - Metric title
 * @param {string|number} props.value - Metric value
 * @param {number} props.change - Percentage change (optional)
 * @param {'up' | 'down'} props.trend - Trend direction (optional)
 * @param {React.ReactNode} props.icon - Icon component
 * @param {'yellow' | 'blue' | 'lime' | 'pink' | 'default'} props.color - Card accent color
 * @param {boolean} props.loading - Loading state
 * @param {string} props.className - Additional CSS classes
 */
export const StatCard = ({
  title,
  value,
  change,
  trend,
  icon,
  color = 'default',
  loading = false,
  className,
  ...props
}) => {
  const colors = {
    yellow: 'border-primary-yellow bg-primary-yellow bg-opacity-10',
    blue: 'border-primary-blue bg-primary-blue bg-opacity-10',
    lime: 'border-success bg-success bg-opacity-10',
    pink: 'border-info bg-info bg-opacity-10',
    default: 'border-gray-800 bg-gray-900',
  }

  const iconColors = {
    yellow: 'text-primary-yellow',
    blue: 'text-primary-blue',
    lime: 'text-success',
    pink: 'text-info',
    default: 'text-gray-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={cn(
        'rounded-lg border p-6 transition-all duration-200',
        'hover:shadow-lg',
        colors[color],
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-2">
            {title}
          </p>

          {loading ? (
            <div className="h-8 w-24 bg-gray-800 rounded animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-gray-100">
                {value}
              </h3>

              {change !== undefined && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    trend === 'up' ? 'text-success' : 'text-error'
                  )}
                >
                  {trend === 'up' ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  <span>{Math.abs(change)}%</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div
            className={cn(
              'p-3 rounded-lg',
              'bg-gray-800 bg-opacity-50',
              iconColors[color]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  )
}
