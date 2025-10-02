import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, ShoppingItem, Category, ViewMode, SortMode, ThemeMode, PurchaseHistory } from '../types'

interface AppState {
  // Auth
  user: User | null
  setUser: (user: User | null) => void

  // Items
  items: ShoppingItem[]
  setItems: (items: ShoppingItem[]) => void
  addItem: (item: ShoppingItem) => void
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void
  deleteItem: (id: string) => void
  purchaseItem: (id: string) => void
  toggleFavorite: (id: string) => void

  // Purchase History
  purchaseHistory: PurchaseHistory[]
  addToPurchaseHistory: (item: ShoppingItem) => void

  // Categories
  categories: Category[]
  setCategories: (categories: Category[]) => void

  // UI State
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  sortMode: SortMode
  setSortMode: (mode: SortMode) => void
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      setUser: (user) => set({ user }),

      // Items
      items: [],
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates, updatedAt: Date.now() } : item
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      purchaseItem: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id)
          if (item) {
            // Add to history
            const existingHistory = state.purchaseHistory.find(
              (h) => h.itemName.toLowerCase() === item.name.toLowerCase()
            )

            const newHistory = existingHistory
              ? state.purchaseHistory.map((h) =>
                  h.itemName.toLowerCase() === item.name.toLowerCase()
                    ? { ...h, purchasedAt: Date.now(), frequency: h.frequency + 1 }
                    : h
                )
              : [
                  ...state.purchaseHistory,
                  {
                    id: Date.now().toString(),
                    itemName: item.name,
                    category: item.category,
                    emoji: item.emoji,
                    brand: item.brand,
                    purchasedAt: Date.now(),
                    frequency: 1,
                  },
                ]

            return {
              items: state.items.filter((i) => i.id !== id),
              purchaseHistory: newHistory,
            }
          }
          return state
        }),
      toggleFavorite: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, favorite: !item.favorite, updatedAt: Date.now() } : item
          ),
        })),

      // Purchase History
      purchaseHistory: [],
      addToPurchaseHistory: (item) =>
        set((state) => {
          const existing = state.purchaseHistory.find(
            (h) => h.itemName.toLowerCase() === item.name.toLowerCase()
          )

          if (existing) {
            return {
              purchaseHistory: state.purchaseHistory.map((h) =>
                h.itemName.toLowerCase() === item.name.toLowerCase()
                  ? { ...h, purchasedAt: Date.now(), frequency: h.frequency + 1 }
                  : h
              ),
            }
          }

          return {
            purchaseHistory: [
              ...state.purchaseHistory,
              {
                id: Date.now().toString(),
                itemName: item.name,
                category: item.category,
                emoji: item.emoji,
                brand: item.brand,
                purchasedAt: Date.now(),
                frequency: 1,
              },
            ],
          }
        }),

      // Categories
      categories: [
        { id: '1', name: 'Obst & Gemüse', emoji: '🥬', color: '#10b981' },
        { id: '2', name: 'Fleisch & Fisch', emoji: '🥩', color: '#ef4444' },
        { id: '3', name: 'Milchprodukte', emoji: '🥛', color: '#3b82f6' },
        { id: '4', name: 'Backwaren', emoji: '🍞', color: '#f59e0b' },
        { id: '5', name: 'Getränke', emoji: '🥤', color: '#8b5cf6' },
        { id: '6', name: 'Snacks', emoji: '🍿', color: '#ec4899' },
        { id: '7', name: 'Haushalt', emoji: '🧹', color: '#06b6d4' },
        { id: '8', name: 'Sonstiges', emoji: '📦', color: '#64748b' },
      ],
      setCategories: (categories) => set({ categories }),

      // UI State
      viewMode: 'all',
      setViewMode: (mode) => set({ viewMode: mode }),
      sortMode: 'recent',
      setSortMode: (mode) => set({ sortMode: mode }),
      themeMode: 'auto',
      setThemeMode: (mode) => set({ themeMode: mode }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Loading
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'shopping-list-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        sortMode: state.sortMode,
        themeMode: state.themeMode,
        categories: state.categories,
        purchaseHistory: state.purchaseHistory,
      }),
    }
  )
)
