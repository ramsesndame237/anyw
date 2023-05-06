<template>
  <main class="main-home">
    <div>
      <img src="https://img.newstank.fr/image/b7c5e21c5e5e2c6158f016811c6c992b/465/218/cooptalis-devient-anywr.jpg"
        alt="anywr">
      <div>
        <p>
          eader du recrutement international et de la mobilité professionnelle
        </p>
      </div>
      <v-chip
      class="ma-2"
      color="primary"
      variant="elevated"
      @click="gotToProfil"
    >
      Profil
      <v-icon end icon="mdi-account-outline"></v-icon>
    </v-chip>
    </div>

  </main>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
export default defineComponent({
  methods:{
    gotToProfil:{
      router.push('/profil')
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
