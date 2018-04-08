<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md8>
      <h2 class="ma-3 text-xs-center">Selanggarakan acara mu di MozSpaceJKT</h2>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step > 1">Membaca Ketentuan </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="step > 2">Pastikan Jadwal Tersedia</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3">Isi Data Komunitas</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">Isi Formulir</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-progress-linear v-if="isLoading" :indeterminate="true"></v-progress-linear>
          <v-stepper-content step="1">
            <term-condition></term-condition> 
            <div class="text-xs-right">
              <v-btn large color="secondary" @click.native="nextStep()">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
              <v-date-picker
                class="mt-3"
                v-model="date"
                min="2016-06-15"
                max="2018-03-20"
                :allowed-dates="allowedDates"
              ></v-date-picker>

            <div class="text-xs-right">
              <v-btn flat @click.native="step = 1">Kembali</v-btn>
              <v-btn large color="secondary" @click.native="nextStep()">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="3">
            <div class="text-xs-center">
              <h2 class="heading ma-3">Apakah komunitasmu pernah mengadakan acara disini ?</h2>
              <v-btn outline @click.native="chooseFirstTime(false)">Sudah Pernah</v-btn>
              <v-btn outline @click.native="chooseFirstTime(true)">Belum Pernah</v-btn>
            </div>

            <new-organization-form v-if="isOrganizationOptionChoosed && isFristTime" 
              ref="newOrganizationForm"
              @organizationFormSubmitted="handleOrganizationFormAfterSubmit"
              @startLoading="isLoading = true"></new-organization-form>
            <div class="text-xs-right">
              <v-btn flat @click.native="step = 2">Kembali</v-btn>
              <v-btn large color="secondary" @click.native="submitOrganizationForm">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="4">
            <form class="pa-4">
              <h3>Informasi acara</h3>
              <v-text-field
                v-model="title"
                label="Judul Acara"
                :error-messages="errors.collect('title')"
                v-validate="'required'"
                data-vv-name="title"
                required
              ></v-text-field>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="dateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="date"
              >
                <v-text-field
                  slot="activator"
                  label="Tanggal Acara"
                  v-model="date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="timeMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
                :return-value.sync="startTime"
              >
                <v-text-field
                  slot="activator"
                  label="Pilih waktu mulai"
                  v-model="startTime"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="startTime" @change="$refs.menu.save(startTime)"></v-time-picker>
              </v-menu>
              <v-select
                v-bind:items="eventTypeOptions"
                v-model="type"
                label="Tipe acara"
                :error-messages="errors.collect('type')"
                v-validate="'required'"
                data-vv-name="type"
                required
              ></v-select>
              <v-select
                v-bind:items="roomTypeOption"
                v-model="roomType"
                label="Tipe Ruangan"
                :error-messages="errors.collect('roomType')"
                v-validate="'required'"
                data-vv-name="roomType"
                item-text="name"
                item-value="id"
                return-object
                :hint="`${roomType.name} untuk sekitar ${roomType.capacity} orang`"
                required
              ></v-select>
              <v-text-field
                name="input-7-1"
                label="Deskripis acara"
                v-model="description"
                :error-messages="errors.collect('description')"
                v-validate="'required'"
                data-vv-name="description"
                multi-line
              ></v-text-field>
              <v-checkbox
                v-model="checkbox"
                value="1"
                label="Saya sudah membaca dan menyetujui perjajian"
                :error-messages="errors.collect('checkbox')"
                v-validate="'required'"
                data-vv-name="checkbox"
                type="checkbox"
                required
              ></v-checkbox>
              <v-btn @click="submit" color="primary">Kirim</v-btn>
            </form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import TermCondition from '@/components/Events/TermCondition'
import NewOrganizationForm from '@/components/Events/Create/NewOrganizationForm'

export default {
  $_veeValidate: {
    validator: 'new',
  },
  name: 'CreateEvent',
  created() {
    this.fetchRoomType()
  },
  data () {
    return {
      step: 3,
      isFristTime: true,
      isOrganizationOptionChoosed: false,
      isLoading: false,
      date: null,
      title: '',
      dateMenu: false,
      timeMenu: false,
      numberOfAttendees: 0,
      startTime: null,
      durationOptions: [1, 2, 3, 4, 5, 6, 7],
      duration: 1,
      type: null,
      isPaid: false,
      isProvidingFood: false,
      isUsingTable: false,
      roomTypeOption: [],
      roomType: {},
      eventTypeOptions: [
        'Presentation',
        'Learning Session',
        'Meeting',
        'Hackathon',
        'Looking Around'
      ],
      checkbox: null,
      description: '',
      organizationId: ''
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll().then(isFormValid => {
        if (isFormValid) {
          this.$axios.$post(`/Events`, {
            pic: this.pic,
            phone: this.phone,
            email: this.email,
            title: this.title,
            description: this.description,
            type: this.type,
            numberOfAttendees: this.numberOfAttendees,
            isPaid: this.isPaid,
            isUsingTable: this.isUsingTable,
            isProvidingFood: this.isProvidingFood,
            // WIP
            numberOfAttendees: 10,
            startDateTime: Date.now(),
            endDateTime: Date.now()
          }).then(result => {
            this.$router.push({
              name: 'events-thanks',
              query: {
                name: this.pic,
                email: this.email,
              }
            }).catch(err => {
              console.log('error when create event : ', err)
            })
          })
        }
      })
    },
    allowedDates(val) {
      return parseInt(val.split('-')[2], 10) % 2 === 0
    },
    fetchRoomType() {
      this.$axios.$get('/RoomTypes').then(roomTypes => {
        this.roomTypeOption = roomTypes
      }).catch(err => {
        console.log('error when trying to get room types : ', err)
      })
    },
    submitOrganizationForm() {
      this.$refs.newOrganizationForm.submit()
    },
    handleOrganizationFormAfterSubmit() {
      const newOrganizationId = this.$refs.newOrganizationForm.organizationId

      if (newOrganizationId) {
        this.organizationId = newOrganizationId
        this.nextStep()
      }

      this.isLoading = false
    },
    chooseFirstTime(val) {
      this.isOrganizationOptionChoosed = true
      this.isFristTime = val
    },
    nextStep() {
      this.step = this.step + 1
    }
  },
  components: {
    TermCondition,
    NewOrganizationForm,
  },
  computed: {
    whenTheEventEnd() {
      return 0;
    },
  }
}
</script>
<style scoped>
.full {
  width: 35vw;
}
</style>

