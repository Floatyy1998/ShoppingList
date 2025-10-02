import { motion } from 'framer-motion'
import { LogOut, Moon, Sun, Trash2 } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useStore } from '../../store/useStore'
import { useFirebaseSync } from '../../hooks/useFirebaseSync'

export const ShoppingListHeader = () => {
  const { user, themeMode, setThemeMode } = useStore()
  const { clearCompletedInFirebase } = useFirebaseSync(user?.uid || null)

  const handleLogout = async () => {
    await signOut(auth)
  }

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  // Remove completed count since we removed checked state
  const completedCount = 0

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <header className={`${isIOS ? 'flex-shrink-0' : 'sticky top-0'} z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700`}>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Meine Liste
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Clear Completed Button */}
            {completedCount > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={clearCompletedInFirebase}
                className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                title={`${completedCount} erledigte löschen`}
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              {themeMode === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>

            {/* Logout */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}
