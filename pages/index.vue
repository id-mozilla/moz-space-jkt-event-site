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
import qs from 'qs';

export default {
  auth: false,
  asyncData({ $axios }) {
    return new Promise((resolve, reject) => {
      const requestParams = {
        filter: {
          where: {
            confirmed: true,
          },
          include: ['organization'],
          order: 'startDateTime DESC',
        },
      }

      $axios.$get(`/Events?${qs.stringify(requestParams)}`).then(res => resolve({events: res})).catch(err => {
        reject({
          statusCode: err.status,
          message: err.message,
        })
      })
    })
  },
  data() {
    return {
      month: 'Maret',
      events: [],
    }
  },
  components: {
    Logo,
    EventList,
  }
}
</script>
