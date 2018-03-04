<template>
  <div>
    <v-select
      label="Masukan Nama Kamu"
      autocomplete
      :loading="loading"
      cache-items
      required
      :items="participants"
      :search-input.sync="search"
      v-model="participant"
      item-value="id"
      item-text="name"
      return-object
    ></v-select>
    <participant-detail 
      :participant="participant" 
      v-if="isParticipanSelected">
    </participant-detail>
    <v-btn large 
      block
       @click="submit" 
       color="primary" 
       class="mt-3" 
       v-if="isParticipanSelected">Ya, Saya Hadir</v-btn>
  </div>
  
</template>
<script>
import ParticipantDetail from '~/components/ListOfAttendees/ParticipantDetail'
export default {
  name: 'ExistingAttendeesForm',
  data() {
    return {
      participants: [],
      participant: {},
      loading: false,
      search: null,
    }
  },
  methods: {
    searchParticipant(name) {
      this.loading = true
      this.$axios.$get(`/Participants?filter[where][name][like]=${name}`).then(participants => {
        this.participants = participants
        this.loading = false
      }).catch(err => {
        console.log('error when trying to get part')
        this.loading = false
      })
    },
    submit() {
      console.log('submited')
    }
  },
  computed: {
    isParticipanSelected() {
      return Object.keys(this.participant).length > 0
    }
  },
  watch: {
    search(name) {
      name && this.searchParticipant(name)
    }
  },
  components: {
    ParticipantDetail,
  }
}
</script>

