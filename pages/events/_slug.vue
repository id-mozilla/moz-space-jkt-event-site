<template>
  <event-detail :id="event.id" 
      :slug="event.slug" 
      :title="event.title" 
      :organization="event.organization" 
      :description="event.description" />
</template>

<script>
import EventDetail from '@/components/Events/EventDetail';
import qs from 'qs';

export default {
  auth: false,
  asyncData({ $axios, params }) {
    return new Promise((resolve, reject) => {
      const filters = {
        filter: {
          where: {
            slug: params.slug
          },
          limit: 1,
          include: ['eventType', 'organization']
        }
      }

      $axios.$get(`/Events?${qs.stringify(filters)}`).then(res => {
        resolve({
          event: res[0],
        })
      })
    }).then(data => {
      return data;
    }).catch(err => {
      context.error(err);
    })
  },
  data() {
    return {
      event: {}
    }
  },
  components: {
    EventDetail,
  }
}
</script>
