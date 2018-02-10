<template>
  <div>
    <event-preview slug="moz-belajar-css-grid" title="#MozBelajar CSS Grid" organization="Mozilla Indonesia" description="Anggap aja ini description dulu ya" />
  </div>  
</template>

<script>
import EventPreview from '@/components/Events/EventPreview';

export default {
  name: 'EventList',
  components: {
    EventPreview,
  },
}
</script>
