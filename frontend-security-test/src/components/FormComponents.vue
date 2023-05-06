<script lang="ts" >

import { defineComponent } from 'vue';

export default defineComponent({
  props: {

    typeForm: {
      type: String,
    },
    handleSubmit: {
      type: Function,
    }
  },
  data: () => {
    return {
      firstName: '',
      firstNameRules: [
        (value: string) => {
          if (value?.length > 3) return true

          return 'Le nom doit avoir au moins 3 caractères .'
        },
      ],
      email: '',
      emailRules: [
        (value: string) => {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

          return 'Email invalide .'
        },
      ],
      show1: false,
      loading: false,
      password: 'mot de passe',
      rules: {
        required: (value:string) => !!value || 'Required.',
        min: (v:string) => v.length >= 8 || 'Min 8 caractère',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  }
})

</script>


<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field variant="outlined" v-model="firstName" label="Nom utilisateur" :rules="firstNameRules"></v-text-field>

    <v-text-field variant="outlined" :prepend-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'" @click:prepend-inner="show1 = !show1" v-model="email" label="mot de passe"></v-text-field>
    <v-text-field variant="outlined" v-model="password" label="Email" :rules="emailRules" v-if="typeForm != 'login'" ></v-text-field>

    <v-btn type="submit"  :loading="loading" block height="48" class="mt-2">Se Connecter</v-btn>
  </v-form>
</template>