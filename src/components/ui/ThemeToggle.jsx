import { useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useThemeStore } from '../../store';
import { motion } from 'framer-motion';

/**
 * ThemeToggle - Botón para cambiar entre light/dark mode
 */

export const ThemeToggle = ({ variant = 'button' }) => {
  const { theme, systemPreference, setTheme, toggleTheme, setSystemPreference, initialize } = useThemeStore();

  useEffect(() => {
    initialize();
  }, []);

  if (variant === 'button') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.button>
    );
  }

  // variant === 'dropdown'
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tema</p>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setTheme('light')}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            theme === 'light' && !systemPreference
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <Sun className="w-5 h-5" />
          <span className="text-xs">Claro</span>
        </button>

        <button
          onClick={() => setTheme('dark')}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            theme === 'dark' && !systemPreference
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <Moon className="w-5 h-5" />
          <span className="text-xs">Oscuro</span>
        </button>

        <button
          onClick={() => setSystemPreference(true)}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            systemPreference
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <Monitor className="w-5 h-5" />
          <span className="text-xs">Sistema</span>
        </button>
      </div>
    </div>
  );
};
