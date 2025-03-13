<template>
    <v-container class="bg-grey-darken-4 " fluid>
        <v-card class="p-4 elevation-24  bg-grey-darken-3 text-center">
            <v-card-title class="font-weight-light text-center text-white">
                {{ productCode }}
            </v-card-title>
            <v-alert v-if="watchToSave" v-model="watchToSave" type="warning" variant="tonal" closable class="w-100 text-center">
                {{ watchToSaveText }}
            </v-alert>
            <v-expansion-panels v-model="defaultExpandedPanels" variant="inset">
                <v-expansion-panel id="generalProductCharacteristics" class="p-3 m-2 text-center bg-grey-darken-4" >
                    <v-expansion-panel-title :collapse-icon="mdiMinus" :expand-icon="mdiPlus"
                        class="font-weight-bold text-white">
                        Caracteristici generale
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-form ref="mainForm" class="text-white text-center bg-grey-darken-3" >
                            <v-row class="p-2 m-2 bg-grey-darken-3">
                                <v-col cols="6" xs="12" s="12">
                                    <v-text-field class="p-2"
                                        v-model="product.codProdusDto"
                                        label="Cod Produs"
                                        variant="outlined"
                                        counter="40"
                                        :rules="[rules.checkProductCode,rules.maxChar(40)]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-combobox class="p-2"
                                        v-model="product.numeProducatorDto"
                                        label="Producator"
                                        variant="outlined"
                                        :items="productOptions.manuFacturersDto"
                                        item-title="key"
                                        item-value="value"
                                        :rules="[rules.onlyLetters]"
                                    ></v-combobox>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-text-field class="p-2"
                                        v-model="product.numeProdusJsonDto.nume_ro"
                                       
                                        label="Nume Produs (Romana)"
                                        counter="50"
                                        variant="outlined"
                                        :rules="[rules.maxChar(50), rules.fieldNotEmpty,rules.checkProductName]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-text-field class="p-2"
                                        v-model="product.numeProdusJsonDto.nume_en"
                                        
                                        label="Nume Produs (Engleza)"
                                        counter="50"
                                        variant="outlined"
                                        :rules="[rules.maxChar(50), rules.fieldNotEmpty,rules.checkProductNameEn]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" xs="12" s="12" v-if="!isLoading">
                                    <v-combobox class="p-2"
                                        @update:search="mapTypeRoToEn(product , product.tipulProdusuluiJsonDto.tip_ro)"
                                        v-model="product.tipulProdusuluiJsonDto.tip_ro"
                                        label= "Tip produs (Romana)"
                                        variant="outlined"
                                        :items="getProductTypesRo"
                                        :rules="[rules.fieldNotEmpty]"
                                    ></v-combobox>
                                </v-col>
                                <v-col cols="6" xs="12" s="12" v-if="!isLoading">
                                    <v-combobox class="p-2"
                                        @update:search="mapTypeEnToRo(product , product.tipulProdusuluiJsonDto.tip_en)"
                                        v-model="product.tipulProdusuluiJsonDto.tip_en"
                                        label= "Tip produs (Engleza)"
                                        variant="outlined"
                                        :items="getProductTypesEn"
                                        :rules="[rules.fieldNotEmpty]"
                                    ></v-combobox>
                                </v-col>
                                <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                                    <v-textarea class="p-2"
                                        v-model="product.descriereJsonDto.descriere_ro"
                                        label="Descriere Produs (Romana)"
                                        counter="150"
                                        variant="outlined"
                                        :rules="[rules.maxChar(150), rules.fieldNotEmpty]"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                                    <v-textarea class="p-2"
                                    v-model="product.descriereJsonDto.descriere_en"
                                        label="Descriere Produs (Engleza)"
                                        counter="150"
                                        variant="outlined"
                                        :rules="[rules.maxChar(150), rules.fieldNotEmpty]"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                                    <v-text-field class="p-2"
                                        v-model="product.compozitieJsonDto.compozitie_ro"
                                        label="Compozitie (Romana)"
                                        counter="50"
                                        variant="outlined"
                                        :rules="[rules.maxChar(50)]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                                    <v-text-field class="p-2"
                                        v-model="product.compozitieJsonDto.compozitie_en"
                                        label="Compozitie (Engleza)"
                                        counter="50"
                                        variant="outlined"
                                        :rules="[rules.maxChar(50)]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-checkbox class="p-2"
                                        v-model="product.activInMagazinDto"
                                        label="Activ in magazin"
                                        variant="outlined"
                                    ></v-checkbox>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-checkbox class="p-2"
                                        v-model="product.fataReversibilaDto"
                                        label="Față reversibilă"
                                        variant="outlined"
                                    ></v-checkbox>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-checkbox class="p-2"
                                        v-model="product.afiseazaInNoutatiDto"
                                        label="Afiseaza in Noutati"
                                        variant="outlined"
                                    ></v-checkbox>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-checkbox class="p-2"
                                        v-model="product.produsLimitatDto"
                                        label="Afiseaza la Produse Limitate"
                                        variant="outlined"
                                    ></v-checkbox>
                                </v-col>
                                <v-col cols="6" xs="12" s="12">
                                    <v-text-field class="p-2"
                                        v-model="product.tvaDto"
                                        label="TVA (%)"
                                        variant="outlined"
                                        :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                                    <v-textarea class="p-2"
                                        v-model="product.ingrijireJsonDto.ingrijire_ro"
                                        label="Instrucțiuni de îngrijire (Romana)"
                                        counter="150"
                                        variant="outlined"
                                        :rules="[rules.maxChar(150)]"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                                    <v-textarea class="p-2"
                                        v-model="product.ingrijireJsonDto.ingrijire_en"
                                        label="Instrucțiuni de îngrijire (Engleza)"
                                        counter="150"
                                        variant="outlined"
                                        :rules="[rules.maxChar(150)]"
                                    ></v-textarea>
                                </v-col>
                                <v-alert type="warning" variant="tonal" class="text-center">
                                    Daca produsul se aduce la comanda , lasati stocul la 0
                                </v-alert>
                                <v-col cols="12" xs="12" s="12">
                                    <v-text-field class="p-2"
                                        v-model="product.stocDto"
                                        label="Stoc produs"
                                        variant="outlined"
                                        :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                                    ></v-text-field>
                                </v-col>
                                <v-alert type="warning" variant="tonal" class="text-center">
                                    Daca produsul are pret pe dimensiune , lasati pret baza la 0
                                </v-alert>
                                <v-col cols="12" xs="12" s="12">
                                    <v-text-field class="p-2"

                                        v-model="product.pretBazaDto"
                                        label="Pret baza produs (lei/m daca este perdea/draperie)"
                                        variant="outlined"
                                        :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                                    ></v-text-field>
                                </v-col>
                                <v-alert type="warning" variant="tonal" class="text-center">
                                    Daca produsul are pret pe dimensiune , lasati la 0.
                                </v-alert>
                                <v-col cols="12" xs="12" s="12">
                                    <v-text-field class="p-2"
                                        v-model="product.pretBazaRedusDto"
                                        label="Pret baza produs redus (lei/m daca este perdea/draperie)"
                                        variant="outlined"
                                        :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                                    ></v-text-field>
                                </v-col>
                                <v-alert type="warning" variant="tonal" class="text-center">
                                    Daca produsul este perdea/draperie , daca nu lasati la 0.
                                </v-alert>
                                <v-col cols="12">
                                    <v-text-field class="p-2"
                                        v-model="product.inaltimeMaximaDto"
                                        label="Inaltime maxima material(metri)"
                                        variant="outlined"
                                        :rules="[rules.fieldNotEmpty, rules.onlyNumbers, ]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel id="productTypes" class="p-3 m-2 text-center bg-grey-darken-4" eager>
                    <v-expansion-panel-title :collapse-icon="mdiMinus" :expand-icon="mdiPlus"
                        class="font-weight-bold text-white">
                        Tipurile produsului
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row v-for="(tipProdus, index) in product.tipuriProduseDto" :key="index"
                            class="p-2 m-2 bg-grey-darken-3">
                            <v-col cols="12">
                                <v-combobox
                                    @update:search="mapCategoryRoToEn(tipProdus , tipProdus.categorieJsonDto.categorie_ro ,false)"
                                    class="mx-2"
                                    v-model="tipProdus.categorieJsonDto.categorie_ro"
                                    :items="getProductCategoriesRo"
                                    label="Categorie (Romana)"
                                    :counter="40"
                                    outlined
                                    clearable
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-combobox
                                    @update:search="mapCategoryEnToRo(tipProdus,tipProdus.categorieJsonDto.categorie_en , false)"
                                    class="mx-2"
                                    v-model="tipProdus.categorieJsonDto.categorie_en"
                                    :items="getProductCategoriesEn"
                                    label="Categorie (Engleza)"
                                    :counter="40"
                                    outlined
                                    clearable
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center justify-center">
                                <v-icon :icon="mdiDeleteCircle" @click="deleteType(tipProdus.categorieJsonDto.categorie_ro)" color="error" size="32"></v-icon>
                            </v-col>
                        </v-row>
                        <div v-show="showFormForAddingType && !dummyBoolean" class="text-center bg-grey-darken-3">
                            <v-icon :icon="mdiCloseCircle" color="white" @click="closeTypeForm()" size="32" class="d-flex pt-4 m-3">
                                
                            </v-icon>
                            <p class="font-weight-light h4 p-2">Tip produs nou</p>
                            <v-form ref="typeFormToAdd" validate-on="submit" class="m-2 p-3">
                                <v-combobox v-for="typeData in typeForm" :key="typeData.placeholder"
                                    :label="typeData.label"
                                    :placeholder="typeData.placeholder"
                                    :type="typeData.type"
                                    v-model="typeFormData[typeData.model]"
                                    :counter="typeData.maxLength"
                                    @update:search="typeData.mappingFunc(typeData,typeFormData[typeData.model] , true)"
                                    :items="typeData.options"
                                    :rules="[rules.fieldNotEmpty, rules.onlyLetters]"
                                    class="p-2 m-1 changeCount"
                                    variant="outlined"
                                    color="grey-lighten-1"
                                ></v-combobox>
                                <v-btn :append-icon="mdiPlus" type="button" color="success"
                                    rounded="xl" variant="elevated" @click="saveToDtoArrayType()"
                                    class="m-3">
                                    Adauga
                                </v-btn>
                            </v-form>
                        </div>
                        <v-btn v-if="dummyBoolean" rounded="xl" @click="showTypeForm()" type="button"
                            color="white" variant="outlined" class="font-weight-bold mt-2">
                            Adauga tip produs
                            <v-icon class="pl-2" :icon="mdiPlus"></v-icon>
                        </v-btn>
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <!-- Dimensiuni Produse Section -->
                <v-expansion-panel v-if="productType !== 'perdea' && productType !== 'draperie'" id="dimensions" class="p-3 m-2 text-center bg-grey-darken-4" eager>
                    <v-expansion-panel-title :collapse-icon="mdiMinus" :expand-icon="mdiPlus"
                        class="font-weight-bold text-white">
                        Dimensiuni (centimetri)
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row v-for="(dimensiune, index) in product.dimensiuniProduseDto" :key="index"
                            class="p-2 m-2 bg-grey-darken-3">
                            <v-col cols="6">
                                <v-combobox
                                    v-model="dimensiune.lungimeDto"
                                    label="Lungime"
                                    :items="productOptions.lungimiForBox"
                                    :rules="[rules.onlyNumbers,rules.maxChar(10)]"
                                    variant="outlined"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="6">
                                <v-combobox
                                    v-model="dimensiune.latimeDto"
                                    label="Latime"
                                    :items="productOptions.latimiForBox"
                                    variant="outlined"
                                    :rules="[rules.onlyNumbers,rules.maxChar(10)]"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="dimensiune.pretDto"
                                    label="Pret(RON)"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-combobox
                                    v-model="dimensiune.recomandarePat"
                                    label="Recomandare pat"
                                    :items="productOptions.recomandariForBox"
                                    variant="outlined"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="dimensiune.pretRedusDto"
                                    label="Pret redus(RON)"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center justify-center">
                                <v-icon id="delete" @click="deleteDimension(dimensiune.lungimeDto, dimensiune.latimeDto, dimensiune.pretDto, dimensiune.pretRedusDto, dimensiune.recomandarePat)"
                                    color="error" size="32" :icon="mdiDeleteCircle"></v-icon>
                            </v-col>
                        </v-row>
                        <div v-if="showFormForAddingDimension && !dummyBoolean" class="text-center bg-grey-darken-3">
                            <v-icon :icon="mdiCloseCircle" color="white" @click="closeDimensionForm()" size="32" class="d-flex pt-4 m-3">
                               
                            </v-icon>
                            <p class="font-weight-light h4 p-2">Dimensiune noua</p>
                            <v-form validate-on="submit" ref="dimensionFormToAdd" class="m-2 p-3">
                                <v-combobox v-for="dimensionData in dimensionForm" :key="dimensionData.placeholder"
                                    :label="dimensionData.label"
                                    :placeholder="dimensionData.placeholder"
                                    :type="dimensionData.type"
                                    v-model="dimensionFormData[dimensionData.model]"
                                    :counter="dimensionData.maxLength"
                                    :items="productOptions[dimensionData.options]"
                                    :rules="dimensionData.rules"
                                    class="p-2 m-1 changeCount"
                                    variant="outlined"
                                    color="grey-lighten-1"
                                ></v-combobox>
                                <v-btn :append-icon="mdiPlus" type="button" color="success"
                                    rounded="xl" variant="elevated" @click="saveToDtoArrayDimension()"
                                    class="m-3">
                                    Adauga
                                </v-btn>
                            </v-form>
                        </div>
                        <v-btn v-if="dummyBoolean" rounded="xl" @click="showDimensionForm()" type="button"
                            color="white" variant="outlined" class="font-weight-bold mt-2">
                            Adauga dimensiune
                            <v-icon class="pl-2" :icon="mdiPlus"></v-icon>
                        </v-btn>
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <!-- Culori Produse Section -->
                <v-expansion-panel id="colors" class="p-3 m-2 text-center bg-grey-darken-4" eager>
                    <v-expansion-panel-title :collapse-icon="mdiMinus" :expand-icon="mdiPlus"
                        class="font-weight-bold text-white">
                        Culorile produsului
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row v-for="(culoare, index) in product.culoriProdusDto" :key="index"
                            class="p-2 m-2 bg-grey-darken-3">
                            <v-col cols="12">
                                <v-combobox
                                    v-model="culoare.codCuloareDto"
                                    label="Cod Culoare"
                                    :items="productOptions.coduriCuloriForBox"
                                    variant="outlined"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-combobox
                                    @update:search="mapColorRoToEn(culoare , culoare.numeCuloareJsonDto.culoare_ro)"
                                    v-model="culoare.numeCuloareJsonDto.culoare_ro"
                                    label="Nume Culoare (Romana)"
                                    :items="getColorsRo"
                                    variant="outlined"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-combobox
                                    @update:search="mapColorEnToRo(culoare , culoare.numeCuloareJsonDto.culoare_en)"
                                    v-model="culoare.numeCuloareJsonDto.culoare_en"
                                    label="Nume Culoare (Engleza)"
                                    :items="getColorsEn"
                                    variant="outlined"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center justify-center">
                                <v-icon :icon="mdiDeleteCircle" @click="deleteColor(culoare.numeCuloareJsonDto.culoare_ro, culoare.codCuloareDto)"
                                    color="error" size="32"></v-icon>
                            </v-col>

                            <!-- Images for each color -->
                            <v-col cols="12">
                                <v-expansion-panels>
                                    <v-expansion-panel id="images" class="p-3 m-2 bg-grey-darken-4 text-center">
                                        <v-expansion-panel-title :collapse-icon="mdiMinus" :expand-icon="mdiPlus"
                                            class="font-weight-bold text-white">
                                            Imaginile culorii
                                        </v-expansion-panel-title>
                                        <v-expansion-panel-text class="text-center">
                                            <v-row v-for="(imagine, imgIndex) in culoare.imaginiProdusDto"
                                                :key="imgIndex" class="p-2 m-2 bg-grey-darken-3">
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="imagine.caleImagineDto"
                                                        label="Cale Imagine"
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="imagine.fisierInBucketDto"
                                                        label="Fisier in Bucket"
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-img class="text-center w-100" variant="outlined"
                                                        :aspect-ratio="16 / 9"  :src="imagine.presignedUrl">
                                                        <template v-slot:placeholder>
                                                            <div class="d-flex align-center justify-center fill-height">
                                                                <v-progress-circular color="grey-lighten-4"
                                                                    indeterminate>
                                                                </v-progress-circular>
                                                            </div>
                                                        </template>
                                                    </v-img>
                                                </v-col>
                                                <v-col cols="12" class="d-flex align-center justify-center">
                                                    <v-icon id="deleteImage" :icon="mdiDeleteCircle"
                                                        @click="deleteImage(culoare.numeCuloareJsonDto.culoare_ro, culoare.codCuloareDto, imagine.caleImagineDto, imagine.fisierInBucketDto)"
                                                        color="error" size="32"></v-icon>
                                                </v-col>
                                            </v-row>
                                            <div v-if="showFormForAddingImage&&selectedColorForImageForm && selectedColorForImageForm.numeCuloare === culoare.numeCuloareDto && selectedColorForImageForm.codCuloare === culoare.codCuloareDto" 
                                            class="text-center bg-blue-grey-darken-4">
                                               
                                                <v-icon :icon="mdiCloseCircle" color="white" @click="closeImageForm()" size="32"
                                                    class="d-flex pt-4 m-3">
                                                </v-icon>
                                                <p class="font-weight-light h4 p-2">Imagine noua</p>
                                                <v-form ref="imageFormToAdd" class="m-2 p-3">
                                                    <div v-for="(imageData, index) in imagesForm" :key="index"
                                                        class="p-2 m-1">
                                                        <v-combobox v-if="imageData.field === 'combobox'"
                                                            :label="imageData.label"
                                                            :placeholder="imageData.placeholder"
                                                            :type="imageData.type"
                                                            v-model="imageFormData[imageData.model]"
                                                            :counter="imageData.maxLength"
                                                            :items="productOptions[imageData.options]"
                                                            :rules="imageData.rules"
                                                            class="p-2 m-1 changeCount"
                                                            variant="outlined"
                                                            color="grey-lighten-1">
                                                        </v-combobox>
                                                        <v-file-input v-else-if="imageData.field === 'file'"
                                                            :label="imageData.label"
                                                            prepend-icon="mdi-image"
                                                            v-model="imageFormData[imageData.model]"
                                                            accept="image/*"
                                                            counter show-size outlined dense clearable>
                                                        </v-file-input>
                                                    </div>

                                                    <v-btn :append-icon="mdiPlus" type="button" color="success"
                                                        rounded="xl" variant="elevated"
                                                        @click="saveToDtoArrayColorImages(culoare.numeCuloareJsonDto.culoare_ro, culoare.codCuloareDto)"
                                                        class="m-3">
                                                        Adauga
                                                    </v-btn>
                                                </v-form>
                                            </div>
                                            <v-btn rounded="xl" @click="showImageForm(culoare.numeCuloareJsonDto.culoare_ro,culoare.codCuloareDto)" type="button" color="white"
                                                variant="outlined" class="font-weight-bold mt-2">
                                                Adauga imagine
                                                <v-icon :icon="mdiPlus" class="pl-2"></v-icon>
                                            </v-btn>
                                        </v-expansion-panel-text>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                        <div v-if="showFormForAddingColor && !dummyBoolean" class="text-center bg-grey-darken-3">
                            <v-icon :icon="mdiCloseCircle" color="white" @click="closeColorForm()" size="32"
                                class="d-flex pt-4 m-3">
                            </v-icon>
                            <p class="font-weight-light h4 p-2">Culoare noua</p>
                            <v-form validate-on="submit" ref="colorFormToAdd" class="m-2 p-3">
                                <v-combobox v-for="colorData in colorsForm" :key="colorData.placeholder"
                                    :label="colorData.label"
                                    :placeholder="colorData.placeholder"
                                    :type="colorData.type"
                                    v-model="colorFormData[colorData.model]"
                                    @update:search="colorData.model !== 'codCuloareDto' ? colorData.mappingFunc(colorData , colorFormData[colorData.model] , true) : ''"
                                    :counter="colorData.maxLength"
                                    :items="colorData.options"
                                    :rules="colorData.rules"
                                    class="p-2 m-1 changeCount"
                                    variant="outlined"
                                    color="grey-lighten-1">
                                </v-combobox>
                                <v-btn :append-icon="mdiPlus" type="button" color="success" rounded="xl"
                                    variant="elevated" @click="saveToDtoArrayColor()" class="m-3">
                                    Adauga
                                </v-btn>
                            </v-form>
                        </div>
                        <v-btn v-if="dummyBoolean" rounded="xl" @click="showColorForm()" type="button" color="white"
                            variant="outlined" class="font-weight-bold mt-2">
                            Adauga culoare
                            <v-icon class="pl-2" :icon="mdiPlus"></v-icon>
                        </v-btn>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <!-- Add more sections as needed -->
            </v-expansion-panels>
            <v-btn @click="finalSaveData()" type="button" color="success" variant="flat"
                class="font-weight-bold mt-2">
                Salveaza modificari
                <v-icon class="pl-2" :icon="mdiContentSave"></v-icon>
            </v-btn>
        </v-card>
        
    </v-container>
</template>

<script setup>
import { ref, reactive,  onMounted, watch } from 'vue';
import adminService from '~/services/Admin';
import Swal from 'sweetalert2';
import { mdiCloseCircle, mdiContentSave, mdiDeleteCircle, mdiMinus, mdiPlus } from '@mdi/js';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const route = useRoute()
const mainForm = ref(null)
const typeFormToAdd = ref(null)
const dimensionFormToAdd = ref(null)
const colorFormToAdd = ref(null)
const imageFormToAdd = ref(null)
const isLoading = ref(true)
const defaultExpandedPanels = ref([0,1,2,3]);

const productCode = ref('');
const rules = {
    fieldNotEmpty: value => !!String(value) || 'Campul este obligatoriu',
    maxChar: len => value => !value || value.length <= len || `${t('textFieldsMessages.maxLength')} ${len}`,
    onlyNumbers: value =>  /^\d+(\.\d{1,2})?$/.test(String(value).trim()) ||
    "Doar numere sunt permise / Daca folositi . trebuie minim 2 cifre dupa punctul decimal",
    onlyLetters: value => /^[a-zA-Z\s]*$/.test(value) || 'Doar litere sunt permise',
    checkProductName: value => {
   
        let isNameAlreadyUsed = numeProdusArrayRo.value.find(name => name.toUpperCase() === value.toUpperCase());
        if (isNameAlreadyUsed === undefined) {
            return true;
        }
        return 'Numele de produs exista deja'; // Return the error message if the name is found
    },
    checkProductNameEn: value => {
   
        let isNameAlreadyUsed = numeProdusArrayEn.value.find(name => name.toUpperCase() === value.toUpperCase());
        if (isNameAlreadyUsed === undefined) {
            return true;
        }
        return 'Numele de produs in engleza exista deja'; // Return the error message if the name is found
    },

    checkProductCode: value => {
    
        let isCodeAlreadyUsed = codProdusArray.value.find(code => code === value.toUpperCase());
        

        if (isCodeAlreadyUsed === undefined) {
            return true; 
        }
        return 'Codul de produs exista deja'; // Return the error message if the code is found
    },
    
};


const product = ref({
    codProdusDto: '',
    oldCodProdusDto : '',
    descriereDto: '',
    descriereJsonDto: {
        descriere_ro: "",
        descriere_en: ""
    },
    numeProdusDto: '',
    numeProdusJsonDto: {
        nume_ro : "",
        nume_en : ""
    },
    compozitieDto: '',
    compozitieJsonDto: {
        compozitie_ro : "",
        compozitie_en : ""
    },
    tvaDto: 0,
    ingrijireDto: '',
    ingrijireJsonDto : {
        ingrijire_ro : "",
        ingrijire_en : ""
    },
    fataReversibilaDto: false,
    stocDto: 0,
    numeProducatorDto: '',
    activInMagazinDto: false,
    pretBazaDto: 0,
    pretBazaRedusDto: 0,
    tipulProdusuluiDto : '',
    tipulProdusuluiJsonDto : {
        tip_ro : "",
        tip_en : ""
    },
    inaltimeMaximaDto : 0,
    afiseazaInNoutatiDto : false,
    produsLimitatDto : false,
    justAdded: false,
    tipuriProduseDto: [],
    tipuriProduseJsonDto: [],
    dimensiuniProduseDto: [],
    culoriProdusDto: [],
    culoriProdusJsonDto: [],

});

const originalProduct = ref({});

const productOptions = ref({
    coduriCuloriForBox: [],
    culoriForBox: [],
    culoriForBoxJson : [],
    latimiForBox: [],
    lungimiForBox: [],
    productCategoriesForBox: [],
    productCategoriesForBoxJson : [],
    recomandariForBox: [],
    directoriesInBucket: [],
    manuFacturersDto: [],
    productTypes : [],
    productTypesJson : [],
});

const getProductCategoriesRo = computed(() => {
  return productOptions.value.productCategoriesForBoxJson
    ? productOptions.value.productCategoriesForBoxJson.map(item => item.categorie_ro)
    : [];
});

const getProductCategoriesEn = computed(() => {
  return productOptions.value.productCategoriesForBoxJson
    ? productOptions.value.productCategoriesForBoxJson.map(item => item.categorie_en)
    : [];
});

const getColorsRo = computed(() => {
    return productOptions.value.culoriForBoxJson 
    ? productOptions.value.culoriForBoxJson.map(item => item.culoare_ro)
    : [];
})

const getColorsEn = computed(() => {
    return productOptions.value.culoriForBoxJson 
    ? productOptions.value.culoriForBoxJson.map(item => item.culoare_en)
    : [];
})


const getProductTypesRo = computed(() => {
    console.log("aici",productOptions.value.productTypesJson.map(item => item.tip_ro))
    return productOptions.value.productTypesJson ?
        productOptions.value.productTypesJson.map(item => item.tip_ro)
    : [];
})

const getProductTypesEn = computed(() => {
    return productOptions.value.productTypesJson ?
        productOptions.value.productTypesJson.map(item => item.tip_en)
    : [];
})



const mapColorRoToEn = (color , roValue , isAdding) => {
  if(roValue !== null){
    const index = getColorsRo.value.findIndex(category => category === roValue.toLowerCase());
    if (index !== -1) {
        if(isAdding === true){
            colorFormData.value.culoare_en = getColorsEn.value[index]
        }else{
            color.numeCuloareJsonDto.culoare_en = getColorsEn.value[index];
        }
    }
  }
};

const mapColorEnToRo = (color , enValue , isAdding) => {
  if(enValue !== null){
    const index = getColorsEn.value.findIndex(category => category === enValue.toLowerCase());
    if (index !== -1) {
        if(isAdding === true){
            colorFormData.value.culoare_ro = getColorsRo.value[index];
        }else{
            color.numeCuloareJsonDto.culoare_ro = getColorsRo.value[index];
        }
    } 
  }
};

const mapCategoryRoToEn = (category , roValue, isAdding) => {
  if(roValue !== null){
    const index = getProductCategoriesRo.value.findIndex(category => category === roValue.toUpperCase());
    if (index !== -1) {
        if(isAdding === true){
            console.log(category)
            console.log(roValue)
            typeFormData.value.categorie_en = getProductCategoriesEn.value[index];
        }else{
            category.categorieJsonDto.categorie_en = getProductCategoriesEn.value[index];
        }
        
    } 
  }
};

const mapCategoryEnToRo = (category ,enValue ,isAdding) => {
  if(enValue !== null){
    const index = getProductCategoriesEn.value.findIndex(category => category === enValue.toUpperCase());
    if (index !== -1) {
        if(isAdding === true){
            typeFormData.value.categorie_ro = getProductCategoriesRo.value[index];
        }else{
            category.categorieJsonDto.categorie_ro = getProductCategoriesRo.value[index];
        }
        
    } 
  }
  
};


const mapTypeRoToEn = (tipProdus , roValue) => {
  if(roValue !== null){  
    const index = getProductTypesRo.value.findIndex(type => type === roValue.toLowerCase());
    if (index !== -1) {
        tipProdus.tipulProdusuluiJsonDto.tip_en = getProductTypesEn.value[index];
    } 
  }
};

const mapTypeEnToRo = (tipProdus ,enValue ) => {
  if(enValue !== null ){
    const index = getProductTypesEn.value.findIndex(type => type === enValue.toLowerCase());
    if (index !== -1) {
        tipProdus.tipulProdusuluiJsonDto.tip_ro = getProductTypesRo.value[index];
    } 
  }
  
};




const productType = computed(() => {
    return product.value.tipulProdusuluiJsonDto.tip_ro;
})
// de modificat
const typeFormData = ref({
    categorieDto : '',
    categorie_ro: '',
    categorie_en: '',
    justAdded: true,
});

const typeForm = ref([
    {
        label: 'Categoria produsului (Romana)',
        placeholder: 'copii/premium/etc',
        type: 'text',
        model: 'categorie_ro',
        maxLength: 40,
        mappingFunc : mapCategoryRoToEn,
        options: getProductCategoriesRo,
    },
    {
        label: 'Categoria produsului (Engleza)',
        placeholder: 'copii/premium/etc',
        type: 'text',
        model: 'categorie_en',
        maxLength: 40,
        mappingFunc : mapCategoryEnToRo,
        options: getProductCategoriesEn,
    },
]);

const dimensionForm = ref([
    {
        label: 'Lungimea produsului(fara cm)',
        placeholder: '',
        type: 'text',
        model: 'lungimeDto',
        maxLength: 4,
        rules: [
            v => !!v || 'Campul lungime nu poate fi gol',
            v => /^[0-9]*\.?[0-9]+$/.test(String(v).trim()) || 'Lungimea trebuie sa fie un numar valid',
            v => !v || v.length <= 4 || 'Lungimea trebuie sa fie din maxim 4 numere',
        ],
        options: 'lungimiForBox',
    },
    {
        label: 'Latimea produsului(fara cm)',
        placeholder: '',
        type: 'text',
        model: 'latimeDto',
        maxLength: 4,
        rules: [
            v => !!v || 'Campul latime nu poate fi gol',
            v => /^[0-9]*\.?[0-9]+$/.test(String(v).trim()) || 'Latimea trebuie sa fie un numar valid',
            v => !v || v.length <= 4 || 'Latimea trebuie sa fie din maxim 4 numere',
        ],
        options: 'latimiForBox',
    },
    {
        label: 'Pret(RON)',
        placeholder: '',
        type: 'text',
        model: 'pretDto',
        rules: [
            v => !!v || 'Campul pret nu poate fi gol',
            v => /^[0-9]*\.?[0-9]+$/.test(String(v).trim()) || 'Pretul trebuie sa fie un numar valid',
        ],
    },
    {
        label: 'Pret redus(RON)',
        placeholder: '',
        type: 'text',
        model: 'pretRedusDto',
        rules: [
            v => !!v || 'Campul pret nu poate fi gol',
            v => /^[0-9]*\.?[0-9]+$/.test(String(v).trim()) || 'Pretul trebuie sa fie un numar valid',
        ],
    },
    {
        label: 'Recomandare pat',
        placeholder: '',
        type: 'text',
        model: 'recomandarePat',
        maxLength: 15,
        rules: [
            v => /^[0-9]+x[0-9]+$/.test(String(v).trim()) || 'Recomandarea pat trebuie sa fie in format 130x270',
            v => !v || v.length <= 15 || 'Recomandare patului trebuie sa fie din maxim 15 caractere',
        ],
        options: 'recomandariForBox',
    },
]);

const dimensionFormData = ref({
    lungimeDto: '',
    latimeDto: '',
    pretDto: '',
    pretRedusDto: '',
    recomandarePat: '',
    justAdded: true,
});

const colorFormData = ref({
    numeCuloareDto : 'empty',
    culoare_ro: '',
    culoare_en: '',
    codCuloareDto: '',
    justAdded: true,
});

const colorsForm = ref([
    {
        label: 'Numele culorii (Romana)',
        placeholder: '',
        type: 'text',
        model: 'culoare_ro',
        maxLength: 20,
        rules: [
            v => !!v || 'Campul culoare nu poate fi gol',
            v => /^[a-zA-Z- ]+$/.test(String(v).trim()) || 'Numele trebuie sa fie un nume valid',
            v => !v || v.length <= 20 || 'Numele culorii trebuie sa fie din maxim 20 de caractere',
        ],
        mappingFunc : mapColorRoToEn,
        options: getColorsRo,
    },
    {
        label: 'Numele culorii (Engleza)',
        placeholder: '',
        type: 'text',
        model: 'culoare_en',
        maxLength: 20,
        rules: [
            v => !!v || 'Campul culoare nu poate fi gol',
            v => /^[a-zA-Z- ]+$/.test(String(v).trim()) || 'Numele trebuie sa fie un nume valid',
            v => !v || v.length <= 20 || 'Numele culorii trebuie sa fie din maxim 20 de caractere',
        ],
        mappingFunc : mapColorEnToRo,
        options: getColorsEn,
    },
    {
        label: 'Codul culorii',
        placeholder: '',
        type: 'text',
        model: 'codCuloareDto',
        maxLength: 5,
        rules: [
            v => !!v || 'Campul cod culoare nu poate fi gol',
            v => /^[0-9]*\.?[0-9]+$/.test(String(v).trim()) || 'Codul de culoare trebuie sa fie un numar valid',
            v => !v || v.length <= 5 || 'Codul culorii trebuie sa fie din maxim 5 caractere numerice',
        ],
        options: productOptions.value.coduriCuloriForBox,
    },
]);

const imageFormData = ref({
    imagine: null,
    caleImagineDto: '',
    fisierInBucketDto: '',
    presignedUrl: 'temp',
    justAdded: true,
});

const imagesForm = ref([
    {
        field: 'combobox',
        label: 'Categoria fisierului',
        placeholder: '',
        type: 'text',
        model: 'fisierInBucketDto',
        maxLength: 100,
        rules: [
            v => !!v || 'Campul categorie fisier nu poate fi gol',
            v => !v || v.length <= 100 || 'Numele fisierului trebuie sa fie din maxim 100 de caractere',
        ],
        options: 'directoriesInBucket',
    },
    {
        field: 'file',
        label: 'Imagine',
        placeholder: 'Selecteaza imaginea',
        type: '',
        model: 'imagine',
        maxLength: null,
        rules: [
            value => !value || value.size < 7000000 || 'Imaginea trebuie sa fie mai mica de 7 MB',
        ],
        options: '',
    },
]);


const showFormForAddingType = ref(false);
const showFormForAddingDimension = ref(false);
const showFormForAddingColor = ref(false);
const showFormForAddingImage = ref(false);
const dummyBoolean = ref(true);
const watchToSave = ref(true);
const watchToSaveText = ref('Daca ati facut o modificare, nu uitati sa salvati!');
const errorOnLoadingProduct = ref(false);
const selectedColorForImageForm = ref(null);


const showDeletionSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'A fost sters cu succes',
        timer: 500,
    });
};

const showDeletionError = () => {
    Swal.fire({
        icon: 'error',
        title: 'Eroare',
        text: 'O eroare a avut loc!',
        timer: 3000,
    });
};

const showInfoAlert = () => {
    Swal.fire({
        icon: 'info',
        title: 'Loading...',
        text: 'Asteptati...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

const assignFromDbToProduct = async (productCode) => {
    showInfoAlert();
    const response = await adminService.getProductForAdminPage(productCode);
    console.log(response)
    if (response === -2) {
        Swal.close();
        navigateTo("/user/logout")
    } else if (response === 0) {
        Swal.close();
        errorOnLoadingProduct.value = true;
    } else {
        console.log("query response" , response)
        Swal.close();
        Object.assign(product.value, response);
        console.log("product.value " , product.value)

        originalProduct.value = JSON.parse(JSON.stringify(product.value))
       
    }
};

const assignProductOptionsFromDb = async () => {
    const responseForOptions = await adminService.getProductOptions();
    
    if (responseForOptions === 0) {
        console.log('No options for products in db');
    } else if (responseForOptions === -2) {
        navigateTo('/user/logout');
    } else {
        Object.assign(productOptions.value, responseForOptions);
        console.log(productOptions.value)
    }
};

const productCodesAndNames = ref([]);
const codProdusArray = ref([])
const numeProdusArrayRo = ref([])
const numeProdusArrayEn = ref([])


const assingProductCodesAndNamesFromDb = async () => {
    const response = await adminService.getProductCodesAndNames();

    if(response.length === 0){
        console.log("No products in db");
    }else {
        productCodesAndNames.value = response;
        numeProdusArrayRo.value = productCodesAndNames.value
            .map(elem => elem.numeProdusJson.nume_ro)
            .filter(numeRo => numeRo !== product.value.numeProdusJsonDto.nume_ro);
        numeProdusArrayEn.value = productCodesAndNames.value
            .map(elem => elem.numeProdusJson.nume_en)
            .filter(numeEn => numeEn !== product.value.numeProdusJsonDto.nume_en);
        codProdusArray.value = productCodesAndNames.value
            .map(elem => elem.codProdus)
            .filter(elem => elem !== product.value.codProdusDto);

        console.log(numeProdusArrayEn.value)
        console.log(numeProdusArrayRo.value)
        console.log(codProdusArray.value)

    }
}


function showTypeForm(){
   showFormForAddingType.value = true;
   dummyBoolean.value = false;
}

function  closeTypeForm(){
   showFormForAddingType.value = true;
   dummyBoolean.value = true;
}

const deleteType = async (categorie) => {
    const typeToDeleteFromDtoIndex = product.value.tipuriProduseDto.findIndex(
        type => type.categorieJsonDto.categorie_ro === categorie
    );
    console.log(categorie)
    console.log(typeToDeleteFromDtoIndex)
    if (typeToDeleteFromDtoIndex !== -1) {
        const typeToDeleteFromDto = product.value.tipuriProduseDto[typeToDeleteFromDtoIndex];
        if (!typeToDeleteFromDto.justAdded) {
            const responseFromDeletion = await adminService.deleteProductType(
                categorie,
                productCode.value
            );
            if (responseFromDeletion === 1) {
                showDeletionSuccess();
                product.value.tipuriProduseDto.splice(typeToDeleteFromDtoIndex, 1);
            } else if (responseFromDeletion === -2) {
                showDeletionError();
            } else if(responseFromDeletion === -3){
                Swal.fire({
                    icon: 'error',
                    title: 'Eroare',
                    text: 'Produsul este cumparat de catre cineva. Va rugam asteptati pana la finalizare platii!',
                    timer: 3000,
                });
            }
            else {
                showDeletionError();
            }
        } else {
            product.value.tipuriProduseDto.splice(typeToDeleteFromDtoIndex, 1);
        }
    } else {
        showDeletionError();
    }
};

function showDimensionForm(){
   showFormForAddingDimension.value = true;
   dummyBoolean.value = false;
}

function closeDimensionForm(){
   showFormForAddingDimension.value = false;
   dummyBoolean.value = true;
}

const deleteDimension = async (lungime, latime, pret, pretRedus, recomandarePat) => {
    const dimensionToDeleteFromDtoIndex = product.value.dimensiuniProduseDto.findIndex(
        dimension =>
            dimension.lungimeDto === lungime &&
            dimension.latimeDto === latime &&
            dimension.recomandarePat === recomandarePat &&
            dimension.pretDto === pret &&
            dimension.pretRedusDto === pretRedus
    );

    if (dimensionToDeleteFromDtoIndex !== -1) {
        const dimensionToDeleteFromDto = product.value.dimensiuniProduseDto[dimensionToDeleteFromDtoIndex];
        if (!dimensionToDeleteFromDto.justAdded) {
            const responseFromDeletion = await adminService.deleteDimension(
                lungime,
                latime,
                pret,
                recomandarePat,
                productCode.value
            );
            if (responseFromDeletion === 1) {
                showDeletionSuccess();
                product.value.dimensiuniProduseDto.splice(dimensionToDeleteFromDtoIndex, 1);
            } else if (responseFromDeletion === -2) {
                navigateTo('/user/logout')
            }else if(responseFromDeletion === -3){
                Swal.fire({
                    icon: 'error',
                    title: 'Eroare',
                    text: 'Produsul este cumparat de catre cineva. Va rugam asteptati pana la finalizare platii!',
                    timer: 3000,
                });
            } else {
                showDeletionError();
            }
        } else {
            product.value.dimensiuniProduseDto.splice(dimensionToDeleteFromDtoIndex, 1);
        }
    } else {
        showDeletionError();
    }
};

function showColorForm(){
   showFormForAddingColor.value = true;
   dummyBoolean.value = false;
}

function closeColorForm(){
   showFormForAddingColor.value = false;
   dummyBoolean.value = true;
}

const deleteColor = async (numeCuloare, codCuloare) => {
    const colorToDeleteFromDtoIndex = product.value.culoriProdusDto.findIndex(
        color => color.numeCuloareJsonDto.culoare_ro === numeCuloare && color.codCuloareDto === codCuloare
    );

    if (colorToDeleteFromDtoIndex !== -1) {
        const colorToDeleteFromDto = product.value.culoriProdusDto[colorToDeleteFromDtoIndex];
        if (!colorToDeleteFromDto.justAdded) {
            const responseFromDeletion = await adminService.deleteColor(
                numeCuloare,
                codCuloare,
                productCode.value
            );
            if (responseFromDeletion === 1) {
                showDeletionSuccess();
                product.value.culoriProdusDto.splice(colorToDeleteFromDtoIndex, 1);
            }else if(responseFromDeletion === -3){
                Swal.fire({
                    icon: 'error',
                    title: 'Eroare',
                    text: 'Produsul este cumparat de catre cineva. Va rugam asteptati pana la finalizare comenzii!',
                    timer: 3000,
                });
            } else if (responseFromDeletion === -2) {
                navigateTo('/user/logout')

            } else {
                showDeletionError();
            }
        } else {
            product.value.culoriProdusJsonDto.splice(colorToDeleteFromDtoIndex, 1);
        }
    } else {
        showDeletionError();
    }
};

function showImageForm(numeCuloare, codCuloare){
   selectedColorForImageForm.value = { numeCuloare, codCuloare };
   dummyBoolean.value = false;
   showFormForAddingImage.value = true
}

function closeImageForm(){
   selectedColorForImageForm.value = false;
   dummyBoolean.value = true;
   showFormForAddingImage.value = false

}

const deleteImage = async (numeCuloare, codCuloare, caleImagineDto, fisierInBucket) => {
    const colorFromDtoIndex = product.value.culoriProdusJsonDto.findIndex(
        color => color.culoare_ro === numeCuloare && color.codCuloareDto === codCuloare
    );

    if (colorFromDtoIndex !== -1) {
        const colorFromDto = product.value.culoriProdusDto[colorFromDtoIndex];
        const imageToDeleteFromDtoIndex = colorFromDto.imaginiProdusDto.findIndex(
            image =>
                image.caleImagineDto === caleImagineDto && image.fisierInBucketDto === fisierInBucket
        );

        if (imageToDeleteFromDtoIndex !== -1) {
            const imageToDeleteFromDto = colorFromDto.imaginiProdusDto[imageToDeleteFromDtoIndex];
            if (!imageToDeleteFromDto.justAdded) {
                const responseFromDeletion = await adminService.deleteImage(
                    numeCuloare,
                    codCuloare,
                    caleImagineDto,
                    productCode.value,
                    fisierInBucket
                );
                if (responseFromDeletion === 1) {
                    showDeletionSuccess();
                    if (imageToDeleteFromDto.presignedUrl) {
                        URL.revokeObjectURL(imageToDeleteFromDto.presignedUrl);
                    }
                    colorFromDto.imaginiProdusDto.splice(imageToDeleteFromDtoIndex, 1);
                }else if(responseFromDeletion === -3){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Produsul este cumparat de catre cineva. Va rugam asteptati pana la finalizare comenzii!',
                        timer: 3000,
                    });
                } else if (responseFromDeletion === -2) {
                    navigateTo('/user/logout')
                } else {
                    showDeletionError();
                }
            } else {
                if (imageToDeleteFromDto.presignedUrl) {
                        URL.revokeObjectURL(imageToDeleteFromDto.presignedUrl);
                }
                colorFromDto.imaginiProdusDto.splice(imageToDeleteFromDtoIndex, 1);
            }
        }
    } else {
        showDeletionError();
    }
};


const saveToDtoArrayType = () => {
    const { categorie_ro , categorie_en } = typeFormData.value;
    // categorieJsonDto
    if (categorie_ro && categorie_en) {
        const newTypeItem = {
            categorieDto : '',
            categorieJsonDto: {
                categorie_ro : categorie_ro,
                categorie_en : categorie_en,
            },
            justAdded: true,
        };
        const isTypeAlreadyInDto = product.value.tipuriProduseDto.findIndex(
            type => type.categorieJsonDto.categorie_ro === categorie_ro && type.categorieJsonDto.categorie_en === categorie_en
        );
        if (isTypeAlreadyInDto !== -1) {
            Swal.fire({
                icon: 'error',
                title: 'Eroare',
                text: 'Tipul deja se afla pe produs',
                footer: '<a href="#productTypes">Vezi eroarea</a>',
                timer: 3000,
            });
            return;
        }

        product.value.tipuriProduseDto.push(newTypeItem);

        typeFormData.value.categorie_ro = '';
        typeFormData.value.categorie_en = '';

        showFormForAddingType.value = false;
        dummyBoolean.value = true
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Completati toate campurile',
            footer: '<a href="#productTypes">Vezi eroarea</a>',
            timer: 3000,
        });
    }
};

const saveToDtoArrayDimension = () => {
    const { lungimeDto, latimeDto, pretDto, recomandarePat, pretRedusDto } = dimensionFormData.value;
    if(product.value.tipulProdusuluiDto.toLowerCase() === 'perdea' || product.value.tipulProdusuluiDto.toLowerCase() === 'draperie'){
        Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Nu puteti adauga o dimensiune la un tip de produs perdea/draperie',
            footer: '<a href="#dimensions">Vezi eroarea</a>',
            timer: 3000,
        });
        return;
    }
    if (lungimeDto && latimeDto && pretDto && recomandarePat && pretRedusDto) {
        const newDimensionItem = {
            lungimeDto: lungimeDto.trim(),
            latimeDto: latimeDto.trim(),
            pretDto: pretDto.trim(),
            pretRedusDto: pretRedusDto.trim(),
            recomandarePat: recomandarePat.trim(),
            justAdded: true,
        };

        const isDimensionAlreadyInDto = product.value.dimensiuniProduseDto.findIndex(
            dimension =>
                dimension.lungimeDto === newDimensionItem.lungimeDto &&
                dimension.latimeDto === newDimensionItem.latimeDto &&
                dimension.recomandarePat === newDimensionItem.recomandarePat &&
                dimension.pretDto === newDimensionItem.pretDto &&
                dimension.pretRedusDto === newDimensionItem.pretRedusDto
        );

        if (isDimensionAlreadyInDto !== -1) {
            Swal.fire({
                icon: 'error',
                title: 'Eroare',
                text: 'Dimensiunea se afla deja in lista',
                footer: '<a href="#dimensions">Vezi eroarea</a>',
                timer: 3000,
            });
            return;
        }

        product.value.dimensiuniProduseDto.push(newDimensionItem);

        dimensionFormData.value.lungimeDto = '';
        dimensionFormData.value.latimeDto = '';
        dimensionFormData.value.pretDto = '';
        dimensionFormData.value.pretRedusDto = '';
        dimensionFormData.value.recomandarePat = '';

        showFormForAddingDimension.value = false;
        dummyBoolean.value = true
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Completati toate campurile',
            footer: '<a href="#dimensions">Vezi eroarea</a>',
            timer: 3000,
        });
    }
};

const saveToDtoArrayColor = () => {
    const { culoare_ro, culoare_en ,codCuloareDto } = colorFormData.value;
    if (culoare_ro && culoare_en && codCuloareDto) {
        const newColorItem = {
            numeCuloareDto : 'empty',
            numeCuloareJsonDto : {
                culoare_ro: culoare_ro,
                culoare_en: culoare_en
            },
            codCuloareDto: codCuloareDto,
            imaginiProdusDto: [],
            justAdded: true,
        };

        const isColorAlreadyInDtoIndex = product.value.culoriProdusDto.findIndex(
            color => color.numeCuloareJsonDto.culoare_ro === culoare_ro &&
            color.numeCuloareJsonDto.culoare_en === culoare_en  &&
            color.codCuloareDto === codCuloareDto
        );

        if (isColorAlreadyInDtoIndex !== -1) {
            Swal.fire({
                icon: 'error',
                title: 'Eroare',
                text: 'Culoarea se afla deja pe lista',
                footer: '<a href="#colors">Vezi eroarea</a>',
                timer: 3000,
            });
            return;
        }

        product.value.culoriProdusDto.push(newColorItem);

        colorFormData.value.culoare_ro = '';
        colorFormData.value.culoare_en = '';
        colorFormData.value.codCuloareDto = '';

        showFormForAddingColor.value = false;
        dummyBoolean.value = true

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Completati toate campurile',
            footer: '<a href="#colors">Vezi eroarea</a>',
            timer: 3000,
        });
    }
};

const saveToDtoArrayColorImages = (numeCuloare, codCuloare) => {
    const { imagine, fisierInBucketDto, presignedUrl } = imageFormData.value;

    if (imagine && fisierInBucketDto && presignedUrl) {
        imageFormData.value.caleImagineDto = imagine.name;
        const newImageItem = {
            imageStream: imageFormData.value.imagine,
            fisierInBucketDto: imageFormData.value.fisierInBucketDto,
            caleImagineDto: imageFormData.value.imagine.name,
            presignedUrl: URL.createObjectURL(imageFormData.value.imagine),
            justAdded: true,
        };

        const currentColorInDtoArrIndex = product.value.culoriProdusDto.findIndex(
            color =>
                color.numeCuloareDto === numeCuloare && color.codCuloareDto === codCuloare
        );

        if (currentColorInDtoArrIndex !== -1) {
            const currentColorInDtoArr = product.value.culoriProdusDto[currentColorInDtoArrIndex];
            const isImageAlreadyInDtoIndex = currentColorInDtoArr.imaginiProdusDto.findIndex(
                image =>
                    image.caleImagineDto === imageFormData.value.caleImagineDto &&
                    image.fisierInBucketDto === fisierInBucketDto
            );

            if (isImageAlreadyInDtoIndex !== -1) {
                Swal.fire({
                    icon: 'error',
                    title: 'Eroare',
                    text: 'Imaginea deja exista',
                    footer: '<a href="#images">Vezi eroarea</a>',
                    timer: 3000,
                });
                return;
            }

            currentColorInDtoArr.imaginiProdusDto.push(newImageItem);

            imageFormData.value.fisierInBucketDto = '';
            imageFormData.value.imagine = null;
            imageFormData.value.presignedUrl = 'temp';

            showFormForAddingImage.value = false;
            dummyBoolean.value = true

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Eroare',
                text: 'Imaginea nu a fost gasita',
                footer: '<a href="#images">Vezi eroarea</a>',
                timer: 3000,
            });
            imageFormData.fisierInBucketDto = '';
            imageFormData.imagine = null;
            imageFormData.presignedUrl = '';
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Completati toate campurile',
            footer: '<a href="#images">Vezi eroarea</a>',
            timer: 3000,
        });
    }
};

function clearTypeFields(){
    typeFormData.value.categorie_ro = ''
    typeFormData.value.categorie_en = ''
    typeFormData.value.justAdded = false
}

function clearDimensionFields(){
    dimensionFormData.value.latimeDto = ''
    dimensionFormData.value.lungimeDto = ''
    dimensionFormData.value.pretDto = 0
    dimensionFormData.value.pretRedusDto = 0
    dimensionFormData.value.recomandarePat = ''
    dimensionFormData.value.justAdded = false
}

function clearColorFields(){
    colorFormData.value.codCuloareDto = ''
    colorFormData.value.culoare_ro = ''
    colorFormData.value.culoare_en = ''
    colorFormData.value.justAdded = false
}

function clearImageFields(){
    imageFormData.value.caleImagineDto = ''
    imageFormData.value.fisierInBucketDto = ''
    imageFormData.value.imagine = null
    URL.revokeObjectURL(imageFormData.value.presignedUrl)
    imageFormData.value.justAdded = false
    imageFormData.value.presignedUrl = 'temp'
}



const finalSaveData = async () => {
    closeTypeForm()
    clearTypeFields()
    closeDimensionForm()
    clearDimensionFields()
    closeColorForm()
    clearColorFields()
    closeImageForm()
    clearImageFields()
    
    console.log(product.value)
    console.log(originalProduct.value)

    if (JSON.stringify(product.value) !== JSON.stringify(originalProduct.value)) {
        const isValidMainForm = await mainForm.value.validate()
        console.log(isValidMainForm)
        if(isValidMainForm.valid){
            if(product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie'){
               if(product.value.pretBazaDto <= 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Selectati un pret de baza pentru produs de tip perdea/draperie',
                        timer: 7000,
                    });
                    return;
               }
               if(product.value.inaltimeMaximaDto <= 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Nu ati selectat o inaltime maxima pe material',
                        timer: 7000,
                    });
                    return;
               }
            }else{
                if(product.value.dimensiuniProduseDto.length <= 0 && product.value.pretBazaDto <= 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Daca produsul nu are nicio dimensiune , completati un pret de baza pentru produs si nu adaugati nicio dimensiune',
                        timer: 7000,
                    });
                    return;
                }else if(product.value.dimensiuniProduseDto.length > 0 && product.value.pretBazaDto > 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Daca produsul are dimensiune , lasati pretul de baza la 0',
                        timer: 7000,
                    });
                    return;
                }
                }
            if(product.value.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.value.tipulProdusuluiJsonDto.tip_ro === 'draperie'){
                product.value.dimensiuniProduseDto = []
            }
          

            const response = await adminService.saveProductChanges(product.value, product.value.oldCodProdusDto);
            if(response === -3){
                Swal.fire({
                    icon: 'error',
                    title: 'Eroare',
                    text: 'Produsul este cumparat de catre cineva. Va rugam asteptati pana la finalizare comenzii!',
                    timer: 3000,
                });
                return;
            }
            if (Array.isArray(response)) {
                
                const errorDetected = handleSaveResponseErrors(response);
                if (errorDetected) return;

                Swal.fire({
                    icon: 'success',
                    title: 'Succes',
                    text: 'Modificările au fost salvate cu succes!',
                    timer: 3000,
                });
                originalProduct.value = JSON.parse(JSON.stringify(product.value));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Eroare',
                    text: 'O eroare a avut loc!',
                    timer: 3000,
                });
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Eroare',
                text: 'Verificati formularul cu caracteristici generale!',
                timer: 3000,
            });
        }
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Nicio modificare detectată',
            text: 'Nu există modificări de salvat.',
            timer: 3000,
        });
    }
};
// de modificat de ce nu merge validate-ul . vezi form-ul cum sa-l activez cand panel-ul e inchis

const handleSaveResponseErrors = (response) => {
    let errorDetected = false;
    response.forEach((flag, index) => {
        if (flag === 0) {
            const errorMessages = [
                'O eroare a avut loc la caracteristice generale a produsului!',
                'O eroare a avut loc la tipurile produsului!',
                'O eroare a avut loc la imaginile produsului!',
                'O eroare a avut loc la culorile produsului!',
                'O eroare a avut loc la dimensiunile produsului!',
            ];
            Swal.fire({
                icon: 'error',
                title: 'Eroare',
                text: errorMessages[index],
                timer: 3000,
            });
            errorDetected = true;
        }
    });
    return errorDetected;
};



onMounted(async () => {
    productCode.value = route.params.codProdus;
    await assignFromDbToProduct(productCode.value);
    await assingProductCodesAndNamesFromDb();
    isLoading.value = false;
});

onBeforeMount(async() => {
    await assignProductOptionsFromDb();
   
})
</script>

<style scoped>
.customBackground {
    background: #0f0c29;
    background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);
    background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
}

.extensionPanelGradient {
    background: #00B4DB;
    background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);
    background: linear-gradient(to right, #0083B0, #00B4DB);
}
</style>
