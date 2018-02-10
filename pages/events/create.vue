<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm6 md6>
      <form class="full">
        <h2 class="ma-3 text-xs-center">Selanggarakan acara mu di MozSpaceJKT</h2>
        <v-text-field
          v-model="pic"
          label="Atas Nama Penanggung Jawab"
          :counter="10"
          :error-messages="errors.collect('pic')"
          v-validate="'required'"
          data-vv-name="pic"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          :error-messages="errors.collect('email')"
          v-validate="'required|email'"
          data-vv-name="email"
          required
        ></v-text-field>
        <v-select
          v-bind:items="items"
          v-model="select"
          label="Tipe acara"
          :error-messages="errors.collect('select')"
          v-validate="'required'"
          data-vv-name="select"
          required
        ></v-select>
        <v-checkbox
          v-model="checkbox"
          value="1"
          label="Saya sudah membaca dan menyetujui perjajian"
          :error-messages="errors.collect('checkbox')"
          v-validate="'required'"
          data-vv-name="checkbox"
          type="checkbox"
          required
        ></v-checkbox>
        <v-btn @click="submit" color="primary">Kirim</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  $validates: true,
  data () {
    return {
      name: '',
      email: '',
      select: null,
      items: [
        'Developer Event',
        'Non-Developer Event',
      ],
      checkbox: null
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$validator.reset()
    }
  }
}
</script>
<style scoped>
.full {
  width: 35vw;
}
</style>

