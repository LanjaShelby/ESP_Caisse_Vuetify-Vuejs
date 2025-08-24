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
            Commande #{{ order.id }} - Total: {{ order.total }} - {{ formatDate(order.createdAt) }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              class="elevation-1"
              :headers="headers"
              dense
              :items="parseItems(order.items)"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'

const orders = ref([])

const headers = [
  { text: 'Produit', value: 'name' },
  { text: 'Catégorie', value: 'category' },
  { text: 'Prix', value: 'price' },
  { text: 'Quantité', value: 'quantity' },
  { text: 'Total', value: 'total' }
]

function parseItems(itemsString) {
  try {
    return JSON.parse(itemsString)
  } catch (e) {
    console.error('Erreur parsing items', e)
    return []
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString()
}

onMounted(async () => {
  try {
    const res = await axios.get('/orders')
    orders.value = res.data
  } catch (err) {
    console.error(err)
  }
})
</script>
