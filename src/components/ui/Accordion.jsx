import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Accordion Item component
 */
const AccordionItem = ({
  id,
  title,
  content,
  icon,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => onToggle(id)}
        className={cn(
          'w-full px-4 py-3 flex items-center justify-between',
          'text-left transition-colors',
          'hover:bg-gray-800 focus:outline-none',
          isOpen && 'bg-gray-800'
        )}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className="font-medium text-gray-200">{title}</span>
        </div>

        <ChevronDown
          size={18}
          className={cn(
            'text-gray-400 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 text-gray-400 text-sm border-t border-gray-800">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Accordion component
 *
 * @param {Object} props
 * @param {Array} props.items - Array of {id, title, content, icon} objects
 * @param {boolean} props.allowMultiple - Allow multiple items open
 * @param {Array} props.defaultOpen - Array of default open item ids
 * @param {string} props.className - Additional CSS classes
 */
export const Accordion = ({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  className,
  ...props
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen)

  const handleToggle = (itemId) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    } else {
      setOpenItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      )
    }
  }

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          icon={item.icon}
          isOpen={openItems.includes(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
