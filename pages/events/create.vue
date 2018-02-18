<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md8>
      <h2 class="ma-3 text-xs-center">Selanggarakan acara mu di MozSpaceJKT</h2>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="e1 > 1">Membaca Ketentuan </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="e1 > 2">Pastikan Jadwal Tersedia</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Isi Formulir</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <p>Mohon mengisi form ini untuk melakukan reservasi perencanaan anda dalam menyelenggarakan acara di Mozilla Community Space Jakarta. Kami meminta anda untuk mengajukan permohonan paling lambat 2 minggu sebelum acara berlangsung.</p>
            <h4>Fasilitas</h4>
            <p>Alamat : Gedung Tifa, Annex Suite <br>
                Jl. Kuningan Barat I No.26 <br>
                Mampang Prapatan - Jakarta 12710Kapasitas : 40 orang (Event Room), 10 orang (Meeting Room) <br>
                Free WiFi Internet 100Mbps <br>
                Penggunaan ruang adalah gratis alias tanpa biaya. <br>
                Untuk perlengkapan makan, kami menyediakan gelas plastik, sendok - garpu plastik, piring dan mangkok plastik sekali pakai yang dapat digunakan oleh peserta.</p>
            <h4>Ketentuan</h4>
            <ol>
              <li>Kami memprioritaskan kegiatan komunitas Web Developer, terutama yang bersifat Open Source, atau yang sejalan dengan misi dan manifesto dari Mozilla. Selengkapnya https://www.mozilla.org/en-US/about/manifesto/</li>
              <li>Kami membuka tempat kami sebagai basecamp atau markas, untuk kegiatan internal, meeting, talk & sharing, bagi komunitas-komunitas yang sejalan dengan visi misi dari Mozilla.</li>
              <li>Kami tidak menerima permintaan penyelenggaraan kegiatan yang bersifat komersial, politik, atau SARA.</li>
              <li>MozSpaceJKT hanya buka sampai 21.00 WIB. Bila ada perubahan atau penambahan waktu, mohon segera dikonfirmasikan kepada kami :)</li>
              <li>Kami menyediakan berbagai macam minuman panas, dingin, dan dispenser, serta berbagai macam makanan ringan yang dapat dikonsumsi oleh peserta acara secara free flow dan gratis, karena merupakan bagian dari pelayanan MozSpaceJKT, namun kami tidak menyediakan makanan berat.</li>
              <li>Dimohon untuk ikut memperhatikan kebersihan ruangan dan membuang sampah pada tempatnya.</li>
            </ol>
            <p>
              Akun twitter kami @ID_Mozilla, akun instagram @mozillaindonesia dan Facebook page kami: https://www.facebook.com/MozillaIndonesia/ <br>

              Mozilla Community Space didukung secara langsung oleh Mozilla Foundation, sebuah yayasan global non-profit yang mendukung agar internet tetap terbuka untuk semua orang dan mengedepankan inovasi internet untuk masa depan.
            </p>
            <div class="text-xs-right">
              <v-btn large color="secondary" @click.native="e1 = 2">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
              <v-date-picker
                class="mt-3"
                v-model="date"
                min="2016-06-15"
                max="2018-03-20"
                :allowed-dates="allowedDates"
              ></v-date-picker>

            <div class="text-xs-right">
              <v-btn flat @click.native="e1 = 1">Kembali</v-btn>
              <v-btn large color="secondary" @click.native="e1 = 3">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="3">
            <form class="full pa-4">
              <h3>Infomasi komunitas / organisasi</h3>
              <v-text-field
                v-model="pic"
                label="Atas Nama Penanggung Jawab"
                :error-messages="errors.collect('pic')"
                v-validate="'required'"
                data-vv-name="pic"
                required
              ></v-text-field>
              <v-text-field
                v-model="organization"
                label="Nama Komunitas / Organisasi"
                :error-messages="errors.collect('organization')"
                v-validate="'required'"
                data-vv-name="organization"
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
              <v-text-field
                v-model="phone"
                label="Nomor Telfon / Whatsapp"
                :error-messages="errors.collect('phone')"
                v-validate="'required'"
                data-vv-name="phone"
                required
              ></v-text-field>
              <h3>Informasi acara</h3>
              <v-text-field
                v-model="title"
                label="Judul Acara"
                :error-messages="errors.collect('title')"
                v-validate="'required'"
                data-vv-name="title"
                required
              ></v-text-field>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="dateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="date"
              >
                <v-text-field
                  slot="activator"
                  label="Tanggal Acara"
                  v-model="date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="timeMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
                :return-value.sync="startTime"
              >
                <v-text-field
                  slot="activator"
                  label="Pilih waktu mulai"
                  v-model="startTime"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="startTime" @change="$refs.menu.save(startTime)"></v-time-picker>
              </v-menu>
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
            <v-btn color="secondary" @click.native="e1 = 1">Kirim</v-btn>

          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      
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
      e1: 0,
      date: null,
      dataMenu: false,
      timeMenu: false,
      pic: '',
      email: '',
      title: '',
      numberOfAttendees: 0,
      startTime: null,
      durationOptions: [1, 2, 3, 4, 5, 6, 7],
      duration: 1,
      organization: '',
      phone: '',
      type: null,
      isPaid: false,
      isProvidingFood: false,
      isNeedTable: false,
      roomTypeOption: [
        'Main Room',
        'Meeting Room'
      ],
      eventTypeOptions: [
        'Presentation',
        'Learning Session',
        'Meeting',
        'Hackathon',
        'Looking Around'
      ],
      checkbox: null,
      description: '',
      website: '',
      fb: '',
      twitter: '',
      instagram: '',
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
      this.phone = ''
      this.organization = ''
      this.type = null
      this.checkbox = null
      this.$validator.reset()
    },
    allowedDates(val) {
      return parseInt(val.split('-')[2], 10) % 2 === 0
    }
  }
}
</script>
<style scoped>
.full {
  width: 35vw;
}
</style>

