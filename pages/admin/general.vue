<template>
    <div class="bg-grey-darken-4 p-3 h-100">
        <v-alert type="info" variant="tonal" class="text-justify">
            Aici puteti seta pretul comenzii minime pentru transport gratuit
        </v-alert>

        <p class="font-weight-light p-2 m-2 h3 text-center">Comenzi setari</p>
        <v-container fluid >
            <v-form ref="generalSettingsForm" class="text-center p-2 m-2 bg-grey-lighten-4 rounded-sm" validate-on="input"
            @submit.prevent="saveGeneralSettings()">
                <v-text-field class="p-2 m-2" variant="outlined"
                label="Pretul minim pentru transport gratuit"
                placeholder="ex : 500.55 , 300"
                :rules="[rules.onlyNumbers]"
                v-model="generalSettingsData.pret_comanda_minima">
                </v-text-field>
                <v-text-field class="p-2 m-2" variant="outlined"
                    label="SmartBill username:"
                    placeholder="ex : 500.55 , 300"
                    :rules="[]"
                    v-model="generalSettingsData.smart_bill_username">
                </v-text-field>
                <v-text-field class="p-2 m-2" variant="outlined"
                    label="SmartBill parola:"
                    placeholder="ex : 500.55 , 300"
                    :rules="[]"
                    v-model="generalSettingsData.smart_bill_password">
                </v-text-field>
                <v-text-field class="p-2 m-2" variant="outlined"
                    label="CIF:"
                    placeholder="ex : 500.55 , 300"
                    :rules="[]"
                    v-model="generalSettingsData.cif">
                </v-text-field>
                <v-btn class="bg-primary my-2" type="submit">
                    Salveaza<v-icon class="mx-2" :icon="mdiContentSave"></v-icon>
                </v-btn>
            </v-form>
        </v-container>
    </div>
   
</template>



<script setup>
import { mdiContentSave } from '@mdi/js';
import adminService from '~/services/Admin';

definePageMeta({
    layout:'admin',
    middleware: 'admin'
})

const numbersRegex = /^\d+(\.\d{1,2})?$/;
const swal = useNuxtApp().$swal

const generalSettingsForm = ref(null)
const generalSettingsData = ref({
    "pret_comanda_minima" : '0',
    "smart_bill_username" : '',
    "smart_bill_password" : '',
    "cif" : ''
})
const rules = {
  onlyNumbers: (value) => {
    return !value || numbersRegex.test(value) || "The value must be a valid number (e.g., 500 or 500.55)";
  },
};

const saveGeneralSettings = (async () => {
    const isValid = await generalSettingsForm.value.validate()
    if(isValid.valid){
        const dict = {
            pret_comanda_minima : generalSettingsData.value.pret_comanda_minima,
            smart_bill_username: generalSettingsData.value.smart_bill_username,
            smart_bill_password: generalSettingsData.value.smart_bill_password,
            cif: generalSettingsData.value.cif.toUpperCase(),
        }
        const form = new FormData()
        form.append("dict" , JSON.stringify(dict))
        const response = await adminService.modifyGeneralSettings(form);
        if(response === 1){
            fireAlarm('top-end' , 'success' , 'Modificat cu succes!' , 2000)
        }else if(response === -2){
            fireAlarm('top-end' , 'error' , 'Eroare generala. Contactati administratorului' , 2000)
        }else {
            fireAlarm('top-end' , 'error' , 'Contactati administratorului' , 2000)
        }
        return;
    }else{
        fireAlarm('top-end' , 'error' , 'Eroare formular' , 2000)
    }
})

function fireAlarm(position , icon , title , timer){
    swal.fire({
        position: position,
        icon: icon,
        title: title,
        timer: timer
    });
}

const getGeneralDatSettings = (async () => {
    const response = await adminService.getGeneralSettings();
    generalSettingsData.value = response;
    console.log(generalSettingsData.value)
})


onMounted(async () => {
    await getGeneralDatSettings()
})
</script>