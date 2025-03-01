<template>
    <div >
        <v-sheet color="grey-lighten-2" elevation="12" class="p-2 h-100 text-center">
            <v-alert type="warning" variant="flat" class="elevation-12 my-3 text-center" >
                <p class="font-weight-bold h6">{{ $t('checkout.productsDeleted') }}</p>
            </v-alert>
            <v-dialog v-if="syncedItems&&syncedItems.modifiedCartItems.length > 0"
                width="900" v-model="dialogControl"
                >
                <v-btn color="red" @click="dialogControl = false">
                    CLOSE <v-icon  class="mx-1" :icon="mdiClose" size="24"></v-icon>
                </v-btn>
                <v-alert type="warning" variant="flat" class="elevation-12 mb-3  text-center">
                    <p class="font-weight-normal h6 text-black">{{ $t('checkout.productsPriceChanged') }}</p>
                </v-alert>
                <v-card  class="ma-1"
                max-height="auto" max-width="auto" :class="{'bg-grey-darken-4' : true , 'text-center' : screenSize}" >
                    <v-card-text>
                        <v-row v-for="(itemChanged,index) in syncedItems.modifiedCartItems"  :key="index">
                            <v-col cols="12" xs="12" sm="3" class="text-center">
                                <div v-if="checkKey(itemChanged.key)">
                                    <NuxtImg preload
                                        v-if="itemChanged.cartItems[0].culoareSelectata&&itemChanged.cartItems[0].culoareSelectata.imaginiProdusDto[0] !== undefined&&itemChanged.cartItems[0].culoareSelectata.imaginiProdusDto[0].presignedUrl !== 'empty'"
                                        :src="itemChanged.cartItems[0].culoareSelectata.imaginiProdusDto[0].presignedUrl"
                                        fit="cover"
                                        sizes="sm:200 md:400"
                                        :width="dimensionsForImageDialog.width"
                                        :height="dimensionsForImageDialog.height"
                                        class="border-sm" >
                                    </NuxtImg>
                                    <NuxtImg v-else preload
                                        src="notFound.png"
                                        sizes="sm:400 md:800"
                                        :width="dimensionsForImageDialog.width"
                                        :height="dimensionsForImageDialog.height"
                                        class="border-sm" >
                                    </NuxtImg>
                                    <br>
                                    <p>{{ itemChanged.cartItems[0].cantitate }} x</p>
                                </div>
                                <div v-else>
                                    <NuxtImg preload
                                        v-if="itemChanged.cartItems && itemChanged.cartItems.length > 1 && getFirstImageFromSet(itemChanged.cartItems)"
                                        :src="getFirstImageFromSet(itemChanged.cartItems)"
                                        sizes="sm:400 md:800"
                                        :width="dimensionsForImageDialog.width"
                                        :height="dimensionsForImageDialog.height"
                                        class="border-sm" >
                                    </NuxtImg>
                                    <NuxtImg v-else preload
                                        src="notFound.png"
                                        sizes="sm:400 md:800"
                                        :width="dimensionsForImageDialog.width"
                                        :height="dimensionsForImageDialog.height"
                                        class="border-sm" >
                                    </NuxtImg>
                                    <p>{{ itemChanged.cartItems[0].cantitate }} x</p>
                                </div>
                            </v-col>
                            <v-col cols="12" xs="12" sm="7">
                                <div v-if="checkKey(itemChanged.key)" >
                                    <v-row class="pl-2">
                                        <v-col cols="12">
                                            <span class="font-weight-light text-h6">{{ itemChanged.cartItems[0].numeProdus }}</span>
                                            <p class="font-weight-light text-subtitle-2">{{ itemChanged.cartItems[0].tipProdus }}</p>
                                        </v-col>
                                        <v-col cols="12">
                                            <p class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                            <p class="font-weight-light h6 text-subtitle-1">{{ itemChanged.cartItems[0].culoareSelectata.numeCuloareDto }}</p>
                                        </v-col>
                                        <v-col cols="12">
                                            <div class="mb-8">
                                                <p class="font-weight-light h5">{{ $t('cart.dimensions') }}</p>
                                                <p class="font-weight-light h6 text-subtitle-1"> {{checkProductType(itemChanged.cartItems[0].tipProdus) ?  $t('shop.curtain.railwayWidth')  :  $t('shop.width')  }}  : {{ itemChanged.cartItems[0].dimensiuneSelectata.lungimeDto  }} cm</p>
                                                <p class="font-weight-light h6 text-subtitle-1">{{ checkProductType(itemChanged.cartItems[0].tipProdus) ? $t('shop.height') :  $t('cart.widthNotForCurtains')}} : {{  itemChanged.cartItems[0].dimensiuneSelectata.latimeDto ?  itemChanged.cartItems[0].dimensiuneSelectata.latimeDto : 'N/A'  }} cm</p>
                                            </div>
                                            <div v-if="checkProductType(itemChanged.cartItems[0].tipProdus)">
                                                <div v-if="itemChanged.cartItems[0].selectedManopera?.numeManopera === 'STAN'">
                                                    <p class="font-weight-light h5">{{ $t('cart.material') }} {{ itemChanged.cartItems[0].selectedManopera.metruTotalFolosit }} m</p>
                                                </div>
                                                <div v-else>
                                                    <v-expansion-panels>
                                                        <v-expansion-panel>
                                                            <v-expansion-panel-title class="bg-grey-lighten-2 elevation-6">
                                                                {{ $t('cart.titles.manopera') }}
                                                            </v-expansion-panel-title>
                                                            <v-expansion-panel-text>
                                                                <v-stepper  class="my-2"
                                                                :mobile="screenSize === true"
                                                                v-model="stepValue" >
                                                                    <v-stepper-header >
                                                                        <v-stepper-item
                                                                            :title="$t('cart.titles.manopera')"
                                                                            value="1">
                                                                        </v-stepper-item>
                                                                        <v-divider></v-divider>
                                                                        <v-stepper-item v-if="itemChanged.cartItems[0].selectedManopera.tipGalerie&&itemChanged.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele"
                                                                            :title="$t('cart.titles.ring')"
                                                                            value="2">
                                                                        </v-stepper-item>
                                                                        <v-divider  v-if="itemChanged.cartItems[0].selectedManopera.tipGalerie&&itemChanged.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele"></v-divider>
                                                                        <v-stepper-item
                                                                            :title="$t('cart.titles.line')"
                                                                            :value="itemChanged.cartItems[0].selectedManopera.tipGalerie&&itemChanged.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele ? '3' : '2' ">
                                                                        </v-stepper-item>
                                                                    </v-stepper-header>
                                                                    <v-stepper-window>
                                                                        <v-stepper-window-item value="1">
                                                                            <v-card class="elevation-6 bg-grey-lighten-2">
                                                                                <v-card-title>
                                                                                    <span class="font-weight-light h5">{{ $t('cart.titles.manopera') }} </span>
                                                                                </v-card-title>
                                                                                <v-card-text >
                                                                                    
                                                                                    <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} {{ itemChanged.cartItems[0].selectedManopera.tipGalerie.numeTipRejansa  }}</p>
                                                                                    <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} {{ itemChanged.cartItems[0].selectedManopera.tipGalerie.incretireRejansa  }}</p>
                                                                                    <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }} {{ itemChanged.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu'  }}</p>
                                                                                    <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{ itemChanged.cartItems[0].selectedManopera.tipGalerie.pretTipRejansa }}  {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                                                                                    <NuxtImg preload
                                                                                    :src="itemChanged.cartItems[0].selectedManopera.tipGalerie.presignedUrl"
                                                                                    :width="dimensionsForImage.width"
                                                                                    :height="dimensionsForImage.height">
                                                                                    >

                                                                                    </NuxtImg>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-stepper-window-item>
                                                                        <v-stepper-window-item v-if="checkKey(itemChanged.key)&&itemChanged.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true" value="2">
                                                                            <v-card class="elevation-6 bg-grey-lighten-2">
                                                                                <v-card-title>
                                                                                    <span class="font-weight-light h5">{{ $t('cart.titles.ring') }} </span>
                                                                                </v-card-title>
                                                                                <v-card-text >
                                                                                    <p class="font-weight-light h6">{{ $t('shop.color') }} : {{ itemChanged.cartItems[0].selectedManopera.tipInel.numeTipInel  }}</p>
                                                                                    <NuxtImg preload
                                                                                    :src="itemChanged.cartItems[0].selectedManopera.tipInel.presignedUrl"
                                                                                    :width="dimensionsForImage.width"
                                                                                    :height="dimensionsForImage.height">
                                                                                    >

                                                                                    </NuxtImg>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-stepper-window-item>
                                                                        <v-stepper-window-item :value="itemChanged.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? '3' : '2'">
                                                                            <v-card class="elevation-6 bg-grey-lighten-2">
                                                                                <v-card-title>
                                                                                    <span class="font-weight-light h5">{{ $t('cart.titles.line') }}</span>
                                                                                </v-card-title>
                                                                                <v-card-text >
                                                                                    <p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.name') }} : {{ itemChanged.cartItems[0].selectedManopera.tipLinie.numeTipCusaturaColt  }}</p>
                                                                                    <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{  itemChanged.cartItems[0].selectedManopera.tipLinie.pretTipCusaturaColt }}  {{ currentCurrency === 'RON' ? 'RON' : 'EUR'}} </p>                                                          
                                                                                    <NuxtImg preload
                                                                                    :src="itemChanged.cartItems[0].selectedManopera.tipLinie.presignedUrl"
                                                                                    :width="dimensionsForImage.width"
                                                                                    :height="dimensionsForImage.height">
                                                                                    >

                                                                                    </NuxtImg>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-stepper-window-item>
                                                                        <v-stepper-actions class="my-4">
                                                                            <template v-slot:next="{props}">
                                                                                <v-btn variant="outlined" color="primary" class="ma-1"
                                                                                v-bind="props" @click="stepValue++">
                                                                                    Next<v-icon :icon="mdiArrowRight" size="24"></v-icon>
                                                                                </v-btn>
                                                                            </template>
                                                                            <template v-slot:prev="{props}">
                                                                                <v-btn variant="outlined" color="error" class="ma-1"
                                                                                v-bind="props" @click="stepValue--">
                                                                                Prev<v-icon :icon="mdiArrowLeft" size="24"></v-icon>
                                                                                </v-btn>
                                                                            </template>
                                                                        </v-stepper-actions>
                                                                    </v-stepper-window>
                                                                </v-stepper>
                                                            </v-expansion-panel-text>
                                                        </v-expansion-panel>
                                                    </v-expansion-panels>
                                                </div>
                                            </div>
                                            <!--  de terminat setul afisare la pret schimbat! -->
                                        </v-col>
                                        
                                    </v-row>
                                </div>
                                <div v-else>
                                    <v-row class="pl-2">
                                        <v-col cols="12" >
                                            <span class="font-weight-light text-h6">{{ $t('cart.setName') }} {{ itemChanged.cartItems[0].numeSet }}</span>
                                        </v-col>
                                        <v-col cols="12">
                                            <p  class="font-weight-light text-h6">{{ $t('shop.products') }}</p>
                                            <v-expansion-panels>
                                            
                                                    <v-expansion-panel  v-for="(productInSet,index) in itemChanged.cartItems"
                                                    :key="index"  class="my-2 bg-grey-lighten-2 elevation-6" color="grey-lighten-3" elevation="12">
                                                    <v-expansion-panel-title>
                                                        {{ productInSet.numeProdus }}
                                                    </v-expansion-panel-title>
                                                    <v-expansion-panel-text class="text-center">
                                                        <NuxtImg v-if="productInSet.culoareSelectata.imaginiProdusDto&&productInSet.culoareSelectata.imaginiProdusDto.length>0 "
                                                        :src="productInSet.culoareSelectata.imaginiProdusDto[0].presignedUrl"
                                                        fit="cover"
                                                        sizes="sm:400 md:800"
                                                        :width="dimensionsForImage.width"
                                                        :height="dimensionsForImage.height"
                                                        class="border-sm" >
                                                        </NuxtImg>
                                                        <NuxtImg v-else preload
                                                            src="notFound.png"
                                                            sizes="sm:400 md:800"
                                                            :width="dimensionsForImage.width"
                                                            :height="dimensionsForImage.height"
                                                            class="border-sm" >
                                                        </NuxtImg>
                                                        <div v-if="checkProductType(productInSet.tipProdus)">
                                                            <p class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                                            <p class="font-weight-light h6 text-subtitle-2">{{ productInSet.culoareSelectata.numeCuloareDto }}</p>
                                                            <p class="font-weight-light h5">{{ $t('shop.height') }} {{ currentCurrency === 'RON' ? 'preferata' : 'preffered' }}</p>
                                                            <p class="font-weight-light h6 text-subtitle-1">{{ productInSet.inaltimeCeruta }} cm</p>
                                                            <p class="font-weight-light h5">{{ $t('cart.chosenManopera') }}</p>
                                                            <v-stepper  elevation="12" class="my-2"
                                                                :mobile="screenSize === true"
                                                                v-model="stepValueSet" >
                                                                <v-stepper-header >
                                                                    <v-stepper-item
                                                                    :title="$t('cart.titles.manopera')"
                                                                    value="1">
                                                                    </v-stepper-item>
                                                                    <v-divider></v-divider>
                                                                    <v-stepper-item
                                                                        :title="$t('cart.titles.rejansa')"
                                                                        value="2">
                                                                    </v-stepper-item>
                                                                    <v-divider></v-divider>
                                                                    <v-stepper-item v-if="productInSet.selectedManopera&&productInSet.selectedManopera.tipGalerie.sePrindeCuInele"
                                                                        :title="$t('cart.titles.ring')"
                                                                        value="3">
                                                                    </v-stepper-item>
                                                                    <v-divider  v-if="productInSet.selectedManopera&&productInSet.selectedManopera.tipGalerie.sePrindeCuInele"></v-divider>
                                                                    <v-stepper-item
                                                                        :title="$t('cart.titles.line')"
                                                                        :value="productInSet.selectedManopera&&productInSet.selectedManopera.tipGalerie.sePrindeCuInele ? '4' : '3' ">
                                                                    </v-stepper-item>
                                                                </v-stepper-header>
                                                                <v-stepper-window>
                                                                    <v-stepper-window-item value="1">
                                                                        <v-card class="elevation-6 bg-grey-lighten-2">
                                                                            <v-card-text>
                                                                                <p class="font-weight-light h5">{{ $t('cart.manoperaInfo') }}</p>
                                                                                <p class="font-weight-light h6 text-subtitle-1">{{ $t('shopSeturi.manoperaName') }} {{ productInSet.selectedManopera.numeManopera }}</p>
                                                                                <p class="font-weight-light h6 text-subtitle-1">{{ $t('shopSeturi.totalMeters') }} {{ productInSet.selectedManopera.metruTotalFolosit }}</p>
                                                                                <p class="font-weight-light h6 text-subtitle-1">{{ $t('cart.maxHeight') }}: {{ productInSet.selectedManopera.inaltimeMaxima }}</p>


                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-stepper-window-item>
                                                                    <v-stepper-window-item value="2">
                                                                        <v-card class="elevation-6 bg-grey-lighten-2">
                                                                            <v-card-title>
                                                                                <span class="font-weight-light h5">{{ $t('cart.titles.rejansa') }} </span>
                                                                            </v-card-title>
                                                                            <v-card-text >
                                                                                <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} {{ productInSet.selectedManopera.tipGalerie.numeTipRejansa  }}</p>
                                                                                <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} {{ productInSet.selectedManopera.tipGalerie.incretireRejansa  }}</p>
                                                                                <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }} {{ productInSet.selectedManopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu'  }}</p>
                                                                                <NuxtImg preload
                                                                                :src="productInSet.selectedManopera.tipGalerie.presignedUrl"
                                                                                :width="dimensionsForImage.width"
                                                                                :height="dimensionsForImage.height">
                                                                                >

                                                                                </NuxtImg>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-stepper-window-item>
                                                                    <v-stepper-window-item v-if="productInSet.selectedManopera.tipGalerie.sePrindeCuInele === true" value="3">
                                                                        <v-card class="elevation-6 bg-grey-lighten-2">
                                                                            <v-card-title>
                                                                                <span class="font-weight-light h5">{{ $t('cart.titles.ring') }} </span>
                                                                            </v-card-title>
                                                                            <v-card-text >
                                                                                <p class="font-weight-light h6">{{ $t('shop.color') }} : {{ productInSet.selectedManopera.tipInel.numeTipInel  }}</p>
                                                                                <NuxtImg preload
                                                                                :src="productInSet.selectedManopera.tipInel.presignedUrl"
                                                                                :width="dimensionsForImage.width"
                                                                                :height="dimensionsForImage.height">
                                                                                >

                                                                                </NuxtImg>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-stepper-window-item>
                                                                    <v-stepper-window-item :value="productInSet.selectedManopera.tipGalerie.sePrindeCuInele === true ? '4' : '3'">
                                                                        <v-card class="elevation-6 bg-grey-lighten-2">
                                                                            <v-card-title>
                                                                                <span class="font-weight-light h5">{{ $t('cart.titles.line') }}</span>
                                                                            </v-card-title>
                                                                            <v-card-text >
                                                                                <p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.name') }} : {{ productInSet.selectedManopera.tipLinie.numeTipCusaturaColt  }}</p>
                                                                                <NuxtImg preload
                                                                                :src="productInSet.selectedManopera.tipLinie.presignedUrl"
                                                                                :width="dimensionsForImage.width"
                                                                                :height="dimensionsForImage.height">
                                                                                >

                                                                                </NuxtImg>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-stepper-window-item>
                                                                    <v-stepper-actions class="my-4">
                                                                        <template v-slot:next="{props}">
                                                                            <v-btn variant="outlined" color="primary" class="ma-1"
                                                                            v-bind="props" @click="stepValueSet++">
                                                                                Next<v-icon :icon="mdiArrowRight" size="24"></v-icon>
                                                                            </v-btn>
                                                                        </template>
                                                                        <template v-slot:prev="{props}">
                                                                            <v-btn variant="outlined" color="error" class="ma-1"
                                                                            v-bind="props" @click="stepValueSet--">
                                                                            Prev<v-icon :icon="mdiArrowLeft" size="24"></v-icon>
                                                                            </v-btn>
                                                                        </template>
                                                                    </v-stepper-actions>
                                                                </v-stepper-window>
                                                            </v-stepper>
                                                        </div>
                                                        <div v-else>
                                                            <p class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                                            <p class="font-weight-light h6 text-subtitle-2">{{ productInSet.culoareSelectata.numeCuloareDto }}</p>
                                                            <p class="font-weight-light h5">{{ $t('cart.dimensions') }}</p>
                                                            <p class="font-weight-light h6 text-subtitle-2">{{ $t('shop.width') }} : {{ productInSet.dimensiuneSelectata.lungimeDto }} cm</p>
                                                            <p class="font-weight-light h6 text-subtitle-2">{{ $t('cart.widthNotForCurtains') }} : {{ productInSet.dimensiuneSelectata.latimeDto }} cm</p>
                                                            <p class="font-weight-light h6 text-subtitle-2">{{ $t('cart.bedRecommendation') }} : {{ productInSet.dimensiuneSelectata.recomandarePat }} cm</p>
                                                        </div>
                                                    </v-expansion-panel-text>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                            <v-col cols="12" xs="12" sm="12" md="12">
                                <div class="h-100  d-flex align-center justify-center">
                                    <p class="font-weight-light h5 text-center"><span class="text-decoration-line-through">{{ itemChanged.cartItems[0].pretCurent * itemChanged.cartItems[0].cantitate }}  {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</span> -> 
                                     <span class="text-red">   {{ itemChanged.cartItems[0].pretReal * itemChanged.cartItems[0].cantitate  }} {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</span></p>
                                </div>
                            </v-col>
                            <v-divider></v-divider>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-container fluid class="text-center">
                <p class="font-weight-light h5">{{ $t('checkout.title') }}</p>
            </v-container>
            
            <v-divider></v-divider>
            <div class="text-center pt-2">
                <v-row v-for="(item,index) in syncedItems.items"
                :key="index">
                    <v-col cols="12" xs="12" sm="3">
                        <div v-if="checkKey(item.key)">
                            <NuxtImg preload
                                v-if="item.cartItems[0].culoareSelectata&&item.cartItems[0].culoareSelectata.imaginiProdusDto[0] !== undefined&&item.cartItems[0].culoareSelectata.imaginiProdusDto[0].presignedUrl !== 'empty'"
                                :src="item.cartItems[0].culoareSelectata.imaginiProdusDto[0].presignedUrl"
                                fit="cover"
                                sizes="sm:400 md:800"
                                :width="dimensionsForImage.width"
                                :height="dimensionsForImage.height"
                                class="border-sm" >
                            </NuxtImg>
                            <NuxtImg v-else preload
                                src="notFound.png"
                                sizes="sm:400 md:800"
                                :width="dimensionsForImage.width"
                                :height="dimensionsForImage.height"
                                class="border-sm" >
                            </NuxtImg>
                            <br>
                            <p>{{ item.cartItems[0].cantitate }} x</p>
                        </div>
                        <div v-else>
                            <NuxtImg preload
                                v-if="item.cartItems && item.cartItems.length > 1 && getFirstImageFromSet(item.cartItems)"
                                :src="getFirstImageFromSet(item.cartItems)"
                                sizes="sm:400 md:800"
                                :width="dimensionsForImage.width"
                                :height="dimensionsForImage.height"
                                class="border-sm" >
                            </NuxtImg>
                            <NuxtImg v-else preload
                                src="notFound.png"
                                sizes="sm:400 md:800"
                                :width="dimensionsForImage.width"
                                :height="dimensionsForImage.height"
                                class="border-sm" >
                            </NuxtImg>
                            <p>{{ item.cartItems[0].cantitate }} x</p>
                        </div>
                    </v-col>
                    
                    <v-col cols="12" xs="12" sm="7">
                        <div v-if="checkKey(item.key)" :class="{'text-left' : !screenSize}">
                            <v-row class="pl-2">
                                <v-col cols="12">
                                    <span class="font-weight-light text-h6">{{ item.cartItems[0].numeProdus }}</span>
                                    <p class="font-weight-light text-subtitle-2">{{ item.cartItems[0].tipProdus }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <p class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                    <p class="font-weight-light h6 text-subtitle-1">{{ item.cartItems[0].culoareSelectata.numeCuloareDto }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <div class="mb-8">
                                        <p class="font-weight-light h5">{{ $t('cart.dimensions') }}</p>
                                        <p class="font-weight-light h6 text-subtitle-1"> {{checkProductType(item.cartItems[0].tipProdus) ?  $t('shop.curtain.railwayWidth')  :  $t('shop.width')  }}  : {{ item.cartItems[0].dimensiuneSelectata.lungimeDto  }} cm</p>
                                        <p class="font-weight-light h6 text-subtitle-1">{{ checkProductType(item.cartItems[0].tipProdus) ? $t('shop.height') :  $t('cart.widthNotForCurtains')}} : {{  item.cartItems[0].dimensiuneSelectata.latimeDto ?  item.cartItems[0].dimensiuneSelectata.latimeDto : 'N/A'  }} cm</p>
                                    </div>
                                    <div v-if="checkProductType(item.cartItems[0].tipProdus)">
                                        <div v-if="item.cartItems[0].selectedManopera?.numeManopera === 'STAN'">
                                            <p class="font-weight-light h5">{{ $t('cart.material') }} {{ item.cartItems[0].selectedManopera.metruTotalFolosit }} m</p>
                                        </div>
                                        <div v-else>
                                            <v-expansion-panels>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-title class="bg-grey-lighten-2 elevation-6">
                                                        {{ $t('cart.titles.manopera') }}
                                                    </v-expansion-panel-title>
                                                    <v-expansion-panel-text>
                                                        <v-stepper  class="my-2"
                                                        :mobile="screenSize === true"
                                                        v-model="stepValue" >
                                                            <v-stepper-header >
                                                                <v-stepper-item
                                                                    :title="$t('cart.titles.manopera')"
                                                                    value="1">
                                                                </v-stepper-item>
                                                                <v-divider></v-divider>
                                                                <v-stepper-item v-if="item.cartItems[0].selectedManopera.tipGalerie&&item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele"
                                                                    :title="$t('cart.titles.ring')"
                                                                    value="2">
                                                                </v-stepper-item>
                                                                <v-divider  v-if="item.cartItems[0].selectedManopera.tipGalerie&&item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele"></v-divider>
                                                                <v-stepper-item
                                                                    :title="$t('cart.titles.line')"
                                                                    :value="item.cartItems[0].selectedManopera.tipGalerie&&item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele ? '3' : '2' ">
                                                                </v-stepper-item>
                                                            </v-stepper-header>
                                                            <v-stepper-window>
                                                                <v-stepper-window-item value="1">
                                                                    <v-card class="elevation-6 bg-grey-lighten-2">
                                                                        <v-card-title>
                                                                            <span class="font-weight-light h5">{{ $t('cart.titles.manopera') }} </span>
                                                                        </v-card-title>
                                                                        <v-card-text >
                                                                            
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} {{ item.cartItems[0].selectedManopera.tipGalerie.numeTipRejansa  }}</p>
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} {{ item.cartItems[0].selectedManopera.tipGalerie.incretireRejansa  }}</p>
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }} {{ item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu'  }}</p>
                                                                            <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{ item.cartItems[0].selectedManopera.tipGalerie.pretTipRejansa }}  {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                                                                            <NuxtImg preload
                                                                            :src="item.cartItems[0].selectedManopera.tipGalerie.presignedUrl"
                                                                            :width="dimensionsForImage.width"
                                                                            :height="dimensionsForImage.height">
                                                                            >

                                                                            </NuxtImg>
                                                                        </v-card-text>
                                                                    </v-card>
                                                                </v-stepper-window-item>
                                                                <v-stepper-window-item v-if="checkKey(item.key)&&item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true" value="2">
                                                                    <v-card class="elevation-6 bg-grey-lighten-2">
                                                                        <v-card-title>
                                                                            <span class="font-weight-light h5">{{ $t('cart.titles.ring') }} </span>
                                                                        </v-card-title>
                                                                        <v-card-text >
                                                                            <p class="font-weight-light h6">{{ $t('shop.color') }} : {{ item.cartItems[0].selectedManopera.tipInel.numeTipInel  }}</p>
                                                                            <NuxtImg preload
                                                                            :src="item.cartItems[0].selectedManopera.tipInel.presignedUrl"
                                                                            :width="dimensionsForImage.width"
                                                                            :height="dimensionsForImage.height">
                                                                            >

                                                                            </NuxtImg>
                                                                        </v-card-text>
                                                                    </v-card>
                                                                </v-stepper-window-item>
                                                                <v-stepper-window-item :value="item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? '3' : '2'">
                                                                    <v-card class="elevation-6 bg-grey-lighten-2">
                                                                        <v-card-title>
                                                                            <span class="font-weight-light h5">{{ $t('cart.titles.line') }}</span>
                                                                        </v-card-title>
                                                                        <v-card-text >
                                                                            <p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.name') }} : {{ item.cartItems[0].selectedManopera.tipLinie.numeTipCusaturaColt  }}</p>
                                                                            <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{  item.cartItems[0].selectedManopera.tipLinie.pretTipCusaturaColt }}  {{ currentCurrency === 'RON' ? 'RON' : 'EUR'}} </p>                                                          
                                                                            <NuxtImg preload
                                                                            :src="item.cartItems[0].selectedManopera.tipLinie.presignedUrl"
                                                                            :width="dimensionsForImage.width"
                                                                            :height="dimensionsForImage.height">
                                                                            >

                                                                            </NuxtImg>
                                                                        </v-card-text>
                                                                    </v-card>
                                                                </v-stepper-window-item>
                                                                <v-stepper-actions class="my-4">
                                                                    <template v-slot:next="{props}">
                                                                        <v-btn variant="outlined" color="primary" class="ma-1"
                                                                        v-bind="props" @click="stepValue++">
                                                                            Next<v-icon :icon="mdiArrowRight" size="24"></v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <template v-slot:prev="{props}">
                                                                        <v-btn variant="outlined" color="error" class="ma-1"
                                                                        v-bind="props" @click="stepValue--">
                                                                        Prev<v-icon :icon="mdiArrowLeft" size="24"></v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                </v-stepper-actions>
                                                            </v-stepper-window>
                                                        </v-stepper>
                                                    </v-expansion-panel-text>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </div>
                                    </div>
                                   
                                </v-col>
                            </v-row>
                            <!-- AICI SET -->
                        </div>
                        <div :class="{'text-left' : !screenSize}" v-else>
                            <v-row class="pl-2">
                                <v-col cols="12" >
                                    <span class="font-weight-light text-h6">{{ $t('cart.setName') }} {{ item.cartItems[0].numeSet }}</span>
                                </v-col>
                                <v-col cols="12">
                                    <p  class="font-weight-light text-h6">{{ $t('shop.products') }}</p>
                                    <v-expansion-panels>
                                      
                                            <v-expansion-panel  v-for="(productInSet,index) in item.cartItems"
                                            :key="index"  class="my-2 bg-grey-lighten-2 elevation-6" color="grey-lighten-3" elevation="12">
                                            <v-expansion-panel-title>
                                                {{ productInSet.numeProdus }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text class="text-center">
                                                <NuxtImg v-if="productInSet.culoareSelectata.imaginiProdusDto&&productInSet.culoareSelectata.imaginiProdusDto.length>0 "
                                                :src="productInSet.culoareSelectata.imaginiProdusDto[0].presignedUrl"
                                                fit="cover"
                                                sizes="sm:400 md:800"
                                                :width="dimensionsForImage.width"
                                                :height="dimensionsForImage.height"
                                                class="border-sm" >
                                                </NuxtImg>
                                                <NuxtImg v-else preload
                                                    src="notFound.png"
                                                    sizes="sm:400 md:800"
                                                    :width="dimensionsForImage.width"
                                                    :height="dimensionsForImage.height"
                                                    class="border-sm" >
                                                </NuxtImg>
                                                <div v-if="checkProductType(productInSet.tipProdus)">
                                                    <p class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                                    <p class="font-weight-light h6 text-subtitle-2">{{ productInSet.culoareSelectata.numeCuloareDto }}</p>
                                                    <p class="font-weight-light h5">{{ $t('shop.height') }} {{ currentCurrency === 'RON' ? 'preferata' : 'preffered' }}</p>
                                                    <p class="font-weight-light h6 text-subtitle-1">{{ productInSet.inaltimeCeruta }} cm</p>
                                                    <p class="font-weight-light h5">{{ $t('cart.chosenManopera') }}</p>
                                                    <v-stepper  elevation="12" class="my-2"
                                                        :mobile="screenSize === true"
                                                        v-model="stepValueSet" >
                                                        <v-stepper-header >
                                                            <v-stepper-item
                                                            :title="$t('cart.titles.manopera')"
                                                            value="1">
                                                            </v-stepper-item>
                                                            <v-divider></v-divider>
                                                            <v-stepper-item
                                                                :title="$t('cart.titles.rejansa')"
                                                                value="2">
                                                            </v-stepper-item>
                                                            <v-divider></v-divider>
                                                            <v-stepper-item v-if="productInSet.selectedManopera&&productInSet.selectedManopera.tipGalerie.sePrindeCuInele"
                                                                :title="$t('cart.titles.ring')"
                                                                value="3">
                                                            </v-stepper-item>
                                                            <v-divider  v-if="productInSet.selectedManopera&&productInSet.selectedManopera.tipGalerie.sePrindeCuInele"></v-divider>
                                                            <v-stepper-item
                                                                :title="$t('cart.titles.line')"
                                                                :value="productInSet.selectedManopera&&productInSet.selectedManopera.tipGalerie.sePrindeCuInele ? '4' : '3' ">
                                                            </v-stepper-item>
                                                        </v-stepper-header>
                                                        <v-stepper-window>
                                                            <v-stepper-window-item value="1">
                                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                                    <v-card-text>
                                                                        <p class="font-weight-light h5">{{ $t('cart.manoperaInfo') }}</p>
                                                                        <p class="font-weight-light h6 text-subtitle-1">{{ $t('shopSeturi.manoperaName') }} {{ productInSet.selectedManopera.numeManopera }}</p>
                                                                        <p class="font-weight-light h6 text-subtitle-1">{{ $t('shopSeturi.totalMeters') }} {{ productInSet.selectedManopera.metruTotalFolosit }}</p>
                                                                        <p class="font-weight-light h6 text-subtitle-1">{{ $t('cart.maxHeight') }}: {{ productInSet.selectedManopera.inaltimeMaxima }}</p>


                                                                    </v-card-text>
                                                                </v-card>
                                                            </v-stepper-window-item>
                                                            <v-stepper-window-item value="2">
                                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                                    <v-card-title>
                                                                        <span class="font-weight-light h5">{{ $t('cart.titles.rejansa') }} </span>
                                                                    </v-card-title>
                                                                    <v-card-text >
                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} {{ productInSet.selectedManopera.tipGalerie.numeTipRejansa  }}</p>
                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} {{ productInSet.selectedManopera.tipGalerie.incretireRejansa  }}</p>
                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }} {{ productInSet.selectedManopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu'  }}</p>
                                                                        <NuxtImg preload
                                                                        :src="productInSet.selectedManopera.tipGalerie.presignedUrl"
                                                                        :width="dimensionsForImage.width"
                                                                        :height="dimensionsForImage.height">
                                                                        >

                                                                        </NuxtImg>
                                                                    </v-card-text>
                                                                </v-card>
                                                            </v-stepper-window-item>
                                                            <v-stepper-window-item v-if="productInSet.selectedManopera.tipGalerie.sePrindeCuInele === true" value="3">
                                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                                    <v-card-title>
                                                                        <span class="font-weight-light h5">{{ $t('cart.titles.ring') }} </span>
                                                                    </v-card-title>
                                                                    <v-card-text >
                                                                        <p class="font-weight-light h6">{{ $t('shop.color') }} : {{ productInSet.selectedManopera.tipInel.numeTipInel  }}</p>
                                                                        <NuxtImg preload
                                                                        :src="productInSet.selectedManopera.tipInel.presignedUrl"
                                                                        :width="dimensionsForImage.width"
                                                                        :height="dimensionsForImage.height">
                                                                        >

                                                                        </NuxtImg>
                                                                    </v-card-text>
                                                                </v-card>
                                                            </v-stepper-window-item>
                                                            <v-stepper-window-item :value="productInSet.selectedManopera.tipGalerie.sePrindeCuInele === true ? '4' : '3'">
                                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                                    <v-card-title>
                                                                        <span class="font-weight-light h5">{{ $t('cart.titles.line') }}</span>
                                                                    </v-card-title>
                                                                    <v-card-text >
                                                                        <p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.name') }} : {{ productInSet.selectedManopera.tipLinie.numeTipCusaturaColt  }}</p>
                                                                        <NuxtImg preload
                                                                        :src="productInSet.selectedManopera.tipLinie.presignedUrl"
                                                                        :width="dimensionsForImage.width"
                                                                        :height="dimensionsForImage.height">
                                                                        >

                                                                        </NuxtImg>
                                                                    </v-card-text>
                                                                </v-card>
                                                            </v-stepper-window-item>
                                                            <v-stepper-actions class="my-4">
                                                                <template v-slot:next="{props}">
                                                                    <v-btn variant="outlined" color="primary" class="ma-1"
                                                                    v-bind="props" @click="stepValueSet++">
                                                                        Next<v-icon :icon="mdiArrowRight" size="24"></v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <template v-slot:prev="{props}">
                                                                    <v-btn variant="outlined" color="error" class="ma-1"
                                                                    v-bind="props" @click="stepValueSet--">
                                                                    Prev<v-icon :icon="mdiArrowLeft" size="24"></v-icon>
                                                                    </v-btn>
                                                                </template>
                                                            </v-stepper-actions>
                                                        </v-stepper-window>
                                                    </v-stepper>
                                                </div>
                                                <div v-else>
                                                    <p class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                                    <p class="font-weight-light h6 text-subtitle-2">{{ productInSet.culoareSelectata.numeCuloareDto }}</p>
                                                    <p class="font-weight-light h5">{{ $t('cart.dimensions') }}</p>
                                                    <p class="font-weight-light h6 text-subtitle-2">{{ $t('shop.width') }} : {{ productInSet.dimensiuneSelectata.lungimeDto }} cm</p>
                                                    <p class="font-weight-light h6 text-subtitle-2">{{ $t('cart.widthNotForCurtains') }} : {{ productInSet.dimensiuneSelectata.latimeDto }} cm</p>
                                                    <p class="font-weight-light h6 text-subtitle-2">{{ $t('cart.bedRecommendation') }} : {{ productInSet.dimensiuneSelectata.recomandarePat }} cm</p>
                                                </div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
         
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>
                    <v-col cols="12" xs="12" sm="2">
                        <div class="h-100  d-flex align-center justify-center">
                            <p class="font-weight-light h5 text-center">{{ item.cartItems[0].pretCurent * item.cartItems[0].cantitate }}
                             {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                        </div>
                    </v-col>
                    <v-divider></v-divider>
                </v-row>
            </div>
            <!-- USER INPUT -->
            <div class="text-center p-2 ">
                <div v-if="checkCompletedPersonalAccountDetails">
                    <v-alert type="success" variant="tonal" v-if="personalDetailsSelected" class="mb-4">
                        Selectata cu succes
                    </v-alert>
                    <p class="font-weight-light h4 mt-4">{{currentCurrency === 'RON' ? 'Preia detalii ' : 'Select details'}}</p>
                    
                    <v-card class="my-2 p-2 elevation-6 bg-grey-lighten-3">
                        <v-card-title class="text-center" >
                            <div >
                                <v-checkbox-btn density="comfortable"
                                :true-icon="mdiCheck" color="blue"
                                :true-value="true" 
                                v-model="personalDetailsSelected"
                                @change="clearOrSelectUserDetails"
                                >
                                </v-checkbox-btn>
                            </div>
                            
                        </v-card-title>
                        <v-card-text>
                            <p  class="font-weight-light h6">Nume : {{ syncedItems.userOrderDetails.nume }}</p>
                            <p  class="font-weight-light h6">Prenume : {{ syncedItems.userOrderDetails.prenume }}</p>
                            <p  class="font-weight-light h6">Nr. Tel :{{ syncedItems.userOrderDetails.nrTelefon }}</p>
                            <p  class="font-weight-light h6">E-mail : {{ syncedItems.userOrderDetails.email }} </p>
                        </v-card-text>
                    </v-card>
                </div>
                
                <p class="font-weight-light h4 mt-4">{{currentCurrency === 'RON' ? 'Detalii comanda' : 'Order details'}}</p>
                <v-form ref="userInfoForm" validate-on="input" class="bg-blue-grey-lighten-5 elevation-12">
                <div v-for="(data, index) in userForm" :key="index">
                    <v-text-field
                    :label="data.label"
                    :placeholder="data.placeholder"
                    :type="data.type"
                    v-model="userData[data.model]"
                    :counter="data.maxLen"
                    :rules="data.rules"
                    class="px-4 pt-4 m-1"
                    variant="outlined"
                    ></v-text-field>
                </div>
                </v-form>
            </div>
            <v-divider></v-divider>
            <!-- ADDRESS INPUT/SELECTION -->
            <div class="text-center p-2">
               <div fluid >
                    <v-card class="my-2 p-2 elevation-6 bg-grey-lighten-3">
                        <v-card-text>
                            <v-checkbox :true-value="true" :false-value="false"
                                v-model="sameDeliveryAndBilling"
                                :true-icon="mdiCheck" color="green"
                                
                             >
                            <template v-slot:label>
                                <span class="font-weight-normal">{{ $t('checkout.sameBillingAndDeliveryAddress') }}</span>
                            </template>
                            </v-checkbox>
                        </v-card-text>
                    </v-card>
                    <div v-if="syncedItems.isLoggedIn">
                        <div>
                            <p class="font-weight-light h4 my-4">{{ $t('checkout.chooseAddresses') }}</p>
                            <v-divider></v-divider>
                        </div>
                        <v-row>
                            <v-col cols="12" xs="12" :sm="`${sameDeliveryAndBilling === false ? 6 : 12}`" v-if="syncedItems.clientsDeliveryAddresses.length > 0">
                                <p class="font-weight-light h4 mt-4">{{ $t('profile.delivery') }}</p>
                                <v-card v-for="(deliveryAddress,index) in syncedItems.clientsDeliveryAddresses"
                                :key="index" class="bg-grey-lighten-5 elevation-6 my-4 mr-2">
                                    <v-card-title class="text-center" >
                                        <div >
                                            <!-- de adaugat in asa fel in cat cand da check la o adresa , sa se transmute totul in deliveryUserAddress-->
                                            <v-checkbox-btn density="comfortable"
                                            :true-icon="mdiCheck" color="blue"
                                            :true-value="deliveryAddress" 
                                            :v-model="deliveryAddress"
                                            @change="assignDeliveryUserAddress(deliveryAddress)"
                                           >
                                            </v-checkbox-btn>
                                            <span >{{ deliveryAddress.aliasDto }}  <v-icon class="mx-2" :icon="mdiMapMarkerOutline" size="24"></v-icon> </span>
                                            <span v-if="sameDeliveryAndBilling">  / <v-icon class="mx-2" :icon="mdiFileDocumentPlusOutline" size="24"> </v-icon></span>
                                          
                                        </div>
                                        
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text >
                                        <v-row>
                                            <v-col cols="12" >
                                                <p  class="font-weight-light h6">{{ $t('profile.county') }} : {{ deliveryAddress.judetDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.city') }} : {{ deliveryAddress.orasDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ deliveryAddress.codPostalDto }}</p>
                                            </v-col>
                                            <v-col cols="12">
                                                <p  class="font-weight-light h6" v-if="deliveryAddress.blocDto !== null">{{ $t('profile.building') }} : {{ deliveryAddress.blocDto }}</p>
                                                <p  class="font-weight-light h6" v-if="deliveryAddress.nrBlocDto !== null">{{ $t('profile.buildingNumber') }} : {{ deliveryAddress.blocDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.street') }} : {{ deliveryAddress.stradaDto }}</p>
                                                <p  class="font-weight-light h6" >{{ $t('profile.streetNumber') }} : {{ deliveryAddress.nrStradaDto }}</p>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col v-else>
                                <p class="font-weight-light h4 mt-4">{{ $t('profile.delivery') }}</p>
                                <v-card class="bg-grey-lighten-5 elevation-6 my-4 mr-2">
                                    <v-card-text>
                                        <p>{{ $t('checkout.noDeliveryAddress') }} <v-icon :icon="mdiEmoticonSadOutline" size="24"></v-icon></p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            
                            <v-col cols="12" xs="12" :sm="`${sameDeliveryAndBilling === false ? 6 : 12}`" v-if="syncedItems.clientsBillingAddresses.length > 0 && !sameDeliveryAndBilling">
                                <p class="font-weight-light h4 mt-4">{{ $t('profile.billing') }}</p>
                                <v-card v-for="(billingAddress,index) in syncedItems.clientsBillingAddresses"
                                :key="index" class="bg-grey-lighten-5 elevation-6 my-4 ml-2">
                                    <v-card-title>
                                        <div >
                                            <v-checkbox-btn density="comfortable"
                                            true-icon="mdi-check" color="blue"
                                            :true-value="billingAddress" 
                                            :v-model="billingAddress"
                                            @change="assignBillingUserAddress(billingAddress)"
                                           >
                                            </v-checkbox-btn>
                                            <span>{{ billingAddress.aliasDto }}<v-icon class="mx-2" :icon="mdiFileDocumentPlusOutline" size="24"> </v-icon></span>
                                        </div>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text >
                                        <v-row>
                                            <v-col cols="12">
                                                <p  class="font-weight-light h6">{{ $t('profile.county') }} : {{ billingAddress.judetDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.city') }} : {{ billingAddress.orasDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ billingAddress.codPostalDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.Cif') }} : {{ billingAddress.cifDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.firmName') }} : {{ billingAddress.numeFirmaDto }}</p>
                                            </v-col>
                                            <v-col cols="12" >
                                                <p  class="font-weight-light h6" v-if="billingAddress.blocDto !== null">{{ $t('profile.building') }} : {{ billingAddress.blocDto }}</p>
                                                <p  class="font-weight-light h6" v-if="billingAddress.nrBlocDto !== null">{{ $t('profile.buildingNumber') }} : {{ billingAddress.blocDto }}</p>
                                                <p  class="font-weight-light h6">{{ $t('profile.street') }} : {{ billingAddress.stradaDto }}</p>
                                                <p  class="font-weight-light h6" >{{ $t('profile.streetNumber') }} : {{ billingAddress.nrStradaDto }}</p>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col v-else-if="syncedItems.clientsBillingAddresses.length <= 0 ">
                                <p class="font-weight-light h4 mt-4">{{ $t('profile.billing') }}</p>
                                <v-card class="bg-grey-lighten-5 elevation-6 my-4 mr-2">
                                    <v-card-text>
                                        <p>{{ $t('checkout.noBillingAddress') }} <v-icon :icon="mdiEmoticonSadOutline" size="24"></v-icon></p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <!-- (1 && 0) || (0 && (0 || 1))-->
                        <div v-if="(sameDeliveryAndBilling && !deliveryAddressSelected) || (!sameDeliveryAndBilling && (!deliveryAddressSelected || !billingAddressSelected))">
                            
                            <v-divider></v-divider>
                            <v-btn class="rounded-xl p-1"
                            
                            color="black">
                            {{currentCurrency === 'RON' ? 'SAU' : 'OR'}}
                            </v-btn>
                            <v-divider></v-divider>
                        </div>
                    </div>
                    
                    <v-container fluid>
                        <div v-if="sameDeliveryAndBilling" >
                            <div v-if="(!deliveryAddressSelected && syncedItems.isLoggedIn) || (!deliveryAddressSelected)">
                                <p  class="font-weight-light h4 mt-4">{{ $t('checkout.inputAddress') }}</p>
                                <v-form ref="deliveryAndBillingForm" validate-on="input" 
                            
                                class="bg-blue-grey-lighten-5 w-100 elevation-12" >
                                
                                
                                    <div v-for="(data) in filteredDataForm('delivery').value" :key="data.label">
                                        <v-text-field
                                            :label="data.label"
                                            :placeholder="data.placeholder"
                                            :type="data.type"
                                            :counter="data.counter"
                                            v-model="deliveryUserAddress[data.model]"
                                            :rules="data.rules"
                                            class="px-4 pt-4 m-1"
                                            variant="outlined"
                                        ></v-text-field>
                                    </div>
                               
                                </v-form>
                            </div>
                           
                        </div>
                        <div v-else>
                            <div v-if="!deliveryAddressSelected">
                                <p  class="font-weight-light h4 mt-4">{{ $t('checkout.inputDeliveryAddress') }}</p>
                                <v-form ref="deliveryAddressForm" validate-on="input" 
                                class="bg-blue-grey-lighten-5 elevation-12" >
                                    <div v-for="(data) in filteredDataForm('delivery').value" :key="data.label">
                                        <v-text-field
                                            :label="data.label"
                                            :placeholder="data.placeholder"
                                            :type="data.type"
                                            :counter="data.counter"
                                            v-model="deliveryUserAddress[data.model]"
                                            :rules="data.rules"
                                            class="px-4 pt-4 m-1"
                                            variant="outlined"
                                        ></v-text-field>
                                    </div>
                                
                                </v-form>
                                <v-divider></v-divider>
                            </div>
                            <div v-if="!billingAddressSelected">
                                <p  class="font-weight-light h4 mt-4">{{ $t('checkout.inputBillingAddress') }}</p>
                                <v-form ref="billingAddressForm" validate-on="input"
                                class="bg-blue-grey-lighten-5 elevation-12" >
                                    <div v-for="(data) in dataForm('billing')" :key="data.label">
                                        <v-text-field
                                            :label="data.label"
                                            :placeholder="data.placeholder"
                                            :type="data.type"
                                            :counter="data.counter"
                                            v-model="billingUserAddress[data.model]"
                                            :rules="data.rules"
                                            class="px-4 pt-4 m-1"
                                            variant="outlined"
                                        ></v-text-field>
                                    </div>
                                </v-form>
                            </div>
                            
                        </div>
                    </v-container>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="text-center p-2">
                <v-alert v-if="selectedPaymentMethod.id === 1" class="text-left" variant="tonal" color="black" :icon="mdiInformation">
                    <p>{{ $t('checkout.rambursPaymentInfo') }}</p>
                </v-alert>
                <p class="font-weight-light h4 my-4">{{ $t('checkout.paymentMethods') }}</p>
                <v-table class="bg-white elevation-12 ">
                    <thead>
                        <tr>
                            <th class="text-left font-weight-light h6 " v-for="item in tableHeaders"
                            :key="item">
                                {{ item }}
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in tableRows"
                    :key="item" class="text-left font-weight-normal h6 ">
                        <td >
                           {{ item.name }}
                        </td>
                        <td>
                           {{ item.price }} {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}
                        </td>
                        <td >
                            <v-checkbox-btn :true-icon="mdiCheck" :true-value="item"
                            color="green" v-model="selectedPaymentMethod"
                            >

                            </v-checkbox-btn>
                        </td>
                    </tr>
                   
                    </tbody>
                </v-table>
            </div>
            <v-divider></v-divider>

            <div class="text-center p-2">
                <v-card class="elevation-24 p-2 bg-grey-darken-4">
                    <v-card-title class="text-left ">
                        <span class="font-weight-light text-h5">{{ $t('checkout.orderSummary') }}</span>
                        <v-divider></v-divider>
                    </v-card-title>
                    <v-card-text>
                    <v-row>
                        <v-col cols="12" xs="12" sm="10"  md="10" class="text-left">
                            <span class="font-weight-normal text-h6">{{ $t('orderHistory.products') }}</span>
                        </v-col>
                        <v-col cols="12" xs="12" sm="2" md="2" class="text-right">
                            <span class="font-weight-normal text-h6">{{ syncedItems.pretTotal }} {{ currentCurrency === "RON" ? "RON" : "EUR" }}</span>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12" xs="12" sm="10" md="10" class="text-left" v-if="selectedPaymentMethod.id !== 0">
                            <span class="font-weight-normal text-h6">{{ selectedPaymentMethod.name }}</span>
                            <br>
                            <span class="text-subtitle-2">{{ $t('checkout.paymentFee') }}</span>
                        </v-col>
                        <v-col cols="12" xs="12" sm="2" md="2" class="text-right" v-if="selectedPaymentMethod.id !== 0">
                            <span class="font-weight-normal text-h6">{{ selectedPaymentMethod.price }} {{ currentCurrency === "RON" ? "RON" : "EUR" }}</span>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12" xs="12" sm="10" md="10" class="text-left" v-if="discountCodeProperties.codVoucherDto !== ''">
                            <span class="font-weight-normal text-h6">Cupon/Cod </span>
                            <br>
                            <v-btn color="red" @click="deleteCoupon()">STERGE</v-btn>
                        </v-col>
                        <v-col cols="12" xs="12" sm="2" md="2" class="text-right"  v-if="discountCodeProperties.codVoucherDto !== ''">
                            <span class="font-weight-normal text-h6">{{ discountCodeProperties.codVoucherDto }}</span>
                            <br>
                            <span class="font-weight-normal text-h6">{{ discountCodeProperties.reducereDto }}%</span>
                        </v-col>
                        <v-divider v-if="discountCodeProperties.codVoucherDto !== ''"></v-divider>
                        <v-col cols="12" xs="12" sm="10" md="10" class="text-left">
                            <span class="font-weight-normal text-h6">{{ $t('checkout.deliveryFee') }}</span>     
                        </v-col>
                        <v-col cols="12" xs="12" sm="2" md="2" class="text-right" >
                            <span class="font-weight-normal text-h6" v-if="generalSettings.pret_comanda_minima > syncedItems.pretTotal">17 {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</span>
                            <span  class="font-weight-normal text-h6 text-red" v-else>{{ $t('checkout.free') }}</span>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12" xs="12" sm="10" md="10" class="text-left">
                            <span class="font-weight-normal text-h6">Total</span>     
                        </v-col>
                        <!-- <v-divider v-if="discountCodeProperties.codVoucherDto !== ''"></v-divider> -->
                        <v-col cols="12" xs="12" sm="2" md="2" class="text-right" >
                            <span v-if="discountCodeProperties.codVoucherDto === ''" class="font-weight-normal text-h6">{{ syncedItems.pretTotal + selectedPaymentMethod.price + 17}} {{ currentCurrency === "RON" ? "RON" : "EUR" }}</span>
                            <span v-else class="font-weight-normal text-h6 text-red">{{ (syncedItems.pretTotal * (discountCodeProperties.reducereDto / 100)) + selectedPaymentMethod.price + 17}} {{ currentCurrency === "RON" ? "RON" : "EUR" }}</span>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12" md="12" sm="12" >
                            <v-alert type="success" variant="outlined" v-if="voucherApplied" class="my-4">
                                {{$t('checkout.appliedSuccesfully') }}
                            </v-alert>
                            <span class="font-weight-normal text-h6 ">{{ $t('checkout.discountCode') }}</span>
                            <v-text-field v-model="discountCode"
                            prepend-inner-icon="mdi-arrow-right">
                            </v-text-field>
                            <v-btn variant="flat" color="green-darken-2" @click="applyCoupon()">
                                {{ $t('checkout.applyDiscountCode') }}
                            </v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-divider></v-divider>
                            <p class="font-weight-light h4">{{currentCurrency === 'RON' ? 'Detalii comanda' : 'Order details'}}</p>
                            <v-card class="my-2 p-2 elevation-6 bg-grey-darken-3">
                            
                                <v-card-text>
                                    <p  class="font-weight-light h6">Nume : {{ userData.nume }}</p>
                                    <p  class="font-weight-light h6">Prenume : {{ userData.prenume }}</p>
                                    <p  class="font-weight-light h6">Nr. Tel : {{ userData.nrTelefon }}</p>
                                    <p  class="font-weight-light h6">E-mail : {{ userData.email }} </p>
                                </v-card-text>
                            </v-card>
                            <v-divider></v-divider>
                        </v-col>
                        <v-col cols="12">
                            <div v-if="sameDeliveryAndBilling">
                               
                                <v-alert type="info" variant="tonal" class="my-2">
                                   <span class="font-weight-normal h6 "> {{ $t('checkout.sameBillingAndDeliveryAddress') }}</span>
                                </v-alert>
                                <p class="font-weight-light h4">{{ $t('checkout.addressSelected') }}</p>
                                <div v-if="checkDeliveryAddressSelected">
                                    <v-card class="bg-grey-darken-3 elevation-12 my-4 ml-2">
                                        <v-card-title>
                                            <div >
                                                <span>{{ deliveryUserAddress.aliasDto }} <v-icon class="mx-2" :icon="mdiMapMarkerOutline" size="24"></v-icon> / <v-icon class="mx-2" :icon="mdiFileDocumentPlusOutline" size="24"> </v-icon></span>
                                            </div>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text >
                                            <v-row>
                                                <v-col cols="12">
                                                    <p  class="font-weight-light h6">{{ $t('profile.county') }} : {{ deliveryUserAddress.judetDto }}</p>
                                                    <p  class="font-weight-light h6">{{ $t('profile.city') }} : {{ deliveryUserAddress.orasDto }}</p>
                                                    <p  class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ deliveryUserAddress.codPostalDto }}</p>
                                                </v-col>
                                                <v-col cols="12" >
                                                    <p  class="font-weight-light h6" v-if="deliveryUserAddress.blocDto !== null">{{ $t('profile.building') }} : {{ deliveryUserAddress.blocDto }}</p>
                                                    <p  class="font-weight-light h6" v-if="deliveryUserAddress.nrBlocDto !== null">{{ $t('profile.buildingNumber') }} : {{ deliveryUserAddress.nrBlocDto }}</p>
                                                    <p  class="font-weight-light h6">{{ $t('profile.street') }} : {{ deliveryUserAddress.stradaDto }}</p>
                                                    <p  class="font-weight-light h6" >{{ $t('profile.streetNumber') }} : {{ deliveryUserAddress.nrStradaDto }}</p>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div v-else>
                                    <v-card class="bg-grey-lighten-2 elevation-12 my-4 ml-2">
                                        <v-card-text >
                                            <p class="font-weight-normal h6">{{ $t('checkout.noAddressSelected') }} <v-icon :icon="mdiEmoticonSadOutline" size="24"></v-icon></p>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </div>
                            <div v-else>
                                
                                <p class="font-weight-light h4">{{ $t('checkout.selectedDeliveryAddress') }}</p>
                                <div v-if="checkDeliveryAddressSelected">
                                    <v-card class="bg-grey-darken-3 border-sm elevation-12 my-4 ml-2">
                                        <v-card-title>
                                            <div >
                                                <span>{{ deliveryUserAddress.aliasDto }} <v-icon class="mx-2" :icon="mdiMapMarkerOutline" size="24"></v-icon></span>
                                            </div>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text >
                                            <v-row>
                                                <v-col cols="12">
                                                    <p  class="font-weight-normal h6">{{ $t('profile.county') }} : {{ deliveryUserAddress.judetDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.city') }} : {{ deliveryUserAddress.orasDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.postalCode') }} : {{ deliveryUserAddress.codPostalDto }}</p>
                                                </v-col>
                                                <v-col cols="12" >
                                                    <p  class="font-weight-normal h6" v-if="deliveryUserAddress.blocDto !== null">{{ $t('profile.building') }} : {{ deliveryUserAddress.blocDto }}</p>
                                                    <p  class="font-weight-normal h6" v-if="deliveryUserAddress.nrBlocDto !== null">{{ $t('profile.buildingNumber') }} : {{ deliveryUserAddress.nrBlocDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.street') }} : {{ deliveryUserAddress.stradaDto }}</p>
                                                    <p  class="font-weight-normal h6" >{{ $t('profile.streetNumber') }} : {{ deliveryUserAddress.nrStradaDto }}</p>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    
                                </div>
                                <div v-else>
                                    <v-card class="bg-grey-lighten-2 elevation-12 my-4 ml-2">
                                        <v-card-text >
                                            <p class="font-weight-normal h6">{{ $t('checkout.notSelectedDeliveryAddress') }} <v-icon :icon="mdiEmoticonSadOutline" size="24"></v-icon></p>
                                        </v-card-text>
                                    </v-card>
                                   
                                </div>
                                <p class="font-weight-light h4">{{ $t('checkout.selectedBillingAddress') }} </p>
                                <div v-if="checkBillingAddressSelected">
                                    <v-card class="bg-grey-darken-3 elevation-12 my-4 ml-2">
                                        <v-card-title>
                                            <div >
                                                <span>{{ billingUserAddress.aliasDto }}<v-icon class="mx-2" :icon="mdiFileDocumentPlusOutline" size="24"> </v-icon></span>
                                            </div>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text >
                                            <v-row>
                                                <v-col cols="12">
                                                    <p  class="font-weight-normal h6">{{ $t('profile.county') }} : {{ billingUserAddress.judetDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.city') }} : {{ billingUserAddress.orasDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.postalCode') }} : {{ billingUserAddress.codPostalDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.Cif') }} : {{ billingUserAddress.cifDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.firmName') }} : {{ billingUserAddress.numeFirmaDto }}</p>
                                                </v-col>
                                                <v-col cols="12" >
                                                    <p  class="font-weight-normal h6" v-if="billingUserAddress.blocDto !== null">{{ $t('profile.building') }} : {{ billingUserAddress.blocDto }}</p>
                                                    <p  class="font-weight-normal h6" v-if="billingUserAddress.nrBlocDto !== null">{{ $t('profile.buildingNumber') }} : {{ billingUserAddress.nrBlocDto }}</p>
                                                    <p  class="font-weight-normal h6">{{ $t('profile.street') }} : {{ billingUserAddress.stradaDto }}</p>
                                                    <p  class="font-weight-normal h6" >{{ $t('profile.streetNumber') }} : {{ billingUserAddress.nrStradaDto }}</p>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                   
                                </div>
                                <div v-else>
                                    <v-card class="bg-grey-lighten-2 elevation-12 my-4 ml-2">
                                        <v-card-text >
                                            <p class="font-weight-normal h6">{{ $t('checkout.notSelectedBillingAddress') }} <v-icon :icon="mdiEmoticonSadOutline" size="24"></v-icon></p>
                                        </v-card-text>
                                    </v-card>
                                   
                                </div>
                            </div>
                        </v-col>
                        
                        <v-divider></v-divider>
                       
                        <v-col  cols="12" md="12" sm="12" class="mt-4">
                            <v-btn class="rounded-xl elevation-12 bg-primary" @click="orderPayment">
                                {{ currentCurrency === 'RON' ? 'Plateste' : "Pay" }} <v-icon :icon="mdiArrowRight" size="24"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    
                </v-card-text>
                </v-card>
                
            </div>
        </v-sheet>
    </div>
</template>

<script setup>
import productService from '~/services/Products';
import orderService from '~/services/Order';
import userService from '~/services/User'
import { useDisplay } from 'vuetify';
import { mdiArrowLeft, mdiArrowRight, mdiCheck, mdiClose, mdiEmoticonSadOutline, mdiFileDocumentPlusOutline, mdiInformation, mdiMapMarkerOutline } from '@mdi/js';


definePageMeta({
  title : 'Finalizare cumparaturi',
  layout: 'default',
  keywords:'finalizare cumparaturi , plata , finish shopping , payment',
  siteName : 'Texx - Finalizare cumparaturi',
  canonicalUrl : 'http://localhost:3000/user/checkout',
  ogType : 'website',
  middleware: ['locale'],
  ogDescription : 'Finalizare cumparaturi pe Texx',
  description : 'Finalizare cumparaturi pe Texx'
})

useHead({
    title : 'Finalizare cumparaturi'
})

const {t} = useI18n();
const userData = ref({
  nume: '',
  prenume: '',
  nrTelefon: '',
  email: '',
})

const deliveryUserAddress = ref({
  aliasDto: '',
  blocDto: '',
  nrBlocDto: '',
  stradaDto: '',
  nrStradaDto: '',
  orasDto: '',
  judetDto: '',
  codPostalDto: '',
  cifDto: '',
  numeFirmaDto: ''
})
const billingUserAddress = ref({
  aliasDto: '',
  blocDto: '',
  nrBlocDto: '',
  stradaDto: '',
  nrStradaDto: '',
  orasDto: '',
  judetDto: '',
  codPostalDto: '',
  cifDto: '',
  numeFirmaDto: ''
})


const selectedPaymentMethod = ref({
    id: 1,
    name: t('checkout.tableRows.cashOnDelivery'),
    price: 2.00,
    dbName : "Ramburs"
})
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const currentCurrency = useState('selectedCurrency')
const stepValue = ref(0)
const stepValueSet = ref(0)
const sameDeliveryAndBilling = ref(true)
const deliveryAndBillingForm = ref(null)
const deliveryAddressForm = ref(null)
const billingAddressForm = ref(null)
const userInfoForm = ref(null)
const billingAddressSelected = ref(false)
const deliveryAddressSelected = ref(false)
const personalDetailsSelected = ref(false)
const discountCode = ref('')
const discountCodeProperties = ref({
    codVoucherDto: '',
    dataExpirareDto: null,
    reducereDto : 0,
})
// voucher Alerts
const voucherApplied = ref(false)
// v-dialog
const dialogControl = ref(true) 
const {name} = useDisplay()
const swal = useNuxtApp().$swal

const localePath = useLocalePath();
const syncedItems = ref({
    items : [],
    modifiedCartItems : [],
    pretTotal : 0,
    totalProduse : 0,
    clientsDeliveryAddresses : [],
    clientsBillingAddresses : [],
    userOrderDetails : {},
    isLoggedIn : false
})
const generalSettings = ref({})
const tableHeaders = ref([
    t('checkout.tableHeaders.paymentMethod'),
    t('checkout.tableHeaders.cost'),
    t('checkout.tableHeaders.select')
])



const tableRows = ref([
    {id:1,name: t('checkout.tableRows.cashOnDelivery'), price: 2.00 , dbName : "Ramburs"},
    {id:2,name: t('checkout.tableRows.card') , price: 0.00 , dbName : "Card"},

])
const validationRules = {
  required: v => !!v || t('textFieldsMessages.requiredRule'),
  maxLength: (length) => v => !v || v.length <= length || `${t('textFieldsMessages.maxLength')} ${length}`,
  onlyLetters: value => (!!value && lettersRegex.test(value)) || t('textFieldsMessages.onlyLetters'),
  exactLength: (length) => v => !v || v.length == length || `${t('textFieldsMessages.exactLength')} ${length}`,
  email: value => (!!value && emailRegex.test(String(value))) || t('textFieldsMessages.email'),
  onlyNumbers: v => /^[0-9]+$/.test(v) || t('textFieldsMessages.onlyNumbers'),
  checkAliasUsed: (addressType) => (v) => checkIsAliasUsed(v, addressType) || t('profile.useAnotherAlias')
};
const lettersRegex = /^[a-zA-Z]+$/;

// Form structure
const userForm = [
  {
    label: t("profile.personalDataGeneral.name"),
    placeholder: 'Numele de familie',
    type: 'text',
    model: 'nume',
    maxLen: 10,
    rules: [validationRules.onlyLetters, validationRules.maxLength(10)]
  },
  {
    label: t("profile.personalDataGeneral.prename"),
    placeholder: '',
    type: 'text',
    model: 'prenume',
    maxLen: 20,
    rules: [validationRules.onlyLetters, validationRules.maxLength(20)]
  },
  {
    label: t("profile.personalDataGeneral.number"),
    placeholder: 'ex 07xxxxxxxx',
    type: 'text',
    model: 'nrTelefon',
    maxLen: 10,
    rules: [validationRules.onlyNumbers, validationRules.maxLength(10)]
  },
  {
    label: t("profile.personalDataGeneral.email"),
    placeholder: '',
    type: 'text',
    model: 'email',
    maxLen: 50,
    rules: [validationRules.email, validationRules.maxLength(50)] // No async rule here
  },
];

const checkIsAliasUsed = (alias, addressType) => {
  if (!alias) return false; // Prevent checking empty alias

  if (addressType === 'billing' && !deliveryAddressSelected.value) {
    return !syncedItems.value.clientsBillingAddresses.some(address => address.aliasDto === alias);
  }
  
  if (addressType === 'delivery' && !billingAddressSelected.value) {
    return !syncedItems.value.clientsDeliveryAddresses.some(address => address.aliasDto === alias);
  }
  
  return true;
};


// dataForm definition
const dataForm = (addressType) => [
  {
    label: 'Alias',
    placeholder: '',
    type: 'text',
    model: 'aliasDto',
    rules: [validationRules.required, validationRules.maxLength(20),validationRules.checkAliasUsed(addressType)],
    counter: 20
  },
  {
    label: t('profile.building'),
    placeholder: '',
    type: 'text',
    model: 'blocDto',
    rules: [validationRules.maxLength(10)],
    counter: 10
  },
  {
    label: t('profile.buildingNumber'),
    placeholder: '',
    type: 'text',
    model: 'nrBlocDto',
    rules: [validationRules.maxLength(7)],
    counter: 7
  },
  {
    label: t('profile.street'),
    placeholder: '',
    type: 'text',
    model: 'stradaDto',
    rules: [validationRules.required, validationRules.maxLength(30)],
    counter: 30
  },
  {
    label: t('profile.streetNumber'),
    placeholder: '',
    type: 'text',
    model: 'nrStradaDto',
    rules: [validationRules.required, validationRules.maxLength(5)],
    counter: 5
  },
  {
    label: t('profile.city'),
    placeholder: '',
    type: 'text',
    model: 'orasDto',
    rules: [validationRules.required, validationRules.maxLength(20)],
    counter: 20
  },
  {
    label: t('profile.county'),
    placeholder: '',
    type: 'text',
    model: 'judetDto',
    rules: [validationRules.required, validationRules.maxLength(15)],
    counter: 15
  },
  {
    label: t('profile.postalCode'),
    placeholder: '',
    type: 'text',
    model: 'codPostalDto',
    rules: [validationRules.required, validationRules.exactLength(6), validationRules.onlyNumbers],
    counter: 6
  },
  {
    label: t('profile.Cif'),
    placeholder: '',
    type: 'text',
    model: 'cifDto',
    rules: [validationRules.required, validationRules.onlyNumbers,validationRules.maxLength(13)],
    counter: 13
  },
  {
    label: t('profile.firmName'),
    placeholder: '',
    type: 'text',
    model: 'numeFirmaDto',
    rules: [validationRules.required, validationRules.maxLength(50)],
    counter: 50
  }
];

const screenSize = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return false
    }
})

const filteredDataForm = (addressType) => computed(() => {
  return dataForm(addressType).filter(field => {
    if (addressType === 'delivery' && (field.model === 'cifDto' || field.model === 'numeFirmaDto')) {
      return false; // Remove company-related fields for delivery
    }
    return true;
  });
});



const dimensionsForImage = computed(() => {
    switch (name.value){
        case 'xs': return {width : 125 , height : 125}
        case 'sm' : return {width : 140 , height : 140}
        case 'md' : return {width : 250 , height : 250}
        default : return {width : 250 , height : 250}
    }
})

const dimensionsForImageDialog = computed(() => {
    switch (name.value){
        case 'xs': return {width : 125 , height : 125}
        case 'sm' : return {width : 140 , height : 140}
        case 'md' : return {width : 200 , height : 200}
        default : return {width : 200 , height : 200}
    }
})


const checkDeliveryAddressSelected = computed(() => {
    return deliveryUserAddress.value.aliasDto !== '' &&
           deliveryUserAddress.value.codPostalDto !== '' &&
           deliveryUserAddress.value.judetDto !== '' &&
           deliveryUserAddress.value.nrStradaDto !== '' &&
           deliveryUserAddress.value.orasDto !== '' &&
           deliveryUserAddress.value.stradaDto !== ''
})

const checkBillingAddressSelected = computed(() => {
    return billingUserAddress.value.aliasDto !== '' &&
           billingUserAddress.value.codPostalDto !== '' &&
           billingUserAddress.value.judetDto !== '' &&
           billingUserAddress.value.nrStradaDto !== '' &&
           billingUserAddress.value.orasDto !== '' &&
           billingUserAddress.value.stradaDto !== '' &&
           billingUserAddress.value.cifDto !== '' &&
           billingUserAddress.value.numeFirmaDto !== ''
})

const checkCompletedPersonalAccountDetails = computed(() => {
    if(syncedItems.value.userOrderDetails){
        return syncedItems.value.userOrderDetails.nume !== null
            && syncedItems.value.userOrderDetails.prenume !== null
            && syncedItems.value.userOrderDetails.nrTelefon !== null
    }
   
})

const clearOrSelectUserDetails = () => {
    // Toggle the value
    if (personalDetailsSelected.value === false) {
        // Clear user details
        userData.value.email = '';
        userData.value.nume = '';
        userData.value.prenume = '';
        userData.value.nrTelefon = '';
    } else {
        // Sync user details
        userData.value = { ...syncedItems.value.userOrderDetails };
    }
};

const assignDeliveryUserAddress = async (deliveryAddress) => {
    deliveryAddressSelected.value = !deliveryAddressSelected.value
    if(deliveryAddressSelected.value){
        deliveryUserAddress.value = {...deliveryAddress}
    }else{
        deliveryUserAddress.value.aliasDto = '' 
        deliveryUserAddress.value.codPostalDto = '' 
        deliveryUserAddress.value.judetDto = '' 
        deliveryUserAddress.value.nrStradaDto = '' 
        deliveryUserAddress.value.orasDto = '' 
        deliveryUserAddress.value.stradaDto = ''
        deliveryUserAddress.value.blocDto = ''
        deliveryUserAddress.value.nrBlocDto = ''
    }

   
    
}

const assignBillingUserAddress = async (billingAddress) => {
    billingAddressSelected.value = !billingAddressSelected.value
    if(billingAddressSelected.value){
        billingUserAddress.value = {...billingAddress}
    }else{
        billingUserAddress.value.aliasDto = '' 
        billingUserAddress.value.codPostalDto = '' 
        billingUserAddress.value.judetDto = '' 
        billingUserAddress.value.nrStradaDto = '' 
        billingUserAddress.value.orasDto = '' 
        billingUserAddress.value.stradaDto = ''
        billingUserAddress.value.blocDto = ''
        billingUserAddress.value.nrBlocDto = ''
        billingUserAddress.value.cifDto = ''
        billingUserAddress.value.numeFirmaDto = ''
       
    }

   
}


const computedCheckVoucherApplied = computed(() => {
    return discountCodeProperties.value.codVoucherDto !== ''
        && discountCodeProperties.value.dataExpirareDto !== null
        && discountCodeProperties.value.reducereDto !== 0
        && voucherApplied.value !== false

})


const orderPayment = (async () => {
    swal.fire({
            icon: 'info',
            title: 'Loading...',
            text: t('sweetAlert2.Wait'),
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                swal.showLoading();
            },
        });
    var isOrderDetailsFormValidBoolean = false;
    var isDeliveryAddressDetailsFormValidBoolean = false;
    var isBillingAddressDetailsFormValidBoolean = false;
    var isBillingAndDeliveryAddressDetailsFormValidBoolean = false;

    // order details validation
    const isOrderDetailsFormValidObj = await userInfoForm.value.validate()
    isOrderDetailsFormValidBoolean = isOrderDetailsFormValidObj.valid
    //
   
    if(sameDeliveryAndBilling.value === true){
        // same delivery and billing details validation
        if(checkDeliveryAddressSelected.value === false){
            const isBillingAndDeliveryAddressDetailsFormValidObj= await deliveryAndBillingForm.value.validate()
            isBillingAndDeliveryAddressDetailsFormValidBoolean = isBillingAndDeliveryAddressDetailsFormValidObj.valid
        }else{
            isBillingAndDeliveryAddressDetailsFormValidBoolean = true;
        }
       
        
    }else{
        // delivery validation
        if(checkDeliveryAddressSelected.value === false){
            const isDeliveryAddressDetailsFormValidObj = await  deliveryAddressForm.value.validate()
            isDeliveryAddressDetailsFormValidBoolean = isDeliveryAddressDetailsFormValidObj.valid
        }else{
            isDeliveryAddressDetailsFormValidBoolean = true;
        }
     

        // billing validation
        if(checkBillingAddressSelected.value === false){
            const isBillingAddressDetailsFormValidObj = await billingAddressForm.value.validate()
            isBillingAddressDetailsFormValidBoolean = isBillingAddressDetailsFormValidObj.valid
        }else{
            isBillingAddressDetailsFormValidBoolean = true;
        }
      
        //

    }

    if(sameDeliveryAndBilling.value === true){
        billingUserAddress.value = {...deliveryUserAddress.value}
    }

    

    if(isOrderDetailsFormValidBoolean){
        if(sameDeliveryAndBilling.value === true){
            if(isBillingAndDeliveryAddressDetailsFormValidBoolean){
                let intMinOrderForFreeDelivery = parseInt(generalSettings.value.pret_comanda_minima)
                intMinOrderForFreeDelivery = currentCurrency.value === "RON" ? intMinOrderForFreeDelivery : Math.round(intMinOrderForFreeDelivery / 5);
                const paymentObj = {
                    tipPlata :  selectedPaymentMethod.value.dbName,
                    pretTransport  : currentCurrency.value === "RON"
                         ? syncedItems.value.pretTotal > intMinOrderForFreeDelivery ? 0 : 17
                         : syncedItems.value.pretTotal > intMinOrderForFreeDelivery ? 0 : Math.round(17 / 5),
                    pretTotal : syncedItems.value.pretTotal,
                    numePeComanda :  userData.value.nume,
                    prenumePeComanda  : userData.value.prenume,
                    nrTelefonPeComanda : userData.value.nrTelefon, 
                    emailPeComanda  : userData.value.email,
                    voucherAplicat : computedCheckVoucherApplied.value === true ? {...discountCodeProperties.value} : null,
                    adresaLivrare  : deliveryUserAddress.value,
                    adresaFacturare : sameDeliveryAndBilling.value === true ? deliveryUserAddress.value : billingUserAddress.value
                }
                
                const form = new FormData()
                form.append('orderDto' , JSON.stringify(paymentObj))
                const responseFromPayment = await orderService.placeOrder(currentCurrency.value , form)
                swal.close()
                if(responseFromPayment.status === 200){
                    let getTokenAndOrderId = responseFromPayment.message.split(' ')[1];
                    const orderId = getTokenAndOrderId.split('|')[1]
                    const orderConfirmationToken = getTokenAndOrderId.split('|')[0]
                    await navigateTo(localePath({
                        path: `/user/order/${orderConfirmationToken}`,
                        query: { i : orderId }
                    }));
                }else if(responseFromPayment.status === 400 && responseFromPayment.message === "Voucher not found"){
                    fireAlarm('top-end' , 'error' , t('sweetAlert2.Error') , t('sweetAlert2.ExpiredOrInvalidVoucher') , 5000)
                    voucherApplied.value = false;
                    discountCode.value = ''
                    discountCodeProperties.value.codVoucherDto = ''
                    discountCodeProperties.value.dataExpirareDto = null
                    discountCodeProperties.value.reducereDto = 0
                    return
                }else if(responseFromPayment.status === 204){
                    fireAlarm('top-end' , 'error' , t('sweetAlert2.Error') , t('sweetAlert2.PaymentRejected') , 5000)
                    return
                }
            }else{
                fireAlarm('top-end' , 'error' , 'Error' , t('sweetAlert2.CheckDeliveryAndBillingAddress') , 3000)
                return
            }
        }else{
            if(isDeliveryAddressDetailsFormValidBoolean){
                if(isBillingAddressDetailsFormValidBoolean){
                    // proceed with payment
                }else{
                    fireAlarm('top-end' , 'error' , 'Error' , t('sweetAlert2.CheckBillingAddress') , 3000)
                    return
                }
            }else{
                fireAlarm('top-end' , 'error' , 'Error' , t('sweetAlert2.CheckDeliveryAddress') , 3000)
                return
            }
        }
    }else{
        fireAlarm('top-end' , 'error' , 'Error' , t('sweetAlert2.CheckOrderDetailsForm') , 3000)
        return
    }
})


const applyCoupon = (async () => {
    const isOrderDetailsFormValid = await userInfoForm.value.validate()
    if(isOrderDetailsFormValid.valid){
        const dataToSend = {
            email : userData.value.email,
            voucherCode : discountCode.value
        }
        const responseFromVoucherApi = await productService.applyVoucherCode(dataToSend)
        console.log(responseFromVoucherApi)
        if(responseFromVoucherApi.status === 200){
            discountCodeProperties.value = responseFromVoucherApi.message
            voucherApplied.value = true;
        }else if(responseFromVoucherApi.status === 404){
            fireAlarm('top-end' , 'error' , 'Error' , t('sweetAlert2.ExpiredOrInvalidVoucher') , 3000)
            voucherApplied.value = false;
            return
        }else if(responseFromVoucherApi.status === 400){
            fireAlarm('top-end' , 'error' , 'Error' , t('sweetAlert2.AlreadyUsedVoucher') , 3000)
            voucherApplied.value = false;
            return
        }else {
            fireAlarm('top-end' , 'error' , 'Error' , 'Server error.Try again later' , 3000)
            voucherApplied.value = false;
            return
        }
    }else{
        fireAlarm('top-end' , 'error' , 'Error' , t('sweetAlert2.CheckOrderDetailsForm') , 3000)
        voucherApplied.value = false;
        return;
    }
    
})

const deleteCoupon = ( () => {
    discountCodeProperties.value.codVoucherDto = ''
    discountCodeProperties.value.dataExpirareDto = null
    discountCodeProperties.value.reducereDto = 0
    discountCode.value = ''
    voucherApplied.value = false;

})

const syncCartOnCheckout = ( async () => {
    const response = await productService.syncCartOnCheckout(currentCurrency.value);
    console.log(response)

    if(response === -2){
        fireAlarm('top-end' , 'error' , "Error" ,t('checkout.fetchError') , 4000);
        dialogControl.value = true;
        // setTimeout(() => {
        //     navigateTo(localePath('/cart'));
        // }, 4000);
    }else if(response === -4){
        fireAlarm('top-end' , 'error' , "Error" ,t('checkout.emptyCart') , 4000);
        setTimeout(() => {
            navigateTo(localePath('/cart'));
        }, 4000);
    }

    syncedItems.value = response
    

})

const checkKey = ((key) => {
    const parsed = parseInt(key, 10); 
    return !isNaN(parsed) && String(parsed) === key; 
});

const checkProductType = ((type) => {
    return type === 'perdea' ||  type === 'draperie'
})

const getFirstImageFromSet = ((productsInSet) => {
    return productsInSet.find(p => p.culoareSelectata.imaginiProdusDto.length > 0)?.culoareSelectata.imaginiProdusDto[0].presignedUrl;
})

function fireAlarm(position , icon , title ,text, timer){
    swal.fire({
        position: position,
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: timer
    });
}

const getMinOrderPrice = (async () => {
    const response = await userService.getGeneralSettingsData();
    generalSettings.value = response
    console.log(generalSettings.value)
})


onMounted(async () => {
    await syncCartOnCheckout()
    await getMinOrderPrice()
})
</script>