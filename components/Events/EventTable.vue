<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12>
      <v-card-title>
        <h2 class="title">{{ title }}</h2>
        <v-spacer/>
        <v-text-field
          append-icon="search"
          label="Cari..."
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
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.startDateTime }}</td>
          <td>{{ props.item.timeStart }}</td>
          <td>
            <v-btn color="primary" @click="goToEventDetail(props.item)">Lihat</v-btn>
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
import { mapState, mapActions } from 'vuex';
import qs from 'qs';

export default {
  props: {
    title: String,
    confirmed: {
      type: Boolean,
      required: false,
      default() {
        return true;
      },
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
        { text: 'Judul Acara', value: 'title' },
        { text: 'Tanggal', value: 'startDateTime' },
        { text: 'Waktu', value: 'timeStart' },
        { text: 'Aksi', value: '' },
      ],
    };
  },
  created() {
    this.fetchItems(1);
    this.fetchTotalItems();
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
            title: {
              like: keyword,
              options: 'i',
            },
            confirmed: this.confirmed,
          }
        }
      }

      this.$axios
        .$get(`/Events?${qs.stringify(params)}`)
        .then(response => {
          this.loading = false;
          this.items = response;
        })
        .catch(err => {
          this.notify({ type: 'error', message: err.message });
        });
    },
    fetchTotalItems() {
      this.$axios.$get('/Events/count').then(response => {
        this.totalItems = response.count;
      })
    },
    goToEventDetail(event) {
      this.$router.push({
        name: 'admin-events-id',
        params: {
          id: event.id,
        },
      })
    }
  },
  computed: {
    ...mapState(['token']),
    pages() {
      if (this.pagination.rowPerPage == null || this.pagination.totalItems == null) {
        return 0;
      }

      return Math.ceil(this.totalItems / this.pagination.rowPerPage);
    },
  },
  watch: {
    searchKeyword(keyword) {
      this.fetchItems(1, keyword);
    },
  },
};
</script>
