<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h2 class="ma-3">Kegiatan Mozilla Indonesia Mendatang</h2>
      <event-list :events="loadedEvents"/>
    </v-flex>
  </v-layout>
</template>

<script>
import EventList from '~/components/Events/EventList';

export default {
  auth: false,
  components: {
    EventList,
  },
  computed: {
    loadedEvents() {
      return this.$store.getters.loadedEvents;
    }
  }
  
}
</script>
