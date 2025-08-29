<template>
   <v-card
    class="mx-auto mt-10"
    max-width="344"
  >
    <v-card-text>
      <p class="text-h4 font-weight-black">TOTAL CAISSE : </p>

      <div class="text-h4">
        {{totalCaisse}} Ariary
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple-accent-4"
        text="Transactions"
        to="/history"
        variant="text"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-table
    fixed-header
    height="300px"
  >
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
 <!-- <v-row>
    <v-col v-for="i in 4" :key="i" cols="12" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          cover
          height="205"
          :lazy-src="`https://picsum.photos/10/6?image=${i * 1 * 5 + 10}`"
          :src="`https://picsum.photos/500/300?image=${i * 1 * 5 + 10}`"
        ></v-img>

        <v-card-title> Home </v-card-title>

        <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange-lighten-2" text="Explore"></v-btn>

          <v-spacer></v-spacer>

          <v-btn color="medium-emphasis" icon="mdi-pencil" size="small"></v-btn>

          <v-btn color="medium-emphasis" icon="mdi-delete" size="small"></v-btn>
        </v-card-actions>
      </v-card>
       <v-img
                cover
                height="205"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
              ></v-img>
    </v-col>
  </v-row> -->
</template>
<script setup>
  import axios from 'axios'
  import { onMounted, ref } from 'vue'
  import { useCaisseStore } from '@/stores/caisse'
  const detect = ref('')
  const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
    },
  ]
  const caisse = useCaisseStore()
  const totalCaisse = caisse.totalCaisse // réactif automatiquement
  const detect_billet = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_latest_bill')
      detect.value = Number(response.data.prediction) || 0
      console.log(detect.value)
    } catch (error) {
      console.error('Erreur API Python :', error)
    }
  }
  onMounted(detect_billet)
</script>
