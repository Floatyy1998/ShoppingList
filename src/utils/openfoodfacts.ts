interface OpenFoodFactsProduct {
  product_name?: string
  brands?: string
  categories?: string
  image_url?: string
  quantity?: string
}

export const searchProductByBarcode = async (barcode: string): Promise<{
  name: string
  brand?: string
  category?: string
  imageUrl?: string
  emoji?: string
} | null> => {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
    const data = await response.json()

    if (data.status === 1 && data.product) {
      const product: OpenFoodFactsProduct = data.product

      // Kategorien parsen und Emoji zuordnen
      const categories = product.categories?.toLowerCase() || ''
      let emoji = '📦'
      let categoryId = '8'

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
      } else if (categories.includes('snack') || categories.includes('süßigkeit') || categories.includes('candy')) {
        emoji = '🍿'
        categoryId = '6'
      }

      return {
        name: product.product_name || 'Unbekanntes Produkt',
        brand: product.brands,
        category: categoryId,
        imageUrl: product.image_url,
        emoji,
      }
    }

    return null
  } catch (error) {
    console.error('OpenFoodFacts API Error:', error)
    return null
  }
}

export const searchProductByName = async (name: string): Promise<any[]> => {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(name)}&search_simple=1&json=1&page_size=10&fields=product_name,product_name_de,brands,categories,image_url,image_small_url,code`
    )
    const data = await response.json()

    // Filter and prioritize German products
    const products = (data.products || [])
      .filter((p: any) => p.product_name || p.product_name_de)
      .sort((a: any, b: any) => {
        // Prioritize products with German names
        if (a.product_name_de && !b.product_name_de) return -1
        if (!a.product_name_de && b.product_name_de) return 1
        return 0
      })

    return products
  } catch (error) {
    console.error('OpenFoodFacts Search Error:', error)
    return []
  }
}
