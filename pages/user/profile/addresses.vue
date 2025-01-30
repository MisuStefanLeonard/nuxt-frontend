<template>
  <div class="background-wrapper">
    <div class="background"></div>
    <v-container class="content">
      <v-breadcrumbs>
        <v-breadcrumbs-item :to="'/user/profile'"><p class="font-weight-bold h6">{{$t('profile.PROFIL')}}</p> </v-breadcrumbs-item>
        <v-breadcrumbs-divider><p class="font-weight-bold h6">/</p></v-breadcrumbs-divider>
        <v-breadcrumbs-item disabled><p class="font-weight-bold h6">{{$t('profile.ADRESE')}}</p></v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-container class="justify-center">
      
        <v-alert v-if="infoAlert" v-model="infoAlert" type="info" closable>
          {{ $t('profile.addressesInfo') }}
        </v-alert>
      </v-container>
      <v-container class="d-block text-center">
        <p class="h3 font-weight-light text-center p-3">{{$t('profile.AccountAddreses')}}</p>
        <v-container v-if="emptyAddressListAlert" class="justify-center">
          <v-card class="bg-grey-darken-4 my-2 rounded-xl ">
            <v-card-title>
              <v-icon>
                mdi-map-marker-outline
              </v-icon>
              {{ $t('profile.emptyAddress') }}
            </v-card-title>
            <v-card-text>
              {{ $t('profile.emptyAddressListText') }}
            </v-card-text>
          </v-card>
          <v-btn :disabled="isDataFetching"  rounded="xl" @click="showFormToAddAnAddress()" type="submit" color="blue" variant="tonal" class="font-weight-bold bg-grey-lighten-3 my-4">
            {{ $t('button.addAddress') }}
            <v-icon class="pl-2">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-container>
        
        <v-container v-if="!emptyAddressListAlert && dummyBoolean" class="d-block w-sm-75 w-lg-75 h-75">
          <v-card v-for="card_item in addressesDataFromDb"
                  :key="card_item.aliasDto"
                  class="bg-grey-darken-4 my-2 rounded-xl ">
            <v-card-title class="my-2">
              <v-icon v-if="card_item.tipAdresaDto === 'Livrare'">
                mdi-map-marker-outline
              </v-icon>
              <v-icon v-else>
                mdi-file-document-plus-outline
              </v-icon>
              {{ card_item.aliasDto }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <p class="font-weight-light">{{ $t('profile.addressType') }}: {{translatedAddressType(card_item.tipAdresaDto)}}</p>
                  <p class="font-weight-light">{{ $t('profile.building') }} : {{card_item.blocDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.buildingNumber') }} : {{card_item.nrBlocDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.street') }} : {{card_item.stradaDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.streetNumber') }} : {{card_item.nrStradaDto}}</p>
                </v-col>
                <v-col cols="6">
                  <p class="font-weight-light">{{ $t('profile.city') }} : {{card_item.orasDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.county') }} : {{card_item.judetDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.postalCode') }} : {{card_item.codPostalDto}}</p>
                  <p class="font-weight-light" v-if="card_item.cifDto">{{ $t('profile.Cif') }} : {{card_item.cifDto}}</p>
                  <p class="font-weight-light" v-if="card_item.numeFirmaDto">{{ $t('profile.firmName') }} : {{card_item.numeFirmaDto}}</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-btn :disabled="isDataFetching"  @click="deleteAddress(card_item.aliasDto)" rounded="xl" type="submit" color="red" variant="tonal" class="font-weight-bold bg-grey-lighten-3 my-4 ">
              {{ $t('button.delete') }} 
              <v-icon class="pl-2">mdi-trash-can</v-icon>
            </v-btn>
          </v-card>

          <v-btn :disabled="isDataFetching" v-if="buttonShow"  rounded="xl" @click="showFormToAddAnAddress()" type="submit" color="blue" variant="tonal" class="font-weight-bold bg-grey-lighten-3 my-4">
            {{ $t('button.addAddress') }} 
            <v-icon class="pl-2">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-container>
        <v-container v-if="!emptyAddressListAlert && showFormForAddingAddress" class="d-block w-sm-75 w-lg-75">
          <v-form ref="addressForm" @submit.prevent="saveAddress()" class="bg-blue-grey-lighten-5" >
            <div v-for="(data) in filteredDataForm" :key="data.label">
              <v-text-field
                v-if="notSelectables(data.model)"
                :label="data.label"
                :placeholder="data.placeholder"
                :type="data.type"
                :counter="data.counter"
                v-model="addressToSaveToDb[data.model]"
                :rules="data.rules"
                class="px-4 pt-2"
              ></v-text-field>

              <v-select
                v-else-if="data.model === 'tip_adresa'"
                :label="data.label"
                v-model="addressToSaveToDb[data.model]"
                :items="translatedAddressTypes"
                :rules="data.rules"
                item-title="text"
                item-value="value"
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
          
            <v-btn rounded="xl"  type="submit" color="green" variant="outlined" class="font-weight-bold bg-grey-lighten-3 my-4">
              {{ $t('button.save') }} 
              <v-icon class="pl-2">mdi-content-save</v-icon>
            </v-btn>
          </v-form>
          <v-btn :disabled="isDataFetching" rounded="xl" @click="showFormToAddAnAddress()" type="submit" color="blue" variant="tonal" class="font-weight-bold bg-grey-lighten-3 my-4">
            {{ $t('button.addAddress') }} 
            <v-icon class="pl-2">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-container>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import UserService from '~/services/User'

definePageMeta({
    layout: 'default',
    middleware: 'auth',
})

const swal = useNuxtApp().$swal
const {t} = useI18n()

// Alerts and general state
const infoAlert = ref(true)
const infoAlertText = ''

const emptyAddressListAlert = ref(true)

const showFormForAddingAddress = ref(false)
const buttonShow = ref(true)
const isDataFetching = ref(false)
const addressForm = ref(null);

// Data handling
const addressesDataFromDb = ref([])
const addressToSaveToDb = ref({
  idAdresa : 0,
  alias: '',
  tip_adresa: '',
  bloc: '',
  nr_bloc: '',
  strada: '',
  nr_strada: '',
  oras: '',
  judet: '',
  codPostal: '',
  cif: '',
  nume_firma: ''
})

const dummyBoolean = ref(true)

const translatedAddressTypes = computed(() => [
  { text: t('profile.delivery'), value: 'Livrare' },
  { text: t('profile.billing'), value: 'Facturare' }
]);

const translatedAddressType = (tip_adresa) => {
  if (tip_adresa === 'Livrare') return t('profile.delivery');
  if (tip_adresa === 'Facturare') return t('profile.billing');
  return tip_adresa;
}



// Validation Rules Object
const validationRules = {
  required: v => !!v || t('textFieldsMessages.requiredRule'),
  maxLength: (length) => v => !v || v.length <= length || `${t('textFieldsMessages.maxLength')} ${length}`,
  exactLength: (length) => v => !v || v.length == length || `${t('textFieldsMessages.exactLength')} ${length}`,
  onlyNumbers: v => /^[0-9]+$/.test(v) || t('textFieldsMessages.onlyNumbers'),
};

// dataForm definition
const dataForm = [
  {
    label: 'Alias',
    placeholder: '',
    type: 'text',
    model: 'alias',
    rules: [validationRules.required, validationRules.maxLength(20)],
    counter: 20
  },
  {
    label: t('profile.addressType'),
    placeholder: '',
    type: 'text',
    model: 'tip_adresa',
    options: [],
    rules: [validationRules.required],
    counter: null // No counter needed for selection fields
  },
  {
    label: t('profile.building'),
    placeholder: '',
    type: 'text',
    model: 'bloc',
    rules: [validationRules.maxLength(10)],
    counter: 10
  },
  {
    label: t('profile.buildingNumber'),
    placeholder: '',
    type: 'text',
    model: 'nr_bloc',
    rules: [validationRules.maxLength(7)],
    counter: 7
  },
  {
    label: t('profile.street'),
    placeholder: '',
    type: 'text',
    model: 'strada',
    rules: [validationRules.required, validationRules.maxLength(30)],
    counter: 30
  },
  {
    label: t('profile.streetNumber'),
    placeholder: '',
    type: 'text',
    model: 'nr_strada',
    rules: [validationRules.required, validationRules.maxLength(5)],
    counter: 5
  },
  {
    label: t('profile.city'),
    placeholder: '',
    type: 'text',
    model: 'oras',
    rules: [validationRules.required, validationRules.maxLength(20)],
    counter: 20
  },
  {
    label: t('profile.county'),
    placeholder: '',
    type: 'text',
    model: 'judet',
    rules: [validationRules.required, validationRules.maxLength(15)],
    counter: 15
  },
  {
    label: t('profile.postalCode'),
    placeholder: '',
    type: 'text',
    model: 'codPostal',
    rules: [validationRules.required, validationRules.exactLength(6), validationRules.onlyNumbers],
    counter: 6
  },
  {
    label: t('profile.Cif'),
    placeholder: '',
    type: 'text',
    model: 'cif',
    rules: [validationRules.required, validationRules.onlyNumbers,validationRules.maxLength(13)],
    counter: 13
  },
  {
    label: t('profile.firmName'),
    placeholder: '',
    type: 'text',
    model: 'nume_firma',
    rules: [validationRules.required, validationRules.maxLength(50)],
    counter: 50
  }
];


const filteredDataForm = computed(() => {
  return dataForm.filter(data => {
    // Only show 'cif' and 'nume_firma' fields if 'tip_adresa' is 'Facturare'
    if ((data.model === 'cif' || data.model === 'nume_firma') && addressToSaveToDb.value.tip_adresa !== 'Facturare') {
      return false; // Exclude these fields if 'tip_adresa' is not 'Facturare'
    }
    return true; // Include all other fields
  });
});

const notSelectables = (currentModel) => {
  return currentModel !== 'tip_adresa';
}

function fireAlarm(icon,title,text,isLoading){
    if(isLoading === null){
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: true,
            timer: 1500,
        });
        return;
    }else{
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
        return;
    }
   
}


const assignDataFromDb =  async () => {
  fireAlarm('info' , 'Asteptati...' , '' , true)

  const data = await UserService.loadUserAdresses();
  console.log(data)
  if (data === -4 || Object.keys(data).length === 0) {
    swal.close()
    emptyAddressListAlert.value = true;
  } else {
    swal.close()
    addressesDataFromDb.value = data;
    emptyAddressListAlert.value = false;
   
  }
  
}

const showFormToAddAnAddress = () => {
  addressToSaveToDb.value.tip_adresa = 'Livrare';
  emptyAddressListAlert.value = false;
  showFormForAddingAddress.value = true;
  buttonShow.value = false;
}

const hideFormToAddAddress = () => {
  addressToSaveToDb.value.tip_adresa = 'Livrare';
  emptyAddressListAlert.value = false;
  showFormForAddingAddress.value = false;
  buttonShow.value = true;
  resetForm();
}

const resetForm = () => {
  addressToSaveToDb.value = {
    alias: '',
    tip_adresa: 'Livrare',
    bloc: '',
    nr_bloc: '',
    strada: '',
    nr_strada: '',
    oras: '',
    judet: '',
    codPostal: '',
    cif: '',
    nume_firma: ''
  };
  addressForm.value.resetValidation();
}

const saveAddress = async () => {
  fireAlarm('info' , 'Asteptati...' , '' , true)
  const isValid = await addressForm.value.validate()
  if (isValid.valid) {
    const response =  await UserService.saveAddressToDb(addressToSaveToDb.value);
    if (response === 1) {
      hideFormToAddAddress();
      swal.close()
      fireAlarm('success' , t('sweetAlert2.Success') , t('sweetAlert2.SavedAddressSuccesfully') , null)
      addressesDataFromDb.value = addressesDataFromDb.value.push(addressToSaveToDb.value)
      dummyBoolean.value = true;
      window.location.reload()
    } else {
      swal.close()
      fireAlarm('error' , t('sweetAlert2.Error') , t('sweetAlert2.ErrorWhenSavingAddress') , null)
      dummyBoolean.value = true;
    }
  }else{
    swal.close()
    fireAlarm('error' ,  t('sweetAlert2.Error') ,  t('sweetAlert2.CheckForm'), null)
  }
}

const deleteAddress = async (alias) => {
  fireAlarm('info' , 'Asteptati...' , '' , true)
  const response = await UserService.deleteUserAddress(alias);
  if (response === 1) {
    swal.close()
    fireAlarm('success' , t('sweetAlert2.Success') , t('sweetAlert2.DeleteAddressSuccesfully') , null)
    var findIndex = addressesDataFromDb.value.findIndex(address => address.alias === alias)
    if(findIndex === -1){
      window.location.reload()
    }else{
      addressesDataFromDb.value = addressesDataFromDb.value.splice(findIndex,1)
    }

  } else {
    swal.close()
    fireAlarm('error' ,  t('sweetAlert2.Error') , t('sweetAlert2.ErrorWhenDeletingAddress') , null)
  }
  dummyBoolean.value = true;
}

// Lifecycle hook
onMounted(() => {
  assignDataFromDb();
})
</script>

<style scoped>
.background-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/assets/background.jpeg);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
}

.content {
  position: relative;
  z-index: 1;
  padding: 20px;
  border-radius: 10px;
  max-width: 1000px;
  width: 100%;
}
</style>
