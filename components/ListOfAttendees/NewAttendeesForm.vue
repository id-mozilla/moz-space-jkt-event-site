<template>
  <form class="full">
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
    <h4>Apakah kamu seorang developer / programmer ?</h4>
    <v-radio-group v-model="isDeveloper" :mandatory="false">
      <v-radio label="Ya" value="true"></v-radio>
      <v-radio label="Tidak" value="false"></v-radio>
    </v-radio-group>
    <v-btn large block @click="submit" color="primary" class="mt-3">Saya Hadir</v-btn>
    <v-btn outline @click="fillExistingAttendeesForm()" class="mt-2">
       Sepertinya sudah pernah isi. 
    </v-btn>
  </form>
</template>
<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      name: '',
      occupation: '',
      occupationOptions: [
        'Bekerja',
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
      isDeveloper: true,
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
           isDeveloper: this.isDeveloper,
         }).then(result => {
           console.log('result : ', result)
           this.$emit('success')
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
      this.$nextTick(() => this.$validator.reset())
    },
    fillExistingAttendeesForm() {
      this.$emit("changeSecondTime");
    },
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  }
}
</script>
