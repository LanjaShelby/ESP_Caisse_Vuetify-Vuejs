import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useBilletStore = defineStore('billet', {
  state: () => ({
    value: null,
  }),
  actions: {
    async detectBillet () {
      const response = await axios.get('http://localhost:5000/last_result')
      this.value = response.data.value
    },
  },
})
