<template>
    <div class="background-wrapper">
        <div class="background"></div>
        <div class="content" fluid>
            <v-container fluid>
                <p class="font-weight-light h1 text-center">{{ $t('shopSeturi.sets') }}</p>
            </v-container>
            <div fluid class="mt-3 ">
                <v-sheet elevation="24" color="grey-lighten-4">
                    <v-sheet elevation="24" class="" v-if="screenSize === true">
                        <v-row no-gutters class="p-2">
                            <v-col cols="12" class="mb-3">
                                <p class="font-weight-light h5 text-center">{{ $t('shop.filters') }}</p>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                :label="$t('shopSeturi.searchAfterProductName')"
                                variant="outlined" 
                                v-model="searchSetAfter"
                                :prepend-inner-icon="mdiMagnify">
                                
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-2">
                                <v-row no-gutters>
                                    <v-col cols="12" class="">
                                        <v-select
                                            item-color="primary"
                                            multiple
                                            variant="outlined"
                                            :label="`${$t('shop.productType')}`"
                                            density="comfortable"
                                            :item-title="selectedCurrency === 'RON' ? 'tip_ro' : 'tip_en'"
                                            item-value="tip_ro"
                                            v-model="productTypes"
                                            chips
                                            closable-chips
                                            clearable
                                            :items="filterOptions.filterProductTypesJson">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" class="mt-2">
                                        <v-row no-gutters>
                                            <v-col cols="12" class="">
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
                    </v-sheet>
                    
                    <v-row>
                        <v-col v-if="screenSize === 3" cols="3" class="mt-2  p-2 shadow-lg elevation-12 rounded-lg">
                            <p class="font-weight-light h5 text-center">{{ $t('shop.filters') }} <v-icon :icon="mdiFilter"></v-icon></p>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" xs="12" class="p-2 text-center">
                                    <v-row no-gutters>
                                    <v-col cols="12" xs="12" sm="12" md="12" class="my-1">
                                        <v-btn variant="flat" color="success"
                                        @click="applyFilters" :append-icon="mdiFilter">
                                        {{ $t('shop.applyFilters') }}
                                        </v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn cols="12" xs="12" sm="12" md="12"
                                        variant="flat" color="error" class="my-1"
                                        @click="deleteFilters">
                                        {{ $t('shop.deleteFilters') }}
                                        </v-btn>
                                    </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        :label="$t('shopSeturi.searchAfterProductName')"
                                        variant="outlined" 
                                        density="compact"
                                        class="p-2"
                                        v-model="searchSetAfter"
                                        :prepend-inner-icon="mdiMagnify">
                                        
                                    </v-text-field>
                                    <v-expansion-panels>
                                        <v-expansion-panel :title="`${$t('shop.productType')}`" class="p-2 ">
                                            <v-expansion-panel-text>
                                                <v-list>
                                                    <v-list-item>
                                                        <v-checkbox
                                                            v-for="(option, idx) in filterOptions.filterProductTypesJson"
                                                            :key="idx"
                                                            density="compact"
                                                            v-model="productTypes"
                                                            :label="selectedCurrency === 'RON' ? option.tip_ro : option.tip_en"
                                                            :value="option.tip_ro"
                                                            color="primary"
                                                            
                                                        ></v-checkbox>
                                                    </v-list-item>
                                                </v-list>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                        <v-divider></v-divider>
                                        <v-expansion-panel :title="$t('shop.filterPrices')" class="p-2">
                                            <v-expansion-panel-text>
                                                <v-row>
                                                    <v-col cols="12" class="p-2">
                                                        <v-row>
                                                            <v-col cols="12">
                                                                <v-text-field
                                                                    v-model="rangePrice[0]"
                                                                    density="compact"
                                                                    type="number"
                                                                    variant="outlined"
                                                                    :label="`${$t('shop.minPrice')}  ${selectedCurrency === 'RON' ? '(RON)' : '(EUR)'}`"
                                                                ></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12">
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
                                                            density="compact"
                                                            v-model="rangePrice">
                                                        </v-range-slider>
                                                    </v-col>
                                                </v-row>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="9" v-if="screenSize===3" class="overflow-y-scroll overflow-x-hidden overflow-y-visible ">
                            <v-row>
                                <v-col sm="6" xs="12" md="6" v-for="set in currentSetsOnPage.shopSets"
                                    :key="selectedCurrency === 'RON' ? set.numeSetJsonDto.nume_ro : set.numeSetJsonDto.nume_en">
                                    <v-card class="bg-grey-lighten-3 p-2 my-3  h-100" elevation="24"
                                        >
                                        <v-card-title >
                                        <div class="ribbon" v-if="set.pretRedusSetDto > 0" >{{ $t('shop.discount') }}</div>
                                        <p  class="font-weight-thin h5 text-center">{{ selectedCurrency === "RON" ?  set.numeSetJsonDto.nume_ro.toUpperCase() : set.numeSetJsonDto.nume_en.toUpperCase() }}</p>
                                        </v-card-title>
                                        <v-card-subtitle >
                                        <v-row>
                                            <v-col cols="12" class="text-center">
                                            <span>{{selectedCurrency === "RON" ? 'CULORI DISPONIBILE IN SET' : 'COLORS IN SET'}}</span>
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
                                                :to="localPath(`/set/${set.encodedIdSet}/${set.numeSetJsonDto.nume_ro}`)">
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
                            </v-row>
                            <v-container v-if="currentSetsOnPage.shopSets.length <= 0" fluid class="bg-grey-lighten-4 text-center mt-4  elevation-12">
                                <p class="font-weight-light h5">{{ $t('shop.noProductFound') }}</p>
                                <v-icon :icon="mdiEmoticonSadOutline" size="24"></v-icon>
                            </v-container>
                        </v-col>
                        <v-col v-else sm="6" xs="12" md="6" v-for="set in currentSetsOnPage.shopSets"
                        :key="selectedCurrency === 'RON' ? set.numeSetJsonDto.nume_ro : set.numeSetJsonDto.nume_en">
                        <v-card class="bg-grey-lighten-3 p-2 my-3  h-100" elevation="24"
                            >
                            <v-card-title >
                            <div class="ribbon" v-if="set.pretRedusSetDto > 0" >{{ $t('shop.discount') }}</div>
                            <p  class="font-weight-thin h5 text-center">{{ selectedCurrency === "RON" ?  set.numeSetJsonDto.nume_ro.toUpperCase() : set.numeSetJsonDto.nume_en.toUpperCase() }}</p>
                            </v-card-title>
                            <v-card-subtitle >
                            <v-row>
                                <v-col cols="12" class="text-center">
                                <span>{{selectedCurrency === "RON" ? 'CULORI DISPONIBILE IN SET' : 'COLORS IN SET'}}</span>
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
                                     :to="localPath(`/set/${set.encodedIdSet}/${set.numeSetJsonDto.nume_ro}`)">
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
                        <v-container  v-else-if="currentSetsOnPage.shopSets.length <=0 && screenSize===true" fluid class="bg-grey-lighten-4 text-center mt-5  elevation-24 ">
                            <p class="font-weight-light h5">{{ $t('shop.noProductFound') }}</p>
                            <v-icon size="24" :icon="mdiEmoticonSadOutline"></v-icon>
                        </v-container>
                    </v-row>
                    
                </v-sheet>
            </div>
        </div>
    </div>
</template>


<script setup>

import { mdiArrowRight, mdiClose, mdiEmoticonSadOutline,mdiFilter,mdiMagnify } from '@mdi/js';
import { useDisplay } from 'vuetify';
import productService from '~/services/Products'



definePageMeta({
  title : 'Takdecor - Seturi produse',
  layout: 'default',
  keywords: "seturi textile pentru casă, seturi de cuverturi și perdele, seturi de lenjerii de pat, seturi de draperii și perdele, seturi de perne și pături, seturi de textile pentru dormitor, seturi de textile pentru sufragerie, seturi de textile pentru camera copiilor, seturi pentru decor interior, seturi de textile premium, seturi de lenjerii de lux, seturi de perdele și draperii, seturi de perdele și cuverturi, seturi de draperii elegante, seturi de lenjerii și perne, seturi de perne și pleduri, seturi de draperii blackout, seturi de perdele pentru bucătărie, seturi de perdele rustice, seturi de perdele moderne, seturi de perdele personalizate, seturi de perdele cu imprimeuri, seturi de draperii din in, seturi de textile pentru copii, seturi de perdele pentru camera copiilor, seturi de lenjerii pentru pătuțuri, seturi de textile pentru hoteluri, seturi de lenjerii premium, seturi de cuverturi matlasate, seturi de cuverturi termoizolante, seturi de cuverturi și perne, seturi de textile pentru living, seturi de perdele și accesorii, seturi de draperii și perne, seturi de perdele pentru dormitor, seturi de textile pentru casă online, seturi de draperii groase, seturi de perdele vaporoase, seturi de textile pentru casă moderne, home textile sets, bedspread and curtain sets, luxury bedding sets, curtain and drape sets, pillow and blanket sets, bedroom textile sets, living room textile sets, children s textile sets, home decor textile sets, premium textile sets, luxury bedding collections, curtain and bedspread sets, elegant drapery sets, linen and pillow sets, throw pillow and blanket sets, blackout curtain sets, kitchen curtain sets, rustic curtain sets, modern curtain sets, custom curtain sets, printed curtain sets, linen drapery sets, children s room curtain sets, crib bedding sets, hotel textile sets, premium bedding sets, quilted bedspread sets, thermal bedspread sets, bedspread and pillow sets, living room textile bundles, curtain and accessories sets, drapery and pillow sets, bedroom curtain sets, online home textile sets, thick drapery sets, airy curtain sets, modern home textile collections, transport gratis, free delivery, anywhere, everywhere, oriunde in tara",
  middleware : 'locale',
  siteName : 'Takdecor - Seturi produse',
  description : 'Seturi avantajoasa de cuverturi,perdele sau draperii la Texx. Livrare acasa. Livrare gratis la comanda de peste 300 RON. Livrare in toata tara! '
})

useSeoMeta({
  title : 'Takdecor - Seturi produse',
  ogSiteName : 'Takdecor - Seturi produse',
  ogType: 'product',
  ogDescription : 'Seturi avantajoasa de cuverturi,perdele sau draperii la Texx. Transport gratuit la comenzi de peste 300 RON. Livrare oriunde in tara.',

})

defineOgImageComponent('NuxtSeo', {
  title: 'Texx - Magazin seturi',
  theme: '#ff0000',
  colorMode: 'dark',
})
useHead({
  title : 'Texx - Magazin seturi'
})
const {name} = useDisplay()
const screenSize = computed(() => {
    switch (name.value) {
      case 'xs': return true
      case 'sm' : return true
      default : return 3
    }
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

    console.log('response',responseFromPaginatedProducts)
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
    rangePrice.value = selectedCurrency.value === "RON" ? [0,2000] : [0,400]
    router.push({ query: {} });
    getPaginatedSets(0, productTypes.value , rangePrice.value,searchSetAfter.value, selectedCurrency.value);
};


// watch(() => route.query, applyFiltersFromQuery, { immediate: true });



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
  height: 100%;
  overflow-x: hidden;
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