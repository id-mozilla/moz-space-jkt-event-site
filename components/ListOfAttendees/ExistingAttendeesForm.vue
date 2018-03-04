<template>
  <v-select
    label="Masukan Nama Kamu"
    autocomplete
    :loading="loading"
    multiple
    cache-items
    chips
    required
    :items="participants"
    :search-input.sync="search"
    v-model="participant"
  ></v-select>
</template>
<script>
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
    searchParticipant() {
      console.log('afjsfajsf')
    }
  }
}
</script>

