import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

/**
 * Input component with validation support
 *
 * @param {Object} props
 * @param {'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'} props.type - Input type
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message to display
 * @param {string} props.helperText - Helper text below input
 * @param {React.ReactNode} props.leftIcon - Icon on left side
 * @param {React.ReactNode} props.rightIcon - Icon on right side
 * @param {boolean} props.fullWidth - Makes input full width
 * @param {string} props.className - Additional CSS classes
 */
export const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className,
  ...props
}, ref) => {
  const hasError = !!error

  return (
    <div className={cn('', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-2 bg-gray-800 text-gray-100',
            'border rounded-lg',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2',
            'placeholder:text-gray-500',
            hasError
              ? 'border-error focus:border-error focus:ring-error focus:ring-opacity-50'
              : 'border-gray-700 focus:border-primary-yellow focus:ring-primary-yellow focus:ring-opacity-50',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            props.disabled && 'opacity-50 cursor-not-allowed bg-gray-900',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={cn(
          'mt-1 text-sm',
          error ? 'text-error' : 'text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

/**
 * Textarea component
 */
export const Textarea = forwardRef(({
  label,
  error,
  helperText,
  rows = 4,
  fullWidth = true,
  className,
  ...props
}, ref) => {
  const hasError = !!error

  return (
    <div className={cn('', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full px-4 py-2 bg-gray-800 text-gray-100',
          'border rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2',
          'placeholder:text-gray-500',
          'resize-vertical',
          hasError
            ? 'border-error focus:border-error focus:ring-error focus:ring-opacity-50'
            : 'border-gray-700 focus:border-primary-yellow focus:ring-primary-yellow focus:ring-opacity-50',
          props.disabled && 'opacity-50 cursor-not-allowed bg-gray-900',
          className
        )}
        {...props}
      />

      {(error || helperText) && (
        <p className={cn(
          'mt-1 text-sm',
          error ? 'text-error' : 'text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'
