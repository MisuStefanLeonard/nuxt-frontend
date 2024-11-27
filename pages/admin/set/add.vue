<template>
    <div class="bg-grey-darken-4 p-2">
        <v-container fluid class="text-center">
            <p class="font-weight-light h3 p-2 m-2">Creeaza un set nou</p>
            <v-container fluid class="w-100">
                <v-alert color="info elevation-24" icon="mdi-information" variant="tonal">
                    <p class="font-weigth-bold h6 text-white">
                        - Daca pretul de baza al produsului este 0 , inseamna ca are dimensiuni asociate cu acesta,
                    pretul fiind diferit pe diferite dimensiuni.
                    </p>
                    
                    <p class="font-weigth-bold h6 text-white">
                        - Daca un produs nu este activ in magazin, 
                        acesta va fi vizibil in seturile in care se afla
                    </p>
                </v-alert>
            </v-container>
            
            <!-- Loop through each product in the set -->
            <v-container fluid class=" w-100" v-for="product in setToCreate.productsOnSet" :key="product.numeProdusDto">
                <v-card class="font-weight-light bg-grey-darken-3 my-2 rounded-xl" variant="outlined">
                    <v-card-title class="bg-blue opacity-80">
                        <p class="font-weight-bold">{{ product.codProdusDto }}</p>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle class="p-2">
                        <p class="font-weight-bold h6">{{ product.tipProdusDto.toUpperCase() }}</p>
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row >
                            <v-col cols="6" class="">
                                <p class="h6 font-weight-light ">NUME PRODUS: {{ product.numeProdusDto }}</p>
                                <p class="h6 font-weight-light">ACTIV IN MAGAZIN: {{ product.activInMagazinDto === true ? 'Da' : 'Nu' }}</p>
                                <p class="h6 font-weight-light">PRET DE BAZA: {{ product.pretBazaDto }} RON</p>
                            </v-col>
                            <v-divider vertical color="white" opacity="50" ></v-divider>
                            <v-col cols="6">
                                  <!-- Colors Checkbox Group -->
                                <div class="p-2 my-2">
                                    <p class="font-weight-thin h3">Culori</p>
                                </div>
                                <v-container fluid class="font-weight-bold">
                                    <div class="d-flex justify-center" v-if="product.productOptions.colorsVariaties.length > 0">
                                        <v-checkbox 
                                        v-for="color in product.productOptions.colorsVariaties"
                                            :key="color.codCuloareDto"
                                            :label="color.numeCuloareDto"
                                            :value="`${color.numeCuloareDto}-${color.codCuloareDto}`"
                                            v-model="product.selectedColors"
                                            color="green"
                                        ></v-checkbox>
                                    </div>
                                </v-container>
                            </v-col>
                            <v-divider  color="white" opacity="50" ></v-divider>
                            <v-col cols="12">

                                <!-- Dimensions Checkbox Group -->
                                <div class="p-2 my-2">
                                    <p class="font-weight-thin h3">Dimensiuni</p>
                                </div>
                            
                                <v-container fluid class="d-flex flex-wrap justify-content-center font-weight-bold">
                                    <div v-if="product.productOptions.dimensionVariaties.length > 0">
                                        <v-checkbox
                                        v-for="dimension in product.productOptions.dimensionVariaties"
                                        :key="dimension.lungimeDto + dimension.latimeDto"
                                        :label="`Dimensiune: ${dimension.lungimeDto}x${dimension.latimeDto} 
                                        - Pret: ${dimension.pretDto} RON`"
                                        :value="`${dimension.lungimeDto}x${dimension.latimeDto}-${dimension.recomandarePat}`"
                                        v-model="product.selectedDimensions"
                                        :checked="product.selectedDimensions.includes(`${dimension.lungimeDto}x${dimension.latimeDto}-${dimension.recomandarePat}`)"
                                        color="green"
                                    ></v-checkbox>
                                    </div>
                                
                                </v-container>
                            </v-col>
                            <v-col cols="12" v-if="product.productOptions.standardManopere.length > 0">
                                <v-container fluid >
                                    <v-divider></v-divider>
                                    <div class="p-2 my-2 " >
                                        <p class="font-weight-thin h3">Manopere</p>
                                    </div>
                                    <v-select
                                        color="green"
                                        label="Alege manopere pentru produs" 
                                        :items="product.productOptions.standardManopere"
                                        item-title="numeManopera"
                                        item-value="numeManopera"
                                        v-model="product.selectedManopere"
                                        multiple
                                        chips
                                        >
                                    </v-select>
                                    <v-sheet elevation="12" class="p-1" color="grey-darken-4" v-if="getFullSelectedManopere(product) && getFullSelectedManopere(product).length > 0">
                                        <v-card
                                            v-for="(manopera, index) in getFullSelectedManopere(product)"
                                            :key="index"
                                            class="my-3 mx-1 p-1 bg-grey-darken-2"

                                        >
                                    
                                        <v-card-text class="font-weight-light h6 text-center">
                                            <v-row>
                                                <v-col cols="12">
                                                    <p>Informatii generale</p>
                                                    <v-divider></v-divider>
                                                    <p>Nume manopera : {{ manopera.numeManopera || 'N/A' }} </p>
                                                    <p>Metrii totali folositi : {{ manopera.metruTotalFolosit || 'N/A' }}</p>
                                                </v-col>
                                                <v-divider></v-divider>
                                                <v-col cols="4">
                                                    <p>Informatii rejansa</p>
                                                    <v-divider></v-divider>
                                                    <p>Nume rejansa: {{ manopera.tipGalerie.numeTipRejansa }}</p>
                                                    <p>Pret rejansa: {{ manopera.tipGalerie.pretTipRejansa }} RON/METRU</p>
                                                    <p>Incretire rejansa: {{ manopera.tipGalerie.incretireRejansa }} </p>
                                                    <p>Prindere inele: {{ manopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu' }} </p>
                                                    <v-img v-if="manopera.tipGalerie.presignedUrl !== 'empty'"
                                                        eager
                                                        :aspect-ratio="16 / 9"
                                                        :src="manopera.tipGalerie.presignedUrl"
                                                        >

                                                    </v-img>
                                                    <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Aceasta rejansa nu are imagine asociata.</p>
                                                </v-col>
                                                <v-divider vertical></v-divider>
                                                <v-col cols="4" >
                                                    <p>Informatii inele prindere</p>
                                                    <v-divider></v-divider>

                                                    <p>Culoare inel: {{ manopera?.tipInel?.numeTipInel || 'N/A' }}</p>
                                                    <v-img v-if="manopera?.tipInel?.presignedUrl !== 'empty'"
                                                        eager
                                                        :aspect-ratio="16 / 9"
                                                        :src="manopera?.tipInel?.presignedUrl"
                                                        >

                                                    </v-img>
                                                    <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Acest inel nu are imagine asociata.</p>
                                                </v-col>
                                                <v-divider vertical></v-divider>

                                                <v-col cols="4">
                                                    <p>Informatii cusatura linie</p>
                                                    <v-divider></v-divider>

                                                    <p>Nume cusatura linie: {{ manopera.tipLinie.numeTipCusaturaColt }}</p>
                                                    <p>Pret cusatura linie: {{ manopera.tipLinie.pretTipCusaturaColt }} RON/METRU</p>
                                                    <v-img v-if="manopera.tipLinie.presignedUrl !== 'empty'"
                                                        eager
                                                        :aspect-ratio="16 / 9"
                                                        :src="manopera.tipLinie.presignedUrl"
                                                        >

                                                    </v-img>
                                                    <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Aceasta cusatura nu are imagine asociata.</p>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        
                                        </v-card>
                                    </v-sheet>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="m-2 d-xs-block justify-center">
                        <v-btn class="mx-2" variant="flat" color="error" @click="removeProductFromSet(product.codProdusDto, product.idProdusDto)">
                            <template v-slot:prepend>
                                <v-icon left color="black">mdi-delete</v-icon>
                            </template>
                            Sterge
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
            
            <v-container fluid v-if="showPanelToAddProduct" class="bg-grey-lighten-1 mb-2 p-1 w-100">
                <v-alert type="success" variant="flat" v-if="showSuccesAlert" class="my-2">
                Datele produsului afisate cu success!
                </v-alert>
                <v-alert type="error" variant="tonal" v-if="showErrorAlert">
                    O eroare a avut loc la afisarea datelor produsului!
                </v-alert>
                <div class="d-flex">
                    <v-icon @click="closeAddProductToSet()" color="red">
                        mdi-close-circle
                    </v-icon>
                </div>
                <p class="font-weight-thin h3 m-1 p-1">Alegeti un produs</p>
                <v-divider opacity="60" thickness="3"></v-divider>
                <v-treeview
                class="rounded-xl"
                :items="productCodes"
                bg-color="grey-lighten-1"
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
                open-on-click
                v-model:activated="selectedProduct"
                @update:activated="addProductToSet()"
                item-value="id"
                color="info"
                activatable>
                </v-treeview>
                <v-divider opacity="60" thickness="3"></v-divider>
                <v-container v-if="productLoaded">
                    <v-alert type="info" class="my-2">
                        Selectati optiunile produsului care sa fie disponibile 
                        care sa se afiseze la customizarea produsului de catre utilizator
                    </v-alert>
                    <v-divider></v-divider>

                    <p class="font-weight-normal h3 text-info">Datele produsului selectat</p>
                    <v-divider></v-divider>

                    <v-card class="rounded-xl bg-grey-darken-4">
                        <v-card-title>
                            <p class="font-weight-bold h6">Codul produsului: {{ selectedProductData.codProdusDto }}</p>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-subtitle>
                            <p class="font-weight-light h6">Tipul produsului: {{ selectedProductData.tipProdusDto }}</p>
                        </v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-text>
                            <p class="h6 font-weight-light">Nume produs: {{ selectedProductData.numeProdusDto }}</p>
                            <p class="h6 font-weight-light">Activ in magazin: {{ selectedProductData.activInMagazinDto === true ? 'Da' : 'Nu' }}</p>
                            <p class="h6 font-weight-light">Pret de baza: {{ selectedProductData.pretBazaDto }}</p>
                            <v-divider></v-divider>
                            <!-- Colors Checkbox Group -->
                            <div class="p-2 my-2">
                                <p class="font-weight-thin h3">Culori</p>
                            </div>
                            
                            <v-container fluid class="font-weight-bold">
                                <div class="d-flex justify-center" v-if="selectedProductData.productOptions.colorsVariaties.length > 0">
                                    <v-checkbox 
                                    v-for="color in selectedProductData.productOptions.colorsVariaties"
                                        :key="color.codCuloareDto"
                                        :label="color.numeCuloareDto"
                                        :value="`${color.numeCuloareDto}-${color.codCuloareDto}`"
                                        v-model="selectedProductData.selectedColors"
                                        color="green"
                                    ></v-checkbox>
                                </div>
                            </v-container>
                            <v-divider></v-divider>
                            <!-- Dimensions Checkbox Group -->
                            <div class="p-2 my-2" v-if="selectedProductData.productOptions.dimensionVariaties.length > 0">
                                <p class="font-weight-thin h3">Dimensiuni</p>
                            </div>
                        
                            <v-container fluid class="d-flex flex-wrap justify-content-center font-weight-bold">
                                <div v-if="selectedProductData.productOptions.dimensionVariaties.length > 0">
                                    <v-checkbox
                                    v-for="dimension in selectedProductData.productOptions.dimensionVariaties"
                                    :key="dimension.lungimeDto + dimension.latimeDto + dimension.recomandarePat"
                                    :label="`Dimensiune: ${dimension.lungimeDto}x${dimension.latimeDto} 
                                    - Recomandare pat: ${dimension.recomandarePat} - Pret: ${dimension.pretDto} RON`"
                                    :value="`${dimension.lungimeDto}x${dimension.latimeDto}-${dimension.recomandarePat}`"
                                    v-model="selectedProductData.selectedDimensions"
                                    :checked="selectedProductData.selectedDimensions.includes(`${dimension.lungimeDto}x${dimension.latimeDto}-${dimension.recomandarePat}`)"
                                    color="green"
                                ></v-checkbox>
                                </div>
                            </v-container>
                            <v-container fluid  v-if="selectedProductData && selectedProductData.productOptions.standardManopere.length > 0">
                                    <v-divider></v-divider>
                                    <div class="p-2 my-2 " >
                                        <p class="font-weight-thin h3">Manopere</p>
                                    </div>
                                    <v-select
                                        color="green"
                                        label="Alege manopere pentru produs" 
                                        :items="selectedProductData.productOptions.standardManopere"
                                        item-title="numeManopera"
                                        item-value="numeManopera"
                                        v-model="selectedProductData.selectedManopere"
                                        multiple
                                        chips
                                        >
                                    </v-select>
                                    <v-sheet elevation="12" class="p-1" color="grey-darken-4" v-if="getFullSelectedManopere('passed') && getFullSelectedManopere('passed').length > 0">
                                        <v-card
                                            v-for="(manopera, index) in getFullSelectedManopere('passed')"
                                            :key="index"
                                            class="my-3 mx-1 p-1 bg-grey-darken-2"

                                        >
                                    
                                        <v-card-text class="font-weight-light h6 text-center">
                                            <v-row>
                                                <v-col cols="12">
                                                    <p>Informatii generale</p>
                                                    <v-divider></v-divider>
                                                    <p>Nume manopera : {{ manopera.numeManopera || 'N/A' }} </p>
                                                    <p>Metrii totali folositi : {{ manopera.metruTotalFolosit || 'N/A' }}</p>
                                                </v-col>
                                                <v-divider></v-divider>
                                                <v-col cols="4">
                                                    <p>Informatii rejansa</p>
                                                    <v-divider></v-divider>
                                                    <p>Nume rejansa: {{ manopera.tipGalerie.numeTipRejansa }}</p>
                                                    <p>Pret rejansa: {{ manopera.tipGalerie.pretTipRejansa }} RON/METRU</p>
                                                    <p>Incretire rejansa: {{ manopera.tipGalerie.incretireRejansa }} </p>
                                                    <p>Prindere inele: {{ manopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu' }} </p>
                                                    <v-img v-if="manopera.tipGalerie.presignedUrl !== 'empty'"
                                                        eager
                                                        :aspect-ratio="16 / 9"
                                                        :src="manopera.tipGalerie.presignedUrl"
                                                        >

                                                    </v-img>
                                                    <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Aceasta rejansa nu are imagine asociata.</p>
                                                </v-col>
                                                <v-divider vertical></v-divider>
                                                <v-col cols="4" >
                                                    <p>Informatii inele prindere</p>
                                                    <v-divider></v-divider>

                                                    <p>Culoare inel: {{ manopera?.tipInel?.numeTipInel || 'N/A' }}</p>
                                                    <v-img v-if="manopera?.tipInel?.presignedUrl !== 'empty'"
                                                        eager
                                                        :aspect-ratio="16 / 9"
                                                        :src="manopera?.tipInel?.presignedUrl"
                                                        >

                                                    </v-img>
                                                    <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Acest inel nu are imagine asociata.</p>
                                                </v-col>
                                                <v-divider vertical></v-divider>

                                                <v-col cols="4">
                                                    <p>Informatii cusatura linie</p>
                                                    <v-divider></v-divider>

                                                    <p>Nume cusatura linie: {{ manopera.tipLinie.numeTipCusaturaColt }}</p>
                                                    <p>Pret cusatura linie: {{ manopera.tipLinie.pretTipCusaturaColt }} RON/METRU</p>
                                                    <v-img v-if="manopera.tipLinie.presignedUrl !== 'empty'"
                                                        eager
                                                        :aspect-ratio="16 / 9"
                                                        :src="manopera.tipLinie.presignedUrl"
                                                        >

                                                    </v-img>
                                                    <p v-else class="font-weight-light h5 text-center mb-2 pb-1">Aceasta cusatura nu are imagine asociata.</p>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        
                                        </v-card>
                                    </v-sheet>
                                </v-container>
                        </v-card-text>
                        <v-btn variant="flat" color="success" prepend-icon="mdi-content-save" @click="saveProductToSet()" class="p-2 mb-3 text-center">
                            Salveaza produsul
                        </v-btn>
                    </v-card>
                </v-container>
            </v-container>

            <v-btn v-if="showAddingButton" variant="flat" color="success" @click="showPanelToAddProductToSet()">
                <template v-slot:prepend>
                    <v-icon left color="black">mdi-plus</v-icon>
                </template>
                Adauga produs
            </v-btn>

            <v-container fluid class="text-center w-75">
                <v-alert variant="tonal" type="info">
                    Daca setul nu are pret redus, lasati la 0.
                </v-alert>

                <v-form ref="generalSetForm"  @submit.prevent="saveNewSet()" class="bg-grey-lighten-3 p-2 my-2">
                    <div v-for="data in formStructure" :key="data.label">
                        <template v-if="data.field === 'text-field'">
                            <v-text-field
                                :label="data.label"
                                :placeholder="data.placeholder"
                                :type="data.type"
                                v-model="formData[data.model]"
                                :counter="data.maxLength"
                                :rules="data.rules"
                                variant="outlined"
                                color="black"
                                class="p-2 m-2"
                            >
                                <template v-slot:counter="{ max, value }">
                                    <span :style="{ color: value > max ? 'red' : 'black' }">{{ value }} / {{ max }}</span>
                                </template>
                            </v-text-field>
                        </template>

                        <template v-else-if="data.field === 'text-area'">
                            <v-textarea
                                :label="data.label"
                                :placeholder="data.placeholder"
                                :type="data.type"
                                v-model="formData[data.model]"
                                :counter="data.maxLength"
                                :rules="data.rules"
                                variant="outlined"
                                color="black"
                                class="p-2 m-2"
                            >
                                <template v-slot:counter="{ max, value }">
                                    <span :style="{ color: value > max ? 'red' : 'black' }">{{ value }} / {{ max }}</span>
                                </template>
                            </v-textarea>
                        </template>
                    </div>
                </v-form>

                <v-btn variant="flat" color="success" prepend-icon="mdi-content-save" @click="saveNewSet()" class="p-2 mt-3">
                    Creeaza setul
                </v-btn>
            </v-container>
        </v-container>
    </div>
</template>

<script setup>
import adminService from '~/services/Admin'

import { VTreeview } from 'vuetify/labs/components';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const swal = useNuxtApp().$swal;

const showSuccesAlert = ref(false);
const showErrorAlert = ref(false);
const showPanelToAddProduct = ref(false);
const showAddingButton = ref(true);
const productLoaded = ref(false);
const seturiNames = ref([]);

const selectedProduct = ref(null);
const selectedProductData = ref({
    idProdusDto: 0,
    codProdusDto: '',
    numeProdusDto: '',
    activInMagazinDto: null,
    pretBazaDto: 0,
    tipProdusDto: '',
    productOptions: {
        dimensionVariaties : [],
        colorsVariaties: [],
        standardManopere: [],
    },
    temporar: true,
    selectedColors: [],
    selectedDimensions: [],
    selectedManopere: []
});

var setToCreate = ref({
   descriereSetDto: '',
   numeSetDto: '',
   pretRedusSetDto: 0,
   pretSetDto: 0,
   productsOnSet : []
})

const generalSetForm = ref(null);
const productCodes = ref([])
const formData = ref({
    numeSetDto: '',
    descriereSetDto: '',
    pretSetDto: 0,
    pretRedusSetDto: 0
})

const formStructure = ref([
  {
    field: 'text-field',
    label: 'Nume set',
    placeholder: 'Numele setului',
    type: 'text',
    model: 'numeSetDto',
    maxLength: 100, 
    rules: [
      v => !!v || 'Numele setului nu poate fi gol', 
      v =>  v.length <= 100 || 'Numele setului trebuie sa fie de maxim 100 de caractere',
      v => {
        let isNameUsed = seturiNames.value.find(m => m === String(v).toLowerCase())
        if(isNameUsed !== undefined){
            return 'Numele setului deja exista exista'
        }
            return true
        }
    ]
  },
  {
    field: 'text-area',
    label: 'Descriere set',
    placeholder: 'Descriere setului',
    type: 'text',
    model: 'descriereSetDto',
    maxLength: 150, 
    rules: [
      v => !!v || 'Descriere setului nu poate fi goala',
      v => (v && v.length <= 150) || 'Descriere setului trebuie sa fie de maxim 150 de caractere'
    ]
  },
  {
    field: 'text-field',
    label: 'Pret set',
    placeholder: 'Pretul setului',
    type: 'text',
    model: 'pretSetDto',
    maxLength: 10,
    rules: [
      v => !!v || 'Pretul setului nu poate fi gol',
      v => /^[0-9]*\.?[0-9]+$/.test(v) || 'Pretul trebuie sa fie un numar valid',
    ]
  },
  {
    field: 'text-field',
    label: 'Pret set redus',
    placeholder: 'Pretul setului redus',
    type: 'text',
    model: 'pretRedusSetDto',
    maxLength: 10,
    rules: [
      v => /^[0-9]*\.?[0-9]+$/.test(v) || 'Pretul redus trebuie sa fie un numar valid',
    ]
  },
])

function validateSet() {
    let hasColor = false;
    let validManopere = true;
    let validDimensions = true;
    let productNameWithError;

    for (const product of setToCreate.value.productsOnSet) {
        // Check if at least one product has a selected color
        console.log('nume' , product.numeProdusDto , 'culoare' , product.selectedColors)
        if (product.selectedColors.length > 0) {
            hasColor = true;
            productNameWithError = product.numeProdusDto
        }else{
            hasColor = false
        }

        console.log(product.selectedManopere)
        // Check if 'perdea' or 'draperie' has at least one manopera
        if (
            (product.tipProdusDto.toLowerCase() === 'perdea' || product.tipProdusDto.toLowerCase() === 'draperie') &&
            (product.selectedManopere.length === 0)
        ) {
            productNameWithError = product.numeProdusDto
            validManopere = false;
        }else{
            validManopere = true;
        }

        // Check if a product with dimensions has at least one dimension selected
        if (
            product.productOptions.dimensionVariaties.length > 0 && // The product has dimensions
            product.tipProdusDto.toLowerCase() !== 'perdea' && // Skip perdea
            product.tipProdusDto.toLowerCase() !== 'draperie' && // Skip draperie
            (product.selectedDimensions.length === 0) // No dimension selected
        ) {
            productNameWithError = product.numeProdusDto
            validDimensions = false;
        }else {
            validDimensions = true;
        }
    }

    if (hasColor === false) {
        fireAlarm('error', 'Eroare!', `Trebuie să existe cel puțin un produs cu o culoare selectată. Vezi produsul ${productNameWithError}`, null);
        return false;
    }

    if (validManopere === false) {
        fireAlarm(
            'error',
            'Eroare!',
            `Produsele de tip perdea sau draperie trebuie să aibă o manoperă asociată.Vezi produsul ${productNameWithError}`,
            null
        );
        return false;
    }

    if (validDimensions === false) {
        fireAlarm(
            'error',
            'Eroare!',
            `Produsele cu dimensiuni trebuie să aibă cel puțin o dimensiune selectată.Vezi produsul ${productNameWithError}`,
            null
        );
        return false;
    }

    return true;
}

const getFullSelectedManopere = (product) => {
    if(product === 'passed'){
        return selectedProductData.value.selectedManopere.map((name) =>
            selectedProductData.value.productOptions.standardManopere.find((manopera) => manopera.numeManopera === name)
        );
    }
    return product.selectedManopere.map((name) =>
        product.productOptions.standardManopere.find((manopera) => manopera.numeManopera === name)
    );
};

function fireVAlert(timer , response){
    response.value = true
    setTimeout(() => {
        response.value = false
    }, timer);
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
    }
}

const removeProductFromSet = (async (codProdus) => {
    fireAlarm('info' , 'Asteptati...' , '' , true)
    var productToDelete = setToCreate.value.productsOnSet.find(p => p.codProdusDto === codProdus)
    if(productToDelete.temporar === true){
        let indexOfProductToDeleteFromDto = setToCreate.value.productsOnSet.indexOf(productToDelete);
        setToCreate.value.productsOnSet.splice(indexOfProductToDeleteFromDto,1);
        swal.close()
    }
})

function showPanelToAddProductToSet(){
    showPanelToAddProduct.value = true;
    showAddingButton.value = false;
}

function closeAddProductToSet(){
    showPanelToAddProduct.value = false;
    showAddingButton.value = true;
    productLoaded.value = false
}

const addProductToSet = (async () => {
    const getSelectedProductData = await adminService.getProductDataForSetAdding(selectedProduct.value)
    if(Object.keys(getSelectedProductData).length > 0){
        fireVAlert(3000 , showSuccesAlert)
        selectedProductData.value.idProdusDto = getSelectedProductData.idProdusDto;
        selectedProductData.value.codProdusDto = getSelectedProductData.codProdusDto;
        selectedProductData.value.numeProdusDto = getSelectedProductData.numeProdusDto;
        selectedProductData.value.activInMagazinDto = getSelectedProductData.activInMagazinDto;
        selectedProductData.value.pretBazaDto = getSelectedProductData.pretBazaDto;
        selectedProductData.value.tipProdusDto = getSelectedProductData.tipProdusDto;
        selectedProductData.value.productOptions = getSelectedProductData.productOptions;
        selectedProductData.value.productOptions.temporar = false;
        selectedProductData.value.selectedColors = [];
        selectedProductData.value.selectedDimensions = [];
        selectedProductData.value.selectedManopere = [];
        productLoaded.value = true;

    }else{
        fireVAlert(3000 , showErrorAlert)
    }
})

function saveProductToSet(){
    let indexOfProduct = setToCreate.value.productsOnSet.findIndex(p => 
        p.codProdusDto === selectedProductData.value.codProdusDto)
    if(indexOfProduct !== -1){
        fireAlarm('info' , 'Atentie' , 'Produsul se afla deja in set' , null)
        return;
    }

    const newProductToSet = {
        idProdusDto : selectedProductData.value.idProdusDto,
        codProdusDto : selectedProductData.value.codProdusDto,
        numeProdusDto : selectedProductData.value.numeProdusDto,
        activInMagazinDto : selectedProductData.value.activInMagazinDto,
        pretBazaDto : selectedProductData.value.pretBazaDto,
        tipProdusDto : selectedProductData.value.tipProdusDto,
        productOptions : selectedProductData.value.productOptions,
        temporar: selectedProductData.value.temporar,
        selectedColors : selectedProductData.value.selectedColors,
        selectedDimensions : selectedProductData.value.selectedDimensions,
        selectedManopere : selectedProductData.value.selectedManopere
    }

    setToCreate.value.productsOnSet.push(newProductToSet);
    console.log(setToCreate.value)
    closeAddProductToSet();
}

async function saveNewSet(){
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)

    if (setToCreate.value.productsOnSet.length < 2) {
        fireAlarm('error', 'Eroare!', 'Un set trebuie să aibă cel puțin două produse!', null);
        return; // Stop further execution
    }

    const isValid = await generalSetForm.value.validate()
    const isSetValid = validateSet();
    if(isSetValid){
        if(isValid.valid){
            setToCreate.value.numeSetDto = formData.value.numeSetDto
            setToCreate.value.descriereSetDto = formData.value.descriereSetDto
            setToCreate.value.pretSetDto = formData.value.pretSetDto
            setToCreate.value.pretRedusSetDto = formData.value.pretRedusSetDto
        
            const form = new FormData();

            form.append('newSet' , JSON.stringify(setToCreate.value));
            console.log('In form new set',JSON.parse(form.get('newSet')));

            const responseFromAddingSet = await adminService.updateOrAddSet(null,form)

            if(responseFromAddingSet === 1){
                swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Setul a fost adaugat cu succes",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigateTo('/admin/seturi')
            }else{
                fireAlarm('error' , 'Eroare!' , 'O eroare a avut loc!' , null);
            }
        }else{
            fireAlarm('error' , 'Eroare!' , 'Verificati formularul din nou!' , null);
            return
        }
   
    }
    
}

const getProductCodes = (async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const getCodes = await adminService.getProductCodes()
    if(getCodes.length === 0){
        swal.close()
        fireAlarm('info' , 'Info' , 'Nu aveti produse in baza de date', null);
    }else if(getCodes.length !== 0){
        swal.close()
        productCodes.value = getCodes
    }
})

const getSeturiNames = (async () => {
    const getSeturiNames = await adminService.getSeturiNames()
    if(getSeturiNames.length !== 0){
        seturiNames.value = getSeturiNames
        
    }
})

onMounted(async () => {
    await getProductCodes()
    await getSeturiNames()
})
</script>
