<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md8>
      <h2 class="ma-3 text-xs-center">Selanggarakan acara mu di MozSpaceJKT</h2>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step > 1">Membaca Ketentuan </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="step > 2">Pastikan Jadwal Tersedia</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3">Isi Data Komunitas</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">Isi Formulir</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-progress-linear v-if="isLoading" :indeterminate="true"></v-progress-linear>
          <v-stepper-content step="1">
            <term-condition></term-condition> 
            <div class="text-xs-right">
              <v-btn large color="secondary" @click.native="nextStep()">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=4no1lrkb7dauor7a8lhm0197gc%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Asia%2FJakarta" mce_src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=4no1lrkb7dauor7a8lhm0197gc%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=Asia%2FJakarta" style="border-width:0" mce_style="border-width:0" scrolling="no" width="100%" height="600" frameborder="0"></iframe>

            <div class="text-xs-right">
              <v-btn flat @click.native="step = 1">Kembali</v-btn>
              <v-btn large color="secondary" @click.native="nextStep()">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="3">
            <div class="text-xs-center">
              <h2 class="heading ma-3">Apakah komunitasmu pernah mengadakan acara disini ?</h2>
              <v-btn outline @click.native="chooseFirstTime(false)">Sudah Pernah</v-btn>
              <v-btn outline @click.native="chooseFirstTime(true)">Belum Pernah</v-btn>
            </div>

            <new-organization-form v-if="isOrganizationOptionChoosed && isFirstTime" 
              ref="newOrganizationForm"
              @organizationFormSubmitted="handleOrganizationFormAfterSubmit"
              @startLoading="isLoading = true"></new-organization-form>
            <existing-organization-form v-if="isOrganizationOptionChoosed && !isFirstTime"
              @startLoading="isLoading = true"
              @organizationFormSubmitted="handleOrganizationFormAfterSubmit"
              @changeNewOrganizationForm="isFirstTime = true"
              ref="existingOrganizationForm">
            </existing-organization-form>

            <div class="text-xs-right">
              <v-btn flat @click.native="step = 2">Kembali</v-btn>
              <v-btn large color="secondary" @click.native="submitOrganizationForm">Selanjutnya</v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="4">
            <div v-if="isOrganizationFormFulfilled">
              <new-event-form ref="createNewEventForm" :organization="organization" @newEventCreated="handleAfterEventCreated"></new-event-form>
              <div class="text-xs-right">
                <v-btn flat @click.native="step = 3">Kembali</v-btn>
                <v-btn large color="secondary" @click.native="submitCreateEventForm">Kirim</v-btn>
              </div>
            </div>
            <div v-else>
              <h4>Mohon untuk mengisi data organisasi / komunitas terlebih dahulu</h4>
              <v-btn color="secondary" @click.native="step = 3">Isi data komunitas</v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import TermCondition from '@/components/Events/TermCondition'
import NewOrganizationForm from '@/components/Events/Create/NewOrganizationForm'
import ExistingOrganizationForm from '@/components/Events/Create/ExistingOrganizationForm'
import NewEventForm from '@/components/Events/Create/NewEventForm'

export default {
  $_veeValidate: {
    validator: 'new',
  },
  name: 'CreateEvent',
  data () {
    return {
      step: 4,
      isFirstTime: true,
      isOrganizationOptionChoosed: false,
      isLoading: false,
      date: null,
      durationOptions: [1, 2, 3, 4, 5, 6, 7],
      duration: 1,
      organization: null,
    }
  },
  methods: {
    handleAfterEventCreated () {
      console.log('move to thanks please')
      this.$router.push({
        name: 'events-thanks',
        query: {
          name: this.organization.pic,
          email: this.organization.email,
        }
      })
    },
    allowedDates(val) {
      return parseInt(val.split('-')[2], 10) % 2 === 0
    },
    submitOrganizationForm() {
      if (this.isOrganizationOptionChoosed && this.organizationFormType) {
        this.$refs[this.organizationFormType.toString()].submit()
      } else {
        this.$store.dispatch('notify', { type: 'info', message: 'Isi data komunitas terlebih dahulu'})
      }
    },
    submitCreateEventForm() {
      this.$refs.createNewEventForm.submit();
    },
    handleOrganizationFormAfterSubmit() {
      const newOrganization = this.$refs[this.organizationFormType.toString()].organization || ''

      if (newOrganization) {
        this.organization = newOrganization
        this.nextStep()
      }

      this.isLoading = false
    },
    chooseFirstTime(val) {
      this.isOrganizationOptionChoosed = true
      this.isFirstTime = val
    },
    nextStep() {
      this.step = this.step + 1
    }
  },
  components: {
    TermCondition,
    NewOrganizationForm,
    ExistingOrganizationForm,
    NewEventForm,
  },
  computed: {
    whenTheEventEnd() {
      return 0;
    },
    organizationFormType() {
      return this.isFirstTime ? 'newOrganizationForm' : 'existingOrganizationForm'
    },
    isOrganizationFormFulfilled() {
      return this.organization !== null;
    }
  }
}
</script>
<style scoped>
.full {
  width: 35vw;
}
</style>

