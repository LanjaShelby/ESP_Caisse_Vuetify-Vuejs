// src/stores/caisse.js
import { defineStore } from 'pinia'

export const useCaisseStore = defineStore('caisse', {
  state: () => ({
    totalCaisse: 500_000,
  }),
  actions: {
    ajouterMontant (montant) {
      this.totalCaisse += montant
    },
    retirerMontant (montant) {
      this.totalCaisse -= montant
      if (this.totalCaisse < 0) {
        this.totalCaisse = 0
      }
    },
    resetCaisse () {
      this.totalCaisse = 0
    },
  },
})
