<script lang="ts" >

import { defineComponent } from 'vue';

export default defineComponent({
  props: {

    typeForm: {
      type: String,
    }, 
    loading:{
      type:Boolean
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
      password: '',
      rules: {
        required: (value:string) => !!value || 'Required.',
        min: (v:string) => v.length >= 8 || 'Min 8 caractère',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  }, 
  methods:{
   async submit(event:any){
      const result = await event
      console.log({result})
      if(result.valid){
        if(this.typeForm == 'login'){
          this.$emit('handleSubmit', {username:this.firstName, password:this.password})
        }

      }
    }

  }
})

</script>


<template>
  <v-form fast-fail @submit.prevent ="submit">
    <v-text-field variant="outlined" v-model="firstName" label="Nom utilisateur" :rules="firstNameRules"></v-text-field>

    <v-text-field variant="outlined" :prepend-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'" @click:prepend-inner="show1 = !show1" v-model="password" label="mot de passe"></v-text-field>
    <v-text-field variant="outlined" v-model="email" label="Email" :rules="emailRules" v-if="typeForm != 'login'" ></v-text-field>

    <v-btn type="submit" color="primary"  :loading="loading" block height="48" class="mt-2">Se Connecter</v-btn>
  </v-form>
</template>