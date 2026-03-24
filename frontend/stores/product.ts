import { defineStore } from 'pinia'

interface ProductVariants {
  colors: { name: string; value: string }[]
}

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  images: string[]
  variants: ProductVariants | null
  active: boolean
}

export const useProductStore = defineStore('product', {
  state: () => ({
    product: null as Product | null,
    loading: false,
  }),
  actions: {
    async fetchProduct() {
      this.loading = true
      const { apiFetch } = useApi()
      try {
        const products = await apiFetch<Product[]>('/products')
        this.product = products[0] || null
      } finally {
        this.loading = false
      }
    },
  },
})
