<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12>
      <v-card-title>
        <h2 class="title">{{ title }}</h2>
        <v-spacer/>
        <v-text-field
          append-icon="search"
          label="Cari berdasarkan nama..."
          single-line
          hide-details
          v-model="searchKeyword"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :pagination.sync="pagination"
        :total-items="totalItems"
        :loading="loading"
        :search="searchKeyword"
        :items="items"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.phone }}</td>
          <td> <v-icon v-if="props.item.isDeveloper">check</v-icon></td>
          <td>{{ props.item | date }}</td>
          <td>
            <v-btn color="primary" :disabled="true">Lihat</v-btn>
          </td>
        </template>
        <template slot="footer" v-if="report">
          <td colspan="100%">
            <span class="my-2"> Jumlah peserta </span>
              <strong>{{ this.report.total }}</strong>,
              terdiri dari : <strong>{{ this.report.developer }} Developer</strong>
              dan ada <strong>{{ this.report.new }} peserta baru </strong>
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" 
                      :length="pages" 
                      @next="fetchItems(pagination.page, searchKeyword)" 
                      @previous="fetchItems(pagination.page, searchKeyword)" 
                      @input="fetchItems(pagination.page, searchKeyword)"/>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex';
import qs from 'qs'
import dayjs from 'dayjs'

export default {
  props: {
    title: String,
    eventId: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      searchKeyword: '',
      totalItems: 0,
      loading: true,
      pagination: {
        rowPerPage: 10,
        page: 1,
      },
      items: [],
      headers: [
        { text: 'Nama', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Developer', value: 'isDeveloper' },
        { text: 'Tanggal', value: 'date' },
        { text: 'Aksi', value: '' },
      ],
      report: null,
    };
  },
  created() {
    this.fetchItems(1);
    this.fetchTotalItems();
    this.fetchReport();
  },
  methods: {
    ...mapActions(['notify']),
    fetchItems(page = 1, keyword = '') {
      const skip = (this.pagination.page - 1) * this.pagination.rowPerPage;
      const limit = this.pagination.rowPerPage;

      this.loading = true;

      const params = {
        filter: {
          limit,
          skip,
          where: {
            name: {
              like: keyword,
              options: 'i',
            },
          },
          order: 'createdAt DESC'
        }
      }

      this.$axios
        .$get(`/Events/${this.eventId}/participants?${qs.stringify(params)}`)
        .then(response => {
          this.loading = false;
          this.items = response;
        })
        .catch(err => {
          this.notify({ type: 'error', message: err.message });
        });
    },
    fetchTotalItems() {
      this.$axios.$get(`/Events/${this.eventId}/participants/count`).then(response => {
        this.totalItems = response.count;
      })
    },
    fetchReport() {
      this.$axios.$get(`/Events/report?eventId=${this.eventId}`).then(report => {
        this.report = report;
      })
    }
  },
  computed: {
    pages() {
      if (this.pagination.rowPerPage == null || this.pagination.totalItems == null) {
        return 0;
      }

      return Math.ceil(this.totalItems / this.pagination.rowPerPage);
    },
  },
  filters: {
    date(participant)  {
      return dayjs(participant.createdAt).format('DD/MM/YYYY')
    }
  },
  watch: {
    searchKeyword(keyword) {
      this.fetchItems(1, keyword);
    },
  },
};
</script>
