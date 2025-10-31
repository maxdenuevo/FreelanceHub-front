import { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Checkbox component
 *
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {string} props.description - Optional description text
 * @param {boolean} props.checked - Checked state
 * @param {Function} props.onChange - Callback when checked changes
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.error - Error message
 * @param {string} props.className - Additional CSS classes
 */
export const Checkbox = forwardRef(({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  error,
  className,
  ...props
}, ref) => {
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

        {/* Custom checkbox */}
        <div className={cn(
          'flex-shrink-0 w-5 h-5 mt-0.5',
          'border-2 rounded',
          'flex items-center justify-center',
          'transition-all duration-200',
          checked
            ? 'bg-primary-yellow border-primary-yellow'
            : 'bg-gray-800 border-gray-600 group-hover:border-gray-500',
          !disabled && 'group-hover:shadow-md',
          error && !checked && 'border-error'
        )}>
          {checked && (
            <Check size={14} className="text-primary-dark" strokeWidth={3} />
          )}
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

      {error && (
        <p className="mt-1 ml-8 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
