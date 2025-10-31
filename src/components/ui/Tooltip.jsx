import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Tooltip component - Shows helpful text on hover
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Element that triggers tooltip
 * @param {string} props.content - Tooltip content/text
 * @param {'top' | 'bottom' | 'left' | 'right'} props.position - Tooltip position
 * @param {number} props.delay - Delay before showing (ms)
 * @param {string} props.className - Additional CSS classes
 */
export const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 200,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800',
  }

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setIsVisible(false)
  }

  if (!content) return children

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 pointer-events-none',
              positions[position]
            )}
          >
            <div
              className={cn(
                'bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg',
                'border border-gray-700',
                'whitespace-nowrap max-w-xs',
                className
              )}
            >
              {content}

              {/* Arrow */}
              <div
                className={cn(
                  'absolute w-0 h-0',
                  'border-4 border-transparent',
                  arrows[position]
                )}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
