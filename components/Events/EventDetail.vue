<template>
  <v-card class="mb-4">
    <v-card-media src="https://picsum.photos/300/200" height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
        <div> {{ description }} </div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange">Daftar</v-btn>
      <v-btn flat color="orange">Bagikan</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EventDetail',
  props: {
    id: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }
  
}
</script>
