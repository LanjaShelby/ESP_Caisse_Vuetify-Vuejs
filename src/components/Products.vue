<template>
  <v-btn icon="mdi-plus-circle" />

  <v-btn icon="mdi mdi-shopping" to="/Panier" />

  <v-btn icon="mdi-dots-vertical" />
  <v-divider class="mx-4 mt-2 " inset />
  <h3 class="mx-4 mt-4">Microcontroleur</h3>
  <v-row class="mt-4">
    <v-col v-for="Product in Products" :key="Product" cols="12" md="4">
      <v-card class="mx-auto " max-width="344">
        <v-img
          cover
          height="205"
          :lazy-src="`https://picsum.photos/10/6?image=${2 * 2 * 5 + 10}`"
          :src="`https://picsum.photos/500/300?image=${4 * 2 * 5 + 10}`"
        />
        <div class="d-flex justify-space-between align-center"><v-card-title> {{ Product.libelle }} </v-card-title>

          <v-card-title> Reste: {{ Product.quantity }} </v-card-title>
        </div>
        <v-card-subtitle> Prix : {{ Product.price }} Ariary </v-card-subtitle>
        <v-card-actions>
          <v-btn
            class="pe-2"
            color="orange-lighten-2"
            prepend-icon="mdi mdi-shopping"
            variant="flat"
            @click="openDialog(Product)"
          >
            <div class="text-none font-weight-regular">
              Acheter
            </div>
            <v-dialog activator="parent" max-width="500">
              <template #default="{ isActive }">
                <v-card rounded="lg">
                  <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h5 text-medium-emphasis ps-2">
                      Product
                    </div>

                    <v-btn icon="mdi-close" variant="text" @click="isActive.value = false" />
                  </v-card-title>

                  <v-divider class="mb-4" />

                  <v-card-text>
                    <v-form disabled>
                      <v-text-field label="Libelle">{{ selectedProduct.libelle }}</v-text-field>
                    </v-form>
                    <v-form disabled>
                      <v-text-field label="Price"> {{ selectedProduct.price }}</v-text-field>
                    </v-form>
                    <v-form>
                      <v-text-field label="Quantity" />
                    </v-form>
                  </v-card-text>

                  <v-divider class="mt-2" />

                  <v-card-actions class="my-2 d-flex justify-end">
                    <v-text-field
                      color="success"
                      disabled
                      loading
                    />
                    <v-btn class="text-none" rounded="xl" text="Cancel" @click="isActive.value = false" />

                    <v-btn
                      class="text-none"
                      color="primary"
                      rounded="xl"
                      text="Send"
                      variant="flat"
                      @click="isActive.value = false"
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-btn>
          <v-spacer />
          <v-btn color="medium-emphasis" icon="mdi-pencil" size="small" />

          <v-btn color="medium-emphasis" icon="mdi-delete" size="small" />
        </v-card-actions>
      </v-card>
      <!-- <v-img
                cover
                height="205"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
              ></v-img>-->
    </v-col>
  </v-row>

  <v-divider class="mx-4 mt-4 " inset />
  <h3 class="mx-4 mt-4">Materiels</h3>
  <v-row class="mt-4">
    <v-col v-for="i in 6" :key="i" cols="12" md="4">
      <v-card class="mx-auto " max-width="344">
        <v-img
          cover
          height="205"
          :lazy-src="`https://picsum.photos/10/6?image=${1 * 2 * 5 + 10}`"
          :src="`https://picsum.photos/500/300?image=${2 * 2 * 5 + 10}`"
        />

        <v-card-title> Products </v-card-title>

        <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange-lighten-2" text="Explore" />

          <v-spacer />

          <v-btn color="medium-emphasis" icon="mdi-pencil" size="small" />

          <v-btn color="medium-emphasis" icon="mdi-delete" size="small" />
        </v-card-actions>
      </v-card>
      <!-- <v-img
                cover
                height="205"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
              ></v-img>-->
    </v-col>
  </v-row>
</template>
<script setup>
  import { computed, onMounted, ref, toRaw } from 'vue'
  import axios from '../plugins/axios'
  const dialog = ref(false)
  const Products = ref([])
  const ProductsClick = ref({
    id: '',
    category: '',
    libelle: '',
    quantity: '',
    price: '',
  })
  const form = ref({
    id: '',
    category: '',
    libelle: '',
    quantity: '',
    price: '',
  })
  // GET : Charger les utilisateurs à l'initialisation
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/products')
      Products.value = toRaw(response.data)
      console.log(toRaw(Products.value))
    } catch (error) {
      console.error('Erreur GET :', error)
    }
  }
  // POST : Envoyer un nouvel utilisateur
  const createProducts = async () => {
    try {
      const response = await axios.post('/products', form.value)
      console.log('Utilisateur ajouté :', response.data)

      // Optionnel : recharger la liste
      users.value.push(response.data)

      // Réinitialiser le formulaire
      form.value.name = ''
      form.value.email = ''
    } catch (error) {
      console.error('Erreur POST :', error)
    }
  }
  function openDialog (product) {
    selectedProduct.value = { ...product }
    dialog.value = true
  }
  onMounted(fetchUsers)
</script>
