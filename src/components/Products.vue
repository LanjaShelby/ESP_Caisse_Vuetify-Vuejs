<template>
  <v-btn icon="mdi-plus-circle"></v-btn>

  <v-btn icon="mdi mdi-shopping" to="/Panier"></v-btn>

  <v-btn icon="mdi-dots-vertical"></v-btn>

  <v-row>
    <v-col v-for="i in 6" :key="i" cols="12" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          cover
          height="205"
          :lazy-src="`https://picsum.photos/10/6?image=${i * 2 * 5 + 10}`"
          :src="`https://picsum.photos/500/300?image=${i * 2 * 5 + 10}`"
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
