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
                :rules="[rules.fieldNotEmpty, rules.onlyLetters, validateProductCode,rules.lengthNotAbove(40),rules.checkProductCode]"
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
            <v-col cols="6">
              <v-text-field class="p-2 m-1"
                v-model="product.numeProdusDto"
                label="Nume Produs"
                :counter="50"
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
            <v-col cols="6">
              <v-combobox class="p-2 m-1"
                v-model="product.tipulProdusuluiDto"
                label="Tipul produsului"
                :counter="50"
                variant="outlined"
                :rules="[rules.fieldNotEmpty]"
                :items="['cuvertura', 'perdea']"
              >
              <template v-slot:counter={max,value}>
                  <span :style="{ color: value > max ? 'red' : 'white' }">
                      {{ value }} / {{ max }}
                  </span>
                </template>
            </v-combobox>
            </v-col>
            <v-col cols="12">
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
            </v-col>
            <v-col cols="6">
              <v-text-field class="p-2 m-1"
                v-model="product.compozitieDto"
                label="Compoziție"
                :counter="50"
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
              <v-text-field class="p-2 m-1"
                v-model="product.greutateDto"
                label="Greutate (kg)"
                variant="outlined"
                :rules="[rules.onlyNumbers]"
              ></v-text-field>
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
            <v-col cols="6"> 
              <v-text-field class="p-2 m-1"
                v-model="product.tvaDto"
                label="TVA (%)"
                variant="outlined"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea class="p-2 m-1"
                v-model="product.ingrijireDto"
                label="Instrucțiuni de îngrijire"
                :counter="150"
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
              <v-alert color="info" class="text-center">
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
            <v-alert color="info" class="text-center">
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
            <v-alert color="info" class="text-center">
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
          </v-row>
        </div>

        <!-- Product Types -->
        <div class="bg-grey-darken-4 p-4 mt-4">
          <v-card-title class="font-weight-light text-white">
            Categoriile produsului
          </v-card-title>
          <v-row v-for="(tipProdus, index) in product.tipuriProduseDto" :key="index">
            <v-col cols="10">
              <v-combobox
                v-model="tipProdus.categorieDto"
                :items="productOptions.productCategoriesForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyLetters]"
                :counter="40"
                label="Categorie"
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
            <v-col cols="2" class="d-flex align-center justify-center">
              <v-icon
                @click="deleteType(tipProdus.categorieDto)"
                color="error"
                size="32"
              >mdi-delete-circle</v-icon>
            </v-col>
            <v-divider :thickness="3"></v-divider>
          </v-row>
          <v-btn @click="showTypeForm()" color="white" class="mt-4 rounded-xl" variant="outlined">
            Adaugă tip produs
            <v-icon class="pl-2">mdi-plus</v-icon>
          </v-btn>
        </div>

        <!-- Product Dimensions -->
        <div class="bg-grey-darken-4 p-4 mt-4">
          <v-card-title class="font-weight-light text-white">
            Dimensiuni produs
          </v-card-title>
          <v-row v-for="(dimensiune, index) in product.dimensiuniProduseDto" :key="index">
            <v-col cols="4">
              <v-combobox
                v-model="dimensiune.lungimeDto"
                :items="productOptions.lungimiForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                :counter="4"
                label="Lungime"
                outlined
              ></v-combobox>
            </v-col>
            <v-col cols="4">
              <v-combobox
                v-model="dimensiune.latimeDto"
                :items="productOptions.latimiForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                :counter="4"
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
                size="32"
              >mdi-delete-circle</v-icon>
            </v-col>
            <v-divider :thickness="3"></v-divider>
          </v-row>
          <v-btn @click="showDimensionForm()" color="white" class="mt-4 rounded-xl" variant="outlined">
            Adaugă dimensiune produs
            <v-icon class="pl-2">mdi-plus</v-icon>
          </v-btn>
        </div>

        <!-- Product Colors -->
        <div class="bg-grey-darken-4 p-4 mt-4">
          <v-card-title class="font-weight-light text-white">
            Culorile produsului
          </v-card-title>
          <v-row v-for="(culoare, index) in product.culoriProdusDto" :key="index">
            <v-col cols="5">
              <v-combobox
                v-model="culoare.numeCuloareDto"
                :items="productOptions.culoriForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyLetters]"
                label="Nume Culoare"
                outlined
              ></v-combobox>
            </v-col>
            <v-col cols="5">
              <v-combobox
                v-model="culoare.codCuloareDto"
                :items="productOptions.coduriCuloriForBox"
                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                label="Cod Culoare"
                outlined
              ></v-combobox>
            </v-col>
            <v-col cols="2" class="d-flex align-center justify-center">
              <v-icon
                @click="deleteColor(culoare.numeCuloareDto, culoare.codCuloareDto)"
                color="error"
                size="32"
              >mdi-delete-circle</v-icon>
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
                    prepend-icon="mdi-image"
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
                    @click="deleteImage(culoare.numeCuloareDto, culoare.codCuloareDto, imagine.caleImagineDto, imagine.fisierInBucketDto)"
                    color="error"
                    class="mb-2"
                    size="32"
                  >mdi-delete-circle</v-icon>
                </v-col>
              </v-row>
              <v-btn @click="addImageField(culoare)" color="white" class="mb-4 mt-3 rounded-xl" variant="outlined">
                Adaugă imagine
                <v-icon class="pl-2">mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-divider :thickness="3"></v-divider>
          </v-row>
          <v-btn @click="showColorForm()" color="white" class="mt-4 rounded-xl" variant="outlined">
            Adaugă culoare produs
            <v-icon class="pl-2">mdi-plus</v-icon>
          </v-btn>
        </div>

        <v-btn @click="finalSaveData" color="success" class="font-weight-bold mt-4">
          Salvează modificări
          <v-icon class="pl-2">mdi-content-save</v-icon>
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import Swal from "sweetalert2";
import adminService from '~/services/Admin'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const productCodesAndNames = ref([]);
const codProdusArray = ref([])
const numeProdusArray = ref([])

const product = reactive({
    codProdusDto: '',
    oldCodProdusDto : '',
    descriereDto: '',
    numeProdusDto: '',
    compozitieDto: '',
    tvaDto: 0,
    ingrijireDto: '',
    greutateDto: 0,
    fataReversibilaDto: null,
    stocDto: 0,
    numeProducatorDto: '',
    activInMagazinDto: null,
    pretBazaDto: 0,
    pretBazaRedusDto: 0,
    tipulProdusuluiDto : '',
    justAdded: false,
    tipuriProduseDto: [],
    dimensiuniProduseDto: [],
    culoriProdusDto: [],
});

const productOptions = reactive({
  coduriCuloriForBox: [],
  culoriForBox: [],
  latimiForBox: [],
  lungimiForBox: [],
  productCategoriesForBox: [],
  recomandariForBox: [],
  directoriesInBucket: [],
  manuFacturersDto: [],
  productTypes : []
})


const rules = reactive({
  fieldNotEmpty: (value) => !!String(value) || "Campul este obligatoriu",
  lengthNotAbove: (len) => (value) => 
    !value || value.length <= len || `Limita este de ${len} caractere`,
  onlyNumbers: (value) =>
    /^[0-9]*\.?[0-9]+$/.test(String(value).trim()) ||
    "Doar numere sunt permise",
  onlyLetters: (value) => /^[a-zA-Z\s]+$/.test(value) || "Doar litere sunt permise",
  recomandarePatRule: (value) =>
    /^[0-9]+x[0-9]+$/.test(String(value).trim()) ||
    "Recomandarea pat trebuie sa fie in format 130x270",
  checkProductName: value => {
   
    let isNameAlreadyUsed = numeProdusArray.value.find(name => name === value.toUpperCase());
    if (isNameAlreadyUsed === undefined) {
        return true;
    }
    return 'Numele de produs exista deja'; // Return the error message if the name is found
  },

  checkProductCode: value => {

    let isCodeAlreadyUsed = codProdusArray.value.find(code => code === value.toUpperCase());
    

    if (isCodeAlreadyUsed === undefined) {
        return true; 
    }
    return 'Codul de produs exista deja'; // Return the error message if the code is found
  },
})



onMounted(async () => {
  await assignProductOptionsFromDb();
  await assingProductCodesAndNamesFromDb();
})

onBeforeUnmount(() => {
  product.culoriProdusDto.forEach(color => {
    color.imaginiProdusDto.forEach(image => {
      if (image.presignedUrl) {
        URL.revokeObjectURL(image.presignedUrl);
      }
    });
  });
})

const assignProductOptionsFromDb = async () => {
  const responseForOptions = await adminService.getProductOptions();
  
  if (responseForOptions === 0) {
    console.log("No options for products in db");
  } else {
    Object.assign(productOptions, responseForOptions);
  }
}

const showTypeForm = () => {
  product.tipuriProduseDto.push({
    categorieDto: "",
    justAdded: true,
  });
}

const deleteType = (categorie) => {
  product.tipuriProduseDto = product.tipuriProduseDto.filter(
    (type) =>
      !(
        type.categorieDto === categorie
      )
  );
}

const showDimensionForm = () => {
  product.dimensiuniProduseDto.push({
    lungimeDto: "",
    latimeDto: "",
    pretDto: "",
    pretRedusDto: "",
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
    codCuloareDto: "",
    imaginiProdusDto: [],
    justAdded: true,
  });
}

const deleteColor = (numeCuloare, codCuloare) => {
  product.culoriProdusDto = product.culoriProdusDto.filter(
    (color) =>
      !(
        color.numeCuloareDto === numeCuloare &&
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
      color.numeCuloareDto === numeCuloare &&
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

const assingProductCodesAndNamesFromDb = async () => {
    const response = await adminService.getProductCodesAndNames();

    if(response.length === 0){
        console.log("No products in db");
    }else {
        productCodesAndNames.value = response;
        numeProdusArray.value = productCodesAndNames.value
            .map(elem => elem.numeProdus)
        codProdusArray.value = productCodesAndNames.value
            .map(elem => elem.codProdus)

    }
}


const mainForm = ref(null);

const finalSaveData = async () => {
  console.log(await mainForm.value.validate())

  const isValidForm = await mainForm.value.validate()
  console.log(isValidForm)
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

</script>

<style scoped>
.customBackground {
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
}

.extensionPanelGradient {
  background: linear-gradient(to right, #0083b0, #00b4db);
}
</style>
