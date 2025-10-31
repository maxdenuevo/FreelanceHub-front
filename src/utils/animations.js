/**
 * Reusable Framer Motion animation variants
 */

// Fade animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Slide animations
export const slideInLeft = {
  initial: { x: -300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
}

export const slideInRight = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0 },
}

export const slideInUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
}

export const slideInDown = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
}

// Scale animations
export const scaleUp = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
}

export const scaleDown = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.1, opacity: 0 },
}

// Modal/Backdrop animations
export const backdropFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalScale = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', duration: 0.3 } },
  exit: { scale: 0.8, opacity: 0 },
}

// List animations (stagger children)
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(250, 218, 4, 0.3)',
    transition: { duration: 0.2 }
  },
}

export const hoverLift = {
  whileHover: {
    y: -4,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.2 }
  },
}

// Sidebar animations
export const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  closed: {
    x: -280,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
}

// Dropdown animations
export const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    display: 'block',
    transition: { duration: 0.2 }
  },
  closed: {
    opacity: 0,
    y: -10,
    transitionEnd: { display: 'none' },
    transition: { duration: 0.2 }
  },
}

// Toast animations
export const toastSlideIn = {
  initial: { x: 400, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 400, opacity: 0 },
}

// Page transition
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
}

// Collapse/Expand
export const collapse = {
  collapsed: { height: 0, opacity: 0, overflow: 'hidden' },
  expanded: { height: 'auto', opacity: 1, overflow: 'visible' },
}

// Rotation
export const rotate = {
  initial: { rotate: 0 },
  animate: { rotate: 180 },
}

// Notification badge pulse
export const badgePulse = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
    }
  }
}

// Skeleton shimmer
export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    }
  }
}
