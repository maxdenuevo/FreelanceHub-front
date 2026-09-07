import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services';

/**
 * Zustand Store para autenticación
 * Maneja el estado del usuario actual, login, logout
 */

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.login(email, password);

          // La API sólo devuelve el token; el usuario_id viene dentro de él
          let usuarioId = data.usuario_id;
          if (!usuarioId && data.token) {
            try {
              usuarioId = jwtDecode(data.token).usuario_id;
            } catch {
              usuarioId = null;
            }
          }
          if (!usuarioId) {
            throw new Error('La respuesta del servidor no incluye el usuario');
          }

          // Guardar en localStorage
          localStorage.setItem('usuario_id', usuarioId);
          localStorage.setItem('usuario_email', email);
          if (data.token) {
            localStorage.setItem('auth_token', data.token);
          }

          set({
            user: {
              id: usuarioId,
              email: email,
            },
            token: data.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return { success: true, data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión';
          set({ loading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.register(userData);
          set({ loading: false, error: null });
          return { success: true, data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Error al registrar usuario';
          set({ loading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      clearError: () => {
        set({ error: null });
      },

      // Inicializar desde localStorage si existe
      initialize: () => {
        const currentUser = authService.getCurrentUser();
        if (currentUser.id) {
          set({
            user: {
              id: currentUser.id,
              email: currentUser.email,
            },
            token: currentUser.token,
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
