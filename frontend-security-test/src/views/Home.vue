<template>
  <main class="main-home">
    <div>
      <img src="https://img.newstank.fr/image/b7c5e21c5e5e2c6158f016811c6c992b/465/218/cooptalis-devient-anywr.jpg"
        alt="anywr">
      <div>
        <h1 class="text-white" >
          Leader du recrutement international et de la mobilité professionnelle
        </h1>
      </div>
      <v-btn
      class="ma-2"
      color="primary"
      variant="elevated"
      @click="gotToProfil"
    >
      Profil
      <v-icon end icon="mdi-account-outline"></v-icon>
    </v-btn>
      <v-btn
      class="ma-2"
      color="primary"
      variant="elevated"
      @click="logout"
    >
      Deconnection
      <v-icon end icon="mdi-logout"></v-icon>
    </v-btn>
    </div>

  </main>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.store';
export default defineComponent({
  methods:{
    gotToProfil(){
      router.push('/profil')
    }, 
    logout(){
      useAuthStore().logout()
    }
  }
})

</script>

<style lang="scss">
.main-home {
  background: #503191;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
