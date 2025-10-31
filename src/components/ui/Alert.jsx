import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Alert component for inline notifications
 *
 * @param {Object} props
 * @param {'success' | 'error' | 'warning' | 'info'} props.variant - Alert type
 * @param {string} props.title - Alert title
 * @param {string} props.message - Alert message
 * @param {boolean} props.dismissible - Show close button
 * @param {Function} props.onDismiss - Callback when dismissed
 * @param {string} props.className - Additional CSS classes
 */
export const Alert = ({
  variant = 'info',
  title,
  message,
  children,
  dismissible = false,
  onDismiss,
  className,
  ...props
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const variants = {
    success: {
      container: 'bg-success bg-opacity-10 border-success text-success',
      icon: 'text-success',
    },
    error: {
      container: 'bg-error bg-opacity-10 border-error text-error',
      icon: 'text-error',
    },
    warning: {
      container: 'bg-warning bg-opacity-10 border-warning text-warning',
      icon: 'text-warning',
    },
    info: {
      container: 'bg-info bg-opacity-10 border-info text-info',
      icon: 'text-info',
    },
  }

  const Icon = icons[variant]
  const variantStyles = variants[variant]

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg border',
        variantStyles.container,
        className
      )}
      role="alert"
      {...props}
    >
      {/* Icon */}
      <Icon size={20} className={cn('flex-shrink-0 mt-0.5', variantStyles.icon)} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold mb-1">
            {title}
          </div>
        )}
        {message && (
          <div className="text-sm opacity-90">
            {message}
          </div>
        )}
        {children && (
          <div className="text-sm opacity-90">
            {children}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={onDismiss}
          className={cn(
            'flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity',
            'focus:outline-none'
          )}
          aria-label="Cerrar alerta"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
