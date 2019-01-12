<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm8 md8>

      <h3 class="headline text-xs-center">Laporan Acara Per Bulan</h3>
      
      <h4>Silahkan pilih bulan dan tahun</h4>
       <v-select
          :items="months"
          v-model="selectedMonth"
          label="bulan"
        ></v-select>
       <v-select
          :items="years"
          v-model="selectedYear"
          label="tahun"
        ></v-select>

      <v-data-table
        :headers="headers"
        :items="events"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item | eventDate }}</td>
          <td class="text-xs-right">{{ props.item.participants.length }}</td>
          <td class="text-xs-right">{{ props.item | participans('new') }}</td>
          <td class="text-xs-right">{{ props.item | participans('old') }}</td>
          <td class="text-xs-right">{{ props.item.participants | developerCount }}</td>
          <td class="text-xs-right">
            <v-btn @click="goToDetail(props.item.id)">Detail</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      events: [],
      headers: [
        { text: 'Acara', value: 'title' },
        { text: 'Tanggal', value: 'date' },
        { text: 'Jumlah partisipan', value: 'partcipants' },
        { text: 'Partisipan Baru', value: 'newPartcipants' },
        { text: 'Partisipan Lama', value: 'existingPartcipants' },
        { text: 'Developer', value: 'developer' },
        { text: 'Aksi', value: 'action' },
      ],
      selectedMonth: null,
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      selectedYear: null,
      years: [2017, 2018, 2019, 2020, 2021],
    }
  },
  mounted() {
    let dateObj = dayjs();
    this.selectedYear = dateObj.year();
    this.selectedMonth = this.months[dateObj.month()];

    this.fetchEvents(dateObj.month(), dateObj.year());
  },
  methods: {
    fetchEvents(month, year) {
      const date = dayjs(new Date(year, month))

      const from = date.startOf('month').toJSON()
      const to = date.endOf('month').toJSON();

      this.$axios.$get(`/Events?filter[include]=participants&filter[where][and][0][createdAt][gt]=${from}&filter[where][and][1][createdAt][lt]=${to}`).then(events => {
        if (events) {
          this.events = events;
        }
      }).catch(err => {
        console.log('error when : ', err)
      })
    },
    goToDetail(id) {
      this.$router.push({
        name: 'admin-events-id',
        params: {
          id,
        }
      })
    },
    goToWelcomeEvent(id) {
      this.$router.push({
        name: 'admin-events-id-welcome',
        params: {
          id,
        }
      })
    }
  },
  watch: {
    selectedMonth(newVal) {
      this.fetchEvents(this.months.indexOf(newVal), this.selectedYear);
    },
    selectedYear(newVal) {
      this.fetchEvents(this.months.indexOf(newVal), this.selectedYear);
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
    },
    eventDate(event)  {
      return dayjs(event.startDateTime).format('DD/MM/YYYY')
    }
  }
}
</script>
