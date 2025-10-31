import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Select/Dropdown component with search
 *
 * @param {Object} props
 * @param {Array} props.options - Array of {value, label} objects
 * @param {string|number} props.value - Selected value
 * @param {Function} props.onChange - Callback when value changes
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.label - Label text
 * @param {string} props.error - Error message
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.searchable - Enable search functionality
 * @param {string} props.className - Additional CSS classes
 */
export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Seleccionar...',
  label,
  error,
  disabled = false,
  searchable = false,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const selectRef = useRef(null)

  const selectedOption = options.find(opt => opt.value === value)

  const filteredOptions = searchable
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleSelect = (option) => {
    onChange?.(option.value)
    setIsOpen(false)
    setSearchQuery('')
  }

  const hasError = !!error

  return (
    <div className={cn('relative w-full', className)} ref={selectRef} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full px-4 py-2 bg-gray-800 text-left',
          'border rounded-lg',
          'flex items-center justify-between',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2',
          hasError
            ? 'border-error focus:border-error focus:ring-error focus:ring-opacity-50'
            : 'border-gray-700 focus:border-primary-yellow focus:ring-primary-yellow focus:ring-opacity-50',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-900',
          !disabled && 'hover:border-gray-600'
        )}
      >
        <span className={cn(
          selectedOption ? 'text-gray-100' : 'text-gray-500'
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'text-gray-400 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Search */}
            {searchable && (
              <div className="p-2 border-b border-gray-700">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full px-3 py-2 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary-yellow"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Options */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No hay resultados
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'w-full px-4 py-2 text-left flex items-center justify-between',
                      'hover:bg-gray-700 transition-colors',
                      option.value === value
                        ? 'bg-gray-700 text-primary-yellow'
                        : 'text-gray-300'
                    )}
                  >
                    <span className="text-sm">{option.label}</span>
                    {option.value === value && (
                      <Check size={16} className="text-primary-yellow" />
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}
