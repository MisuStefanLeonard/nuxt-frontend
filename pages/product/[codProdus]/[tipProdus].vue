<template>
    <div fluid >
        <v-sheet color="grey-lighten-2" class="p-3" v-if="product.tipulProdusuluiJsonDto">
            <v-row>
                <v-col cols="12" xs="12" md="7" sm="12" class="p-1">
                    <v-card class="bg-grey-lighten-4 h-100" elevation="12">
                        <v-card-text>
                            <v-alert class="text-center my-2" color="blue" variant="tonal" :icon="mdiInformation" >
                                {{ $t('shop.productsImagesShownFor') }} {{ imgColor}}
                            </v-alert>
                            <v-alert v-if="product.pretBazaRedusDto > 0 || selectedDimension.priceDiscount > 0" class="text-center mt-2 mb-2" color="red" variant="flat" :icon="mdiSale">
                                <span v-if="dimensionsLength <= 0" class="font-weight-bold h6">{{ Math.ceil(
                                    ((product.pretBazaDto - product.pretBazaRedusDto) / product.pretBazaDto) * 100
                                ) }}% {{$t('shop.discount')}}</span>
                                <span class="font-weight-bold h6" v-else>
                                    {{ Math.ceil(
                                    ((selectedDimension.price - selectedDimension.priceDiscount) / selectedDimension.price) * 100
                                ) }}% {{$t('shop.discount')}}
                                </span>
                            </v-alert>
                        
                        
                            <v-row v-if="selectedImage">
                                <v-col cols="12" class="text-center">
                                    <v-tooltip :text="`${t('general.zoomImage')}`" v-if="isMounted">
                                        <template v-slot:activator="{props}">
                                            <NuxtImg v-if="selectedImage !== ''"
                                             :src="selectedImage.imageUrl"
                                            preload
                                            v-bind="props"
                                            @click="dialog = true"
                                            format="webp"
                                            sizes="md:800px sm:400px"
                                            :width="screenSize.width"
                                            :height="screenSize.height"
                                            class="cursor-pointer"
                                            ></NuxtImg>
                                            <v-img v-else
                                            src="/notFound.png">
                                                
                                            </v-img>
                                        </template>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                            <v-row v-else>
                                <v-col cols="12" class="text-center">
                                    <v-img
                                        src="/notFound.png" 
                                        class="cursor-pointer"
                                        :aspect-ratio="4 / 3"
                                         >
                                    </v-img>
                                </v-col>
                            </v-row>
                            <v-sheet color="grey-lighten-4" v-if="selectedImage" 
                                    class="mx-auto"  
                                    max-width="350"
                                    >
                                    <v-slide-group v-if="allImages"
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
                                                   <NuxtImg :src="image.imageUrl"
                                                    preload
                                                    format="webp"
                                                    class="mx-5 my-5 w-50"
                                                    sizes="xs:200px"
                                                    @click="() => { toggle(); selectImage(image); }"
                                                        :class="selectedClass " 
                                                        v-bind="props" 
                                                    >
                                                        <div class="d-flex fill-height align-center justify-center">
                                                            <v-scale-transition>
                                                                <v-icon
                                                                    v-if="isSelected"
                                                                    color="white"
                                                                    :icon="mdiCloseCircleOutline"
                                                                    size="24"
                                                                ></v-icon>
                                                            </v-scale-transition>
                                                        </div>
                                                    </NuxtImg>
                                                </template>
                                            </v-tooltip>
                                        </v-slide-group-item>
                                    </v-slide-group>
                                </v-sheet>
                                <v-dialog v-model="dialog" max-width="600">
                                    <v-card>
                                        <v-card-text>
                                            <v-img
                                                :src="selectedImage.imageUrl"
                                                aspect-ratio="16/9"
                                               
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
                            <p class="text-center h3 font-weight-light">{{ product.numeProdusDto }}</p>
                        </v-card-title>
                        <v-card-subtitle class="text-center">
                            <p>* COD : {{ product.codProdusDto }}{{ selectedColor.colorCode || '' }}{{ selectedDimension.width || '' }}</p>
                        </v-card-subtitle>
                        <v-card-text>
                            <div class="my-2">
                                <v-alert class="text-justify" color="blue-darken-4" variant="tonal" :icon="mdiInformation" >
                                    <span class="">{{ $t('shop.colorSelected') }}
                                        <b class="text-black">
                                           
                                            <v-btn color="blue" class="m-1">{{ selectedColor.name || '' }}</v-btn>
                                        </b>
                                    </span>
                                    <span v-if="dimensionsLength > 0">
                                        {{ $t('shop.dimensionSelected') }} 
                                        <b class="text-black">
                                            <v-btn color="green" class="m-1">{{ selectedDimension.width +'x'+ selectedDimension.height || '' }}</v-btn>
                                        </b>
                                    </span>
                                       
                                </v-alert>
                            </div>
                            <div v-if="dimensionsLength > 0">
                                <v-card class="elevation-12 p-1">
                                    <v-card-title class="text-center">
                                        <p class="font-weight-thin h5 ">{{ $t('shop.dimensionAvailable') }}</p>
                                        <p class="font-weight-thin h6">{{ $t('shop.WidthXHeight') }}</p>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row >
                                            <v-col cols="12" v-for="(dimension,index) in product.dimensiuniProdus" :key="index">
                                                <div class="text-center">
                                                    <v-btn height="75"
                                                    variant="elevated"
                                                    block
                                                    :active="activeButtonDimensions === index"
                                                    active-color="green"
                                                    @click="toggleButton(index , 'dimension')"
                                                >
                                                    <v-row>
                                                        <v-col cols="12">
                                                            {{ $t('shop.DIMENSION') }} {{ dimension.lungimeDto }} x {{ dimension.latimeDto }}
                                                        </v-col>
                                                        <v-col cols="12">
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
                            <v-divider opacity="70"></v-divider>
                            <div>
                                <v-card class="elevation-12 p-1">
                                    <v-card-title class="text-center">
                                        <p class="font-weight-thin h5">{{ $t('shop.colorAvailable') }}</p>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" 
                                            v-for="(color,index) in product.culoriProdus"
                                            :key="index">
                                            <div class="text-center">
                                                <v-btn
                                                    variant="elevated"
                                                    block
                                                    :active="activeButtonColors === index"
                                                    active-color="blue"
                                                    @click="toggleButton(index,'color')"
                                                >
                                                    {{ selectedCurrency === "RON" ?  color.numeCuloareJsonDto.culoare_ro : color.numeCuloareJsonDto.culoare_en }}
                                                </v-btn>
                                            </div>
                                            
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </div>
                            <v-divider opacity="70"></v-divider>
                            <div class="my-2 text-center" v-if="product.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.tipulProdusuluiJsonDto.tip_ro === 'draperie'" >
                                <v-alert color="red" :icon="mdiInformation">
                                    <p class="font-weight-bold h6">{{ $t('shop.curtain.maxMaterialHeight') }} {{ product.inaltimeMaximaDto }} {{ currency === "RON" ? "metri" : "meters" }}</p>
                                </v-alert>
                            </div>
                            <div v-if="product.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.tipulProdusuluiJsonDto.tip_ro === 'draperie'">
                                <v-stepper v-model="step" elevation="12" class="mb-6"
                                :mobile="height === true">
                                    <v-stepper-header v-if="selectedOption === 'onlyMaterial' ">
                                        <v-stepper-item
                                            title="Start"
                                            value="1">
                                        </v-stepper-item>
                                        <v-divider></v-divider>
                                        <v-stepper-item
                                            title="Dimensiune"
                                            value="2">
                                        </v-stepper-item>
                                    </v-stepper-header>
                                    <v-stepper-header v-else-if="selectedOption === 'withManufacturing'"
                                    >
                                        <v-stepper-item
                                            title="Start"
                                            value="1">
                                        </v-stepper-item>
                                        <v-divider></v-divider>
                                        <v-stepper-item
                                            title="Dimensiuni"
                                            value="2">
                                        </v-stepper-item>
                                        <v-divider></v-divider>
                                        <v-stepper-item
                                            title="Rejansa"
                                            value="3">
                                        </v-stepper-item>
                                        <v-divider></v-divider>
                                        <v-stepper-item v-if="chosenRejansaType&&chosenRejansaType.sePrindeCuInele"
                                            title="Inele prindere"
                                            value="4">
                                        </v-stepper-item>
                                        <v-divider  v-if="chosenRejansaType&&chosenRejansaType.sePrindeCuInele"></v-divider>
                                        <v-stepper-item
                                            title="Tip linie"
                                            :value="chosenRejansaType&&chosenRejansaType.sePrindeCuInele ? '5' : '4' ">
                                        </v-stepper-item>
                                    </v-stepper-header>
                                        <v-stepper-window  v-if="selectedOption === 'onlyMaterial'">
                                            <v-stepper-window-item value="1">
                                                <div class="text-center" >
                                                    <v-row no-gutters >
                                                        <v-col cols="12" >
                                                            <v-radio-group v-model="selectedOption" color="primary">
                                                                <v-radio :label="$t('shop.curtain.notOnlyMaterial')" value="withManufacturing" />
                                                                <v-radio  :label="$t('shop.curtain.onlyMaterial')" value="onlyMaterial" />
                                                            </v-radio-group>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                            </v-stepper-window-item>
                                        <v-stepper-window-item value="2">
                                            <div  class="text-center">
                                                <v-alert class="my-3" v-if="readyToAddToCart" type="success" variant="flat" >
                                                    {{ $t('shop.curtain.priceListed') }}
                                                </v-alert>
                                                <p class="font-weight-thin h5">
                                                    <b v-if="product.pretBazaRedusDto > 0">
                                                        <p><s>{{ product.pretBazaDto }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}</s></p>
                                                        <div class="price-container">
                                                            <div class="discount">
                                                                {{ Math.ceil(
                                                                    ((product.pretBazaDto - product.pretBazaRedusDto) / product.pretBazaDto) * 100
                                                                ) }}%
                                                            </div>
                                                            <span class="text-above text-error font-weight-bold">
                                                                {{ product.pretBazaRedusDto }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}
                                                            </span>
                                                        </div>
                                                    </b>
                                                    <b v-else>
                                                        {{ product.pretBazaDto }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}
                                                    </b>
                                                </p>
                                                <v-form validate-on="submit" @submit.prevent="submitOnlyWidthForm" ref="onlyWidthForm" class="text-center">
                                                    <v-text-field
                                                    variant="outlined"
                                                    :label="$t('shop.curtain.onlyWidth')" 
                                                    v-model="onlyWidth" 
                                                    counter="10"
                                                    :rules="[rules.onlyNumbers , rules.notEmpty,rules.maxChar(10)]"
                                                    >
                                                    </v-text-field>
                                                    <v-row class="my-4">
                                                        <v-col cols="12">
                                                            <v-btn type="submit"  variant="flat"
                                                            color="green" >
                                                                {{ $t('shop.curtain.finish') }}
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </div>
                                            
                                        </v-stepper-window-item>
                                        <v-stepper-actions 
                                       >
                                            <template v-slot:next="{props}">
                                                    <v-btn variant="outlined" color="green" 
                                                    v-bind="props" @click="checkNextStep()">
                                                        NEXT<v-icon size="24" :icon="mdiArrowRight"></v-icon>
                                                    </v-btn>
                                            </template>
                                            <template v-slot:prev="{props}">
                                               
                                                    <v-btn variant="outlined" color="error" 
                                                v-bind="props" @click="goBack()">
                                                    <v-icon size="24" :icon="mdiArrowLeft"></v-icon>BACK
                                                </v-btn>
                                            
                                            </template>
                                        </v-stepper-actions>
                                    </v-stepper-window>
                                    <v-stepper-window v-else>
                                        <v-stepper-window-item value="1">
                                                <div class="text-center" >
                                                    <v-row no-gutters >
                                                        <v-col cols="12" >
                                                            <v-radio-group v-model="selectedOption" color="primary">
                                                                <v-radio :label="$t('shop.curtain.notOnlyMaterial')" value="withManufacturing" />
                                                                <v-radio  :label="$t('shop.curtain.onlyMaterial')" value="onlyMaterial" />
                                                                
                                                            </v-radio-group>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                            </v-stepper-window-item>
                                        <v-stepper-window-item value="2">
                                            <div class="text-center">
                                                <p class="font-weight-thin h5">
                                                    <b v-if="product.pretBazaRedusDto > 0">
                                                        <p><s>{{ product.pretBazaDto }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}</s></p>
                                                        <div class="price-container">
                                                            <div class="discount">
                                                                {{ Math.ceil(
                                                                    ((product.pretBazaDto - product.pretBazaRedusDto) / product.pretBazaDto) * 100
                                                                ) }}%
                                                            </div>
                                                            <span class="text-above text-error font-weight-bold">
                                                                {{ product.pretBazaRedusDto }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}
                                                            </span>
                                                        </div>
                                                    </b>
                                                    <b v-else>
                                                        {{ product.pretBazaDto }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}
                                                    </b>
                                                </p>
                                                <span class="font-weight-bold">2. {{ $t('shop.curtain.inputWidthAndHeight') }}</span>
                                                <v-row no-gutters >
                                                    <v-col cols="12">
                                                        <v-form ref="widthAndDimensionForm" class="m-1 text-center"
                                                        validate-on="submit" >
                                                            <v-text-field density="compact"
                                                            :label="$t('shop.width')" 
                                                            v-model="prefferedWidth" 
                                                            counter="10"
                                                            :rules="[rules.notEmpty , rules.onlyNumbers , rules.maxChar(10)]" >
                                                            </v-text-field>
                                                        
                                                            <v-text-field density="compact"
                                                            :label="$t('shop.height')"
                                                            counter="10"
                                                            v-model="prefferedHeight" 
                                                            :rules="[rules.notEmpty , rules.onlyNumbers ,  rules.maxChar(10),rules.maxMaterialHeight]" >
                                                            </v-text-field>

                                                            <v-checkbox density="compact"
                                                            :label="$t('shop.pair')"
                                                            v-model="isPair"
                                                            :false-value=false
                                                            :true-value=true 
                                                            >
                                                        
                                                            </v-checkbox>
                                                           
                                                        </v-form>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-stepper-window-item>
                                        <v-stepper-window-item value="3">
                                            <div  class="text-center">
                                                <div class="my-2">
                                                    <span class="font-weight-bold ">3. {{ $t('shop.curtain.chooseRejansaType') }}</span>
                                                </div>
                                                <v-divider></v-divider>
                                                <v-row no-gutters>
                                                    <v-col v-for="(rejansa,index) in product.tipuriRejansa"
                                                    :key="index" cols="6" xs="3" sm="4" class="">
                                                        <div>
                                                            <span class="font-weight-light h6">{{ rejansa.pretTipRejansa }} <b>{{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}</b></span>
                                                        </div>
                                                        <span class="font-weight-light h6"> {{ $t('shop.curtain.incretire')}}: <b>{{ rejansa.incretireRejansa }}</b> </span>
                                                        {{console.log(rejansa)}}
                                                        <v-img eager class="h-100 border-sm ml-1" v-if="rejansa.presignedUrl !== null"
                                                        :aspect-ratio="1 / 1"
                                                         cover
                                                        color="black"
                                                        :src="rejansa.presignedUrl">
                                                            <v-checkbox v-model="chosenRejansaType"
                                                            :value="rejansa"
                                                            density="compact"
                                                            base-color="black"
                                                            color="primary">

                                                            </v-checkbox>
                                                        </v-img>
                                                        <v-img v-else
                                                            :aspect-ratio="1 / 1"
                                                            class="mx-1"
                                                            cover
                                                            color="black"
                                                            src="/notFound.png" >
                                                            <v-checkbox v-model="chosenRejansaType"
                                                                :value="rejansa"
                                                                density="compact"
                                                                base-color="black"
                                                                color="primary">

                                                            </v-checkbox>
                                                        </v-img>
                                                    </v-col>
                                                    
                                                </v-row>
                                                <v-divider opacity="0" ></v-divider>
                                                <v-divider opacity="0" ></v-divider>
                                                <v-divider opacity="0" ></v-divider>
                                            </div>
                                        </v-stepper-window-item>
                                        <v-stepper-window-item v-if="chosenRejansaType&&chosenRejansaType.sePrindeCuInele" :value="chosenRejansaType&&chosenRejansaType.sePrindeCuInele === true ? '4' : '-1'" >
                                            <div  class="text-center">
                                                <div class="my-2">
                                                    <span class="font-weight-bold ">4. {{ $t('shop.curtain.chooseRingType') }}</span>
                                                </div>
                                                <v-divider></v-divider>
                                                <v-row no-gutters>
                                                    <v-col v-for="(ringType,index) in product.tipuriInele"
                                                    :key="index" cols="6" xs="3" sm="4" >
                                                        <v-img eager class="h-100 border-sm ml-1" v-if="ringType.presignedUrl !== null"
                                                        aspect-ratio="1:1"
                                                        cover 
                                                        color="black"
                                                        :src="ringType.presignedUrl">
                                                            <v-checkbox v-model="chosenRingType"
                                                            :value="ringType"
                                                            density="compact"
                                                            base-color="black"
                                                            color="primary">

                                                            </v-checkbox>
                                                        </v-img>
                                                        <v-img v-else
                                                            :aspect-ratio="1 / 1"
                                                            class="mx-1"
                                                            cover
                                                            color="black"
                                                            src="/notFound.png" >
                                                            <v-checkbox v-model="chosenRingType"
                                                                :value="ringType"
                                                                density="compact"
                                                                base-color="black"
                                                                color="primary">

                                                            </v-checkbox>
                                                        </v-img>
                                                    </v-col>
                                                    <v-divider opacity="0" ></v-divider>
                                                    
                                                </v-row>
                                            </div>
                                           
                                        </v-stepper-window-item>
                                        <v-stepper-window-item :value="chosenRejansaType&&chosenRejansaType.sePrindeCuInele === true ? '5' : '4'">
                                            <div  class="text-center">
                                                <div class="my-2">
                                                    <span class="font-weight-bold ">{{ chosenRingType === null ? '4.' : '5.' }} {{ $t('shop.curtain.chooseLiningType') }}</span>
                                                </div>
                                                <v-divider></v-divider>
                                                <v-alert class="mb-2" v-if="readyToAddToCart" type="success" variant="flat" >
                                                    {{ $t('shop.curtain.priceListed') }}
                                                </v-alert>
                                                <v-row no-gutters>
                                                    <v-col v-for="(liningType,index) in product.tipuriLinie"
                                                    :key="index" cols="6" xs="3" sm="4" >
                                                    <span class="font-weight-thin h6">{{ liningType.pretTipCusaturaColt }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}</span>
                                                        <v-img eager class=" border-sm ml-1" v-if="liningType.presignedUrl !== null"
                                                        aspect-ratio="1:1"
                                                        cover 
                                                        :src="liningType.presignedUrl">
                                                            <v-checkbox v-model="chosenLiningType"
                                                            :value="liningType"
                                                            density="compact"
                                                            base-color="black"
                                                            color="primary">

                                                            </v-checkbox>
                                                        </v-img>
                                                        <!-- SETURI SHOP PAGE , SETURI OWN PAGE + CART -->
                                                        <v-img v-else
                                                            :aspect-ratio="1 / 1"
                                                            class="mx-1"
                                                            cover
                                                            color="black"
                                                            src="/notFound.png" >
                                                            <v-checkbox v-model="chosenLiningType"
                                                                :value="liningType"
                                                                density="compact"
                                                                base-color="black"
                                                                color="primary">

                                                            </v-checkbox>
                                                        </v-img>
                                                    </v-col>
                                                    <v-col cols="12" class="text-center  mt-3 pt-4">
                                                        <v-btn type="submit" @click="checkLiningType()" class="my-2 bg-green" >
                                                                {{ $t('shop.curtain.finish') }}<v-icon class="mx-1" size="24" :icon="mdiArrowRight">
                                                                </v-icon>
                                                        </v-btn>
                                                        <v-divider opacity="0" ></v-divider>
                                                    </v-col>
                                                   
                                                </v-row>
                                            </div>
                                        </v-stepper-window-item>
                                        <v-stepper-actions 
                                       >
                                            <template v-slot:next="{props}">
                                                    <v-btn variant="outlined" color="green" 
                                                    v-bind="props" @click="checkNextStep()">
                                                        NEXT<v-icon size="24" :icon="mdiArrowRight"></v-icon>
                                                    </v-btn>
                                            </template>
                                            <template v-slot:prev="{props}">
                                               
                                                    <v-btn variant="outlined" color="error" 
                                                v-bind="props" @click="goBack()">
                                                    <v-icon size="24" :icon="mdiArrowLeft"></v-icon>BACK
                                                </v-btn>
                                            
                                            </template>
                                        </v-stepper-actions>
                                    </v-stepper-window>
                                </v-stepper>
                                
                            </div>
                            <!-- <v-divider></v-divider> -->
                            <v-alert v-if="selectedOption === 'withManufacturing'"  class="my-4 p-2 text-justify"   
                            elevation="12"  >
                                <p class="text-center h6 font-weight-light"  v-if="prefferedWidth !== ''">{{ $t('shop.curtain.railwayWidth') }}: {{ prefferedWidth }}</p>
                                <p class="text-center h6 font-weight-light"  v-if="prefferedHeight !== ''">{{ $t('shop.curtain.heightUntilBottom') }}: {{ prefferedHeight }}</p>
                                <p class="text-center h6 font-weight-light"  v-if="prefferedHeight !== ''">{{ $t('shop.pair') }}: {{ isPair === false ? 'Nu' : 'Da' }}</p>
                                <v-divider></v-divider>
                                <p class="text-center h6 font-weight-light" v-if="chosenRejansaType">{{ $t('shop.curtain.rejansa') }} : {{ selectedCurrency === "RON" ? chosenRejansaType.numeTipRejansaDto.nume_ro : chosenRejansaType.numeTipRejansaDto.nume_en }}</p>
                                <p class="text-center h6 font-weight-light" v-if="chosenRejansaType">{{ $t('shop.curtain.incretire') }} : {{ chosenRejansaType.incretireRejansa }}</p>
                                <v-divider></v-divider>
                                <p class="text-center h6 font-weight-light" v-if="chosenRingType">{{ $t('shop.curtain.rings') }} : {{ selectedCurrency === "RON" ? chosenRingType.culoareInelJsonDto.culoare_ro :  chosenRingType.culoareInelJsonDto.culoare_en}}</p>
                                <v-divider></v-divider>
                                <p class="text-center h6 font-weight-light" v-if="chosenLiningType " >{{ $t('shop.curtain.lineType') }} : {{ selectedCurrency === "RON" ?  chosenLiningType.numeTipCusaturaColtJson.nume_ro : chosenLiningType.numeTipCusaturaColtJson.nume_en }}</p>
                            </v-alert>
                            <div v-if="product.tipulProdusuluiJsonDto.tip_ro !== 'perdea' && product.tipulProdusuluiJsonDto.tip_ro !== 'draperie'" class="text-center">
                                <p v-if="dimensionsLength > 0" class="font-weight-light h5">
                                    <span class="font-weight-thin h5">
                                        <b v-if="selectedDimension.priceDiscount > 0">
                                            <p><s>{{ selectedDimension.price }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</s></p>
                                            <div class="price-container">
                                                <div class="discount">
                                                    {{ Math.ceil(
                                                        ((selectedDimension.price - selectedDimension.priceDiscount) / selectedDimension.price) * 100
                                                    ) }}%
                                                </div>
                                                <span class="text-above text-error font-weight-bold">
                                                    {{ selectedDimension.priceDiscount }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                                                </span>
                                            </div>
                                        </b>
                                        <b v-else>
                                            {{ selectedDimension.price }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}
                                        </b>
                                    </span>
                                </p>
                                <p v-else>{{ product.pretBazaRedusDto > 0 ? product.pretBazaRedusDto : product.pretBaza }}</p>
                            </div>
                            <div v-else class="text-center">
                                <p v-if="!readyToAddToCart" class="font-weight-bold h6 my-2">{{ $t('shop.curtain.priceCalculation') }}</p>
                                <p class="font-weight-bold h6">{{ finalPrice }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                            </div>
                            <div class="mt-2 text-center">
                                <v-btn
                                    :class="{'button-clicked': isClicked}"
                                    variant="flat"
                                    color="primary"
                                    :disabled="(product.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.tipulProdusuluiJsonDto.tip_ro === 'draperie') && !readyToAddToCart"
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
                            <div class="text-center mt-4">
                                
                            </div>
                            <div class="mt-4 text-center">
                                <p class="font-weight-light h6">{{ $t('general.informations') }}</p>
                                <div class="mb-2">
                                    <NuxtLink :to="localePath('/measurement')" prefetch :prefetch-on="{interaction: true}" class="mb-3  text-decoration-none	">
                                    <span class="h5 font-weight-light">{{ $t('general.howToMeasure') }}</span>
                                    </NuxtLink>
                                </div>
                               
                                <span><v-icon class="mr-2" size="24" :icon="mdiPhone"></v-icon>0744959764</span>
                                <br>
                                <span><v-icon class="mr-2" size="24" :icon="mdiEmail"></v-icon>texx@email.com</span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" class="p-1">
                    <p class="font-weight-light text-center h4 my-4">{{ $t('shop.productInfo') }}</p>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" xs="12" sm="6">
                            <section id="infoProdus">
                                <v-card class="h-100">
                                    <v-card-title>
                                        <p class="font-weight-light text-center h5 my-4">{{ $t('shop.generalInfo') }}</p>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="text-center">
                                        <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productType') }}{{ selectedCurrency === "RON" ? product.tipulProdusuluiJsonDto.tip_ro :   product.tipulProdusuluiJsonDto.tip_en}}</p>
                                        <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productName') }}{{ product.numeProdusDto }}</p>
                                        <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productCode') }}{{ product.codProdusDto }}</p>
                                        <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.composition') }}{{ product.compozitieDto }}</p>
                                        <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productReverse') }}{{ product.fataReversibilaDto === true ? t('yes') : t('no') }}</p>
                                        <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.availableOnMoreColors') }}{{ product.culoriProdus?.length > 1 ? t('yes') : t('no') }}</p>
                                        <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.availableOnMoreDimensions') }}{{ product.dimensiuniProdus?.length > 1 ? t('yes') : t('no') }}</p>
                                    </v-card-text>
                                    
                                </v-card>
                            </section>
                            
                        </v-col>
                        <v-col cols="12" xs="12" sm="6">
                            <section id="manufacturer">
                                <v-card class="h-100">
                                    <v-card-title>
                                        <p class="font-weight-light text-center h5 my-4">{{ $t('shop.productGeneralInfo.manufacturer') }}</p>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="text-center h-100">
                                            <p class="font-weight-light h6">{{ product.numeProducatorDto === null ? 'N/A' : product.numeProducatorDto }}</p>
                                    </v-card-text>
                                </v-card>
                            </section>
                           
                        </v-col>
                        <v-col cols="12" xs="12">
                            <section id="categories">
                                <v-card class="h-100">
                                    <v-card-title>
                                        <p class="font-weight-light text-center h5 my-4">{{ $t('shop.categories') }}</p>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="text-center h-100">
                                            <p v-for="(category,index) in product.categoriiProdus"
                                            :key="index"
                                            class="font-weight-light h6">
                                                {{ category }}
                                            </p>
                                    </v-card-text>
                                </v-card>
                            </section>
                            
                        </v-col>
                        <v-col cols="12" xs="12" sm="6">
                            <section id="description">
                                <v-card class="h-100">
                                    <v-card-title>
                                        <p class="font-weight-light text-center h5 my-4">{{ $t('shop.productGeneralInfo.description') }}</p>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="text-center">
                                        <p class="font-weight-light h6">{{ product.descriereDto === null ? 'N/A' : product.descriereDto }}</p>
                                    </v-card-text>
                                </v-card>
                            </section>
                           
                        </v-col>
                        <v-col cols="12" xs="12" sm="6">
                            <section id="productCaring">
                                <v-card class="h-100">
                                    <v-card-title>
                                        <p class="font-weight-light text-center h5 my-4">{{ $t('shop.productGeneralInfo.caring') }}</p>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="text-center">
                                        <p class="font-weight-light h6">{{ product.ingrijireDto === null ? 'N/A' : product.ingrijireDto }}</p>
                                    </v-card-text>
                                </v-card>
                            </section>
                           
                        </v-col>
                    </v-row>
                </v-col>
                <v-divider></v-divider>
                <v-col cols="12" class="p-1">
                    <v-card>
                        <v-card-title class="m-1 text-center">
                            <p class="font-weight-light h5">{{ $t('shop.reviews') }}</p>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card class="p-2 m-2 bg-grey-lighten-4" elevation="6" 
                        v-for="(review,index) in product.reviewsProdus"
                                :key="index">
                            <v-card-text v-if="product.reviewsProdus.length > 0">
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
                <v-divider></v-divider>
                <v-col cols="12" v-if="product.reviewsGeneral">
                    <v-card elevation="24" class="bg-grey-lighten-2 text-center">
                        <v-card-title>
                            <p class="font-weight-thin h3 my-7">{{ $t('general.ratingOverview') }}</p>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <p class="font-weight-light h5"><span class="h1 font-weight-light">{{ product.reviewsGeneral.averageRating }}</span> / 5</p>
                                    <v-rating
                                        hover :length="5"
                                        :size="32"
                                        readonly
                                        half-increments
                                        v-model="product.reviewsGeneral.averageRating"
                                        color="orange-lighten-1"
                                        active-color="primary"
                                        class="ma-2"
                                    ></v-rating>
                                    <p class="font-weight-light h5">{{ product.reviewsGeneral.totalReviews }} {{ $t('general.reviews') }}</p>
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
                                                <v-icon class="mx-3" :icon="mdiStar" size="24"> </v-icon>
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
                <v-col cols="12" v-if="isLoggedIn">
                    <v-form @submit.prevent="postReview" validate-on="submit" ref="reviewForm" class="p-3 m-2 bg-grey-lighten-4 text-center">
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
                    <v-card class="p-2" elevation="12" >
                        <v-card-text>
                            <p class="font-weight-light h5 text-center text-red">{{ $t('textFieldsMessages.mustBeLoggedInForReview') }}</p>
                            <div class="text-center">
                                <v-btn variant="flat" color="primary" @click="navigateTo(localePath('/user/login'))" >
                                    {{ $t('login.logInText') }} <v-icon size="24" :icon="mdiArrowRight"></v-icon>
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" v-if="mostViewedProducts && mostViewedProducts.length > 0">
                    <p class="text-center font-weight-thin h3">{{ $t('general.usersPrefferences') }}</p>
                    <v-sheet elevation="12"
                     class="mx-auto border-sm p-2 ma-1" max-width="100%">
                        <v-slide-group 
                            :show-arrows="height !== true"
                            v-model="activeSlideMostViewedProducts"
                            center-active
                            >
                            <v-slide-group-item 
                             v-for="(product,index) in mostViewedProducts" 
                            
                            :key="index" >
                           
                            <v-tooltip :text="`${t('general.seeProduct')}`"
                             >
                              <template v-slot:activator = "{props}">
                                <div fluid class="text-center mx-5 my-2">
                                    <v-card class="h-100 p-2  bg-grey-lighten-4 elevation-12">
                                        <v-card-title>
                                            <p class="text-center font-weight-light h5 mx-2">{{ product.numeProdusDto }}</p>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            <p class="text-center font-weight-thin h6 mx-2">({{ product.tipulProdusuluiJsonDto.tip_ro }})</p>
                                        </v-card-subtitle>
                                        <v-card-text class="h-100">
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-img  v-if="findFirstColorWithImage(product) !== 'empty'"
                                                        :aspect-ratio="10 / 9"
                                                        
                                                        eager class=" h-75 p-2 cursor-pointer  "
                                                        :alt="`${product.numeProdusDto} + culoare ${product.culoriProdusDto[0].numeCuloareDto}`"
                                                        :src="findFirstColorWithImage(product)" 
                                                        @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiJsonDto.tip_ro}`))" 
                                                        v-bind="props">
                                                    
                                                    </v-img>
                                                    <v-img v-else
                                                        
                                                        :aspect-ratio="10 / 9"
                                                        eager class="h-75 p-2 cursor-pointer "
                                                        :alt="`Image ${product.numeProdusDto}`"
                                                        @click="navigateTo(localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiJsonDto.tip_ro}`))" 
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
                                                        :to="localePath(`/product/${product.codProdusDto}/${product.tipulProdusuluiJsonDto.tip_ro}`)">
                                                        <v-btn variant="flat"
                                                        color="primary">
                                                            {{ $t('shop.seeDetails') }}
                                                            <v-icon class="ml-2" size="24" :icon="mdiArrowRight"></v-icon>
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
           
        </v-sheet>
    </div>
</template>


<script setup>
import { mdiArrowRight,mdiArrowLeft, mdiCheck, mdiCloseCircleOutline, mdiEmail, mdiInformation, mdiPhone, mdiShoppingOutline, mdiStar ,mdiSale} from '@mdi/js';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import productService from '~/services/Products';
import { cartCount } from '~/middleware/cart';

const swal = useNuxtApp().$swal
const route = useRoute();
const productCode = route.params.codProdus
const productType = route.params.tipProdus
const localePath = useLocalePath();
const {t} = useI18n();
const {name} = useDisplay()
const currency = useState('selectedCurrency')
definePageMeta({
//   title : `Texx - ${productCode}`,
  middleware : ['locale'],
  layout: 'default',
  ogType : 'product',
})
const selectedKeywords = ref('');



// Add preload links dynamically

const cuverturiKeyWords = ref(`${productType} de pat, ${productType} premium, ${productType} moderne, ${productType} matrimoniale, ${productType} din bumbac, ${productType} decorative, ${productType} termoizolante, ${productType} matlasate, ${productType} elegante, ${productType} pentru camera copiilor, ${productType} cu imprimeuri, ${productType} din catifea, ${productType} rustice, ${productType} rezistente la spălare, ${productType} rezistente la uzură, ${productType} pentru canapele, ${productType} lavabile, ${productType} pentru sezon rece, ${productType} pentru vară, ${productType} ușoare, ${productType} groase, ${productType} 3D, ${productType} anti-alergice, ${productType} din microfibră, ${productType} pentru hoteluri, ${productType} impermeabile, ${productType} vintage, ${productType} cu model floral, ${productType} pentru dormitor de lux, ${productType} pentru pat de o persoană, ${productType} pentru pat dublu, ${productType} ieftine online, ${productType} de lux, ${productType} personalizate, ${productType} colorate, ${productType} cu broderie, ${productType} anti-mucegai, ${productType} pentru copii, ${productType} pentru bebeluși, ${productType} pentru pensiuni, ${productType} pentru case de vacanță, ${productType} anti-praf, ${productType} hipoalergenice, ${productType} din in, ${productType} din bambus, ${productType} satinate, ${productType} pentru călătorii, ${productType} de colecție, ${productType} pentru design interior, ${productType} scurte, ${productType} lungi, ${productType} personalizabile, ${productType} minimaliste, ${productType} rezistente la pete, ${productType} călduroase pentru iarnă, ${productType} răcoroase pentru vară, ${productType} cu dantelă, bedspreads, luxury bedspreads, modern bedspreads, cotton bedspreads, decorative bedspreads, quilted bedspreads, premium bedspreads, floral bedspreads, mattress covers, elegant bedspreads, hypoallergenic bedspreads, seasonal bedspreads, lightweight summer bedspreads, warm winter bedspreads, embroidered bedspreads, boho bedspreads, vintage bedspreads, patterned bedspreads, minimalist bedspreads, pastel-colored bedspreads, children s bedspreads, baby bedspreads, waterproof bedspreads, hotel-quality bedspreads, soft touch bedspreads, microfiber bedspreads, silk bedspreads, satin bedspreads, reversible bedspreads, double bed bedspreads, single bed bedspreads, discounted bedspreads, eco-friendly bedspreads, custom bedspreads, personalized bedspreads, monochrome bedspreads, handmade bedspreads, rustic bedspreads, tropical bedspreads, bohemian bedspreads, scandinavian bedspreads, exclusive designer bedspreads, bedspreads for home decor, bedspreads for rental properties, bedspreads for vacation homes, antibacterial bedspreads, organic cotton bedspreads, softest bedspreads, thermo-regulating bedspreads, high-quality bedspreads, washable bedspreads, fade-resistant bedspreads, colorful bedspreads, extra-large bedspreads, cozy bedspreads, recycled fabric bedspreads, bedspreads for minimalist interiors, best bedspreads for comfort, cheap bedspreads online, bedspreads with lace details`)


const draperiiKeywords = ref(`${productType} de lux, ${productType} moderne, ${productType} elegante, ${productType} termoizolante, ${productType} opace, ${productType} blackout, ${productType} cu imprimeuri, ${productType} pentru dormitor, ${productType} pentru living, ${productType} pentru bucătărie, ${productType} pentru camera copiilor, ${productType} rustice, ${productType} vintage, ${productType} minimaliste, ${productType} clasice, ${productType} pentru hoteluri, ${productType} pentru pensiuni, ${productType} din catifea, ${productType} din in, ${productType} din bumbac, ${productType} din mătase, ${productType} din poliester, ${productType} lavabile, ${productType} rezistente la soare, ${productType} pentru ferestre mari, ${productType} pentru uși de balcon, ${productType} scurte, ${productType} lungi, ${productType} cu model floral, ${productType} cu dantelă, ${productType} personalizate, ${productType} cu broderie, ${productType} cu rejansă, ${productType} cu inele, ${productType} cu prindere pe șină, ${productType} cu prindere pe galerie, ${productType} rezistente la praf, ${productType} hipoalergenice, ${productType} anti-mucegai, ${productType} pentru izolare fonică, ${productType} pentru design interior, ${productType} de colecție, ${productType} economice, ${productType} premium, ${productType} ieftine online, ${productType} pentru case de vacanță, ${productType} pentru birou, ${productType} pentru spații comerciale, ${productType} pentru restaurante, ${productType} pentru teatre și săli de evenimente, ${productType} pentru sezon rece, ${productType} răcoroase pentru vară, ${productType} călduroase pentru iarnă, ${productType} mate, ${productType} satinate, ${productType} lucioase, ${productType} plisate, ${productType} cu falduri bogate, ${productType} decorative, ${productType} cu modele geometrice, ${productType} cu motive tradiționale, ${productType} cu aspect natural, ${productType} cu textură fină, ${productType} cu textură groasă, ${productType} pentru case smart, ${productType} motorizate, ${productType} controlabile prin aplicație, ${productType} cu iluminare LED integrată, ${productType} din materiale ecologice, ${productType} cu efect de perdea, luxury curtains, modern curtains, elegant curtains, curtains thermal insulating, opaque curtains, blackout curtains, curtains with prints, curtains for bedroom, curtains for living room, curtains for kitchen, curtains for kids' room, rustic curtains, vintage curtains, minimalist curtains, classic curtains, curtains for hotels, curtains for guesthouses, curtains made of velvet, curtains made of linen, curtains made of cotton, curtains made of silk, curtains made of polyester, washable curtains, curtains UV-resistant, curtains for large windows, curtains for balcony doors, short curtains, long curtains, curtains with floral pattern, curtains with lace, curtains personalized, curtains with embroidery, curtains with pleats, curtains with rings, curtains for track mounting, curtains for rod mounting, curtains dust-resistant, curtains hypoallergenic, curtains anti-mold, curtains for sound insulation, curtains for interior design, curtains collectible, curtains budget-friendly, premium curtains, curtains cheap online, curtains for vacation homes, curtains for office, curtains for commercial spaces, curtains for restaurants, curtains for theaters and event halls, curtains for cold seasons, curtains cool for summer, curtains warm for winter, matte curtains, satin curtains, glossy curtains, pleated curtains, curtains with rich folds, decorative curtains, curtains with geometric patterns, curtains with traditional motifs, curtains with natural look, curtains with fine texture, curtains with thick texture, curtains for smart homes, motorized curtains, curtains app-controlled, curtains with integrated LED lighting, curtains made from eco-friendly materials, curtains with sheer effect`)



const perdeleKeywords = ref(`${productType} de lux, ${productType} moderne, ${productType} elegante, ${productType} termoizolante, ${productType} opace, ${productType} blackout, ${productType} cu imprimeuri, ${productType} pentru dormitor, ${productType} pentru living, ${productType} pentru bucătărie, ${productType} pentru camera copiilor, ${productType} rustice, ${productType} vintage, ${productType} minimaliste, ${productType} clasice, ${productType} pentru hoteluri, ${productType} pentru pensiuni, ${productType} din catifea, ${productType} din in, ${productType} din bumbac, ${productType} din mătase, ${productType} din poliester, ${productType} lavabile, ${productType} rezistente la soare, ${productType} pentru ferestre mari, ${productType} pentru uși de balcon, ${productType} scurte, ${productType} lungi, ${productType} cu model floral, ${productType} cu dantelă, ${productType} personalizate, ${productType} cu broderie, ${productType} cu rejansă, ${productType} cu inele, ${productType} cu prindere pe șină, ${productType} cu prindere pe galerie, ${productType} rezistente la praf, ${productType} hipoalergenice, ${productType} anti-mucegai, ${productType} pentru izolare fonică, ${productType} pentru design interior, ${productType} de colecție, ${productType} economice, ${productType} premium, ${productType} ieftine online, ${productType} pentru case de vacanță, ${productType} pentru birou, ${productType} pentru spații comerciale, ${productType} pentru restaurante, ${productType} pentru teatre și săli de evenimente, ${productType} pentru sezon rece, ${productType} răcoroase pentru vară, ${productType} călduroase pentru iarnă, ${productType} mate, ${productType} satinate, ${productType} lucioase, ${productType} plisate, ${productType} cu falduri bogate, ${productType} decorative, ${productType} cu modele geometrice, ${productType} cu motive tradiționale, ${productType} cu aspect natural, ${productType} cu textură fină, ${productType} cu textură groasă, ${productType} pentru case smart, ${productType} motorizate, ${productType} controlabile prin aplicație, ${productType} cu iluminare LED integrată, ${productType} din materiale ecologice, ${productType} cu efect de perdea, luxury drapes, modern drapes, elegant drapes, drapes thermal insulating, opaque drapes, blackout drapes, drapes with prints, drapes for bedroom, drapes for living room, drapes for kitchen, drapes for kids' room, rustic drapes, vintage drapes, minimalist drapes, classic drapes, drapes for hotels, drapes for guesthouses, drapes made of velvet, drapes made of linen, drapes made of cotton, drapes made of silk, drapes made of polyester, washable drapes, drapes UV-resistant, drapes for large windows, drapes for balcony doors, short drapes, long drapes, drapes with floral pattern, drapes with lace, drapes personalized, drapes with embroidery, drapes with pleats, drapes with rings, drapes for track mounting, drapes for rod mounting, drapes dust-resistant, drapes hypoallergenic, drapes anti-mold, drapes for sound insulation, drapes for interior design, drapes collectible, drapes budget-friendly, premium drapes, drapes cheap online, drapes for vacation homes, drapes for office, drapes for commercial spaces, drapes for restaurants, drapes for theaters and event halls, drapes for cold seasons, drapes cool for summer, drapes warm for winter, matte drapes, satin drapes, glossy drapes, pleated drapes, drapes with rich folds, decorative drapes, drapes with geometric patterns, drapes with traditional motifs, drapes with natural look, drapes with fine texture, drapes with thick texture, drapes for smart homes, motorized drapes, drapes app-controlled, drapes with integrated LED lighting, drapes made from eco-friendly materials, drapes with sheer effect`)


const perneKeywords = ref(`${productType} de lux, ${productType} ergonomice, ${productType} ortopedice, ${productType} pentru dormit, ${productType} premium, ${productType} din spumă cu memorie, ${productType} din puf de gâscă, ${productType} anti-alergice, ${productType} cu aloe vera, ${productType} din bumbac, ${productType} din bambus, ${productType} din microfibră, ${productType} lavabile, ${productType} pentru copii, ${productType} pentru bebeluși, ${productType} pentru călătorii, ${productType} cu efect răcoritor, ${productType} pentru suport cervical, ${productType} personalizate, ${productType} decorative, ${productType} pentru canapea, ${productType} pentru pat, ${productType} pentru hoteluri, ${productType} pentru pensiuni, ${productType} pentru sezon rece, ${productType} răcoroase pentru vară, ${productType} moi și pufoase, ${productType} tari și ferme, ${productType} cu broderie, ${productType} cu imprimeuri, ${productType} cu husă detașabilă, ${productType} impermeabile, ${productType} anti-mucegai, ${productType} pentru relaxare, ${productType} vintage, ${productType} minimaliste, ${productType} pentru spa, ${productType} pentru scaune, ${productType} pentru fotolii, ${productType} pentru yoga, ${productType} pentru camping, ${productType} cu spumă cu gel, ${productType} cu lavandă, ${productType} anti-praf, ${productType} din materiale ecologice, ${productType} smart cu senzori, ${productType} controlate prin aplicație, ${productType} ortopedice pentru gât, ${productType} pentru reducerea sforăitului, luxury pillows, ergonomic pillows, orthopedic pillows, pillows for sleeping, premium pillows, memory foam pillows, goose down pillows, anti-allergic pillows, pillows with aloe vera, cotton pillows, bamboo pillows, microfiber pillows, washable pillows, pillows for children, pillows for babies, travel pillows, cooling effect pillows, neck support pillows, personalized pillows, decorative pillows, pillows for sofa, pillows for bed, pillows for hotels, pillows for guesthouses, pillows for cold season, cool pillows for summer, soft and fluffy pillows, firm and hard pillows, pillows with embroidery, pillows with prints, pillows with removable cover, waterproof pillows, anti-mold pillows, relaxation pillows, vintage pillows, minimalist pillows, pillows for spa, pillows for chairs, pillows for armchairs, pillows for yoga, pillows for camping, gel foam pillows, pillows with lavender, dust-resistant pillows, eco-friendly pillows, smart pillows with sensors, app-controlled pillows, orthopedic neck pillows, pillows for snoring reduction`)



const isLoggedIn = ref(false)
const activeButtonDimensions = ref(null);
const activeButtonColors= ref(null);
const stars = ref(0)
const product = ref({});
const reviewForm = ref(null)
const reviewText = ref('')
const selectedCurrency = ref('RON');
const dimensionsLength = ref(0);
const reviewsLen = ref(0);
const selectedOption = ref('onlyMaterial')
const imgColor = ref('')

const selectedImage = ref('')
const dialog = ref(false)
const isMounted = ref(false)
const activeSlide = ref(0)
const step = ref(1)



const showFormOnlyForWidth = ref(false)
const onlyWidthForm = ref(null)
const onlyWidth = ref(0)
const chosenWidthOnlyForMaterial = ref(0);

const prefferedWidth = ref('')
const prefferedHeight = ref('')
const showFormForWidthAndHeight = ref(false)
const widthAndDimensionForm = ref(null)

const chosenRejansaType = ref(null)

const chosenRingType = ref(null)

const chosenLiningType = ref(null)
const readyToAddToCart = ref(false)
const finalPrice = ref(0);

const mostViewedProducts = ref([])
const activeSlideMostViewedProducts = ref(0)


const onlyNums = new RegExp('^[1-9]\\d{0,3}$');

const screenSize = computed(() => {
    switch (name.value) {
      case 'xs': return {width : 300 , height : 300}
      case 'sm' : return { width :500 , height : 500 }
      default : return { width : 550 , height : 550}
    }
})




const rules = {
    notEmpty : value => !!value || t('textFieldsMessages.notEmpty'),
    onlyNumbers : value => onlyNums.test(String(value)) || t('textFieldsMessages.onlyNumbers'),
    maxChar: maxLength => value => !value || value.length <= maxLength || `${t('textFieldsMessages.maxLength')} ${maxLength}`,
    stars : value => value <= 5 && value >=0 || t('textFieldsMessages.starsRule'),
    maxMaterialHeight: value => value <= product.value.inaltimeMaximaDto * 100 || `${t('shop.curtain.maxMaterialHeight') + product.value.inaltimeMaximaDto + ' m'}  `
}

const isPair = ref(false)

const selectedColor = ref({
    idCuloare: 0,
    name : '',
    colorCode: '',
    imgUrl : ''
})
const selectedDimension = ref({
    idDimensiune: 0,
    width: '',
    height: '',
    price: 0,
    priceDiscount: 0,
})
const filteredImages = ref([])
const isClicked = ref(false);

const height = computed(() => {
    switch (name.value) {
      case 'xs': return true
      case 'sm' : return false
      case 'md' : return true
      default : return 3
    }
})

const allImages = computed(() => {
    if(product.value){
        if (!product.value.culoriProdus){
            console.log('no colors found')
            return [];
        }
        // Group images by color
       
        return product.value.culoriProdus.flatMap(color => 
            color.imaginiProdusDto.map(image => ({
                imageUrl: image.presignedUrl,
                colorName: selectedCurrency.value === "RON" ? color.numeCuloareJsonDto.culoare_ro :  color.numeCuloareJsonDto.culoare_en
            }))
        );
    }
   
});


const findFirstColorWithImage = ((product) => {
    if(product.culoriProdusDto.length === 0){
        return 'empty'
    }

    var colorWithImageURL = product.culoriProdusDto[0].imaginiProdusDto[0].presignedUrl;
    return colorWithImageURL;
})




const getPercentage = (rating) => {
    const totalReviews = product.value.reviewsGeneral.totalReviews || 0;
    if (totalReviews === 0) return 0;
    
    const reviewCount = getReviewCount(rating);
    return Math.round((reviewCount / totalReviews) * 100);
};

const getReviewCount = (rating) => {
    switch (rating) {
        case 5:
            return product.value.reviewsGeneral.fiveStarsReviews;
        case 4:
            return product.value.reviewsGeneral.fourStarsReviews;
        case 3:
            return product.value.reviewsGeneral.threeStarsReviews;
        case 2:
            return product.value.reviewsGeneral.twoStarsReviews;
        case 1:
            return product.value.reviewsGeneral.oneStarReviews;
        default:
            return 0;
    }
};



function filterImagesByColor(color) {
    const colorData = selectedCurrency.value === "RON" ? product.value.culoriProdus.find(c => c.numeCuloareJsonDto.culoare_ro === color) :  product.value.culoriProdus.find(c => c.numeCuloareJsonDto.culoare_en === color);
    filteredImages.value = colorData ? colorData.imaginiProdusDto.map(image => ({
        imageUrl: image.presignedUrl,
    })) : [];
}

const selectImage = ((imageObj) => {
    selectedImage.value = imageObj
    imgColor.value = selectedImage.value.colorName
})

const constructFormDataToSend = () => {
    const materialNeededMeters = product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie'
        ? onlyWidth.value === 0
             ? (prefferedWidth.value / 100)  * chosenRejansaType.value.incretireRejansa
             : (onlyWidth.value / 100)
        : -11;
   
    var itemToPushInCart = {
        idProdus: product.value.idProdus,
        idCuloare: selectedColor.value.idCuloare,
        idDimensiune: selectedDimension.value.idDimensiune === 0 ? null : selectedDimension.value.idDimensiune,
        lungimeSina : product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie' ? 
                chosenRejansaType.value !== null ?  prefferedWidth.value : null
                : 'notPerdeaOrDraperie'
           , // only material was selected
        inaltime : product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie' ? 
                chosenRejansaType.value !== null ?  prefferedHeight.value : null
                : 'notPerdeaOrDraperie', // only material was selected
        perechePerdea : product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie' ? 
            chosenRejansaType.value !== null ? isPair.value : null
            : 'notPerdeaOrDraperie',//  only maaterial was selected
        idRejansa : chosenRejansaType.value === null ? -11 : chosenRejansaType.value.idRejansa, // if null 
        idInelPrindere : chosenRingType.value === null? -11:  chosenRingType.value.idInelPrindere, // if null
        idTipLinie: chosenLiningType.value === null ? -11 : chosenLiningType.value.idTipLinie, // if null
        materialFolosit : materialNeededMeters,
        pretCurentTipLinie : chosenLiningType.value === null ? -11 : chosenLiningType.value.pretTipCusaturaColt ,
        pretCurentTipGalerie : chosenRejansaType.value === null ? -11 : chosenRejansaType.value.pretTipRejansa,
        currentCurrency : selectedCurrency.value,
        pretCurent : product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie' 
                ? finalPrice.value : dimensionsLength.value > 0 ? 
                    (selectedDimension.value.priceDiscount > 0 ? 
                        selectedDimension.value.priceDiscount : selectedDimension.value.price)
                    :  product.value.pretBazaRedusDto > 0 ?
                            product.value.pretBazaRedusDto : product.value.pretBazaDto
    }
   

    const formData = new FormData();
    formData.append("cartItem", JSON.stringify(itemToPushInCart));
    formData.append("setItems" , null)
    return formData;
};


function validateProduct(){
    if(product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie'){
        if(onlyWidth.value === 0){
            if(chosenRejansaType.value === null){
                return {
                    flag: false,
                    error : `${t('general.forgotRejansa')}`
                }
            }

            if(chosenRejansaType.value.sePrindeCuInele === true){
                if(chosenRingType.value === null){
                    return {
                        flag: false,
                        error : `${t('general.forgotRingType')}`
                    }
                }
            }

            if(chosenLiningType.value === null){
                return {
                    flag: false,
                    error : `${t('general.forgotLiningType')}`
                }
            }

            return {
                flag: true,
                error : 'none'
            }
        }

        return {
            flag : true,
            error : 'none'
        }
    }

    return {
        flag : true,
        error : 'none'
    }
}

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
        var updateCart = parseInt(getCartCount);
        updateCart++
        localStorage.setItem('cartCount' , String(updateCart))
        cartCount.value = String(updateCart)
    }else{
        localStorage.setItem('cartCount' , '1');
        cartCount.value = '1'
    }
})


const addOrUpdateCart = (async () => {
    if (!isClicked.value) {
        const validation = validateProduct()
        if(validation.flag !== false){
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
                text:  `${validation.error}`,
                showConfirmButton: true,
                timer: 4000
            });
        }
    }
})   

const getCurrentLocale = () => {
  const currentLanguage = useCookie('i18n_redirected').value;
  if(currentLanguage === 'ro') {
    selectedCurrency.value = 'RON'
  }else if(currentLanguage === 'en'){
    selectedCurrency.value = "EUR"
  }
}


function toggleButton(index, type) {
    if (type === 'dimension') {
        activeButtonDimensions.value = index;
        selectedDimension.value = {
            idDimensiune : product.value.dimensiuniProdus[index].idDimensiune,
            width: product.value.dimensiuniProdus[index].lungimeDto,
            height: product.value.dimensiuniProdus[index].latimeDto,
            price :  product.value.dimensiuniProdus[index].pretDto,
            priceDiscount:  product.value.dimensiuniProdus[index].pretRedusDto
        }
       
    } else if (type === 'color') {
       
        activeButtonColors.value = index;
        selectedColor.value.idCuloare = product.value.culoriProdus[index].idCuloare
        selectedColor.value.name = selectedCurrency.value === "RON" ?  product.value.culoriProdus[index].numeCuloareJsonDto.culoare_ro 
            :  product.value.culoriProdus[index].numeCuloareJsonDto.culoare_en 
        selectedColor.value.colorCode = product.value.culoriProdus[index].codCuloareDto
        if(product.value.culoriProdus[index].imaginiProdusDto.length > 0){
            selectedColor.value.imgUrl = product.value.culoriProdus[index].imaginiProdusDto[0].presignedUrl
        }
        if(allImages&&allImages.value){
            selectedImage.value = allImages.value.find(img => img.colorName === selectedColor.value.name)
        }
       
    }
}

const getProductData = async () => {
    const response = await productService.getProductData(productCode,productType , selectedCurrency.value);
    if(response === -4){
        navigateTo(localePath('/error/404')) // not found
    }else if(response === -2){
        navigateTo(localePath('/error/400'))
    }
   

    Object.assign(product.value , response)
   
    if (product.value.culoriProdus && product.value.culoriProdus.length > 0) {
        // Set the default color as the first color available
        selectedColor.value = {
           idCuloare : product.value.culoriProdus[0].idCuloare,
           name : selectedCurrency.value === "RON" ?  product.value.culoriProdus[0].numeCuloareJsonDto.culoare_ro :  product.value.culoriProdus[0].numeCuloareJsonDto.culoare_en,
           colorCode: product.value.culoriProdus[0].codCuloareDto,
           imgUrl : product.value.culoriProdus[0].imaginiProdusDto.length > 0 ?
             product.value.culoriProdus[0].imaginiProdusDto[0].presignedUrl : ''
        };
        activeButtonColors.value = 0;
       
        filterImagesByColor(selectedColor.value.name);
    }
    if(product.value.dimensiuniProdus && product.value.dimensiuniProdus.length > 0){
        dimensionsLength.value = product.value.dimensiuniProdus.length;
        selectedDimension.value = { 
            idDimensiune : product.value.dimensiuniProdus[0].idDimensiune,
            width: product.value.dimensiuniProdus[0].lungimeDto,
            height: product.value.dimensiuniProdus[0].latimeDto,
            price :  product.value.dimensiuniProdus[0].pretDto,
            priceDiscount:  product.value.dimensiuniProdus[0].pretRedusDto
        }
        activeButtonDimensions.value = 0;
       
    }
    if(product.value.reviewsProdus){
        reviewsLen.value = product.value.reviewsProdus.length
    }

    if(product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea'){
        selectedKeywords.value = perdeleKeywords.value;
    }else if(product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie'){
        selectedKeywords.value = draperiiKeywords.value;
    }else if(product.value.tipulProdusuluiJsonDto.tip_ro === 'cuvertura'){
        selectedKeywords.value = cuverturiKeyWords.value;
    }else if(product.value.tipulProdusuluiJsonDto.tip_ro === 'perna'){
        selectedKeywords.value = perneKeywords.value;
    }else{
        selectedKeywords.value = perdeleKeywords.value + draperiiKeywords.value + cuverturiKeyWords.value + perneKeywords.value
    }

   
    
}



const postReview =  async () => {
    const isValidReviewForm = await reviewForm.value?.validate()
    if(isValidReviewForm.valid && stars.value > 0){
        const formData = new FormData();
        const reviewInfo = {
            textReview: reviewText.value,
            starsReview : stars.value,
            codProdus : product.value.codProdusDto,
            idSet : null
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
            navigateTo(localePath('/error/NotFound'))
        }else {
            navigateTo(localePath('/user/logout'))
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


const submitOnlyWidthForm =  async () => {
    const isValidForm = await onlyWidthForm.value.validate();
    if(isValidForm.valid){
        chosenWidthOnlyForMaterial.value = onlyWidth.value / 100;
        finalPrice.value = chosenWidthOnlyForMaterial.value * (product.value.pretBazaRedusDto > 0 ? product.value.pretBazaRedusDto : product.value.pretBazaDto)
        readyToAddToCart.value = true;
        chosenRejansaType.value = null
        chosenRingType.value = null
        chosenLiningType.value = null
        prefferedWidth.value = 0
        prefferedHeight.value = 0
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

const checkStepFunction = async () => {
     if (step.value === 1) {
        if(selectedOption.value === 'onlyMaterial'){
            showFormOnlyForWidth.value = true;
        }else {
            showFormForWidthAndHeight.value = true;
            onlyWidth.value = 0
        }
        if (showFormOnlyForWidth.value === true) {
            const isValidForm = await onlyWidthForm.value.validate();
            if (!isValidForm.valid) {
                swal.fire({
                    icon: "error",
                    title: "",
                    text: t("sweetAlert2.CheckForm"),
                    timer: 3000
                });
                return false;
            }
        } else if (showFormForWidthAndHeight.value === true) {
            const isValidForm = await widthAndDimensionForm.value.validate();
            if (!isValidForm.valid) {
                swal.fire({
                    icon: "error",
                    title: "",
                    text: t("sweetAlert2.CheckForm"),
                    timer: 3000
                });
                return false;
            }
        }
        return true;
    } else if (step.value === 2) {
        // Step 2: Validate Rejansa Selection
        if (!chosenRejansaType.value) {
            swal.fire({
                icon: "error",
                title: "",
                text: t("sweetAlert2.Select"),
                timer: 3000
            });
            return false;
        }
        return true;
    } else if (step.value === 3 && chosenRejansaType.value?.sePrindeCuInele) {
        // Step 3: Validate Ring Type Selection (if applicable)
        if (!chosenRingType.value) {
            swal.fire({
                icon: "error",
                title: "",
                text: t("sweetAlert2.Select"),
                timer: 3000
            });
            return false;
        }
        return true;
    } else if (step.value === 4 || (!chosenRejansaType.value?.sePrindeCuInele && step.value === 3)) {
        // Step 4: Validate Lining Type Selection
        if (!chosenLiningType.value) {
            swal.fire({
                icon: "error",
                title: "",
                text: t("sweetAlert2.Select"),
                timer: 3000
            });
            return false;
        }
       
        return true;
    }
    return true;
};


const checkNextStep = async () => {
    const isStepValid = await checkStepFunction();
    if(isStepValid){
        step.value++;
        console.log('dupa' , step.value)
    }
};



const checkLiningType =  () => {
    if(chosenLiningType.value !== null){
        readyToAddToCart.value = true
        const widthInMeters = prefferedWidth.value / 100 ;
        const materialNeededMeters = widthInMeters * chosenRejansaType.value.incretireRejansa;
        finalPrice.value = materialNeededMeters * (product.value.pretBazaRedusDto > 0 ? product.value.pretBazaRedusDto : product.value.pretBazaDto)
            + materialNeededMeters * (chosenRejansaType.value.pretTipRejansa)
            + materialNeededMeters * (chosenLiningType.value.pretTipCusaturaColt) 
    }else{
        swal.fire({
            icon : 'error',
            title: '',
            text: t('sweetAlert2.Select'),
            timer: 3000
        })
        return;
    }
}


const goBack = () => {
    if(step.value === 2){
        onlyWidth.value = 0;
    }
    finalPrice.value = 0;
    readyToAddToCart.value = false
    step.value--;

}


const getMostViewedProducts = async () => {
   
    const responseFromMostViewedProducts = await productService.getMostViewedProducts(currency.value)
    mostViewedProducts.value = responseFromMostViewedProducts;
  
}

onMounted(async () => {
    if(useCookie('userLoggedIn').value === 1){
        isLoggedIn.value = true;
    }
   getCurrentLocale()
   await getProductData()
   if(allImages && allImages.value && allImages.value[0]){
        selectedImage.value = allImages.value[0]
        imgColor.value = allImages.value[0].colorName
   }
   getMostViewedProducts()
   isMounted.value = true
})



useHead({
    title : `Texx - ${productCode}`,
    link : [
        {rel: 'dns-prefetch' , href: 'https://dw45vxtt6tooj.cloudfront.net'},
        {rel: 'preconnect' , href: 'https://dw45vxtt6tooj.cloudfront.net'},
    ],
    keywords : selectedKeywords.value,
    siteName : `Texx - ${productCode}`,
    canonicalUrl : `http://localhost:3000/${productCode}/${productType}`,
    ogDescription : `${product.value.descriereDto}`,
    description : `${product.value.descriereDto}`
})

</script>

<style scoped>
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