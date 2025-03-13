<template>
    <div class="bg-grey-darken-4 p-2">
        <v-container fluid class="text-center">
            <p class="font-weight-light h3 p-2 m-2">Modifica cusatura galeriei</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>

            <!-- Form Section -->
            <v-container fluid class="text-center">
                <v-form ref="tipGalerieForm" class="bg-grey-lighten-3 text-center ">
                    <v-row class="p-2 m-2">
                        <!-- Loop through fields and render specific components based on type -->
                        <v-col v-for="(field, index) in tipGalerieFormData" :key="index" cols="12">
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
                                    show-size
                            >
                            </v-file-input>
                            <v-checkbox v-if="field.type === 'checkbox'"
                                v-model="formData[field.model]"
                                :label="field.label"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1" >

                            </v-checkbox>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>

            <!-- Image Section -->
            <v-container fluid class="">
                <p class="font-weight-light h3">Imaginea cusaturii galeriei</p>
                <v-row class="p-2 m-2">
                    <v-col cols="12" class="d-flex justify-center">
                        <div v-if="formData.presignedUrl !== 'empty'">
                            <v-img
                                :src="formData.presignedUrl"
                                alt="Imaginea galerie"
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
                            <p class="font-weight-bold">Nu este imagine pentru aceasta cusatura a galeriei</p>
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
                    @click="saveTipGalerieModification"
                >
                    Salveaza
                </v-btn>
            </v-container>
        </v-container>
    </div>
</template>

<script setup>
import { mdiContentSave } from '@mdi/js';
import { ref } from 'vue';
import adminService from '~/services/Admin';
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const swal = useNuxtApp().$swal;
const route = useRoute();
const store = useUserStore();
var originalTipGalerie = ref({});
const encodedIdTipGalerieDto = route.params.encodedIdTipGalerieDto;
const tipGalerieForm = ref(null);
const namesRo = ref([])
const namesEn = ref([])



const formData = ref({
    numeTipGalerieDto: '',
    nume_ro : '',
    nume_en : '',
    pretTipGalerieDto: 0,
    incretireDto: 0,
    caleRelativa: null,
    sePrindeCuIneleDto: false,
    presignedUrl: 'empty',
    image: null, // Used for the image file
    imageJustAdded: false
});

const tipGalerieFormData = ref([
    {
        type: 'text-field',
        label: 'Nume tip galerie (Romana)',
        placeholder: 'numele tipului de galerie',
        model: 'nume_ro',
        maxLength: 30,
        rules: [
            value => !!value || 'Numele tipului de galerie nu poate fi gol',
            value => value.length <= 30 || 'Sunt permise maxim 30 de caractere',
            value => {
                let isNameUsed = namesRo.value.find(m => m === String(value).toLowerCase())
                if(isNameUsed !== undefined){
                    return 'Numele tipului de galerie exista deja'
                }
                return true
            }
        ],
    },
    {
        type: 'text-field',
        label: 'Nume tip galerie (Engleza)',
        placeholder: 'numele tipului de galerie',
        model: 'nume_en',
        maxLength: 30,
        rules: [
            value => !!value || 'Numele tipului de galerie nu poate fi gol',
            value => value.length <= 30 || 'Sunt permise maxim 30 de caractere',
            value => {
                let isNameUsed = namesEn.value.find(m => m === String(value).toLowerCase())
                if(isNameUsed !== undefined){
                    return 'Numele tipului de galerie in engleza exista deja'
                }
                return true
            }
        ],
    },
    {
        type: 'text-field',
        label: 'Pret tip galerie/metru',
        model: 'pretTipGalerieDto',
        placeholder: 'Pretul tipului de galerie pe metru',
        rules: [
            value => !!value || 'Pretul tipului de galerie nu poate fi gol',
            value =>
                !!value && /^[0-9]*\.?[0-9]+$/.test(String(value)) ||
                'Introduceți un număr valid (doar cifre și un singur punct zecimal) si fara spatii',
        ],
    },
    {
        type: 'text-field',
        label: 'Incretire',
        model: 'incretireDto',
        placeholder: 'Incretire (precizie de 1 zecimala)',
        rules: [
            value => !!value || 'Incretirea tipului de galerie nu poate fi gol',
            value =>
                !!value && /^[0-9]*\.?[0-9]+$/.test(String(value)) ||
                'Introduceți un număr valid (doar cifre și un singur punct zecimal) si fara spatii',
        ],
    },
    {
        type: 'checkbox',
        label: 'Prindere cu inele',
        model: 'sePrindeCuIneleDto',
        placeholder: '',
        rules: [
        ]
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
        console.log('e null')
        return true;
    }
    return formData.value.image?.name.length <= 100;
});

// Capture the file to be uploaded
function handleFileUpload() {
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

async function getCurrentTipGalerie() {
    fireAlarm('info', 'Loading...', 'Asteptati..', true);
    const response = await adminService.getCurrentTipGalerie(encodedIdTipGalerieDto);
    if (response === null) {
        swal.close();
        store.snackbarMessage('Aceasta cusatura a galerie nu mai exista.Dati un refresh la pagina');
        navigateTo('/admin/tipuri_galerie');
    } else if (response === -1) {
        swal.close();
        store.snackbarMessage('Token-ul a expirat , logati-va din noua');
        navigateTo('/user/logout');
    } else {
        swal.close();
        console.log(response)
        formData.value.numeTipGalerieDto = response.numeTipGalerieDto || '';
        formData.value.nume_ro = response.numeTipGalerieJsonDto.nume_ro || '';
        formData.value.nume_en = response.numeTipGalerieJsonDto.nume_en|| '';
        formData.value.pretTipGalerieDto = response.pretTipGalerieDto || 0;
        formData.value.incretireDto = response.incretireDto || 0;
        formData.value.caleRelativa = response.caleRelativa || null;
        formData.value.presignedUrl = response.presignedUrl || 'empty';
        formData.value.sePrindeCuIneleDto = response.sePrindeCuIneleDto ;

        const tipGalerieObj = {
            pretTipGalerieDto: formData.value.pretTipGalerieDto,
            incretireDto : formData.value.incretireDto,
            numeTipGalerieDto: formData.value.numeTipGalerieDto,
            numeTipGalerieJsonDto: formData.value.numeTipGalerieJsonDto,
            presignedUrl:  formData.value.presignedUrl,
            caleRelativa: formData.value.caleRelativa,
            sePrindeCuIneleDto: formData.value.sePrindeCuIneleDto
        };
        originalTipGalerie.value = JSON.parse(JSON.stringify(tipGalerieObj))
    }
}

async function getTipuriGalerieNames(){
    const tipGalerieNames = await adminService.getTipuriGalerieNames();
    if(tipGalerieNames !== null){
        namesRo.value = tipGalerieNames.map(elem => elem.nume_ro).filter(elem => elem !== formData.value.nume_ro)
        namesEn.value = tipGalerieNames.map(elem => elem.nume_en).filter(elem => elem !== formData.value.nume_en)
    }
}


async function deleteImage() {
    if(formData.value.imageJustAdded === true){
        URL.revokeObjectURL(formData.value.presignedUrl)
        formData.value.presignedUrl = 'empty'
        formData.value.image = null;
        formData.value.caleRelativa = null;
    }else{
        const deleteImageResponse = await adminService.deleteTipGalerieImage(encodedIdTipGalerieDto);
        if(deleteImageResponse === 1){
            fireAlarm('success' , 'Succes' , 'Ati sters cu succes imaginea' , null);
            URL.revokeObjectURL( formData.value.presignedUrl )
            formData.value.presignedUrl = 'empty'; // Clear the image URL to allow file upload
            formData.value.caleRelativa = null
        
        }else if(deleteImageResponse === -3){
            fireAlarm('warning' , "Atentie" , "Tipul de galerie este folosit de un client intr-o sesiune de cumparat")
            return
        }
        else if(deleteImageResponse === -1){
            store.snackbarMessage('Token-ul a expirat, ati fost delogat')
            navigateTo('/user/logout')
        }else{
            fireAlarm('error' , 'Eroare' , 'O eroare a avut loc la stergerea imaginii' , null);
        }
    }
}

// Handle saving material modifications, including image upload
async function saveTipGalerieModification(){
    fireAlarm('info', 'Salvare...', 'Asteptati...', true);
    const isValidForm = await tipGalerieForm.value.validate();
    if(isValidForm.valid){
       
        const modifiedTipGalerie = {
            pretTipGalerieDto: formData.value.pretTipGalerieDto,
            incretireDto : formData.value.incretireDto,
            numeTipGalerieDto: formData.value.numeTipGalerieDto,
            numeTipGalerieJsonDto: {
                nume_ro : formData.value.nume_ro,
                nume_en : formData.value.nume_en,
            },
            presignedUrl: formData.value.presignedUrl,
            caleRelativa: formData.value.caleRelativa ,
            sePrindeCuIneleDto: formData.value.sePrindeCuIneleDto
        };
       
        if(JSON.stringify(modifiedTipGalerie) === JSON.stringify(originalTipGalerie.value)){
            fireAlarm('info' , 'Atentie' , 'Nu ati modificat nimic' , null)
            return
        }else{
            const form = new FormData();
    
            form.append('modifiedTipGalerie', JSON.stringify(modifiedTipGalerie))
            
            // Append the image file if it exists
            if (formData.value.image) {
                form.append('image', formData.value.image);
            }else{
                form.append('image' , null);
            }


            const response = await adminService.updateOrAddTipGalerie(encodedIdTipGalerieDto, form);
            console.log(response)
            if (response === 1) {
                swal.close()
                fireAlarm('success', 'Succes', 'Cusatura galeriei a fost actualizat cu succes', null);
                originalTipGalerie.value = modifiedTipGalerie
                
            }else if(response === 0){
                swal.close()
                fireAlarm('warning' , "Atentie" , "Tipul de galerie este folosit de un client intr-o sesiune de cumparat" , null)
                return
            } else if (response === -1) {
                store.snackbarMessage('Token-ul a expirat, ati fost delogat');
                navigateTo('/user/logout');
            } else if(response === -3){
                swal.close()
                fireAlarm('error', 'Eroare', 'Numele imaginii este acelasi cu alta imagine. Schimbati numele imaginii', null);
            }else {
                swal.close()
                fireAlarm('error', 'Eroare', 'O eroare a avut loc', null);
            }

        }
    }else{
        fireAlarm('error' , 'Eroare' , 'Verificati formularul din nou' , null)
        return;
    }
    
}

onBeforeMount(async () => {
   await getCurrentTipGalerie();
   await getTipuriGalerieNames();
});
</script>
