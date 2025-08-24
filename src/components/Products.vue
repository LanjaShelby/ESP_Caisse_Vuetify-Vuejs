<template>
  <v-btn icon="mdi-plus-circle" @click="addDialog = true" />
  <v-dialog v-model="addDialog" max-width="500">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">Product</div>
        <v-btn icon="mdi-close" variant="text" @click="addDialog = false" />
      </v-card-title>

      <v-divider class="mb-4" />

      <v-card-text>
        <v-form>
          <v-text-field v-model="addProduct.category" label="Category" />
          <v-text-field v-model="addProduct.libelle" label="Libelle" />
          <v-text-field v-model="addProduct.price" label="Price" />
          <v-text-field
            v-model="addProduct.quantity"
            label="Quantity"
            :rules="[v => !!v || 'Required']"
            type="number"
          />
        </v-form>
        <!-- Image -->
        <v-file-input
          v-model="addProduct.image"
          accept="image/*"
          label="Image du produit"
          prepend-icon="mdi-camera"
          show-size
        />

        <v-divider class="mt-2" />

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none" rounded="xl" text="Cancel" @click="addDialog = false" />
          <v-btn
            color="primary"
            text="Commander"
            variant="flat"
            @click="createProducts"
          />
        </v-card-actions>
      </v-card-text></v-card>
  </v-dialog>

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
          :src="`http://127.0.0.1:4040/uploads/products/${Product.image}`"
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
            <div class="text-none font-weight-regular">Acheter</div>
          </v-btn>

          <v-dialog v-model="dialog" max-width="500">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">Product</div>
                <v-btn icon="mdi-close" variant="text" @click="dialog = false" />
              </v-card-title>

              <v-divider class="mb-4" />

              <v-card-text>
                <v-form>
                  <v-text-field v-model="selectedProduct.libelle" disabled label="Libelle" />
                  <v-text-field v-model="selectedProduct.price" disabled label="Price" />
                  <v-text-field
                    v-model="quantity"
                    label="Quantity"
                    :rules="[v => !!v || 'Required']"
                    type="number"
                  />
                </v-form>
                <v-text-field
                  label="Prix total"
                  :model-value="totalPrice "
                  prefix="Ar"
                  readonly
                />
              </v-card-text>

              <v-divider class="mt-2" />

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn class="text-none" rounded="xl" text="Cancel" @click="dialog = false" />
                <v-btn
                  color="primary"
                  text="Commander"
                  variant="flat"
                  @click="submitOrder(selectedProduct,quantity,totalPrice); dialog = false"
                />
              </v-card-actions>
            </v-card>
          </v-dialog>
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

  <v-divider class="mx-4 mt-2 " inset />
  <h3 class="mx-4 mt-4">Capteur</h3>
  <v-row class="mt-4">
    <v-col v-for="Product in getProductsByCategory('Capteur')" :key="Product.id" cols="12" md="4">
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
            <div class="text-none font-weight-regular">Acheter</div>
          </v-btn>

          <v-dialog v-model="dialog" max-width="500">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">Product</div>
                <v-btn icon="mdi-close" variant="text" @click="dialog = false" />
              </v-card-title>

              <v-divider class="mb-4" />

              <v-card-text>
                <v-form>
                  <v-text-field v-model="selectedProduct.libelle" disabled label="Libelle" />
                  <v-text-field v-model="selectedProduct.price" disabled label="Price" />
                  <v-text-field
                    v-model="quantity"
                    label="Quantity"
                    :rules="[v => !!v || 'Required']"
                    type="number"
                  />
                </v-form>
                <v-text-field
                  label="Prix total"
                  :model-value="totalPrice "
                  prefix="Ar"
                  readonly
                />
              </v-card-text>

              <v-divider class="mt-2" />

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn class="text-none" rounded="xl" text="Cancel" @click="dialog = false" />
                <v-btn
                  color="primary"
                  text="Commander"
                  variant="flat"
                  @click="submitOrder(selectedProduct,quantity,totalPrice); dialog = false"
                />
              </v-card-actions>
            </v-card>
          </v-dialog>
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
   <v-divider class="mx-4 mt-2 " inset />
  <h3 class="mx-4 mt-4">Driver</h3>
  <v-row class="mt-4">
    <v-col v-for="Product in Products" :key="Product.id" cols="12" md="4">
      <v-card class="mx-auto " max-width="344">
        <v-img
          cover
          height="205"
          :src="`http://127.0.0.1:4040/uploads/products/${Product.image}`"
        />
        <div class="d-flex justify-space-between align-center">

          <v-card-title> {{ Product.libelle }} </v-card-title>
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
            <div class="text-none font-weight-regular">Acheter</div>
          </v-btn>

          <v-dialog v-model="dialog" max-width="500">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">Product</div>
                <v-btn icon="mdi-close" variant="text" @click="dialog = false" />
              </v-card-title>

              <v-divider class="mb-4" />

              <v-card-text>
                <v-form>
                  <v-text-field v-model="selectedProduct.libelle" disabled label="Libelle" />
                  <v-text-field v-model="selectedProduct.price" disabled label="Price" />
                  <v-text-field
                    v-model="quantity"
                    label="Quantity"
                    :rules="[v => !!v || 'Required']"
                    type="number"
                  />
                </v-form>
                <v-text-field
                  label="Prix total"
                  :model-value="totalPrice "
                  prefix="Ar"
                  readonly
                />
              </v-card-text>

              <v-divider class="mt-2" />

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn class="text-none" rounded="xl" text="Cancel" @click="dialog = false" />
                <v-btn
                  color="primary"
                  text="Commander"
                  variant="flat"
                  @click="submitOrder(selectedProduct,quantity,totalPrice); dialog = false"
                />
              </v-card-actions>
            </v-card>
          </v-dialog>
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
  import { useCartStore } from '@/stores/cart'
  import axios from '../plugins/axios'
  const cart = useCartStore()
  const quantity = ref('')
  const dialog = ref(false)
  const addDialog = ref(false)
  const Products = ref([])
  const categories = ref(['Microcontroleur', 'Capteur', 'Driver', 'Mate'])
  const quantityError = ref('')
  const selectedProduct = ref({
    id: '',
    category: '',
    libelle: '',
    quantity: '',
    price: '',
  })
  const addProduct = ref({
    category: '',
    libelle: '',
    quantity: '',
    price: '',
    image: '',
  })
  const totalPrice = computed(() => {
    const qte = Number.parseFloat(quantity.value)
    const price = Number.parseFloat(selectedProduct.value.price)
    const stock = Number.parseFloat(selectedProduct.value.quantity)
    if (qte > stock || qte < 0) {
      return 'Stock insuffisante'
    } else {
      return Number.isNaN(qte) || Number.isNaN(price) ? 0 : qte * price
    }
  })
  const validateQuantity = () => {
    quantityError.value = quantity.value > product.value.quantity ? `Stock insuffisant (max: ${product.value.quantity})` : '' 
  }
  function getProductsByCategory (category) {
    return Products.value.filter(product => product.category === category)
  }

  function submitOrder (selectedProduct, quantity, totalPrice) {
    if (quantity > selectedProduct.quantity) {
      console.log('Quantité dépassée')
      return
    }

    cart.addToCart(selectedProduct, quantity)
    console.log('Cart ajouter')
    // Ta logique ici
    console.log('Commande envoyée :', quantity, selectedProduct, totalPrice)
  }
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
      const response = await axios.post('/products', {
        libelle: addProduct.value.libelle,
        category: addProduct.value.category,
        quantity: addProduct.value.quantity,
        price: addProduct.value.price,
        file: addProduct.value.image,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        } })
      console.log(response.data)
      addProduct.value.libelle = null
      addProduct.value.image = null
      addProduct.value.category = null
      addProduct.value.price = null
      addProduct.value.quantity = null
      addDialog.value = false
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
