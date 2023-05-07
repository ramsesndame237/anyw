<script lang="ts" >
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => {
        return {
            name: '',
            surname: '',
            email: ''
        }
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem('user_connect') ?? '') || []
        this.name = user.firstName + ' ' + user.lastName
        this.surname = user.username
        this.email = user.email
        console.log(user)
    }
})

</script>

<template>
    <v-card class="mx-auto" min-width="434" width="100%" height="280px" rounded="0">
        <v-img height="100%" cover
            src="https://www.anywr-group.com/hubfs/chub_backup/Logo@3x%20(3).pnghttps://www.anywr.life/hs-fs/hubfs/core%20hp.png?width=500&height=400&name=core%20hp.png">
            <v-avatar color="grey" size="150" rounded="0">
                <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <v-list-item class="text-white" :title="name" :subtitle="email"></v-list-item>
            <v-list-item class="text-white" :title="surname"></v-list-item>

          <a href="/">
            <v-btn>
                <v-icon icon="mdi-home"></v-icon>
            </v-btn>
          </a>

        </v-img>
        
    </v-card>
</template>
 