<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
      </div>
    </v-flex>
    <v-flex xs12 sm6>
      <h2 class="ma-4">Kegiatan Mozilla Indonesia Mendatang</h2>
      <event-list/>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import EventList from '@/components/Events/EventList';

export default {
  components: {
    Logo,
    EventList,
  }
}
</script>
