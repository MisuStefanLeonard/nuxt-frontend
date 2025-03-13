<template>
    <div>
        <v-container>
            <v-alert v-if="authorizeAgain" type="error" v-model="authorizeAgain" closable>
                Va rog sa va autorizati din nou
            </v-alert>
            <v-alert v-if="invalidKeyAlert" type="error" v-model="invalidKeyAlert" closable>
                {{ invalidKeyAlertText }}
            </v-alert>
            <v-alert v-if="waitAlert" type="info" v-model="waitAlert" closable>
                {{ waitAlertText }}
            </v-alert>
        </v-container>
        <v-container class="justify-center d-block w-100 text-center">
            <p class="font-weight-light h3">Administrare</p>
            <v-form class="rounded p-2 bg-grey-darken-4" ref="adminForm" @submit.prevent="authAdmin()">
                <v-text-field class="p-3"
                label="Cheia de autentificare"
                placeholder=""
                :rules="[rules.required]"
                v-model="key"
                type="password">
                </v-text-field>
                <v-btn rounded="xl" type="submit" variant="outlined" class="font-weight-bold bg-grey-lighten-3 mt-2">
                    Intra
                    <v-icon class="pl-2" :icon="mdiArrowRight"></v-icon>
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script setup>
import { mdiArrowRight } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminService from '~/services/Admin'

definePageMeta({
    layout:'admin',
    middleware: 'admin'
})

// Reactive state
const key = ref('')
const invalidKeyAlert = ref(false)
const waitAlert = ref(false)
const authorizeAgain = ref(false)

const rules = {
    required: value => !!value || "Completati campul cu cheia de acces"
}

const swal = useNuxtApp().$swal;
// Static text
const waitAlertText = 'Asteptati...'
const invalidKeyAlertText = 'Cheie de acces gresita! Incercati din nou!'
const adminForm = ref(null)
const route = useRoute()

// Methods
const authAdmin = async () => {
    waitAlert.value = true
    const isValid = await adminForm.value.validate()
    if(isValid.valid){
        const response = await AdminService.adminLogin(key.value)
        console.log(response)
        if (response === -1) {
            invalidKeyAlert.value = true
            waitAlert.value = false
        } else if (response === 1) {
            waitAlert.value = false
            navigateTo('/admin/dashboard')
        }
    }else{
        swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Completati campul din formular',
            timer: 2000
        })
        waitAlert.value = false
        return
    }
   
}

const getAdminPage = async () => {
    if(route.query.redirect === "redirect"){
        const response = await AdminService.getAdminLogin('redirect');
        if(response === 1){
            console.log('authorize again')
            authorizeAgain.value = true;
            // authorize yourself
            return;
        }else if(response === 0){
            navigateTo('/admin/dashboard')
        }
    }
}

onMounted(async() => {
    await getAdminPage()
})

</script>

<style scoped>
/* Add any specific styling here */
</style>
