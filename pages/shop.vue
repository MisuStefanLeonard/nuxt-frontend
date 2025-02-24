<template>
    <div class="background-wrapper">
        <div class="background"></div>
        <div class="content" fluid>
          <v-container fluid>
            <p class="font-weight-light h1 text-center">{{ $t('shop.products') }}</p>
          </v-container>
          <div fluid class="mt-3">
            <v-sheet elevation="24" color="grey-lighten-4 p-2">

              <v-sheet elevation="24" class="p-2 m-3">
                <v-row no-gutters class=" p-2">
                <v-col cols="12" >
                  <p class="font-weight-light h5 text-center">{{ $t('shop.filters') }}</p>
                  <v-row no-gutters>
                    <v-col cols="12" sm="12" md="12" xs="12" class="p-3 ">
                      <v-select
                        item-color="primary"
                        multiple
                        variant="outlined"
                        :label="`${$t('shop.productType')}`"
                        density="comfortable"
                        v-model="productTypes"
                        chips
                        closable-chips
                        clearable
                        :items="filterOptions.filterProductTypes">
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" xs="12" class="p-3 ">
                      <v-select
                        item-color="primary"
                        variant="outlined"
                        multiple
                        :label="`${$t('shop.color')}`"
                        density="comfortable"
                        v-model="productColors"
                        chips
                        clearable
                        :items="filterOptions.filterColors">
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" xs="12"  class="p-2">
                      <v-row no-gutters>
                        <v-col cols="12" class="p-2">
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                v-model="rangeWidth[0]"
                                density="compact"
                                type="number"
                                variant="outlined"
                                :label="`${$t('shop.minWidth')}`"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                v-model="rangeWidth[1]"
                                density="compact"
                                type="number"
                                variant="outlined"
                                :label="`${$t('shop.maxWidth')}`"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-range-slider
                          color="primary"
                          :max="300"
                          :min="0"
                          :step="5"
                          density="comfortable"
                          v-model="rangeWidth">
                          </v-range-slider>
                        </v-col>
                        <v-col cols="12" class="p-2">
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                v-model="rangeHeight[0]"
                                density="compact"
                                type="number"
                                variant="outlined"
                                :label="`${$t('shop.minHeight')}`"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                v-model="rangeHeight[1]"
                                density="compact"
                                type="number"
                                variant="outlined"
                                :label="`${$t('shop.maxHeight')}`"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-range-slider
                          color="primary"
                          :max="300"
                          :min="0"
                          :step="5"
                          density="comfortable"
                          v-model="rangeHeight">
                          </v-range-slider>
                        </v-col>
                        <v-col cols="12" class="p-2">
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                v-model="rangePrice[0]"
                                density="compact"
                                type="number"
                                variant="outlined"
                                :label="`${$t('shop.minPrice')}  ${selectedCurrency === 'RON' ? '(RON)' : '(EUR)'}`"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                v-model="rangePrice[1]"
                                density="compact"
                                type="number"
                                variant="outlined"
                                :label="`${$t('shop.maxPrice')}  ${selectedCurrency === 'RON' ? '(RON)' : '(EUR)'}`"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-range-slider
                          color="primary"
                          :max="selectedCurrency === 'RON' ? 2000 : 400"
                          :min="0"
                          :step="10"
                          density="comfortable"
                          v-model="rangePrice">
                          </v-range-slider>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" xs="12" class="p-2">
                      <v-container fluid>
                         <v-checkbox label="Exclude de la filtrare: "
                         v-model="excludeFromFiltration" color="green"
                         >

                         </v-checkbox>
                        <v-switch 
                        :label="`Fata reversibila : ${fataReversibila  ? $t('yes') : $t('no')}`"
                        density="comfortable"
                        v-model="fataReversibila"
                        inset
                        color="success"
                        :false-value="false"
                        :true-value="true">
                      </v-switch>
                      </v-container>
                      
                    </v-col>
                    <v-col cols="12" sm="12" md="12" xs="12" class="p-2 text-center">
                      <v-row no-gutters>
                        <v-col cols="12" xs="12" sm="12" md="6" class="my-1">
                          <v-btn variant="flat" color="success"
                          @click="applyFilters" :append-icon="mdiFilter">
                            {{ $t('shop.applyFilters') }}
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn cols="12" xs="12" sm="12" md="6"
                          variant="flat" color="error" class="my-1"
                          @click="deleteFilters">
                          {{ $t('shop.deleteFilters') }}
                          </v-btn>
                        </v-col>
                      </v-row>
                      
                    </v-col>
                  </v-row>
                 
                </v-col>
              </v-row>
              </v-sheet>
              <v-divider opacity="0"></v-divider>
              <v-row no-gutters id="products">
                <v-col sm="6" xs="12" md="6" v-for="product in currentProductsOnPage"
                  :key="product.codProdusDto" class="my-2">
                  <v-card class="bg-grey-lighten-3 p-3 m-2 h-100" elevation="24"
                    >
                    <v-card-title >
                      <div
                        class="ribbon"
                        v-if="
                          (product.dimensiuniProduseDto.length <= 0 && product.pretBazaRedusDto > 0) || 
                          (product.dimensiuniProduseDto.some(dim => dim.pretRedusDto > 0))
                        "
                      >
                        {{ $t('shop.discount') }}
                      </div>
                      <p  class="font-weight-thin h5 text-center">{{ product.numeProdusDto.toUpperCase() }}</p>
                    </v-card-title>
                    <v-card-text class="text-center">
                      <div v-if="product.dimensiuniProduseDto.length > 0" class="mb-2">
                        <span>* Pretul difera in functie de dimensiunea produsului</span>
                        <br>
                        <span>* Pretul afisat este pentru cea mai mica dimensiune</span>
                      </div>
                      <v-carousel hide-delimiters 
                        show-arrows="hover"
                        hide-delimiter-background
                        cycle
                        class="mb-2"
                        height="300">
                        <template v-if="allImages(product).length > 0">
                          <v-tooltip :text="`${t('general.openImage')}`">
                              <template v-slot:activator="{props}">
                                  <v-carousel-item v-for="image in allImages(product)"
                                      eager
                                      :key="image.presignedUrl"
                                      :src="image.presignedUrl"
                                      @click="openImageModal(product)"
                                      v-bind="props"
                                      class="cursor-pointer"
                                      :aspect-ratio="3 / 4">
                                  </v-carousel-item>
                              </template>
                          </v-tooltip>
                        </template>

                        <!-- Fallback when no images are found -->
                        <template v-else>
                          <v-carousel-item src="/notFound.png" cover></v-carousel-item>
                        </template>
                      </v-carousel>
                      <v-dialog v-model="isImageModalOpen" max-height="700" max-width="600">
                        <v-card >
                          <v-card-title class="text-center">
                              <v-btn color="primary" text @click="isImageModalOpen = false"><v-icon :icon="mdiClose" size="24"></v-icon></v-btn>
                          </v-card-title>
                          
                              <v-carousel 
                              hide-delimiters 
                              
                              hide-delimiter-background
                              cycle
                              progress="primary"
                              class="mb-2"
                              >
                              <template v-if="imagesInModal.length > 0">
                                  <v-carousel-item v-for="(image,index) in imagesInModal"
                                  :key="index" :src="image.presignedUrl" :aspect-ratio="4/3"  eager>
                                  </v-carousel-item>
                              </template>

                          
                              <template v-else>
                              <v-carousel-item src="/notFound.png" cover></v-carousel-item>
                              </template>
                          </v-carousel>
                        </v-card>
                      </v-dialog>
                      <v-container fluid>
                        <p v-if="product.dimensiuniProduseDto.length <= 0" class="font-weight-light h5 mb-2">
                          <span v-if="product.pretBazaRedusDto > 0">
                            <s>{{ product.pretBazaDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</s>
                            <br>
                            <span class="text-error font-weight-bold">
                              {{ product.pretBazaRedusDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                            </span>
                          </span>
                          <span v-else>
                            {{ product.pretBazaDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                          </span>
                        </p>
                        <div v-else>
                          <template v-if="product.dimensiuniProduseDto.some(dimension => dimension.pretRedusDto > 0)">
                            <p class="font-weight-light h5 mb-2">
                              <s>{{ product.dimensiuniProduseDto[product.dimensiuniProduseDto.length-1].pretDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</s>
                              <br>
                              <span class="text-error font-weight-bold">
                                {{ product.dimensiuniProduseDto[product.dimensiuniProduseDto.length-1].pretRedusDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                              </span>
                            </p>
                          </template>
                          <template v-else>
                            <p class="font-weight-light h5 mb-2">
                              {{ product.dimensiuniProduseDto[product.dimensiuniProduseDto.length-1].pretDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                            </p>
                          </template>
                        </div>
                      </v-container>
                      <v-row no-gutters>
                        <v-col cols="12" class="my-1">
                          <NuxtLink prefetch :prefetch-on="{interaction: true}"
                            :to="localPath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`)">
                              <v-btn variant="flat" color="primary" >
                                  {{ $t('shop.seeDetails') }} <v-icon class="ml-1" :icon="mdiArrowRight" size="24"></v-icon>
                              </v-btn>
                          </NuxtLink>
                         
                        </v-col >
                        <v-col cols="12" class="my-1">
                          <p class="font-weight-light h5"><span class="h1 font-weight-light">{{ product.reviewsInfoGeneral.averageRating }}</span> / 5</p>
                            <v-rating
                                hover :length="5"
                                :size="24"
                                readonly
                                half-increments
                                v-model="product.reviewsInfoGeneral.averageRating"
                                color="orange-lighten-1"
                                active-color="primary"
                                class="ma-2"
                            ></v-rating>
                            <p class="font-weight-light h5">{{ product.reviewsInfoGeneral.totalReviews }} {{ $t('general.reviews') }}</p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-container v-if="currentProductsOnPage.length > 0" fluid class="bg-grey-lighten-4 text-center elevation-24 my-3">
                  <v-alert v-if="loadNoMoreProductsAlert" type="info" variant="flat" class="mb-2">
                  {{ $t('shop.maxProductsLoaded') }}
                  </v-alert>
                  <v-pagination  v-model="dataPage" :length="getPaginationLen" class="d-none"></v-pagination>
                  <v-btn @click="loadMoreProducts" variant="flat" color="primary">{{ $t('shop.loadMoreProducts') }}</v-btn>
                </v-container>
                <v-container v-else fluid class="bg-grey-lighten-4 text-center m-3 p-2 elevation-24">
                 <p class="font-weight-light h5">{{ $t('shop.noProductFound') }}</p>
                 <v-icon :icon="mdiEmoticonSadOutline" size="24"></v-icon>
                </v-container>
              </v-row>
              
            </v-sheet>
           
          </div>
        </div>
    </div>
</template>


<script setup>
import { mdiArrowRight, mdiClose, mdiEmoticonSadOutline, mdiFilter } from '@mdi/js';
import { ref } from 'vue';
import productService from '~/services/Products'

definePageMeta({
  title : 'Texx - Magazin',
  layout: 'default',
  keywords: [
  'cuverturi de pat', 'cuverturi premium', 'cuverturi moderne', 'cuverturi matrimoniale', 
  'cuverturi din bumbac', 'cuverturi decorative', 'cuverturi pentru dormitor', 
  'cuverturi impermeabile', 'cuverturi termoizolante', 'cuverturi matlasate', 
  'cuverturi elegante', 'cuverturi pentru camera copiilor', 'cuverturi cu imprimeuri',
  'cuverturi catifelate', 'cuverturi rustice', 'cuverturi pentru hoteluri',
  'cuverturi ieftine', 'cuverturi de lux', 'cuverturi textile', 'cuverturi brodate', 
  'cuverturi anti-pete', 'cuverturi rezistente la spălare', 'cuverturi rezistente la uzură', 
  'cuverturi pentru canapele', 'cuverturi pentru fotolii', 'cuverturi lavabile', 
  'cuverturi pentru sezon rece', 'cuverturi vara', 'cuverturi usoare', 'cuverturi groase', 

  'perdele moderne', 'perdele transparente', 'perdele elegante', 'perdele termice', 
  'perdele pentru living', 'perdele pentru dormitor', 'perdele scurte', 'perdele lungi', 
  'perdele pentru bucătărie', 'perdele de lux', 'perdele minimaliste', 'perdele clasice', 
  'perdele cu modele florale', 'perdele cu dungi', 'perdele personalizate', 
  'perdele rustice', 'perdele cu broderie', 'perdele blackout', 'perdele izolante', 
  'perdele pentru copii', 'perdele pentru bebeluși', 'perdele decorative', 
  'perdele pentru hoteluri', 'perdele cu prindere inele', 'perdele cu rejansă', 
  'perdele lavabile', 'perdele anti-mucegai', 'perdele anti-alergice', 

  'draperii moderne', 'draperii termoizolante', 'draperii opace', 'draperii blackout',
  'draperii cu imprimeuri', 'draperii pentru living', 'draperii elegante', 
  'draperii minimaliste', 'draperii vintage', 'draperii catifelate', 'draperii rustice', 
  'draperii cu modele florale', 'draperii lungi', 'draperii scurte', 'draperii personalizate', 
  'draperii pentru dormitor', 'draperii pentru bucătărie', 'draperii pentru birou',
  'draperii de lux', 'draperii cu rejansă', 'draperii cu inele', 'draperii din in', 
  'draperii anti-mucegai', 'draperii anti-alergice', 'draperii lavabile', 

  'perne decorative', 'perne pufoase', 'perne ortopedice', 'perne hipoalergenice', 
  'perne din puf de gâscă', 'perne cu umplutură de bambus', 'perne din spumă cu memorie', 
  'perne ergonomice', 'perne premium', 'perne pentru dormit', 'perne pentru canapele',
  'perne pentru copii', 'perne pentru bucătărie', 'perne pentru fotolii', 
  'perne pentru paturi matrimoniale', 'perne cu arome relaxante', 'perne terapeutice', 
  'perne pentru suport cervical', 'perne cu lavandă', 'perne anti-alergice', 
  'perne anti-praf', 'perne anti-acarieni', 'perne pentru hoteluri', 'perne pentru călătorii',

  'bedspreads', 'luxury bedspreads', 'modern bedspreads', 'cotton bedspreads', 
  'decorative bedspreads', 'hotel bedspreads', 'embroidered bedspreads', 
  'floral bedspreads', 'bedspreads for winter', 'summer bedspreads', 'quilted bedspreads', 
  'double bed bedspreads', 'baby bedspreads', 'hypoallergenic bedspreads', 

  'modern curtains', 'elegant curtains', 'thermal curtains', 'blackout curtains', 
  'minimalist curtains', 'rustic curtains', 'floral curtains', 'short curtains', 
  'long curtains', 'luxury curtains', 'curtains for hotels', 'customized curtains', 
  'kitchen curtains', 'bedroom curtains', 'living room curtains', 'nursery curtains', 
  'embroidered curtains', 'curtains with rings', 'curtains with pleats', 

  'modern drapes', 'thermal drapes', 'opaque drapes', 'blackout drapes', 
  'vintage drapes', 'rustic drapes', 'floral drapes', 'long drapes', 'short drapes', 
  'custom drapes', 'luxury drapes', 'bedroom drapes', 'living room drapes', 
  'office drapes', 'embroidered drapes', 'hotel drapes', 'drapes with rings', 

  'decorative pillows', 'soft pillows', 'orthopedic pillows', 'hypoallergenic pillows', 
  'goose down pillows', 'memory foam pillows', 'ergonomic pillows', 'luxury pillows', 
  'bed pillows', 'couch pillows', 'sofa pillows', 'children’s pillows', 'travel pillows', 
  'therapeutic pillows', 'anti-allergy pillows', 'lavender pillows', 'bamboo pillows', 

  'shop bedspreads', 'shop curtains', 'shop drapes', 'shop pillows', 'home textiles shop', 
  'buy bedspreads online', 'buy curtains online', 'buy drapes online', 'buy pillows online', 
  'premium home textiles', 'luxury home textiles', 'custom curtains online', 
  'custom drapes online', 'best bedspreads for home', 'best curtains for bedroom', 
  'best drapes for living room', 'affordable home decor textiles', 'best online textile store',
  'transport gratis' , 'free delivery' , 'anywhere' , 'everywhere' , 'oriunde in tara'
],
  siteName : 'Texx - Magazin',
  canonicalUrl : 'http://localhost:3000/shop',
  ogType : 'product',
  ogDescription : 'Cuverturi,perdele,draperii si perne de inalta calitate. Transport gratuit la comenzi de peste 300 RON. Livrare oriunde in tara.',
  description : 'Cuverturi,perne si perdele/draperii de inalta calitate. Livrare acasa. Livrare gratis la comanda de peste 300 RON. Livrare in toata tara! '
})


const loadNoMoreProductsAlert = ref(false)
const pageSize = 15;
const currentProductsOnPage = ref([]);
const filterOptions = ref({});
const dataPage = ref(1);
const dimensionsValues = ref([]);
const selectedCurrency = ref('RON');
const excludeFromFiltration = ref(true)

const route = useRoute()
const router = useRouter()
const localPath = useLocalePath();
const {t} = useI18n()

const rangeWidth = ref([0,300])
const rangeHeight = ref([0,300])
const rangePrice = ref([0,2000])

const productTypes = ref([]);
const productColors = ref([]);
const fataReversibila = ref(true)
const isImageModalOpen = ref(false);
const imagesInModal = ref([]);


const getCurrentLocale = () => {
  const currentLanguage = useCookie('i18n_redirected').value;
  if(currentLanguage === 'ro') {
    selectedCurrency.value = 'RON'
  }else if(currentLanguage === 'en'){
    selectedCurrency.value = "EUR"
  }
}

const getNextPageOfProducts = (async (pageNumber,productTypes = null,colorOptions = null,dimensions ,priceRange , reverseFace , currency) => {
  const responseFromPaginatedProducts = 
    await productService.getProductsForUsers(
      pageNumber,productTypes, 
      colorOptions,dimensions,
      priceRange,reverseFace,
      currency);
  if(responseFromPaginatedProducts.length !== null || responseFromPaginatedProducts.length > 0){
    return responseFromPaginatedProducts
  }
})


const getPaginatedProducts = (async (pageNumber,productTypes = null,colorOptions = null,dimensions ,priceRange , reverseFace , currency) => {
  console.log(colorOptions)
  console.log(productTypes)
  console.log(currency)

  const responseFromPaginatedProducts = 
    await productService.getProductsForUsers(
      pageNumber,productTypes, 
      colorOptions,dimensions,
      priceRange,reverseFace,
      currency);
      console.log(responseFromPaginatedProducts)
    currentProductsOnPage.value = responseFromPaginatedProducts
    dimensionsValues.value = []
})

const openImageModal  = (product) => {
    const images = allImages(product);
    isImageModalOpen.value = true;
    imagesInModal.value = images;
}

const getFilterOptions = (async () => {
  const filterOptionsResponse =  await productService.getFilterOptions(selectedCurrency.value);
  Object.assign(filterOptions.value , filterOptionsResponse);
  rangePrice.value[0] = filterOptions.value.pricesRange[0]
  rangePrice.value[1] = filterOptions.value.pricesRange[1]
  // productTypes.value = filterOptions.value.filterProductTypes
  // productColors.value = filterOptions.value.filterColors
  console.log(filterOptions.value)
})

const getPaginationLen = computed(() => {
  if (currentProductsOnPage.value.at(0)) {
    let totalProductsLocal = currentProductsOnPage.value.at(0).totalProducts;
    return totalProductsLocal <= pageSize ? 1 : Math.ceil(totalProductsLocal / pageSize);
  }
  return 1;
});

const fireAlert = (alertType,timer) => {
  alertType.value = true
  setTimeout(() => {
    alertType.value = false
  }, timer);
}

const loadMoreProducts = (async () => {
  if(dataPage.value < getPaginationLen.value){
    dataPage.value++
    const nextPageOfProducts = await getNextPageOfProducts(dataPage.value - 1 , productTypes.value , productColors.value
      ,dimensionsValues.value,rangePrice.value , excludeFromFiltration.value === true ? null : fataReversibila.value === true, selectedCurrency.value)
      currentProductsOnPage.value =  currentProductsOnPage.value.concat(nextPageOfProducts)
    dimensionsValues.value = []
  }else{
    fireAlert(loadNoMoreProductsAlert, 1500)
  }
})

const allImages = ((product) => {
  return product.culoriProdusDto.flatMap(color => color.imaginiProdusDto)
})

const applyFiltersFromQuery = () => {
 
  if (route.query.type) {
    productTypes.value = Array.isArray(route.query.type) ? route.query.type : [route.query.type];
   
  }
  if (route.query.color) {
   
    productColors.value = Array.isArray(route.query.color) ? route.query.color : [route.query.color];
  }
  if(route.query.width){

    rangeWidth.value = Array.isArray(route.query.width) ? route.query.width : [route.query.width];
  
  }
  if(route.query.height){
   
    rangeHeight.value = Array.isArray(route.query.height) ?  route.query.height : [ route.query.height];  
   
  }
  if(route.query.price){
   
    rangePrice.value = route.query.price
  }
  if(route.query.reverseFace){
    
    fataReversibila.value = route.query.reverseFace === 'true'
  }

  

  getPaginatedProducts(0 , productTypes.value , productColors.value , dimensionsValues.value , rangePrice.value , excludeFromFiltration.value === true ? null : fataReversibila.value === true , selectedCurrency.value);
};


const applyFilters = () => {

  router.push({
    query: {
      type: productTypes.value.length ? productTypes.value : undefined,
      color: productColors.value.length ? productColors.value : undefined,
      width: rangeWidth.value.length ? rangeWidth.value : undefined,
      height: rangeHeight.value.length ? rangeHeight.value : undefined,
      price: rangePrice.value.length ? rangePrice.value : undefined,
      reverseFace : excludeFromFiltration.value === true ? undefined : fataReversibila.value === true,
    }
  });

  dimensionsValues.value.push(rangeWidth.value[0])
  dimensionsValues.value.push(rangeWidth.value[1])
  dimensionsValues.value.push(rangeHeight.value[0])
  dimensionsValues.value.push(rangeHeight.value[1])


  
  getPaginatedProducts(0, 
    productTypes.value, 
    productColors.value , 
    dimensionsValues.value,
    rangePrice.value , 
    excludeFromFiltration.value === true ? null : fataReversibila.value === true,
    selectedCurrency.value
  );
};

const deleteFilters = () => {
  productTypes.value = [];
  productColors.value = [];
  excludeFromFiltration.value = true
  router.push({ query: {} });
  getPaginatedProducts(0 , productTypes.value , productColors.value , dimensionsValues.value , rangePrice.value ,excludeFromFiltration.value === true ? null : fataReversibila.value === true, selectedCurrency.value);
};

// watch(() => route.query, applyFiltersFromQuery, { immediate: true });

onMounted(async () => {
  getCurrentLocale();
  await getFilterOptions()
  applyFiltersFromQuery();
 
})

</script>

<style scoped>
.background-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: auto;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/background.jpeg);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
}

.ribbon {
  font-size: 14px;
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
