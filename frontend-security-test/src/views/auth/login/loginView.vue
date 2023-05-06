<script lang="ts" >

import { defineComponent } from 'vue';
import FormComponents from '@/components/FormComponents.vue';

export default defineComponent({
  components: {
    FormComponents
  }
})

</script>


<template>
  <div class="Container-form">
    <v-card class="mx-auto " min-width="400" title="Connection">
      <v-container>
        <FormComponents  :type-form="'login'" />
      </v-container>
    </v-card>

  </div>
</template>

<style lang="scss">
.Container-form {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://www.anywr-group.com/hs-fs/hubfs/MicrosoftTeams-image-Feb-09-2023-02-07-12-9757-PM.png?height=550&name=MicrosoftTeams-image-Feb-09-2023-02-07-12-9757-PM.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>