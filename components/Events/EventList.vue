<template>
  <div>
    <event-preview v-for="event in events"
      :key="event.id"
      :id="event.id"
      :slug="event.slug"
      :title="event.title"
      :organization="event.organization"
      :description="event.description"
      :registrationLink="event.registrationLink"/>
  </div>
</template>

<script>
import EventPreview from '@/components/Events/EventPreview';

export default {
  name: 'EventList',
  components: {
    EventPreview,
  },
  props: {
    events: {
      type: Array,
      required: false,
    }
  }
}
</script>
