<template>
  <div fluid class="m-auto ">
    <div id="image" class=" text-center">
      <!-- <v-alert density="compact" color="red-darken-4" variant="flat" v-if="showFreeDeliveryBanner">
        <span class="font-weight-thin h5"> <v-icon class="mx-2"  :icon="mdiTruck" size="24"></v-icon>{{$t('homePage.orderOver1')}} {{ getMinOrderPriceForFreeDelivery }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR'  }} {{$t('homePage.orderOver2')}}</span>
      </v-alert>
      <v-carousel height="auto" hide-delimiters show-arrows="hover" >
        <v-carousel-item v-for="img in carouselImgs" 
          :key="img"
          :src="img"
          :aspect-ratio="height !== true ? 10 / 4 : 4/ 3"
          cover
        >
        <div class="d-flex justify-center align-center fill-height text-black text-h6 font-weight-thin elevation-24">
          <v-row>
            <v-col cols="12" v-if="height !== true || name === 'sm'">
             {{ $t('homePage.text20') }}
            </v-col>
            <v-col cols="12">
              <v-btn color="green"  variant="flat" class="rounded-xl" @click="navigateTo(localePath('/shop'))">
                <span class="text-white">{{ $t('homePage.text19') }} <v-icon  :icon="mdiShopping"></v-icon></span>
              </v-btn>
            </v-col>
          </v-row>
        
        </div>
        </v-carousel-item>
      </v-carousel> -->
      <p>AICIIIIIIIIIII</p>
      <p>AICIIIIIIIIIII2</p>
      <p>AICIIIIIIIIIII3</p>

    </div>
    <section class="row elevation-24 p-4  rounded bg-grey-lighten-5" id="welcome">
      <h3 class="text-center pb-2 pt-2 font-weight-thin">{{ $t('homePage.welcome') }} </h3>
      
      <h4 class="text-justify font-weight-normal my-3">
        {{ $t('homePage.text1') }}
      </h4>
      <h5 class="font-weight-thin text-justify ">  {{ $t('homePage.text2') }} </h5>
    
      <h4 class="text-justify font-weight-normal  my-3">
        {{ $t('homePage.text3') }}
      
       
      </h4>
      <h5 class="font-weight-thin text-justify "> 
          {{ $t('homePage.text4') }}</h5>
     
      <h4 class="text-justify font-weight-normal  my-3">
        {{ $t('homePage.text5') }}
       
        
      </h4>
      <h5 class="font-weight-thin text-justify ">
          {{ $t('homePage.text6') }}</h5>
     
      <h4 class="text-justify font-weight-normal  my-3">
        {{ $t('homePage.text7') }}
       
      </h4>
      <h5 class="font-weight-thin text-justify "> 
          {{ $t('homePage.text8') }}
          <br>
          <v-list class="my-3 elevation-12 bg-primary rounded-xl font-weight-normal">
            <v-list-item >
              <span >    {{ $t('homePage.text9') }}
               </span>
            </v-list-item>
            <v-list-item>
              <span>     {{ $t('homePage.text10') }}</span>
            </v-list-item>
            <v-list-item>
              <span>    {{ $t('homePage.text11') }}</span>
            </v-list-item>
          </v-list>
        </h5>
    </section>
    <v-divider opacity="0"></v-divider>
    <div class="row elevation-24 p-3 mb-2 rounded bg-grey-lighten-5" id="aboutUs">
      <h4 class="text-center font-weight-thin my-3">
        &#129300; {{ $t('homePage.text12') }} 
        <br>
        <br>
        <NuxtLink :to="localePath('/measurement')">
          <v-btn class="rounded-xl " color="red"> {{ $t('homePage.text13') }}</v-btn>
        </NuxtLink>
        
      </h4>
    </div>
    <v-divider opacity="0"></v-divider>
    <section class="row elevation-24 p-3  rounded bg-grey-lighten-5" id="aboutUs">
      <h3 class="text-center pb-2 pt-2 font-weight-thin"> {{ $t('homePage.aboutUs') }}  </h3>
      <div class="text-justify">
        <v-divider opacity="0"></v-divider>
        <h4 class="text-justify font-weight-light my-3">🏠 {{ $t('aboutUs.text1') }}</h4>
        <v-divider opacity="0"></v-divider>
        <h4 class="text-justify font-weight-light my-3">✅ {{ $t('aboutUs.text2') }}</h4>
        <v-divider opacity="0"></v-divider>
        <h4 class="text-justify font-weight-light my-3">🌟 {{ $t('aboutUs.text3') }}</h4>
        <v-divider opacity="0"></v-divider>
        <h4 class="text-justify font-weight-light my-3">✅ {{ $t('aboutUs.text4') }}</h4>
        <v-divider opacity="0"></v-divider>
        <h4 class="text-justify font-weight-light my-3">🏠 {{ $t('aboutUs.text5') }}</h4>
        <v-divider opacity="0"></v-divider>
       
      </div>
      <div class="text-center">
        <h4 class="font-weight-light my-2">&#129300; {{ $t('homePage.text14') }}</h4>
        <v-btn variant="flat" color="green-darken-1" class="rounded-xl" @click="navigateTo(localePath('/shop'))">
        {{ $t('homePage.text15') }} <v-icon class="ml-3"  :icon="mdiArrowRight" size="24"></v-icon></v-btn>
      </div>
    </section>
    <v-divider opacity="0"></v-divider>
    
    <section class="row elevation-24 p-3  rounded bg-grey-lighten-5" id="newProducts" v-if="newProductsRef && newProductsRef.length > 0">
      <h3 class="text-center pb-2 pt-2 font-weight-thin">  {{ $t('homePage.newItems') }}  </h3>
     
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
                                                    <v-icon class="ml-2"  :icon="mdiArrowRight" size="24"></v-icon>
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
    </section>
    <v-divider opacity="0"></v-divider>
    <section class="row elevation-24 p-3  rounded bg-grey-lighten-5" id="limitedEdition" v-if="limitedEditionProductsRef && limitedEditionProductsRef.length > 0">
      <h3 class="text-center pb-2 pt-2 font-weight-thin">{{ $t('homePage.limitedEditions') }} </h3>
      
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
                                                    <v-icon class="ml-2"  :icon="mdiArrowRight" size="24"></v-icon>
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
    </section>
    <v-divider opacity="0"></v-divider>
    <section class="row elevation-24 p-3  rounded bg-grey-lighten-5" id="userPreferences" v-if="userPreferencesProducts && userPreferencesProducts.length > 0">
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
                                                    <v-icon class="ml-2"  :icon="mdiArrowRight" size="24"></v-icon>
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
    </section>
    <v-divider opacity="0"></v-divider>

    <section class=" elevation-24 p-3  rounded bg-grey-lighten-5"  id="frequent">
      <h3 class="text-center pb-2 pt-2 font-weight-thin">{{ $t('homePage.freqQuestions') }} <v-icon  :icon="mdiFrequentlyAskedQuestions" size="24"></v-icon></h3>
      <v-row>
        <v-col cols="12" md="4" v-for="question in frequentQuestionsArr"
        :key="question">
          <v-card class="elevation-12 bg-primary">
            <v-card-item class="text-center">
              <v-card-text class="pt-4 ">
                <span class="font-weight-normal h5">{{ $t(question.Q) }}</span>
                <v-divider opacity="0"></v-divider>
                <span class="font-weight-light h6">{{  $t(question.A) }}</span>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <v-divider opacity="0"></v-divider>
      <v-divider opacity="0"></v-divider>
      <div class="mt-4 text-center">
        <p class="font-weight-thin h3">{{ $t('homePage.text18') }}</p>
        <v-btn variant="flat" color="green" class="rounded-xl" @click="navigateTo(localePath('/contact'))">
          {{ $t('homePage.text17') }} <v-icon class="ml-3"  :icon="mdiCardAccountMail" size="24"></v-icon></v-btn>
      </div>
    </section>
    
  </div>
</template>

<script setup>
import productService from '~/services/Products';
import userService from '~/services/User';
import { useDisplay } from 'vuetify';
import { mdiArrowRight, mdiCardAccountMail, mdiFrequentlyAskedQuestions, mdiShopping, mdiShoppingOutline, mdiTruck } from '@mdi/js';

definePageMeta({
  title : 'Acasa',
  layout: 'default',
  middleware : 'locale',
  keywords: "cuverturi de pat, cuverturi moderne, cuverturi premium, cuverturi pentru dormitor, cuverturi pentru pat matrimonial, cuverturi pentru pat de o persoană, cuverturi pentru copii, cuverturi pentru pătuțuri de bebeluși, cuverturi colorate pentru copii, cuverturi cu personaje animate, cuverturi termoizolante, cuverturi matlasate, cuverturi din bumbac satinat, cuverturi pentru bucătărie, cuverturi decorative pentru canapea, cuverturi rezistente la pete, cuverturi impermeabile, cuverturi premium pentru sufragerie, cuverturi din catifea, cuverturi groase pentru iarnă, cuverturi răcoroase pentru vară, cuverturi din microfibră, cuverturi cu textură moale, cuverturi din lână, cuverturi pentru protecție mobilier, cuverturi pentru hoteluri, cuverturi personalizate, cuverturi anti-acarieni, cuverturi confortabile, cuverturi cu broderie, cuverturi handmade, draperii blackout, draperii elegante, draperii pentru living, draperii moderne pentru sufragerie, draperii pentru dormitor, draperii termoizolante, draperii din in, draperii cu dublu strat, draperii pentru copii, draperii cu imprimeuri jucăușe, draperii pentru camera copiilor, draperii cu personaje Disney, draperii pentru pătuțuri, draperii pentru bucătărie, draperii scurte pentru bucătărie, draperii anti-mucegai pentru bucătărie, draperii rustice pentru bucătărie, draperii izolante fonic, draperii anti-reflexie, draperii cu efect de întunecare totală, draperii cu protecție UV, draperii pentru birou, draperii rezistente la apă, draperii elegante din mătase, perdele albe, perdele vaporoase, perdele pentru dormitor, perdele scurte, perdele moderne, perdele transparente, perdele pentru copii, perdele colorate pentru camera copiilor, perdele cu imprimeuri pentru copii, perdele blackout pentru camera copiilor, perdele pentru bucătărie, perdele scurte pentru bucătărie, perdele cu modele florale pentru bucătărie, perdele rustice pentru bucătărie, perdele anti-mucegai pentru bucătărie, perdele termoizolante pentru bucătărie, perdele decorative pentru bucătărie, perdele filtrante, perdele care lasă lumina să pătrundă, perdele cu efect de aerisire, perdele care oferă intimitate, perdele cu strat protector, perdele anti-alergice, perdele cu strat dublu, perdele pentru izolare termică, perne decorative, perne confortabile, perne ortopedice, perne hipoalergenice, perne din puf de gâscă, perne cu umplutură de bambus, perne cu spumă cu memorie, perne pentru bucătărie, perne pentru scaune de bucătărie, perne cu efect relaxant, perne cu infuzie de lavandă, perne pentru un somn liniștit, perne pentru gât și coloană, perne pentru gravide, perne pentru copii mici, seturi de lenjerii de pat, seturi de cuverturi și perdele, seturi de lenjerii premium, seturi de perne și pături, seturi de draperii și perdele, seturi complete pentru dormitor, seturi textile pentru camera copiilor, seturi de lenjerii pentru pătuțuri de bebeluși, seturi de draperii pentru copii, seturi de perdele și draperii pentru bucătărie, seturi de textile pentru casă, textile premium online, cumpără cuverturi online, reduceri la textile pentru casă, promoții la perdele și draperii, livrare rapidă, decor interior, amenajare locuință, textile pentru dormitor, textile pentru sufragerie, textile pentru camere de copii, textile pentru bucătărie, textile pentru hol, textile de lux pentru casă, textile pentru un somn odihnitor, textile care echilibrează temperatura camerei, textile pentru un aer mai curat, textile pentru reducerea umezelii, textile care împiedică formarea mucegaiului, textile pentru reducerea zgomotului, textile care mențin răcoarea vara, textile pentru confort maxim, textile care îmbunătățesc calitatea somnului, textile pentru protecția pielii sensibile, întuneric în cameră, respirație mai bună în cameră, aer proaspăt în dormitor, izolare fonică pentru un somn liniștit, bedspreads, modern bedspreads, premium bedspreads, bedroom bedspreads, double bed bedspreads, single bed bedspreads, children bedspreads, baby crib bedspreads, colorful bedspreads for kids, animated character bedspreads, thermal insulation bedspreads, quilted bedspreads, satin cotton bedspreads, kitchen bedspreads, decorative bedspreads for sofas, stain-resistant bedspreads, waterproof bedspreads, premium bedspreads for living rooms, velvet bedspreads, thick winter bedspreads, cooling summer bedspreads, microfiber bedspreads, soft-textured bedspreads, wool bedspreads, furniture protection bedspreads, hotel-quality bedspreads, custom-made bedspreads, anti-mite bedspreads, comfortable bedspreads, embroidered bedspreads, handmade bedspreads, blackout curtains, elegant curtains, living room curtains, modern living room curtains, bedroom curtains, thermal insulating curtains, linen curtains, double-layer curtains, children curtains, playful print curtains, kids room curtains, Disney character curtains, crib curtains, kitchen curtains, short kitchen curtains, anti-mold kitchen curtains, rustic kitchen curtains, soundproof curtains, anti-reflection curtains, total blackout curtains, UV protection curtains, office curtains, water-resistant curtains, elegant silk curtains, white curtains, airy curtains, privacy-enhancing curtains, protective layer curtains, anti-allergy curtains, double-layer curtains, thermal insulation curtains, despre noi magazin textile casă, firma producătoare de perdele și draperii, despre brandul nostru de textile casă, cine suntem și ce oferim, despre compania noastră de cuverturi și perne, experiență în producția de textile pentru casă, valori și misiune în industria textilelor, producător perdele și draperii de calitate, istoria companiei noastre, cumpără perdele direct de la producător, companie specializată în textile premium, despre noi cuverturi și perne de lux, perdele și draperii fabricate cu pasiune, calitate și tradiție în textile pentru casă, fabricăm cuverturi și perne de înaltă calitate, lideri în industria textilelor de casă, despre noi perdele și draperii personalizate, angajamentul nostru față de calitate, producător românesc de perdele și draperii, despre brandul nostru premium de textile, echipa noastră și viziunea brandului, inovație și design în textile pentru casă, despre noi expertiză în textile decorative, descoperă istoria brandului nostru, textile casă create cu atenție la detalii, companie de încredere pentru perdele și cuverturi, perne și cuverturi pentru un confort suprem, despre noi magazin de perdele și perne online, cine suntem și de ce ne aleg clienții, firma noastră specialiști în textile pentru casă, tradiție și calitate în perdele și draperii, de ce să alegi perdelele noastre?, despre noi experiență de peste X ani, premium home textiles, about us home textiles company, curtains and drapes manufacturer, about our home textiles brand, who we are and what we offer, about our bedding and pillow company, experience in home textiles production, values and mission in the textile industry, quality curtains and drapes manufacturer, our company history, buy curtains directly from the manufacturer, specialized home textiles company, about us premium bedding and pillows, curtains and drapes made with passion, tradition and quality in home textiles, we manufacture high-quality bedding and pillows, leaders in the home textile industry, about us custom-made curtains and drapes, our commitment to quality, Romanian manufacturer of curtains and drapes, about our premium home textile brand, our team and brand vision, innovation and design in home textiles, about us expertise in decorative textiles, discover the story behind our brand, home textiles crafted with attention to detail, trusted company for curtains and bedding, pillows and bedspreads for ultimate comfort, about us online store for curtains and pillows, who we are and why customers choose us, our company home textiles specialists, tradition and quality in curtains and drapes, why choose our curtains?, about us over X years of experience, premium home textiles directly from the manufacturer, about us our mission and values, we collaborate with top home textile producers, what makes us different in the home textile industry, our passion for design and comfort, personalized services for curtains and drapes, we manufacture sustainable and elegant home textiles",
  siteName : 'Texx - Home decor',
  canonicalUrl : process.env.NODE_ENV === 'development' ? 'http://localhost:3000/home' : 'https://texxshop.ro/home',
  ogType : 'website',
  ogDescription : 'La noi puteti gasii cuverturi si perdele de inalta calitate. Va asteptam !!',
  description : 'Cuverturi si pedele de inalta calitate. Livrare acasa. Livrare la comanda de peste 300 RON. Livrare in toata tara! '
})

useHead({
  title : 'Acasa',
})


defineOgImageComponent('NuxtSeo', {
  title: 'Texx - Acasa',
  theme: '#ff0000',
  colorMode: 'dark',
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
const showFreeDeliveryBanner = ref(true)
const generalSettings = ref({})
const limitedEditionProductsRef = ref([]);
const activeSlideLimitedEditionProducts = ref(0)

const newProductsRef = ref([]);
const activeSlideNewProducts = ref(0)

const userPreferencesProducts = ref([]);
const activeSlideMostViewedProducts = ref(0)

const selectedCurrency = useState('selectedCurrency');

const frequentQuestionsArr = [
  {
    Q: 'homePage.questions.Q1',
    A: 'homePage.questions.A1'
  },
  {
    Q: 'homePage.questions.Q2',
    A: 'homePage.questions.A2'
  },
  {
    Q: 'homePage.questions.Q3',
    A: 'homePage.questions.A3'
  }
]

const carouselImgs = ['/cuv1.jpeg','/cuv2.jpeg','/cuv3.jpeg','/cuv4.jpeg','/cuv5.jpeg','/cuv6.jpeg',]

const getLimitedEditionProducts = (async() => {
  const response = await productService.getLimitedEditionProductsInShop(selectedCurrency.value)
  if(response && response.length > 0){
    limitedEditionProductsRef.value = response
  }
})

const getNewProducts = (async () => {
  const response = await productService.getNewProductsInShop(selectedCurrency.value)
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

const getGeneralSettings = (async () => {
  // const response = await adminService.getGeneralSettings()
  const response = await userService.getGeneralSettingsData("pret_comanda_minima" , selectedCurrency.value)
  generalSettings.value = response;
  if(generalSettings.value.value === null 
    || generalSettings.value.value === ""
    || generalSettings.value.value === undefined){
      showFreeDeliveryBanner.value = false
  }

})


const getMinOrderPriceForFreeDelivery = computed(() => {
  if(generalSettings){
    showFreeDeliveryBanner.value = true
    if(selectedCurrency.value === 'RON')
      return generalSettings.value.value
    return generalSettings.value.value / 5
  }
  
})


onMounted(async () => {
 await getLimitedEditionProducts()
 await getNewProducts()
 await getUserPreferences()
 await getGeneralSettings();
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
