<template>
  <v-table>
    <thead>
      <tr>
        <th>Produit</th>
        <th>Quantité</th>
        <th>Prix unitaire</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cart.items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price }} Ar</td>
        <td>{{ item.total }} Ar</td>
      </tr>
    </tbody>
  </v-table>
  <v-divider inset />
  <v-card
    class="mx-auto mt-4"
    color="surface-variant"
    image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
    max-width="340"
    :subtitle="'Montant détecté :' + Current_billet + ' Ariary' "
    :title="'Total à payer :' + cart.cartTotal + ' Ariary' "
  >
    <template #actions>
      <v-btn
        append-icon="mdi-chevron-right"
        block
        color="green-lighten-2"
        :disabled="canValidate"
        text="Valider l'achat"
        variant="outlined"
        @click="achat"
      />
    </template>
  </v-card>
</template>
<script setup>
  import axios from 'axios'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useBilletStore } from '@/stores/billetStore'
  import { useCartStore } from '@/stores/cart'
  const Value_billet = ref('')
  const Current_billet = ref(0)
  const canValidate = ref(true)
  const cart = useCartStore()
  let intervalId = null

  async function achat () {
    await axios.post('/orders', {
      items: cart.items,
      total: cart.cartTotal,
    })
    console.log('Orders Saved succesfully')
  }
  const billetStore = useBilletStore()
  console.log(billetStore.value)
  const detectBillet = () => {
    billetStore.detectBillet()
  }
  const val_billet = async () => {
    try {
      const response = await axios.get('http://localhost:5000/last_result')
      Value_billet.value = Number(response.data.valeur_billet) || 0

      Current_billet.value += Value_billet.value

      if (Current_billet.value >= cart.cartTotal) {
        canValidate.value = false
        const rendu = Current_billet.value - cart.cartTotal
        if (rendu > 0) {
          console.log('Monnaie à rendre :', rendu)
        }
      }
    } catch (error) {
      console.error('Erreur API Python :', error)
    }
  }
  onMounted(() => {
    intervalId = setInterval(val_billet, 2000) // toutes les 2s
  })
  onUnmounted(() => {
    clearInterval(intervalId)
  })
</script>
