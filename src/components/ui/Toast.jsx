import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner'

/**
 * Toast provider component - Add to your App.jsx
 *
 * @param {Object} props
 * @param {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'} props.position
 * @param {boolean} props.richColors - Enable variant colors
 */
export const Toaster = ({
  position = 'top-right',
  richColors = true,
  ...props
}) => {
  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      toastOptions={{
        style: {
          background: '#171717',
          border: '1px solid #262626',
          color: '#f5f5f5',
        },
        className: 'toast',
      }}
      {...props}
    />
  )
}

/**
 * Toast helper functions
 */
export const toast = {
  success: (message, options) => {
    return sonnerToast.success(message, {
      style: {
        background: '#171717',
        border: '1px solid #b9d84d',
        color: '#b9d84d',
      },
      ...options,
    })
  },

  error: (message, options) => {
    return sonnerToast.error(message, {
      style: {
        background: '#171717',
        border: '1px solid #ef4444',
        color: '#ef4444',
      },
      ...options,
    })
  },

  warning: (message, options) => {
    return sonnerToast.warning(message, {
      style: {
        background: '#171717',
        border: '1px solid #fada04',
        color: '#fada04',
      },
      ...options,
    })
  },

  info: (message, options) => {
    return sonnerToast.info(message, {
      style: {
        background: '#171717',
        border: '1px solid #dca8bf',
        color: '#dca8bf',
      },
      ...options,
    })
  },

  // Simple toast without icon
  message: (message, options) => {
    return sonnerToast(message, {
      style: {
        background: '#171717',
        border: '1px solid #262626',
        color: '#f5f5f5',
      },
      ...options,
    })
  },

  // Toast with custom content
  custom: (component, options) => {
    return sonnerToast.custom(component, options)
  },

  // Promise-based toast (for async operations)
  promise: (promise, options) => {
    return sonnerToast.promise(promise, {
      loading: options.loading || 'Cargando...',
      success: options.success || 'Completado',
      error: options.error || 'Error',
      style: {
        background: '#171717',
        border: '1px solid #262626',
        color: '#f5f5f5',
      },
    })
  },

  // Dismiss specific toast
  dismiss: (toastId) => {
    return sonnerToast.dismiss(toastId)
  },

  // Dismiss all toasts
  dismissAll: () => {
    return sonnerToast.dismiss()
  },
}
