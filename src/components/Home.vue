<template>
   <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Word of the Day</div>

      <p class="text-h4 font-weight-black">be•nev•o•lent</p>

      <p>adjective</p>

      <div class="text-medium-emphasis">
        well meaning and kindly.<br>
        "a benevolent smile"
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple-accent-4"
        text="Learn More"
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
</script>
