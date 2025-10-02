import { useEffect } from 'react'
import { ref, onValue, set, push, remove, update } from 'firebase/database'
import { database } from '../lib/firebase'
import { useStore } from '../store/useStore'
import type { ShoppingItem } from '../types'

export const useFirebaseSync = (userId: string | null) => {
  const { setItems, setIsLoading } = useStore()

  useEffect(() => {
    if (!userId) {
      setItems([])
      return
    }

    setIsLoading(true)
    const itemsRef = ref(database, `users/${userId}/items`)

    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const itemsArray: ShoppingItem[] = Object.entries(data).map(([id, item]: [string, any]) => ({
          id,
          ...item,
        }))
        setItems(itemsArray)
      } else {
        setItems([])
      }
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [userId, setItems, setIsLoading])

  return {
    addItemToFirebase: async (item: Omit<ShoppingItem, 'id'>) => {
      if (!userId) return
      const itemsRef = ref(database, `users/${userId}/items`)
      const newItemRef = push(itemsRef)
      await set(newItemRef, item)
    },

    updateItemInFirebase: async (itemId: string, updates: Partial<ShoppingItem>) => {
      if (!userId) return
      const itemRef = ref(database, `users/${userId}/items/${itemId}`)
      await update(itemRef, updates)
    },

    deleteItemFromFirebase: async (itemId: string) => {
      if (!userId) return
      const itemRef = ref(database, `users/${userId}/items/${itemId}`)
      await remove(itemRef)
    },

    clearCompletedInFirebase: async () => {
      // Removed since we don't have checked state anymore
      if (!userId) return
    },
  }
}
