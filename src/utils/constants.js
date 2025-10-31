/**
 * Global constants for FreelanceHub v2.0
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-freelancehub.vercel.app'

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_ID: 'usuario_id',
  USER_EMAIL: 'usuario_email',
  THEME: 'theme',
}

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registro',
  CONTACT: '/contactanos',
  DASHBOARD: '/dashboardpage',
  PROJECTS: '/dashboardpage/proyectos',
  CLIENTS: '/dashboardpage/clientes',
  CONTRACTS: '/dashboardpage/contratos',
  PROFILE: '/dashboardpage/perfil',
  NEW_CLIENT: '/nuevocliente',
  NEW_PROJECT: '/nuevocliente/nuevoproyecto',
}

// Priority Levels
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: 'bg-info',
  [PRIORITY.MEDIUM]: 'bg-warning',
  [PRIORITY.HIGH]: 'bg-error',
}

export const PRIORITY_LABELS = {
  [PRIORITY.LOW]: 'Baja',
  [PRIORITY.MEDIUM]: 'Media',
  [PRIORITY.HIGH]: 'Alta',
}

// Status Types
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold',
  CANCELLED: 'cancelled',
}

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  DONE: 'done',
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
}

// Date Formats
export const DATE_FORMATS = {
  FULL: 'dd MMMM yyyy',
  SHORT: 'dd/MM/yyyy',
  MONTH_YEAR: 'MMMM yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
}

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
}

// Animation Durations (ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
}

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
}

// Toast Auto-dismiss Durations
export const TOAST_DURATION = {
  SHORT: 3000,
  NORMAL: 5000,
  LONG: 8000,
}
