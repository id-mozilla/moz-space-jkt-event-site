<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h2 class="ma-3">Selamat Datang di Mozilla Community Space</h2>
      <p>{{ participant }}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import socket from '~/plugins/socket-io'
export default {
  name: 'WelcomeToMozSpace',
  beforeMount() {
    socket.on('new-participant', (newParticipant) => {
      this.participant = newParticipant;
    })
  },
  data() {
    return {
      participant: {},
    }
  }
}
</script>

