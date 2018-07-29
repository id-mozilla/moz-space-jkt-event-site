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
          v-for="(item, i) in menus"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isLoggedIn" 
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
        <v-list-tile v-if="isLoggedIn"
          router
          v-for="(menu, index) in loggedInMenu" 
          :key="index" 
          :to="menu.to"
          exact>
          <v-list-tile-action>
            <v-icon v-html="menu.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-html="menu.title"> </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLoggedIn" @click="handleLogout" exact>
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
        menus: [
          { icon: 'home', title: 'Beranda', to: '/' },
          { icon: 'add', title: 'Buat Acara', to: '/events/create' },
          { icon: 'view_agenda', title: 'Events', to: '/events' },
        ],
        loggedInMenu: [
          { icon: 'dashboard', title: 'Dashboard', to: '/admin' },
          { icon: 'assessment', title: 'Event Report', to: '/admin/events/reports'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Mozilla Community Space Jakarta'
      }
    },
    computed: {
      ...mapState(['notification']),
      snackbarMessage: {
        get() {
          return this.notification.active
        },
        set(val) {
          this.notificationToggle()
        }
      },
      isLoggedIn() {
        return this.$auth.loggedIn;
      },
      isAdmin() {
        return this.$auth.hasScope('admin');
      },
    },
    methods: {
      handleLogout() {
        this.$auth.logout().then(res => {
          this.goToHomepage();
        })
      },
      notificationToggle() {
        this.$store.dispatch('notify', { type: 'error', message: ''})
      },
      goToHomepage() {
        this.$router.push({
          name: 'index',
        });
      },
    }
  }
</script>
