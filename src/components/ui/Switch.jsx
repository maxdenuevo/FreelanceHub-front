import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Switch/Toggle component
 *
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {string} props.description - Optional description text
 * @param {boolean} props.checked - Checked state
 * @param {Function} props.onChange - Callback when checked changes
 * @param {boolean} props.disabled - Disabled state
 * @param {'sm' | 'md' | 'lg'} props.size - Switch size
 * @param {string} props.className - Additional CSS classes
 */
export const Switch = forwardRef(({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  className,
  ...props
}, ref) => {
  const sizes = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-3.5 h-3.5',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-4 h-4',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-5 h-5',
      translate: 'translate-x-7',
    },
  }

  const sizeConfig = sizes[size]

  return (
    <div className={cn('', className)}>
      <label className={cn(
        'flex items-start gap-3 cursor-pointer group',
        disabled && 'cursor-not-allowed opacity-50'
      )}>
        {/* Hidden native checkbox */}
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        {/* Switch track */}
        <div className={cn(
          'relative flex-shrink-0 mt-0.5',
          'rounded-full transition-colors duration-200',
          sizeConfig.track,
          checked ? 'bg-primary-yellow' : 'bg-gray-700',
          !disabled && 'group-hover:shadow-md'
        )}>
          {/* Switch thumb */}
          <motion.div
            initial={false}
            animate={{
              x: checked ? (size === 'sm' ? 16 : size === 'lg' ? 28 : 20) : 4,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'absolute top-1 left-0',
              'bg-white rounded-full shadow-md',
              sizeConfig.thumb
            )}
          />
        </div>

        {/* Label & Description */}
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <div className="text-sm font-medium text-gray-200">
                {label}
              </div>
            )}
            {description && (
              <div className="text-sm text-gray-400 mt-0.5">
                {description}
              </div>
            )}
          </div>
        )}
      </label>
    </div>
  )
})

Switch.displayName = 'Switch'
