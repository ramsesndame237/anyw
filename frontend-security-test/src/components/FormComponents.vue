<script lang="ts" >

import { defineComponent } from 'vue';

export default defineComponent({
    props: {

        typeForm: {
            type: String,
            required: true
        },
        submit: {
            type: Function,
            required: true
        }
    },
    data: () => {
        return {
            firstName: '',
            firstNameRules: [
                (value: string) => {
                    if (value?.length > 3) return true

                    return 'First name must be at least 3 characters.'
                },
            ],
            email: '',
            emailRules: [
                (value: string) => {
                    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

                    return 'Must be a valid e-mail.'
                },
            ]
        }
    }
})

</script>


<template>
    <v-sheet width="300" class="mx-auto">
        <v-form fast-fail @submit.prevent>
            <v-text-field v-model="firstName" label="First name" :rules="firstNameRules"></v-text-field>

            <v-text-field v-model="email" label="Last name" :rules="emailRules"></v-text-field>

            <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
    </v-sheet>
</template>