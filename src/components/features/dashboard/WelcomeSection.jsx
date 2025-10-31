import { motion } from 'framer-motion'
import { Sparkles, Hand } from 'lucide-react'

/**
 * WelcomeSection - Welcome banner for dashboard
 */
export const WelcomeSection = ({ userName, loading = false }) => {
  const currentHour = new Date().getHours()
  let greeting = '¡Hola'

  if (currentHour < 12) greeting = '¡Buenos días'
  else if (currentHour < 18) greeting = '¡Buenas tardes'
  else greeting = '¡Buenas noches'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-blue to-primary-dark rounded-lg p-8 mb-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text Content */}
        <div className="flex-1">
          {loading ? (
            <div className="space-y-3">
              <div className="h-8 w-64 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-96 bg-gray-700 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-primary-yellow" size={24} />
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {greeting}, {userName || 'Usuario'}!
                </h1>
              </div>
              <p className="text-gray-300 text-lg">
                Aquí tienes todo lo que necesitas para llevar tus proyectos al siguiente nivel.
                Vamos a hacer que hoy sea un día productivo.
              </p>
            </>
          )}
        </div>

        {/* Illustration */}
        <div className="flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-48 h-48 bg-primary-yellow rounded-full flex items-center justify-center"
          >
            <Hand className="w-24 h-24 text-primary-blue" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
