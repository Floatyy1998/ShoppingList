import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface ProductSuggestion {
  name: string
  brand?: string
  category?: string
  emoji?: string
  imageUrl?: string
  barcode?: string
}

interface Props {
  suggestions: ProductSuggestion[]
  isLoading: boolean
  onSelect: (suggestion: ProductSuggestion) => void
}

export const ProductSuggestions = ({ suggestions, isLoading, onSelect }: Props) => {
  if (!isLoading && suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
      >
        {isLoading ? (
          <div className="p-4 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span className="text-sm">Suche Produkte...</span>
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(suggestion)}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
                className="w-full p-3 flex items-center gap-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 active:bg-indigo-100 dark:active:bg-indigo-900/30 transition-colors text-left border-b border-gray-100 dark:border-slate-700 last:border-0"
              >
                {/* Emoji only */}
                <div className="w-10 h-10 flex items-center justify-center text-2xl flex-shrink-0">
                  {suggestion.emoji || '📦'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white truncate">
                    {suggestion.name}
                  </div>
                  {suggestion.brand && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {suggestion.brand}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
