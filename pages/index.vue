<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
      </div>
    </v-flex>
    <v-flex xs12 sm6>
      <h2 class="ma-4" align-center>Kegiatan Mozilla Indonesia Mendatang {{ month }} </h2>
      <event-list :events="events"/>
      <h4 class="text-xs-center">tidak ada yang menarik ?</h4>
      <v-btn small @click="$router.push('/events/create')">Selenggarakan acaramu sendiri</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import EventList from '@/components/Events/EventList';

export default {
  asyncData(context, cb) {
    setTimeout(() => {
      cb(null, {
        events: [
          {
            id: 'as323131af',
            title: "#MozBelajar CSS Grid",
            slug: "moz-belajar-css-grid",
            organization: "Mozilla Indonesia",
            description: "Anggap aja ini description dulu ya",
          },
          {
            id: 'as32kjfas',
            title: "#MozBelajar Firefox Quantum",
            slug: "moz-belajar-firefox-quantum",
            organization: "Mozilla Indonesia",
            description: "Anggap aja ini description dulu ya",
          },
        ]
      })
    }, 1500)
  },
  data() {
    return {
      month: 'Februari'
    }
  },
  components: {
    Logo,
    EventList,
  }
}
</script>
