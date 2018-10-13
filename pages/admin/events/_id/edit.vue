<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm8 md8>
      <h1 class="headline my-2">Edit event ini</h1>
      <form>
        <v-text-field
          v-model="title"
          label="Judul Acara"
          :error-messages="errors.collect('title')"
          v-validate="'required'"
          data-vv-name="title"
          required
        ></v-text-field>
        <v-text-field
          v-model="slug"
          label="Slug"
          :error-messages="errors.collect('slug')"
          v-validate="'required'"
          data-vv-name="slug"
          required
        ></v-text-field>
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
        <v-select
          v-bind:items="[1, 2, 3, 4, 5, 6, 7, 8]"
          v-model="duration"
          label="Durasi acara dalam hitungan jam"
          :error-messages="errors.collect('duration')"
          v-validate="'required'"
          data-vv-name="duration"
          required
        ></v-select>
        <v-btn @click="submit" color="primary">Edit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  asyncData({ $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.$get(`/Events/${params.id}?filter[include]=organization&filter[include]=roomType&filter[include]=eventType`).then(res => {
        resolve({ title: res.title,
          description: res.description,
          numberOfAttendees: res.numberOfAttendees,
          isPaid: res.isPaid,
          isProvidingFood: res.isProvidingFood,
          isUsingTable: res.isUsingTable,
          eventType: res.eventType || {},
          roomType: res.roomType || {},
          duration: res.duration,
          isPrivate: res.isPrivate,
          slug: res.slug,
        })
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
      title: '',
      roomTypeOptions: [],
      eventTypeOptions: [],
      eventType: {},
      roomType: {},
      description: '',
      numberOfAttendees: 0,
      isPaid: false,
      isPrivate: false,
      isProvidingFood: false,
      isUsingTable: false,
      duration: 0,
      slug: '',
    }
  },
  created() {
    this.fetchRoomType();
    this.fetchEventType();
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(isFormValid => {
        const eventId = this.$route.params.id;
        if (isFormValid) {
          this.$axios.$patch(`/Events/${eventId}`, {
            title: this.title,
            description: this.description,
            eventType: this.eventType.id,
            numberOfAttendees: this.numberOfAttendees,
            eventTypeId: this.eventType.id,
            roomTypeId: this.roomType.id,
            isPaid: this.isPaid,
            isProvidingFood: this.isProvidingFood,
            isUsingTable: this.isUsingTable,
            isPrivate: this.isPrivate,
            duration: this.duration,
          }).then(res => {
            this.$router.push({ name: 'admin-events-id', params: {
              id: eventId,
            }})
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
