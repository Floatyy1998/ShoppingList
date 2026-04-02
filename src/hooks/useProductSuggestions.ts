import { useState, useEffect, useRef } from 'react'
import { searchProductByName } from '../utils/openfoodfacts'

interface ProductSuggestion {
  name: string
  brand?: string
  category?: string
  emoji?: string
  imageUrl?: string
  barcode?: string
}

export const useProductSuggestions = (query: string, enabled: boolean = true) => {
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Reset if query is too short or disabled
    if (!enabled || query.length < 2) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    // Debounce API call
    debounceTimer.current = setTimeout(async () => {
      try {
        const products = await searchProductByName(query)

        // Transform to our format
        const transformed: ProductSuggestion[] = products
          .slice(0, 5) // Max 5 suggestions
          .map((product: any) => {
            const categories = product.categories?.toLowerCase() || ''
            let emoji = '📦'
            let categoryId = '8'

            // Smart category detection
            if (categories.includes('milch') || categories.includes('milk') || categories.includes('dairy')) {
              emoji = '🥛'
              categoryId = '3'
            } else if (categories.includes('brot') || categories.includes('bread') || categories.includes('bakery')) {
              emoji = '🍞'
              categoryId = '4'
            } else if (categories.includes('obst') || categories.includes('fruit') || categories.includes('gemüse') || categories.includes('vegetable')) {
              emoji = '🥬'
              categoryId = '1'
            } else if (categories.includes('fleisch') || categories.includes('meat') || categories.includes('wurst')) {
              emoji = '🥩'
              categoryId = '2'
            } else if (categories.includes('getränk') || categories.includes('beverage') || categories.includes('drink')) {
              emoji = '🥤'
              categoryId = '5'
            } else if (categories.includes('snack') || categories.includes('süßigkeit') || categories.includes('candy') || categories.includes('chocolate')) {
              emoji = '🍫'
              categoryId = '6'
            }

            return {
              name: product.product_name || product.product_name_de || 'Unbekannt',
              brand: product.brands?.split(',')[0]?.trim(),
              category: categoryId,
              emoji,
              imageUrl: product.image_url || product.image_small_url,
              barcode: product.code,
            }
          })
          .filter(p => p.name !== 'Unbekannt') // Filter out unknowns

        setSuggestions(transformed)
      } catch (error) {
        console.error('Product suggestions error:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }, 300) // 300ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query, enabled])

  return { suggestions, isLoading }
}
