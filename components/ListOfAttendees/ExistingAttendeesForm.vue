<template>
  <div>
    <v-select
      label="Masukan Nama Kamu"
      autocomplete
      :loading="loading"
      cache-items
      required
      :items="participants"
      :search-input.sync="search"
      v-model="participant"
      item-value="id"
      item-text="name"
      return-object
    ></v-select>
    <participant-detail 
      :participant="participant" 
      v-if="isParticipanSelected">
    </participant-detail>
    <v-btn large 
      block
       @click="submit" 
       color="primary" 
       class="mt-3" 
       v-if="isParticipanSelected">Ya, Saya Hadir</v-btn>
    <div v-if="mayBeNewcomer">
      <h3 class="subheading">Maaf, kami tak dapat menemukan namamu dibuku tamu. Silahkan isi data ya</h3>
      <v-btn color="primary" @click="fillNewAttendeesForm()" class="mt-2">
        Isi data diri
      </v-btn>


    </div>
    <v-btn outline @click="fillNewAttendeesForm()" class="mt-2">
       Sepertinya baru pertama kali. 
    </v-btn>
  </div>
</template>
<script>
import ParticipantDetail from "~/components/ListOfAttendees/ParticipantDetail";
export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "ExistingAttendeesForm",
  data() {
    return {
      participants: [],
      participant: {},
      loading: false,
      search: "",
      mayBeNewcomer: false
    };
  },
  methods: {
    searchParticipant(name) {
      this.loading = true;
      this.$axios
        .$get(
          `/Participants?filter[where][name][like]=${name}&filter[where][name][options]=i`
        )
        .then(participants => {
          this.participants = participants;
          if (participants.length === 0) {
            this.mayBeNewcomer = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log("error when trying to get part");
          this.mayBeNewcomer = true;
          this.loading = false;
        });
    },
    submit() {
      console.log("submited");
      this.$validator.validateAll().then(isFormValid => {
        if (isFormValid) {
          this.$axios
            .$post("/ListOfAttendees", {
              eventId: this.$route.params.id,
              participantId: this.participant.id
            })
            .then(result => {
              this.resetForm();
              this.$emit("success");
            })
            .catch(err => {
              console.log("err when submit attendees : ", err);
              this.resetForm();
            });
        }
      });
    },
    fillNewAttendeesForm() {
      this.$emit("changeFirstTime");
      this.resetForm();
    },
    resetForm() {
      this.search = "";
      this.mayBeNewcomer = false;
      this.participant = {};
    }
  },
  computed: {
    isParticipanSelected() {
      return Object.keys(this.participant).length > 0;
    }
  },
  watch: {
    search(name) {
      name && this.searchParticipant(name);
    }
  },
  components: {
    ParticipantDetail
  }
};
</script>

