import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import bahasa from 'vee-validate/dist/locale/id';

Validator.localize('id', bahasa)

Vue.use(VeeValidate)