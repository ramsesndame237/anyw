<script lang="ts" >

import { defineComponent } from 'vue';
import FormComponents from '@/components/FormComponents.vue';
import { useAuthStore } from '@/store/auth.store';
import { IUser } from '@/interfaces/UserTypes';
import router from '@/router';

export default defineComponent({
    components: {
        FormComponents
    },
    data: () => {
        return {
            alert: false,
            type_error: 'sucess',
            message: '',
            loading: false
        }

    },
    methods: {
        handleSubmit(value: IUser) {
            console.log({ value })
            const authStore = useAuthStore()
            this.loading = true
            authStore.register(value.username ?? '', value.password ?? '', 'firstname', 'lastname', value.email ?? '').then((response) => {
                console.log(response)
                if (response?.status == 400) {
                    this.type_error = 'error'
                    this.message = response.error
                    this.alert = true
                    setTimeout(() => {
                        this.alert = false
                    }, 2000)
                } else {
                    this.type_error = 'success'
                    this.message = response.error
                    this.alert = true
                    setTimeout(() => {
                        this.alert = false
                    }, 2500)
                    router.push('/login')
                }
            }).catch(async (error) => {
                this.alert = true
            }).finally(() => {
                this.loading = false
            })
        }
    }
})

</script>


<template>
    <div class="Container-form">
        <v-card class="mx-auto " min-width="400" title="Connection">
            <v-container>
                <FormComponents :loading="loading" :type-form="'register'" @handleSubmit="handleSubmit" />
            </v-container>
        </v-card>
        <div>
            <span>
                Vouns avez un compte <a href="/login">Se connecter</a>
            </span>
        </div>

        <v-alert v-if="alert" style="position: absolute;top: 5px; right: 0px;" :color="type_error" icon="$success"
            :text="message"></v-alert>

    </div>
</template>

<style lang="scss">
.Container-form {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url('https://www.anywr-group.com/hs-fs/hubfs/MicrosoftTeams-image-Feb-09-2023-02-07-12-9757-PM.png?height=550&name=MicrosoftTeams-image-Feb-09-2023-02-07-12-9757-PM.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>