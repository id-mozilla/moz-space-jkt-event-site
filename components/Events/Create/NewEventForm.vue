<template>
  <form class="">
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
        :error-messages="errors.collect('date')"
        v-validate="'required'"
        data-vv-name="date"
        required
        readonly
      ></v-text-field>
      <v-date-picker v-model="date" no-title scrollable :min="minimumAllowedDates">
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
        :error-messages="errors.collect('startTime')"
        v-validate="'required'"
        data-vv-name="startTime"
        required
        readonly
      ></v-text-field>
      <v-time-picker v-model="startTime" @change="$refs.menu.save(startTime)" format="24hr"></v-time-picker>
    </v-menu>
    <v-select
      v-bind:items="[1, 2, 3, 4, 5, 6, 7, 8]"
      v-model="duration"
      label="Durasi acara dalam hitungan jam"
      :error-messages="errors.collect('duration')"
      v-validate="'required'"
      data-vv-name="duration"
      required
    ></v-select>
    <v-select
      v-bind:items="eventTypeOptions"
      v-model="eventType"
      label="Jenis acara"
      v-validate="'required'"
      :error-messages="errors.collect('eventType')"
      data-vv-name="eventType"
      item-text="name"
      item-value="id"
      return-object
      required
    ></v-select>
    <v-select
      v-bind:items="roomTypeOptions"
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
    <h4>Centang checklist berikut sesuai acara mu :</h4>
    <span >tidak perlu di centang jika tidak sesuai</span>
    <v-checkbox
      class="mt-2"
      v-model="isUsingTable"
      label="Acara ini memerlukan meja"
      color="orange"
      hide-details
    ></v-checkbox>
    <v-checkbox
      v-model="isPaid"
      label="Ini adalah acara berbayar"
      color="orange"
      hide-details
    ></v-checkbox>
    <v-checkbox
      v-model="isProvidingFood"
      label="Menyediakan makanan untuk peserta"
      color="orange"
      hide-details
    ></v-checkbox>
    <v-checkbox
      v-model="isPrivate"
      label="Apakah acara ini TIDAK terbuka untuk umum (private) ?"
      color="orange"
      hide-details
    ></v-checkbox>
    <v-text-field
      class="mt-3"
      label="Estimasi jumlah peserta"
      v-model="numberOfAttendees"
      :error-messages="errors.collect('numberOfAttendees')"
      v-validate="'numeric|required|min_value:1'"
      type="number"
      data-vv-name="numberOfAttendees"
    ></v-text-field>
    <v-checkbox
      v-model="agreeTermAndCondition"
      value="true"
      label="Saya sudah membaca dan menyetujui perjajian"
      :error-messages="errors.collect('agreeTermAndCondition')"
      v-validate="'required'"
      data-vv-name="agreeTermAndCondition"
      type="checkbox"
      required
    ></v-checkbox>
  </form>
</template>
<script>
import dayjs from 'dayjs'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    organization: {
      required: true,
      type: Object,
    }
  },
  data () {
    return {
      title: '',
      description: '',
      date: null,
      dateMenu: false,
      timeMenu: false,
      startTime: null,
      duration: null,
      roomTypeOptions: [],
      eventTypeOptions: [],
      eventType: {},
      roomType: {},
      numberOfAttendees: 0,
      agreeTermAndCondition: null,
      isPaid: false,
      isProvidingFood: false,
      isPrivate: false,
      isUsingTable: false,
    }
  },
  created() {
    this.fetchRoomType()
    this.fetchEventType()
  },
  computed: {
    startDateTime() {
      const [hour, minute] = this.startTime.split(':')
      const [year, month, day] = this.date.split('-')

      return dayjs(new Date(year, month - 1, day, hour, minute)).toISOString()
    },
    endDateTime() {
      const startDateTime = this.startDateTime

      return dayjs(startDateTime).add(this.duration, 'hour').toISOString()
    },
    minimumAllowedDates() {
      return dayjs().add(1, 'day').format('YYYY-MM-DD');
    }
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(isFormValid => {
        if (isFormValid) {
          this.$emit('startLoading')

          this.$axios.$post('/Events', {
            organizationId: this.organization.id,
            eventTypeId: this.eventType.id,
            roomTypeId: this.roomType.id,
            title: this.title,
            description: this.description,
            numberOfAttendees: this.numberOfAttendees,
            isPaid: this.isPaid,
            isUsingTable: this.isUsingTable,
            isProvidingFood: this.isProvidingFood,
            isPrivate: this.isPrivate,
            numberOfAttendees: this.numberOfAttendees,
            startDateTime: this.startDateTime, 
            duration: this.duration,
            endDateTime: this.endDateTime,
            confirmed: false,
          }).then(res => {
            this.$emit('newEventCreated')
          }).catch(err => {
            console.log('err : ', err)
            this.$store.dispatch('notify', { type: 'error', message: err.message })
          })
        }
      })
    },
    fetchRoomType() {
      this.$axios.$get('/RoomTypes').then(roomTypes => {
        this.roomTypeOptions = roomTypes
      }).catch(err => {
        this.$store.dispatch('notify', { type: 'error', message: err.message })
      })
    },
    fetchEventType() {
      this.$axios.$get('/EventTypes').then(eventTypes => {
        this.eventTypeOptions = eventTypes
      }).catch(err => {
        this.$store.dispatch('notify', { type: 'error', message: err.message })
      })
    },
  },
}
</script>
