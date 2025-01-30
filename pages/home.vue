<template>
  <div fluid class="m-auto ">
    <div id="image" class="background text-center">
      <v-alert color="red-darken-4" variant="flat">
        <span class="font-weight-thin h5"> <v-icon class="mx-2">mdi-truck</v-icon>Comenzile de peste 500 de RON beneficiază de transport gratuit</span>
      </v-alert>
      <div class="none">
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        <br>
        <span>Bun venit pe texx.ro</span>
        
      </div>
   
    </div>
    <div class="row elevation-24 p-4 mb-2 rounded bg-grey-lighten-5" id="welcome">
      <h3 class="text-center pb-2 pt-2 font-weight-thin"> Bun venit </h3>
      
      <h4 class="text-justify font-weight-normal my-3">
        🌟 Eleganță și rafinament pentru fiecare cameră!
       
      </h4>
      <h5 class="font-weight-thin text-justify my-2"> - Descoperă colecția noastră exclusivistă de cuverturi, draperii, perne și perdele, 
          create pentru a aduce un plus de stil și confort în locuința ta. Fie că îți dorești 
          un decor modern, clasic sau extravagant, avem produsele perfecte pentru tine!</h5>
     
      <h4 class="text-justify font-weight-normal  my-3">
        🏠 Decorează-ți casa cu textile premium, alese cu grijă!
       
      </h4>
      <h5 class="font-weight-thin text-justify my-2"> - Alege cuverturi luxoase, draperii opace pentru intimitate, perne decorative pentru un plus de 
          personalitate și perdele vaporoase care lasă lumina naturală să îți învăluie casa.</h5>
     
      <h4 class="text-justify font-weight-normal  my-3">
        🚀 Livrare rapidă și prețuri accesibile!
        
      </h4>
      <h5 class="font-weight-thin text-justify my-2"> - Comandă online și bucură-te de livrare rapidă oriunde în România! Beneficiază de promoții exclusive 
          și garanția unui decor deosebit, fără compromisuri!</h5>
     
      <h4 class="text-justify font-weight-normal  my-3">
        🎨 Stil și funcționalitate într-un singur loc!
      </h4>
      <h5 class="font-weight-thin text-justify my-2"> - Fie că îți dorești draperii blackout pentru un somn odihnitor, cuverturi pufoase pentru confort maxim, sau perdele 
          delicate care să ofere un aer sofisticat, pe Texx.ro găsești mereu soluția ideală!
          <br>
          <v-list class="my-3 elevation-12 bg-primary rounded-xl font-weight-thin">
            <v-list-item >
              <span >✅ Materiale premium, durabile și ușor de întreținut</span>
            </v-list-item>
            <v-list-item>
              <span> ✅ Design-uri variate pentru orice stil de amenajare</span>
            </v-list-item>
            <v-list-item>
              <span>✅ Reduceri și oferte speciale pe tot parcursul anului</span>
            </v-list-item>
          </v-list>
        </h5>
    </div>

    <div class="row elevation-24 p-3 mb-2 rounded bg-grey-lighten-5" id="aboutUs">
      <h3 class="text-center pb-2 pt-2 font-weight-thin"> Informatii masurare </h3>
      <h4 class="text-center font-weight-thin my-3">
        &#129300; Nu stii cum sa alegi dimensiunile potrivite?
        <br>
        <br>
        <v-btn class="rounded-xl " color="blue">VEZI AICI</v-btn>
      </h4>
    </div>

    <div class="row elevation-24 p-3 mb-2 rounded bg-grey-lighten-5" id="aboutUs">
      <h3 class="text-center pb-2 pt-2 font-weight-thin"> Despre noi </h3>
    </div>
    
    <div class="row elevation-24 p-3 mb-2 rounded bg-grey-lighten-5" id="newProducts" v-if="newProductsRef && newProductsRef.length > 0">
      <h3 class="text-center pb-2 pt-2 font-weight-thin"> Noutati in magazin </h3>
     
      <div>
        <v-row>
          <v-col cols="12">
            <v-sheet elevation="12"
              class="mx-auto border-sm p-2 ma-1" max-width="100%">
                <v-slide-group 
                    :show-arrows="height !== true"
                    v-model=" activeSlideNewProducts"
                    center-active
                    >
                    <v-slide-group-item 
                      v-for="(product,index) in newProductsRef" 
                    
                    :key="index" >
                    
                    <v-tooltip :text="`${t('general.seeProduct')}`"
                      >
                      <template v-slot:activator = "{props}">
                        <div fluid class="text-center mx-5 my-2">
                            <v-card class="h-100 p-2  bg-grey-lighten-4 elevation-12">
                                <v-card-title>
                                  <div
                                  class="ribbon"
                                  v-if="product.pretBazaRedusDto !== 0" 
                                >
                                  {{ $t('shop.discount') }}
                                </div>
                                    <p class="text-center font-weight-light h5 mx-2">{{ product.numeProdusDto }}</p>
                                </v-card-title>
                                <v-card-subtitle>
                                    <p class="text-center font-weight-thin h6 mx-2">({{ product.tipulProdusuluiDto }})</p>
                                </v-card-subtitle>
                                <v-card-text class="h-100">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-img  v-if="findFirstColorWithImage(product) !== 'empty'"
                                                :aspect-ratio="10 / 9"
                                                
                                                eager class=" h-75 p-2 cursor-pointer  "
                                                :alt="`${product.numeProdusDto} + culoare ${product.culoriProdusDto[0].numeCuloareDto}`"
                                                :src="findFirstColorWithImage(product)" 
                                                @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`))" 
                                                v-bind="props">
                                            
                                            </v-img>
                                            <v-img v-else
                                                
                                                :aspect-ratio="10 / 9"
                                                eager class="h-75 p-2 cursor-pointer "
                                                :alt="`Image ${product.numeProdusDto}`"
                                                @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`))" 
                                                src="/notFound.png" 
                                                v-bind="props" >
                                            </v-img>
                                            
                                        </v-col>
                                        <v-col cols="12">
                                            <p v-if="product.pretBazaRedusDto === 0"  class="text-center font-weight-thin h5 mx-2">{{ product.pretBazaDto }} {{selectedCurrency}}</p>
                                            <p v-else class="text-red text-center font-weight-thin h5 mx-2">{{ product.pretBazaRedusDto }} {{selectedCurrency}}</p>
                                        </v-col>
                                        <v-col cols="12">
                                            <NuxtLink prefetch :prefetch-on="{interaction: true}"
                                                :to="localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`)">
                                                <v-btn variant="flat"
                                                color="primary">
                                                    {{ $t('shop.seeDetails') }}
                                                    <v-icon class="ml-2">mdi-arrow-right</v-icon>
                                                </v-btn>
                                            </NuxtLink>
                                            
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            
                            

                            </div>
                        
                      </template>
                    </v-tooltip>
                        
                    
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="row elevation-24 p-3 mb-2 rounded bg-grey-lighten-5" id="newProducts" v-if="limitedEditionProductsRef && limitedEditionProductsRef.length > 0">
      <h3 class="text-center pb-2 pt-2 font-weight-thin"> Editii limitate </h3>
      
      <div>
        <v-row>
          <v-col cols="12">
            <v-sheet elevation="12"
              class="mx-auto border-sm p-2 ma-1" max-width="100%">
                <v-slide-group 
                    :show-arrows="height !== true"
                    v-model="activeSlideLimitedEditionProducts"
                    center-active
                    >
                    <v-slide-group-item 
                      v-for="(product,index) in limitedEditionProductsRef" 
                    
                    :key="index" >
                   
                    <v-tooltip :text="`${t('general.seeProduct')}`"
                      >
                      <template v-slot:activator = "{props}">
                        <div fluid class="text-center mx-5 my-2">
                            <v-card class="h-100 p-2  bg-grey-lighten-4 elevation-12">
                                <v-card-title>
                                  <div
                                  class="ribbon"
                                  v-if="product.pretBazaRedusDto !== 0" 
                                >
                                  {{ $t('shop.discount') }}
                                </div>
                                    <p class="text-center font-weight-light h5 mx-2">{{ product.numeProdusDto }}</p>
                                </v-card-title>
                                <v-card-subtitle>
                                    <p class="text-center font-weight-thin h6 mx-2">({{ product.tipulProdusuluiDto }})</p>
                                </v-card-subtitle>
                                <v-card-text class="h-100">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-img  v-if="findFirstColorWithImage(product) !== 'empty'"
                                                :aspect-ratio="10 / 9"
                                                
                                                eager class=" h-75 p-2 cursor-pointer  "
                                                :alt="`${product.numeProdusDto} + culoare ${product.culoriProdusDto[0].numeCuloareDto}`"
                                                :src="findFirstColorWithImage(product)" 
                                                @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`))" 
                                                v-bind="props">
                                            
                                            </v-img>
                                            <v-img v-else
                                                
                                                :aspect-ratio="10 / 9"
                                                eager class="h-75 p-2 cursor-pointer "
                                                :alt="`Image ${product.numeProdusDto}`"
                                                @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`))" 
                                                src="/notFound.png" 
                                                v-bind="props" >
                                            </v-img>
                                            
                                        </v-col>
                                        <v-col cols="12">
                                            <p v-if="product.pretBazaRedusDto === 0"  class="text-center font-weight-thin h5 mx-2">{{ product.pretBazaDto }} {{selectedCurrency}}</p>
                                            <p v-else class="text-red text-center font-weight-thin h5 mx-2">{{ product.pretBazaRedusDto }} {{selectedCurrency}}</p>
                                        </v-col>
                                        <v-col cols="12">
                                            <NuxtLink prefetch :prefetch-on="{interaction: true}"
                                                :to="localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`)">
                                                <v-btn variant="flat"
                                                color="primary">
                                                    {{ $t('shop.seeDetails') }}
                                                    <v-icon class="ml-2">mdi-arrow-right</v-icon>
                                                </v-btn>
                                            </NuxtLink>
                                            
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            
                            

                            </div>
                        
                      </template>
                    </v-tooltip>
                        
                    
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="row elevation-24 p-3 mb-2 rounded bg-grey-lighten-5" id="userPreferences" v-if="userPreferencesProducts && userPreferencesProducts.length > 0">
      <h3 class="text-center pb-2 pt-2 font-weight-thin"> {{  $t('general.usersPrefferences') }} </h3>
     
      <div>
        <v-row>
          <v-col cols="12">
            <v-sheet elevation="12"
              class="mx-auto border-sm p-2 ma-1" max-width="100%">
                <v-slide-group 
                    :show-arrows="height !== true"
                    v-model="activeSlideMostViewedProducts"
                    center-active
                    >
                    <v-slide-group-item 
                      v-for="(product,index) in userPreferencesProducts" 
                    
                    :key="index" >
                    
                    <v-tooltip :text="`${t('general.seeProduct')}`"
                      >
                      <template v-slot:activator = "{props}">
                        <div fluid class="text-center mx-5 my-2">
                            <v-card class="h-100 p-2  bg-grey-lighten-4 elevation-12">
                                <v-card-title>
                                  <div
                                  class="ribbon"
                                  v-if="product.pretBazaRedusDto !== 0" 
                                >
                                  {{ $t('shop.discount') }}
                                </div>
                                    <p class="text-center font-weight-light h5 mx-2">{{ product.numeProdusDto }}</p>
                                </v-card-title>
                                <v-card-subtitle>
                                    <p class="text-center font-weight-thin h6 mx-2">({{ product.tipulProdusuluiDto }})</p>
                                </v-card-subtitle>
                                <v-card-text class="h-100">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-img  v-if="findFirstColorWithImage(product) !== 'empty'"
                                                :aspect-ratio="10 / 9"
                                                
                                                eager class=" h-75 p-2 cursor-pointer  "
                                                :alt="`${product.numeProdusDto} + culoare ${product.culoriProdusDto[0].numeCuloareDto}`"
                                                :src="findFirstColorWithImage(product)" 
                                                @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`))" 
                                                v-bind="props">
                                            
                                            </v-img>
                                            <v-img v-else
                                                
                                                :aspect-ratio="10 / 9"
                                                eager class="h-75 p-2 cursor-pointer "
                                                :alt="`Image ${product.numeProdusDto}`"
                                                @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`))" 
                                                src="/notFound.png" 
                                                v-bind="props" >
                                            </v-img>
                                            
                                        </v-col>
                                        <v-col cols="12">
                                            <p v-if="product.pretBazaRedusDto === 0"  class="text-center font-weight-thin h5 mx-2">{{ product.pretBazaDto }} {{selectedCurrency}}</p>
                                            <p v-else class="text-red text-center font-weight-thin h5 mx-2">{{ product.pretBazaRedusDto }} {{selectedCurrency}}</p>
                                        </v-col>
                                        <v-col cols="12">
                                            <NuxtLink prefetch :prefetch-on="{interaction: true}"
                                                :to="localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiDto}`)">
                                                <v-btn variant="flat"
                                                color="primary">
                                                    {{ $t('shop.seeDetails') }}
                                                    <v-icon class="ml-2">mdi-arrow-right</v-icon>
                                                </v-btn>
                                            </NuxtLink>
                                            
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            </div>
                      </template>
                    </v-tooltip>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="text-center elevation-24 p-3 mb-2 rounded bg-grey-lighten-5"  id="frequent">
      <h3 class="text-center pb-2 pt-2 font-weight-thin">Nu esti convins ?</h3>
      <v-btn variant="flat" color="green" class="rounded-xl" @click="navigateTo(localePath('/shop'))">
          Mergi la cumparaturi <v-icon class="ml-3">mdi-arrow-right</v-icon></v-btn>
    </div>
    
    <div class=" elevation-24 p-3 mb-2 rounded bg-grey-lighten-5"  id="frequent">
      <h3 class="text-center pb-2 pt-2 font-weight-thin">Intrebari frecvente <v-icon>mdi-frequently-asked-questions</v-icon></h3>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="elevation-12 bg-primary">
            <v-card-item class="text-center">
              <v-card-title class="font-weight-normal h5">Cat timp dureaza livrarea?</v-card-title>
              <v-card-text class="pt-4 ">
                <span>Durata unei comenzi este de obicei 7-10 zile lucratoare</span>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="elevation-12 bg-primary">
            <v-card-item class="text-center">
              <v-card-title class="font-weight-normal h5">Cat timp dureaza livrarea?</v-card-title>
              <v-card-text class="pt-4 ">
                <span>Durata unei comenzi este de obicei 7-10 zile lucratoare</span>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="elevation-12 bg-primary">
            <v-card-item class="text-center">
              <v-card-title class="font-weight-normal h5">Cat timp dureaza livrarea?</v-card-title>
              <v-card-text class="pt-4 ">
                <span>Durata unei comenzi este de obicei 7-10 zile lucratoare</span>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <v-divider opacity="0"></v-divider>
      <v-divider opacity="0"></v-divider>
      <div class="mt-4 text-center">
        <p class="font-weight-thin h3">Aveti alta intrebare?</p>
        <v-btn variant="flat" color="green" class="rounded-xl" @click="navigateTo(localePath('/contact'))">
          Contactati-ne <v-icon class="ml-3">mdi-card-account-mail</v-icon></v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import productService from '~/services/Products';
import { useDisplay } from 'vuetify';
definePageMeta({
  title : 'Acasa',
  layout: 'default',
  middleware : 'locale',
  keywords: 'cuverturi de pat, cuverturi moderne, cuverturi premium, cuverturi pentru dormitor, cuverturi pentru pat matrimonial, cuverturi pentru pat de o persoană, cuverturi pentru copii, cuverturi pentru pătuțuri de bebeluși, cuverturi colorate pentru copii, cuverturi cu personaje animate, cuverturi termoizolante, cuverturi matlasate, cuverturi din bumbac satinat, cuverturi pentru bucătărie, cuverturi decorative pentru canapea, cuverturi rezistente la pete, cuverturi impermeabile, cuverturi premium pentru sufragerie, cuverturi din catifea, draperii blackout, draperii elegante, draperii pentru living, draperii moderne pentru sufragerie, draperii pentru dormitor, draperii termoizolante, draperii din in, draperii cu dublu strat, draperii pentru copii, draperii cu imprimeuri jucăușe, draperii pentru camera copiilor, draperii cu personaje Disney, draperii pentru pătuțuri, draperii pentru bucătărie, draperii scurte pentru bucătărie, draperii anti-mucegai pentru bucătărie, draperii rustice pentru bucătărie, perdele albe, perdele vaporoase, perdele pentru dormitor, perdele scurte, perdele moderne, perdele transparente, perdele pentru copii, perdele colorate pentru camera copiilor, perdele cu imprimeuri pentru copii, perdele blackout pentru camera copiilor, perdele pentru bucătărie, perdele scurte pentru bucătărie, perdele cu modele florale pentru bucătărie, perdele rustice pentru bucătărie, perdele anti-mucegai pentru bucătărie, perdele termoizolante pentru bucătărie, perdele decorative pentru bucătărie, perne decorative, perne confortabile, perne ortopedice, perne hipoalergenice, perne pentru dormit, perne pentru copii, perne cu umplutură de bambus, perne cu spumă cu memorie, perne pentru bucătărie, perne pentru scaune de bucătărie, seturi de lenjerii de pat, seturi de cuverturi și perdele, seturi de lenjerii premium, seturi de perne și pături, seturi de draperii și perdele, seturi complete pentru dormitor, seturi textile pentru camera copiilor, seturi de lenjerii pentru pătuțuri de bebeluși, seturi de draperii pentru copii, seturi de perdele și draperii pentru bucătărie, seturi de textile pentru casă, textile premium online, cumpără cuverturi online, reduceri la textile pentru casă, promoții la perdele și draperii, livrare rapidă, decor interior, amenajare locuință, textile pentru dormitor, textile pentru sufragerie, textile pentru camere de copii, textile pentru bucătărie, textile pentru hol, textile de lux pentru casă'



})
const {name} = useDisplay()
const {t} = useI18n()
const localePath = useLocalePath()
const height = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return 3
    }
})
const limitedEditionProductsRef = ref([]);
const activeSlideLimitedEditionProducts = ref(0)

const newProductsRef = ref([]);
const activeSlideNewProducts = ref(0)

const userPreferencesProducts = ref([]);
const activeSlideMostViewedProducts = ref(0)

const selectedCurrency = useState('selectedCurrency');

useHead({
  title : 'Acasa',
})

const getLimitedEditionProducts = (async() => {
  const response = await productService.getLimitedEditionProductsInShop(selectedCurrency.value)
  console.log(response)
  if(response && response.length > 0){
    limitedEditionProductsRef.value = response
  }
})

const getNewProducts = (async () => {
  const response = await productService.getNewProductsInShop(selectedCurrency.value)
  console.log(response)
  if(response && response.length > 0){
    newProductsRef.value = response
  }
})

const getUserPreferences = (async () => {
  const response = await productService.getMostViewedProducts(selectedCurrency.value)
  console.log(response)
  if(response && response.length > 0){
    userPreferencesProducts.value = response
  }
})

const findFirstColorWithImage = ((product) => {
    if(product.culoriProdusDto.length === 0){
        return 'empty'
    }

    var colorWithImageURL = product.culoriProdusDto[0].imaginiProdusDto[0].presignedUrl;
    return colorWithImageURL;
})

onMounted(async () => {
 await getLimitedEditionProducts()
 await getNewProducts()
 await getUserPreferences()

})
</script>

<style scoped>
.background{
  background-image: url(/assets/background.jpeg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 1;
  z-index: 2;
}

.none{
  z-index: -999;
  opacity: 0.01;
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
