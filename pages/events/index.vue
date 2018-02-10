<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h2 class="ma-4">Kegiatan Mozilla Indonesia Mendatang</h2>
      <event-preview slug="moz-belajar-css-grid" title="MozBelajar CSS Grid" organization="Mozilla Indonesia" description="Anggap aja ini description dulu ya" />
      <event-preview slug="moz-belajar-css-grid" title="MozBelajar CSS Grid" organization="Mozilla Indonesia" description="Anggap aja ini description dulu ya" />
    </v-flex>
  </v-layout>
</template>

<script>
import EventPreview from '~/components/Events/EventPreview';

export default {
  components: {
    EventPreview,
  }
  
}
</script>
