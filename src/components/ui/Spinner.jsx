import { cn } from '../../utils/cn'

/**
 * Spinner/Loading indicator component
 *
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} props.size - Spinner size
 * @param {'primary' | 'white' | 'gray'} props.color - Spinner color
 * @param {string} props.className - Additional CSS classes
 */
export const Spinner = ({
  size = 'md',
  color = 'primary',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const colors = {
    primary: 'text-primary-yellow',
    white: 'text-white',
    gray: 'text-gray-400',
  }

  return (
    <svg
      className={cn(
        'animate-spin',
        sizes[size],
        colors[color],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
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
  )
}

/**
 * Full screen loading spinner with overlay
 */
export const LoadingOverlay = ({
  visible = true,
  text = 'Cargando...',
  ...props
}) => {
  if (!visible) return null

  return (
    <div
      className="fixed inset-0 bg-primary-dark bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center"
      {...props}
    >
      <div className="text-center">
        <Spinner size="xl" color="primary" />
        {text && (
          <p className="mt-4 text-gray-300 text-lg font-medium">{text}</p>
        )}
      </div>
    </div>
  )
}
