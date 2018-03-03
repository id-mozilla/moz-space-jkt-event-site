<template>
  <v-layout row justify-center align-center>
    <v-flex xs12 sm8 md8>

      <h3 class="headline text-xs-center">Absensi daftar hadir peserta</h3>
      <h4 class="title text-xs-center mt-3 orange--text" v-if="event">{{ event.title }}</h4>

      <form class="full pa-4">
        <v-text-field
          v-model="name"
          label="Nama kamu"
          :error-messages="errors.collect('name')"
          v-validate="'required'"
          data-vv-name="name"
          required
        ></v-text-field>
        <v-select
          v-bind:items="occupationOptions"
          v-model="occupation"
          label="Kesibukan sehari-hari"
          :error-messages="errors.collect('occupation')"
          v-validate="'required'"
          data-vv-name="occupation"
          required
        ></v-select>
        <v-text-field
          v-model="email"
          label="Email kamu"
          :error-messages="errors.collect('email')"
          v-validate="'required|email'"
          data-vv-name="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="phone"
          label="Nomor ponsel / WA kamu"
          :error-messages="errors.collect('phone')"
          v-validate="'required'"
          data-vv-name="phone"
          required
        ></v-text-field>
        <v-select
          v-bind:items="genderOptions"
          v-model="gender"
          label="Jenis kelamin"
          :error-messages="errors.collect('gender')"
          v-validate="'required'"
          data-vv-name="gender"
          required
        ></v-select>
        <v-btn block @click="submit" color="primary" class="mt-3">Saya Hadir</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      event: {},
      name: '',
      occupation: '',
      occupationOptions: [
        'Berkerja',
        'Kuliah',
        'Pelajar',
        'Lainnya'
      ],
      gender: '',
      genderOptions: [
        'Laki-laki',
        'Perempuan'
      ],
      email: '',
      phone: '',
      yearOfBirth: 0,
      dictionary: {
        custom: {
          name: {
            required: 'Nama harus diisi ya, ingat tak kenal maka tak sayang :D'
          },
          occupation: {
            required: 'Sekarang lagi sibuk apa ya sehari-hari ?'
          },
          gender: {
            required: 'Mbak-mbak atau Mas-mas ya ?'
          },
          email: {
            required: 'Kami butuh email kamu supaya kalo ada acara bagus kami bisa kasih tahu',
            email: 'Emailnya belum valid, Kak'
          },
          phone: {
            required: 'Kami bisa kasih tahu kalo ada kegiatan menarik'
          }
        }
      }
    }
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(isFormValid => {
        if (isFormValid) {
         this.$axios.$post(`/Events/${this.$route.params.id}/participants`, {
           name: this.name,
           occupation: this.occupation,
           gender: this.gender,
           email: this.email,
           phone: this.phone,
           yearOfBirth: this.yearOfBirth,
         }).then(result => {
           console.log('result : ', result)
           this.clearForm()
         }).catch(err => {
           console.log('error when trying to post participant', err)
         })
        }
      })
    },
    clearForm(){
      this.name = ''
      this.email = ''
      this.phone = ''
      this.gender = ''
      this.occupation = ''
    },
    fetchEventInformation(id) {
      this.$axios.$get(`/Events/${id}`).then(event => {
        this.event = event
      }).catch(err => {
        console.log('error when trying to get event detail information : ', err)
      })
    }
  },
  created() {
    this.fetchEventInformation(this.$route.params.id)
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  }
}
</script>
