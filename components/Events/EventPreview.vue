<template>
  <v-card class="mb-4">
    <v-card-media src="https://picsum.photos/300/200" height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
        <div> {{ description }}  </div>

      </div>
    </v-card-title>
    <v-card-actions>
      <!--<a  v-if="registrationLink != ''" class="btn btn&#45;&#45;flat secondary&#45;&#45;text" :href="registrationLink" target="_blank">Daftar</a>-->
      <v-btn v-show="registrationLink != '' " flat color="secondary" v-bind:href="registrationLink">Daftar</v-btn>
      <v-btn flat color="orange">Bagikan</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EventPreview',
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
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    registrationLink :{
      type: String,
      required: true,
    }
  }

}
</script>
