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
          v-bind:items="eventTypeOptions"
          v-model="type"
          label="Tipe acara"
          :error-messages="errors.collect('type')"
          v-validate="'required'"
          data-vv-name="type"
          required
        ></v-select>
        <v-text-field
          name="input-7-1"
          label="Deskripis acara"
          v-model="description"
          :error-messages="errors.collect('description')"
          v-validate="'required'"
          data-vv-name="description"
          multi-line
        ></v-text-field>
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
import db from '@/configs/firebase-setup'

export default {
  $validates: true,
  name: 'CreateEvent',
  data () {
    return {
      pic: '',
      email: '',
      type: null,
      eventTypeOptions: [
        'Developer Event',
        'Non-Developer Event',
      ],
      checkbox: null,
      description: '',
    }
  },
  methods: {
    submit () {
      if (this.$validator.validateAll()) {
        db.collection('events').add({
          pic: this.pic,
          description: this.description,
          email: this.email,
        }).then(docRef => {
          console.log('new docRef : ', docRef.id);
          this.$router.push({
            path: '/events/thanks',
            query: {
              name: this.pic,
              email: this.email,
            }
          })
        }).catch(err => {
          console.log('error when create event : ', err)
        })
      }
    },
    clear () {
      this.pic = ''
      this.email = ''
      this.type = null
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

