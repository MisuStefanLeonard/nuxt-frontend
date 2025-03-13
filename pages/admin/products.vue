<template>
  <div class="bg-grey-darken-4">
    <p class="font-weight-light h3 text-center p-2">Produse</p>
    <v-divider></v-divider>

    <!-- File Upload and Buttons -->
    <v-container fluid class="text-center mt-4">
      <v-alert v-if="fileError" type="error" dismissible class="m-3" closable>
        {{ fileErrorMessage }}
      </v-alert>

      <v-alert v-if="waitForParsing" type="info" dismissible class="m-3" closable>
        {{ waitForParsingText }}
      </v-alert>

      <v-alert v-if="succesWhenParsing" type="success" dismissible class="m-3" closable>
        {{ succesWhenParsingText }}
      </v-alert>

      <v-alert v-if="errorWhenParsing" type="error" dismissible class="m-3" closable>
        {{ errorWhenParsingText }}
      </v-alert>

      <v-file-input
        ref="fileInput"
        accept=".xlsx"
        v-model="productsExcel"
        style="display: none;"
        @change="importExcel()"
      ></v-file-input>
      <v-sheet class="p-2 m-2"  color="grey-darken-3" elevation="24">
        <p class="text-white h3 font-weight-light">
          <v-icon size="24" color="primary" :icon="mdiInformation"></v-icon>
          Informatii
          
        </p>
          <v-container>
              <v-alert type="info" variant="tonal" class="">
                  <p>- Aici se afla modificarea produselor din magazin ,
                  unde doar cu un simplu click se pot activa/dezactiva.</p>
                  <p>- De asemenea, cautarea este foarte simplu de folosit!
                    Cautati dupa <b class="text-white">numele produsului</b>, dupa <b class="text-white">cod</b>, dupa <b class="text-white">tipul produsului</b>,
                    dupa <b class="text-white">categoria</b> acestuia , cat si dupa starea lui in magazin!
                  </p>
                  <p>- Pentru cautarea dupa starea acestuia, folositi cuvintele:
                    <b class="text-green">activ</b> pentru produsele active si 
                    <b class="text-red">neactiv</b> pentru produsele neactive
                  </p>
              </v-alert>
              <v-alert type="info" variant="tonal" class="my-3">
                <a class="text-white" href="/admin/excel_structure">Aici puteti gasii structura fisierului excel pentru importarea in masa a diferitelor produse</a>
                <p class="text-white font-weight-bold">Daca apasati pe butonul  <v-icon size="24" color="red" right :icon="mdiDelete"></v-icon> produsul va:</p>
                <ol>
                  <li>
                    Daca produsul are comenzi pe el , acesta nu va fi sters , doar nu v-a mai fi afisat.
                  </li>
                  <li>
                    Daca produsul nu are comenzi pe el , acesta va fi sters de TOT!
                  </li>
                </ol>
              </v-alert>
          </v-container>
      </v-sheet>
      <v-row no-gutters>
        <v-col cols="6" class="d-block">
          <v-container>
            <p class="h5 font-weight-light text-white">Sectiunea de adaugare de produse</p>
            <v-btn rounded color="success" class="m-2 " @click="triggerFileInput()">
              Importa Excel
              <v-icon size="24" class="pl-3" right :icon="mdiFileUpload"></v-icon>
            </v-btn>
            <v-btn rounded class="m-2 " color="primary" @click="redirectToAddingProduct()">
              Adauga Produs
              <v-icon size="24" class="pl-3" right :icon="mdiPlus"></v-icon>
            </v-btn>
          </v-container>
        </v-col>
        <v-divider class="border-opacity-50" color="success" vertical></v-divider>
        <v-col cols="6" class="d-block">
          <v-container class="">
            <p class="h5 font-weight-light text-white">Optiune pentru produsele selectate</p>
            <v-btn rounded color="error" class="m-2 " @click="deleteSelectedProducts()">
              Sterge
              <v-icon size="24" class="pl-3" right :icon="mdiDelete"></v-icon>
            </v-btn>
            <v-btn rounded color="primary" class="m-2 " @click="activateSelectedProducts()">
              Activeaza in magazin
              <v-icon size="24" class="pl-3" right :icon="mdiToggleSwitchOutline"></v-icon>
            </v-btn>
          </v-container>
        </v-col>
        <v-divider class="border-opacity-50" color="success" vertical></v-divider>
      </v-row>
    </v-container>

    <v-divider class="my-4"></v-divider>

    <!-- Search Field -->
    <!-- Error and Empty Alerts -->
    <div class="p-3">
      <v-alert v-if="errorOnLoadingProducts" type="error" dismissible class="m-2">
        {{ errorOnLoadingProductsText }}
      </v-alert>

      <v-alert v-else-if="emptyProducts" type="warning" dismissible class="m-2">
        {{ emptyProductsText }}
      </v-alert>

      <!-- Data Table -->
      <v-card
        v-if="products.value !== '0'"
        class="bg-blue-grey-darken-4 rounded-xl"
        variant="outlined"
      >
        <v-card-title class="text-center">Produse</v-card-title>
        <v-text-field
          v-model="search"
          label="Cauta"
          :prepend-inner-icon="mdiMagnify"
          class="p-3 mx-3"
          variant="outlined"
        ></v-text-field>

        <v-data-table v-if="isLoaded"
          :headers="headers"
          :items="filteredProducts"
          :items-per-page="15"
          item-value="codProdusAdminDto"
          v-model="selectedProducts"
          show-select
          class="bg-blue-grey-darken-4"
        >
          <!-- Toggle Activation/Deactivation for Each Row -->
          <template #[`item.activInMagazinDto`]="{ item }">
            <v-switch
              v-model="item.activInMagazinDto"
              @change="toggleProductStatus(item)"
              color="success"
              :label="item.activInMagazinDto === true ? 'Activ in magazin' : 'Nu e activ in magazin'"
            ></v-switch>
          </template>

          <!-- Custom Actions for Each Row -->
          <template #[`item.actions`]="{ item }">
            <v-icon
              color="primary"
              size="28"
              class="mr-2"
              @click="seeProductPage(item.codProdusAdminDto)" :icon="mdiEye"
            >
              
            </v-icon>
            <v-icon
              color="error"
              size="28"
              @click="deleteProduct(item.codProdusAdminDto)" :icon="mdiDelete"
            >
             
            </v-icon>
          </template>

          <!-- Custom Categories Display -->
          <template #[`item.categoriiProdusDto`]="{ item }">
            {{ item.categoriiProdusDto?.join(', ') || 'No Categories' }}
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { mdiDelete, mdiEye, mdiFileUpload, mdiInformation, mdiMagnify, mdiPlus, mdiToggleSwitchOutline } from '@mdi/js'
import { ref, computed, onMounted } from 'vue'
import adminService from '~/services/Admin'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

// Reactive state variables
const search = ref('')
const productsExcel = ref(null)
const fileError = ref(false)
const waitForParsing = ref(false)
const emptyProducts = ref(false)
const errorOnLoadingProducts = ref(false)
const succesWhenParsing = ref(false)
const errorWhenParsing = ref(false)
const products = ref([])
const selectedProducts = ref([])
const isLoaded = ref(false)

// Static text
const fileErrorMessage = 'Extensia incorecta! Extensia trebuie sa fie .xlsx'
const waitForParsingText = 'Asteptati pentru citirea fisierului excel...'
const emptyProductsText = 'Nu aveti produse adaugate'
const errorOnLoadingProductsText = 'O eroare a avut loc!'
const succesWhenParsingText = 'Fisierul a fost procesat cu succes!'
const errorWhenParsingText = 'O eroare a avut loc la parsarea fisierului'
const swal = useNuxtApp().$swal
// Table headers
const headers = [
  { title: 'Cod produs', align: 'center', key: 'codProdusAdminDto' },
  { title: 'Nume produs', align: 'center', key: 'numeProdusAdminDto' },
  { title: 'Tip produs', align: 'center', key: 'tipProdusDto' },
  { title: 'Categoriile produsului', align: 'center', key: 'categoriiProdusDto' },
  { title: 'Activ/Dezactiv', align: 'center', key: 'activInMagazinDto', sortable: false },
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
]

// Computed properties
const filteredProducts = computed(() => {
  if (!search.value) return products.value;
  let searchTerm = search.value.toLowerCase();
  if (searchTerm === 'activ') {
    searchTerm = true;
  } else if (searchTerm === 'neactiv') {
    searchTerm = false;
  }
  return products.value.filter((product) => {
    return (
      product.codProdusAdminDto.toLowerCase().includes(searchTerm) ||
      product.numeProdusAdminDto.toLowerCase().includes(searchTerm) ||
      product.tipProdusDto.toLowerCase().includes(searchTerm) ||
      product.categoriiProdusDto.some((cat) =>
        cat.toLowerCase().includes(searchTerm)
      ) ||
      product.activInMagazinDto == searchTerm
    );
  });
})


// Fetch products on component creation
onBeforeMount(() => {
  getProducts()
})
onMounted(() => {
  isLoaded.value = true;
})

// Methods
const getProducts = async () => {
  try {
    const response = await adminService.getProductsForAdminPage();
  
    if (response === -1) {
      errorOnLoadingProducts.value = true;
    } else if (response === -2) {
      navigateTo('/user/logout');
    } else if (response === 0) {
      emptyProducts.value = true;
      return;
    } else if(typeof(response) === 'string' && response.length === 0) {
     emptyProducts.value = true
    }else{
      products.value = response.map((product) => ({
        ...product,
        categoriiProdusDto: product.categoriiProdusDto || [],
      }));
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    errorOnLoadingProducts.value = true;
  }
}

const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
}

const importExcel = async () => {
  if (!productsExcel.value) {
    fileError.value = true;
    return;
  }
  waitForParsing.value = true;
  const response = await adminService.uploadXlsxFile(productsExcel.value);
  if (response.status === 200) {
    succesWhenParsing.value = true;
    waitForParsing.value = false;
    productsExcel.value = null; 
    window.location.reload()
    return;
  } else {
    waitForParsing.value = false;
    errorWhenParsing.value = true; 
    productsExcel.value = null; 
    fireAlarm('error' , 'Eroare' , response.message , 60000);
    return;
  }
    
  
}

const seeProductPage = (productCode) => {
  navigateTo(`/admin/product/${productCode}`);
}

function fireAlarm(icon , title , text , timer){
  swal.fire({
    icon:icon,
    title: title,
    text: text,
    timer: timer,
  });
}

const deleteProduct = async (productCode) => {
  const responseFromProductDeletion = await adminService.deleteProduct(productCode);
  if (responseFromProductDeletion === 1) {
    fireAlarm('success',"Succes",'Produsul a fost sters cu succes',1000)
    products.value = products.value.filter(product => product.codProdusAdminDto !== productCode);
  } else if (responseFromProductDeletion === -1) {
    fireAlarm('error',"Eroare",'Produsul nu mai exista! Dati un refresh la pagina',2000)
  }else if(responseFromProductDeletion === -3){
    swal.fire({
      icon: 'warning',
      title: 'Atentie',
      text: 'Produsul este cumparat de catre cineva in acest moment. Va rugam asteptati!',
      timer: 5000,
    });
  }  else {
    fireAlarm('error',"Eroare",'O eroare a avut loc!Dati un refresh la pagina',2000)

  }
}

const toggleProductStatus = async (product) => {
  const response = await adminService.toggleProductStatus(
    product.codProdusAdminDto,
    product.activInMagazinDto
  );
  if (response === 1) {
   swal.fire({
      icon: 'success',
      title: 'Succes',
      text: `Produsul a fost ${
        product.activInMagazinDto ? 'activat' : 'dezactivat'
      } cu succes`,
      timer: 1500,
    });
  } else if(response === -3){
    swal.fire({
      icon: 'warning',
      title: 'Atentie',
      text: 'Produsul este cumparat de catre cineva in acest moment. Va rugam asteptati!',
      timer: 5000,
    });
  } 
  else {
    fireAlarm('error',"Eroare",'O eroare a avut loc!Dati un refresh la pagina',2000)
    product.activInMagazinDto = !product.activInMagazinDto; 
  }
}

const deleteSelectedProducts = async () => {
  if (selectedProducts.value.length === 0) {
    fireAlarm('error',"Eroare",'Nu aveti niciun produs selectat',2000)
    return;
  }
  const responseFromDeletingSelectedProducts = await adminService.bulkOperations(selectedProducts.value, 'deletion' , 'produse');
  if (responseFromDeletingSelectedProducts === 1) {
    fireAlarm('success',"Succes",'Ati sters produsele selectate cu succes',1000)
    products.value = products.value.filter(product => !selectedProducts.value.includes(product.codProdusAdminDto));
    selectedProducts.value = [];
  } else if(response === -3){
    swal.fire({
      icon: 'warning',
      title: 'Atentie',
      text: 'Unul dintre produse este cumparat de catre cineva in acest moment. Va rugam asteptati!',
      timer: 5000,
    });
    return
  } else {
    fireAlarm('error',"Eroare",'O eroare a avut loc',2000)
}}

const activateSelectedProducts = async () => {
  // Check if there are selected products
  if (selectedProducts.value.length === 0) {
    fireAlarm('error', "Eroare", 'Nu aveti niciun produs selectat', 2000);
    return;
  }

  // Filter only the deactivated products for activation
  const productsToActivate = selectedProducts.value.filter(
    (productId) => {
      const product = products.value.find(p => p.codProdusAdminDto === productId);
      return product && !product.activInMagazinDto;
    }
  );

  // If no products need to be activated, notify the user and exit
  if (productsToActivate.length === 0) {
    fireAlarm('info', "Info", 'Toate produsele selectate sunt deja activate', 2000);
    return;
  }

  // Call the bulk activation operation with filtered products
  const responseFromActivatingSelectedProducts = await adminService.bulkOperations(productsToActivate, 'update', 'produse');
  if (responseFromActivatingSelectedProducts === 1) {
    fireAlarm('success', "Succes", 'Ati activat produsele selectate cu succes', 2000);

    // Update products list to mark these products as activated
    products.value.forEach(product => {
      if (productsToActivate.includes(product.codProdusAdminDto)) {
        product.activInMagazinDto = true;
      }
    });

    // Clear the selected products
    selectedProducts.value = [];
  } else if(response === -3){
    swal.fire({
      icon: 'warning',
      title: 'Atentie',
      text: 'Unul dintre produse este cumparat de catre cineva in acest moment. Va rugam asteptati!',
      timer: 5000,
    });
    return
  }else {
    fireAlarm('error', "Eroare", 'O eroare a avut loc', 2000);
  }
};


const redirectToAddingProduct = () => {
  navigateTo('/admin/product/add');
}
</script>

<style scoped>
/* Add any specific styling here */
</style>
