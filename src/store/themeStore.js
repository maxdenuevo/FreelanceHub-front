import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand Store para tema (dark mode)
 * Maneja el estado del tema de la aplicación
 */

export const useThemeStore = create(
  persist(
    (set, get) => ({
      // State
      theme: 'light', // 'light' | 'dark'
      systemPreference: false, // Si usar preferencia del sistema

      // Actions
      setTheme: (theme) => {
        set({ theme });
        // Actualizar clase en el documento
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      setSystemPreference: (useSystem) => {
        set({ systemPreference: useSystem });

        if (useSystem) {
          // Detectar preferencia del sistema
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          get().setTheme(isDark ? 'dark' : 'light');

          // Listener para cambios en la preferencia del sistema
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (get().systemPreference) {
              get().setTheme(e.matches ? 'dark' : 'light');
            }
          });
        }
      },

      // Inicializar tema al cargar
      initialize: () => {
        const { theme, systemPreference } = get();

        if (systemPreference) {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          get().setTheme(isDark ? 'dark' : 'light');
        } else {
          get().setTheme(theme);
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        theme: state.theme,
        systemPreference: state.systemPreference,
      }),
    }
  )
);
