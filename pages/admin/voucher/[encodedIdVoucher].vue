<template>
    <div class="bg-grey-darken-4 p-2">
        <v-container fluid class="text-center">
            <p class="font-weight-light h3 p-2 m-2">Modifica voucherul</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
            
            <v-container fluid>
                <v-alert type="info">
                    <p class="font-weight-bold">- Codul voucher-ului va fi transformat in litere mari automat</p>
                    <p class="font-weight-bold">- Reducerea trebuie sa fie intre (1,99)</p>
                </v-alert>
            </v-container>
           
            <!-- Form Section -->
            <v-container fluid class="text-center">
                
                <v-form ref="voucherForm" class="bg-grey-lighten-3 text-center ">
                    <v-row class="p-2 m-2">
                        <!-- Loop through fields and render specific components based on type -->
                        <v-col v-for="(field, index) in voucherFormData" :key="index" cols="12">
                            <!-- Render v-text-field for text fields -->
                            <v-text-field
                                v-if="field.type === 'text-field'"
                                v-model="formData[field.model]"
                                :label="field.label"
                                :placeholder="field.placeholder"
                                :rules="field.rules"
                                :counter="field.maxLength"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                            ></v-text-field>
                            <v-date-input
                                v-else
                                v-model="formData[field.model]"
                                :label="field.label"
                                :placeholder="field.placeholder"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1">
                            </v-date-input>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>


            <!-- Save Button -->
            <v-container fluid class="text-center">
                <v-btn
                    variant="flat"
                    color="success"
                    class="p-2"
                    append-icon="mdi-content-save"
                    @click="saveVoucherModification"
                >
                    Salveaza
                </v-btn>
            </v-container>
        </v-container>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { VDateInput } from 'vuetify/labs/components';
import adminService from '~/services/Admin';
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const swal = useNuxtApp().$swal;
const route = useRoute();
const store = useUserStore();
var originalVoucher = ref({});
const encodedIdVoucher = route.params.encodedIdVoucher;
const voucherForm = ref(null);
var namesOfAllVoucherCodes = ref([]);


const formData = ref({
    codVoucherDto: '',
    reducereDto: 0,
    dataExpirareDto: null,
});

const voucherFormData = ref([
    {
        type: 'text-field',
        label: 'Cod voucher',
        placeholder: 'Codul voucherului',
        model: 'codVoucherDto',
        maxLength: 10,
        rules: [
            value => !!value || 'Codul voucherului nu poate fi gol',
            value => value.length <= 10 || 'Sunt permise maxim 10 caractere',
            value => {
               
                let voucherCode = namesOfAllVoucherCodes.value.find(m => m === String(value).toUpperCase())
                console.log(voucherCode)
                if(voucherCode !== undefined){
                    return 'Codul voucher-ului exista'
                }
                return true
            }
        ],
    },
    {
        type: 'text-field',
        label: 'Reducere(%)',
        model: 'reducereDto',
        placeholder: 'Reducerea voucherului',
        rules: [
            value => !!value || 'Reducerea voucherului nu poate fi goala',
            value => /^[0-9]*\.?[0-9]+$/.test(String(value).trim()) || 'Doar numere sunt permise',
            value => (parseFloat(value) >= 1 && parseFloat(value) <= 99) || 'Reducerea trebuie sa fie intre 1 si 99'
        ],
    },
    {
        type: 'date-input',
        label: 'Data expirare',
        model: 'dataExpirareDto',
        placeholder: 'Data expirarii',
    },
]);


function fireAlarm(icon, title, text, isLoading) {
    if (isLoading === null) {
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 1500,
        });
    } else {
        swal.fire({
            icon: 'info',
            title: 'Loading...',
            text: 'Asteptati...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                swal.showLoading();
            },
        });
    }
}

async function getCurrentVoucher() {
    fireAlarm('info', 'Loading...', 'Asteptati..', true);
    const response = await adminService.getCurrentVoucher(encodedIdVoucher);
    if (response === null) {
        swal.close();
        store.snackbarMessage('Aceast voucher nu mai exista.Dati un refresh la pagina');
        navigateTo('/admin/vouchere');
    } else if (response === -1) {
        swal.close();
        store.snackbarMessage('Token-ul a expirat , logati-va din noua');
        navigateTo('/user/logout');
    } else {
        swal.close();
        console.log(response)
        formData.value.codVoucherDto = response.codVoucherDto || '';
        formData.value.reducereDto = response.reducereDto || 0;
        formData.value.dataExpirareDto = response.dataExpirareDto || null;

        const voucherObj = {
            codVoucherDto: formData.value.codVoucherDto,
            reducereDto: formData.value.reducereDto,
            dataExpirareDto: formData.value.dataExpirareDto
        };
        originalVoucher = JSON.parse(JSON.stringify(voucherObj))
    }
}

async function getVoucherCodes(){
    const voucherCodes = await adminService.getVoucherCodes();
    if(voucherCodes !== null){
        namesOfAllVoucherCodes.value = voucherCodes
        namesOfAllVoucherCodes.value =  namesOfAllVoucherCodes.value.filter(m => m !== formData.value.codVoucherDto)
    }
}



// Handle saving material modifications, including image upload
async function saveVoucherModification(){
    fireAlarm('info', 'Salvare...', 'Asteptati...', true);
    const isValidForm = await voucherForm.value.validate();
    if(isValidForm.valid){
        const modifiedVoucher = {
            codVoucherDto: formData.value.codVoucherDto,
            reducereDto: formData.value.reducereDto,
            dataExpirareDto: formData.value.dataExpirareDto
        };

        if(JSON.stringify(modifiedVoucher) === JSON.stringify(originalVoucher)){
            fireAlarm('info' , 'Atentie' , 'Nu ati modificat nimic' , null)
            return
        }else{
            const form = new FormData();
    
            form.append('modifiedVoucher', JSON.stringify(modifiedVoucher))
            // NU MERGE VOUCHERUL MODIFICATION
            const response = await adminService.updateOrAddVoucher(encodedIdVoucher, form);

            if (response === 1) {
                fireAlarm('success', 'Succes', 'Voucher-ul a fost actualizat cu succes', null);
                originalVoucher = modifiedVoucher
                window.location.reload()
            } else if (response === -1) {
                store.snackbarMessage('Token-ul a expirat, ati fost delogat');
                navigateTo('/user/logout');
            } else {
                fireAlarm('error', 'Eroare', 'O eroare a avut loc', null);
            }

        }
    }else{
        fireAlarm('error' , 'Eroare' , 'Verificati formularul din nou' , null)
        return;
    }
    
}

onBeforeMount(async () => {
   await getCurrentVoucher();
   await getVoucherCodes();
});
</script>
