<template>
    <div class="background-wrapper">
        <div class="background"></div>
        <v-container class="content" fluid>
            <v-container fluid>
                <p class="font-weight-light h1 text-center">{{ $t('shopSeturi.sets') }}</p>
            </v-container>
            <div fluid class="mt-3">
                <v-sheet elevation="24" color="grey-lighten-4 pt-1">
                    <v-sheet elevation="24" class="p-2 m-3">
                        <v-row no-gutters class="p-2">
                            <v-col cols="12">
                                <v-text-field
                                :label="$t('shopSeturi.searchAfterProductName')"
                                variant="outlined" 
                                v-model="searchSetAfter"
                                prepend-icon="mdi-magnify" >
                                
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <p class="font-weight-light h5 text-center">{{ $t('shop.filters') }}</p>
                                <v-row no-gutters>
                                    <v-col cols="12" class="p-3">
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
                                    <v-col cols="12" class="p-2">
                                        <v-row no-gutters>
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
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="12" md="12" xs="12" class="p-2 text-center">
                                <v-row no-gutters>
                                    <v-col cols="12" xs="12" sm="12" md="6" class="my-1">
                                        <v-btn variant="flat" color="success"
                                        @click="applyFilters" append-icon="mdi-filter">
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
                    </v-sheet>
                    <!-- DE ADAUGAT SETURILE! -->
                    <v-row>
                        <v-col sm="6" xs="12" md="6" v-for="set in currentSetsOnPage.shopSets"
                        :key="set.numeSetDto">
                        <v-card class="bg-grey-lighten-3 p-2 m-3 h-100" elevation="24"
                            >
                            <v-card-title >
                            <div class="ribbon" v-if="set.pretRedusSetDto > 0" >{{ $t('shop.discount') }}</div>
                            <p  class="font-weight-thin h5 text-center">{{ set.numeSetDto.toUpperCase() }}</p>
                            </v-card-title>
                            <v-card-subtitle >
                            <v-row>
                                <v-col cols="12" class="text-center">
                                <span>CULORI DISPONIBILE IN SET</span>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                <span v-for="(product,index) in set.setProductsDto"
                                    :key="index" >
                                    <div></div>
                                    <span v-for="(color,index) in product.culoriProdusDto" 
                                        :key="index" >
                                        {{ color.numeCuloareDto }} , 
                                    </span>
                                </span>
                                </v-col>
                            </v-row>
                            </v-card-subtitle>
                            <v-card-text class="text-center">
                            <v-carousel hide-delimiters 
                                hide-delimiter-background
                                cycle
                                class="mb-2"
                                height="450">
                                <template v-if="allImages(set.setProductsDto).length > 0">
                                <v-tooltip :text="`${t('general.openImage')}`">
                                    <template v-slot:activator="{props}">
                                        <v-carousel-item v-for="image in allImages(set.setProductsDto)"
                                            eager
                                            :key="image.presignedUrl"
                                            :src="image.presignedUrl"
                                            @click="openImageModal(set.setProductsDto)"
                                            v-bind="props"
                                            class="cursor-pointer"
                                            :aspect-ratio="16 / 5"
                                            >
                                        </v-carousel-item>
                                    </template>
                                </v-tooltip>
                                
                                </template>

                                <!-- Fallback when no images are found -->
                                <template v-else>
                                <v-carousel-item src="/notFound.png" cover></v-carousel-item>
                                </template>
                            </v-carousel>
                            <v-dialog v-model="isImageModalOpen" max-height="700">
                                <v-card >
                                    <v-card-title class="text-center">
                                        <v-btn color="primary" text @click="isImageModalOpen = false"><v-icon size="24" :icon="mdiClose"></v-icon></v-btn>
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
                                <div v-if="set.pretRedusSetDto > 0" class="font-weight-light h5 mb-2 text-red">
                                    <p class="text-black"><s>{{ set.pretSetDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</s></p>
                                    {{  set.pretRedusSetDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                                </div>
                                <p v-else class="font-weight-light h5 mb-2">{{ set.pretSetDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                            </v-container>
                            <v-row no-gutters>
                                <v-col cols="12" class="my-1">
                                    <NuxtLink prefetch :prefetch-on="{interaction: true}"
                                     :to="localPath(`/set/${set.encodedIdSet}/${set.numeSetDto}`)">
                                        <v-btn variant="flat" color="primary" >
                                            {{ $t('shop.seeDetails') }} <v-icon class="ml-1" size="24" :icon="mdiArrowRight"></v-icon>
                                        </v-btn>
                                    </NuxtLink>
                                  
                                </v-col >
                                <v-col cols="12" class="my-1">
                                    <p class="font-weight-light h5"><span class="h1 font-weight-light">{{ set.reviewsInfoGeneral.averageRating }}</span> / 5</p>
                                    <v-rating
                                        hover :length="5"
                                        :size="24"
                                        readonly
                                        half-increments
                                        v-model="set.reviewsInfoGeneral.averageRating"
                                        color="orange-lighten-1"
                                        active-color="primary"
                                        class="ma-2"
                                    ></v-rating>
                                    <p class="font-weight-light h5">{{ set.reviewsInfoGeneral.totalReviews }} {{ $t('general.reviews') }}</p>
                                </v-col>
                            </v-row>
                            </v-card-text>
                        </v-card>
                        </v-col>
                        <v-container v-if="currentSetsOnPage.shopSets && currentSetsOnPage.shopSets.length > 0" fluid class="bg-grey-lighten-4 m-3 text-center elevation-24">
                            <v-alert v-if="loadNoMoreSetsAlert" type="info" variant="flat" class="mb-2">
                                {{ $t('shop.maxProductsLoaded') }}
                            </v-alert>
                            <v-pagination  v-model="dataPage" :length="getPaginationLen" class="d-none"></v-pagination>
                            <v-btn @click="loadMoreSets" variant="flat" color="primary">{{ $t('shop.loadMoreProducts') }}</v-btn>
                        </v-container>
                        <v-container v-else fluid class="bg-grey-lighten-4 text-center m-3 p-2 elevation-24">
                            <p class="font-weight-light h5">{{ $t('shop.noProductFound') }}</p>
                            <v-icon size="24" :icon="mdiEmoticonSadOutline"></v-icon>
                        </v-container>
                    </v-row>
                    
                </v-sheet>
            </div>
        </v-container>
    </div>
</template>


<script setup>

import { mdiArrowRight, mdiClose, mdiEmoticonSadOutline } from '@mdi/js';
import productService from '~/services/Products'


definePageMeta({
  title : 'Magazin seturi',
  layout: 'default',
  middleware: "locale"
})

const loadNoMoreSetsAlert = ref(false)
const pageSize = 10;
const currentSetsOnPage = ref({
    shopSets: [],
    totalSetsListed: 0,
});
const filterOptions = ref({});
const dataPage = ref(1);
const selectedCurrency = useState('selectedCurrency');
const searchSetAfter = ref('')
const isImageModalOpen = ref(false);
const imagesInModal = ref([]);

const route = useRoute()
const router = useRouter()
const localPath = useLocalePath();
const {t} = useI18n();

// filters options
const rangePrice = ref([0,2000])
const productTypes = ref([]);

const getPaginatedSets = (async (pageNumber,productTypes = null ,priceRange ,productName ,currency) => {
  
  const responseFromPaginatedProducts = 
    await productService.getSetsForUsers(
      pageNumber,productTypes, 
      priceRange,productName,
      currency);

  
  if(responseFromPaginatedProducts.shopSets.length !== null || responseFromPaginatedProducts.shopSets.length > 0){
    currentSetsOnPage.value = responseFromPaginatedProducts
  }
})

const openImageModal  = (setProducts) => {
    const images = allImages(setProducts);
    isImageModalOpen.value = true;
    imagesInModal.value = images;
}


const getFilterOptions = (async () => {
  const filterOptionsResponse =  await productService.getFilterOptions(selectedCurrency.value);
  Object.assign(filterOptions.value , filterOptionsResponse);
  rangePrice.value[0] = filterOptions.value.pricesRange[0]
  rangePrice.value[1] = filterOptions.value.pricesRange[1]
  
})

const getPaginationLen = computed(() => {
  if (currentSetsOnPage.value && currentSetsOnPage.value.shopSets && currentSetsOnPage.value.shopSets.length > 0) {
    let totalProductsLocal = currentSetsOnPage.value.totalSetsListed;
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

const getNextPageOfSets = (async (pageNumber,productTypes = null,priceRange ,productName , currency) => {
  const responseFromPaginatedSets = 
    await productService.getSetsForUsers(
      pageNumber,productTypes, 
      priceRange, productName, currency);
  if(responseFromPaginatedSets.length !== null || responseFromPaginatedSets.length > 0){
    return responseFromPaginatedSets
  }
})

const loadMoreSets = (async () => {
  if(dataPage.value < getPaginationLen.value){
    dataPage.value++
    const nextPageOfSets = await getNextPageOfSets(dataPage.value - 1 , productTypes.value 
      ,rangePrice.value ,  searchSetAfter.value, selectedCurrency.value)
      currentSetsOnPage.value.shopSets =  currentSetsOnPage.value.shopSets.concat(nextPageOfSets.shopSets)
  }else{
    fireAlert(loadNoMoreSetsAlert, 1500)
  }
})

const applyFiltersFromQuery = async () => {

    if (route.query.type) {
        productTypes.value = Array.isArray(route.query.type) ? route.query.type : [route.query.type];
    }
    if(route.query.price){
        rangePrice.value = route.query.price
    }
    if(route.query.productName){
        searchSetAfter.value = route.query.productName
    }

   
    getPaginatedSets(
        0, 
        productTypes.value,
        rangePrice.value ,
        searchSetAfter.value,  
        selectedCurrency.value
    );
};

const allImages = ((products) => {
    return products.flatMap(product => {
        return product.culoriProdusDto.flatMap(color => color.imaginiProdusDto)
        })
    });


const applyFilters = () => {
    router.push({
        query: {
            type: productTypes.value.length ? productTypes.value : undefined,
            price: rangePrice.value.length ? rangePrice.value : undefined,
            productName: searchSetAfter.value !== '' ? searchSetAfter.value : undefined
        }
    })
    getPaginatedSets
    (
        0, 
        productTypes.value, 
        rangePrice.value , 
        searchSetAfter.value, 
        selectedCurrency.value
    );
}
    


const deleteFilters = () => {
    productTypes.value = [];
    searchSetAfter.value = '';
    router.push({ query: {} });
    getPaginatedSets(0, productTypes.value , rangePrice.value,searchSetAfter.value, selectedCurrency.value);
};

const seeSetPage = (encodedIdSet,numeSet) => {
  navigateTo(localPath(`/set/${encodedIdSet}/${numeSet}`))
}

watch(() => route.query, applyFiltersFromQuery, { immediate: true });



onBeforeMount(async () => {
    await getFilterOptions();
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