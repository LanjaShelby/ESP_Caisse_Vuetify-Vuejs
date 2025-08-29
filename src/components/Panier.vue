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
  <v-dialog
    v-model="dialog"
  >
    <v-card
      append-icon="$close"
      class="mx-auto"
      elevation="16"
      title="Achat validé"
      width="500"
    >
      <template #append>
        <v-btn icon="$close" variant="text" @click="dialog = false" />
      </template>

      <v-divider />

      <div class="py-12 text-center">
        <v-icon
          class="mb-6"
          color="success"
          icon="mdi-check-circle-outline"
          size="128"
        />

        <div class="text-h4 font-weight-bold">Payement Réussi</div>
      </div>

      <v-divider />

      <div class="pa-4 text-end">
        <v-btn
          class="text-none"
          color="medium-emphasis"
          min-width="92"
          rounded
          variant="outlined"
          @click="dialog = false"
        >
          Fermer
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
  import axios from 'axios'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useCaisseStore } from '@/stores/caisse'
  import { useCartStore } from '@/stores/cart'
  import fetch from '../plugins/axios'
  const Value_billet = ref('')
  const detect = ref('')
  const Current_billet = ref(0)
  const canValidate = ref(true)
  const cart = useCartStore()
  const rendu = ref(0)
  const dialog = ref(false)
  let intervalId = null
  const caisse = useCaisseStore()
  async function achat () {
    const response = await fetch.post('/orders', {
      etat_facture: false,
      items: cart.items,
      total: cart.cartTotal,
      totalPaye: Current_billet.value,
      rendu: rendu.value,
    })
    console.log(response.data)
    dialog.value = true
    caisse.ajouterMontant(Number(Current_billet.value))
    caisse.retirerMontant(Number(rendu.value))
    cart.clearCart()
    console.log('Orders Saved succesfully : total normal : ' + cart.cartTotal + 'total détecte : ' + Current_billet.value + 'rendu : ' + rendu.value)
  }

  const val_billet = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_latest_bill')
      Value_billet.value = Number(response.data.valeur_billet) || 0

      Current_billet.value += Value_billet.value

      if (Current_billet.value >= cart.cartTotal) {
        canValidate.value = false
        rendu.value = Current_billet.value - cart.cartTotal
        if (rendu.value > 0) {
          console.log('Monnaie à rendre :', rendu)
        }
      }
    } catch (error) {
      console.error('Erreur API Python :', error)
    }
  }
  onMounted(() => {
    intervalId = setInterval(val_billet, 2000) // toutes les 2s
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  })
  onUnmounted(() => {
    clearInterval(intervalId)
  })
</script>
