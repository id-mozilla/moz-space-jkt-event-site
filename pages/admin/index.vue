<template>
<div>
 <v-layout>
   <v-flex align-center justify-center>
      <h2 class="text-xs-center">Selamat datang Kiholder</h2>
   </v-flex>
 </v-layout>
  <v-layout align-center justify-center>
    <v-flex xs12 
            sm6 
            md6>
      <event-table title="Acara Mendatang"/>
    </v-flex>
    <v-flex xs12 sm6 md6>
      <h3>event belum di konfirmasi</h3>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import EventTable from '@/components/Events/EventTable'

export default {
  components: {
    EventTable,
  } 
}
</script>
