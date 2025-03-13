<template>
    <div class="bg-grey-darken-4 p-2">
        <v-container fluid class="text-center">
            <p class="font-weight-light h3 p-2 m-2">Modifica inelul prindere</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>

            <!-- Form Section -->
            <v-container fluid class="text-center">
                <v-form ref="ineleForm" class="bg-grey-lighten-3 text-center ">
                    <v-row class="p-2 m-2">
                        <!-- Loop through fields and render specific components based on type -->
                        <v-col v-for="(field, index) in imageFormData" :key="index" cols="12">
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

                            <!-- Render v-checkbox for checkbox fields -->
                            <v-checkbox
                                v-if="field.type === 'checkbox'"
                                v-model="formData[field.model]"
                                :label="field.label"
                                class="p-2 m-1"
                            ></v-checkbox>

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
                            >
                           
                        </v-file-input>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>

            <!-- Image Section -->
            <v-container fluid class="">
                <p class="font-weight-light h3">Imaginea inelului</p>
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
                            <p class="font-weight-bold">Nu este imagine pentru acest material</p>
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
                    :append-icon="mdiContentSave"
                    @click="saveIneleModification"
                >
                    Salveaza
                </v-btn>
            </v-container>
        </v-container>
    </div>
</template>

<script setup>
import { mdiContentSave } from '@mdi/js';
import { ref, onBeforeMount } from 'vue';
import adminService from '~/services/Admin';
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const swal = useNuxtApp().$swal;
const route = useRoute();
const store = useUserStore();
var originalInel = ref({});
const encodedIdInel = route.params.encodedIdInelDto;
const ineleForm = ref(null);
// var colorsOfAllInele = ref([]);
const namesRo = ref([])
const namesEn = ref([])


const isLenOfFileValid = computed(() => {
    if(formData.value.image === null){
        return true;
    }
    return formData.value.image?.name.length <= 100;
});

const formData = ref({
    culoareInelDto: '',
    culoare_ro : '',
    culoare_en : '',
    caleRelativa: null,
    presignedUrl: 'empty',
    image: null, // Used for the image file
    imageJustAdded: false
});

const imageFormData = ref([
    {
        type: 'text-field',
        label: 'Culoare inel (Romana)',
        placeholder: 'culoara inelului',
        model: 'culoare_ro',
        maxLength: 20,
        rules: [
            value => !!value || 'Culoarea inelului nu poate fi gol',
            value => value.length <= 20 || 'Sunt permise maxim 20 de caractere',
            value => {
                let isColorUsed = namesRo.value.find(m => m === String(value).toLowerCase())
                if(isColorUsed !== undefined){
                    return 'Culoarea inelului exista in limba romana'
                }
                return true
            }
        ],
    },
    {
        type: 'text-field',
        label: 'Culoare inel (Engleza)',
        placeholder: 'Culoara inelului in limba engleza',
        model: 'culoare_en',
        maxLength: 20,
        rules: [
            value => !!value || 'Culoarea inelului nu poate fi gol',
            value => value.length <= 20 || 'Sunt permise maxim 20 de caractere',
            value => {
                let isColorUsed = namesEn.value.find(m => m === String(value).toLowerCase())
                if(isColorUsed !== undefined){
                    return 'Culoarea inelului exista in limba engleza'
                }
                return true
            }
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


// Capture the file to be uploaded
function handleFileUpload() {
    console.log(formData.value.image)
    formData.value.imageJustAdded = true;
    formData.value.presignedUrl = URL.createObjectURL(formData.value.image)
    formData.value.caleRelativa = formData.value.image.name
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

async function getCurrentInel() {
    fireAlarm('info', 'Loading...', 'Asteptati..', true);
    const response = await adminService.getCurrentInel(encodedIdInel);
    if (response === null) {
        swal.close();
        store.snackbarMessage('Acest material nu mai exista.Dati un refresh la pagina');
        navigateTo('/admin/inele');
    } else if (response === -1) {
        swal.close();
        store.snackbarMessage('Token-ul a expirat , logati-va din noua');
        navigateTo('/user/logout');
    } else {
        swal.close();
        console.log(response)
        formData.value.culoareInelDto = response.culoareInelDto || '';
        formData.value.culoare_ro = response.culoareInelJsonDto.culoare_ro,
        formData.value.culoare_en = response.culoareInelJsonDto.culoare_en,
        formData.value.caleRelativa = response.caleRelativa || null;
        formData.value.presignedUrl = response.presignedUrl || 'empty';
        const inelObj = {
            culoareInelDto: formData.value.culoareInelDto,
            culoareInelJsonDto : {
                culoare_ro : formData.value.culoare_ro,
                culoare_en : formData.value.culoare_en,
            },
            presignedUrl:  formData.value.presignedUrl,
            caleRelativa: formData.value.caleRelativa
        };
        originalInel.value = JSON.parse(JSON.stringify(inelObj))
    }
}

async function getIneleColors(){
    const ineleColors = await adminService.getInelePrindereColors();
    if(ineleColors !== null){
        namesRo.value = ineleColors.map(elem => elem.nume_ro).filter(elem => elem !== formData.value.culoare_ro)
        namesEn.value = ineleColors.map(elem => elem.nume_en).filter(elem => elem !== formData.value.culoare_en)
    }
}


async function deleteImage() {
    if(formData.value.imageJustAdded === true){
        URL.revokeObjectURL(formData.value.presignedUrl)
        formData.value.presignedUrl = 'empty'
        formData.value.image = null
        formData.value.caleRelativa = null;
    }else{
        const deleteImageResponse = await adminService.deleteInelImage(encodedIdInel);
        if(deleteImageResponse === 1){
            fireAlarm('success' , 'Succes' , 'Ati sters cu succes imaginea' , null);
            URL.revokeObjectURL( formData.value.presignedUrl )
            formData.value.presignedUrl = 'empty'; // Clear the image URL to allow file upload
            formData.value.caleRelativa = null
        
        }else if(deleteImageResponse === -3){
            fireAlarm('warning' , "Atentie" , "Tipul de inel este folosit de un client intr-o sesiune de cumparat" , null)
            return
        }else if(deleteImageResponse === -1){
            store.snackbarMessage('Token-ul a expirat, ati fost delogat')
            navigateTo('/user/logout')
        }else{
            fireAlarm('error' , 'Eroare' , 'O eroare a avut loc la stergerea imaginii' , null);
        }
    }
}

// Handle saving material modifications, including image upload
async function saveIneleModification(){
    fireAlarm('info', 'Salvare...', 'Asteptati...', true);
    const isValidForm = await ineleForm.value.validate();
    if(isValidForm.valid){
        const modifiedInel = {
            culoareInelDto: formData.value.culoareInelDto,
            culoareInelJsonDto : {
                culoare_ro : formData.value.culoare_ro,
                culoare_en : formData.value.culoare_en,
            },
            presignedUrl:  formData.value.presignedUrl,
            caleRelativa: formData.value.caleRelativa
        };
    

        if(JSON.stringify(modifiedInel) === JSON.stringify(originalInel.value)){
            console.log('aici')
            fireAlarm('info' , 'Atentie' , 'Nu ati modificat nimic' , null)
            return
        }else{
            const form = new FormData();
    
            form.append('modifiedInel', JSON.stringify(modifiedInel))
            
            // Append the image file if it exists
            if (formData.value.image) {
                form.append('image', formData.value.image);
            }else{
                form.append('image' , null);
            }


            const response = await adminService.updateOrAddInel(encodedIdInel, form);
            console.log(response)
            
            if (response === 1) {
                swal.close();
                fireAlarm('success', 'Succes', 'Inelul a fost actualizat cu succes', null);
                originalInel.value = modifiedInel
            }else if(response === 0){
                swal.close();
                fireAlarm('warning' , "Atentie" , "Tipul de inel este folosit de un client intr-o sesiune de cumparat" , null)
                return
            } else if (response === -1) {
                swal.close();
                store.snackbarMessage('Token-ul a expirat, ati fost delogat');
                navigateTo('/user/logout');
            } else if(response === -3){
                swal.close();
                fireAlarm('error', 'Eroare', 'Numele imaginii este acelasi cu alta imagine. Schimbati numele imaginii', null);
            }else {
                swal.close();
                fireAlarm('error', 'Eroare', 'O eroare a avut loc', null);
            }

        }
    }else{
        fireAlarm('error' , 'Eroare' , 'Verificati formularul din nou' , null)
        return;
    }
    
}

onBeforeMount(async () => {
   await getCurrentInel();
   await getIneleColors();
});
</script>
