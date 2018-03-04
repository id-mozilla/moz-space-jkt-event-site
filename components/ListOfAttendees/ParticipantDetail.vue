<template>
  <div>
    <h2 class="body-2 text-xs-center pb-2">Apakah informasi dibawah ini benar ?</h2>
    <h4 class="caption">email</h4>
    <h3 class="subheading">{{ participant.email }}</h3>
    <h4 class="caption">nomor telephone</h4>
    <h3 class="subheading">{{ participant.phone }}</h3>

  </div>
</template>
<script>
export default {
  name: 'ParticipantDetail',
  props: ['participant'],
}
</script>
