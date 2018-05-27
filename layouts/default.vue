<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isLogedIn" 
                     router 
                     :to="'/login'" 
                     exact>
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Masuk
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLogedIn" @click="goToDashboard" exact>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Dashboard
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLogedIn" @click="logout" exact>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Keluar
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="goToHomepage()" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-snackbar
      :color="notification.color"
      multi-line
      v-model="snackbarMessage"
    >{{ notification.message }}
      <v-btn dark flat @click="notificationToggle">Close</v-btn>
    </v-snackbar>
    <v-footer app>
      <span>&copy; Mozilla Indonesia - 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        drawer: false,
        items: [
          { icon: 'apps', title: 'Beranda', to: '/' },
          { icon: 'bubble_chart', title: 'Buat Acara', to: '/events/create' },
          { icon: 'bubble_chart', title: 'Events', to: '/events' },
          { icon: 'bubble_chart', title: 'Kalender', to: '/inspire' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Mozilla Community Space Jakarta'
      }
    },
    computed: {
      ...mapState(['notification']),
      ...mapGetters(['isLogedIn']),
      snackbarMessage: {
        get() {
          return this.notification.active
        },
        set(val) {
          this.notificationToggle()
        }
      }
    },
    methods: {
      ...mapActions(['logout']),
      handleLogout() {
        this.logout();
        this.goToHomepage();
      },
      notificationToggle() {
        this.$store.dispatch('notify', { type: 'error', message: ''})
      },
      goToHomepage() {
        this.$router.push({
          name: 'index',
        });
      },
      goToDashboard() {
        this.$router.push({
          name: 'admin'
        })
      }
    }
  }
</script>
