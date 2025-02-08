<template>
    <div class="h-100 pb-4 ">
        <!-- DE TEST METODELE DE ADD / DECREMENT / ELIMINARE + DE VAZUT PE LOGAT SAU / LOG OUT CLIENT functiile  -->
        <v-snackbar class="text-center"
            v-model="incremented"
            :timeout="2000"
            color="green"
            rounded="pill"
            location="bottom"
        >
            <v-icon color="white">mdi-check</v-icon> {{ $t('cart.quantityIncremented') }}
        </v-snackbar>
        <v-snackbar  class="text-center"
            v-model="decremented"
            :timeout="2000"
            color="red"
            rounded="pill"
            location="bottom"
        >
            <v-icon color="white">mdi-check</v-icon>  {{ $t('cart.quantityDecremented') }}
        </v-snackbar>
        <v-snackbar  class="text-center"
            v-model="deletedSuccesfully"
            :timeout="2000"
            color="red"
            rounded="pill"
            location="bottom"
        >
            <v-icon color="white">mdi-check</v-icon>  {{ $t('cart.deletedSuccesfully') }}
        </v-snackbar>
        <v-sheet color="grey-lighten-2" elevation="12" class="p-2 m-2 h-100 text-center">
            
            <v-container fluid class="text-center">
                <p class="font-weight-light h5">{{ $t('cart.title') }}</p>
                <!-- <v-divider v-if="itemsInCart&&itemsInCart.totalProduse > 0"></v-divider> -->
                <v-container fluid v-if="itemsInCart&&itemsInCart.totalProduse <= 0" class="w-75 ">
                    <v-card class=" bg-grey-lighten-3  w-100 ">
                        <v-card-text>
                            <p class="font-weight-light h5 text-center my-2">{{ $t('cart.empty') }}</p>
                            <p><v-icon>mdi-emoticon-sad</v-icon></p>
                        </v-card-text>
                    </v-card>
                </v-container>
            </v-container>
            <div fluid v-if="isMounted && itemsInCart && itemsInCart.totalProduse > 0">
                <v-row  v-for="(product,index) in itemsInCart.items"
                    :key="index">
                    <v-col cols="12">
                        <v-card class="elevation-12 p-2 h-100">
                            <v-row>
                                <v-col cols="5" v-if="checkKey(product.key)" >
                                    <v-row no-gutters>
                                        <v-col cols="12" >
                                            <NuxtImg preload
                                             v-if="product.cartItems[0].culoareSelectata&&product.cartItems[0].culoareSelectata.imaginiProdusDto[0] !== undefined&&product.cartItems[0].culoareSelectata.imaginiProdusDto[0].presignedUrl !== 'empty'"
                                                :src="product.cartItems[0].culoareSelectata.imaginiProdusDto[0].presignedUrl"
                                                fit="cover"
                                                sizes="sm:400 md:800"
                                                :width="dimensionsForImage.width"
                                                :height="dimensionsForImage.height"
                                                class="border-sm" >
                                            </NuxtImg>
                                            <NuxtImg v-else preload
                                                src="notFound.png"
                                                fit="cover"
                                                sizes="sm:400 md:800"
                                                :width="dimensionsForImage.width"
                                                :height="dimensionsForImage.height"
                                                class="border-sm" >
                                            </NuxtImg>
                                        </v-col>
                                    </v-row>
                        
                                </v-col>
                                <v-col cols="12" v-else>
                                    <v-row no-gutters>
                                        <v-col cols="12" class="p-2">
                                            <NuxtImg preload
                                             v-if="product.cartItems && product.cartItems.length > 1 && getFirstImageFromSet(product.cartItems)"
                                                :src="getFirstImageFromSet(product.cartItems)"
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
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col  cols="7" class="text-justify" v-if="checkKey(product.key)">
                                    <div class="my-2 ">
                                        <span class="font-weight-light text-h6">{{ product.cartItems[0].numeProdus }}</span>
                                        <p class="font-weight-light text-subtitle-2">{{ product.cartItems[0].tipProdus }}</p>
                                        <v-divider  v-if="screenSize === false"></v-divider>
                                        <div v-if="screenSize === true">
                                            <v-divider></v-divider>
                                            <p  class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                            <p  class="font-weight-light h6 text-subtitle-1">{{  product.cartItems[0].culoareSelectata.numeCuloareDto }}</p>
                                        </div>
                                       

                                        <div v-if="screenSize === false">
                                            
                                            <p class="font-weight-light h5">{{ $t('shop.color') }}</p>
                                            <p class="font-weight-light h6  text-subtitle-1">{{  product.cartItems[0].culoareSelectata.numeCuloareDto }}</p>
                                            
                                        </div>
                                        
                                        <div v-if="checkProductType(product.cartItems[0].tipProdus) &&product.cartItems[0].dimensiuneSelectata.perdeaEstePerecheDto === null && screenSize === false && product.cartItems[0].lungimeCeruta !== 'empty'">
                                            <v-divider></v-divider>
                                            <p class="font-weight-light h5">{{ $t('cart.material') }} </p>
                                            <p class="font-weight-light h6 text-subtitle-1"> {{ product.cartItems[0].lungimeCeruta }} {{$t('shopSeturi.meter')}}</p>
                                        </div>
                                        <div v-if="screenSize === false">
                                            <v-divider></v-divider>
                                            <div>
                                                <p class="font-weight-light h5">{{ $t('cart.dimensions') }}</p>
                                                <p class="font-weight-light h6 text-subtitle-1"> {{checkProductType(product.cartItems[0].tipProdus) ?  $t('shop.curtain.railwayWidth')  :  $t('shop.width')  }}  : {{ product.cartItems[0].dimensiuneSelectata.lungimeDto  }} cm</p>
                                                <p class="font-weight-light h6 text-subtitle-1">{{ checkProductType(product.cartItems[0].tipProdus) ? $t('shop.height') :  $t('cart.widthNotForCurtains')}} : {{  product.cartItems[0].dimensiuneSelectata.latimeDto ?  product.cartItems[0].dimensiuneSelectata.latimeDto : 'N/A'  }} cm</p>
                                            </div>
                                            <v-divider></v-divider>
                                            <p class="font-weight-light h5">{{ $t('cart.quantity') }}</p>
                                            <v-text-field class="ma-4 centered-input"
                                                density="compact" 
                                                variant="outlined"
                                                color="primary"
                                                append-icon="mdi-plus"
                                                :prepend-icon="product.cartItems[0].cantitate > 1 ?  'mdi-minus' : ''"
                                                readonly
                                                v-model="product.cartItems[0].cantitate"
                                                @click:append="modifyQuantity(false,product)"
                                                @click:prepend="modifyQuantity(true,product)"
                                            >
                                                
                                            </v-text-field>
                                            <v-btn color="red-darken-3" @click="deleteItemFromCart(product)">{{ $t('button.delete') }}<v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" v-if="!checkKey(product.key)">
                                    <p class="font-weight-light h5">{{ $t('cart.setName') }} {{ product.cartItems[0].numeSet }}</p>
                                    <v-expansion-panels>
                                        <!-- AM RAMAS AICI iN JOS -->
                                            <v-expansion-panel v-for="(productInSet,index) in product.cartItems"
                                            :key="index"  class="my-2" color="grey-lighten-3" elevation="12">
                                            <v-expansion-panel-title>
                                                {{ productInSet.numeProdus }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
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
                                                                        Next<v-icon>mdi-arrow-right</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <template v-slot:prev="{props}">
                                                                    <v-btn variant="outlined" color="error" class="ma-1"
                                                                    v-bind="props" @click="stepValueSet--">
                                                                    Prev<v-icon>mdi-arrow-left</v-icon>
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
                                    <!-- AICI E SET !!! -->
                                    <div class="mt-4">
                                        <p class="font-weight-light h5">{{ $t('cart.quantity') }}</p>
                                        <v-text-field class="ma-4 centered-input"
                                            density="compact" 
                                            variant="outlined"
                                            color="primary"
                                            append-icon="mdi-plus"
                                            :prepend-icon="product.cartItems[0].cantitate > 1 ?  'mdi-minus' : ''"
                                            readonly
                                            v-model="product.cartItems[0].cantitate"
                                            @click:append="modifyQuantity(false,product)"
                                            @click:prepend="modifyQuantity(true,product)"
                                          >
                                            
                                        </v-text-field>
                                        <v-btn color="red-darken-3" @click="deleteItemFromCart(product)">{{ $t('button.delete') }}<v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                    </div>
                                    <v-divider></v-divider>
                                </v-col>
                                <v-col cols="12" v-if="checkKey(product.key) &&  screenSize === true && checkProductType(product.cartItems[0].tipProdus)">
                                    <v-divider></v-divider>
                                    <p class="font-weight-light h5">{{ $t('cart.material') }} </p>
                                    <p class="font-weight-light h6 text-subtitle-1"> {{ product.cartItems[0].selectedManopera.metruTotalFolosit  }} {{ $t('shopSeturi.meter') }}</p>
                                </v-col>
                                <v-col class="text-center" cols="12" v-if="checkKey(product.key)&&(product.cartItems[0].dimensiuneSelectata.perdeaEstePerecheDto === true 
                                || product.cartItems[0].dimensiuneSelectata.perdeaEstePerecheDto === false 
                                || product.cartItems[0].dimensiuneSelectata.perdeaEstePerecheDto === null)
                                 && screenSize === true">
                                    <v-divider></v-divider>
                                    <p class="font-weight-light h5">{{ $t('cart.dimensions') }}</p>
                                    <p class="font-weight-light h6 text-subtitle-1"> {{checkProductType(product.cartItems[0].tipProdus) ?  $t('shop.curtain.railwayWidth')  :  $t('shop.width')  }}  : {{ product.cartItems[0].dimensiuneSelectata.lungimeDto  }} cm</p>
                                    <p class="font-weight-light h6 text-subtitle-1">{{ checkProductType(product.cartItems[0].tipProdus) ? $t('shop.height') :  $t('cart.widthNotForCurtains')}} : {{  product.cartItems[0].dimensiuneSelectata.latimeDto ?  product.cartItems[0].dimensiuneSelectata.latimeDto : 'N/A'  }} cm</p>
                                </v-col>

                                <v-col v-if="checkKey(product.key) && screenSize === true" cols="12" class="text-center">
                                    <v-divider></v-divider>
                                    <p class="font-weight-light h5">{{ $t('cart.quantity') }}</p>
                                    <v-text-field class="ma-4 centered-input"
                                                density="compact" 
                                                variant="outlined"
                                                color="primary"
                                                append-icon="mdi-plus"
                                                :prepend-icon="product.cartItems[0].cantitate > 1 ?  'mdi-minus' : ''"
                                                readonly
                                                v-model="product.cartItems[0].cantitate"
                                                @click:append="modifyQuantity(false,product)"
                                                @click:prepend="modifyQuantity(true,product)"
                                            >
                                                
                                            </v-text-field>
                                    <v-btn color="red-darken-3" @click="deleteItemFromCart(product)">{{ $t('button.delete') }}<v-icon>mdi-trash-can-outline</v-icon></v-btn>

                                </v-col>
                               
                                <v-col v-if="checkKey(product.key)&&product.cartItems[0].selectedManopera !== null && product.cartItems[0].selectedManopera.numeManopera !== 'STAN'" class="text-center">
                                    <v-divider></v-divider>
                                    <p class="font-weight-light h5">{{ $t('cart.titles.manopera') }}</p>
                                    <v-stepper v-if="checkKey(product.key)" elevation="12" class="my-2"
                                    :mobile="screenSize === true"
                                    v-model="stepValue" >
                                        <v-stepper-header >
                                            <v-stepper-item
                                                :title="$t('cart.titles.manopera')"
                                                value="1">
                                            </v-stepper-item>
                                            <v-divider></v-divider>
                                            <v-stepper-item v-if="product.cartItems[0].selectedManopera.tipGalerie&&product.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele"
                                                :title="$t('cart.titles.ring')"
                                                value="2">
                                            </v-stepper-item>
                                            <v-divider  v-if="product.cartItems[0].selectedManopera.tipGalerie&&product.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele"></v-divider>
                                            <v-stepper-item
                                                :title="$t('cart.titles.line')"
                                                :value="product.cartItems[0].selectedManopera.tipGalerie&&product.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele ? '3' : '2' ">
                                            </v-stepper-item>
                                        </v-stepper-header>
                                        <v-stepper-window>
                                            <v-stepper-window-item value="1">
                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                    <v-card-title>
                                                        <span class="font-weight-light h5">{{ $t('cart.titles.manopera') }} </span>
                                                    </v-card-title>
                                                    <v-card-text >
                                                        
                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} {{ product.cartItems[0].selectedManopera.tipGalerie.numeTipRejansa  }}</p>
                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} {{ product.cartItems[0].selectedManopera.tipGalerie.incretireRejansa  }}</p>
                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }} {{ product.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu'  }}</p>
                                                        <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{ product.cartItems[0].selectedManopera.tipGalerie.pretTipRejansa }}  {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                                                        <NuxtImg preload
                                                        :src="product.cartItems[0].selectedManopera.tipGalerie.presignedUrl"
                                                        :width="dimensionsForImage.width"
                                                        :height="dimensionsForImage.height">
                                                        >

                                                        </NuxtImg>
                                                    </v-card-text>
                                                </v-card>
                                            </v-stepper-window-item>
                                            <v-stepper-window-item v-if="checkKey(product.key)&&product.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true" value="2">
                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                    <v-card-title>
                                                        <span class="font-weight-light h5">{{ $t('cart.titles.ring') }} </span>
                                                    </v-card-title>
                                                    <v-card-text >
                                                        <p class="font-weight-light h6">{{ $t('shop.color') }} : {{ product.cartItems[0].selectedManopera.tipInel.numeTipInel  }}</p>
                                                        <NuxtImg preload
                                                        :src="product.cartItems[0].selectedManopera.tipInel.presignedUrl"
                                                        :width="dimensionsForImage.width"
                                                        :height="dimensionsForImage.height">
                                                        >

                                                        </NuxtImg>
                                                    </v-card-text>
                                                </v-card>
                                            </v-stepper-window-item>
                                            <v-stepper-window-item :value="product.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? '3' : '2'">
                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                    <v-card-title>
                                                        <span class="font-weight-light h5">{{ $t('cart.titles.line') }}</span>
                                                    </v-card-title>
                                                    <v-card-text >
                                                        <p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.name') }} : {{ product.cartItems[0].selectedManopera.tipLinie.numeTipCusaturaColt  }}</p>
                                                        <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{  product.cartItems[0].selectedManopera.tipLinie.pretTipCusaturaColt }}  {{ currentCurrency === 'RON' ? 'RON' : 'EUR'}} </p>                                                          
                                                        <NuxtImg preload
                                                        :src="product.cartItems[0].selectedManopera.tipLinie.presignedUrl"
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
                                                        Next<v-icon>mdi-arrow-right</v-icon>
                                                    </v-btn>
                                                </template>
                                                <template v-slot:prev="{props}">
                                                    <v-btn variant="outlined" color="error" class="ma-1"
                                                    v-bind="props" @click="stepValue--">
                                                       Prev<v-icon>mdi-arrow-left</v-icon>
                                                    </v-btn>
                                                </template>
                                            </v-stepper-actions>
                                        </v-stepper-window>
                                    </v-stepper>
                                    
                                </v-col>
                                <v-col cols="12">
                                    <div >
                                        <div >
                                        <p class="font-weight-light h5 text-center">Total : {{ product.cartItems[0].pretCurent * product.cartItems[0].cantitate }} {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                                        </div>
                                    </div>
                                </v-col>
                                
                            </v-row>
                            
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <div v-if="itemsInCart && itemsInCart.totalProduse > 0">
                <v-divider></v-divider>
                <v-card class="elevation-12 bg-grey-lighten-3 w-100 ">
                    <v-card-text>
                    
                        <p class="font-weight-light h5 text-center my-2">{{ $t('cart.totalPrice') }} <b> {{  itemsInCart.pretTotal }} {{ currentCurrency === 'RON' ? 'RON' : 'EUR' }}</b></p>
                        <v-btn variant="flat" color="black" @click="navigateTo(localPath('/user/checkout'))" >
                            {{ $t('cart.goToCheckout') }} <v-icon class="ml-1">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </div>
            
            
        </v-sheet>
        
    </div>
</template>


<script setup>
import { useDisplay } from 'vuetify';
import productService from '~/services/Products';


definePageMeta({
    middleware : ['locale']
})

const {name} = useDisplay()
const isMounted = ref(false)
const currentCurrency = useState('selectedCurrency')
const itemsInCart = ref({
    items : [],
    pretTotal : 0
})
const cartCountRef = useState("cartCountRef")
const stepValue = ref(0)
const stepValueSet = ref(0)
const incremented = ref(false)
const decremented = ref(false)
const deletedSuccesfully = ref(false)
const localPath = useLocalePath()
const {t} = useI18n();
const swal = useNuxtApp().$swal



const screenSize = computed(() => {
    switch (name.value) {
      case 'xs': return true
      case 'sm' : return true
      default : return false
    }
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


const dimensionsForImage = computed(() => {
    switch (name.value){
        case 'xs': return {width : 125 , height : 125}
        case 'sm' : return {width : 175 , height : 175}
        case 'md' : return {width : 350 , height : 350}
        default : return {width : 350 , height : 350}
    }
})

function fireAlarm(position , icon , title , timer){
    swal.fire({
        position: position,
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: timer
    });
}

const modifyQuantity = (async (isDecrementing,item) => {
    const body = {
        idProdus : item.cartItems[0].idProdus,
        idSet : item.cartItems[0].idSet !== null ? item.cartItems[0].idSet : null,
        idCuloare : item.cartItems[0].culoareSelectata.idCuloare,
        idDimensiune : item.cartItems[0].dimensiuneSelectata.idDimensiune,
        idManopera : item.cartItems[0].selectedManopera?.idManopera,
        identificatorSet : checkKey(item.key) === true ? '21' : item.key,
        isDecrementing : isDecrementing
    }
    
    const form = new FormData()
    console.log('aici')
    form.append('productData',JSON.stringify(body));
    const response = await productService.modifyQuantity(form);
    if(response === 1){
        var itemToDecrementValueIndex = itemsInCart.value.items.findIndex(prod => prod.key === item.key)
        if(isDecrementing){
            console.log(isDecrementing)
            decremented.value = true;
            setTimeout(() => {
                decremented.value = false;
            }, 2000);
            var cartCount = localStorage.getItem('cartCount')
            if(cartCount){
                var toIntCartCount = parseInt(cartCount); 
                toIntCartCount--;
                if(cartCount < 0){
                    localStorage.setItem('cartCount' , '0');
                    return;
                }
                localStorage.setItem('cartCount' , String(toIntCartCount))
                cartCountRef.value--
                itemsInCart.value.totalProduse--;
                if(itemToDecrementValueIndex !== -1){
                    if(itemsInCart.value.items[itemToDecrementValueIndex].key === 21){
                        if(itemsInCart.value.items[itemToDecrementValueIndex].cartItems[0].cantitate > 1){
                            itemsInCart.value.items[itemToDecrementValueIndex].cartItems[0].cantitate--;
                        }else{
                            itemsInCart.value.items = itemsInCart.value.items.filter(prod => prod.key !== item.identificatorSet)
                        }
                    }else{
                        if(itemsInCart.value.items[itemToDecrementValueIndex].cartItems[0].cantitate > 1){
                            itemsInCart.value.items[itemToDecrementValueIndex].cartItems.forEach(prod => {
                                prod.cantitate--;
                            })
                        }else{
                            itemsInCart.value.items = itemsInCart.value.items.splice(itemToDecrementValueIndex , 1)
                        }
                    }
                }
                itemsInCart.value.pretTotal -= item.cartItems[0].pretCurent
            }
        }else{
            incremented.value = true;
            setTimeout(() => {
                incremented.value = false;
            }, 2000);
            var cartCount = localStorage.getItem('cartCount')
            if(cartCount){
                var toIntCartCount = parseInt(cartCount); 
                toIntCartCount++;
                cartCountRef.value++
                localStorage.setItem('cartCount' , String(toIntCartCount))
                itemsInCart.value.totalProduse++;
                itemsInCart.value.pretTotal += item.cartItems[0].pretCurent
                if(itemToDecrementValueIndex !== -1){
                    if(itemsInCart.value.items[itemToDecrementValueIndex].key === 21){
                        if(itemsInCart.value.items[itemToDecrementValueIndex].cartItems[0].cantitate > 1){
                            itemsInCart.value.items[itemToDecrementValueIndex].cartItems[0].cantitate++;
                        }
                    }else{
                        itemsInCart.value.items[itemToDecrementValueIndex].cartItems.forEach(prod => {
                            prod.cantitate++;
                        })
                    }
                   
                }
            }
        }
    }else if(response === -4){
        fireAlarm('top-end' , 'error' , `${t('general.productMissing')}` , 3000)
        setTimeout(() => {
            location.reload()
        }, 2000);
    }else if(response === -2){
        fireAlarm('top-end' , 'error' , `${t('general.errorOnQuantityUpdating')}` , 3000)
    }

    
})

const deleteItemFromCart = (async (productToDelete) => {
    const body = {
        idProdus : productToDelete.cartItems[0].idProdus,
        idSet : productToDelete.cartItems[0].idSet !== null ? productToDelete.cartItems[0].idSet : null,
        idCuloare : productToDelete.cartItems[0].culoareSelectata.idCuloare,
        idDimensiune : productToDelete.cartItems[0].dimensiuneSelectata.idDimensiune,
        idManopera : productToDelete.cartItems[0].selectedManopera?.idManopera,
        identificatorSet : checkKey(productToDelete.key) === true ? '21' : productToDelete.key,
      
    }
    
    const form = new FormData()
    form.append('productData',JSON.stringify(body));
    const response = await productService.deleteItemFromCart(form);
    if(response === 1){
        var itemToDelete = itemsInCart.value.items.findIndex(prod => prod.key === productToDelete.key)
        console.log('item to delete index :' , itemToDelete)
        deletedSuccesfully.value = true;
        setTimeout(() => {
            deletedSuccesfully.value = false;
        }, 2000);
        var cartCount = localStorage.getItem('cartCount')
        if(cartCount){
            var toIntCartCount = parseInt(cartCount); 
            
            if(toIntCartCount < 0){
                localStorage.setItem('cartCount' , '0');
                toIntCartCount = parseInt(localStorage.getItem('cartCount'))
            }
            if(itemToDelete !== -1){
                toIntCartCount -=  itemsInCart.value.items[itemToDelete].cartItems[0].cantitate;
                itemsInCart.value.totalProduse -= itemsInCart.value.items[itemToDelete].cartItems[0].cantitate;
                itemsInCart.value.pretTotal -= productToDelete.cartItems[0].pretCurent * productToDelete.cartItems[0].cantitate 
                itemsInCart.value.items = itemsInCart.value.items.filter((p,index) => index !== itemToDelete)
               
            }
            localStorage.setItem('cartCount' , String(toIntCartCount))
            cartCountRef.value = toIntCartCount
        }
    }else if(response === -4){
        fireAlarm('top-end' , 'error' , `${t('general.productMissing')}` , 3000)
        setTimeout(() => {
            window.reload();
        }, 2000);
    }else if(response === -2){
        fireAlarm('top-end' , 'error' , `${t('general.errorOnDeletingProduct')}` , 3000)
    }
})



onMounted(async () => {
    isMounted.value = true
    itemsInCart.value = await productService.getCartItems(currentCurrency.value)
    localStorage.setItem('cartCount' , String(itemsInCart.value.totalProduse))
    console.log('PRODUSE',itemsInCart.value)
})


</script>


<style  scoped>
.centered-input :deep(input) {
    text-align: center
}
</style>