<template>
    <div fluid>
        <v-sheet color="grey-lighten-2" class="p-3">
            <v-row>
                <v-col cols="12" xs="12" md="7" sm="12" class="p-1">
                    <v-card class="bg-grey-lighten-4 h-100 " elevation="12">
                        <v-card-text>
                            <v-alert v-if="selectedImage" class="text-center my-2" color="blue" variant="tonal" :icon="mdiInformation" >
                                {{ $t('shopSeturi.showImageForProduct') }} <b class="text-black">{{ selectedImage.productName.toUpperCase() }} </b>
                                {{ $t('shopSeturi.showImageForColor') }} <b class="text-black">{{ selectedImage.colorName.toUpperCase() }} </b>
                            </v-alert>
                            <v-alert v-if="setData.pretRedusSetDto > 0" class="text-center mt-2 mb-2" color="red" variant="flat" :icon="mdiSale">
                                <span class="font-weight-bold h6">{{ Math.ceil(
                                    ((setData.pretSetDto - setData.pretRedusSetDto) / setData.pretSetDto) * 100
                                ) }}% {{$t('shop.discount')}}</span>
                            </v-alert>
                            
                            <v-row>
                                <v-col cols="12" class="text-center">
                                    <v-tooltip :text="`${t('general.zoomImage')}`" v-if="isMounted">
                                        <template v-slot:activator="{props}">
                                            <NuxtImg :src="selectedImage.url"
                                            preload
                                            v-bind="props"
                                            @click="dialog = true"
                                            format="webp"
                                            sizes="md:800px"
                                            :width="screenSize.width"
                                            :height="screenSize.height"
                                            class="cursor-pointer"
                                            >

                                            </NuxtImg>
                                            <!-- <v-img
                                                :src="selectedImage.url" 
                                                eager 
                                                class="cursor-pointer"
                                                :aspect-ratio="4 / 4"
                                                @click="dialog = true"
                                                v-bind="props" >
                                            </v-img> -->
                                        </template>
                                    </v-tooltip>
                                    
                                </v-col>
                            </v-row>
                              
                                <v-sheet color="grey-lighten-4" 
                                    class="mx-auto"  
                                    max-width="350"
                                    >
                                    <v-slide-group
                                    show-arrows="always"
                                    v-model="activeSlide"
                                    center-active
                                    selected-class="cursor-pointer opacity-70 mt-2 "
                                    
                                        >
                                        <v-slide-group-item 
                                        v-for="(image,productIndex) in allImages" 
                                        :key="productIndex" 
                                        v-slot="{isSelected,toggle,selectedClass}">
                                            <v-tooltip :text="`${t('general.selectImage')}`">
                                                <template v-slot:activator="{ props }">
                                                    <NuxtImg :src="image.url"
                                                    preload
                                                    format="webp"
                                                    class="mx-5 my-5 w-50"
                                                    @click="() => { toggle(); selectImage(image); }"
                                                        :class="selectedClass " 
                                                        v-bind="props" 
                                                    >
                                                    <div class="d-flex fill-height align-center justify-center">
                                                            <v-scale-transition>
                                                                <v-icon
                                                                    v-if="isSelected"
                                                                    color="black"
                                                                    :icon="mdiCloseCircleOutline"
                                                                    size="24"
                                                                ></v-icon>
                                                            </v-scale-transition>
                                                        </div>
                                                    </NuxtImg>
                                                    <!-- <v-img
                                                        eager
                                                        :aspect-ratio="7 / 8"
                                                        :src="image.url"
                                                        class="mx-5 w-50"
                                                        @click="() => { toggle(); selectImage(image); }"
                                                        :class="selectedClass " 
                                                        v-bind="props" >
                                                        <div class="d-flex fill-height align-center justify-center">
                                                            <v-scale-transition>
                                                                <v-icon
                                                                    v-if="isSelected"
                                                                    color="black"
                                                                    icon="mdi-close-circle-outline"
                                                                    size="24"
                                                                ></v-icon>
                                                            </v-scale-transition>
                                                        </div>
                                                    </v-img> -->
                                                </template>
                                            </v-tooltip>
                                        </v-slide-group-item>
                                    </v-slide-group>
                                </v-sheet>
                                        
                                <v-dialog v-model="dialog" max-width="600">
                                    <v-card class="bg-grey-lighten-3 p-1" >
                                        <v-card-text>
                                            <v-img
                                                :src="selectedImage.url"
                                                aspect-ratio="16/9"
                                                class="mx-auto"
                                            ></v-img>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn variant="flat" color="red" text @click="dialog = false">Close</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                          
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" md="5" sm="12" class="p-1">
                    <v-card class="bg-grey-lighten-4 h-100 elevation-12">
                        <v-card-title>
                            <p class="text-center h3 font-weight-light">{{ setData.numeSetDto }}</p>
                            <v-divider opacity="30"></v-divider>
                        </v-card-title>
                        
                        <v-card-text class="text-center">
                            <v-row no-gutters>
                                <v-col v-if="selectedProduct !== null" cols="12" class="p-1 mb-1">
                                    <v-alert variant="tonal" icon="mdi-information" color="red">
                                        <p class="font-weight-light text-center h6 text-black">
                                            {{ $t('shopSeturi.selectedProduct') }} <v-btn size="small" color="green">{{ selectedProduct.numeProdusDto }}</v-btn> 
                                        </p>
                                        <p v-if="getSelectedDimensionForSelectedProduct !== undefined" class="font-weight-light text-center h6 text-black">
                                            {{ $t('shopSeturi.selectedDimension') }} <v-btn ize="small" color="red" >{{ getSelectedDimensionForSelectedProduct.dimensionSelected.lungimeDto }}cm 
                                                x {{  getSelectedDimensionForSelectedProduct.dimensionSelected.latimeDto }}cm</v-btn>
                                        </p>
                                        <p v-if="getSelectedManoperaForSelectedProduct !== undefined" class="font-weight-light text-center h6 text-black">
                                            {{ $t('shopSeturi.selectedManopera') }}<v-btn size="small" color="blue">
                                               {{ getSelectedManoperaForSelectedProduct.manoperaSelected.numeManopera }}
                                            </v-btn>
                                        </p>
                                        <p v-if="getSelectedColorForSelectedProduct !== undefined" class="font-weight-light text-center h6 text-black">
                                            {{ $t('shopSeturi.selectedColor') }}<v-btn size="small" color="red">{{ getSelectedColorForSelectedProduct.colorSelected.numeCuloareDto }}</v-btn>
                                        </p>

                                    </v-alert>
                                </v-col>
                                <v-col col="12">
                                    <p class="font-weight-light h5 text-center">{{ $t('shopSeturi.configureProducts') }}</p>
                                </v-col>
                               
                                <v-col v-for="(product,index) in setData.produsePeSet"
                                :key="index" cols="12">
                                    <v-btn block  variant="flat" class="mt-2 p-1"
                                    :color="selectedProduct === product ? 'green' : 'grey-lighten-1'"
                                    @click="selectProduct(product)">
                                        {{ product.numeProdusDto }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-divider opacity="30" ></v-divider>
                            <div v-if=" selectedProduct !== null">
                                <div v-if="selectedProduct.tipulProdusuluiDto !== 'draperie' && selectedProduct.tipulProdusuluiDto !== 'perdea'">
                                    <div v-if="selectedProduct.selectedDimensions.length > 0">
                                        <v-card class="elevation-12 p-1">
                                            <v-card-title class="text-center">
                                                <p class="font-weight-thin h5 ">{{ $t('shop.dimensionAvailable') }}</p>
                                                <p class="font-weight-thin h6">{{ $t('shop.WidthXHeight') }}</p>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-card-text >
                                                <v-row >
                                                    <v-col cols="12" v-for="(dimension,index) in selectedProduct.selectedDimensions" :key="index">
                                                        <div class="text-center">
                                                            <v-btn height="75"
                                                            variant="elevated"
                                                            block
                                                            :color="selectedDimensions.some(d => d.productName === selectedProduct?.numeProdusDto && d.dimensionSelected === dimension) ? 'green' : 'grey-lighten-2'"
                                                            active-color="red"
                                                            @click="toggleButton(dimension , 'dimension')"
                                                        >
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    {{ $t('shop.DIMENSION') }} {{ dimension.lungimeDto }} x {{ dimension.latimeDto }}
                                                                </v-col>
                                                                <v-col v-if="dimension.recomandarePat" cols="12">
                                                                    {{ $t('shop.BEDRECOMENDATION') }} {{ dimension.recomandarePat ? dimension.recomandarePat : 'N/A'}}
                                                                </v-col>
                                                            </v-row>
                                                            <p></p> 
                                                            <p></p>
                                                        </v-btn>
                                                        </div>
                                                        
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </div>
                                    <v-divider opacity="70" ></v-divider>
                                </div>
                                <div v-else>
                                   <v-card class="p-1" elevation="12" >
                                        <v-card-title>
                                            <p class="font-weight-thin h5">{{ $t('shopSeturi.availableManopera') }}</p>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row>
                                            <v-col cols="12"
                                            v-for="(manopera,index) in selectedProduct.selectedManopere"
                                            :key="index">
                                                <div class="text-center">
                                                    <v-btn
                                                        variant="elevated"
                                                        block
                                                        :color="selectedManopere.some(m => m.productName === selectedProduct?.numeProdusDto && m.manoperaSelected === manopera) ? 'blue' : 'grey-lighten-2'"
                                                        active-color="blue"
                                                        @click="toggleButton(manopera,'manopera')"
                                                    >
                                                        {{ manopera.numeManopera }}
                                                    </v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        </v-card-text>
                                   </v-card>
                                   <v-divider opacity="70"></v-divider>
                                    <div v-if="printManoperaInformation !== undefined" class="my-3">
                                        <v-alert variant="outlined" type="info" class="mb-2">
                                            <span class="font-weight-bold text-black">{{ $t('shopSeturi.showInfoAboutManopera') }} <b class="text-blue">{{ printManoperaInformation.manoperaSelected.numeManopera }}</b></span>
                                        </v-alert>
                                        <v-alert variant="outlined" type="info" class="mb-2 text-justify">
                                            <span class="font-weight-bold text-black ">- {{ $t('shopSeturi.recommendedWidth') }}  <b class="text-blue">{{ printManoperaInformation.manoperaSelected.metruTotalFolosit / printManoperaInformation.manoperaSelected.tipGalerie.incretireRejansa}} {{ $t('shopSeturi.meter') }}</b></span>
                                            <br>
                                            <span class="font-weight-bold text-black">- {{ $t('shopSeturi.maximumWidth') }}  <b class="text-blue">{{ printManoperaInformation.manoperaSelected.metruTotalFolosit / printManoperaInformation.manoperaSelected.tipGalerie.incretireRejansa}} {{ $t('shopSeturi.meter') }}</b></span>
                                            <br>
                                            <span class="font-weight-bold text-black">- {{ $t('shopSeturi.recommendedHeight') }}  <b class="text-blue">{{printManoperaInformation.manoperaSelected.inaltimeMaxima / 100}} {{ $t('shopSeturi.meter') }}</b></span>
                                            <br>
                                            <span class="font-weight-bold text-black">- <b class="text-red">{{ $t('shopSeturi.userWidthPrefference') }}.</b>  </span>

                                        </v-alert>
                                        <v-alert variant="outlined" type="warning" class="mb-2" >
                                            <span class="font-weight-bold text-black">{{ $t('shopSeturi.inputHeight') }}</span>

                                        </v-alert>
                                        <div>
                                            <v-form ref="heightInputForm" validate-on="input" class="text-center">
                                                <v-text-field :label="`${t('shopSeturi.prefferedHeight')}`"
                                                :rules="[rules.maxChar(4) , rules.onlyNumbers , rules.notEmpty]" 
                                                v-model="currentHeightPreffered">
                                                </v-text-field>
                                                <v-snackbar class="text-center"
                                                 v-model="successSnackBar"
                                                    color="green"
                                                    rounded="pill">
                                                    {{ $t('general.heightSaved') }}
                                                </v-snackbar>
                                                <v-btn block  class="my-4"
                                                        color="green" 
                                                        variant="elevated" 
                                                        ripple
                                                        @click=savePreferredHeight>
                                                            {{ $t('button.save') }}
                                                </v-btn>
                                               
                                            </v-form>
                                            
                                        </div>
                                        <v-stepper v-model="step"
                                         elevation="12" class="mb-6" 
                                         :mobile="heightComp">
                                            <v-stepper-header>
                                                <v-stepper-item
                                                    title="Rejansa" 
                                                    value="1" 
                                                     >
                                                </v-stepper-item>
                                                <v-divider></v-divider>
                                                <v-stepper-item v-if="printManoperaInformation.manoperaSelected.tipGalerie.sePrindeCuInele === true"
                                                    title="Inele prindere" 
                                                    value="2" 
                                                     >
                                                </v-stepper-item>
                                                <v-divider></v-divider>
                                                <v-stepper-item
                                                    title="Tip linie" 
                                                    :value="printManoperaInformation.manoperaSelected.tipGalerie.sePrindeCuInele === true ? 3 : 2" 
                                                       >
                                                </v-stepper-item>
                                            </v-stepper-header>
                                            <v-stepper-window>
                                                <v-stepper-window-item value="1" >
                                                    <v-card elevation="6" class="bg-grey-lighten-2">
                                                        <v-card-text>
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <p class="font-weight-normal h5">{{ $t('shopSeturi.rejansaType') }}</p>
                                                                    <v-divider></v-divider>
                                                                    <v-row>
                                                                        <v-col cols="12">
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaName') }} <b>{{ printManoperaInformation.manoperaSelected.tipGalerie.numeTipRejansa }}</b></p>
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.rejansaIncretire') }} <b>{{ printManoperaInformation.manoperaSelected.tipGalerie.incretireRejansa }}</b></p>
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.catchWithRings') }}<b>{{ printManoperaInformation.manoperaSelected.tipGalerie.sePrindeCuInele === true ? 'DA' : 'NU'  }}</b></p>
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.totalMeters') }}<b>{{ printManoperaInformation.manoperaSelected.metruTotalFolosit }}</b></p>
                                                                            <p class="font-weight-light h6">{{ $t('shopSeturi.maximumHeight') }}<b>{{ printManoperaInformation.manoperaSelected.inaltimeMaxima }}</b></p>
                                                                        </v-col>
                                                                        <v-col cols="12">
                                                                            <v-img eager v-if="printManoperaInformation.manoperaSelected.tipGalerie.presignedUrl !== 'empty'"
                                                                            :aspect-ratio="16 / 5" :alt="selectedCurrency === 'RON' ? 'Imagine cusatura colt' : 'Corner stich image'"
                                                                            :src="printManoperaInformation.manoperaSelected.tipGalerie.presignedUrl" >

                                                                            </v-img>
                                                                            <v-img v-else src="/notFound.png" aspect-ratio="16 / 5"
                                                                            :alt="selectedCurrency === 'RON' ? 'Imagine cusatura colt' : 'Corner stich image'"> </v-img>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-stepper-window-item>
                                                <v-stepper-window-item value="2" v-if="printManoperaInformation.manoperaSelected.tipGalerie.sePrindeCuInele === true" >
                                                    <v-card elevation="6" class="bg-grey-lighten-2">
                                                        <v-card-text>
                                                            <v-row>
                                                                <v-col cols="12" v-if="printManoperaInformation.manoperaSelected.tipGalerie.sePrindeCuInele === true">
                                                                    <p class="font-weight-normal h5">{{ $t('shopSeturi.ringType') }}</p>
                                                                    <v-divider></v-divider>
                                                                    <v-row>
                                                                        <v-col cols="12">
                                                                            <p class="font-weight-normal h6">{{ $t('shopSeturi.ringColor') }} <b>{{ printManoperaInformation.manoperaSelected.tipInel.numeTipInel }}</b></p>
                                                                            <v-img eager v-if="printManoperaInformation.manoperaSelected.tipInel.presignedUrl !== 'empty'"
                                                                            :aspect-ratio="16 / 5" :alt="selectedCurrency === 'RON' ? 'Imagine cusatura colt' : 'Corner stich image'"
                                                                            :src="printManoperaInformation.manoperaSelected.tipInel.presignedUrl" >
                                                                            </v-img>

                                                                            <v-img v-else src="/notFound.png"
                                                                             aspect-ratio="16 / 5"
                                                                             :alt="selectedCurrency === 'RON' ? 'Imagine cusatura colt' : 'Corner stich image'"> </v-img>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-stepper-window-item>
                                                <v-stepper-window-item :value="printManoperaInformation.manoperaSelected.tipGalerie.sePrindeCuInele === true ? 3 : 2"  >
                                                    <v-card elevation="6" class="bg-grey-lighten-2">
                                                        <v-card-text>
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <p class="font-weight-normal h5">{{ $t('shopSeturi.liningType') }}</p>
                                                                    <v-divider></v-divider>
                                                                    <v-row>
                                                                        <v-col cols="12">
                                                                            <p class="font-weight-normal h6">{{ $t('shopSeturi.liningTypeName') }} <b>{{ printManoperaInformation.manoperaSelected.tipLinie.numeTipCusaturaColt }}</b></p>
                                                                        </v-col>
                                                                        <v-col cols="12">
                                                                            <v-img eager v-if="printManoperaInformation.manoperaSelected.tipLinie.presignedUrl !== 'empty'"
                                                                            :aspect-ratio="16 / 5"
                                                                            :alt="selectedCurrency === 'RON' ? 'Imagine cusatura colt' : 'Corner stich image'"
                                                                            :src="printManoperaInformation.manoperaSelected.tipLinie.presignedUrl" >

                                                                            </v-img>
                                                                            <v-img v-else src="/notFound.png" aspect-ratio="16 / 5" 
                                                                            :alt="selectedCurrency === 'RON' ? 'Imagine cusatura colt' : 'Corner stich image'"
                                                                            > </v-img>
                                                                        </v-col>
                                                                        
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-stepper-window-item>
                                            </v-stepper-window>
                                            <v-stepper-actions >
                                                <template v-slot:next="{props}">
                                                    <v-btn variant="outlined" color="primary" class="ma-1"
                                                    v-bind="props" @click="step++">
                                                        {{ $t('shop.next') }}<v-icon  size="24" :icon="mdiArrowRight"></v-icon>
                                                    </v-btn>
                                                </template>
                                                <template v-slot:prev="{props}">
                                                    <v-btn variant="outlined" color="error" class="ma-1"
                                                    v-bind="props" @click="step--">
                                                        {{ $t('shop.curtain.back') }}<v-icon  size="24" :icon="mdiArrowLeft"></v-icon>
                                                    </v-btn>
                                                </template>
                                            </v-stepper-actions>
                                        </v-stepper>
                                    </div>
                                    
                                </div>
                                <div>
                                    <v-card elevation="12" class="p-2">
                                        <v-card-title class="text-center">
                                            <p class="font-weight-thin h5">{{ $t('shop.colorAvailable') }}</p>
                                        </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" 
                                            v-for="(color,index) in selectedProduct.selectedColors"
                                            :key="index">
                                            <div class="text-center">
                                                <v-btn
                                                    variant="elevated"
                                                    block
                                                    :color="selectedColors.some(c => c.productName === selectedProduct?.numeProdusDto && c.colorSelected === color) ? 'red' : 'grey-lighten-2'"
                                                    active-color="blue"
                                                    @click="toggleButton(color,'color')"
                                                >
                                                    {{ color.numeCuloareDto }}
                                                </v-btn>
                                            </div>
                                            
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    </v-card> 
                                    <v-divider opacity="70"></v-divider>
                                </div>
                            </div>
                           
                            <div class="mt-6">
                                <span class="font-weight-thin h5">
                                    <b v-if="setData.pretRedusSetDto > 0">
                                        <p><s>{{ setData.pretSetDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</s></p>
                                        <div class="price-container">
                                            <div class="discount">
                                                {{ Math.ceil(
                                                    ((setData.pretSetDto - setData.pretRedusSetDto) / setData.pretSetDto) * 100
                                                ) }}%
                                            </div>
                                            <span class="text-above text-error font-weight-bold">
                                                {{ setData.pretRedusSetDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                                            </span>
                                        </div>
                                    </b>
                                    <b v-else>
                                        {{ setData.pretSetDto }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                                    </b>
                                </span>
                            </div>
                            
                            <div class="mt-2 text-center">
                                <v-btn
                                    :class="{'button-clicked': isClicked}"
                                    variant="flat"
                                    color="primary"
                                    @click="addOrUpdateCart"
                                >
                                    <template v-if="!isClicked">
                                        {{ $t('shop.addToCart') }}
                                        <v-icon class="mx-1" size="24" :icon="mdiShoppingOutline"></v-icon>
                                    </template>
                                    <template v-else>
                                        <v-icon class="mx-1" size="24" :icon="mdiCheck"></v-icon>
                                    </template>
                                </v-btn>
                            </div>
                            <div>
                                <NuxtLink :to="localePath('/measurement')" prefetch :prefetch-on="{interaction: true}">
                                    {{ $t('general.howToMeasure') }}
                                </NuxtLink>
                            </div>
                            <div class="mt-4 text-center">
                                <p class="font-weight-light h6">{{ $t('general.informations') }}</p>
                                <span><v-icon class="mr-2" size="24" :icon="mdiPhone"></v-icon>0744959764</span>
                                <br>
                                <span><v-icon class="mr-2" size="24" :icon="mdiEmail"></v-icon>texx@email.com</span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="6" class="p-1">
                    <v-card elevation="12">
                        <v-card-title class="font-weight-light text-center">
                            <p class="h5">{{ $t('shopSeturi.description.productsInfo.titleInfo') }}</p>
                        </v-card-title>
                        <v-card-text>
                            <v-divider></v-divider>
                            <v-expansion-panels>
                                <v-expansion-panel v-for="(product,index) in setData.produsePeSet"
                                :key="index" 
                                :title="product.numeProdusDto.toUpperCase()" class="my-2" elevation="12">
                                <v-expansion-panel-text>
                                    <v-card rounded elevation="12" class="bg-grey-lighten-2" color="red">
                                        <v-card-title  class="mb-3 bg-blue">
                                            <p class="text-center font-weight-light h6">{{ product.numeProdusDto.toUpperCase() }}</p>
                                        </v-card-title>
                                        <v-card-text class="bg-grey-lighten-3" >
                                            <v-row>
                                                <v-col cols="12" >
                                                    <p class=" font-weight-bold h6">{{ $t('shopSeturi.description.productsInfo.general.titleGeneral') }}</p>
                                                    <v-divider></v-divider>
                                                    <p class="font-weight-normal h7">{{ $t('shopSeturi.description.productsInfo.general.name') }} <b>{{ product.numeProdusDto }}</b></p>
                                                    <p class="font-weight-normal h7">{{ $t('shopSeturi.description.productsInfo.general.type') }}<b>{{ product.tipulProdusuluiDto.toUpperCase() }}</b></p>
                                                    <p class="font-weight-normal h7">{{ $t('shopSeturi.description.productsInfo.general.identifier') }} <b>{{ product.codProdusDto.toUpperCase() }}</b></p>
                                                    <v-divider></v-divider>
                                                </v-col>
                                                <v-col cols="12">
                                                    <p class=" font-weight-bold h6">{{ $t('shopSeturi.description.productsInfo.general.prodDescription') }}</p>
                                                    <v-divider></v-divider>
                                                    <p class="font-weight-normal h7 text-justify"><b>{{ product.descriereDto }}</b></p>
                                                    <v-divider></v-divider>
                                                </v-col>
                                                <v-col cols="12">
                                                    <p class=" font-weight-bold h6">{{ $t('shopSeturi.description.productsInfo.compozitionAndCaring.title') }}</p>
                                                    <v-divider></v-divider>
                                                    <p class="font-weight-normal h7 text-justify">{{ $t('shopSeturi.description.productsInfo.compozitionAndCaring.compozition') }} <b>{{ product.compozitieDto }}</b></p>
                                                    <p class="font-weight-normal h7 text-justify">{{ $t('shopSeturi.description.productsInfo.compozitionAndCaring.caring') }} <b>{{ product.ingrijireDto }}</b></p>
                                                    <v-divider></v-divider>
                                                </v-col>
                                                <v-col cols="12">
                                                    <p class=" font-weight-bold h6">{{ $t('shopSeturi.description.productsInfo.manufacturer.title') }}</p>
                                                    <v-divider></v-divider>
                                                    <p class="font-weight-normal h7 text-justify">{{ $t('shopSeturi.description.productsInfo.manufacturer.name') }} <b>{{ product.numeProducatorDto }}</b></p>
                                                    <v-divider></v-divider>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-text>
                                   
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="6" class="p-1">
                    <v-card elevation="12" class="h-100">
                        <v-card-title class="font-weight-light text-center">
                            <p class="h5">Informatii set</p>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-divider></v-divider>
                                    <p class="font-weight-normal h7">NUME SET : <b>{{ setData.numeSetDto }}</b></p>
                                    <p class="font-weight-normal h7">DESCRIERE SET : <b>{{ setData.descriereSetDto }}</b></p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" class="p-1">
                    <v-card>
                        <v-card-title class="m-1 text-center">
                            <p class="font-weight-light h5">{{ $t('shop.reviews') }}</p>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card class="p-2 m-2 bg-grey-lighten-4" elevation="6" 
                        v-for="(review,index) in setData.reviewsSet"
                                :key="index">
                            <v-card-text v-if="setData.reviewsSet && setData.reviewsSet.length > 0">
                                <v-row >
                                    <v-col cols="12">
                                        <p v-if="review.numeClient === null && review.prenumeClient === null" class="text-center mt-1">
                                             {{ review.usernameContClient }}
                                        </p>
                                        <p v-else>
                                            {{ review.numeClient + ' ' + review.prenumeClient }}
                                        </p>
                                    </v-col>
                                    <v-col cols="12" >
                                        <div class="text-center">
                                            <v-rating
                                                hover :length="5"
                                                :size="24"
                                                readonly
                                                half-increments
                                                v-model="review.numarSteleDto"
                                                color="orange-lighten-1"
                                                active-color="primary"
                                                class="ma-2"
                                            ></v-rating>
                                        <p class="font-weight-thin h6 mt-2">{{ review.textRecenzie }}</p>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-text v-else>
                                <p class="font-weight-thin h5 text-center">{{ $t('shop.noReviews') }}</p>
                            </v-card-text>
                        </v-card>
                    </v-card>
                </v-col>
                <v-col cols="12" v-if="setData.reviewsGeneral">
                    <v-card elevation="24" class="bg-grey-lighten-2 text-center">
                        <v-card-title>
                            <p class="font-weight-thin h3 my-7">{{ $t('general.ratingOverview') }}</p>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <p class="font-weight-light h5"><span class="h1 font-weight-light">{{ setData.reviewsGeneral.averageRating }}</span> / 5</p>
                                    <v-rating
                                        hover :length="5"
                                        :size="32"
                                        readonly
                                        half-increments
                                        v-model="setData.reviewsGeneral.averageRating"
                                        color="orange-lighten-1"
                                        active-color="primary"
                                        class="ma-2"
                                    ></v-rating>
                                    <p class="font-weight-light h5">{{ setData.reviewsGeneral.totalReviews }} {{ $t('general.reviews') }}</p>
                                </v-col>
                                <v-col cols="12">
                                    <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                                        <v-list-item v-for="(value, index) in [5, 4, 3, 2, 1]" :key="index">
                                            <v-progress-linear
                                                :model-value="getPercentage(value)"
                                                class="mx-n5"
                                                color="yellow-darken-3"
                                                height="15"
                                                rounded
                                            ></v-progress-linear>
                                            <template v-slot:prepend>
                                                <span>{{ value }}</span>
                                                <v-icon class="mx-3" :icon="mdiStar" size="24"></v-icon>
                                            </template>
                                            <template v-slot:append>
                                                <div >
                                                    <span class="d-flex justify-end">
                                                        {{ getReviewCount(value) }}
                                                    </span>
                                                </div>
                                            </template>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                            </v-row>
                           
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-divider></v-divider>
                <v-col cols="12" v-if="isLoggedIn" c>
                    <v-form @submit.prevent="postReview()" validate-on="submit" ref="reviewForm" class="p-3 m-2 bg-grey-lighten-4 text-center">
                        <p class="font-weight-thin h5 text-center">{{ $t('shop.leaveAReview') }}</p>
                        <v-textarea :label="`${$t('shop.writeReview')}`"
                            clearable
                            counter="150"
                            v-model="reviewText"
                            :rules="[rules.notEmpty,rules.maxChar(150)]">

                        </v-textarea>
                        <v-rating
                            hover :length="5"
                            :size="32"
                            v-model="stars"
                            :item-labels="[`${$t('general.notCalitative')}` , '' , `${$t('general.ok')}` , '' , `${$t('general.calitative')}`]"
                            item-label-position="bottom"
                            color="orange-lighten-1"
                            active-color="primary"
                            class="ma-2"
                        ></v-rating>
                        <p class="font-weight-thin h6 ">({{ stars }} {{ stars === 1 ? 'stea' : 'stele' }})</p>
                        <v-btn class="text-center m-2 p-2" variant="flat" color="primary" type="submit">
                            {{ $t('shop.post') }}
                        </v-btn>
                    </v-form>
                    <p class="font-weight-thin h6 text-center">{{$t('shop.reviewInfo')}}</p>
                </v-col>
                <v-col cols="12" v-else>
                    <v-card class="p-2 bg-grey-lighten-2" elevation="12"  >
                        <v-card-text>
                            <p class="font-weight-light h5 text-center text-red">{{ $t('textFieldsMessages.mustBeLoggedInForReview') }}</p>
                            <div class="text-center">
                                <v-btn variant="flat" color="primary" @click="navigateTo(localePath('/user/login'))" >
                                    {{ $t('login.logInText') }} <v-icon  size="24" :icon="mdiArrowRight"></v-icon>
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </div>
</template>



<script setup>
import { mdiArrowLeft, mdiCheck, mdiCloseCircleOutline, mdiEmail, mdiPhone, mdiSale, mdiShoppingOutline, mdiStar , mdiArrowRight , mdiInformation } from '@mdi/js';
import { useDisplay } from 'vuetify';
import productService from '~/services/Products'
import { cartCount } from '~/middleware/cart';


const swal = useNuxtApp().$swal
const route = useRoute();
const localePath = useLocalePath();
const encodedIdSet = route.params.encodedIdSet
const setName = route.params.numeSet
const selectedDimensions = ref([])
const selectedColors = ref([])
const selectedManopere = ref([])
const isClicked = ref(false)
const { t } = useI18n()
const {name} = useDisplay()
const selectedImage = ref('')
const dialog = ref(false)
const stars = ref(0)
const reviewForm = ref(null)
const reviewText = ref('')
const isLoggedIn = ref(false)
const prefferedHeights = ref([])
const currentHeightPreffered = ref('')
const heightInputForm = ref(null)
const successSnackBar = ref(false)
const activeSlide = ref(0)
const isMounted = ref(false)
const step = ref(1)


const onlyNums = new RegExp('^[1-9]\\d{0,3}$');

const rules = {
    notEmpty : value => !!value || t('textFieldsMessages.notEmpty'),
    maxChar: maxLength => value => !value || value.length <= maxLength || `${t('textFieldsMessages.maxLength')} ${maxLength}`,
    onlyNumbers : value => onlyNums.test(String(value)) || t('textFieldsMessages.onlyNumbers'),
    stars : value => value <= 5 && value >=0 || t('textFieldsMessages.starsRule')
}

useSeoMeta({
  title : `Contact`,
  ogSiteName : 'Takdecor - Contact',
  ogType: 'website',
  ogDescription : 'Suport 24/7 cu clientii nostrii. Contacti-ne daca aveti vreo problema',
})

useHead({
    link : [
        {rel: 'dns-prefetch' , href: 'https://dw45vxtt6tooj.cloudfront.net'},
        {rel: 'preconnect' , href: 'https://dw45vxtt6tooj.cloudfront.net'},
    ]
})

definePageMeta({
  layout: 'default',
  middleware: ['locale'],
})





const selectedCurrency = useState('selectedCurrency')
const selectedProduct = ref(null);

const setData = ref({
    numeSetDto : '',
    pretSetDto : 0,
    pretRedusSetDto: 0,
    descriereSetDto: '',
    produsePeSet: [],
    reviewsSet: []
})

const getPercentage = (rating) => {
    const totalReviews = setData.value.reviewsGeneral.totalReviews || 0;
    if (totalReviews === 0) return 0;
    
    const reviewCount = getReviewCount(rating);
    return Math.round((reviewCount / totalReviews) * 100);
};

const heightComp = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return false;
    }
})

const getReviewCount = (rating) => {
    switch (rating) {
        case 5:
            return setData.value.reviewsGeneral.fiveStarsReviews;
        case 4:
            return setData.value.reviewsGeneral.fourStarsReviews;
        case 3:
            return setData.value.reviewsGeneral.threeStarsReviews;
        case 2:
            return setData.value.reviewsGeneral.twoStarsReviews;
        case 1:
            return setData.value.reviewsGeneral.oneStarReviews;
        default:
            return 0;
    }
};

const getSetData =  async () => {
    const responseFromSetDataFetch = await productService.getSetData(encodedIdSet,setName,selectedCurrency.value)
    if(responseFromSetDataFetch === -4){
        navigateTo(localePath('/error/404'))
    }else if(responseFromSetDataFetch === -2){
        navigateTo(localePath('/error/400'))
    }
   
    Object.assign(setData.value , responseFromSetDataFetch)
    console.log(setData.value)
    // Extract all image URLs
    
    useHead({
        title : `Takdecor - ${setData.value.numeSetDto}`,
        link : [
            {rel: 'dns-prefetch' , href: 'https://dw45vxtt6tooj.cloudfront.net'},
            {rel: 'preconnect' , href: 'https://dw45vxtt6tooj.cloudfront.net'},
        ],
        keywords: "seturi de perdele și draperii pentru dormitor, pachete elegante pentru decor interior, seturi de textile pentru casă, seturi de lenjerie și draperii asortate, seturi de amenajare pentru dormitor complet, pachete de lenjerie cu perne și cuverturi, seturi moderne pentru redecorare rapidă, pachete de lux pentru camere de hotel, seturi exclusive pentru design interior, pachete premium pentru casă, seturi de perdele și draperii opace, seturi blackout pentru odihnă optimă, pachete cu perne ergonomice și draperii, seturi termoizolante cu perdele duble, pachete economice cu perdele și cuverturi, seturi de bumbac pentru un somn odihnitor, pachete personalizate pentru dormitor, seturi cu materiale anti-alergice, pachete cu perdele și perne pentru copii, seturi rustice cu perdele și draperii vintage, pachete de lux cu broderii fine, seturi de lenjerie pentru hoteluri și pensiuni, pachete minimaliste pentru apartamente moderne, seturi cu perdele pentru case smart, pachete de decor premium pentru vile, seturi de vară cu perdele răcoroase, pachete de iarnă cu perdele groase, seturi impermeabile cu perdele speciale, pachete de decor pentru spa și centre wellness, seturi elegante pentru reamenajare, pachete de reîmprospătare a casei, seturi de textile anti-mucegai, pachete pentru reamenajare rapidă, seturi exclusive cu țesături de calitate, pachete cu perdele controlate prin aplicație, seturi de redecorare pentru spații comerciale, pachete cu perdele și draperii în stil clasic, seturi de amenajare pentru case de vacanță, pachete pentru birouri și spații moderne, seturi cu perdele și draperii termoizolante, pachete pentru reducerea zgomotului cu draperii fonice, seturi cu perdele decorative pentru living, pachete vintage pentru amenajări rafinate, seturi de perdele și perne anti-praf, pachete exclusive cu materiale eco-friendly, seturi pentru camera copiilor, pachete de lux pentru dormitor matrimonial, seturi de amenajare pentru case smart, pachete cu perdele satinate pentru un look elegant, seturi de textile cu imprimeuri florale, pachete complete pentru protecția solară, seturi cu perdele și draperii ușor de întreținut, seturi de lux pentru dormitor, seturi premium pentru casă, pachete complete pentru decor interior, seturi decorative pentru dormitor, seturi de pat cu perdele și draperii, pachete cu perne și cuverturi, seturi elegante de perdele și draperii, seturi de decor pentru living, seturi complete cu draperii și perdele, seturi moderne pentru amenajarea casei, pachete economice cu perdele și draperii, seturi de design interior pentru hoteluri, pachete de lux cu perdele și cuverturi, seturi de perne și cuverturi din bumbac, seturi termoizolante cu perdele blackout, pachete confortabile pentru dormitor, seturi personalizate cu draperii și perne, seturi pentru sezon rece cu cuverturi călduroase, seturi pentru vară cu perdele răcoroase, seturi anti-alergice cu perne speciale, seturi vintage cu perdele și draperii din catifea, pachete rezistente la pete pentru uz zilnic, seturi smart home cu perdele motorizate, seturi pentru hoteluri cu perne ergonomice, pachete rustice cu draperii și cuverturi, seturi de perne decorative pentru living, seturi premium pentru case de vacanță, seturi lavabile pentru dormitor, pachete eco-friendly cu textile naturale, seturi exclusive pentru design interior, seturi elegante cu perdele și broderie, pachete cu perne, draperii și cuverturi, seturi de amenajare pentru apartamente moderne, seturi cu efect blackout pentru odihnă optimă, pachete de relaxare cu perne și cuverturi moi, seturi pentru spații comerciale și birouri, pachete de lux pentru hoteluri și pensiuni, seturi clasice cu perdele și draperii, seturi pentru dormitor minimaliste, pachete all-in-one pentru reamenajare rapidă, seturi pentru călătorii cu perne compacte, pachete pentru reducerea zgomotului cu draperii fonice, seturi pentru copii cu perdele și perne personalizate, pachete ieftine online pentru reînnoirea casei, seturi exclusive cu țesături premium, curtain and drape sets for bedrooms, elegant bundles for interior decor, home textile sets, bedding and curtain matching sets, full bedroom decor packages, bedding packages with pillows and bedspreads, modern home redecoration sets, luxury hotel room textile bundles, exclusive interior design sets, premium home textile bundles, curtain and drape sets with blackout effect, thermal insulating curtain and drape sets, economic bundles with drapes and bedspreads, cotton bedding sets for ultimate comfort, customized bedroom decor packages, hypoallergenic curtain and pillow sets, kids’ room curtain and pillow packages, rustic home decor bundles with vintage drapes, luxury packages with embroidered curtains, hotel and guesthouse bedding and curtain sets, minimalist decor bundles for modern apartments, smart home curtain packages, premium decor sets for vacation homes, summer-ready curtain and drape sets, winter-ready thick curtain bundles, waterproof curtain and drape sets, spa and wellness textile bundles, elegant redecoration packages, home refresh textile bundles, anti-mold curtain and bedspread sets, quick home makeover sets, exclusive bundles with high-quality fabrics, smart curtain sets with app control, commercial space redecoration packages, classic-style curtain and drape bundles, vacation home decor sets, office and modern space styling bundles, thermal insulating curtain packages, noise-reducing drapery bundles, decorative curtain and pillow sets for living rooms, vintage decor bundles for refined interiors, anti-dust curtain and pillow packages, eco-friendly home textile sets, kids’ bedroom textile sets, luxury bedding and drapery sets for master bedrooms, smart home decoration bundles, satin curtain sets for an elegant look, floral print curtain and bedspread bundles, full sun-protection curtain packages, easy-maintenance curtain and textile sets, modern interior styling bundles, budget-friendly home textile packages, soft and plush pillow and bedding sets, commercial-grade textile bundles for businesses, tailor-made curtain and drapery packages, full house makeover sets with textiles, designer-curated decor bundles, quick-install curtain and bedding packages",
        description : `${setData.value.descriereSetDto}`
    })

    useSeoMeta({
        title : `Contact`,
        ogSiteName : `Takdecor - ${setData.value.numeSetDto}`,
        ogType: 'product',
        ogDescription : `${setData.value.descriereSetDto}`,
    })
}

const getSelectedDimensionForSelectedProduct = computed(() => {
    if(selectedProduct.value !== null){
        return selectedDimensions.value.find(d => d.productName === selectedProduct.value.numeProdusDto)
    }
    
})

const getSelectedColorForSelectedProduct = computed(() => {
    if(selectedProduct.value !== null){
        return selectedColors.value.find(c => c.productName === selectedProduct.value.numeProdusDto)
    }
})

const getSelectedManoperaForSelectedProduct = computed(() => {
    if(selectedProduct.value !== null){
        return selectedManopere.value.find(m => m.productName === selectedProduct.value.numeProdusDto)
    }
})

const screenSize = computed(() => {
    switch (name.value) {
      case 'xs': return {width : 300 , height : 300}
      case 'sm' : return { width :600 , height : 600 }
      default : return { width : 550 , height : 550}
    }
})

const postReview =  async () => {
    const isValidReviewForm = await reviewForm.value?.validate()
    if(isValidReviewForm.valid){
        const formData = new FormData();
        const reviewInfo = {
            textReview: reviewText.value,
            starsReview : stars.value,
            codProdus : null,
            idSet : encodedIdSet
        }
        formData.append('reviewInfo' ,JSON.stringify(reviewInfo) );

        const responseFromPostReview = await productService.postProductReview(formData);

        if(responseFromPostReview === 1){
            swal.fire({
                icon : 'success',
                title: 'Success',
                text  : `${t("sweetAlert2.ReviewPostedSuccesfully")}`,
                timer: 2000
            })
            return;
        }else if(responseFromPostReview === -4){
            navigateTo(localePath('/error/404'))
        }else {
            navigateTo(localePath('/error/400'))
        }

    }else{
        swal.fire({
            icon : 'error',
            title: '',
            text: t('sweetAlert2.CheckForm'),
            timer: 3000
        })
        return;
    }
    
}



const allImages = computed(() => {
    return setData.value.produsePeSet.flatMap(product =>
        product.selectedColors.flatMap(color =>
            color.imaginiProdusDto.map(image => ({
                url: image.presignedUrl,
                productName: product.numeProdusDto,
                colorName: color.numeCuloareDto
            }))
        )
    );
});

const selectImage = ((imageObj) => {
    selectedImage.value = imageObj
})

const selectProduct = (product) => {
    selectedProduct.value = product;
    console.log(selectedProduct.value)
    const savedHeight = prefferedHeights.value.find(
        h => h.productName === selectedProduct.value.numeProdusDto
    );

    currentHeightPreffered.value = savedHeight ? savedHeight.height : '';

};

// info is either a dimension or a color or manopera
const toggleButton = (info, type) => {
    if (type === 'dimension') {
        // Remove any previous selection for the current product
        selectedDimensions.value = selectedDimensions.value.filter(
            selected => selected.productName !== selectedProduct.value.numeProdusDto
        );

        // Add the newly selected dimension
        selectedDimensions.value.push({
            productName: selectedProduct.value.numeProdusDto,
            productId : selectedProduct.value.idProdus,
            dimensionSelected: info
        });
    } else if (type === 'color') {
        // Remove any previous selection for the current product
        selectedColors.value = selectedColors.value.filter(
            selected => selected.productName !== selectedProduct.value.numeProdusDto
        );
        console.log(info)
        // Add the newly selected color
        selectedColors.value.push({
            productName: selectedProduct.value.numeProdusDto,
            productId : selectedProduct.value.idProdus,
            colorSelected: info
        });
    } else if (type === 'manopera'){
        selectedManopere.value = selectedManopere.value.filter(
            selected => selected.productName !== selectedProduct.value.numeProdusDto
        )
        selectedManopere.value.push({
            productName: selectedProduct.value.numeProdusDto,
            productId : selectedProduct.value.idProdus,
            manoperaSelected: info
        });
    }

    console.log("Selected Dimensions:", selectedDimensions.value);
    console.log("Selected Colors:", selectedColors.value);
    console.log("Selected Manopere:", selectedManopere.value);

};
// de terminat manopera cu user height input
// de vazut cum pot sa afisez currentprefferHeight can clientul revine la o selectie anterioara
const savePreferredHeight =  async () => {
    const isValidHeightForm = await heightInputForm.value.validate()
    if(isValidHeightForm.valid){    
        const selectedManopera = selectedManopere.value.find
            (m => m.productName === selectedProduct.value.numeProdusDto)

        if(parseInt(selectedManopera.manoperaSelected.inaltimeMaxima) < parseInt(currentHeightPreffered.value)){
            fireAlarm('top-end' , 'error' , `${t('shopSeturi.heightPrefferedRule')}` , 3500)
            return;
        }

        prefferedHeights.value = prefferedHeights.value.filter(
            h => h.productName !== selectedProduct.value.numeProdusDto
        )
        
        prefferedHeights.value.push({
            productName: selectedProduct.value.numeProdusDto,
            productId : selectedProduct.value.idProdus,
            height : currentHeightPreffered.value
        });

        successSnackBar.value = true;
        setTimeout(() => {
            successSnackBar.value = false
        }, 1500);

        console.log("Preferred Heights:", prefferedHeights.value);


    }else {
        fireAlarm('top-end' , 'error' , `${t('sweetAlert2.CheckForm')}` , 3000)
        return;
    }
    
};


const printManoperaInformation = computed(() => {
    let manoperaInfo = selectedManopere.value.find(m => m.productName === selectedProduct.value.numeProdusDto)
    return manoperaInfo
})

const validateProductsOnSet = (products) => {
    for (const product of products) {
        let findCurrentProductSelectedColor = selectedColors.value.find(c => 
            c.productName === product.numeProdusDto
        );

        if (findCurrentProductSelectedColor === undefined) {
            return {
                flag: false,
                error: `${t('shopSeturi.selectColorForProduct')} ${product.numeProdusDto}`
            };
        }

        if (product.selectedDimensions.length > 0) {
            let findCurrentProductSelectedDimension = selectedDimensions.value.find(c => 
                c.productName === product.numeProdusDto
            );
            if (findCurrentProductSelectedDimension === undefined) {
                return {
                    flag: false,
                    error: `${t('shopSeturi.selectDimensionForProduct')} ${product.numeProdusDto}`
                };
            }
        }

        if (product.selectedManopere.length > 0) {
            let findCurrentProductSelectedManopere = selectedManopere.value.find(c => 
                c.productName === product.numeProdusDto
            );
            if (findCurrentProductSelectedManopere === undefined) {
                return {
                    flag: false,
                    error: `${t('shopSeturi.selectManoperaForProduct')} ${product.numeProdusDto}`
                };
            }

            const findPrefferedHeight  = prefferedHeights.value.find(pf => 
                 pf.productName === product.numeProdusDto
            )

            if(findPrefferedHeight === undefined){
                return {
                    flag: false,
                    error : `${t('shopSeturi.selectHeightPlease')} ${product.numeProdusDto}, manopera : ${findCurrentProductSelectedManopere.manoperaSelected.numeManopera}`
                }
            }
        }


       
    }

    // If no issues were found, return success
    return { flag: true, error: null };
};

const constructFormDataToSend = () => {
    const setOnCartDto = {
        encodedIdSet: encodedIdSet, 
        productsInCart: [],
        currentCurrency : selectedCurrency.value,
        pretCurent: setData.value.pretRedusSetDto > 0 ? setData.value.pretRedusSetDto : setData.value.pretSetDto,

    };

    setData.value.produsePeSet.forEach(product => {
        const selectedColor = selectedColors.value.find(c => c.productName === product.numeProdusDto)?.colorSelected;
       
        const selectedDimension = selectedDimensions.value.find(d => d.productName === product.numeProdusDto)?.dimensionSelected;
        const selectedManopera = selectedManopere.value.find(m => m.productName === product.numeProdusDto)?.manoperaSelected;
        const prefferedHeight = prefferedHeights.value.find(m => m.productName === product.numeProdusDto)?.height
        setOnCartDto.productsInCart.push({
            idProdus: product.idProdus,
            idCuloare: selectedColor.idCuloare,
            idDimensiune: selectedDimension?.idDimensiune,
            idManopera: selectedManopera?.idManopera ,
            prefferedHeight : prefferedHeight
        });
      
    });



    const formData = new FormData();
    formData.append("setItems", JSON.stringify(setOnCartDto));
    // formData.append("setItemsForLocalStorage" , JSON.stringify(localStorageSet))
    formData.append("cartItem" , null)
    return formData;
};

function fireAlarm(position , icon , title , timer){
    swal.fire({
        position: position,
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: timer
    });
}

const updateLocalCart = (() => {
    var getCartCount = localStorage.getItem('cartCount')
    if(getCartCount !== null){
        var updateCart = parseInt(getCartCount)
        updateCart++
        localStorage.setItem('cartCount' , String(updateCart))
        cartCount.value = String(updateCart);
    }else{
        localStorage.setItem('cartCount' , '1');
        cartCount.value = '1'
    }
})

const addOrUpdateCart = (async () => {
    if (!isClicked.value) {
        const validateProducts = validateProductsOnSet(setData.value.produsePeSet)
        if(validateProducts.flag){
            const formToSend = constructFormDataToSend()
           
            const responseFromCartAddingOrUpdating = await productService.addToCart(formToSend);
            if(responseFromCartAddingOrUpdating.status === 200){
                fireAlarm('top-end' , 'success' , `${t('general.addToCart')}` , 1000)
                updateLocalCart()
            }else if(responseFromCartAddingOrUpdating.status === 204){
                fireAlarm('top-end' , 'success' , `${t('general.incrementQuantity')}` , 3000)
                updateLocalCart()
            }else if(responseFromCartAddingOrUpdating.status === 404){
                fireAlarm('top-end' , 'error' , `${t('general.errorOnCartAddingOrUpdating')}` , 3000)
            }else if(responseFromCartAddingOrUpdating.status === 400){
                fireAlarm('top-end' , 'error' , `${t('forgotPassword.error')}` , 3000)
            }else if(responseFromCartAddingOrUpdating.status === 401){
                fireAlarm('top-end' , 'error' , 'Token expired/expirat' , 3000)
                navigateTo(localePath('/user/logout'))
            }
        

            isClicked.value = true;
                setTimeout(() => {
                    isClicked.value = false;
                }, 1000);
        
        }else{
            swal.fire({
                icon: "error",
                title: "Eroare",
                text:  `${validateProducts.error}`,
                showConfirmButton: true,
                timer: 4000
            });
        }
    }
})   


onMounted(async () => {
    await getSetData()
    if(allImages && allImages.value.length > 0){
        selectedImage.value = allImages.value[0]
    }
    if(useCookie('userLoggedIn').value === 1){
        isLoggedIn.value = true;
    }
    isMounted.value = true;
})


</script>


<style>
.button-clicked {
    background-color: #4caf50 !important; /* Green background */
    color: white !important;
    transition: background-color 0.3s ease-in-out;
}

.price-container {
  position: relative;
  display: inline-block;
  margin: 10px 0; /* Add margin for spacing */
}

.discount {
  position: absolute;
  top: -25px; /* Adjust to position the circle above the text */
  left: -30px; /* Adjust to position the circle at the right of the text */
  width: 25%; /* Responsive width */
  height: 25%; /* Responsive height */
  min-width: 38px; /* Minimum width to ensure readability */
  min-height: 35px; /* Minimum height to ensure readability */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px; /* Responsive font size */
  font-weight: bold;
  color: white;
  background-color: red;
  border-radius: 50%;
  z-index: 1; /* Ensure the circle is above other elements */
  opacity: 1;
}

.discount::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.text-above {
  display: block;
  font-size: 1rem;
  margin-top: 5px; /* Space between discount and price */
}
</style>