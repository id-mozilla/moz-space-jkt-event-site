<template>
  <div>
    <v-select
      label="Masukan Nama Komunitas Kamu"
      autocomplete
      :loading="loading"
      cache-items
      required
      :items="organizations"
      :search-input.sync="search"
      v-model="organization"
      item-value="id"
      item-text="name"
      return-object
    ></v-select>
    <organization-detail
      :organization="organization"
      v-if="isOrganizationSelected">
    </organization-detail>
    <div v-if="mayBeNewcomer && !isOrganizationSelected">
      <h3 class="subheading">Maaf, kami tak dapat menemukan komunitasmu dibuku tamu. Silahkan isi data ya</h3>
      <v-btn color="primary" @click="$emit('changeNewOrganizationForm')" class="mt-2">
        Isi data komunitas
      </v-btn>
    </div>
  </div>
</template>
<script>
import OrganizationDetail from "~/components/Events/Create/OrganizationDetail";
export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "ExistingOrganizationForm",
  data() {
    return {
      organizations: [],
      organization: {},
      organizationId: '',
      loading: false,
      search: "",
      mayBeNewcomer: false
    };
  },
  methods: {
    searchOrganization(name) {
      this.loading = true;
      this.$axios
        .$get(
          `/Organizations?filter[where][name][like]=${name}&filter[where][name][options]=i`
        )
        .then(organizations => {
          this.organizations = organizations;
          if (organizations.length === 0) {
            this.mayBeNewcomer = true;
          }
          this.loading = false;
        })
        .catch(err => {
          this.$store.dispatch('notify', { type: 'error', message: err.message })
          this.mayBeNewcomer = true;
          this.loading = false;
        });
    },
    submit() {
      this.$emit('organizationFormSubmitted')
    },
    fillNewAttendeesForm() {
      this.resetForm();
    },
    resetForm() {
      this.search = "";
      this.mayBeNewcomer = false;
      this.organization = {};
    }
  },
  computed: {
    isOrganizationSelected() {
      return Object.keys(this.organization).length > 0;
    }
  },
  watch: {
    search(name) {
      name && this.searchOrganization(name);
    },
    // to fill organizationId automatically
    organization(newValue) {
       this.organizationId = newValue.id
    }
  },
  components: {
    OrganizationDetail
  }
};
</script>
