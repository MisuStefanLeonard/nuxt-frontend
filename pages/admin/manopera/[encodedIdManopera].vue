<template>
    <div class="bg-grey-darken-4 p-2">
        <v-container fluid class="text-center">
            <p class="font-weight-light h3 p-2 m-2">Modifica manopera</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
            <v-alert type="warning" variant="tonal">
                <p class="font-weight-light h4 p-2 m-2">La final nu uitati sa salvati!</p>

            </v-alert>
            <v-container fluid class="text-center">
                <v-form ref="manoperaForm" validate-on="input"  class="bg-grey-lighten-3 text-center">
                    <v-row class="p-2 m-2" v-if="manoperaData.optiuniDisponibile">
                        <v-col cols="12">
                            <v-text-field
                                v-model="manoperaData.numeManopera"
                                :rules="[rules.nonEmpty,rules.checkManoperaName,rules.maxLen]"
                                label="Nume manopera"
                                placeholder="Numele manoperei"
                                counter="70"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="manoperaData.metruTotalFolosit"
                                :rules="[rules.nonEmpty, rules.numeric]"
                                label="Numar total metri (material)"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select 
                                :items="manoperaData.optiuniDisponibile.rejanseDisponibile"
                                :rules="[rules.required]"
                                item-title="numeTipRejansa"
                                
                                :item-value="item => item"
                                label="Alege cusatura galeriei"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                                v-model="selectedRejansa"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" v-if="selectedRejansa && Object.keys(selectedRejansa).length > 0 && selectedRejansa.numeTipRejansa !== '-' ">
                            <v-card class="bg-grey-darken-4 p-2">
                                <v-alert type="info" variant="tonal">
                                    <p class="font-weight-light h6">Se afiseaza informatii despre rejansa <b class="text-white">{{ selectedRejansa.numeTipRejansa }}</b></p>
                                </v-alert>
                                <v-card-title class="font-weight-light">
                                    {{ selectedRejansa.numeTipRejansa }}
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="6">
                                            <p class="font-weight-light h6">Nume rejansa: {{ selectedRejansa.numeTipRejansa }}</p>
                                            <p class="font-weight-light h6">Incretire rejansa: {{ selectedRejansa.incretireRejansa }}</p>
                                        </v-col>
                                        <v-col cols="6">
                                            <p class="font-weight-light h6">Pret manopera : {{ selectedRejansa.pretTipRejansa }} RON/METRU</p>
                                            <p class="font-weight-light h6">Prindere inele: {{ selectedRejansa.sePrindeCuInele === true ? 'Da' : 'Nu' }}</p>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col cols="12">
                                            <p class="font-weight-light h5 text-center mb-2 pb-1">Imagine</p>
                                            <v-img v-if="selectedRejansa.presignedUrl !== 'empty'"
                                            eager
                                            :aspect-ratio="16 / 5"
                                            :src="selectedRejansa.presignedUrl"
                                            >

                                            </v-img>
                                            <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Aceasta rejansa nu are imagine asociata.</p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" v-if="selectedRejansa.sePrindeCuInele === true">
                            <v-select
                                :items="manoperaData.optiuniDisponibile.ineleDisponibile"
                                :rules="[rules.required]"
                                item-title="numeTipInel"
                                @change="changeRingType"
                                :item-value="item => item"
                                label="Alege inelul de prindere"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                                v-model="selectedRingType"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" v-if="selectedRingType && Object.keys(selectedRingType).length > 0 &&  selectedRingType.numeTipInel !== '-'   ">
                            <v-card class="bg-grey-darken-4 p-2">
                                <v-alert type="info" variant="tonal">
                                    <p class="font-weight-light h6">Se afiseaza informatii despre inelul de prindere <b class="text-white">{{ selectedRingType.numeTipInel }}</b></p>
                                </v-alert>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <p class="font-weight-light h6">Culoare inel: {{ selectedRingType.numeTipInel }}</p>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col cols="12">
                                            <p class="font-weight-light h5 text-center mb-2 pb-1">Imagine</p>
                                            <v-img v-if="selectedRingType.presignedUrl !== 'empty'"
                                            eager
                                            :aspect-ratio="16 / 5"
                                            :src="selectedRingType.presignedUrl"
                                            >

                                            </v-img>
                                            <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Acest inel de prindere nu are imagine asociata.</p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                :items="manoperaData.optiuniDisponibile.cusaturiLiniiDisponibile"
                                :rules="[rules.required]"
                                @change="changeLiningType"
                                item-title="numeTipCusaturaColt"
                                :item-value="item => item"
                                label="Alege tipul cusaturii de colt"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                                v-model="selectedLiningType"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" v-if="selectedLiningType && Object.keys(selectedLiningType).length > 0 && selectedLiningType.numeTipCusaturaColt !== '-' ">
                            <v-card class="bg-grey-darken-4 p-2">
                                <v-alert type="info" variant="tonal">
                                    <p class="font-weight-light h6">Se afiseaza informatii despre cusatura de linie <b class="text-white">{{ selectedLiningType.numeTipCusaturaColt }}</b></p>
                                </v-alert>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <p class="font-weight-light h6">Nume tip cusatura colt: {{ selectedLiningType.numeTipCusaturaColt }}</p>
                                            <p class="font-weight-light h6">Pret manopera: {{ selectedLiningType.pretTipCusaturaColt }} RON/METRU</p>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col cols="12">
                                            <p class="font-weight-light h5 text-center mb-2 pb-1">Imagine</p>
                                            <v-img  v-if="selectedLiningType.presignedUrl !== 'empty'"
                                            eager
                                            :aspect-ratio="16 / 5"
                                            :src="selectedLiningType.presignedUrl"
                                            >

                                            </v-img>
                                            <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Aceasta cusatura de colt nu are imagine asociata.</p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
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
                    @click="modifyManopera"
                >
                    Salveaza
                </v-btn>
            </v-container>
        </v-container>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import adminService from '~/services/Admin';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

const swal = useNuxtApp().$swal;
const manoperaForm = ref(null);
const encodedIdManopera = useRoute().params.encodedIdManopera
const manoperaData = ref({});
const oldManoperaData = ref({});


const selectedRejansa = ref({
    numeTipRejansa: '-', // Name of the rejansa
    incretireRejansa: 0, // Gathering/pleating ratio
    pretTipRejansa: 0, // Price per meter
    presignedUrl: '', // Image URL
    caleRelativa: '', // Relative path
    sePrindeCuInele: false // Whether it requires rings
});

const selectedRingType = ref({
    numeTipInel: '-', // Name of the ring type
    presignedUrl: '', // Image URL
    caleRelativa: '' // Relative path
});

const selectedLiningType = ref({
    numeTipCusaturaColt: '-', // Name of the lining type
    pretTipCusaturaColt: 0, // Price per meter
    presignedUrl: '', // Image URL
    caleRelativa: '' // Relative path
});


const rules = {
  maxLen: (v) => (v && v.length <= 70) || "Maxim 70 caractere.",
  required:(v) => (v !== null &&
     v !== undefined &&  
     Object.keys(v).length > 0 ) || "Acest câmp este obligatoriu.",
  numeric: (v) => /^[0-9]+(\.[0-9]+)?$/.test(v) || "Introduceți un număr valid (e.g. 2, 3, 3.5, 2.5).",
  nonEmpty: (v) => (v && String(v).trim().length > 0) || "Acest câmp nu poate fi gol.",
  checkManoperaName: (v) => {
    if(manoperaData.value.optiuniDisponibile.numeManopereFolosite){
        let isNameUsed = manoperaData.value.optiuniDisponibile.numeManopereFolosite.find(name => name.toLowerCase() === String(v).toLowerCase() && name.toLowerCase() !== oldManoperaData.value.numeManopera)
        if(isNameUsed === undefined){
            return true
        }
        return 'Numele de manopera exista deja. Alegeti altul.';
        }
    }
    
};

const changeRejansaType = (() => {
    manoperaData.value.tipGalerie = selectedRejansa.value 
})

watch(selectedRejansa, (newValue) => {
    console.log('Selected Rejansa Changed:', newValue);
    changeRejansaType();
});

const changeRingType = (() => {
    manoperaData.value.tipInel = selectedRingType.value  
})

watch(selectedRingType, (newValue) => {
    console.log('Selected Ring Type Changed:', newValue);
    changeRingType();
});

const changeLiningType = (() => {
    manoperaData.value.tipLinie = selectedLiningType.value  
})

watch(selectedLiningType, (newValue) => {
    console.log('Selected Lining Type Changed:', newValue);
    changeRingType();
});

function fireAlarm(icon, title, text, isLoading) {
    if (isLoading === null) {
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 3000,
            showConfirmButton: true
        });
        return;
    } else {
        swal.fire({
            icon: 'info',
            title: 'Loading...',
            text: 'Asteptati...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                swal.showLoading();
            }
        });
        return;
    }
}

const getManoperaData = (async () => {
    fireAlarm('info', 'Informatie', 'Asteptati...', true);
    const responseWithManoperaData = await adminService.getManopera(encodedIdManopera)
    console.log(responseWithManoperaData)
    if(responseWithManoperaData.status === 200){
        swal.close()
        manoperaData.value = responseWithManoperaData.message;
        oldManoperaData.value = JSON.parse(JSON.stringify(manoperaData.value))
        selectedRejansa.value = manoperaData.value.tipGalerie
        selectedRingType.value = manoperaData.value.tipInel
        selectedLiningType.value = manoperaData.value.tipLinie
    }else if(responseWithManoperaData.status === 404){
        swal.close()
        fireAlarm('error', 'Eroare', 'Manopera nu mai exista in baza de date', null);
        navigateTo('/admin/manopere')
    }else{
        swal.close()
        fireAlarm('error', 'Eroare generala', 'O eroare generala a avut loc. Dati un refresh sau contactati administratorul', null);
    }
})



async function modifyManopera() {
    fireAlarm('info', 'Salvare...', 'Asteptati...', true);
    const isValid = await manoperaForm.value.validate();
    if(isValid.valid){
        if(JSON.stringify(manoperaData.value) === JSON.stringify(oldManoperaData.value)){
            fireAlarm('info' , 'Atentie!' , 'Nu ati modificati nimic.' , null)
            return;
        }
        const form = new FormData();
        form.append('manoperaUpdated', JSON.stringify(manoperaData.value));

        const response = await adminService.updateOrAddManopera(encodedIdManopera , true , form);
        console.log(response)
        if (response === 1) {
            fireAlarm('success', 'Succes', 'Manopera fost modificata cu succes', null);
            oldManoperaData.value = JSON.parse(JSON.stringify(manoperaData.value));
        }else if(response === -4){
            fireAlarm('error' , 'Eroare' , 'Un tip de galerie / Un tip de cusatura la colt / Un tip de inel de prindere nu mai exista. Va rog dati un refresh.' , null)
            return;
        }
         else {
            fireAlarm('error', 'Eroare', 'O eroare a avut loc la modificarea manoperei.Dati un refresh sau contactati administratorul', null);
        }

    }else{
        fireAlarm('error' , 'Eroare' , 'Verificati formularul' , null);
        return
    }
}

onBeforeMount(async () => {
    await getManoperaData();
})
</script>
