import { useState } from 'react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Sparkles, ScanLine } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useFirebaseSync } from '../../hooks/useFirebaseSync'
import { suggestCategory, getEmojiForItem } from '../../utils/categories'
import { parseVoiceInput } from '../../utils/parseVoiceInput'
import { BarcodeScanner } from '../Scanner/BarcodeScanner'
import { VoiceInput } from '../VoiceInput/VoiceInput'
import type { ShoppingItem } from '../../types'

export const AddItemForm = () => {
  const { user, categories } = useStore()
  const { addItemToFirebase } = useFirebaseSync(user?.uid || null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    await addItem(name, description)
    // Keep input focused for next item
    inputRef.current?.focus()
  }

  const addItem = async (itemName: string, itemDescription: string = '', extra?: Partial<ShoppingItem>) => {
    const suggestedCategory = suggestCategory(itemName)
    const emoji = getEmojiForItem(itemName)

    const newItem: Omit<ShoppingItem, 'id'> = {
      name: itemName.trim(),
      description: itemDescription.trim(),
      category: suggestedCategory,
      favorite: false,
      emoji,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...extra,
    }

    await addItemToFirebase(newItem)
    setName('')
    setDescription('')
    // Keep expanded so description field stays visible for next item
  }

  const handleVoiceResult = async (text: string) => {
    const parsed = parseVoiceInput(text)
    await addItem(parsed.name, parsed.description)
  }

  const handleBarcodeProduct = async (product: any) => {
    // Add scanned product directly with empty description
    await addItem(
      product.name,
      '',
      {
        barcode: product.barcode,
        brand: product.brand,
        category: product.category,
        emoji: product.emoji,
        imageUrl: product.imageUrl,
      }
    )
    setIsScannerOpen(false)
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <>
      <div
        className={`${isIOS ? 'flex-shrink-0' : 'sticky top-[73px]'} z-40 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border-b border-indigo-100 dark:border-slate-700 shadow-lg`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              {/* Voice Input */}
              <VoiceInput onResult={handleVoiceResult} />

              {/* Scanner Button */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsScannerOpen(true)}
                className="p-4 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all"
              >
                <ScanLine className="w-6 h-6 text-white" />
              </motion.button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  placeholder="Was brauchst du?"
                  autoComplete="off"
                  autoCapitalize="sentences"
                  className="w-full px-4 py-3.5 bg-white dark:bg-slate-700 rounded-2xl border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all shadow-sm dark:text-white placeholder:text-gray-400"
                />
                {name && getEmojiForItem(name) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none"
                  >
                    {getEmojiForItem(name)}
                  </motion.span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                disabled={!name.trim()}
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-2xl shadow-lg shadow-indigo-500/30 disabled:shadow-none transition-all flex items-center gap-2 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Hinzufügen</span>
              </motion.button>
            </div>

            {/* Expanded Description Field */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Beschreibung (optional)"
                    autoComplete="off"
                    autoCapitalize="sentences"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 rounded-2xl border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all shadow-sm dark:text-white placeholder:text-gray-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smart Suggestion Hint */}
            {name && suggestCategory(name) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  Wird zu "{categories.find(c => c.id === suggestCategory(name))?.name}" hinzugefügt
                </span>
              </motion.div>
            )}
          </form>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onProductFound={handleBarcodeProduct}
      />
    </>
  )
}
