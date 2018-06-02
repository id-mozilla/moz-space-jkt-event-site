<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm8 md8>
      <h1 class="headline my-2">{{ event.title }}</h1>
      <v-chip v-if="event.eventType" small label outline color="primary" >{{ event.eventType.name }}</v-chip>
      <h3 v-if="event.organization" class="title my-2">oleh {{ event.organization.name }}</h3>
      <hr>
      <v-layout row wrap justify-center align-center class="mt-3 mb-3">
        <v-flex xs12 md4>
          <v-icon large>date_range</v-icon>
          {{ event.startDateTime }}
        </v-flex>
        <v-flex xs12 md4>
          <v-icon large>access_time</v-icon>
          {{ event.startDateTime }}
        </v-flex>
        <v-flex xs12 md4>
          <v-icon large>add_alarm</v-icon>
          {{ event.duration }} Jam
        </v-flex>
        <v-flex v-if="event.roomType" xs12 md4>
          <v-icon large>meeting_room</v-icon>
           {{ event.roomType.name }} 
        </v-flex>
      </v-layout>
      <hr class="mb-3">
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 sm6 md8>
          <h3 class="subheading my-2"> 
            <span class="black white--text pa-1">
              Deskripsi acara
            </span>
          </h3>
          <p class="body-1">{{ event.description }}</p>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <h3 class="subheading my-2"> 
            <span class="black white--text pa-1">
              Detail acara
            </span>
          </h3>
          <p class="my-1"> 
            <span v-if="event.isPaid">Berbayar <v-icon color="error">sentiment_very_dissatisfied</v-icon></span>
            <span v-else>Geratis <v-icon color="green">mood</v-icon></span>
          </p>
          <p class="my-1">
            <span v-if="event.isUsingTable">MEMERLUKAN</span>
            <span v-else>TIDAK MEMERLUKAN</span>
            Meja
          </p>
          <p class="my-1">
            <span v-if="event.isProvidingFood">MENYEDIAKAN</span>
            <span v-else>TIDAK MENYEDIAKAN</span>
            Makanan
          </p>
          <hr class="my-2">
          <h3 class="subheading my-2">
            <span class="black white--text pa-1">
              Estimasi jumlah peserta
            </span>
          </h3>
          <h2 class="title">{{ event.numberOfAttendees }} Orang</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center align-center class="my-2">
        <v-flex xs6>
          <v-btn color="primary">Konfirmasi acara ini</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData({ $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.$get(`/Events/${params.id}?filter[include]=organization&filter[include]=roomType&filter[include]=eventType`).then(res => {
        resolve({ event: res })
      }).catch(err => {
        reject({
          statusCode: err.status,
          message: err.message,
        })
      })
    })
  },
  data() {
    return {
      event: {}
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
