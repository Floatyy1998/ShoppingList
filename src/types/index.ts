export interface ShoppingItem {
  id: string
  name: string
  description?: string
  category?: string
  quantity?: number
  unit?: string
  favorite: boolean
  emoji?: string
  barcode?: string
  imageUrl?: string
  brand?: string
  createdAt: number
  updatedAt: number
}

export interface PurchaseHistory {
  id: string
  itemName: string
  category?: string
  emoji?: string
  brand?: string
  purchasedAt: number
  frequency: number // How many times bought
}

export interface Category {
  id: string
  name: string
  emoji: string
  color: string
}

export interface User {
  uid: string
  email: string | null
  displayName?: string | null
}

export type ViewMode = 'all' | 'favorites' | 'active' | 'completed'
export type SortMode = 'alphabetical' | 'recent' | 'category' | 'frequency'
export type ThemeMode = 'light' | 'dark' | 'auto'
