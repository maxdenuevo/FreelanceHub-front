import { cn } from '../../utils/cn'

/**
 * Avatar component with fallback to initials
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for image
 * @param {string} props.name - Name to generate initials from
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} props.size - Avatar size
 * @param {boolean} props.online - Show online status indicator
 * @param {string} props.className - Additional CSS classes
 */
export const Avatar = ({
  src,
  alt,
  name = '',
  size = 'md',
  online,
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getColorFromName = (name) => {
    if (!name) return 'bg-primary-blue'

    const colors = [
      'bg-primary-blue',
      'bg-primary-pink',
      'bg-success',
      'bg-warning',
      'bg-error',
      'bg-info',
    ]

    const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1)
    return colors[charCode % colors.length]
  }

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center',
          'font-semibold text-white select-none',
          !src && getColorFromName(name),
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {online !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-primary-dark',
            size === 'sm' && 'w-2 h-2',
            size === 'md' && 'w-2.5 h-2.5',
            size === 'lg' && 'w-3 h-3',
            size === 'xl' && 'w-3.5 h-3.5',
            size === '2xl' && 'w-4 h-4',
            online ? 'bg-success' : 'bg-gray-500'
          )}
        />
      )}
    </div>
  )
}

/**
 * Avatar Group component - displays multiple avatars with overlap
 */
export const AvatarGroup = ({
  children,
  max = 3,
  size = 'md',
  className,
  ...props
}) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const displayedAvatars = childrenArray.slice(0, max)
  const extraCount = childrenArray.length - max

  return (
    <div className={cn('flex -space-x-2', className)} {...props}>
      {displayedAvatars.map((child, index) => (
        <div key={index} className="ring-2 ring-primary-dark rounded-full">
          {child}
        </div>
      ))}

      {extraCount > 0 && (
        <Avatar
          size={size}
          name={`+${extraCount}`}
          className="ring-2 ring-primary-dark"
        />
      )}
    </div>
  )
}
