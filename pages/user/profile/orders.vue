<template>
    <div class="background-wrapper">
        <div class="background"></div>
        <div class="content" >
            <v-breadcrumbs divider="-">
                <v-breadcrumbs-item :to="'/user/profile'"><p class="font-weight-bold h6">PROFIL</p> </v-breadcrumbs-item>
                <v-breadcrumbs-divider><p class="font-weight-bold h6">/</p></v-breadcrumbs-divider>
                <v-breadcrumbs-item disabled><p class="font-weight-bold h6">COMENZI</p></v-breadcrumbs-item>
            </v-breadcrumbs>
        
            <div >
                <p class="h3 font-weight-light text-center p-3">Istoric comenzi</p>
                <v-container fluid v-if="clientOrders.length <= 0" >
                    <v-card class="bg-grey-darken-4 my-2 rounded-xl elevation-12">
                        <v-card-title class="text-center">
                            <v-icon class="mx-2" size="24" :icon="mdiTruckFast">
                               
                            </v-icon>
                            {{ $t('orderHistory.noOrderPlaced') }}
                        </v-card-title>
                    </v-card>
                </v-container>
                <v-container v-else fluid width="100%">
                    <v-expansion-panels>
                        <v-expansion-panel v-for="(order,index) in clientOrders" 
                        :key="index" :title="`${t('orderHistory.order')} #${order.orderId}`" class="bg-grey-lighten-5 my-3" >
                            <v-expansion-panel-text>
                                <v-card class="bg-grey-darken-4 elevation-24 p-3">
                                    <v-card-title :class="{'text-body-1' : screenSize === true}">
                                        {{ $t('orderHistory.details') }} <v-icon class="mx-2" size="24" :icon="mdiCardAccountDetailsOutline"></v-icon>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <!-- Order details (personal data) -->
                                    <v-card-text >
                                        <b><p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.name') }} : {{ order.userOrderDetails.nume }}</p></b>
                                        <b><p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.prename') }} : {{ order.userOrderDetails.prenume }}</p></b>
                                        <b><p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.number') }} : {{ order.userOrderDetails.nrTelefon }}</p></b>
                                        <b><p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.email') }} : {{ order.userOrderDetails.email }}</p></b>
                                    </v-card-text>
                                </v-card>
                                <v-divider></v-divider>
                                <!-- Order details (date , number , etc) -->
                                <v-card class="bg-grey-darken-4 elevation-24 p-3">
                                    <v-card-title  :class="{'text-body-1' : screenSize === true}">
                                        {{ $t('orderHistory.orderDetails') }} <v-icon class="mx-2" size="24" :icon="mdiTruckCheckOutline"></v-icon>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <p class="font-weight-light h6">{{ $t('contactPage.orderNumber') }} : {{ order.orderId }}</p>
                                        <p class="font-weight-light h6">{{ $t('orderHistory.orderPaymentType') }} : {{ order.orderPayment }}</p>
                                        <p class="font-weight-light h6">{{ $t('orderHistory.orderDate') }} {{ order.orderDate.split('T')[0]}} - {{ order.orderDate.split('T')[1]}}</p>
                                        <p class="font-weight-light h6">{{ $t('orderHistory.orderTrackingId') }}  {{ order.orderTrackingString }}</p>
                                        <p class="font-weight-light h6">{{ $t('orderHistory.orderStatus') }}  {{ order.orderStatus }}</p>
                                    <!-- <v-card-actions> -->
                                        <v-container :class="{'text-center' : screenSize === true}" fluid>
                                            <v-btn  class="bg-green"  :class="{'text-body-2' : screenSize === true}">
                                            {{ $t('orderHistory.orderTracking') }}
                                            </v-btn>
                                        </v-container>
                                    <!-- </v-card-actions> -->
                                    </v-card-text>
                                </v-card>
                                <v-divider></v-divider>
                                <!-- Order addresses -->
                                <div v-if="order.clientBillingAddress.cifDto === null && order.clientBillingAddress.numeFirmaDto === null">
                                    <v-card class="bg-grey-darken-4 elevation-24  p-3">
                                        <v-card-title  :class="{'text-body-1' : screenSize === true}">
                                            {{ $t('orderHistory.orderAddress') }} <v-icon class="mx-2" size="24" :icon="mdiMapMarkerOutline"></v-icon> / <v-icon class="mx-2" size="24" :icon="mdiFileDocumentPlusOutline"></v-icon>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <b><p class="font-weight-light h6">{{ $t('profile.alias') }} : {{ order.clientDeliveryAddress.aliasDto }}</p></b>
                                            <b><p v-if="order.clientDeliveryAddress.blocDto !== null" class="font-weight-light h6">{{ $t('profile.building') }} : {{ order.clientDeliveryAddress.blocDto }}</p></b>
                                            <b><p v-if="order.clientDeliveryAddress.nrBlocDto !== null" class="font-weight-light h6">{{ $t('profile.buildingNumber') }} : {{ order.clientDeliveryAddress.nrBlocDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.street') }} : {{ order.clientDeliveryAddress.stradaDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.streetNumber') }} : {{ order.clientDeliveryAddress.nrStradaDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.city') }} : {{ order.clientDeliveryAddress.orasDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.county') }} : {{ order.clientDeliveryAddress.judetDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ order.clientDeliveryAddress.codPostalDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.addressType') }} : {{ order.clientDeliveryAddress.tipAdresaDto }}</p></b>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <div v-else>
                                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                                        <v-card-title  :class="{'text-body-1' : screenSize === true}">
                                            {{ $t('orderHistory.orderDeliveryAddress') }} <v-icon class="mx-2" size="24" :icon="mdiMapMarkerOutline"></v-icon> 
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <b><p class="font-weight-light h6">{{ $t('profile.alias') }} : {{ order.clientDeliveryAddress.aliasDto }}</p></b>
                                            <b><p v-if="order.clientDeliveryAddress.blocDto !== null" class="font-weight-light h6">{{ $t('profile.building') }} : {{ order.clientDeliveryAddress.blocDto }}</p></b>
                                            <b><p v-if="order.clientDeliveryAddress.nrBlocDto !== null" class="font-weight-light h6">{{ $t('profile.buildingNumber') }} : {{ order.clientDeliveryAddress.nrBlocDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.street') }} : {{ order.clientDeliveryAddress.stradaDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.streetNumber') }} : {{ order.clientDeliveryAddress.nrStradaDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.city') }} : {{ order.clientDeliveryAddress.orasDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.county') }} : {{ order.clientDeliveryAddress.judetDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ order.clientDeliveryAddress.codPostalDto }}</p></b>
                                            <b> <p class="font-weight-light h6">{{ $t('profile.addressType') }} : {{ order.clientDeliveryAddress.tipAdresaDto }}</p></b>
                                        </v-card-text>
                                    </v-card>
                                    <v-divider></v-divider>
                                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                                        <v-card-title :class="{'text-body-1' : screenSize === true}">
                                            {{ $t('orderHistory.orderBillingAddress') }} <v-icon size="24" :icon="mdiProjectorScreenVariantOffOutline"></v-icon>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <b><p class="font-weight-light h6">{{ $t('profile.alias') }} : {{ order.clientBillingAddress.aliasDto }}</p></b>
                                            <b><p v-if="order.clientBillingAddress.blocDto !== null" class="font-weight-light h6">{{ $t('profile.building') }} : {{ order.clientBillingAddress.blocDto }}</p></b>
                                            <b><p v-if="order.clientBillingAddress.nrBlocDto !== null" class="font-weight-light h6">{{ $t('profile.buildingNumber') }} : {{ order.clientBillingAddress.nrBlocDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.street') }} : {{ order.clientBillingAddress.stradaDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.streetNumber') }} : {{ order.clientBillingAddress.nrStradaDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.city') }} : {{ order.clientBillingAddress.orasDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.county') }} : {{ order.clientBillingAddress.judetDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.postalCode') }} : {{ order.clientBillingAddress.codPostalDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.Cif') }} : {{ order.clientBillingAddress.cifDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.firmName') }} : {{ order.clientBillingAddress.numeFirmaDto }}</p></b>
                                            <b><p class="font-weight-light h6">{{ $t('profile.addressType') }} : {{ order.clientBillingAddress.tipAdresaDto }}</p></b>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <v-divider></v-divider>
                                <!-- Items -->
                                <div>
                                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                                        <v-card-title :class="{'text-body-1' : screenSize === true}">
                                            {{ $t('orderHistory.products') }} <v-icon class="mx-2" size="24" :icon="mdiPackageVariant"></v-icon>
                                            <v-divider></v-divider>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row v-for="(item,index) in order.items"
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
                                                                                <v-card class="elevation-6 bg-grey-lighten-2">
                                                                                    <v-card-title>
                                                                                        <span class="font-weight-light h5">{{ $t('cart.titles.manopera') }} </span>
                                                                                    </v-card-title>
                                                                                    <v-card-text >
                                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} {{ item.cartItems[0].selectedManopera.tipGalerie.numeTipRejansa  }}</p>
                                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} {{ item.cartItems[0].selectedManopera.tipGalerie.incretireRejansa  }}</p>
                                                                                        <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }} {{ item.cartItems[0].selectedManopera.tipGalerie.sePrindeCuInele === true ? 'Da' : 'Nu'  }}</p>
                                                                                        <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{ item.cartItems[0].selectedManopera.tipGalerie.pretTipRejansa }}  {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
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
                                                                                        <v-icon size="24" :icon="mdiArrowRight"></v-icon>
                                                                                    </v-btn>
                                                                                </template>
                                                                                <template v-slot:prev="{props}">
                                                                                    <v-btn variant="outlined" color="error" class="ma-1"
                                                                                        v-bind="props" @click="stepValue--">
                                                                                        Prev
                                                                                        <v-icon size="24" :icon="mdiArrowLeft"></v-icon>
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
                                                                                    <v-icon size="24" :icon="mdiArrowRight"></v-icon>
                                                                                </v-btn>
                                                                                </template>
                                                                                <template v-slot:prev="{props}">
                                                                                <v-btn variant="outlined" color="error" class="ma-1"
                                                                                    v-bind="props" @click="stepValueSet--">
                                                                                    Prev
                                                                                    <v-icon size="24" :icon="mdiArrowLeft"></v-icon>
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
                                                    <p v-if="order.orderVoucher === null" class="font-weight-light h5 text-center">{{ item.cartItems[0].pretCurent * item.cartItems[0].cantitate }}
                                                        {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                                                    </p>
                                                    <div v-else >
                                                        <p class="font-weight-light h5 text-center text-decoration-line-through">{{ (item.cartItems[0].pretCurent * item.cartItems[0].cantitate) / (1 - order.orderVoucher.reducereDto) }}
                                                        {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                                                        <p class="font-weight-light h5 text-center text-red">{{ item.cartItems[0].pretCurent * item.cartItems[0].cantitate }}
                                                        {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                                                    </div>
                                                   
                                                </div>
                                            </v-col>
                                            <v-divider></v-divider>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <v-divider></v-divider>
                                <!-- Order summary -->
                                <div>
                                    <v-card class="bg-grey-darken-4 elevation-24 p-3">
                                        <v-card-title  :class="{'text-body-1' : screenSize === true}">
                                            {{ $t('checkout.orderSummary') }} <v-icon class="mx-2" size="24" :icon="mdiBallotOutline"></v-icon> 
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-row :class="{'text-left' : screenSize === true}">
                                                <v-col cols="12" xs="12" sm="10"  md="10" class="text-left">
                                                    <span class="font-weight-normal text-h6">{{ $t('orderHistory.products') }}</span>
                                                </v-col>
                                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right">
                                                    <span class="font-weight-normal text-h6">{{(order.pretTotal / (1 - order.orderVoucher.reducereDto)) }} {{ selectedCurrency === "RON" ? "RON" : "EUR" }}</span>
                                                </v-col>
                                                <v-divider></v-divider>
                                                <v-col cols="12" xs="12" sm="10" md="10" class="text-left">
                                                    <span class="font-weight-normal text-h6">{{ $t('orderHistory.orderPaymentType') }}</span>
                                                    
                                                </v-col>
                                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right">
                                                    <span class="font-weight-normal text-h6">{{ order.orderPayment }}</span>
                                                </v-col>
                                                <v-divider></v-divider>
                                                <v-col cols="12" xs="12" sm="10" md="10" class="text-left" v-if="order.orderVoucher !== null">
                                                    <span class="font-weight-normal text-h6">Cupon/Cod </span>
                                                </v-col>
                                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right"  v-if="order.orderVoucher !== null">
                                                    <span class="font-weight-normal text-h6">{{ order.orderVoucher.codVoucherDto }}</span>
                                                    <br>
                                                    <span class="font-weight-normal text-h6">{{ order.orderVoucher.reducereDto * 100 }}%</span>
                                                </v-col>
                                                <v-divider v-if="order.orderVoucher !== null"></v-divider>
                                                <v-col cols="12" xs="12" sm="10" md="10" class="text-left">
                                                    <span class="font-weight-normal text-h6">Total</span>     
                                                </v-col>
                                                <v-col cols="12" xs="12" sm="2" md="2" class="text-right" >
                                                    <span v-if="order.orderVoucher === null" class="font-weight-normal text-h6">{{ order.pretTotal }} {{ selectedCurrency === "RON" ? "RON" : "EUR" }}</span>
                                                    <span v-else class="font-weight-normal text-h6 text-red">{{order.pretTotal}} {{ selectedCurrency === "RON" ? "RON" : "EUR" }}</span>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-container>
            </div>   
        </div>  
    </div>
</template>



<script setup>

import orderService from '~/services/Order';
import { useDisplay } from 'vuetify';
import { mdiArrowLeft, mdiArrowRight, mdiBallotOutline, mdiCardAccountDetailsOutline, mdiFileDocumentPlusOutline, mdiMapMarkerOutline, mdiPackageVariant, mdiProjectorScreenVariantOffOutline, mdiTruckCheckOutline, mdiTruckFast } from '@mdi/js';
definePageMeta({
    layout: 'default',
    middleware: ['auth' , 'locale']
})

const clientOrders = ref([])
const stepValue = ref(0)
const stepValueSet = ref(0)

const selectedCurrency = useState('selectedCurrency');
const {t} = useI18n()

const {name} = useDisplay()

const screenSize = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return 3
    }
})

const getClientOrders = (async () => {
    const response = await orderService.getClientOrders(selectedCurrency.value);
    console.log(response)
    if(response.length > 0){
        clientOrders.value = response
    }else{
        clientOrders.value = []
    }
})

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

onMounted(async () => {
    await getClientOrders();
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
  background-image: url(/assets/background.jpeg);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 100%;
  width: 100%;
}
</style>