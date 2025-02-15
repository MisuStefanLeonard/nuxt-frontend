<template>
    <div class="bg-grey-darken-4 p-2">
        <v-container fluid class="text-center">
            <p class="font-weight-light h3 p-2 m-2">Adauga o noua manopera</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
            <v-container fluid class="text-center">
                <v-form ref="manoperaForm" validate-on="input"  class="bg-grey-lighten-3 text-center">
                    <v-row class="p-2 m-2">
                        <v-col cols="12">
                            <v-text-field
                                v-model="numeManoperaDto"
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
                                v-model="nrTotalMetri"
                                :rules="[rules.nonEmpty, rules.numeric]"
                                label="Numar total metri (material)"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                :items="options.rejanseDisponibile"
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
                        <v-col cols="12" v-if="Object.keys(selectedRejansa).length > 0 && selectedRejansa.numeTipRejansa !== '-' ">
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
                                :items="options.ineleDisponibile"
                                :rules="[rules.required]"
                                item-title="numeTipInel"
                                :item-value="item => item"
                                label="Alege inelul de prindere"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                                v-model="selectedRingType"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" v-if="Object.keys(selectedRingType).length > 0 && selectedRingType.numeTipInel !== '-' ">
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
                                :items="options.cusaturiLiniiDisponibile"
                                :rules="[rules.required]"
                                item-title="numeTipCusaturaColt"
                                :item-value="item => item"
                                label="Alege tipul cusaturii de colt"
                                variant="outlined"
                                color="black"
                                class="p-2 m-1"
                                v-model="selectedLiningType"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" v-if="Object.keys(selectedLiningType).length > 0 && selectedLiningType.numeTipCusaturaColt !== '-' ">
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
                    :append-icon="mdiContentSave"
                    @click="saveNewManopera"
                >
                    Adauga
                </v-btn>
            </v-container>
        </v-container>
    </div>
</template>

<script setup>
import { mdiContentSave } from '@mdi/js';
import { ref } from 'vue';
import adminService from '~/services/Admin';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

const swal = useNuxtApp().$swal;
const manoperaForm = ref(null);
const options = ref({})

const numeManoperaDto = ref('')
const nrTotalMetri = ref(0)
const selectedRejansa = ref({
    numeTipRejansa : '-'
})
const selectedRingType = ref({
    numeTipInel : '-'
})
const selectedLiningType = ref({
    numeTipCusaturaColt : '-'
})

const rules = {
  maxLen: (v) => (v && v.length <= 70) || "Maxim 70 caractere.",
  required:(v) => (v !== null &&
     v !== undefined && 
     v !== "-" && 
     Object.keys(v).length > 0 ) || "Acest câmp este obligatoriu.",
  numeric: (v) => /^[0-9]+(\.[0-9]+)?$/.test(v) || "Introduceți un număr valid (e.g. 2, 3, 3.5, 2.5).",
  nonEmpty: (v) => (v && String(v).trim().length > 0) || "Acest câmp nu poate fi gol.",
  checkManoperaName: (v) => {
    if(options.value.numeManopereFolosite){
        let isNameUsed = options.value.numeManopereFolosite.find(name => name.toLowerCase() === String(v).toLowerCase())
        if(isNameUsed === undefined){
            return true
        }
        return 'Numele de manopera exista deja. Alegeti altul.';
    }
    
  }
};

const getManopereOptions = (async () => {
    const optionsReponse = await adminService.getManopereOptions()
    options.value = optionsReponse;
    console.log(options.value)
    if(options.value.rejanseDisponibile?.length > 0){
        selectedRejansa.value = options.value.rejanseDisponibile[0]
    }
    if(options.value.ineleDisponibile?.length > 0){
        if(selectedRejansa.value.sePrindeCuInele === true){ 
            selectedRingType.value = options.value.ineleDisponibile[0]
            
        }
    }
    if(options.value.cusaturiLiniiDisponibile?.length > 0){
        selectedLiningType.value = options.value.cusaturiLiniiDisponibile[0]
    }
})



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



async function saveNewManopera() {
    fireAlarm('info', 'Salvare...', 'Asteptati...', true);
    const manoperaDto = {
        numeManopera: numeManoperaDto.value,
        tipInel: selectedRingType.value?.numeTipInel !== '-' ? {
            numeTipInel: selectedRingType.value.numeTipInel,
            caleRelativa: selectedRingType.value.caleRelativa,
            presignedUrl: selectedRingType.value.presignedUrl
        } : null,
        tipGalerie: {
            numeTipRejansa: selectedRejansa.value.numeTipRejansa,
            pretTipRejansa: selectedRejansa.value.pretTipRejansa,
            incretireRejansa: selectedRejansa.value.incretireRejansa,
            presignedUrl: selectedRejansa.value.presignedUrl,
            caleRelativa: selectedRejansa.value.caleRelativa,
            sePrindeCuInele: selectedRejansa.value.sePrindeCuInele
        },
        tipLinie: {
            numeTipCusaturaColt: selectedLiningType.value.numeTipCusaturaColt,
            pretTipCusaturaColt: selectedLiningType.value.pretTipCusaturaColt,
            caleRelativa: selectedLiningType.value.caleRelativa,
            presignedUrl: selectedLiningType.value.presignedUrl
            
        },
        metruTotalFolosit: parseFloat(nrTotalMetri.value),
        numeDeManopere: options.value.numeManopereFolosite, 
        optiuniDisponibile: options.value.optiuniDisponibile 
    };
    const isValid = await manoperaForm.value.validate();
    if(isValid.valid){
        const form = new FormData();
        form.append('manoperaUpdated', JSON.stringify(manoperaDto));

        const response = await adminService.updateOrAddManopera('0' , false , form);
        console.log(response)
        if (response === 0) {
            fireAlarm('success', 'Succes', 'Manopera fost adaugata cu succes', null);
            navigateTo('/admin/manopere')
        } else {
            fireAlarm('error', 'Eroare', 'O eroare a avut loc la adaugarea manoperei', null);
        }

    }else{
        fireAlarm('error' , 'Eroare' , 'Verificati formularul' , null);
        return
    }
}

onBeforeMount(async () => {
    await getManopereOptions();
})
</script>
