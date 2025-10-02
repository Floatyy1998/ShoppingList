import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { ShoppingListHeader } from './ShoppingListHeader'
import { AddItemForm } from './AddItemForm'
import { ShoppingItem } from './ShoppingItem'
import type { SortMode } from '../../types'

export const ShoppingList = () => {
  const {
    items,
    sortMode,
    setSortMode,
    categories,
  } = useStore()

  // Sort items
  const sortedItems = useMemo(() => {
    let sorted = [...items]

    // Apply sorting
    switch (sortMode) {
      case 'alphabetical':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recent':
        sorted.sort((a, b) => b.updatedAt - a.updatedAt)
        break
      case 'category':
        sorted.sort((a, b) => {
          const catA = categories.find((c) => c.id === a.category)?.name || 'ZZZ'
          const catB = categories.find((c) => c.id === b.category)?.name || 'ZZZ'
          return catA.localeCompare(catB)
        })
        break
    }

    return sorted
  }, [items, sortMode, categories])

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <div className="h-screen h-[100dvh] flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800" style={{ overscrollBehavior: 'none', ...(isIOS && { position: 'fixed', width: '100%', top: 0, left: 0 }) }}>
      <ShoppingListHeader />
      <AddItemForm />

      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full px-4">
        {/* Sort Options - Fixed */}
        <div className="flex-shrink-0 py-3 flex gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400 my-auto">Sortieren:</span>
          {[
            { mode: 'recent' as SortMode, label: 'Neueste' },
            { mode: 'alphabetical' as SortMode, label: 'A-Z' },
            { mode: 'category' as SortMode, label: 'Kategorie' },
          ].map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => setSortMode(mode)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                sortMode === mode
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Items List - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-16" style={{ overscrollBehavior: 'contain' }}>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <ShoppingItem key={item.id} item={item} />
                ))
              ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-400 dark:text-gray-500 mb-2">
                  Deine Liste ist leer
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Füge dein erstes Produkt hinzu!
                </p>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
