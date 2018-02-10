<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h2 class="ma-4">Kegiatan Mozilla Indonesia Mendatang</h2>
      <event-list/>
    </v-flex>
  </v-layout>
</template>

<script>
import EventList from '~/components/Events/EventList';

export default {
  components: {
    EventList,
  }
  
}
</script>
