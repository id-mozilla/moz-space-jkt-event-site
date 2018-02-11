<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
      </div>
    </v-flex>
    <v-flex xs12 sm6>
      <h2 class="ma-4" align-center>Kegiatan Mozilla Indonesia Mendatang {{ month }} </h2>
      <event-list :events="loadedEvents"/>
      <div class="text-xs-center">
        <h4 class="text-xs-center">tidak ada yang menarik ?</h4>
        <v-btn small color="secondary" @click="$router.push('/events/create')">Selenggarakan acaramu sendiri</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import EventList from '@/components/Events/EventList';

export default {
  data() {
    return {
      month: 'Februari'
    }
  },
  computed: {
    loadedEvents() {
      return this.$store.getters.loadedEvents;
    }
  },
  components: {
    Logo,
    EventList,
  }
}
</script>
