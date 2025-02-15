<template>
    <v-app>
        <AdminNavDrawerOnClient
            v-if="clientData.emailDto && encodedIdAccountDto"
            :email-dto="clientData.emailDto"
            :encoded-id-account-dto="encodedIdAccountDto"
        ></AdminNavDrawerOnClient>
        
        <v-main class="bg-grey-darken-3">
            <v-container fluid>
                <v-container class="p-2" fluid>
                    <p class="h3 font-weight-light">Adresele clientului</p>
                </v-container>

                <v-divider></v-divider>

                <v-container fluid class="w-100 p-2">
                    <v-alert variant="tonal" type="info" class="text-left">
                        <p>Aici puteti gasii adresele clientului, 
                        cele de facturare, cat si cele de livrare.
                        Le puteti modifica sau le puteti sterge.</p>
                    </v-alert>
                    <v-alert variant="tonal" type="warning" class="text-left">
                        <p class="text-center font-weight-bold">ADRESE LIVRARE INFORMATII</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiMapMarkerOff"></v-icon> inseamna
                        ca acestea au fost comenzi aferente adreselor</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiMapMarker"></v-icon> inseamna ca
                        Nu au nicio adresa</p>
                    </v-alert>
                    <v-alert variant="tonal" type="warning" class="text-left">
                        <p class="text-center font-weight-bold">ADRESE FACTURARE INFORMATII</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiFileDocumentMinusOutline"></v-icon> inseamna
                        ca acestea au comenzi aferente adresei.</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiFileDocumentOutline"></v-icon> inseamna ca
                        inca nu au comenzi asupra lor</p>
                    </v-alert>
                    <v-alert variant="tonal" type="info" class="text-center">
                        <p class="font-weight-bold h5">LA FINAL , NU UITATI SA SALVATI!</p>
                    </v-alert>
                </v-container>
                <v-container class="w-100" fluid >
                    <v-sheet elevation="24" rounded class="p-3 mt-4 " color="grey-darken-4">
                    <v-row class="text-center">
                        <v-col cols="12">
                            <p class="font-weight-light h3">Livrare</p>
                            <v-divider opacity="100"></v-divider>
                            <div v-if="deliveryAddresses.length > 0">
                                <v-card 
                                v-for="(address, index) in deliveryAddresses" 
                                :key="index" class="rounded-xl my-3 p-2 bg-grey-darken-3 position-relative">
                                    <v-card-title>
                                        <div class="ribbon" v-if="address.isDeletedDto === true" >Stearsa</div>
                                        <div>
                                           
                                            <v-icon v-if="address.isDeletedDto === false" :icon="mdiMapMarker">
                                              
                                            </v-icon>
                                            <v-icon :icon="mdiMapMarkerOff" v-else >
                                              
                                            </v-icon>
                                        </div>
                                        <v-divider></v-divider>
                                        <p class="font-weight-light h6 mb-2">Nume adresa: {{ address.aliasDto }}</p>
                                    </v-card-title>
                                   
                                    <v-card-text>
                                        <p class="font-weight-light h6 mb-2">Bloc: {{ address.blocDto }} - Nr bloc: {{ address.nrBlocDto }}</p>
                                        
                                        <p class="font-weight-light h6 mb-2">Strada :{{ address.stradaDto }} - Nr strada:  {{ address.nrStradaDto }}</p>
                                        
                                        <p class="font-weight-light h6 mb-2">Oras: {{ address.orasDto }} - Judet: {{ address.judetDto }}</p>
                                        
                                        <p class="font-weight-light h6 mb-2">Cod postal: {{ address.codPostalDto }}</p>
                                    </v-card-text> 
                                    <v-card-actions>
                                        <v-container>
                                            <v-btn color="primary" @click="openModifyDialog(address)" variant="flat" 
                                            class="mx-2">
                                                Modifica 
                                            </v-btn>
                                            <!-- <v-btn :color="address.isDeletedDto === true ? 'green' : 'red'" @click="modifyAddressState(address.isDeletedDto, address.aliasDto,address.tipAdresaDto)" variant="flat">
                                               <template v-if="address.isDeletedDto === true">
                                                    Activeaza
                                               </template>
                                               <template v-else>
                                                    Dezactiveaza
                                               </template>
                                            </v-btn> -->
                                        </v-container>
                                    </v-card-actions>   
                                </v-card>
                            </div>
                            <div v-else>
                                <v-card class="bg-grey-darken-3 rounded-xl">
                                    <v-card-title class="text-center">
                                        <p class="font-weight-bold h6">Clientul nu are adrese de livrare salvate!</p>
                                    </v-card-title>
                                </v-card>
                            </div>
                            
                        </v-col>

                        <v-divider  opacity="100"></v-divider>

                        <v-col cols="12">
                            <p class="font-weight-light h3">Facturare</p>
                            <div v-if="billingAddresses.length > 0">
                                <v-card 
                                v-for="(address, index) in billingAddresses" 
                                :key="index" class="rounded-xl my-3 p-2 bg-grey-darken-3">
                                    <v-card-title>
                                       
                                        <div v-if="address.isDeletedDto === true" class="ribbon">Comanda</div>
                                        <p>
                                            <v-icon v-if="address.isDeletedDto === false" :icon="mdiFileDocumentOutline">
                                                  
                                            </v-icon>
                                            <v-icon v-else :icon="mdiFileDocumentMinusOutline">
                                                  
                                            </v-icon>
                                        </p>
                                        <v-divider></v-divider>
                                        <p class="font-weight-light h6 mb-2">Nume adresa: {{ address.aliasDto }}</p>
                                    </v-card-title>
                                    
                                    <v-card-text>
                                        <p class="font-weight-light h6 mb-2">Bloc: {{ address.blocDto }} - Nr bloc: {{ address.nrBlocDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Strada :{{ address.stradaDto }} - Nr strada:  {{ address.nrStradaDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Oras: {{ address.orasDto }} - Judet: {{ address.judetDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Cod postal: {{ address.codPostalDto }}</p>
                                        <p class="font-weight-bold h6 mb-2">Date firma</p>
                                        <p class="font-weight-light h6 mb-2">Nume firma: {{ address.numeFirmaDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Cif: {{ address.cifDto }}</p>

                                    </v-card-text>
                                    <v-card-actions>
                                        <v-container>
                                            <v-btn color="primary" @click="openModifyDialog(address)" variant="flat" 
                                            class="mx-2">
                                                Modifica 
                                            </v-btn>
                                            <v-btn :color="address.isDeletedDto === true ? 'green' : 'red'" @click="modifyAddressState(address.isDeletedDto , address.aliasDto,address.tipAdresaDto)" variant="flat">
                                               <template v-if="address.isDeletedDto === true">
                                                    Activeaza
                                               </template>
                                               <template v-else>
                                                    Dezactiveaza
                                               </template>
                                            </v-btn>
                                        </v-container>
                                    </v-card-actions> 
                                </v-card>
                            </div>
                            <div v-else>
                                <v-card class="bg-red rounded-xl">
                                    <v-card-text class="text-center">
                                        <p class="font-weight-bold h6">Clientul nu are adrese de facturare salvate!</p>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                </v-sheet>
                <v-dialog  v-model="showDialog" max-width="600px" persistent style="z-index: 999;">
                    <v-form ref="addressForm"  class="bg-grey-darken-4 text-center overflow-auto" >
                        <v-icon color="white" @click="closeModifyDialog()" class="p-2 m-2" :icon="mdiCloseCircle">
                        </v-icon>
                        <p class="font-weight-light h3 text-center my-2 p-2">Modifica adresa</p>
                        <div v-for="(data) in filteredDataForm" :key="data.label">
                        <v-text-field
                            v-if="notSelectables(data.model)"
                            :label="data.label"
                            :placeholder="data.placeholder"
                            :type="data.type"
                            :counter="data.counter"
                            :disabled="data.isDisabled"
                            v-model="addressToSaveToDb[data.model]"
                            :rules="data.rules"
                            class="px-4 pt-2"
                        ></v-text-field>

                        <v-select
                            v-else-if="data.model === 'tipAdresaDto'"
                            :label="data.label"
                            v-model="addressToSaveToDb[data.model]"
                            :items="data.options"
                            :rules="data.rules"
                            class="px-4"
                        ></v-select>

                        <v-text-field 
                            v-else
                            :label="data.label"
                            :placeholder="data.placeholder"
                            :rules="data.rules"
                            v-model="addressToSaveToDb[data.model]"
                            class="px-4 pt-2"
                        ></v-text-field>
                        </div>
                        <v-container >
                            <v-btn rounded="xl"  type="button" @click="modifyAddress(addressToSaveToDb)" color="success" variant="flat" 
                                class="font-weight-bold bg-grey-lighten-3  text-center">
                                Salveaza adresa
                                <v-icon class="pl-2">mdi-content-save</v-icon>
                            </v-btn>
                        </v-container>
                        
                    </v-form>
                </v-dialog>
                </v-container>
                <v-container class="text-center">
                    <v-btn @click="saveChanges()" color="success" variant="flat" class="p-2">
                        Salveaza
                        <v-icon class="pl-2" :icon="mdiContentSave"></v-icon>
                    </v-btn>
                </v-container>
                
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import { useUserStore } from '~/store/user';
import adminService from '~/services/Admin'
import AdminNavDrawerOnClient from '~/components/admin/AdminNavDrawerOnClient.vue';
import { mdiCloseCircle, mdiContentSave, mdiFileDocumentMinusOutline, mdiFileDocumentOutline, mdiMapMarker, mdiMapMarkerOff } from '@mdi/js';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

// Initialize the store and route information
const route = useRoute();
const router = useRouter();
const store = useUserStore();
const swal = useNuxtApp().$swal
const encodedIdAccountDto = route.params.encodedIdContDto;


// Reactive references to hold client data and addresses
const originalClientData = ref({})
const clientData = ref({});
const deliveryAddresses = ref([]);
const billingAddresses = ref([]);
const dummyParam = ref(0)

//
const showDialog = ref(false);
const addressForm = ref(null);

// Watch store data and update the client data
watchEffect(() => {
    clientData.value = store.getDataPassed;

    // Separate addresses based on their type
    if (clientData.value.adreseClient) {
        deliveryAddresses.value = clientData.value.adreseClient.filter(
            address => address.tipAdresaDto === 'Livrare'
        );
        billingAddresses.value = clientData.value.adreseClient.filter(
            address => address.tipAdresaDto === 'Facturare'
        );
    }
});

const openModifyDialog = ((address) => {
    addressToSaveToDb.value = {...address}
    showDialog.value = true;
})

const closeModifyDialog = (() => {
    // nu se afieaza
    
    swal.fire({
        title: "Ati salvat modificarile?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Da",
        denyButtonText: `Nu`
        }).then((result) => {
        if (result.isConfirmed) {
            showDialog.value = false;
        } else if (result.isDenied) {
            return;
        }
    });
   

})

const modifyAddress = ((currentAddressToModify) => {
    let indexOfAddressToModify = 
        clientData.value.adreseClient.findIndex(address => address.aliasDto === currentAddressToModify.aliasDto);

    if(indexOfAddressToModify === -1){
        fireTopEndAlarm(`Adresa cu numele ${currentAddressToModify.aliasDto} nu a fost gasita. Dati un refresh.` , 'error' , false)
        return;
    }

    clientData.value.adreseClient[indexOfAddressToModify] = {...currentAddressToModify}
    swal.fire({
        position: "top-end",
        icon: "success",
        title: "Adresa modificata cu success",
        showConfirmButton: false,
        timer: 2000
    });
})

function fireTopEndAlarm(title , icon  , showConfirmButton){
    swal.fire({
        position: "top-end",
        icon: icon,
        title: title,
        showConfirmButton: showConfirmButton,
        timer: 3000
    });
}


const modifyAddressState = (async (addressState, alias , tipAdresa) => {
    
    let indexOfAddressToModify = 
        clientData.value.adreseClient.findIndex(address => address.aliasDto === alias 
        && address.tipAdresaDto === tipAdresa);
    console.log(clientData.value.adreseClient[indexOfAddressToModify])
    if(indexOfAddressToModify === -1){
        fireTopEndAlarm(`Adresa cu numele ${alias} nu a fost gasita. Dati un refresh.` , 'error' , false)
        return;
    }
    const response = await adminService.modifyAddressActivationState(alias,addressState,tipAdresa,encodedIdAccountDto);
    console.log(response)
    if(response === 1){
        fireTopEndAlarm(`Adresa ${addressState === true ? 'activata' : 'dezactivata'} cu success` , 'success' , false)
        clientData.value.adreseClient[indexOfAddressToModify].isDeletedDto = !addressState
        originalClientData.value = JSON.parse(JSON.stringify(clientData.value))
        clientData.value = {...originalClientData.value}
        store.setAccountData(clientData.value);
        store.setOriginalAccountData(originalClientData.value)
        return
    }else if(response === -4){
        fireTopEndAlarm(`Adresa cu numele ${alias} nu a fost gasita. Dati un refresh.` , 'error' , false)
        return
    }else{
        fireTopEndAlarm(`O eroare a avut loc la modificarea starii adresei.` , 'error' , false)
        return
    }
})


const saveChanges = (async () => {
    let form = new FormData()
    form.append('updatedAddresses' , JSON.stringify(clientData.value))
    const responseFromSavingTheAddresses = await adminService.saveAddressChanges(form);

    if(responseFromSavingTheAddresses === 1){
        fireTopEndAlarm(`Adrese salvate cu succes!` , 'success' , false)
        return;
    }else{
        fireTopEndAlarm(`O eroare a avut loc! Dati refresh la pagina` , 'error' , false)
        return;
    }
})


// form detalis for address modifying
const addressToSaveToDb = ref({
  aliasDto: '',
  tipAdresaDto: '',
  blocDto: '',
  nrBlocDto: '',
  stradaDto: '',
  nrStradaDto: '',
  orasDto: '',
  judetDto: '',
  codPostalDto: '',
  cifDto: '',
  numeFirmaDto: ''
})

const validationRules = {
  required: v => !!v || 'This field is required',
  maxLength: (length) => v => !v || v.length <= length || `Maximum length is ${length} characters`,
  exactLength: (length) => v => !v || v.length == length || `Must be exactly ${length} characters`,
  onlyNumbers: v => /^[0-9]+$/.test(v) || 'Only numbers are allowed',
};

const dataForm = [
  {
    label: 'Alias',
    placeholder: '',
    type: 'text',
    isDisabled: true,
    model: 'aliasDto',
    rules: [validationRules.required, validationRules.maxLength(20)],
    counter: 20
  },
  {
    label: 'Tip adresa',
    placeholder: '',
    type: 'text',
    model: 'tipAdresaDto',
    options: ['Livrare', 'Facturare'],
    rules: [validationRules.required],
    counter: null // No counter needed for selection fields
  },
  {
    label: 'Bloc',
    placeholder: '',
    type: 'text',
    model: 'blocDto',
    rules: [validationRules.maxLength(10)],
    counter: 10
  },
  {
    label: 'Numar bloc',
    placeholder: '',
    type: 'text',
    model: 'nrBlocDto',
    rules: [validationRules.maxLength(7)],
    counter: 7
  },
  {
    label: 'Strada',
    placeholder: '',
    type: 'text',
    model: 'stradaDto',
    rules: [validationRules.required, validationRules.maxLength(30)],
    counter: 30
  },
  {
    label: 'Numar strada',
    placeholder: '',
    type: 'text',
    model: 'nrStradaDto',
    rules: [validationRules.required, validationRules.maxLength(5)],
    counter: 5
  },
  {
    label: 'Oras',
    placeholder: '',
    type: 'text',
    model: 'orasDto',
    rules: [validationRules.required, validationRules.maxLength(20)],
    counter: 20
  },
  {
    label: 'Judet',
    placeholder: '',
    type: 'text',
    model: 'judetDto',
    rules: [validationRules.required, validationRules.maxLength(15)],
    counter: 15
  },
  {
    label: 'Cod postal',
    placeholder: '',
    type: 'text',
    model: 'codPostalDto',
    rules: [validationRules.required, validationRules.exactLength(6), validationRules.onlyNumbers],
    counter: 6
  },
  {
    label: 'Cif',
    placeholder: '',
    type: 'text',
    model: 'cifDto',
    rules: [validationRules.required, validationRules.onlyNumbers],
    counter: 6 // No max length defined for Cif, so no counter
  },
  {
    label: 'Nume firma/persoana juridica',
    placeholder: '',
    type: 'text',
    model: 'numeFirmaDto',
    rules: [validationRules.required, validationRules.maxLength(50)],
    counter: 50
  }
];


const filteredDataForm = computed(() => {
  return dataForm.filter(data => {
    // Only show 'cif' and 'nume_firma' fields if 'tip_adresa' is 'Facturare'
    if ((data.model === 'cifDto' || data.model === 'numeFirmaDto') && addressToSaveToDb.value.tipAdresaDto !== 'Facturare') {
      return false; // Exclude these fields if 'tip_adresa' is not 'Facturare'
    }
    return true; // Include all other fields
  });
});

const notSelectables = (currentModel) => {
  return currentModel !== 'tipAdresaDto';
}

function triggerRouteUpdate(){
    if (route.query.dummyParam) {
        // Increment the existing dummyParam value
        dummyParam.value = parseInt(route.query.dummyParam) + 1;
    } else {
        // If it doesn't exist, start with an initial value
        dummyParam.value = 1;
    }

    // Update the route with the new dummyParam value
    router.push({
        path: route.path,
        query: { ...route.query, dummyParam: dummyParam.value }
    });
}


onMounted(() => {
    triggerRouteUpdate()
    clientData.value = store.getDataPassed;
    originalClientData.value = store.getOriginalDataPassed
});


onBeforeRouteUpdate(async () => {
    if(JSON.stringify(clientData.value) === JSON.stringify(originalClientData.value)){
        return new Promise((resolve) => {
            resolve(true); // Allow navigation
        });
    }
    return new Promise(async (resolve) => {
        const updatedResponse = await adminService.getClientData(encodedIdAccountDto); 
        store.setAccountData(updatedResponse)
        store.setOriginalAccountData(updatedResponse)
        resolve(true); // Allow navigation
    });
})

onBeforeRouteLeave(() => {
    if(JSON.stringify(clientData.value) === JSON.stringify(originalClientData.value)){
        return new Promise(async (resolve) => {
            resolve(true); // Allow navigation
        });
    }
    return new Promise(async (resolve) => {
        const updatedResponse = await adminService.getClientData(encodedIdAccountDto); 
        store.setAccountData(updatedResponse)
        store.setOriginalAccountData(updatedResponse)
        resolve(true); // Allow navigation
    });
    

})


</script>

<style scoped>

.swal2-container {
  z-index: 20000 !important; /* Higher than v-dialog's default z-index */
}

.ribbon {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.8;
  padding-inline: 1lh;
  clip-path: polygon(
    100% 100%,0 100%,999px calc(100% - 999px),calc(100% - 999px) calc(100% - 999px));
  transform: translate(calc((1 - cos(45deg))*100%), -100%) rotate(45deg);
  transform-origin: 0% 100%;
  background-color: red; /* the main color  */
}

</style>
