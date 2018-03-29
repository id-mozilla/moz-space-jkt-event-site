<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm8 md8>

      <h3 class="headline text-xs-center">Seluruh Acara</h3>

      <v-data-table
        :headers="headers"
        :items="events"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.participants.length }}</td>
          <td class="text-xs-right">{{ props.item | participans('new') }}</td>
          <td class="text-xs-right">{{ props.item | participans('old') }}</td>
          <td class="text-xs-right">{{ props.item.participants | developerCount }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      events: [],
      headers: [
        { text: 'Acara', value: 'title' },
        { text: 'Jumlah partisipan', value: 'partcipants' },
        { text: 'Partisipan Baru', value: 'newPartcipants' },
        { text: 'Partisipan Lama', value: 'existingPartcipants' },
        { text: 'Developer', value: 'developer' },
      ],
    }
  },
  mounted() {
    this.fetchEvents()
  },
  methods: {
    fetchEvents() {
      this.$axios.$get('/Events?filter[include]=participants').then(events => {
        if (events) {
          this.events = events;
        }
      }).catch(err => {
        console.log('error when : ', err)
      })
    },
  },
  filters: {
    participans(evn, type) {
      const event = JSON.parse(JSON.stringify(evn))
      const eventStartDateTime = new Date(event.startDateTime)
      const operator = type === 'new' ? '>' : '<';

      var operators = {
        '>': function(a, b) { return a > b },
        '<': function(a, b) { return a < b },
      };

      if (event && event.participants) {
        const newPartcipants = event.participants.filter(participant => {
          const participantJoined = new Date(participant.createdAt)
          return operators[operator](eventStartDateTime.getTime(), participantJoined.getTime())
        }).length;

        return event.participants.length - newPartcipants; 
      }

      return 0;
    },
    developerCount(partcipants) {
      return partcipants.filter(participant => participant.isDeveloper).length;
    } 
  }
}
</script>
