<!--<template>
  <v-table striped="even">
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Calories
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup>
  import { onMounted, ref, toRaw } from 'vue'
  import axios from '../plugins/axios'
  const Orders = ref([])
  const desserts = ref([
    {
      name: 'Frozen Yogurt',
      calories: 159,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
    },
    {
      name: 'Eclair',
      calories: 262,
    },
    {
      name: 'Cupcake',
      calories: 305,
    },
    {
      name: 'Gingerbread',
      calories: 356,
    },
    {
      name: 'Jelly bean',
      calories: 375,
    },
    {
      name: 'Lollipop',
      calories: 392,
    },
    {
      name: 'Honeycomb',
      calories: 408,
    },
    {
      name: 'Donut',
      calories: 452,
    },
    {
      name: 'KitKat',
      calories: 518,
    },
  ])
  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders')
      Orders.value = toRaw(response.data)
      console.log(toRaw(Orders.value))
    } catch (error) {
      console.error('Erreur GET :', error)
    }
  }
  onMounted(fetchOrders)
</script>
-->
<template>
  <v-container>
    <v-row v-for="order in orders" :key="order.id" class="mb-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Commande #{{ order.id }} - {{ formatDate(order.createdAt) }} <br>
            Total: {{ order.total }}
          </v-card-title>
          <v-btn
            append-icon="mdi mdi-invoice-text-check-outline"
            class="ml-5"
            :color="getFactureColor(order.etat_facture)"
            @click="Facturation(order.id)"
          >
            Facture
            <v-icon color="warning" />
          </v-btn>
          <v-card-text>
            <v-data-table-virtual class="elevation-1" dense :headers="headers.value" :items="parseItems(order.items)">
              <template #bottom>
                <div class="text-right font-weight-bold pr-4">
                  Payé: {{ order.total }} <br>
                  Rendu: {{ order.rendu }}
                </div>
              </template>
              <template #top>
                <div class="text-left font-weight-bold pr-4">
                  Transactions: {{ order.no_transactions }}
                </div>
              </template>
            </v-data-table-virtual>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import axios from '@/plugins/axios'

  const orders = ref([])
  let intervalId = null
  const headers = [
    { text: 'Produit', value: 'name' },
    { text: 'Catégorie', value: 'category' },
    { text: 'Prix(Ariary)', value: 'price' },
    { text: 'Quantité', value: 'quantity' },
    { text: 'Total', value: 'total' },
  ]

  function parseItems (itemsString) {
    try {
      return JSON.parse(itemsString)
    } catch (error) {
      console.error('Erreur parsing items', error)
      return []
    }
  }

  function formatDate (dateString) {
    return new Date(dateString).toLocaleString()
  }
  const getFactureColor = etat => {
    switch (etat) {
      case true : {
        return 'green'
      }
      case false: {
        return 'orange'
      }
      default: {
        return 'grey'
      }
    }
  }
  const Facturation = async orderId => {
    const response = await axios.get(`/orders/${orderId}/facture`)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    // déclenche téléchargement
    const link = document.createElement('a')
    link.href = url
    link.download = `facture-${orderId}.pdf`
    link.click()
  }
  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders')
      orders.value = res.data
    } catch (error) {
      console.error(error)
    }
  }
  onMounted(() => {
    intervalId = setInterval(fetchOrders, 2000)
  })
  onUnmounted(() => {
    clearInterval(intervalId)
  })
</script>
