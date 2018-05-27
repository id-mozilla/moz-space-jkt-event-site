<template>
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
      v-model="eventType"
      label="Jenis acara"
      :error-messages="errors.collect('eventType')"
      v-validate="'required'"
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
    <v-text-field
      label="Estimasi jumlah peserta"
      v-model="numberOfAttendees"
      :error-messages="errors.collect('numberOfAttendees')"
      v-validate="'numeric|required'"
      type="number"
      data-vv-name="numberOfAttendees"
    ></v-text-field>
    <v-checkbox
      v-model="agreeTermAndCondition"
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
      roomTypeOptions: [],
      eventTypeOptions: [],
      eventType: {},
      roomType: {},
      numberOfAttendees: 0,
      agreeTermAndCondition: false,
      isPaid: false,
      isProvidingFood: false,
      isUsingTable: false,
    }
  },
  created() {
    this.fetchRoomType()
    this.fetchEventType()
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(isFormValid => {
        if (isFormValid) {
          this.$emit('startLoading')
          this.$axios.$post('/Events', {
            organizationId: this.organization.id,
            eventTypeId: this.eventType.id,
            title: this.title,
            description: this.description,
            numberOfAttendees: this.numberOfAttendees,
            isPaid: this.isPaid,
            isUsingTable: this.isUsingTable,
            isProvidingFood: this.isProvidingFood,
            numberOfAttendees: 10,
            startDateTime: Date.now(),
            endDateTime: Date.now()
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
  }
}
</script>
