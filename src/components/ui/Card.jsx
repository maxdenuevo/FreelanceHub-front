import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Card component with optional hover effects and animations
 *
 * @param {Object} props
 * @param {boolean} props.hover - Enable hover lift effect
 * @param {boolean} props.glow - Enable glow effect on hover
 * @param {boolean} props.noPadding - Remove default padding
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 */
export const Card = ({
  children,
  hover = false,
  glow = false,
  noPadding = false,
  className,
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-gray-900 rounded-lg shadow-lg border border-gray-800 transition-all duration-200'

  const hoverStyles = hover ? 'cursor-pointer' : ''

  const hoverAnimation = hover ? {
    whileHover: {
      y: -4,
      boxShadow: glow
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 0 20px rgba(250, 218, 4, 0.3)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
    }
  } : {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        baseStyles,
        hoverStyles,
        !noPadding && 'p-6',
        className
      )}
      onClick={onClick}
      {...hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Card Header component
 */
export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
)

/**
 * Card Title component
 */
export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={cn('text-xl font-bold text-gray-100', className)} {...props}>
    {children}
  </h3>
)

/**
 * Card Description component
 */
export const CardDescription = ({ children, className, ...props }) => (
  <p className={cn('text-sm text-gray-400', className)} {...props}>
    {children}
  </p>
)

/**
 * Card Content component
 */
export const CardContent = ({ children, className, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
)

/**
 * Card Footer component
 */
export const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-800', className)} {...props}>
    {children}
  </div>
)
