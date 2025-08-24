// stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    cartTotal: state => {
      return state.items.reduce((sum, item) => sum + item.total, 0)
    },
  },
  actions: {
    addToCart (product, quantity) {
      const existing = this.items.find(item => item.id === product.id)
      const total = quantity * product.price

      if (existing) {
        existing.quantity += quantity
        existing.total = existing.quantity * product.price
      } else {
        this.items.push({
          id: product.id,
          category: product.category,
          name: product.libelle,
          price: product.price,
          quantity,
          total,
        })
      }
    },
    clearCart () {
      this.items = []
    },
  },
})
