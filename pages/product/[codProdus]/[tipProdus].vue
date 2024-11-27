<template>
    <div fluid>
        <v-sheet color="grey-lighten-2" class="p-3">
            <v-row>
                <v-col cols="12" xs="12" md="7" sm="12" class="p-1">
                    <v-card class="bg-grey-lighten-4 h-100" elevation="12">
                        <v-card-text>
                            <v-alert class="text-center" color="blue" variant="tonal" icon="mdi-information">
                                {{ $t('shop.productsImagesShownFor') }} {{ selectedColor.name}}
                            </v-alert>
                            <v-alert v-if="product.pretBazaRedusDto > 0 || selectedDimension.priceDiscount > 0" class="text-center mt-2 mb-2" color="red" variant="flat" icon="mdi-sale">
                                <span v-if="dimensionsLength <= 0" class="font-weight-bold h6">{{ Math.ceil(
                                    ((product.pretBazaDto - product.pretBazaRedusDto) / product.pretBazaDto) * 100
                                ) }}% {{$t('shop.discount')}}</span>
                                <span class="font-weight-bold h6" v-else>
                                    {{ Math.ceil(
                                    ((selectedDimension.price - selectedDimension.priceDiscount) / selectedDimension.price) * 100
                                ) }}% {{$t('shop.discount')}}
                                </span>
                            </v-alert>
                        
                            <div height="auto">
                                <v-row>
                                    <v-col cols="12" class="text-center">
                                        <v-img
                                        :src="selectedImage.imageUrl" 
                                        eager 
                                        :aspect-ratio="4 / 3"
                                        @click="dialog = true">
                                            
                                        </v-img>
                                    </v-col>
                                </v-row>
                                
                                <v-row >
                                    <v-col v-for="(image, productIndex) in allImages" :key="productIndex" :cols="height" >
                                        <v-tooltip :text="`${t('general.selectImage')}`">
                                            <template v-slot:activator="{ props }">
                                                <v-img
                                                    eager
                                                    cover
                                                    :aspect-ratio="1 / 1"
                                                    :src="image.imageUrl"
                                                    @click="selectImage(image)"
                                                    class="cursor-pointer" 
                                                    v-bind="props" >
                                                </v-img>
                                            </template>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                                
                                <v-dialog v-model="dialog" max-width="600">
                                    <v-card>
                                        <v-card-text>
                                            <v-img
                                                :src="selectedImage.imageUrl"
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
                            </div>

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
                                <v-alert class="text-justify" color="blue-darken-4" variant="tonal" icon="mdi-information">
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
                                <div class="text-center">
                                    <p class="font-weight-thin h5 ">{{ $t('shop.dimensionAvailable') }}</p>
                                    <p class="font-weight-thin h6">{{ $t('shop.WidthXHeight') }}</p>
                                </div>
                                <v-divider></v-divider>
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
                            </div>
                            <v-divider></v-divider>
                            <div>
                                <div class="text-center">
                                    <p class="font-weight-thin h5">{{ $t('shop.colorAvailable') }}</p>
                                </div>
                                <v-divider></v-divider>
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
                                            {{ color.numeCuloareDto }}
                                        </v-btn>
                                    </div>
                                    
                                    </v-col>
                                </v-row>
                            </div>
                            <v-divider></v-divider>
                            <div v-if="product.tipulProdusuluiDto === 'perdea' || product.tipulProdusuluiDto === 'draperie'">
                                <div class="text-center" v-if="showFormForOnlyMaterial">
                                    <v-row no-gutters >
                                        <v-col cols="12" >
                                            <v-checkbox 
                                                color="red"
                                                v-model="withManufacturing"
                                          
                                                :label="$t('shop.curtain.notOnlyMaterial')"
                                                :true-value="true"
                                                :false-value="false"
                                                density="compact" >
                                            </v-checkbox>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-checkbox 
                                                color="primary"
                                                v-model="onlyMaterial"
                                               
                                                :label="$t('shop.curtain.onlyMaterial')"
                                                :true-value="true"
                                                :false-value="false"
                                                density="compact">
                                            </v-checkbox>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn class="bg-green mt-2" variant="flat"
                                                @click="nextFormFromStart" >
                                                {{$t('shop.next')}}<v-icon class="mx-1">mdi-arrow-right
                                                            </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-if="showFormOnlyForWidth" class="text-center">
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
                                        counter="4"
                                        :rules="[rules.onlyNumbers , rules.notEmpty,rules.maxChar(4)]"
                                        >
                                        </v-text-field>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-btn type="submit" variant="flat" class="bg-green"
                                                >
                                                    {{ $t('shop.curtain.finish') }}<v-icon class="mx-1">mdi-arrow-right
                                                            </v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-btn variant="flat" class="bg-red"
                                                @click="goBack('0')">
                                                    {{ $t('shop.curtain.back') }}<v-icon class="mx-1">mdi-arrow-left
                                                            </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </div>
                                <div v-if="showFormForWidthAndHeight" class="text-center">
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
                                    <span class="font-weight-bold">1. {{ $t('shop.curtain.inputWidthAndHeight') }}</span>
                                    <v-row no-gutters >
                                        <v-col cols="12">
                                            <v-form ref="widthAndDimensionForm" class="m-1 text-center"
                                            validate-on="submit" @submit.prevent="toRejansaType">
                                                <v-text-field density="compact"
                                                :label="$t('shop.width')" 
                                                v-model="prefferedWidth" 
                                                counter="4"
                                                :rules="[rules.notEmpty , rules.onlyNumbers , rules.maxChar(4)]" >
                                                </v-text-field>
                                               
                                                <v-text-field density="compact"
                                                :label="$t('shop.height')"
                                                counter="4"
                                                v-model="prefferedHeight" 
                                                :rules="[rules.notEmpty , rules.onlyNumbers ,  rules.maxChar(4)]" >
                                                </v-text-field>

                                                <v-checkbox density="compact"
                                                :label="$t('shop.pair')"
                                                v-model="isPair"
                                                :false-value=false
                                                :true-value=true 
                                                 >
                                               
                                                </v-checkbox>
                                                
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-btn type="submit" class="my-2 bg-green" >
                                                            {{ $t('shop.next') }}<v-icon class="mx-1">mdi-arrow-right
                                                            </v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-btn type="submit" @click="goBack('0')" class="my-2 bg-red" >
                                                                {{ $t('shop.curtain.back') }}<v-icon class="mx-1">mdi-arrow-left
                                                                </v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                               
                                            </v-form>
                                        </v-col>
                                    </v-row>
                                </div>
                           
                                <div v-else-if="showRejansaTypeSelect" class="text-center">
                                    <div class="my-2">
                                        <span class="font-weight-bold ">2. {{ $t('shop.curtain.chooseRejansaType') }}</span>
                                    </div>
                                    <v-divider></v-divider>
                                    <v-row no-gutters>
                                        <v-col v-for="(rejansa,index) in product.tipuriRejansa"
                                        :key="index" cols="6" xs="6" sm="6" class="">
                                            <div>
                                                <span class="font-weight-light h6">{{ rejansa.pretTipRejansa }} <b>{{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}</b></span>
                                            </div>
                                            <span class="font-weight-light h6"> {{ $t('shop.curtain.incretire')}}: <b>{{ rejansa.incretireRejansa }}</b> </span>
                                            <v-img eager class="h-100 border-sm ml-1"
                                            aspect-ratio="1:1"
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
                                        </v-col>
                                        <v-col cols="12" class="text-center mt-10 pt-4">
                                            <v-btn type="submit" @click="checkRejansaType()" class="my-2 bg-green" >
                                                    {{ $t('shop.next') }}<v-icon class="mx-1">mdi-arrow-right
                                                    </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12" class="text-center">
                                            <v-btn type="submit" @click="goBack('1')" class="my-2 bg-red" >
                                                    {{ $t('shop.curtain.back') }}<v-icon class="mx-1">mdi-arrow-left
                                                    </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-else-if="showRingTypeSelect" class="text-center">
                                    <div class="my-2">
                                        <span class="font-weight-bold ">3. {{ $t('shop.curtain.chooseRingType') }}</span>
                                    </div>
                                    <v-divider></v-divider>
                                    <v-row no-gutters>
                                        <v-col v-for="(ringType,index) in product.tipuriInele"
                                        :key="index" cols="6" xs="6" sm="4" >
                                            <v-img eager class="h-100 border-sm ml-1"
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
                                        </v-col>
                                        <v-col cols="12" class="text-center  mt-3 pt-4 ">
                                            <v-btn type="submit" @click="checkRingType()" class="my-2 bg-green" >
                                                    {{ $t('shop.next') }}<v-icon class="mx-1">mdi-arrow-right
                                                    </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12" class="text-center">
                                            <v-btn type="submit" @click="goBack('2')" class="my-2 bg-red" >
                                                    {{ $t('shop.curtain.back') }}<v-icon class="mx-1">mdi-arrow-left
                                                    </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-else-if="showLiningTypeSelect" class="text-center">
                                    <div class="my-2">
                                        <span class="font-weight-bold ">{{ chosenRingType === null ? '3.' : '4.' }} {{ $t('shop.curtain.chooseLiningType') }}</span>
                                    </div>
                                    <v-divider></v-divider>
                                    <v-alert class="mb-2" v-if="readyToAddToCart" type="success" variant="flat" >
                                        {{ $t('shop.curtain.priceListed') }}
                                    </v-alert>
                                    <v-row no-gutters>
                                        <v-col v-for="(liningType,index) in product.tipuriLinie"
                                        :key="index" cols="6" xs="6" sm="4" >
                                        <span class="font-weight-thin h6">{{ liningType.pretTipCusaturaColt }} {{ selectedCurrency === 'RON' ? 'RON/METRU' : 'EUR/METER' }}</span>
                                            <v-img eager class="h-100 border-sm ml-1"
                                            aspect-ratio="1:1"
                                            cover 
                                            color="black"
                                            :src="liningType.presignedUrl">
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
                                                    {{ $t('shop.curtain.finish') }}<v-icon class="mx-1">mdi-arrow-right
                                                    </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12" class="text-center">
                                            <v-btn type="submit" @click="goBack('2')" class="my-2 bg-red" >
                                                    {{ $t('shop.curtain.back') }}<v-icon class="mx-1">mdi-arrow-left
                                                    </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                            </div>
                            <v-divider></v-divider>
                            <v-alert v-if="!onlyMaterial && withManufacturing"  class="my-4 p-2 text-justify"   
                            border-color="success" elevation="12" border >
                                <p class="text-center h6 font-weight-light"  v-if="prefferedWidth !== ''">{{ $t('shop.curtain.railwayWidth') }}: {{ prefferedWidth }}</p>
                                <p class="text-center h6 font-weight-light"  v-if="prefferedHeight !== ''">{{ $t('shop.curtain.heightUntilBottom') }}: {{ prefferedHeight }}</p>
                                <p class="text-center h6 font-weight-light"  v-if="prefferedHeight !== ''">{{ $t('shop.pair') }}: {{ isPair === false ? 'Nu' : 'Da' }}</p>
                                <v-divider></v-divider>
                                <p class="text-center h6 font-weight-light" v-if="chosenRejansaType !== null">{{ $t('shop.curtain.rejansa') }} : {{ chosenRejansaType.numeTipRejansa }}</p>
                                <p class="text-center h6 font-weight-light" v-if="chosenRejansaType !== null">{{ $t('shop.curtain.incretire') }} : {{ chosenRejansaType.incretireRejansa }}</p>
                                <v-divider></v-divider>
                                <p class="text-center h6 font-weight-light" v-if="chosenRingType !== null">{{ $t('shop.curtain.rings') }} : {{ chosenRingType.numeTipInel }}</p>
                                <p class="text-center h6 font-weight-light" v-if="chosenLiningType !== null" >{{ $t('shop.curtain.lineType') }} : {{ chosenLiningType.numeTipCusaturaColt }}</p>
                            </v-alert>
                            <div v-if="product.tipulProdusuluiDto !== 'perdea' && product.tipulProdusuluiDto !== 'draperie'" class="text-center">
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
                                <p v-if="!readyToAddToCart" class="font-weight-bold h6">{{ $t('shop.curtain.priceCalculation') }}</p>
                                <p class="font-weight-bold h6">{{ finalPrice }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR' }}</p>
                            </div>
                            <div class="mt-2 text-center">
                                <v-btn
                                    :class="{'button-clicked': isClicked}"
                                    variant="flat"
                                    color="primary"
                                    :disabled="(product.tipulProdusuluiDto === 'perdea' || product.tipulProdusuluiDto === 'draperie') && !readyToAddToCart"
                                    @click="handleClick"
                                >
                                    <template v-if="!isClicked">
                                        {{ $t('shop.addToCart') }}
                                        <v-icon class="mx-1">mdi-shopping-outline</v-icon>
                                    </template>
                                    <template v-else>
                                        <v-icon class="mx-1">mdi-check</v-icon>
                                    </template>
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" class="p-1">
                    <p class="font-weight-light text-center h4 my-4">{{ $t('shop.productInfo') }}</p>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" xs="12" sm="6">
                            <v-card class="h-100">
                                <v-card-title>
                                    <p class="font-weight-light text-center h5 my-4">{{ $t('shop.generalInfo') }}</p>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="text-center">
                                    <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productType') }}{{ product.tipulProdusuluiDto }}</p>
                                    <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productName') }}{{ product.numeProdusDto }}</p>
                                    <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productCode') }}{{ product.codProdusDto }}</p>
                                    <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.composition') }}{{ product.compozitieDto }}</p>
                                    <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.productReverse') }}{{ product.fataReversibilaDto === true ? 'Da' : 'Nu' }}</p>
                                    <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.availableOnMoreColors') }}{{ product.culoriProdus?.length > 1 ? 'Da' : 'Nu' }}</p>
                                    <p class="font-weight-light h6">{{ $t('shop.productGeneralInfo.availableOnMoreDimensions') }}{{ product.dimensiuniProdus?.length > 1 ? 'Da' : 'Nu' }}</p>
                                </v-card-text>
                                
                            </v-card>
                        </v-col>
                        <v-col cols="12" xs="12" sm="6">
                            <v-card class="h-100">
                                <v-card-title>
                                    <p class="font-weight-light text-center h5 my-4">{{ $t('shop.productGeneralInfo.manufacturer') }}</p>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="text-center h-100">
                                        <p class="font-weight-light h6">{{ product.numeProducatorDto === null ? 'N/A' : product.numeProducatorDto }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" xs="12">
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
                        </v-col>
                        <v-col cols="12" xs="12" sm="6">
                            <v-card class="h-100">
                                <v-card-title>
                                    <p class="font-weight-light text-center h5 my-4">{{ $t('shop.productGeneralInfo.description') }}</p>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="text-center">
                                    <p class="font-weight-light h6">{{ product.descriereDto === null ? 'N/A' : product.descriereDto }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" xs="12" sm="6">
                            <v-card class="h-100">
                                <v-card-title>
                                    <p class="font-weight-light text-center h5 my-4">{{ $t('shop.productGeneralInfo.caring') }}</p>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="text-center">
                                    <p class="font-weight-light h6">{{ product.ingrijireDto === null ? 'N/A' : product.ingrijireDto }}</p>
                                </v-card-text>
                            </v-card>
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
                            <v-card-text v-if="reviewsLen > 0">
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
                                            <v-icon
                                                v-for="starIndex in 5"
                                                :key="starIndex"
                                                :color="starIndex <= review.numarSteleDto ? 'orange' : 'grey'"
                                            >
                                                mdi-star
                                            </v-icon>
                                            
                                       
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
                <v-col cols="12">
                    <v-card elevation="12" class="bg-grey-lighten-1 text-center">
                        <v-card-title>
                            <p class="font-weight-thin h3">{{ $t('general.ratingOverview') }}</p>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <p></p>
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
                            @click="console.log(stars)"
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
                                    {{ $t('login.logInText') }} <v-icon>mdi-arrow-right</v-icon>
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
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import productService from '~/services/Products';

const swal = useNuxtApp().$swal
const route = useRoute();
const localePath = useLocalePath();
const {t} = useI18n();
const {name} = useDisplay()




const isLoggedIn = ref(false)
const activeButtonDimensions = ref(null);
const activeButtonColors= ref(null);
const stars = ref(0)
const productCode = route.params.codProdus
const productType = route.params.tipProdus
const product = ref({});
const reviewForm = ref(null)
const reviewText = ref('')
const selectedCurrency = ref('RON');
const dimensionsLength = ref(0);
const reviewsLen = ref(0);

const selectedImage = ref('')
const dialog = ref(false)

const showFormForOnlyMaterial = ref(true);
const onlyMaterial = ref(false)
const withManufacturing = ref(false)

const showFormOnlyForWidth = ref(false)
const onlyWidthForm = ref(null)
const onlyWidth = ref(0)
const chosenWidthOnlyForMaterial = ref(0);

const prefferedWidth = ref('')
const prefferedHeight = ref('')
const showFormForWidthAndHeight = ref(false)
const widthAndDimensionForm = ref(null)

const showRejansaTypeSelect = ref(false);
const chosenRejansaType = ref(null)

const showRingTypeSelect = ref(false);
const chosenRingType = ref(null)

const showLiningTypeSelect = ref(false);
const chosenLiningType = ref(null)
const readyToAddToCart = ref(false)
const finalPrice = ref(0);

const onlyNums = new RegExp('^[1-9]\\d{0,3}$');




const rules = {
    notEmpty : value => !!value || t('textFieldsMessages.notEmpty'),
    onlyNumbers : value => onlyNums.test(String(value)) || t('textFieldsMessages.onlyNumbers'),
    maxChar: maxLength => value => !value || value.length <= maxLength || `${t('textFieldsMessages.maxLength')} ${maxLength}`,
    stars : value => value <= 5 && value >=0 || t('textFieldsMessages.starsRule')
}

const isPair = ref(false)

const selectedColor = ref({
    name : '',
    colorCode: '',
})
const selectedDimension = ref({
    width: '',
    height: '',
    price: 0,
    priceDiscount: 0,
})
const filteredImages = ref([])
const isClicked = ref(false);

const height = computed(() => {
    switch (name.value) {
      case 'xs': return 3
      default : return 3
    }
})

const allImages = computed(() => {
    if (!product.value.culoriProdus) return [];
    // Group images by color
    return product.value.culoriProdus.flatMap(color => 
        color.imaginiProdusDto.map(image => ({
            imageUrl: image.presignedUrl,
            colorName: color.numeCuloareDto
        }))
    );
});




function filterImagesByColor(color) {
    const colorData = product.value.culoriProdus.find(c => c.numeCuloareDto === color);
    console.log(colorData)
    filteredImages.value = colorData ? colorData.imaginiProdusDto.map(image => ({
        imageUrl: image.presignedUrl,
    })) : [];
}

const selectImage = ((imageObj) => {
    console.log(imageObj)
    selectedImage.value = imageObj
    selectedColor.value.name = selectedImage.value.colorName
})

function handleClick() {
    if (!isClicked.value) {
        swal.fire({
            position: "top-end",
            icon: "success",
            title: "Produsul a fost adaugat in cos",
            showConfirmButton: false,
            timer: 1000
        });
        isClicked.value = true;
        // Reset the button after 1 second
        setTimeout(() => {
            isClicked.value = false;
        }, 1000);
    }
}

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
        selectedDimension.value ={
            width: product.value.dimensiuniProdus[index].lungimeDto,
            height: product.value.dimensiuniProdus[index].latimeDto,
            price :  product.value.dimensiuniProdus[index].pretDto,
            priceDiscount:  product.value.dimensiuniProdus[index].pretRedusDto
        }
    } else if (type === 'color') {
        activeButtonColors.value = index;
        selectedColor.value.name = product.value.culoriProdus[index].numeCuloareDto
        selectedColor.value.colorCode = product.value.culoriProdus[index].codCuloareDto
        selectedImage.value = allImages.value.find(img => img.colorName === selectedColor.value.name)
      
    }
}

const getProductData = async () => {
    const response = await productService.getProductData(productCode,productType , selectedCurrency.value);
    if(response === -4){
        navigateTo(localePath('/error/notFound'))
    }else if(response === -2){
        navigateTo(localePath('/error/generalError'))
    }

    Object.assign(product.value , response)
    console.log(product.value)
    if (product.value.culoriProdus && product.value.culoriProdus.length > 0) {
        // Set the default color as the first color available
        selectedColor.value = {
           name : product.value.culoriProdus[0].numeCuloareDto,
           colorCode: product.value.culoriProdus[0].codCuloareDto
        };
        activeButtonColors.value = 0;
        filterImagesByColor(selectedColor.value.name);
    }
    if(product.value.dimensiuniProdus && product.value.dimensiuniProdus.length > 0){
        dimensionsLength.value = product.value.dimensiuniProdus.length;
        selectedDimension.value = { 
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
            navigateTo(localePath('/error/generalError'))
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

const nextFormFromStart = () => {
  
    // case where client wants only material
    if(onlyMaterial.value === true && withManufacturing.value === false ){
        showFormOnlyForWidth.value = true;
        showFormForOnlyMaterial.value = false
    }
    // case where the client wants a manufacturing made
    else if(onlyMaterial.value === false && withManufacturing.value === true){
        showFormForWidthAndHeight.value = true;
        showFormForOnlyMaterial.value = false
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


const submitOnlyWidthForm =  async () => {
    const isValidForm = await onlyWidthForm.value.validate();
    if(isValidForm.valid){
        chosenWidthOnlyForMaterial.value = onlyWidth.value / 100;
        finalPrice.value = chosenWidthOnlyForMaterial.value * (product.value.pretBazaRedusDto > 0 ? product.value.pretBazaRedusDto : product.value.pretBazaDto)
        readyToAddToCart.value = true;
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

const toRejansaType = async () => {
    const validForm = await widthAndDimensionForm.value.validate();
    if(validForm.valid){
        showFormForWidthAndHeight.value = false;
        showRejansaTypeSelect.value = true;
    }else {
        swal.fire({
            icon : 'error',
            title: '',
            text: t('sweetAlert2.CheckForm'),
            timer: 3000
        })
        return;
    }
   
}

const checkRejansaType = () => {
    if(chosenRejansaType.value !== null){
        if(chosenRejansaType.value.sePrindeCuInele === true){
            showRejansaTypeSelect.value = false;
            showRingTypeSelect.value = true
        }else{
            showRejansaTypeSelect.value = false;
            showLiningTypeSelect.value = true
        }
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

const checkRingType =  () => {
    if(chosenRingType.value !== null){
        showRingTypeSelect.value = false
        showLiningTypeSelect.value = true
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


const goBack = (formNumber) => {
    if(formNumber === '0'){
        if(showFormOnlyForWidth.value === true && showFormForWidthAndHeight.value === false){
            showFormOnlyForWidth.value = false
        }else if(showFormOnlyForWidth.value === false && showFormForWidthAndHeight.value === true){
            showFormForWidthAndHeight.value = false
        }
        readyToAddToCart.value = false;
        finalPrice.value = 0;
        showFormForOnlyMaterial.value = true;
    }else if(formNumber === '1'){
        showRejansaTypeSelect.value = false
        showFormForWidthAndHeight.value = true
    }else if(formNumber === '2' ){
        if(chosenRingType.value === null){
            readyToAddToCart.value = false;
            finalPrice.value = 0;
            showLiningTypeSelect.value = false
            showRejansaTypeSelect.value = true
        }else{
            readyToAddToCart.value = false;
            finalPrice.value = 0;
            chosenRingType.value =  null
            showRingTypeSelect.value = false
            showRejansaTypeSelect.value = true
        }
    }
}



  

onMounted(async () => {
    if(useCookie('userLoggedIn').value === 1){
        isLoggedIn.value = true;
    }
   getCurrentLocale()
   await getProductData()
   selectedImage.value = allImages.value[0]
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