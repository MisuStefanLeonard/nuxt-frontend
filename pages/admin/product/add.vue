<template>
  <div>
    <v-card class="p-4 elevation-24 bg-grey-darken-3">
      <v-card-title class="font-weight-light text-center text-white">
        Adăugați un produs nou
      </v-card-title>

      <!-- Product General Information -->
      <v-form ref="mainForm" class="text-white text-center">
        <div>
          <v-row class="p-2 m-2 bg-grey-darken-4">
            <!-- General Fields -->
            <v-col cols="6">
              <v-text-field class="p-2 m-1"
                v-model="product.codProdusDto"
                label="Cod Produs"
                variant="outlined"
                :rules="[rules.fieldNotEmpty, rules.onlyLetters, rules.checkProductCode,rules.lengthNotAbove(40),rules.checkProductCode]"
                :counter="40"
              >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-combobox class="p-2 m-1"
                v-model="product.numeProducatorDto"
                label="Producător"
                variant="outlined"
                :items="productOptions.manuFacturersDto"
                item-title="key"
                item-value="value"
                :rules="[rules.onlyLetters]"
                :counter="30"
              >
              <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
              </template>
            </v-combobox>
            </v-col>
            <v-col cols="6" xs="12" s="12">
                <v-text-field class="p-2"
                    v-model="product.numeProdusJsonDto.nume_ro"
                    
                    label="Nume Produs (Romana)"
                    counter="50"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(50), rules.fieldNotEmpty,rules.checkProductName]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6" xs="12" s="12">
                <v-text-field class="p-2"
                    v-model="product.numeProdusJsonDto.nume_en"
                    
                    label="Nume Produs (Engleza)"
                    :counter="50"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(50), rules.fieldNotEmpty,rules.checkProductNameEn]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
                </v-text-field>
            </v-col>
            <!-- <v-col cols="6">
              <v-text-field class="p-2 m-1"
                v-model="product.numeProdusDto"
                label="Nume Produs"
                :counter="50"
                variant="outlined"
                :rules="[rules.lengthNotAbove(50), rules.fieldNotEmpty,rules.checkProductName]"
              >
             
              </v-text-field>
            </v-col> -->
            <v-col cols="6" xs="12" s="12" v-if="!isLoading">
                <v-combobox class="p-2"
                    @update:search="mapTypeRoToEn(product , product.tipulProdusuluiJsonDto.tip_ro)"
                    v-model="product.tipulProdusuluiJsonDto.tip_ro"
                    label= "Tip produs (Romana)"
                    variant="outlined"
                    :items="getProductTypesRo"
                    :counter="20"
                    :rules="[rules.fieldNotEmpty]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="6" xs="12" s="12" v-if="!isLoading">
                <v-combobox class="p-2"
                    @update:search="mapTypeEnToRo(product , product.tipulProdusuluiJsonDto.tip_en)"
                    v-model="product.tipulProdusuluiJsonDto.tip_en"
                    label= "Tip produs (Engleza)"
                    variant="outlined"
                    :items="getProductTypesEn"
                    :counter="20"
                    :rules="[rules.fieldNotEmpty]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-combobox>
            </v-col>
            <!-- <v-col cols="6">
              <v-combobox class="p-2 m-1"
                v-model="product.tipulProdusuluiDto"
                label="Tipul produsului"
                :counter="50"
                variant="outlined"
                :rules="[rules.fieldNotEmpty]"
                :items="['cuvertura', 'perdea' , 'draperie' , 'perna']"
              >
              <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-combobox>
            </v-col> -->
            <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                <v-textarea class="p-2"
                    v-model="product.descriereJsonDto.descriere_ro"
                    label="Descriere Produs (Romana)"
                    counter="150"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(150), rules.fieldNotEmpty]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                <v-textarea class="p-2"
                v-model="product.descriereJsonDto.descriere_en"
                    label="Descriere Produs (Engleza)"
                    counter="150"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(150), rules.fieldNotEmpty]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-textarea>
            </v-col>
            <!-- <v-col cols="12">
              <v-textarea class="p-2 m-1"
                v-model="product.descriereDto"
                label="Descriere Produs"
                :counter="150"
                variant="outlined"
                :rules="[rules.lengthNotAbove(150), rules.fieldNotEmpty]"
              >
              <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
            </v-textarea>
            </v-col> -->
            <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                <v-text-field class="p-2"
                    v-model="product.compozitieJsonDto.compozitie_ro"
                    label="Compozitie (Romana)"
                    counter="50"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(50)]"
                >
                  <template v-slot:counter={max,value}>
                    <span :style="{ color: value > max ? 'red' : 'white' }">
                        {{ value }} / {{ max }}
                    </span>
                  </template>
                </v-text-field>
            </v-col>
            <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                <v-text-field class="p-2"
                    v-model="product.compozitieJsonDto.compozitie_en"
                    label="Compozitie (Engleza)"
                    counter="50"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(50)]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-checkbox class="p-2 m-1"
                v-model="product.activInMagazinDto"
                label="Activ în magazin"
                variant="outlined"
              ></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox class="p-2 m-1"
                v-model="product.fataReversibilaDto"
                label="Față reversibilă"
                variant="outlined"
              ></v-checkbox>
            </v-col>
            <v-col cols="6" xs="12" s="12">
              <v-checkbox class="p-2"
                    v-model="product.afiseazaInNoutatiDto"
                    label="Afiseaza in Noutati"
                    variant="outlined"
              ></v-checkbox>
            </v-col>
            <v-col cols="6" xs="12" s="12">
              <v-checkbox class="p-2"
                    v-model="product.produsLimitatDto"
                    label="Afiseaza la Produse Limitate"
                    variant="outlined"
              ></v-checkbox>
            </v-col>
            <v-col cols="6"> 
              <v-text-field class="p-2 m-1"
                v-model="product.tvaDto"
                label="TVA (%)"
                variant="outlined"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                <v-textarea class="p-2"
                    v-model="product.ingrijireJsonDto.ingrijire_ro"
                    label="Instrucțiuni de îngrijire (Romana)"
                    counter="150"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(150)]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
              </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                <v-textarea class="p-2"
                    v-model="product.ingrijireJsonDto.ingrijire_en"
                    label="Instrucțiuni de îngrijire (Engleza)"
                    counter="150"
                    variant="outlined"
                    :rules="[rules.lengthNotAbove(150)]"
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
              </template>
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-alert color="warning" class="text-center" variant="tonal">
                Dacă produsul se aduce la comandă, lăsați stocul la 0.
              </v-alert>
            </v-col>
            <v-col cols="12">
              <v-text-field class="p-2 m-1"
                v-model="product.stocDto"
                label="Stoc produs"
                variant="outlined"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
              ></v-text-field>
            </v-col>
            <v-alert color="warning" class="text-center" variant="tonal">
                Daca produsul are pret pe dimensiune , lasati pret baza la 0
            </v-alert>
            <v-col cols="12" xs="12" s="12">
                <v-text-field class="p-2 m-1"
                    v-model="product.pretBazaDto"
                    label="Pret baza produs (lei/m daca este perdea/draperie)"
                    variant="outlined"
                    :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                ></v-text-field>
            </v-col>
            <v-alert color="warning" class="text-center" variant="tonal">
                Daca produsul are pret pe dimensiune , lasati la 0.
            </v-alert>
            <v-col cols="12" xs="12" s="12">
                  <v-text-field class="p-2 m-1"
                      v-model="product.pretBazaRedusDto"
                      label="Pret baza produs redus (lei/m daca este perdea/draperie)"
                      variant="outlined"
                      :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                  ></v-text-field>
            </v-col>
            <v-alert color="warning" class="text-center" variant="tonal">
                Daca produsul este perdea/draperie , daca nu lasati la 0.
            </v-alert>
            <v-col cols="12">
                <v-text-field class="p-2"
                    v-model="product.inaltimeMaximaDto"
                    label="Inaltime maxima material"
                    variant="outlined"
                    :rules="[rules.fieldNotEmpty, rules.onlyNumbers, ]"
                ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <!-- Product Types -->
        <div class="bg-grey-darken-4 p-4 mt-4">
          <v-card-title class="font-weight-light text-white">
            Categoriile produsului
          </v-card-title>
          <v-row v-for="(tipProdus, index) in product.tipuriProduseDto" :key="index">
            <v-col cols="12">
                <v-combobox
                    @update:search="mapCategoryRoToEn(tipProdus , tipProdus.categorieJsonDto.categorie_ro )"
                    class="mx-2"
                    v-model="tipProdus.categorieJsonDto.categorie_ro"
                    :items="getProductCategoriesRo"
                    label="Categorie (Romana)"
                    :counter="40"
                    outlined
                    clearable
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12">
                <v-combobox
                    @update:search="mapCategoryEnToRo(tipProdus,tipProdus.categorieJsonDto.categorie_en )"
                    class="mx-2"
                    v-model="tipProdus.categorieJsonDto.categorie_en"
                    :items="getProductCategoriesEn"
                    label="Categorie (Engleza)"
                    :counter="40"
                    outlined
                    clearable
                >
                <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" class="d-flex align-center justify-center">
                <v-icon :icon="mdiDeleteCircle" @click="deleteType(tipProdus.categorieJsonDto.categorie_ro ,tipProdus.categorieJsonDto.categorie_en )" color="error" size="32"></v-icon>
            </v-col>
            <!-- <v-col cols="10">
              <v-combobox
                v-model="tipProdus.categorieDto"
                :items="productOptions.productCategoriesForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyLetters]"
                :counter="40"
                label="Categorie"
                outlined
                clearable
              >
             
            </v-combobox>
            </v-col>
            <v-col cols="2" class="d-flex align-center justify-center">
              <v-icon
                @click="deleteType(tipProdus.categorieDto)"
                color="error"
                size="32" :icon="mdiDeleteCircle"
              ></v-icon>
            </v-col> -->
            <v-divider :thickness="3"></v-divider>
          </v-row>
          <v-btn @click="showTypeForm()" color="white" class="mt-4 rounded-xl" variant="outlined">
            Adaugă tip produs 
            <v-icon class="pl-2" size="24" :icon="mdiPlus"></v-icon>
          </v-btn>
        </div>

        <!-- Product Dimensions -->
        <div class="bg-grey-darken-4 p-4 mt-4">
          <v-card-title class="font-weight-light text-white">
            Dimensiuni produs (centimetri)
          </v-card-title>
          <v-row v-for="(dimensiune, index) in product.dimensiuniProduseDto" :key="index">
            <v-col cols="4">
              <v-combobox
                v-model="dimensiune.lungimeDto"
                :items="productOptions.lungimiForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers,rules.lengthNotAbove(10)]"
                :counter="10"
                label="Lungime"
                outlined
              ></v-combobox>
            </v-col>
            <v-col cols="4">
              <v-combobox
                v-model="dimensiune.latimeDto"
                :items="productOptions.latimiForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers, rules.lengthNotAbove(10)]"
                :counter="10"
                label="Lățime"
                outlined
              ></v-combobox>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="dimensiune.pretDto"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                label="Preț (RON)"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="dimensiune.pretRedusDto"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                label="Preț redus (RON)"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-combobox
                v-model="dimensiune.recomandarePat"
                :items="productOptions.recomandariForBox"
                :rules="[rules.recomandarePatRule ]"
                :counter="15"
                label="Recomandare pat"
                outlined
              ></v-combobox>
            </v-col>
            <v-col cols="4" class="d-flex align-center justify-center">
              <v-icon
                @click="deleteDimension(dimensiune.lungimeDto, dimensiune.latimeDto, dimensiune.pretDto, dimensiune.pretRedusDto, dimensiune.recomandarePat)"
                color="error"
                size="32" :icon="mdiDeleteCircle"
              ></v-icon>
            </v-col>
            <v-divider :thickness="3"></v-divider>
          </v-row>
          <v-btn @click="showDimensionForm()" color="white" class="mt-4 rounded-xl" variant="outlined">
            Adaugă dimensiune produs
            <v-icon class="pl-2" :icon="mdiPlus" size="24"></v-icon>
          </v-btn>
        </div>

        <!-- Product Colors -->
        <div class="bg-grey-darken-4 p-4 mt-4">
          <v-card-title class="font-weight-light text-white">
            Culorile produsului
          </v-card-title>
          <v-row v-for="(culoare, index) in product.culoriProdusDto" :key="index">
            <v-col cols="12">
                <v-combobox
                    v-model="culoare.codCuloareDto"
                    label="Cod Culoare"
                    :items="productOptions.coduriCuloriForBox"
                    variant="outlined"
                ></v-combobox>
            </v-col>
            <v-col cols="12">
                <v-combobox
                    @update:search="mapColorRoToEn(culoare , culoare.numeCuloareJsonDto.culoare_ro)"
                    v-model="culoare.numeCuloareJsonDto.culoare_ro"
                    label="Nume Culoare (Romana)"
                    :items="getColorsRo"
                    variant="outlined"
                ></v-combobox>
            </v-col>
            <v-col cols="12">
                <v-combobox
                    @update:search="mapColorEnToRo(culoare , culoare.numeCuloareJsonDto.culoare_en)"
                    v-model="culoare.numeCuloareJsonDto.culoare_en"
                    label="Nume Culoare (Engleza)"
                    :items="getColorsEn"
                    variant="outlined"
                ></v-combobox>
            </v-col>
            <v-col cols="12" class="d-flex align-center justify-center">
                <v-icon :icon="mdiDeleteCircle" @click="deleteColor(culoare.numeCuloareJsonDto.culoare_ro, culoare.codCuloareDto)"
                    color="error" size="32"></v-icon>
            </v-col>
            <v-divider :thickness="3"></v-divider>
            <!-- Images for each color -->
            <v-col cols="12">
              <v-row v-for="(imagine, imgIndex) in culoare.imaginiProdusDto" :key="imgIndex">
                <v-col cols="12">
                  <v-combobox
                    v-model="imagine.fisierInBucketDto"
                    label="Categorie fișier"
                    :items="productOptions.directoriesInBucket"
                    outlined
                  ></v-combobox>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="imagine.file"
                    label="Imagine"
                    :prepend-icon="mdiImage"
                    accept="image/*"
                    outlined
                    dense
                    clearable
                    @change="handleFileChange(imagine)"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-img
                    v-if="imagine.presignedUrl"
                    :src="imagine.presignedUrl"
                    aspect-ratio="16/9"
                    width="400"
                    height="400"
                    
                    class="text-center w-100"
                  ></v-img>
                </v-col>
                <v-col cols="12" class="d-flex align-center justify-center">
                  <v-icon
                    @click="deleteImage(culoare.numeCuloareJsonDto.culoare_ro, culoare.codCuloareDto, imagine.caleImagineDto, imagine.fisierInBucketDto)"
                    color="error"
                    class="mb-2"
                    size="32" :icon="mdiDeleteCircle"
                  ></v-icon>
                </v-col>
              </v-row>
              <v-btn @click="addImageField(culoare)" color="white" class="mb-4 mt-3 rounded-xl" variant="outlined">
                Adaugă imagine
                <v-icon class="pl-2" :icon="mdiPlus" size="24"></v-icon>
              </v-btn>
            </v-col>
            <v-divider :thickness="3"></v-divider>
          </v-row>
          <v-btn @click="showColorForm()" color="white" class="mt-4 rounded-xl" variant="outlined">
            Adaugă culoare produs
            <v-icon class="pl-2" :icon="mdiPlus" size="24"></v-icon>
          </v-btn>
        </div>

        <v-btn @click="finalSaveData" color="success" class="font-weight-bold mt-4">
          Salvează modificări
          <v-icon class="pl-2" size="24" :icon="mdiContentSave"></v-icon>
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import Swal from "sweetalert2";
import adminService from '~/services/Admin'
import { mdiContentSave, mdiDeleteCircle, mdiImage, mdiPlus } from '@mdi/js';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
const isLoading = ref(true)
const productCodesAndNames = ref([]);
const codProdusArray = ref([])
const numeProdusArrayRo = ref([])
const numeProdusArrayEn = ref([])

const product = reactive({
    codProdusDto: '',
    oldCodProdusDto : '',
    descriereDto: '',
    descriereJsonDto: {
        descriere_ro: "",
        descriere_en: ""
    },
    numeProdusDto: '',
    numeProdusJsonDto: {
        nume_ro : "",
        nume_en : ""
    },
    compozitieDto: '',
    compozitieJsonDto: {
        compozitie_ro : "",
        compozitie_en : ""
    },
    tvaDto: 0,
    ingrijireDto: '',
    ingrijireJsonDto : {
        ingrijire_ro : "",
        ingrijire_en : ""
    },
    fataReversibilaDto: false,
    stocDto: 0,
    numeProducatorDto: '',
    activInMagazinDto: false,
    pretBazaDto: 0,
    pretBazaRedusDto: 0,
    tipulProdusuluiDto : '',
    tipulProdusuluiJsonDto : {
        tip_ro : "",
        tip_en : ""
    },
    inaltimeMaximaDto : 0,
    afiseazaInNoutatiDto : false,
    produsLimitatDto : false,
    justAdded: false,
    tipuriProduseDto: [],
    tipuriProduseJsonDto: [],
    dimensiuniProduseDto: [],
    culoriProdusDto: [],
    culoriProdusJsonDto: [],

});

const productOptions = ref({
  coduriCuloriForBox: [],
  culoriForBox: [],
  culoriForBoxJson : [],
  latimiForBox: [],
  lungimiForBox: [],
  productCategoriesForBox: [],
  productCategoriesForBoxJson : [],
  recomandariForBox: [],
  directoriesInBucket: [],
  manuFacturersDto: [],
  productTypes : [],
  productTypesJson : [],
});

const rules = reactive({
  fieldNotEmpty: (value) => !!String(value) || "Campul este obligatoriu",
  lengthNotAbove: (len) => (value) => 
    !value || value.length <= len || `Limita este de ${len} caractere`,
    onlyNumbers: (value) =>
    /^\d+(\.\d{1,2})?$/.test(String(value).trim()) ||
    "Doar numere sunt permise",
  onlyLetters: (value) => /^[a-zA-Z\s]+$/.test(value) || "Doar litere sunt permise",
  recomandarePatRule: (value) =>
    /^[0-9]+x[0-9]+$/.test(String(value).trim()) ||
    "Recomandarea pat trebuie sa fie in format 130x270",

  checkProductName: value => {
    let isNameAlreadyUsed = numeProdusArrayRo.value.find(name => name.toUpperCase() === value.toUpperCase());
    if (isNameAlreadyUsed === undefined) {
        return true;
    }
    return 'Numele de produs exista deja'; // Return the error message if the name is found
  },
  checkProductNameEn: value => {
      let isNameAlreadyUsed = numeProdusArrayEn.value.find(name => name.toUpperCase() === value.toUpperCase());
      if (isNameAlreadyUsed === undefined) {
          return true;
      }
      return 'Numele de produs in engleza exista deja'; // Return the error message if the name is found
  },

  checkProductCode: value => {

    let isCodeAlreadyUsed = codProdusArray.value.find(code => code === value.toUpperCase());
    

    if (isCodeAlreadyUsed === undefined) {
        return true; 
    }
    return 'Codul de produs exista deja'; // Return the error message if the code is found
  },
})


const getProductCategoriesRo = computed(() => {
  return productOptions.value.productCategoriesForBoxJson
    ? productOptions.value.productCategoriesForBoxJson.map(item => item.categorie_ro)
    : [];
});

const getProductCategoriesEn = computed(() => {
  return productOptions.value.productCategoriesForBoxJson
    ? productOptions.value.productCategoriesForBoxJson.map(item => item.categorie_en)
    : [];
});

const getColorsRo = computed(() => {
    return productOptions.value.culoriForBoxJson 
    ? productOptions.value.culoriForBoxJson.map(item => item.culoare_ro)
    : [];
})

const getColorsEn = computed(() => {
    return productOptions.value.culoriForBoxJson 
    ? productOptions.value.culoriForBoxJson.map(item => item.culoare_en)
    : [];
})


const getProductTypesRo = computed(() => {
    return productOptions.value.productTypesJson ?
        productOptions.value.productTypesJson.map(item => item.tip_ro)
    : [];
})

const getProductTypesEn = computed(() => {
    return productOptions.value.productTypesJson ?
        productOptions.value.productTypesJson.map(item => item.tip_en)
    : [];
})



const mapColorRoToEn = (color , roValue ) => {
  if(roValue !== null){
    const index = getColorsRo.value.findIndex(category => category === roValue.toLowerCase());
    if (index !== -1) {
      color.numeCuloareJsonDto.culoare_en = getColorsEn.value[index];
    }
  }
};

const mapColorEnToRo = (color , enValue ) => {
  if(enValue !== null){
    const index = getColorsEn.value.findIndex(category => category === enValue.toLowerCase());
    if (index !== -1) {
      color.numeCuloareJsonDto.culoare_ro = getColorsRo.value[index];
    } 
  }
};

const mapCategoryRoToEn = (category , roValue) => {
  if(roValue !== null){
    const index = getProductCategoriesRo.value.findIndex(category => category === roValue.toUpperCase());
    if (index !== -1) {
      category.categorieJsonDto.categorie_en = getProductCategoriesEn.value[index];
    } 
  }
};

const mapCategoryEnToRo = (category ,enValue) => {
  if(enValue !== null){
    const index = getProductCategoriesEn.value.findIndex(category => category === enValue.toUpperCase());
    if (index !== -1) {
      category.categorieJsonDto.categorie_ro = getProductCategoriesRo.value[index];
    } 
  }
  
};


const mapTypeRoToEn = (tipProdus , roValue) => {
  if(roValue !== null){  
    const index = getProductTypesRo.value.findIndex(type => type === roValue.toLowerCase());
    if (index !== -1) {
        tipProdus.tipulProdusuluiJsonDto.tip_en = getProductTypesEn.value[index];
    } 
  }
};

const mapTypeEnToRo = (tipProdus ,enValue ) => {
  if(enValue !== null ){
    const index = getProductTypesEn.value.findIndex(type => type === enValue.toLowerCase());
    if (index !== -1) {
        tipProdus.tipulProdusuluiJsonDto.tip_ro = getProductTypesRo.value[index];
    } 
  }
  
};


const assignProductOptionsFromDb = async () => {
    const responseForOptions = await adminService.getProductOptions();
    
    if (responseForOptions === 0) {
        console.log('No options for products in db');
    } else if (responseForOptions === -2) {
        navigateTo('/user/logout');
    } else {
        Object.assign(productOptions.value, responseForOptions);
        console.log(productOptions.value)
    }
};

const assingProductCodesAndNamesFromDb = async () => {
    const response = await adminService.getProductCodesAndNames();

    if(response.length === 0){
        console.log("No products in db");
    }else {
        productCodesAndNames.value = response;
        numeProdusArrayRo.value = productCodesAndNames.value
            .map(elem => elem.numeProdusJson.nume_ro)
            .filter(numeRo => numeRo !== product.numeProdusJsonDto.nume_ro);
        numeProdusArrayEn.value = productCodesAndNames.value
            .map(elem => elem.numeProdusJson.nume_en)
            .filter(numeEn => numeEn !== product.numeProdusJsonDto.nume_en);
        codProdusArray.value = productCodesAndNames.value
            .map(elem => elem.codProdus)
            .filter(elem => elem !== product.codProdusDto);

        console.log(numeProdusArrayEn.value)
        console.log(numeProdusArrayRo.value)
        console.log(codProdusArray.value)

    }
}

const showTypeForm = () => {
  product.tipuriProduseDto.push({
    categorieDto: "",
    categorieJsonDto : {
      categorie_ro : "",
      categorie_en: "",
    },
    justAdded: true,
  });
}

const deleteType = (categorie,categorieEn) => {
  product.tipuriProduseDto = product.tipuriProduseDto.filter(
    (type) =>
      !(
        type.categorieJsonDto.categorie_ro === categorie &&  type.categorieJsonDto.categorie_en === categorieEn
      )
  );
}

const showDimensionForm = () => {
  product.dimensiuniProduseDto.push({
    lungimeDto: "",
    latimeDto: "",
    pretDto: 0,
    pretRedusDto: 0,
    recomandarePat: "",
    justAdded: true,
  });
}

const deleteDimension = (
  lungime,
  latime,
  pret,
  pretRedus,
  recomandarePat
) => {
  product.dimensiuniProduseDto =
    product.dimensiuniProduseDto.filter(
      (dimension) =>
        !(
          dimension.lungimeDto === lungime &&
          dimension.latimeDto === latime &&
          dimension.pretDto === pret &&
          dimension.pretRedusDto === pretRedus &&
          dimension.recomandarePat === recomandarePat
        )
    );
}

const showColorForm = () => {
  product.culoriProdusDto.push({
    numeCuloareDto: "",
    numeCuloareJsonDto : {
      culoare_ro : "",
      culoare_en : ""
    },
    codCuloareDto: "",
    imaginiProdusDto: [],
    justAdded: true,
  });
}

const deleteColor = (numeCuloare, codCuloare) => {
  product.culoriProdusDto = product.culoriProdusDto.filter(
    (color) =>
      !(
        color.numeCuloareJsonDto.culoare_ro === numeCuloare &&
        color.codCuloareDto === codCuloare
      )
  );
}

const addImageField = (culoare) => {
  culoare.imaginiProdusDto.push({
    file: null,
    fisierInBucketDto: "",
    caleImagineDto: "",
    presignedUrl: "",
    justAdded: true,
  });
}

const handleFileChange = (imagine) => {
  if (imagine.file) {
    imagine.caleImagineDto = imagine.file.name;
    imagine.presignedUrl = URL.createObjectURL(imagine.file);
    imagine.imageStream = imagine.file;
  }
}

const deleteImage = (numeCuloare, codCuloare, caleImagineDto, fisierInBucket) => {
  const currentColor = product.culoriProdusDto.find(
    (color) =>
      color.numeCuloareJsonDto.culoare_ro === numeCuloare &&
      color.codCuloareDto === codCuloare
  );
  if (currentColor) {
    const imageToDelete = currentColor.imaginiProdusDto.find(
      (image) =>
        image.caleImagineDto === caleImagineDto &&
        image.fisierInBucketDto === fisierInBucket
    );
    
    if (imageToDelete && imageToDelete.presignedUrl) {
      URL.revokeObjectURL(imageToDelete.presignedUrl);
    }

    currentColor.imaginiProdusDto = currentColor.imaginiProdusDto.filter(
      (image) =>
        !(
          image.caleImagineDto === caleImagineDto &&
          image.fisierInBucketDto === fisierInBucket
        )
    );
  }
}

const mainForm = ref(null);

const finalSaveData = async () => {
  console.log(await mainForm.value.validate())

  const isValidForm = await mainForm.value.validate()
  
  if(isValidForm.valid)
    {
      Swal.fire({
          title: "Confirmati adaugare?",
          showDenyButton: true,
          showCancelButton: true,
          allowOutsideClick: false, 
          allowEscapeKey: false,
          confirmButtonText: "Da",
          denyButtonText: `Nu`,
      }).then(async (result) => {
          if (result.isConfirmed) {

              if(product.tipulProdusuluiJsonDto.tip_ro.toLowerCase() === 'perdea' || product.tipulProdusuluiJsonDto.tip_ro.toLowerCase() === 'draperie'){
                if(product.inaltimeMaximaDto <= 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Nu ati selectat o inaltime maxima pe material',
                        timer: 7000,
                    });
                  return;
                }
                if(product.dimensiuniProduseDto.length > 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Nu puteti avea dimensiune pe o draperie/perdea',
                        timer: 7000,
                    });
                  return;
                }
                if(product.pretBazaDto <= 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Selectati un pret de baza pentru perdeaua/draperia',
                        timer: 7000,
                    });
                  return;
                }
              }else{
                if(product.dimensiuniProduseDto.length <= 0 && product.pretBazaDto <= 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Daca produsul nu are nicio dimensiune , completati un pret de baza pentru produs si nu adaugati nicio dimensiune',
                        timer: 7000,
                    });
                  return;
                }else if(product.dimensiuniProduseDto.length > 0 && product.pretBazaDto > 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Daca produsul are dimensiune , lasati pretul de baza la 0',
                        timer: 7000,
                    });
                  return;
                }
              }
              product.tipuriProduseDto = product.tipuriProduseDto.filter(type => type.categorieJsonDto.categorie_ro !== ""
                  &&  type.categorieJsonDto.categorie_en !== ""
              )
              product.culoriProdusDto = product.culoriProdusDto.filter(color => color.numeCuloareJsonDto.culoare_ro !== ""
                  &&  color.numeCuloareJsonDto.culoare_en !== "" && color.codCuloare !== ""
              )
              product.dimensiuniProduseDto = product.dimensiuniProduseDto.filter(dimension => dimension.lungimeDto !== "" &&
                dimension.latimeDto !== "" && dimension.pretDto !== "" && dimension.pretDto !== 0 )
              const addingProductResponse = await adminService.saveProductChanges(product,'empty');
              if(Array.isArray(addingProductResponse)){
                  Swal.fire("Salvat!", "", "success");

                  product.culoriProdusDto.forEach(color => {
                    color.imaginiProdusDto.forEach(image => {
                      if (image.presignedUrl) {
                        URL.revokeObjectURL(image.presignedUrl);
                      }
                    });
                  });
                  navigateTo('/admin/products')
                  return
              }else{
                  Swal.fire("Nu s-a salvat.O eroare a avut loc" , "" , "error")
                  return;
              }
          } else if (result.isDenied) {
              Swal.fire("Nu ati salvat nimic", "", "info");
              return;
          }
          });
      return;
    }else{
      Swal.fire({
          icon: 'error',
          title: 'Eroare',
          text: 'O eroare a avut loc la validarea formularului',
          timer: 3000
      })
      return
    }
}

onMounted(async () => {
  await assingProductCodesAndNamesFromDb();
  isLoading.value = false;
})

onBeforeMount(async() => {
    await assignProductOptionsFromDb();
})

// onBeforeUnmount(() => {
//   product.forEach(color => {
//     color.imaginiProdusDto.forEach(image => {
//       if (image.presignedUrl) {
//         URL.revokeObjectURL(image.presignedUrl);
//       }
//     });
//   });
// })

</script>

<style scoped>
.customBackground {
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
}

.extensionPanelGradient {
  background: linear-gradient(to right, #0083b0, #00b4db);
}
</style>
