import Vue from 'vue'
import { VueEditor } from 'vue2-editor'

window.onNuxtReady(() => {
  Vue.component('vue-editor', VueEditor)
  // Vue.use(VueEditor);
})
