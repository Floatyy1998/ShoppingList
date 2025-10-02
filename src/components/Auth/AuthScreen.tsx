import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { ShoppingCart, Mail, Lock, LogIn, UserPlus, Sparkles } from 'lucide-react'

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email oder Passwort ist falsch')
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Diese Email wird bereits verwendet')
      } else if (err.code === 'auth/weak-password') {
        setError('Passwort muss mindestens 6 Zeichen lang sein')
      } else if (err.code === 'auth/invalid-email') {
        setError('Ungültige Email-Adresse')
      } else {
        setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Logo Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            <ShoppingCart className="w-16 h-16 text-white mx-auto mb-4" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            ShopList
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </h1>
          <p className="text-white/80 text-sm">Deine smarte Einkaufsliste</p>
        </div>

        {/* Auth Card */}
        <motion.div
          layout
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 backdrop-blur-sm"
        >
          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-slate-700 rounded-xl">
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Anmelden
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Registrieren
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border-2 border-transparent rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors dark:text-white"
                  placeholder="deine@email.de"
                  required
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border-2 border-transparent rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors dark:text-white"
                  placeholder="••••••••"
                  required
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Anmelden
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Registrieren
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-6">
          {isLogin ? 'Noch kein Konto? ' : 'Bereits ein Konto? '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="font-semibold text-white hover:underline"
          >
            {isLogin ? 'Jetzt registrieren' : 'Jetzt anmelden'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
