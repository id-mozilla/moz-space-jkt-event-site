<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm8 md8>

      <h3 class="headline text-xs-center">Absensi daftar hadir peserta</h3>
      <h4 class="title text-xs-center mt-3 orange--text" v-if="event">{{ event.title }}</h4>

      <v-stepper v-model="attendeeStep" vertical class="mt-4">
        <v-stepper-step step="1" complete>
          Sudah pernah kesini ?
        </v-stepper-step>
        <v-stepper-content step="1">
          
          <v-btn color="primary" @click.native="attendeeStep = 2">Saya pernah kesini</v-btn>
        </v-stepper-content>
        <v-stepper-step step="2" complete>Isi data berikut ya</v-stepper-step>
        <v-stepper-content step="2">
          <new-attendees-form></new-attendees-form>
        </v-stepper-content>
      </v-stepper>

      
      <v-dialog v-model="successDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Sudah masuk absensi</v-card-title>
          <div class="text-xs-center">
            <logo/>
          </div>
          <v-card-text>
            <p class="text-xs-center">
              Selamat belajar dan bersenang-senang di Mozilla Community Space ya!
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="successDialog = false">Ok, lanjut absen temennya</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import NewAttendeesForm from '~/components/ListOfAttendees/NewAttendeesForm';

export default {
  data() {
    return {
      event: {},
      successDialog: false,
      attendeeStep: 1,
      firstVisit: true,
    }
  },
  methods: {
    fetchEventInformation(id) {
      this.$axios.$get(`/Events/${id}`).then(event => {
        this.event = event
      }).catch(err => {
        console.log('error when trying to get event detail information : ', err)
      })
    }
  },
  created() {
    this.fetchEventInformation(this.$route.params.id)
  },
  components: {
    Logo,
    NewAttendeesForm,
  }
}
</script>
