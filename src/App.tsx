import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Toaster } from 'react-hot-toast'
import { auth } from './lib/firebase'
import { useStore } from './store/useStore'
import { useTheme } from './hooks/useTheme'
import { useFirebaseSync } from './hooks/useFirebaseSync'
import { AuthScreen } from './components/Auth/AuthScreen'
import { ShoppingList } from './components/ShoppingList/ShoppingList'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const { user, setUser } = useStore()

  // Initialize theme
  useTheme()

  // Sync with Firebase
  useFirebaseSync(user?.uid || null)

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [setUser])

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg, #fff)',
            color: 'var(--toast-color, #000)',
            borderRadius: '16px',
            padding: '12px 20px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="shopping-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingList />
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AuthScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
