import { cn } from '../../utils/cn'

/**
 * Badge component for status indicators and labels
 *
 * @param {Object} props
 * @param {'success' | 'warning' | 'error' | 'info' | 'default'} props.variant - Badge color variant
 * @param {'sm' | 'md' | 'lg'} props.size - Badge size
 * @param {boolean} props.dot - Show dot indicator
 * @param {boolean} props.outline - Outline style
 * @param {React.ReactNode} props.icon - Optional icon
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Badge content
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  outline = false,
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap'

  const variants = {
    success: outline
      ? 'border border-success text-success bg-transparent'
      : 'bg-success bg-opacity-20 text-success',
    warning: outline
      ? 'border border-warning text-warning bg-transparent'
      : 'bg-warning bg-opacity-20 text-warning',
    error: outline
      ? 'border border-error text-error bg-transparent'
      : 'bg-error bg-opacity-20 text-error',
    info: outline
      ? 'border border-info text-info bg-transparent'
      : 'bg-info bg-opacity-20 text-info',
    default: outline
      ? 'border border-gray-600 text-gray-300 bg-transparent'
      : 'bg-gray-800 text-gray-300',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'success' && 'bg-success',
          variant === 'warning' && 'bg-warning',
          variant === 'error' && 'bg-error',
          variant === 'info' && 'bg-info',
          variant === 'default' && 'bg-gray-400'
        )} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
