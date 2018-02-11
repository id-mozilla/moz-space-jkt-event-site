<template>
  <event-detail :id="event.id" 
      :slug="event.slug" 
      :title="event.title" 
      :organization="event.organization" 
      :description="event.description" />
</template>

<script>
import EventDetail from '@/components/Events/EventDetail';

export default {
  asyncData(context, cb) {
    setTimeout(() => {
      cb(null, {
        event: {
          id: 'as323131af',
          title: "#MozBelajar CSS Grid",
          slug: "moz-belajar-css-grid",
          organization: "Mozilla Indonesia",
          description: "Anggap aja ini description dulu ya",
        }
      })
    }, 1500)
  },
  components: {
    EventDetail,
  }
}
</script>
