<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h2 class="ma-3">Terima kasih {{ $route.query.name }} , kami akan segera merespon melalui email</h2>
      <p>Pastikan email {{ $route.query.email }} aktif dan sering-sering dicek ya! </p>
      <event-list/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'GreetingAfterCreateEvent'
}
</script>

