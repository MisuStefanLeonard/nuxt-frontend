<template>
    <div class="bg-grey-darken-4 p-2">
        <v-container fluid class="text-center">
            <p class="font-weight-light h3 p-2 m-2">Adauga o noua cusatura a liniei</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>

            <!-- Form Section -->
            <v-container fluid class="text-center">
                <v-form ref="tipLinieForm"  class="bg-grey-lighten-3 text-center">
                    <v-row class="p-2 m-2">
                        <!-- Loop through fields and render specific components based on type -->
                        <v-col v-for="(field, index) in tipLinieFormData" :key="index" cols="12">
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

                            <!-- Render v-file-input for file uploads -->
                            <v-file-input
                                v-if="field.type === 'file-input'"
                                v-model="formData[field.model]"
                                :label="field.label"
                                :placeholder="field.placeholder"
                                :accept="field.accept"
                                :rules="field.rules"
                                :disabled="formData.presignedUrl !== 'empty'"
                                @change="handleFileUpload()"
                                clearable
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                                counter
                                show-size
                            ></v-file-input>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>

            <!-- Image Section -->
            <v-container fluid class="">
                <p class="font-weight-light h3">Imaginea cusaturii de linie</p>
                <v-row class="p-2 m-2">
                    <v-col cols="12" class="d-flex justify-center">
                        <div v-if="formData.presignedUrl !== 'empty'">
                            <v-img
                                :src="formData.presignedUrl"
                                alt="Imaginea inelului"
                                aspect-ratio="16/9"
                                cover
                                max-width="400"
                                max-height="400"
                                class="my-2"
                            >
                                <template v-slot:placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                            <!-- Delete Image Button -->
                            <v-btn
                                class="m-2 p-1"
                                color="error"
                                @click="deleteImage()"
                            >
                                Șterge imaginea
                            </v-btn>
                        </div>
                        <div v-else>
                            <p class="font-weight-bold">Nu este imagine pentru aceasta cusatura de linie</p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>

            <!-- Save Button -->
            <v-container fluid class="text-center">
                <v-btn
                    variant="flat"
                    color="success"
                    class="p-2"
                    append-icon="mdi-content-save"
                    @click="saveNewTipLinie"
                >
                    Adauga
                </v-btn>
            </v-container>
        </v-container>
    </div>
</template>

<script setup>
import { ref,onBeforeMount } from 'vue';
import adminService from '~/services/Admin';
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

const swal = useNuxtApp().$swal;
const store = useUserStore();
const tipLinieForm = ref(null);
var namesOfAllTipuriLinie = ref([])

async function getTipuriLinieNames(){
    const tipGalerieNames = await adminService.getTipuriLinieNames();
    if(tipGalerieNames !== null){
        namesOfAllTipuriLinie.value = tipGalerieNames
    }
}


const formData = ref({
    numeTipLinieDto: '',
    pretPeTipLinieDto: 0,
    caleRelativa: null,
    presignedUrl: 'empty',
    image: null, // Used for the image file
    imageJustAdded: false
});

const tipLinieFormData = ref([
    {
        type: 'text-field',
        label: 'Nume tip linie',
        placeholder: 'numele tipului de linie',
        model: 'numeTipLinieDto',
        maxLength: 30,
        rules: [
            value => !!value || 'Numele tipului de linie nu poate fi gol',
            value => value.length <= 30 || 'Sunt permise maxim 30 de caractere',
            value => {
                let isNameUsed = namesOfAllTipuriLinie.value.find(m => m === String(value).toLowerCase())
                if(isNameUsed !== undefined){
                    return 'Numele tipului de linie exista exista'
                }
                return true
            }
        ],
    },
    {
        type: 'text-field',
        label: 'Pret tip linie/metru',
        model: 'pretPeTipLinieDto',
        placeholder: 'Pretul tipului de linie pe metru',
        rules: [
            value => !!value || 'Pretul tipului de linie nu poate fi gol',
            value =>
                !!value && /^[0-9]*\.?[0-9]+$/.test(String(value)) ||
                'Introduceți un număr valid (doar cifre și un singur punct zecimal) si fara spatii',
        ],
    },
    {
        type: 'file-input',
        label: 'Incarca imagine',
        accept: 'image/*',
        placeholder: 'Selectează un fișier',
        model: 'image',
        rules: [() => isLenOfFileValid.value || 'Numele fișierului trebuie să aibă mai puțin de 100 de caractere'],
    },
]);

const isLenOfFileValid = computed(() => {
    if(formData.value.image === null){
        return true;
    }
    return formData.value.image?.name.length <= 100;
});


// Capture the file to be uploaded
function handleFileUpload() {
    formData.value.imageJustAdded = true;
    formData.value.presignedUrl = URL.createObjectURL(formData.value.image);
    formData.value.caleRelativa = formData.value.image.name;
}

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

async function deleteImage() {
    if (formData.value.imageJustAdded === true) {
        URL.revokeObjectURL(formData.value.presignedUrl);
        formData.value.presignedUrl = 'empty';
        formData.value.image = null;
    }
}

async function saveNewTipLinie() {
    fireAlarm('info', 'Salvare...', 'Asteptati...', true);
    const newTipLinie = {
        numeTipLinieDto: formData.value.numeTipLinieDto,
        pretPeTipLinieDto: formData.value.pretPeTipLinieDto,
        presignedUrl: formData.value.presignedUrl,
        caleRelativa: formData.value.caleRelativa,
    };
    const isValid = await tipLinieForm.value.validate();
    if(isValid.valid){
        const form = new FormData();
        form.append('newTipLinie', JSON.stringify(newTipLinie));

        // Append the image file if it exists
        if (formData.value.image) {
            form.append('image', formData.value.image);
        }else{
            form.append('image' , null);
        }

        const response = await adminService.updateOrAddTipLinie(null,form);
       
        if (response === 1) {
            fireAlarm('success', 'Succes', 'Cusatura de liniei a fost adaugat cu succes', null);
            navigateTo('/admin/tipuri_linie')
        } else if (response === -1) {
            store.snackbarMessage('Token-ul a expirat, ati fost delogat');
            navigateTo('/user/logout');
        } else {
            fireAlarm('error', 'Eroare', 'O eroare a avut loc la salvarea materialului', null);
        }

    }else{
        fireAlarm('error' , 'Eroare' , 'Verificati formularul' , null);
        return
    }

    
}

onBeforeMount(async () => {
    await getTipuriLinieNames()
})
</script>
