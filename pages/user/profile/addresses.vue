<template>
  <div class="background-wrapper">
    <div class="background"></div>
    <v-container class="content">
      <v-snackbar v-if="modifiedAddressSuccefully" v-model="modifiedAddressSuccefully" class="text-center"
        :timeout="3000" color="green">
          {{ $t('sweetAlert2.ModifiedSuccesfully') }}
      </v-snackbar>
      <v-snackbar v-if="modifiedAddressUnsuccefully" v-model="modifiedAddressUnsuccefully" class="text-center"
        :timeout="3000" color="red">
          {{ $t('sweetAlert2.ErrorWhenModifyingAddress') }}
      </v-snackbar>
      <v-snackbar v-if="waitSnackBar" v-model="waitSnackBar" class="text-center"
        :timeout="3000" color="blue">
          {{ $t('sweetAlert2.Wait') }}
      </v-snackbar>
      <v-dialog v-model="modifyUserAddressDialog"
       max-width="500" width="500" max-height="100%" 
       persistent class=" p-2 m-1" scrollable>
        <v-btn color="black" @click="closeModifyingDialog()">Close <v-icon class="ml-2" size="24" :icon="mdiClose"></v-icon></v-btn>
        <v-card class="bg-blue-grey-lighten-5 text-center" height="500" width="500">
          <v-card-text>
              <v-form ref="modifyUserAddressForm" @submit.prevent="modifyAddress()" >
              <div v-for="(data) in filteredDataForm" :key="data.label">
                <v-text-field
                  v-if="notSelectables(data.model)"
                  :label="data.label"
                  :placeholder="data.placeholder"
                  :type="data.type"
                  :counter="data.counter"
                  v-model="addressToSaveToDb[data.model]"
                  :rules="data.rules"
                  class="p-3"
                ></v-text-field>

                <v-select
                  v-else-if="data.model === 'tipAdresaDto'"
                  :label="data.label"
                  v-model="addressToSaveToDb[data.model]"
                  :items="translatedAddressTypes"
                  :rules="data.rules"
                  item-title="text"
                  item-value="value"
                  class="p-3"
                ></v-select>

                <v-text-field 
                  v-else
                  :label="data.label"
                  :placeholder="data.placeholder"
                  :rules="data.rules"
                  v-model="addressToSaveToDb[data.model]"
                  class="p-3"
                ></v-text-field>
              </div>
            
              <v-btn rounded="xl"  type="submit" color="success" variant="flat" class="font-weight-normal my-4">
                {{ $t('button.save') }} 
                <v-icon class="pl-2" size="24" :icon="mdiContentSave"></v-icon>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        
      </v-dialog>
      <v-breadcrumbs>
        <v-breadcrumbs-item :to="'/user/profile'"><p class="font-weight-bold h6">{{$t('profile.PROFIL')}}</p> </v-breadcrumbs-item>
        <v-breadcrumbs-divider><p class="font-weight-bold h6">/</p></v-breadcrumbs-divider>
        <v-breadcrumbs-item disabled><p class="font-weight-bold h6">{{$t('profile.ADRESE')}}</p></v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-container class="justify-center">
        <v-alert v-if="infoAlert" v-model="infoAlert" type="info" closable>
          {{ $t('profile.addressesInfo') }}
        </v-alert>
        <v-alert type="warning" closable class="mt-3">
          <p class="font-weight-normal text-black">{{ $t('profile.modifyingInfo') }}</p>
        </v-alert>
      </v-container>
      <v-container class="d-block text-center">
        <p class="h3 font-weight-light text-center p-3">{{$t('profile.AccountAddreses')}}</p>
        <v-container v-if="emptyAddressListAlert" class="justify-center">
          <v-card class="bg-grey-darken-4 my-2 rounded-xl ">
            <v-card-title>
              <v-icon size="24" :icon="mdiMapMarkerOutline">
               
              </v-icon>
              {{ $t('profile.emptyAddress') }}
            </v-card-title>
            <v-card-text>
              {{ $t('profile.emptyAddressListText') }}
            </v-card-text>
          </v-card>
          <v-btn :disabled="isDataFetching"  rounded="xl" @click="showFormToAddAnAddress()" type="submit" color="blue" variant="tonal" class="font-weight-bold bg-grey-lighten-3 my-4">
            {{ $t('button.addAddress') }}
            <v-icon class="pl-2" size="24" :icon="mdiPlusCircleOutline"></v-icon>
          </v-btn>
        </v-container>
        
        <v-container v-if="!emptyAddressListAlert && dummyBoolean" class="d-block w-sm-75 w-lg-75 h-75">
          <v-card v-for="card_item in addressesDataFromDb"
                  :key="card_item.aliasDto"
                  class="bg-grey-darken-4 my-2 rounded-xl ">
            <v-card-title class="my-2">
              <v-icon v-if="card_item.tipAdresaDto === 'Livrare'" size="24" :icon="mdiMapMarkerOutline">
               
              </v-icon>
              <v-icon v-else size="24" :icon="mdiFileDocumentPlusOutline">
               
              </v-icon>
              {{ card_item.aliasDto }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" xs="12" sm="6" md="6">
                  <p class="font-weight-light">{{ $t('profile.addressType') }}: {{translatedAddressType(card_item.tipAdresaDto)}}</p>
                  <p class="font-weight-light">{{ $t('profile.building') }} : {{card_item.blocDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.buildingNumber') }} : {{card_item.nrBlocDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.street') }} : {{card_item.stradaDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.streetNumber') }} : {{card_item.nrStradaDto}}</p>
                </v-col>
                <v-col cols="12" xs="12" sm="6" md="6">
                  <p class="font-weight-light">{{ $t('profile.city') }} : {{card_item.orasDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.county') }} : {{card_item.judetDto}}</p>
                  <p class="font-weight-light">{{ $t('profile.postalCode') }} : {{card_item.codPostalDto}}</p>
                  <p class="font-weight-light" v-if="card_item.cifDto">{{ $t('profile.Cif') }} : {{card_item.cifDto}}</p>
                  <p class="font-weight-light" v-if="card_item.numeFirmaDto">{{ $t('profile.firmName') }} : {{card_item.numeFirmaDto}}</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-btn :disabled="isDataFetching || card_item.isDeletedDto"  @click="openModifyingUserDialog(card_item)" rounded="xl" type="submit" color="blue" variant="tonal" class="font-weight-bold bg-grey-lighten-3 my-4 ">
              {{ $t('button.modify') }} 
              <v-icon class="pl-2" size="24" :icon="mdiPen"></v-icon>
            </v-btn>
          </v-card>

          <v-btn :disabled="isDataFetching" v-if="buttonShow"  rounded="xl" @click="showFormToAddAnAddress('modify')" type="submit" color="blue" variant="flat" class="font-weight-bold  my-4">
            {{ $t('button.addAddress') }} 
            <v-icon class="pl-2" size="24" :icon="mdiPlusCircleOutline"></v-icon>
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
                v-else-if="data.model === 'tipAdresaDto'"
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
              <v-icon class="pl-2" size="24" :icon="mdiContentSave"></v-icon>
            </v-btn>
          </v-form>
          <v-btn :disabled="isDataFetching" rounded="xl" @click="showFormToAddAnAddress()" type="submit" color="blue" variant="flat" class="font-weight-bold  my-4">
            {{ $t('button.addAddress') }} 
            <v-icon class="pl-2" size="24" :icon="mdiPlusCircleOutline"></v-icon>
          </v-btn>
        </v-container>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import { mdiContentSave, mdiFileDocumentPlusOutline, mdiMapMarkerOutline, mdiPen, mdiPlusCircleOutline } from '@mdi/js'
import { ref, computed, onMounted } from 'vue'
import UserService from '~/services/User'

definePageMeta({
    layout: 'default',
   
})


definePageMeta({
  title : 'Adrese',
  layout: 'default',
  keywords:'adrese , addresses , client , user',
  siteName : 'Texx - Adrese',
  canonicalUrl : process.env.NODE_ENV === 'development' ? 'http://localhost:3000/user/profile/addresses' : 'https://texxshop.ro/user/profile/addresses',
  ogType : 'website',
  middleware: 'auth',
  ogDescription : 'Adresele dumnevoastra pe Texx',
  description : 'Adresele dumnevoastra pe Texx'
})

useHead({
  title : 'Adrese'
})

const swal = useNuxtApp().$swal
const {t} = useI18n()

// Alerts and general state
const infoAlert = ref(true)
const modifyUserAddressDialog = ref(false)
const modifyUserAddressForm = ref(null)
const modifiedAddressSuccefully = ref(false)
const modifiedAddressUnsuccefully = ref(false)
const waitSnackBar = ref(false)
const emptyAddressListAlert = ref(true)

const showFormForAddingAddress = ref(false)
const buttonShow = ref(true)
const isDataFetching = ref(false)
const addressForm = ref(null);

// Data handling
const addressesDataFromDb = ref([])
const addressToSaveToDb = ref({
  idAdresa : 0,
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
  numeFirmaDto: '',
  isModifying : null
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
  checkAliasUsed : (currentAddress) => (v) => checkIsAliasUsed(v,currentAddress) ||  t('profile.useAnotherAlias')
};

const checkIsAliasUsed = ((alias) => {
  if(addressToSaveToDb.value.isModifying === true){
    currentModifyingAlias.value = addressToSaveToDb.value.aliasDto
    addressToSaveToDb.value.isModifying = null;
  }
 
  if(currentModifyingAlias.value !== ''){
    var addressFilteredWithoutCurrentAlias =  addressesDataFromDb.value.filter(p => p.aliasDto !== currentModifyingAlias.value)
    return addressFilteredWithoutCurrentAlias.findIndex(address => address.aliasDto === alias) === -1
  }else{
    return addressesDataFromDb.value.findIndex(address => address.aliasDto === alias) === -1
  }
})

const currentModifyingAlias = ref('')
// dataForm definition
const dataForm = [
  {
    label: 'Alias',
    placeholder: '',
    type: 'text',
    model: 'aliasDto',
    rules: [validationRules.required, validationRules.maxLength(20) , validationRules.checkAliasUsed()],
    counter: 20
  },
  {
    label: t('profile.addressType'),
    placeholder: '',
    type: 'text',
    model: 'tipAdresaDto',
    options: [],
    rules: [validationRules.required],
    counter: null // No counter needed for selection fields
  },
  {
    label: t('profile.building'),
    placeholder: '',
    type: 'text',
    model: 'blocDto',
    rules: [validationRules.maxLength(10)],
    counter: 10
  },
  {
    label: t('profile.buildingNumber'),
    placeholder: '',
    type: 'text',
    model: 'nrBlocDto',
    rules: [validationRules.maxLength(7)],
    counter: 7
  },
  {
    label: t('profile.street'),
    placeholder: '',
    type: 'text',
    model: 'stradaDto',
    rules: [validationRules.required, validationRules.maxLength(30)],
    counter: 30
  },
  {
    label: t('profile.streetNumber'),
    placeholder: '',
    type: 'text',
    model: 'nrStradaDto',
    rules: [validationRules.required, validationRules.maxLength(5)],
    counter: 5
  },
  {
    label: t('profile.city'),
    placeholder: '',
    type: 'text',
    model: 'orasDto',
    rules: [validationRules.required, validationRules.maxLength(20)],
    counter: 20
  },
  {
    label: t('profile.county'),
    placeholder: '',
    type: 'text',
    model: 'judetDto',
    rules: [validationRules.required, validationRules.maxLength(15)],
    counter: 15
  },
  {
    label: t('profile.postalCode'),
    placeholder: '',
    type: 'text',
    model: 'codPostalDto',
    rules: [validationRules.required, validationRules.exactLength(6), validationRules.onlyNumbers],
    counter: 6
  },
  {
    label: t('profile.Cif'),
    placeholder: '',
    type: 'text',
    model: 'cifDto',
    rules: [validationRules.required, validationRules.onlyNumbers,validationRules.maxLength(13)],
    counter: 13
  },
  {
    label: t('profile.firmName'),
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
  addressToSaveToDb.value.tipAdresaDto = 'Livrare';
  emptyAddressListAlert.value = false;
  showFormForAddingAddress.value = true;
  buttonShow.value = false;
}

const hideFormToAddAddress = () => {
  addressToSaveToDb.value.tipAdresaDto = 'Livrare';
  emptyAddressListAlert.value = false;
  showFormForAddingAddress.value = false;
  buttonShow.value = true;
  resetForm();
}

const openModifyingUserDialog = ((addressData) => {
  modifyUserAddressDialog.value = true;
  addressToSaveToDb.value = {...addressData}
  addressToSaveToDb.value.isModifying = true;
 
})

const closeModifyingDialog = (() => {
  addressToSaveToDb.value = {
    aliasDto: '',
    tipAdresaDto: 'Livrare',
    blocDto: '',
    nrBlocDto: '',
    stradaDto: '',
    nrStradaDto: '',
    orasDto: '',
    judetDto: '',
    codPostalDto: '',
    cifDto: '',
    numeFirmaDto: '',
    isModifying : null,
  };
  modifyUserAddressForm.value.resetValidation();
  modifyUserAddressDialog.value = false;
  currentModifyingAlias.value = ''
 
})

const resetForm = () => {
  addressToSaveToDb.value = {
    aliasDto: '',
    tipAdresaDto: 'Livrare',
    blocDto: '',
    nrBlocDto: '',
    stradaDto: '',
    nrStradaDto: '',
    orasDto: '',
    judetDto: '',
    codPostalDto: '',
    cifDto: '',
    numeFirmaDto: '',
    isModifying : null,
  };
  addressForm.value.resetValidation();
}

const saveAddress = async () => {
  fireAlarm('info' , 'Asteptati...' , '' , true)
  const isValid = await modifyUserAddressForm.value.validate()
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

const modifyAddress = async () => {
  waitSnackBar.value = true;
  const response = await UserService.modifyUserAddress(addressToSaveToDb.value);
  if (response === 1) {
    modifiedAddressSuccefully.value = true
    setTimeout(() => {
      modifiedAddressSuccefully.value = false 
    }, 3000);
  } else {
    swal.close()
    modifiedAddressUnsuccefully.value = true
    setTimeout(() => {
      modifiedAddressUnsuccefully.value = false
    }, 3000);
   
  }
  waitSnackBar.value = false;
  dummyBoolean.value = true;
}

// Lifecycle hook
onMounted( () => {
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
