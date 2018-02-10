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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="goToHomepage()" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; Mozilla Indonesia - 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        items: [
          { icon: 'apps', title: 'Beranda', to: '/' },
          { icon: 'bubble_chart', title: 'Buat Acara', to: '/events/create' },
          { icon: 'bubble_chart', title: 'Events', to: '/events' },
          { icon: 'bubble_chart', title: 'Kalender', to: '/inspire' },
          { icon: 'bubble_chart', title: 'Login', to: '/login' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Mozilla Community Space Jakarta'
      }
    },
    methods: {
      goToHomepage() {
        console.log('lalalal');
      }
    }
  }
</script>
