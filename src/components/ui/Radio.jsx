import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

/**
 * Radio button component
 *
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {string} props.description - Optional description text
 * @param {boolean} props.checked - Checked state
 * @param {Function} props.onChange - Callback when checked changes
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.value - Radio value
 * @param {string} props.className - Additional CSS classes
 */
export const Radio = forwardRef(({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  value,
  className,
  ...props
}, ref) => {
  return (
    <label className={cn(
      'flex items-start gap-3 cursor-pointer group',
      disabled && 'cursor-not-allowed opacity-50',
      className
    )}>
      {/* Hidden native radio */}
      <input
        ref={ref}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        value={value}
        className="sr-only"
        {...props}
      />

      {/* Custom radio */}
      <div className={cn(
        'flex-shrink-0 w-5 h-5 mt-0.5',
        'border-2 rounded-full',
        'flex items-center justify-center',
        'transition-all duration-200',
        checked
          ? 'border-primary-yellow'
          : 'border-gray-600 group-hover:border-gray-500',
        !disabled && 'group-hover:shadow-md'
      )}>
        {checked && (
          <div className="w-2.5 h-2.5 rounded-full bg-primary-yellow" />
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
  )
})

Radio.displayName = 'Radio'

/**
 * Radio Group component
 */
export const RadioGroup = ({
  options = [],
  value,
  onChange,
  name,
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className={cn('', className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-3">
          {label}
        </label>
      )}

      <div className="space-y-3">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            label={option.label}
            description={option.description}
          />
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
    </div>
  )
}
