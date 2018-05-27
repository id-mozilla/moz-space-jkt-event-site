<template>
  <v-layout align-center justify-center>
    <v-flex xs12 
            sm4 
            md4 
            text-xs-center 
            mt-5>
      <h3>Masuk kedalam sistem MozSpaceJKT</h3>
      <form>
        <v-text-field
          v-model="email"
          label="Email"
          :error-messages="errors.collect('email')"
          v-validate="'required'"
          data-vv-name="email"
          @keyup.enter="login"
          required
        />
        <v-text-field
          v-model="password"
          label="Kata Sandi"
          :counter="10"
          :error-messages="errors.collect('password')"
          v-validate="'required'"
          data-vv-name="password"
          type="password"
          @keyup.enter="login"
          required
        />
        <v-btn color="primary" @click="login">Login</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>
<script>
import bahasa from 'vee-validate/dist/locale/id';
export default {
  $_veeValidate: {
    validator: 'new',
  },

  data: () => ({
    password: '',
    email: '',
  }),

  mounted() {
    this.$validator.localize('en', bahasa);
  },

  methods: {
    login() {
      let self = this;
      this.$validator.validateAll().then(isFormValid => {
        if (isFormValid) {
          self.$store
            .dispatch('login', {
              email: this.email,
              password: this.password,
            })
            .then((isLoginSuccess) => {
              if (isLoginSuccess) {
                return this.$router.push('/admin');
              }
            })
            .catch(err => {
              console.log('error when trying to login : ', err);
            });
        }
      });
    },
  },
};
</script>
