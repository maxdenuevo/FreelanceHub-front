/**
 * Barrel export para todos los servicios
 * Importa desde aquí para mayor conveniencia
 *
 * Ejemplo:
 * import { authService, projectsService } from '@/services'
 */

export { authService } from './auth.service';
export { projectsService } from './projects.service';
export { clientsService } from './clients.service';
export { tasksService } from './tasks.service';
export { paymentsService } from './payments.service';
export { contractsService } from './contracts.service';
export { default as api } from './api';
