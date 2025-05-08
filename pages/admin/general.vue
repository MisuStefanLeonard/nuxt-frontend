<template>
    <div class="bg-grey-darken-4 p-3 h-100">
        <v-alert type="info" variant="tonal" class="text-justify">
            Aici aveti setarile generale pentru site
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
        <v-divider></v-divider>
        <v-container fluid>
            <p class="font-weight-light p-2 m-2 h3 text-center">Promotii</p>

            <v-alert type="warning" variant="tonal" class="text-center" v-if="popUps.length <= 0">
                <p>Nu aveti nicio promotie definita!</p>
                <v-btn class="bg-green" type="button" @click="creationPromotionDialog = true">
                    Creeaza promotie <v-icon :icon="mdiPlus" :size="28"></v-icon>
                </v-btn>
            </v-alert>
            <div v-else>
                <v-row>
                    <v-col cols="4" v-for="popup in popUps" :key="popup.idPopUp">
                        <v-card class="bg-blue-grey-darken-4">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="9">
                                        <p class="font-wieght-light h5">PROMOTIE #{{ popup.idPopUp }}</p>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-btn :color="popup.isActive === true ? 'success' : 'error'">
                                            {{ popup.isActive === true ? 'Activa' : 'Inactiva' }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                               
                            </v-card-text>
                            <v-card-actions>
                                <v-row>
                                    <v-col cols="3" >
                                        <v-tooltip text="Modifica">
                                            <template v-slot:activator="{ props }">
                                                <v-btn  @click="openPopUpModificationDialog(popup)" v-bind="props">
                                                    <v-icon color="white" :icon="mdiPencil" :size="28"></v-icon>
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-tooltip text="Previzualizeaza">
                                            <template v-slot:activator="{ props }">
                                                <v-btn  @click="previewPromotion(popup)" v-bind="props">
                                                    <v-icon color="primary" :icon="mdiFileFind" :size="28"></v-icon>
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-tooltip text="Sterge promotia">
                                            <template v-slot:activator="{ props }">
                                                <v-btn  @click="deletePromotionDialog(popup.idPopUp)" v-bind="props">
                                                    <v-icon color="red" :icon="mdiTrashCan" :size="28"></v-icon>
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-tooltip :text="popup.isActive === true ? 'Dezactiveaza' : 'Activeaza'">
                                            <template v-slot:activator="{ props }">
                                                <v-btn  @click="modifyPromotionState(popup.idPopUp , popup.isActive)" v-bind="props">
                                                    <v-icon color="white" :icon="popup.isActive === true ? mdiEye : mdiEyeOff" :size="28"></v-icon>
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <v-btn class="bg-primary"  @click="creationPromotionDialog = true">
                            Adauga promotie <v-icon :icon="mdiPlus" class="ml-1"></v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <v-dialog v-model="creationPromotionDialog" max-width="1000" scrollable>
                <v-card class="bg-grey-darken-4">
                    <v-card-text>
                        <v-form ref="newPromotionForm" class="bg-grey-darken-4 text-center p-2 m-2">
                            <p class="font-weight-light h5" v-if="modifyPromotion === false">Creeaza promotie noua</p>
                            <p class="font-weight-light h5" v-else>Modifica promotie</p>

                            <v-row>
                                <v-col cols="12">
                                    <v-text-field  class="p-2 m-2"
                                        v-model="promotionObj.titluJson.nume_ro"
                                        label="Titlu promotie (Romana)"
                                        variant="outlined"
                                        counter="40"
                                        density="compact"
                                        :rules="[rules.maxChar(40) , rules.fieldNotEmpty]"
                                    >
                                        <template v-slot:counter={max,value}>
                                            <span :style="{ color: value > max ? 'red' : 'white' }">
                                                {{ value }} / {{ max }}
                                            </span>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field  class="p-2 m-2"
                                        v-model="promotionObj.titluJson.nume_en"
                                        label="Titlu promotie (Engleza)"
                                        variant="outlined"
                                        counter="40"
                                        density="compact"
                                        :rules="[rules.maxChar(40),rules.fieldNotEmpty]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea  class="p-2 m-2"
                                        v-model="promotionObj.descriereJson.descriere_ro"
                                        label="Descriere promotie (Romana)"
                                        :counter="150"
                                        variant="outlined"
                                        :rules="[rules.maxChar(300), rules.fieldNotEmpty]"
                                            density="compact"
                                        rows="2"
                                        auto-grow
                                    >
                                        <template v-slot:counter={max,value}>
                                            <span :style="{ color: value > max ? 'red' : 'white' }">
                                                {{ value }} / {{ max }}
                                            </span>
                                        </template>
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea  class="p-2 m-2"
                                        v-model="promotionObj.descriereJson.descriere_en"
                                        label="Descriere promotie (Engleza)"
                                        :counter="150"
                                        variant="outlined"
                                        :rules="[rules.maxChar(300), rules.fieldNotEmpty]"
                                            density="compact"
                                        rows="2"
                                        auto-grow
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-checkbox   class="p-2 m-2"
                                        v-model="promotionObj.isActive"
                                        :label="`Promotie activa: ${promotionObj.isActive === true ? 'Da' : 'Nu'}`"
                                        variant="outlined"
                                        density="compact"
                                    ></v-checkbox>
                                </v-col>
                                <v-col cols="12">
                                    <v-combobox variant="outlined"  class="p-2 m-2" 
                                    density="compact"
                                    label="Cod promotie"
                                    :items="vouchers"
                                    :item-title="item =>
                                        item
                                        ? `COD: ${item.codVoucherDto} – REDUCERE: ${item.reducereDto }%`
                                        : '-'"
                                    :item-value="item =>
                                        item
                                        ? item
                                        : null"
                                    v-model="promotionObj.voucher">
                                    
                                    </v-combobox>
                                </v-col>
                                <v-col cols="12" class="p-2">
                                    <v-btn color="green" @click="addPopUp()" >
                                        Salveaza <v-icon :icon="mdiFileDocumentPlus" :size="18" class="ml-2"></v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="p-2">
                                    <v-btn color="red" @click="closePromotionDialog">
                                        Inchide <v-icon :icon="mdiAlphaX" :size="18" class="ml-2"></v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="p-2">
                                    <v-btn color="primary" @click="previewPromotion('none')">
                                        Previzualizeaza <v-icon :icon="mdiFileFind" :size="18" class="ml-2"></v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
                
            </v-dialog>
            <v-dialog v-model="previewPromotionDialog" max-width="700" max-height="700" scrollable>
                <v-card class="pa-4">
                    <v-row class="text-center">
                        <v-col cols="12">
                            <v-btn color="primary" @click="switchLang">
                                Schimba limba: {{ lang }}
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-card-title class="text-h5 font-weight-bold text-center" v-if="lang === 'RO'">
                       {{ promotionObj.titluJson.nume_ro }}
                    </v-card-title>
                    <v-card-title class="text-h5 font-weight-bold text-center" v-else>
                       {{ promotionObj.titluJson.nume_en }}
                    </v-card-title>
            

                    <v-card-text class="text-body-1 text-center" v-if="lang === 'RO'">
                       {{ promotionObj.descriereJson.descriere_ro }}
                    </v-card-text>
                    <v-card-text class="text-body-1 text-center" v-else>
                       {{ promotionObj.descriereJson.descriere_en }}
                    </v-card-text>
                    

            
                    <v-divider class="my-2"></v-divider>
            
                    <v-card-text class="text-h6 text-center" v-if="promotionObj.voucher !== null">
                        <strong>{{ lang === "RO" ? 'Cod Voucher:' : 'Voucher Code: ' }} <span class="text-primary">{{ promotionObj.voucher.codVoucherDto }}</span></strong>
                        <br>
                        <strong><span class="text-primary">{{ promotionObj.voucher.reducereDto }}% {{ lang === 'RO' ? 'REDUCERE' : 'OFF' }}</span></strong>
                    </v-card-text>
            
                    <v-card-actions class="justify-center">
                        <v-btn color="primary" variant="flat" @click="closePromotionPreview">❌ {{ lang === 'RO' ? 'Inchide' : 'Close'}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
   
</template>



<script setup>
import { mdiAlphaX, mdiContentSave, mdiEye, mdiEyeOff, mdiFileDocumentPlus, mdiFileFind, mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js';
import adminService from '~/services/Admin';

definePageMeta({
    layout:'admin',
    middleware: 'admin'
})

const numbersRegex = /^\d+(\.\d{1,2})?$/;
const swal = useNuxtApp().$swal

const creationPromotionDialog = ref(false)
const previewPromotionDialog = ref(false)
const modifyPromotion = ref(false)

const promotionObj = ref({
    titluJson: {
        nume_ro : '',
        nume_en : ''
    },
    descriereJson: {
        descriere_ro: '',
        descriere_en: ''
    },
    idVoucher : null,
    voucher : null,
    isActive : true
})

const generalSettingsForm = ref(null)
const newPromotionForm = ref(null)
const vouchers = ref([])
const popUps = ref([])

const generalSettingsData = ref({
    "pret_comanda_minima" : '0',
    "smart_bill_username" : '',
    "smart_bill_password" : '',
    "cif" : ''
})
const lang = ref("RO");
const rules = {
  onlyNumbers: (value) => {
    return !value || numbersRegex.test(value) || "The value must be a valid number (e.g., 500 or 500.55)";
  },
  maxChar: len => value => !value || value.length <= len || `Lungime maxima: ${len}`,
  fieldNotEmpty: value => (value !== null && value !== undefined && value !== '') || 'Campul este obligatoriu',

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
})

const getVouchere = (async () => {
    const response = await adminService.getVouchers();
    vouchers.value = [ null, ...response ]
    console.log('vouchere',vouchers.value)
})

const getAllPopUps = (async () => {
    const response = await adminService.getAllPopUps()
    popUps.value = response
    console.log(popUps.value)
})

function cleanPromotionObj(){
    promotionObj.value.descriereJson.descriere_ro = ''
    promotionObj.value.descriereJson.descriere_en = ''
    promotionObj.value.titluJson.nume_ro = ''
    promotionObj.value.titluJson.nume_en = ''
    promotionObj.value.isActive = false
    promotionObj.value.idVoucher = null
    promotionObj.value.voucher = null
}

const addPopUp = (async () => {
    const isFormValid = await newPromotionForm.value.validate()
    if(isFormValid.valid){
        const dtoToSendToBackEnd = {
            idPopUp: modifyPromotion.value === true ? promotionObj.value.idPopUp : 0,
            titluJson: promotionObj.value.titluJson,
            descriereJson:promotionObj.value.descriereJson,
            idVoucher : promotionObj.value.voucher !== null ?
                promotionObj.value.voucher.idVoucherDto : null,
            isActive : promotionObj.value.isActive
        }
        if(modifyPromotion.value === true){
            const modifyPopUpResponse = await adminService.updatePopUp(dtoToSendToBackEnd)
            console.log(modifyPopUpResponse)
            if(modifyPopUpResponse === 1){
                fireAlarm('top-end' , 'success' , 'Modificata cu success!' , 1000)
            }else{
                fireAlarm('top-end' , 'error' , 'O eroare a avut loc!' , 2000)
            }
            modifyPromotion.value = false
            cleanPromotionObj()
            creationPromotionDialog.value = false
        }else{
            
            const createPopUpResponse = await adminService.createPopUp(dtoToSendToBackEnd)
            console.log(createPopUpResponse)
            if(createPopUpResponse.status === 200){
                fireAlarm('top-end' , 'success' , 'Creat cu success!' , 1000)
            }else{
                fireAlarm('top-end' , 'error' , 'O eroare a avut loc!' , 2000)
            }
            creationPromotionDialog.value = false
            promotionObj.value.idPopUp = createPopUpResponse.message
            popUps.value.push(promotionObj.value)
            return
        }
        
    }else{
        fireAlarm('top-end' , 'error' , 'Verificati formularul!' , 2000)
        return
    }
})


const modifyPromotionState = (async (popUpId , state) => {
    const modifyPopUpStateResponse = await adminService.modifyPopUpState(popUpId)
    if(modifyPopUpStateResponse === 1){
        fireAlarm('top-end' , 'success' , state === true ? 'Promotie dezactivata cu succes!' : 'Promotie activata cu success' , 1000)
        const findPopUpToModifyState = popUps.value.findIndex(p => p.idPopUp === popUpId)
        if(findPopUpToModifyState === -1){
            fireAlarm('top-end' , 'error' , 'Promotia nu a fost gasita! Refresh in 2 secunde.' , 2000)
            window.location.reload()
        }
        popUps.value[findPopUpToModifyState].isActive = !state
        return
    }else{
        fireAlarm('top-end' , 'error' , 'O eroare a avut loc!' , 2000)
        return
    }
})


const openPopUpModificationDialog = (async (popup) => {
    modifyPromotion.value = true;
    creationPromotionDialog.value = true
    promotionObj.value = popup
})

const deletePromotionDialog = (async (popUpId) => {
    const responseFromPopUpDeletion = await adminService.deletePopUp(popUpId)
    if(responseFromPopUpDeletion === 1){
        fireAlarm('top-end' , 'success' , 'Sters cu success!' , 2000)
        popUps.value = popUps.value.filter(popUp => popUp.popUpId === popUpId)
    }else if(responseFromPopUpDeletion === -4){
        fireAlarm('top-end' , 'error' , 'Aceasta promotie a fost deja stearsa / Nu exista' , 4000)
    }else{
        fireAlarm('top-end' , 'error' , 'O eroare a avut loc!' , 2000)
    }
    return
})

const switchLang = (() => {
    if(lang.value === 'RO'){
        lang.value = 'EN'
    }else{
        lang.value = 'RO'
    }
})

const previewPromotion = ((promotion) => {
    previewPromotionDialog.value = true;
    if(promotion !== 'none'){
        promotionObj.value = promotion
    }
   
})

const closePromotionPreview = (() => {
    previewPromotionDialog.value = false;
})

const closePromotionDialog = (() => {
    // if(modifyPromotion.value === true){
    //     cleanPromotionObj()
    // }
    creationPromotionDialog.value = false
})


onMounted(async () => {
    await getGeneralDatSettings()
    await getAllPopUps()
    await getVouchere()
    
})
</script>