<template>
    <v-app>
        <AdminNavDrawerOnClient
            v-if="clientData.emailDto && encodedIdAccountDto"
            :email-dto="clientData.emailDto"
            :encoded-id-account-dto="encodedIdAccountDto"
        ></AdminNavDrawerOnClient>
        <v-main class="bg-grey-darken-3">
            <v-container fluid v-if="currentOrderData">
                <v-container class="p-2" fluid>
                    <p class="h3 font-weight-light">Comanda #{{ currentOrderData.orderId }}</p>
                    <v-alert class="text-left" type="warning" variant="tonal">
                        ATENTIE! Daca apasati pe butonul "ANULEAZA COMANDA" , comanda clientului va fi anulata
                        daca nu a fost procesata. Daca a fost procesata , butonul va fi inchis.
                    </v-alert>
                    <v-btn flat class="p-2 m-2" color="error" :disabled="!isCancelable">
                        ANULEAZA COMANDA
                    </v-btn>
                </v-container>
                <v-divider></v-divider>
                <div fluid>
                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                        <v-card-title :class="{'text-body-1' : screenSize === true}">
                            Detalii persoana <v-icon class="mx-2" :icon="mdiCardAccountDetailsOutline"></v-icon>
                        </v-card-title>
                        <v-divider></v-divider>
                        <!-- Order details (personal data) -->
                        <v-card-text >
                            <b><p class="font-weight-light h6">Nume : {{ currentOrderData.userOrderDetails.nume }}</p></b>
                            <b><p class="font-weight-light h6">Prenume : {{ currentOrderData.userOrderDetails.prenume }}</p></b>
                            <b><p class="font-weight-light h6">Nr. telefon : {{ currentOrderData.userOrderDetails.nrTelefon }}</p></b>
                            <b><p class="font-weight-light h6">E-mail : {{ currentOrderData.userOrderDetails.email }}</p></b>
                        </v-card-text>
                    </v-card>
                </div>
                <v-divider></v-divider>
                <div>
                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                            <v-card-title  :class="{'text-body-1' : screenSize === true}">
                                Detalii comanda <v-icon class="mx-2" :icon="mdiTruckCheckOutline"></v-icon>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <p class="font-weight-light h6">Numar comanda : {{ currentOrderData.orderId }}</p>
                                <p class="font-weight-light h6">Tip plata : {{ currentOrderData.orderPayment }}</p>
                                <p class="font-weight-light h6">Data emitere : {{ currentOrderData.orderDate.split('T')[0]}} - {{ currentOrderData.orderDate.split('T')[1]}}</p>
                                <p class="font-weight-light h6">AWB urmarire comanda:   {{ currentOrderData.orderTrackingString }}</p>
                                <p class="font-weight-light h6">Status comanda : {{ currentOrderData.orderStatus }}</p>
                            </v-card-text>
                            </v-card>
                    <v-divider></v-divider>
                </div>
                <div v-if=isDeliveryTheSameWithBilling>
                    <v-card class="bg-grey-darken-4 elevation-24  p-3">
                        <v-card-title  :class="{'text-body-1' : screenSize === true}">
                            {{ $t('orderHistory.orderAddress') }} <v-icon class="mx-2" :icon="mdiMapMarkerOutline"></v-icon> / <v-icon class="mx-2" :icon="mdiFileDocumentPlusOutline"></v-icon>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <b><p class="font-weight-light h6">{{ $t('profile.alias') }} : {{ currentOrderData.clientDeliveryAddress.aliasDto }}</p></b>
                            <b><p v-if="currentOrderData.clientDeliveryAddress.blocDto !== null" class="font-weight-light h6">{{ $t('profile.building') }} : {{ currentOrderData.clientDeliveryAddress.blocDto }}</p></b>
                            <b><p v-if="currentOrderData.clientDeliveryAddress.nrBlocDto !== null" class="font-weight-light h6">{{ $t('profile.buildingNumber') }} : {{ currentOrderData.clientDeliveryAddress.nrBlocDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.street') }} : {{ currentOrderData.clientDeliveryAddress.stradaDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.streetNumber') }} : {{ currentOrderData.clientDeliveryAddress.nrStradaDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.city') }} : {{ currentOrderData.clientDeliveryAddress.orasDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.county') }} : {{ currentOrderData.clientDeliveryAddress.judetDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ currentOrderData.clientDeliveryAddress.codPostalDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.addressType') }} : {{ currentOrderData.clientDeliveryAddress.tipAdresaDto }}</p></b>
                        </v-card-text>
                    </v-card>
                </div>
                <div v-else>
                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                        <v-card-title  :class="{'text-body-1' : screenSize === true}">
                            {{ $t('orderHistory.orderDeliveryAddress') }} <v-icon class="mx-2" :icon="mdiMapMarkerOutline"></v-icon> 
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <b><p class="font-weight-light h6">{{ $t('profile.alias') }} : {{ currentOrderData.clientDeliveryAddress.aliasDto }}</p></b>
                            <b><p v-if="currentOrderData.clientDeliveryAddress.blocDto !== null" class="font-weight-light h6">{{ $t('profile.building') }} : {{ currentOrderData.clientDeliveryAddress.blocDto }}</p></b>
                            <b><p v-if="currentOrderData.clientDeliveryAddress.nrBlocDto !== null" class="font-weight-light h6">{{ $t('profile.buildingNumber') }} : {{ currentOrderData.clientDeliveryAddress.nrBlocDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.street') }} : {{ currentOrderData.clientDeliveryAddress.stradaDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.streetNumber') }} : {{ currentOrderData.clientDeliveryAddress.nrStradaDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.city') }} : {{ currentOrderData.clientDeliveryAddress.orasDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.county') }} : {{ currentOrderData.clientDeliveryAddress.judetDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ currentOrderData.clientDeliveryAddress.codPostalDto }}</p></b>
                            <b> <p class="font-weight-light h6">{{ $t('profile.addressType') }} : {{ currentOrderData.clientDeliveryAddress.tipAdresaDto }}</p></b>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                        <v-card-title :class="{'text-body-1' : screenSize === true}">
                            {{ $t('orderHistory.orderBillingAddress') }} <v-icon :icon="mdiFileDocumentPlusOutline"></v-icon>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <b><p class="font-weight-light h6">{{ $t('profile.alias') }} : {{ currentOrderData.clientBillingAddress.aliasDto }}</p></b>
                            <b><p v-if="currentOrderData.clientBillingAddress.blocDto !== null" class="font-weight-light h6">{{ $t('profile.building') }} : {{ currentOrderData.clientBillingAddress.blocDto }}</p></b>
                            <b><p v-if="currentOrderData.clientBillingAddress.nrBlocDto !== null" class="font-weight-light h6">{{ $t('profile.buildingNumber') }} : {{ currentOrderData.clientBillingAddress.nrBlocDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.street') }} : {{ currentOrderData.clientBillingAddress.stradaDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.streetNumber') }} : {{ currentOrderData.clientBillingAddress.nrStradaDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.city') }} : {{ currentOrderData.clientBillingAddress.orasDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.county') }} : {{ currentOrderData.clientBillingAddress.judetDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ currentOrderData.clientBillingAddress.codPostalDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.Cif') }} : {{ currentOrderData.clientBillingAddress.cifDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.firmName') }} : {{ currentOrderData.clientBillingAddress.numeFirmaDto }}</p></b>
                            <b><p class="font-weight-light h6">{{ $t('profile.addressType') }} : {{ currentOrderData.clientBillingAddress.tipAdresaDto }}</p></b>
                        </v-card-text>
                    </v-card>
                </div>
                <v-divider></v-divider>
                <div>
                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                        <v-card-title :class="{'text-body-1' : screenSize === true}">
                            {{ $t('orderHistory.products') }} <v-icon class="mx-2" :icon="mdiPackageVariant"></v-icon>
                            <v-divider></v-divider>
                        </v-card-title>
                        <v-card-text>
                            <v-row v-for="(item,index) in currentOrderData.items"
                            :key="index">
                            <v-col cols="12" xs="12" sm="3" class="text-center">
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
                                                                <v-card class="elevation-6 bg-grey-lighten-2 text-center">
                                                                    <v-card-title>
                                                                        <span class="font-weight-light h5">{{ $t('cart.titles.manopera') }} </span>
                                                                    </v-card-title>
                                                                    <v-card-text >
                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} {{ item.cartItems[0].selectedManopera.tipGalerie.numeTipRejansa  }}</p>
                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} {{ item.cartItems[0].selectedManopera.tipGalerie.incretireRejansa  }}</p>
                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }} {{ item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu'  }}</p>
                                                                        <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{ item.cartItems[0].selectedManopera.tipGalerie.pretTipRejansa }}  RON</p>
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
                                                                        <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{  item.cartItems[0].selectedManopera.tipLinie.pretTipCusaturaColt }}  {{ selectedCurrency === 'RON' ? 'RON' : 'EUR'}} </p>
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
                                                                        Next
                                                                        <v-icon :icon="mdiArrowRight"></v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <template v-slot:prev="{props}">
                                                                    <v-btn variant="outlined" color="error" class="ma-1"
                                                                        v-bind="props" @click="stepValue--">
                                                                        Prev
                                                                        <v-icon :icon="mdiArrowLeft"></v-icon>
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
                                                    <p class="font-weight-light h5">{{ $t('shop.height') }} {{ selectedCurrency === 'RON' ? 'preferata' : 'preffered' }}</p>
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
                                                                    Next
                                                                    <v-icon :icon="mdiArrowRight"></v-icon>
                                                                </v-btn>
                                                                </template>
                                                                <template v-slot:prev="{props}">
                                                                <v-btn variant="outlined" color="error" class="ma-1"
                                                                    v-bind="props" @click="stepValueSet--">
                                                                    Prev
                                                                    <v-icon :icon="mdiArrowLeft"></v-icon>
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
                                    <p v-if="currentOrderData.orderVoucher === null" class="font-weight-light h5 text-center">{{ item.cartItems[0].pretCurent * item.cartItems[0].cantitate }}
                                       RON
                                    </p>
                                    <div v-else >
                                        <p class="font-weight-light h5 text-center text-decoration-line-through">{{ (item.cartItems[0].pretCurent * item.cartItems[0].cantitate) / (1 - currentOrderData.orderVoucher.reducereDto) }}
                                        RON</p>
                                        <p class="font-weight-light h5 text-center text-red">{{ item.cartItems[0].pretCurent * item.cartItems[0].cantitate }}
                                        RON</p>
                                    </div>
                                    
                                </div>
                            </v-col>
                            <v-divider></v-divider>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
                <v-divider></v-divider>
                <div>
                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                        <v-card-title  :class="{'text-body-1' : screenSize === true}">
                            {{ $t('checkout.orderSummary') }} <v-icon class="mx-2" :icon="mdiBallotOutline"></v-icon> 
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-row :class="{'text-left' : screenSize === true}">
                                <v-col cols="12" xs="12" sm="10"  md="10" class="text-left">
                                    <span class="font-weight-normal text-h6">{{ $t('orderHistory.products') }}</span>
                                </v-col>
                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right" v-if="currentOrderData.orderVoucher !== null">
                                    <span class="font-weight-normal text-h6">{{(currentOrderData.pretTotal / (1 - currentOrderData.orderVoucher.reducereDto)) }} RON</span>
                                </v-col>
                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right" v-else>
                                    <span class="font-weight-normal text-h6">{{currentOrderData.pretTotal }} RON</span>
                                </v-col>
                                <v-divider></v-divider>
                                <v-col cols="12" xs="12" sm="10" md="10" class="text-left">
                                    <span class="font-weight-normal text-h6">{{ $t('orderHistory.orderPaymentType') }}</span>
                                    
                                </v-col>
                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right">
                                    <span class="font-weight-normal text-h6">{{ currentOrderData.orderPayment }}</span>
                                </v-col>
                                <v-divider></v-divider>
                                <v-col cols="12" xs="12" sm="10" md="10" class="text-left" v-if="currentOrderData.orderVoucher !== null">
                                    <span class="font-weight-normal text-h6">Cupon/Cod </span>
                                </v-col>
                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right"  v-if="currentOrderData.orderVoucher !== null">
                                    <span class="font-weight-normal text-h6">{{ currentOrderData.orderVoucher.codVoucherDto }}</span>
                                    <br>
                                    <span class="font-weight-normal text-h6">{{ currentOrderData.orderVoucher.reducereDto * 100 }}%</span>
                                </v-col>
                                <v-divider v-if="currentOrderData.orderVoucher !== null"></v-divider>
                                <v-col cols="12" xs="12" sm="10" md="10" class="text-left">
                                    <span class="font-weight-normal text-h6">Total</span>     
                                </v-col>
                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right" >
                                    <span v-if="currentOrderData.orderVoucher === null" class="font-weight-normal text-h6" >{{ currentOrderData.pretTotal }} RON</span>
                                    <span v-else class="font-weight-normal text-red text-h6">{{ currentOrderData.pretTotal }} RON</span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>


<script setup>
import { useUserStore } from '~/store/user';
import { ref,onMounted } from 'vue';
import AdminNavDrawerOnClient from '~/components/admin/AdminNavDrawerOnClient.vue';
import { useDisplay } from 'vuetify';
import { mdiArrowLeft, mdiArrowRight, mdiBallotOutline, mdiCardAccountDetailsOutline, mdiFileDocumentPlusOutline, mdiMapMarkerOutline, mdiPackageVariant, mdiTruckCheckOutline } from '@mdi/js';

const route = useRoute()
const store = useUserStore()

const encodedIdAccountDto = route.params.encodedIdContDto;
const encodedOrderId = route.params.encodedOrderId;

const clientData = ref({});
// const localePath = useLocalePath();
const {name} = useDisplay()
const stepValue = ref(0)

const screenSize = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return 3
    }
})

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

watch(
  () => store.getDataPassed,
  (newData) => {
    clientData.value = newData;
    console.log(clientData.value)
  },
  { immediate: true }
);


const dimensionsForImage = computed(() => {
    switch (name.value){
        case 'xs': return {width : 125 , height : 125}
        case 'sm' : return {width : 125 , height : 125}
        case 'md' : return {width : 200 , height : 200}
        default : return {width : 200 , height : 200}
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

const indexOfCurrentOrder = computed(() => {
  if (!clientData.value.comenziClient) return -1;
  return clientData.value.comenziClient.findIndex(
    (order) => order.encodedIdComandaDto === encodedOrderId
  );
});

const orderId = computed(() => {
    if(indexOfCurrentOrder === -1){
        return '-'
    }
    return clientData.value.comenziClient[indexOfCurrentOrder.value].idComandaDto;
})


const isDeliveryTheSameWithBilling = computed(() => {
    if(indexOfCurrentOrder === -1){
        return "-"
    }
    
    
    return clientData.value.comenziClient[indexOfCurrentOrder.value].clientBillingAddress.cifDto === null 
        && clientData.value.comenziClient[indexOfCurrentOrder.value].clientBillingAddress.numeFirmaDto === null ;
})



const currentOrderData = computed(() => {
    if(indexOfCurrentOrder === -1){
        return null
    }
    console.log(clientData.value.comenziClient[indexOfCurrentOrder.value])
    return clientData.value.comenziClient[indexOfCurrentOrder.value];
})


const isCancelable = computed(() => {
    if(indexOfCurrentOrder === -1){
        return false
    }

    return clientData.value.comenziClient[indexOfCurrentOrder.value].isCancelableDto
})




onMounted(() => {
  clientData.value = store.getDataPassed
});


</script>