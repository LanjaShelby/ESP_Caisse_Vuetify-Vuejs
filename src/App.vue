<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card color="basil">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2 text-basil">ESP-Caisse</h1>
          </v-card-title>
          <v-card>
            <v-tabs
              v-model="currentTab"
              align-tabs="center"
              color="deep-purple-accent-4"
              grow
            >
              <v-tab to="/Home" :value="'/Home'">Home</v-tab>
              <v-tab to="/Products" :value="'/city'">Products</v-tab>
              <v-tab to="/History" :value="'/History'">History</v-tab>
            </v-tabs>

            <v-container fluid>
              <router-view />
            </v-container>
          </v-card>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const currentTab = ref(route.path)

  watch(() => route.path, newPath => {
    currentTab.value = newPath
  },
  )
</script>
