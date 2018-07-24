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
          {{ event.startDateTime | showDateOnly }}
        </v-flex>
        <v-flex xs12 md4>
          <v-icon large>access_time</v-icon>
          {{ event.startDateTime | showTimeOnly }}
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
      <hr class="my-2">
      <h3 class="subheading my-2">
        <span class="black white--text pa-1">
          Aksi
        </span>
      </h3>
      <v-layout v-if="event.confirmed !== true" row wrap justify-center align-center class="my-2">
        <v-flex xs6>
          <v-btn color="primary" @click="confirmDialog = true">Konfirmasi acara ini</v-btn>
        </v-flex>
      </v-layout>
      <div v-else>
        <v-layout row wrap justify-center align-center>
          <v-flex xs12>
            <h3>Acara telah di konfirmasi</h3>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center align-center class="my-2">
          <v-flex xs6 sm6 md6>
            <v-btn color="primary" @click="$router.push({ name: 'admin-events-id-list-of-attendees', params: { id: event.id }})">Absensi</v-btn>
            <v-btn @click="$router.push({ name: 'admin-events-id-edit'})">Edit</v-btn>
          </v-flex>
          <v-flex xs6 sm6 md6>
            <v-btn @click="$router.push({ name: 'admin-events-id-welcome', params: { id: event.id }})">Ucapan Selamat Datang</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
    <v-dialog v-model="confirmDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Apakah kamu yakin akan mengkonfirmasi acara ini</v-card-title>
        <v-card-text>Yakin ya, kalo ragu tanya di group dulu deh mending :D</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="confirmDialog = false">Batal</v-btn>
          <v-btn color="green darken-1" flat @click.native="confirmEvent(event)">Yoi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import dayjs from 'dayjs';

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
      event: {},
      confirmDialog: false,
    }
  },
  filters: {
    showDateOnly(dateTime) {
      return dayjs(dateTime).format('DD-MM-YYYY')
    },
    showTimeOnly(dateTime) {
      return dayjs(dateTime).format('HH:mm')
    }
  },
  methods: {
    ...mapActions(['notify']),
    confirmEvent(event) {
      this.$axios.$patch(`/Events/${event.id}`, {
        confirmed: true,
      }).then(res => {
        // notify success
        this.confirmDialog = false;
        this.event.confirmed = true;
        this.notify({ type: 'success', message: 'Sukses konfirmasi acara'})
      }).catch(err => {
        // notify error
        this.confirmDialog = false;
        this.notify({ type: 'error', message: err.message })
      })
    }
  }
}
</script>
