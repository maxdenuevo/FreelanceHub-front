import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Button component with multiple variants and sizes
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state (shows spinner)
 * @param {boolean} props.fullWidth - Makes button full width
 * @param {React.ReactNode} props.leftIcon - Icon to show on left
 * @param {React.ReactNode} props.rightIcon - Icon to show on right
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary-yellow text-primary-dark hover:bg-opacity-90 focus:ring-primary-yellow shadow-md hover:shadow-lg',
    secondary: 'bg-primary-blue text-white hover:bg-opacity-90 focus:ring-primary-blue shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 focus:ring-gray-700',
    outline: 'bg-transparent border-2 border-primary-yellow text-primary-yellow hover:bg-primary-yellow hover:text-primary-dark focus:ring-primary-yellow',
    danger: 'bg-error text-white hover:bg-opacity-90 focus:ring-error shadow-md hover:shadow-lg',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const handleClick = (e) => {
    if (disabled || loading) return
    onClick?.(e)
  }

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </motion.button>
  )
}
