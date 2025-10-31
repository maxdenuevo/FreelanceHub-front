import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Tabs component
 *
 * @param {Object} props
 * @param {Array} props.tabs - Array of {id, label, content, icon} objects
 * @param {string} props.defaultTab - Default active tab id
 * @param {Function} props.onChange - Callback when tab changes
 * @param {'line' | 'pills'} props.variant - Tab style variant
 * @param {string} props.className - Additional CSS classes
 */
export const Tabs = ({
  tabs = [],
  defaultTab,
  onChange,
  variant = 'line',
  className,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={cn('', className)} {...props}>
      {/* Tab List */}
      <div className={cn(
        'flex gap-2',
        variant === 'line' && 'border-b border-gray-800'
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'relative px-4 py-2.5 font-medium text-sm transition-colors',
              'focus:outline-none',
              variant === 'line' && [
                'border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'border-primary-yellow text-primary-yellow'
                  : 'border-transparent text-gray-400 hover:text-gray-300',
              ],
              variant === 'pills' && [
                'rounded-lg',
                activeTab === tab.id
                  ? 'bg-primary-yellow text-primary-dark'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800',
              ]
            )}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </div>

            {/* Active indicator (line variant) */}
            {variant === 'line' && activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-yellow"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTabContent}
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Simple Tab Panel component (for more control)
 */
export const TabPanel = ({ children, value, activeValue }) => {
  if (value !== activeValue) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
