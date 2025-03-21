<template>
  <v-app class="bg-grey-darken-3 " fluid>
    <AdminNavDrawerOnClient
        v-if="productCode"
        :product-code="productCode"
        type="product"
    ></AdminNavDrawerOnClient>
    <v-main class="h-100" v-if="!isLoading">
        <v-snackbar :timeout="3000" color="red" v-model="categoryExists" >
            Categoria deja exista !
        </v-snackbar>
        <v-snackbar :timeout="3000" color="red" v-model="dimensionExists" >
            Dimensiunea deja exista !
        </v-snackbar>
        <v-snackbar :timeout="3000" color="red" v-model="colorExists" >
            Culoarea deja exista !
        </v-snackbar>
        <v-snackbar :timeout="3000" color="red" v-model="imageExists" >
            Imaginea deja exista !
        </v-snackbar>
        <v-snackbar :timeout="3000" color="red" v-model="noProductTypeSelected" >
            Nu ati selectat tipul produsului !
        </v-snackbar>
        <v-fade-transition>
            <div>
                <v-alert v-if="watchToSave && route.query.general === '1'" v-model="watchToSave" type="warning" variant="tonal"  class="w-100 text-center">
                    <p>{{ watchToSaveText }}</p>
                    <p>
                        <v-btn @click="finalSaveData()" type="button" color="success" variant="flat"
                            class="font-weight-bold mt-2">
                            Salveaza modificari
                            <v-icon class="pl-2" :icon="mdiContentSave"></v-icon>
                        </v-btn>
                    </p>
                </v-alert>
                <v-card-title  v-if="route.query.general === '1'"  class="font-weight-light text-left text-white" >
                    <v-icon :icon="mdiCog" class="mr-2"></v-icon>Caracteristici generale
                </v-card-title>
            </div>
        </v-fade-transition>
        <v-fade-transition>
            <v-card-title  v-if="route.query.category === '1'"  class="font-weight-light text-left text-white" >
                <v-icon :icon="mdiShape" class="mr-2"></v-icon>Categorii
            </v-card-title>
        </v-fade-transition>
        <v-fade-transition>
            <v-card-title  v-if="route.query.dimension === '1'"  class="font-weight-light text-left text-white" >
                <v-icon :icon="mdiAlphaDBoxOutline" class="mr-2"></v-icon>Dimensiuni (centimetri)
            </v-card-title>
        </v-fade-transition>
        <v-fade-transition>
            <v-card-title v-if="route.query.color === '1'"  class="font-weight-light text-left text-white" >
                <v-icon :icon="mdiFormatColorFill" class="mr-2"></v-icon>Culori
            </v-card-title>
        </v-fade-transition>
        <!-- Product General Information -->
        <v-fade-transition>
            <v-card-text v-if="route.query.general === '1'">
                <v-form ref="mainForm" class="text-white text-center bg-grey-darken-4" >
                    <v-row class="p-2 m-2 bg-grey-darken-4">
                        <v-col cols="6" xs="12" s="12">
                            <v-text-field 
                                v-model="product.codProdusDto"
                                label="Cod Produs"
                                variant="outlined"
                                :counter="40"
                                density="compact"
                                :rules="[rules.checkProductCode,rules.maxChar(40)]"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="6" xs="12" s="12">
                            <v-combobox 
                                v-model="product.numeProducatorDto"
                                label="Producator"
                                variant="outlined"
                                :items="productOptions.manuFacturersDto"
                                item-title="key"
                                item-value="value"
                                :counter="30"
                                density="compact"
                                :rules="[rules.onlyLetters,rules.maxChar(30)]"
                            >
                              <template v-slot:counter={max,value}>
                                <span :style="{ color: value > max ? 'red' : 'white' }">
                                    {{ value }} / {{ max }}
                                </span>
                              </template>
                            </v-combobox>
                        </v-col>
                        <v-col cols="6" xs="12" s="12">
                            <v-text-field 
                                v-model="product.numeProdusJsonDto.nume_ro"
                                density="compact"
                                label="Nume Produs (Romana)"
                                :counter="50"
                                variant="outlined"
                                :rules="[rules.maxChar(50), rules.fieldNotEmpty,rules.checkProductName]"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="6" xs="12" s="12">
                            <v-text-field 
                                v-model="product.numeProdusJsonDto.nume_en"
                                density="compact"
                                label="Nume Produs (Engleza)"
                                :counter="50"
                                variant="outlined"
                                :rules="[rules.maxChar(50), rules.fieldNotEmpty,rules.checkProductNameEn]"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="6" xs="12" s="12" v-if="!isLoading">
                            <v-combobox
                                @update:search="mapTypeRoToEn(product , product.tipulProdusuluiJsonDto.tip_ro)"
                                v-model="product.tipulProdusuluiJsonDto.tip_ro"
                                label= "Tip produs (Romana)"
                                variant="outlined"
                                :counter="40"
                                :items="getProductTypesRo"
                                :rules="[rules.fieldNotEmpty,rules.maxChar(40)]"
                                    density="compact"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-combobox>
                        </v-col>
                        <v-col cols="6" xs="12" s="12" v-if="!isLoading">
                            <v-combobox 
                                @update:search="mapTypeEnToRo(product , product.tipulProdusuluiJsonDto.tip_en)"
                                v-model="product.tipulProdusuluiJsonDto.tip_en"
                                label= "Tip produs (Engleza)"
                                variant="outlined"
                                :counter="40"
                                :items="getProductTypesEn"
                                :rules="[rules.fieldNotEmpty, rules.maxChar(40)]"
                                density="compact"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-combobox>
                        </v-col>
                        <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                            <v-textarea
                                v-model="product.descriereJsonDto.descriere_ro"
                                label="Descriere Produs (Romana)"
                                :counter="150"
                                variant="outlined"
                                :rules="[rules.maxChar(150), rules.fieldNotEmpty]"
                                    density="compact"
                                rows="2"
                                auto-grow
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-textarea>
                        </v-col>
                        <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                            <v-textarea 
                            v-model="product.descriereJsonDto.descriere_en"
                                label="Descriere Produs (Engleza)"
                                :counter="150"
                                variant="outlined"
                                :rules="[rules.maxChar(150), rules.fieldNotEmpty]"
                                density="compact"
                                  rows="2"
                                auto-grow
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-textarea>
                        </v-col>
                        <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                            <v-text-field 
                                v-model="product.compozitieJsonDto.compozitie_ro"
                                label="Compozitie (Romana)"
                                :counter="50"
                                variant="outlined"
                                :rules="[rules.maxChar(50)]"
                                density="compact"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                            <v-text-field 
                                v-model="product.compozitieJsonDto.compozitie_en"
                                label="Compozitie (Engleza)"
                                :counter="50"
                                variant="outlined"
                                :rules="[rules.maxChar(50)]"
                                density="compact"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="4" xs="12" s="12">
                            <v-checkbox 
                                v-model="product.activInMagazinDto"
                                label="Activ in magazin"
                                variant="outlined"
                                density="compact"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="4" xs="12" s="12">
                            <v-checkbox 
                                v-model="product.fataReversibilaDto"
                                label="Față reversibilă"
                                variant="outlined"
                                density="compact"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="4" xs="12" s="12">
                            <v-checkbox
                                v-model="product.afiseazaInNoutatiDto"
                                label="Afiseaza in Noutati"
                                variant="outlined"
                                density="compact"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="6" xs="12" s="12">
                            <v-checkbox 
                                v-model="product.produsLimitatDto"
                                label="Afiseaza la Produse Limitate"
                                variant="outlined"
                                density="compact"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="6" xs="12" s="12">
                            <v-text-field 
                                v-model="product.tvaDto"
                                label="TVA (%)"
                                variant="outlined"
                                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                                density="compact"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                            <v-textarea 
                                v-model="product.ingrijireJsonDto.ingrijire_ro"
                                label="Instrucțiuni de îngrijire (Romana)"
                                :counter="150"
                                variant="outlined"
                                :rules="[rules.maxChar(150)]"
                                density="compact"
                                  rows="2"
                                auto-grow
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-textarea>
                        </v-col>
                        <v-col cols="12" xs="12" s="12" v-if="!isLoading">
                            <v-textarea 
                                v-model="product.ingrijireJsonDto.ingrijire_en"
                                label="Instrucțiuni de îngrijire (Engleza)"
                                :counter="150"
                                variant="outlined"
                                :rules="[rules.maxChar(150)]"
                                density="compact"
                                rows="2"
                                auto-grow
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-textarea>
                        </v-col>
                        <v-alert type="warning" variant="tonal" class="text-center" density="compact">
                            Daca produsul se aduce la comanda , lasati stocul la 0
                        </v-alert>
                        <v-col cols="12" xs="12" s="12">
                            <v-text-field 
                                v-model="product.stocDto"
                                label="Stoc produs"
                                variant="outlined"
                                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                                density="compact"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-alert type="warning" variant="tonal" class="text-center" density="compact">
                            Daca produsul are pret pe dimensiune , lasati pret baza la 0
                        </v-alert>
                        <v-col cols="12" xs="12" s="12">
                            <v-text-field 
                            density="compact"
                                v-model="product.pretBazaDto"
                                label="Pret baza produs (lei/m daca este perdea/draperie)"
                                variant="outlined"
                                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-alert type="warning" variant="tonal" class="text-center" density="compact">
                            Daca produsul are pret pe dimensiune , lasati la 0.
                        </v-alert>
                        <v-col cols="12" xs="12" s="12">
                            <v-text-field
                            density="compact"
                                v-model="product.pretBazaRedusDto"
                                label="Pret baza produs redus (lei/m daca este perdea/draperie)"
                                variant="outlined"
                                :rules="[rules.fieldNotEmpty, rules.onlyNumbers]"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-alert type="warning" variant="tonal" class="text-center" density="compact">
                            Daca produsul este perdea/draperie , daca nu lasati la 0.
                        </v-alert>
                        <v-col cols="12">
                            <v-text-field 
                                density="compact"
                                v-model="product.inaltimeMaximaDto"
                                label="Inaltime maxima material(metri)"
                                variant="outlined"
                                :rules="[rules.fieldNotEmpty, rules.onlyNumbers, ]"
                            >
                            <template v-slot:counter={max,value}>
                              <span :style="{ color: value > max ? 'red' : 'white' }">
                                  {{ value }} / {{ max }}
                              </span>
                            </template>
                          </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
              </v-card-text>
          </v-fade-transition>
          <v-fade-transition >
            <v-card-text   v-if="route.query.category === '1'">
            <v-dialog v-model="openCategoryModification" persistent
            max-width="500"
            max-height="700" scrollable>
                <v-card class="bg-grey-darken-4" max-width="500" max-height="700" >
                    <v-card-text>
                        <v-form ref="modifyCategoryForm" validate-on="input">
                            <v-row class="p-2 bg-grey-darken-4">
                                <v-col cols="12">
                                    <v-combobox
                                        @update:search="mapCategoryRoToEn(productCategoryToModify , productCategoryToModify.categorieJsonDto.categorie_ro ,false)"
                                        class="mx-2"
                                        v-model="productCategoryToModify.categorieJsonDto.categorie_ro"
                                        :items="getProductCategoriesRo"
                                        label="Categorie (Romana)"
                                        :rules="[rules.maxChar(40) , rules.fieldNotEmpty,rules.onlyLetters]"
                                        :counter="40"
                                        outlined
                                        clearable
                                    ></v-combobox>
                                </v-col>
                                <v-col cols="12">
                                    <v-combobox
                                        @update:search="mapCategoryEnToRo(productCategoryToModify, productCategoryToModify.categorieJsonDto.categorie_en , false)"
                                        class="mx-2"
                                        v-model="productCategoryToModify.categorieJsonDto.categorie_en"
                                        :items="getProductCategoriesEn"
                                        label="Categorie (Engleza)"
                                        :rules="[rules.maxChar(40) , rules.fieldNotEmpty,rules.onlyLetters]"
                                        :counter="40"
                                        outlined
                                        clearable
                                    ></v-combobox>
                                </v-col> 
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="6" class="text-center">
                                    <v-btn class="bg-green" type="button" @click="saveCategoryModification()">
                                        Salveaza
                                    </v-btn>
                                </v-col>
                                <v-col cols="6" @click="closeCategoryModification()" class="text-center">
                                    <v-btn class="bg-red" type="button">
                                        Inchide
                                    </v-btn>
                                </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-data-table
            :headers="categoryHeaders"
            :items="product.tipuriProduseDto"
            items-per-page="10"
            item-value="categorieJsonDto.categorie_ro"
            class="bg-grey-darken-4"
        
            >
            <template v-slot:top>
                <v-toolbar flat class="bg-grey-darken-4 text-center">
                    <v-row class="text-center">
                        <v-col cols="12">
                            <v-btn color="white" class="bg-primary" @click="showTypeForm">
                                Adauga categorie <v-icon :icon=mdiPlus></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-toolbar>
                <v-divider></v-divider>
            </template>
            <template #[`item.actions`]="{ item }">
                <v-icon
                    :disabled="!item.canDelete"
                    color="red"
                    size="28"
                    class="mr-2"
                    @click="deleteType(item.categorieJsonDto.categorie_ro,item.categorieJsonDto.categorie_en)" :icon="mdiTrashCan"
                    >
                </v-icon>
                <v-icon
                    color="white"
                    size="28"
                    class="mr-2"
                    @click="modifyType(item)" :icon="mdiPen"
                    >
                </v-icon>
            </template>
            <template #[`item.justAdded`]="{item}">
                <div v-if="item.justAdded === true">
                    <span class="text-red">Nu</span>
                </div> 
                <div v-else>
                    <span class="text-green">Da</span>
                </div>
            </template>
            </v-data-table>
          </v-card-text>
        </v-fade-transition>
        <v-fade-transition>
          <v-card-text  v-if="route.query.dimension === '1'" >
                  <v-dialog v-model="openDimensionModification" persistent
                  max-width="500"
                  max-height="700" scrollable>
                  <v-card class="bg-grey-darken-4" max-width="500" max-height="700" >
                      <v-card-text>
                          <v-form ref="modifyDimensionForm" validate-on="input">
                              <v-row class="p-2 bg-grey-darken-4">
                                  <v-col cols="6">
                                      <v-combobox
                                          v-model="productDimensionToModify.lungimeDto"
                                          label="Lungime"
                                          :items="productOptions.lungimiForBox"
                                          :rules="[rules.onlyNumbers,rules.maxChar(10),rules.fieldNotEmpty]"
                                          variant="outlined"
                                      ></v-combobox>
                                  </v-col>
                                  <v-col cols="6">
                                      <v-combobox
                                          v-model="productDimensionToModify.latimeDto"
                                          label="Latime"
                                          :items="productOptions.latimiForBox"
                                          variant="outlined"
                                          :rules="[rules.onlyNumbers,rules.maxChar(10),rules.fieldNotEmpty]"
                                      ></v-combobox>
                                  </v-col>
                                  <v-col cols="6">
                                      <v-text-field
                                          v-model="productDimensionToModify.pretDto"
                                          label="Pret(RON)"
                                          variant="outlined"
                                          :rules="[rules.onlyNumbers,rules.fieldNotEmpty]"
                                      ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                      <v-combobox
                                          v-model="productDimensionToModify.recomandarePat"
                                          label="Recomandare pat"
                                          :items="productOptions.recomandariForBox"
                                          variant="outlined"
                                          :rules="[rules.recomandarePatRule]"
                                      ></v-combobox>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-text-field
                                          v-model="productDimensionToModify.pretRedusDto"
                                          label="Pret redus(RON)"
                                          variant="outlined"
                                          :rules="[rules.onlyNumbers,rules.fieldNotEmpty]"
                                      ></v-text-field>
                                  </v-col>
                              </v-row>
                          </v-form>
                      </v-card-text>
                      <v-card-actions>
                          <v-row>
                              <v-col cols="6" class="text-center">
                                      <v-btn class="bg-green" type="button" @click="saveDimensionModification()">
                                          Salveaza
                                      </v-btn>
                                  </v-col>
                                  <v-col cols="6" @click="closeDimensionModification()" class="text-center">
                                      <v-btn class="bg-red" type="button">
                                          Inchide
                                      </v-btn>
                                  </v-col>
                          </v-row>
                      </v-card-actions>
                  </v-card>
              
              </v-dialog>
              <v-data-table
              :headers="dimensionHeaders"
              :items="product.dimensiuniProduseDto"
              items-per-page="10"
              :item-value="item => item"
              class="bg-grey-darken-4"
          
              >
              <template v-slot:top>
                  <v-toolbar flat class="bg-grey-darken-4 text-center">
                      <v-row class="text-center">
                          <v-col cols="12">
                              <v-btn color="white" class="bg-primary" @click="showDimensionForm()" :readonly="product.tipulProdusuluiJsonDto.tip_ro === 'perdea' || product.tipulProdusuluiJsonDto.tip_ro === 'draperie'">
                                  Adauga dimensiune <v-icon :icon=mdiPlus></v-icon>
                              </v-btn>
                          </v-col>
                      </v-row>
                  </v-toolbar>
                  <v-divider></v-divider>
              </template>
              <template #[`item.actions`]="{ item }">
                  <v-icon
                      :disabled="!item.canDelete"
                      color="red"
                      size="28"
                      class="mr-2"
                      @click="deleteDimension(item.lungimeDto, item.latimeDto, item.pretDto, item.pretRedusDto, item.recomandarePat)" :icon="mdiTrashCan"
                      >
                  </v-icon>
                  <v-icon
                      color="white"
                      size="28"
                      class="mr-2"
                      @click="modifyDimension(item)" :icon="mdiPen"
                      >
                  </v-icon>
              </template>
              <template #[`item.justAdded`]="{item}">
                  <div v-if="item.justAdded === true">
                      <span class="text-red">Nu</span>
                  </div> 
                  <div v-else>
                      <span class="text-green">Da</span>
                  </div>
              </template>
              </v-data-table>
          </v-card-text>
        </v-fade-transition>
        <v-fade-transition>
          <v-card-text v-if="route.query.color === '1'">
              <v-dialog v-model="openColorModification" persistent
                  max-width="500"
                  max-height="700" scrollable>
                  <v-card class="bg-grey-darken-4" max-width="500" max-height="700" >
                      <v-card-text>
                          <v-form ref="modifyColorForm" validate-on="input">
                              <v-row class="p-2 bg-grey-darken-4">
                                  <v-col cols="12">
                                      <v-combobox
                                          v-model="productColorToModify.codCuloareDto"
                                          label="Cod Culoare"
                                          :items="productOptions.coduriCuloriForBox"
                                          variant="outlined"
                                          :rules="[rules.fieldNotEmpty , rules.onlyNumbers]"
                                      ></v-combobox>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-combobox
                                          @update:search="mapColorRoToEn(productColorToModify , productColorToModify.numeCuloareJsonDto.culoare_ro)"
                                          v-model="productColorToModify.numeCuloareJsonDto.culoare_ro"
                                          label="Nume Culoare (Romana)"
                                          :rules="[rules.fieldNotEmpty]"
                                          :items="getColorsRo"
                                          variant="outlined"
                                      ></v-combobox>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-combobox
                                          @update:search="mapColorEnToRo(productColorToModify , productColorToModify.numeCuloareJsonDto.culoare_en)"
                                          v-model="productColorToModify.numeCuloareJsonDto.culoare_en"
                                          label="Nume Culoare (Engleza)"
                                          :rules="[rules.fieldNotEmpty]"
                                          :items="getColorsEn"
                                          variant="outlined"
                                      ></v-combobox>
                                  </v-col>
                              </v-row>
                          </v-form>
                      </v-card-text>
                      <v-card-actions>
                          <v-row>
                              <v-col cols="6" class="text-center">
                                  <v-btn class="bg-green" type="button" @click="saveColorModification()">
                                      Salveaza
                                  </v-btn>
                              </v-col>
                              <v-col cols="6" @click="closeColorModification()" class="text-center">
                                  <v-btn class="bg-red" type="button">
                                      Inchide
                                  </v-btn>
                              </v-col>
                          </v-row>
                      </v-card-actions>
                  </v-card>
              
              </v-dialog>
              <v-dialog v-model="openImageDialog" persistent
                  max-width="500"
                  max-height="700" scrollable>
                <v-card class="bg-grey-darken-4" max-width="500" max-height="700" >
                  <v-card-text>
                    <v-form ref="modifyImageForm">
                      <v-row>
                        <v-col cols="12">
                          <v-combobox
                            density="compact"
                            v-model="imageToModify.fisierInBucketDto"
                            label="Categorie fișier"
                            :items="productOptions.directoriesInBucket"
                            outlined
                          ></v-combobox>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input
                            density="compact"
                            v-model="imageToModify.file"
                            label="Imagine"
                            :prepend-icon="mdiImage"
                            accept="image/*"
                            outlined
                            dense
                            clearable
                            @change="handleFileChange(imageToModify)"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" class="text-center">
                          <NuxtImg
                            v-if="imageToModify.presignedUrl"
                            :src="imageToModify.presignedUrl"
                            :width="100"
                            :height="100"
                            class="text-center"
                          ></NuxtImg>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                          <v-row>
                              <v-col cols="6" class="text-center">
                                  <v-btn class="bg-green" type="button" @click="saveImageModification()">
                                      Salveaza
                                  </v-btn>
                              </v-col>
                              <v-col cols="6" @click="closeImageModification()" class="text-center">
                                  <v-btn class="bg-red" type="button">
                                      Inchide
                                  </v-btn>
                              </v-col>
                          </v-row>
                      </v-card-actions>
                </v-card>
              </v-dialog>
              <v-data-table 
                  :headers="colorImagesHeaders"
                  :items="product.culoriProdusDto"
                  item-value="numeCuloareJsonDto.culoare_ro"
                  class="bg-grey-darken-4"
                  show-expand
              > 
                  <template v-slot:top>
                      <v-toolbar flat class="bg-grey-darken-4 text-center">
                          <v-row class="text-center">
                              <v-col cols="12">
                                  <v-btn  rounded="xl" @click="showColorForm()" type="button" color="white"
                                      variant="outlined" class="font-weight-bold mt-2">
                                      Adauga culoare
                                      <v-icon class="pl-2" :icon="mdiPlus"></v-icon>
                                  </v-btn>
                              </v-col>
                          </v-row>
                      </v-toolbar>
                      <v-divider></v-divider>
                  </template>
                  <template #[`item.actions`]="{ item }">
                      <v-icon
                          :disabled="!item.canDelete"
                          color="red"
                          size="28"
                          class="mr-2"
                          @click="deleteColor(item.numeCuloareJsonDto.culoare_ro, item.codCuloareDto)" :icon="mdiTrashCan"
                          >
                      </v-icon>
                      <v-icon
                          color="white"
                          size="28"
                          class="mr-2"
                          @click="modifyColor(item)" :icon="mdiPen"
                          >
                      </v-icon>
                  </template>
                  <template v-slot:[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
                      <v-btn
                          :append-icon="isExpanded(internalItem) ? mdiChevronUp : mdiChevronDown"
                          :text="isExpanded(internalItem) ? 'Imagini' : 'Imagini'"
                          class="text-none bg-primary"
                          color="white"
                          size="small"
                          variant="text"
                          border
                          slim
                          @click="toggleExpand(internalItem)"
                      ></v-btn>
                  </template>
                  <template #[`item.justAdded`]="{item}">
                      <div v-if="item.justAdded === true">
                          <span class="text-red">Nu</span>
                      </div> 
                      <div v-else>
                          <span class="text-green">Da</span>
                      </div>
                  </template>
                  <template v-slot:expanded-row="{ columns, item: color }">
                      <tr>
                          <td :colspan="columns.length" class="py-2">
                          <v-sheet class="bg-grey-darken-3">
                              <v-data-table
                              :headers="imagHeaders"
                              :items="color.imaginiProdusDto"
                              hide-default-footer
                              density="compact"
                              class="bg-grey-darken-3"
                              >
                              <template v-slot:top>
                                  <v-toolbar flat class="bg-grey-darken-3 text-center">
                                      <v-row class="text-center">
                                          <v-col cols="12">
                                              <v-btn rounded="xl" @click="addImageField(color)" type="button" color="white"
                                                  variant="outlined" class="font-weight-bold mt-2">
                                                  Adauga imagine
                                                  <v-icon :icon="mdiPlus" class="pl-2"></v-icon>
                                              </v-btn>
                                          </v-col>
                                      </v-row>
                                  </v-toolbar>
                                  
                              </template>
                              <template #[`item.justAdded`]="{item}">
                                  <div v-if="item.justAdded === true">
                                      <span class="text-red">Nu</span>
                                  </div> 
                                  <div v-else>
                                      <span class="text-green">Da</span>
                                  </div>
                              </template>
                              <template #[`item.actions`]="{ item }">
                                  <v-icon
                                      color="red"
                                      size="28"
                                      class="mr-2"
                                      :disabled="!item.canDelete"
                                      @click="deleteImage(color.numeCuloareJsonDto.culoare_ro, color.codCuloareDto, item.caleImagineDto, item.fisierInBucketDto)" :icon="mdiTrashCan"
                                      >
                                  </v-icon>
                                  <v-icon
                                      color="white"
                                      size="28"
                                      class="mr-2"
                                      @click="modifyImage(item,color.numeCuloareJsonDto.culoare_ro ,color.numeCuloareJsonDto.culoare_en,color.codCuloareDto )" :icon="mdiPen"
                                      >
                                  </v-icon>
                              </template>
                              <template #[`item.presignedUrl`]="{ item }">
                                  <NuxtImg :src="item.presignedUrl" preload
                                  width="50"
                                  height="50" class="ma-2">

                                  </NuxtImg>
                              </template>
                              </v-data-table>
                          </v-sheet>
                          </td>
                      </tr>
                  </template>
              </v-data-table>
          </v-card-text>
        </v-fade-transition>
        
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, handleError } from 'vue'
import Swal from "sweetalert2";
import adminService from '~/services/Admin'
import { mdiAlphaDBoxOutline, mdiCog,mdiChevronUp ,mdiChevronDown ,mdiContentSave, mdiDeleteCircle, mdiFormatColorFill, mdiImage, mdiPen, mdiPlus, mdiShape, mdiTrashCan } from '@mdi/js';
import AdminNavDrawerOnClient from '~/components/admin/AdminNavDrawerOnClient.vue';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
const isLoading = ref(true)
const productCodesAndNames = ref([]);
const codProdusArray = ref([])
const numeProdusArrayRo = ref([])
const numeProdusArrayEn = ref([])
const pattern = /^.*_X\d{2}_.*$/;
const route = useRoute()
const watchToSave = ref(true);
const watchToSaveText = ref('Daca ati facut o modificare, nu uitati sa salvati!');
const productCode = ref('ADAUGARE PRODUS')
const modifyCategoryForm = ref(null);
const modifyDimensionForm = ref(null);
const modifyColorForm = ref(null);
const noProductTypeSelected = ref(false)
const product = reactive({
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

const rules = reactive({
  fieldNotEmpty: (value) => !!String(value) || "Campul este obligatoriu",
  maxChar: len => value => !value || value.length <= len || `${t('textFieldsMessages.maxLength')} ${len}`,
  lengthNotAbove: (len) => (value) => 
    !value || value.length <= len || `Limita este de ${len} caractere`,
    onlyNumbers: (value) =>
    /^\d+(\.\d{1,2})?$/.test(String(value).trim()) ||
    "Doar numere sunt permise",
  onlyLetters: (value) => /^[a-zA-Z\s]+$/.test(value) || "Doar litere sunt permise",
  recomandarePatRule: (value) =>
    /^[0-9]+x[0-9]+$/.test(String(value).trim()) ||
    "Recomandarea pat trebuie sa fie in format 130x270",

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
})

const dimensionHeaders = ref([
    {title: 'Lungime (cm)' , align: 'center' , key: 'lungimeDto' , sortable: true},
    {title: 'Latime (cm)' , align: 'center' , key: 'latimeDto' , sortable: true},
    {title: 'Recomandare pat (cmxcm)' , align: 'center' , key: 'recomandarePat' , sortable: true},
    {title: 'Pret (RON)' , align: 'center' , key: 'pretDto' , sortable: true},
    {title: 'Pret redus (RON)' , align: 'center' , key: 'pretRedusDto' , sortable: true},
    {title: 'Salvat' , align: 'center' , key: 'justAdded' , sortable: true},
    {title: 'Actiuni', align: 'center', key: 'actions', sortable: false }
])


const colorImagesHeaders = ref([
  { title: 'Culoare (Română)', align: 'center' ,key: 'numeCuloareJsonDto.culoare_ro' },
  { title: 'Culoare (Engleza)', align: 'center' ,key: 'numeCuloareJsonDto.culoare_en' },
  { title: 'Cod Culoare', align: 'center' ,key: 'codCuloareDto' },
  { title: 'Salvat' , align: 'center' , key: 'justAdded' , sortable: true},
  { title: 'Actiuni', align: 'center' ,key: 'actions', sortable: false }
]);

const imagHeaders = ref([
    { title: 'Nume imagine', align: 'center' ,key: 'caleImagineDto' },
    { title: 'Fisier', align: 'center' ,key: 'fisierInBucketDto' },
    { title: 'Imagine', align: 'center' ,key: 'presignedUrl' },
    { title: 'Salvat' , align: 'center' , key: 'justAdded' , sortable: true},
    { title: 'Actiuni', align: 'center' ,key: 'actions', sortable: false }
])

const categoryHeaders = ref([
    {title: 'Categorie (Romana)' , align: 'center' , key: 'categorieJsonDto.categorie_ro' , sortable: true},
    {title: 'Categorie (Engleza)' , align: 'center' , key: 'categorieJsonDto.categorie_en' , sortable: true},
    {title: 'Salvat' , align: 'center' , key: 'justAdded' , sortable: true},
    {title: 'Actiuni', align: 'center', key: 'actions', sortable: false }
])

const openImageDialog = ref(false);

const openCategoryModification = ref(false)
const productCategoryToModify = ref({})
const originalCategory = ref({})
const categoryExists = ref(false)
const categoryInitialIndex = ref(-1)

const openDimensionModification = ref(false)
const productDimensionToModify = ref({})
const originalDimension = ref({})
const dimensionExists = ref(false)
const dimensionInitialIndex = ref(-1)

const openColorModification = ref(false)
const productColorToModify = ref({})
const originalColor = ref({})
const colorExists = ref(false)
const colorInitialIndex = ref(-1)

const imageExists = ref(false)

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
    return productOptions.value.productTypesJson ?
        productOptions.value.productTypesJson.map(item => item.tip_ro)
    : [];
})

const getProductTypesEn = computed(() => {
    return productOptions.value.productTypesJson ?
        productOptions.value.productTypesJson.map(item => item.tip_en)
    : [];
})



const mapColorRoToEn = (color , roValue ) => {
  if(roValue !== null){
    const index = getColorsRo.value.findIndex(category => category === roValue.toLowerCase());
    if (index !== -1) {
      color.numeCuloareJsonDto.culoare_en = getColorsEn.value[index];
    }
  }
};

const mapColorEnToRo = (color , enValue ) => {
  if(enValue !== null){
    const index = getColorsEn.value.findIndex(category => category === enValue.toLowerCase());
    if (index !== -1) {
      color.numeCuloareJsonDto.culoare_ro = getColorsRo.value[index];
    } 
  }
};

const mapCategoryRoToEn = (category , roValue) => {
  if(roValue !== null){
    const index = getProductCategoriesRo.value.findIndex(category => category === roValue.toUpperCase());
    if (index !== -1) {
      category.categorieJsonDto.categorie_en = getProductCategoriesEn.value[index];
    } 
  }
};

const mapCategoryEnToRo = (category ,enValue) => {
  if(enValue !== null){
    const index = getProductCategoriesEn.value.findIndex(category => category === enValue.toUpperCase());
    if (index !== -1) {
      category.categorieJsonDto.categorie_ro = getProductCategoriesRo.value[index];
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


const assignProductOptionsFromDb = async () => {
    const responseForOptions = await adminService.getProductOptions();
    
    if (responseForOptions === 0) {
        console.log('No options for products in db');
    } else if (responseForOptions === -2) {
        navigateTo('/user/logout');
    } else {
        Object.assign(productOptions.value, responseForOptions);
    }
};

const assingProductCodesAndNamesFromDb = async () => {
    const response = await adminService.getProductCodesAndNames();

    if(response.length === 0){
        console.log("No products in db");
    }else {
        productCodesAndNames.value = response;
        numeProdusArrayRo.value = productCodesAndNames.value
            .map(elem => elem.numeProdusJson.nume_ro)
            .filter(numeRo => numeRo !== product.numeProdusJsonDto.nume_ro);
        numeProdusArrayEn.value = productCodesAndNames.value
            .map(elem => elem.numeProdusJson.nume_en)
            .filter(numeEn => numeEn !== product.numeProdusJsonDto.nume_en);
        codProdusArray.value = productCodesAndNames.value
            .map(elem => elem.codProdus)
            .filter(elem => elem !== product.codProdusDto);

    }
}

const showTypeForm = () => {
  product.tipuriProduseDto.push({
    categorieJsonDto : {
      categorie_ro : "",
      categorie_en: "",
    },
    justAdded: true,
    canDelete : true,
  });
}

const modifyType = ((category) => {
    productCategoryToModify.value = JSON.parse(JSON.stringify(category)) // same ref with category copii
    originalCategory.value = JSON.parse(JSON.stringify(category)) // deep copy , new obj , copii
    categoryInitialIndex.value = product.tipuriProduseDto.findIndex(p =>
      p.categorieJsonDto.categorie_ro.toUpperCase() === originalCategory.value.categorieJsonDto.categorie_ro &&
      p.categorieJsonDto.categorie_en.toUpperCase() === originalCategory.value.categorieJsonDto.categorie_en
    );
    openCategoryModification.value = true
})

const saveCategoryModification = async () => {
  const isValid = await modifyCategoryForm.value.validate();

  if (isValid.valid) {
    // Mark it as updated and normalize to uppercase.
    productCategoryToModify.value.justAdded = true;
    productCategoryToModify.value.categorieJsonDto.categorie_ro =
      productCategoryToModify.value.categorieJsonDto.categorie_ro.toUpperCase();
    productCategoryToModify.value.categorieJsonDto.categorie_en =
      productCategoryToModify.value.categorieJsonDto.categorie_en.toUpperCase();
    productCategoryToModify.value.canDelete = true
      
    // Duplicate category
    const duplicateIndex = product.tipuriProduseDto.findIndex(p =>
      p.categorieJsonDto.categorie_ro.toUpperCase() === productCategoryToModify.value.categorieJsonDto.categorie_ro &&
      p.categorieJsonDto.categorie_en.toUpperCase() === productCategoryToModify.value.categorieJsonDto.categorie_en
    );
  
    // if category entered already exists
    if (duplicateIndex !== -1) {
        categoryExists.value = true
        product.tipuriProduseDto[duplicateIndex] = product.tipuriProduseDto[duplicateIndex]
    }else{
        product.tipuriProduseDto[categoryInitialIndex.value] = productCategoryToModify.value
    }
    openCategoryModification.value = false;
    return;
  }
};


const closeCategoryModification = ( () =>{
    productCategoryToModify.value = originalCategory.value
    openCategoryModification.value = false
})


const deleteType = (categorie,categorieEn) => {
  product.tipuriProduseDto = product.tipuriProduseDto.filter(
    (type) =>
      !(
        type.categorieJsonDto.categorie_ro === categorie &&  type.categorieJsonDto.categorie_en === categorieEn
      )
  );
}

const showDimensionForm = () => {
  product.dimensiuniProduseDto.push({
    lungimeDto: "",
    latimeDto: "",
    pretDto: 0,
    pretRedusDto: 0,
    recomandarePat: "",
    justAdded: true,
    canDelete : true,
  });
}

const modifyDimension = ((dimension) => {
    productDimensionToModify.value = JSON.parse(JSON.stringify(dimension))
    originalDimension.value = JSON.parse(JSON.stringify(dimension))
    dimensionInitialIndex.value = product.dimensiuniProduseDto
        .findIndex(p => 
                p.lungimeDto === productDimensionToModify.value.lungimeDto
            && p.latimeDto === productDimensionToModify.value.latimeDto
            && p.recomandarePat === productDimensionToModify.value.recomandarePat
            
        )
    openDimensionModification.value = true
    
})

const saveDimensionModification = (async () => {
    const isValid = await modifyDimensionForm.value.validate()
    if(isValid.valid){
    
        productDimensionToModify.justAdded = true;
        productDimensionToModify.canDelete = false;

        const duplicateIndex = product.dimensiuniProduseDto
            .findIndex(p => 
                   p.lungimeDto === productDimensionToModify.value.lungimeDto
                && p.latimeDto === productDimensionToModify.value.latimeDto
                && p.recomandarePat === productDimensionToModify.value.recomandarePat
               
            )
        if (duplicateIndex !== -1) {
            dimensionExists.value = true
            product.dimensiuniProduseDto[duplicateIndex] =  product.dimensiuniProduseDto[duplicateIndex]
        }else{
            product.dimensiuniProduseDto[dimensionInitialIndex.value] = productDimensionToModify.value
        }
        openDimensionModification.value = false;
        return;
      
    }
})

const closeDimensionModification = ( () =>{
    productDimensionToModify.value = originalDimension.value
    openDimensionModification.value = false
})

const deleteDimension = (
  lungime,
  latime,
  pret,
  pretRedus,
  recomandarePat
) => {
  product.dimensiuniProduseDto =
    product.dimensiuniProduseDto.filter(
      (dimension) =>
        !(
          dimension.lungimeDto === lungime &&
          dimension.latimeDto === latime &&
          dimension.pretDto === pret &&
          dimension.pretRedusDto === pretRedus &&
          dimension.recomandarePat === recomandarePat
        )
    );
}

const showColorForm = () => {
  product.culoriProdusDto.push({
    numeCuloareDto: "",
    numeCuloareJsonDto : {
      culoare_ro : "",
      culoare_en : ""
    },
    codCuloareDto: "",
    imaginiProdusDto: [],
    justAdded: true,
    canDelete: true,
  });
}

const modifyColor = ((color) => {
    productColorToModify.value = JSON.parse(JSON.stringify(color))
    originalColor.value = JSON.parse(JSON.stringify(color))
    colorInitialIndex.value = product.culoriProdusDto
        .findIndex(p => 
            p.codCuloareDto === productColorToModify.value.codCuloareDto
            && p.numeCuloareJsonDto.culoare_ro === productColorToModify.value.numeCuloareJsonDto.culoare_ro
        )
    openColorModification.value = true
})

const saveColorModification = (async () => {
    const isValid = await modifyColorForm.value.validate()
    if(isValid.valid){
        productColorToModify.justAdded = true;
        productColorToModify.canDelete = false;
        const duplicateIndex = product.culoriProdusDto
            .findIndex(p => 
                p.codCuloareDto === productColorToModify.value.codCuloareDto
                && p.numeCuloareJsonDto.culoare_ro === productColorToModify.value.numeCuloareJsonDto.culoare_ro
            )
        if(duplicateIndex !== -1){
            colorExists.value = true
            product.culoriProdusDto[duplicateIndex] = product.culoriProdusDto[duplicateIndex]
        }else{
            product.culoriProdusDto[colorInitialIndex.value] = productColorToModify.value
        }
        openColorModification.value = false
        return
    }
})

const closeColorModification = ( () =>{
    productColorToModify.value = originalColor.value
    openColorModification.value = false
})

const deleteColor = (numeCuloare, codCuloare) => {
  product.culoriProdusDto = product.culoriProdusDto.filter(
    (color) =>
      !(
        color.numeCuloareJsonDto.culoare_ro === numeCuloare &&
        color.codCuloareDto === codCuloare
      )
  );
}

const addImageField = (culoare) => {
  culoare.imaginiProdusDto.push({
    file: null,
    fisierInBucketDto: "",
    caleImagineDto: "",
    presignedUrl: "",
    justAdded: true,
    canDelete: true,
  });
}
const imageToModify = ref({})
const colorIndex = ref(-1)
const imageToModifyIndex = ref(-1)
const originalImage = ref({})
const modifyImage = (image,colorName , colorNameEn , colorCode) => {
  imageToModify.value = JSON.parse(JSON.stringify(image))
  originalImage.value = JSON.parse(JSON.stringify(image))
  colorIndex.value = product.culoriProdusDto.findIndex(p => p.numeCuloareJsonDto.culoare_ro === colorName
    && p.numeCuloareJsonDto.culoare_en === colorNameEn
    && p.codCuloareDto === colorCode
  )
  imageToModifyIndex.value = product.culoriProdusDto[colorIndex.value].imaginiProdusDto
    .findIndex(image => imageToModify.value.caleImagineDto === image.caleImagineDto 
                     && imageToModify.value.fisierInBucketDto === image.fisierInBucketDto)
   
    openImageDialog.value = true
}

const saveImageModification = () => {
  
    if(product.tipulProdusuluiJsonDto.tip_ro === null || product.tipulProdusuluiJsonDto.tip_ro === '' 
    || product.tipulProdusuluiJsonDto.tip_en === null || product.tipulProdusuluiJsonDto.tip_en === '' 
  ){
    noProductTypeSelected.value = true
    return
  }
  // search already existing image
  imageToModify.value.canDelete = true
  imageToModify.value.justAdded = false
  const fileExtension = imageToModify.value.file.name.split('.').pop();

  const dotIndex = imageToModify.value.file.name.lastIndexOf('.');

  let baseName = dotIndex !== -1 ? imageToModify.value.file.name.substring(0, dotIndex) :imageToModify.value.file.name;
  if (pattern.test(imageToModify.value.file.name)) {
      imageToModify.value.caleImagineDto = baseName + `.${fileExtension}`;
  } else {
      imageToModify.value.caleImagineDto = baseName + 
          `_X${product.culoriProdusDto[colorIndex.value].codCuloareDto}_` + 
          `${product.tipulProdusuluiJsonDto.tip_ro.toUpperCase()}` 
          + `.${fileExtension}`;
  }

  const findAlreadyExistingImage = product.culoriProdusDto[colorIndex.value].imaginiProdusDto
    .findIndex(image => imageToModify.value.caleImagineDto === image.caleImagineDto 
                     && imageToModify.value.fisierInBucketDto === image.fisierInBucketDto)
   
  
  if(findAlreadyExistingImage !== -1){
    imageExists.value = true
    product.culoriProdusDto[colorIndex.value].imaginiProdusDto[imageToModifyIndex.value] = originalImage.value
    openImageDialog.value = false
    return
  }
  
  
  product.culoriProdusDto[colorIndex.value].imaginiProdusDto[imageToModifyIndex.value] = imageToModify.value
  openImageDialog.value = false
  
}

const closeImageModification = () => {
  imageToModify.value = originalImage.value
  openImageDialog.value = false
}

const handleFileChange = (imagine) => {
  imagine.caleImagineDto = imagine.file.name;
  imagine.presignedUrl = URL.createObjectURL(imagine.file);
  imagine.file = imagine.file;
}

const deleteImage = (numeCuloare, codCuloare, caleImagineDto, fisierInBucket) => {
  const currentColor = product.culoriProdusDto.find(
    (color) =>
      color.numeCuloareJsonDto.culoare_ro === numeCuloare &&
      color.codCuloareDto === codCuloare
  );
  if (currentColor) {
    const imageToDelete = currentColor.imaginiProdusDto.find(
      (image) =>
        image.caleImagineDto === caleImagineDto &&
        image.fisierInBucketDto === fisierInBucket
    );
    
    if (imageToDelete && imageToDelete.presignedUrl) {
      URL.revokeObjectURL(imageToDelete.presignedUrl);
    }

    currentColor.imaginiProdusDto = currentColor.imaginiProdusDto.filter(
      (image) =>
        !(
          image.caleImagineDto === caleImagineDto &&
          image.fisierInBucketDto === fisierInBucket
        )
    );
  }
}

const mainForm = ref(null);

const finalSaveData = async () => {

  const isValidForm = await mainForm.value.validate()
  
  if(isValidForm.valid)
    {
      Swal.fire({
          title: "Confirmati adaugare?",
          showDenyButton: true,
          showCancelButton: true,
          allowOutsideClick: false, 
          allowEscapeKey: false,
          confirmButtonText: "Da",
          denyButtonText: `Nu`,
      }).then(async (result) => {
          if (result.isConfirmed) {

              if(product.tipulProdusuluiJsonDto.tip_ro.toLowerCase() === 'perdea' || product.tipulProdusuluiJsonDto.tip_ro.toLowerCase() === 'draperie'){
                if(product.inaltimeMaximaDto <= 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Nu ati selectat o inaltime maxima pe material',
                        timer: 7000,
                    });
                  return;
                }
                if(product.dimensiuniProduseDto.length > 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Nu puteti avea dimensiune pe o draperie/perdea',
                        timer: 7000,
                    });
                  return;
                }
                if(product.pretBazaDto <= 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Selectati un pret de baza pentru perdeaua/draperia',
                        timer: 7000,
                    });
                  return;
                }
              }else{
                if(product.dimensiuniProduseDto.length <= 0 && product.pretBazaDto <= 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Daca produsul nu are nicio dimensiune , completati un pret de baza pentru produs si nu adaugati nicio dimensiune',
                        timer: 7000,
                    });
                  return;
                }else if(product.dimensiuniProduseDto.length > 0 && product.pretBazaDto > 0){
                  Swal.fire({
                        icon: 'error',
                        title: 'Eroare',
                        text: 'Daca produsul are dimensiune , lasati pretul de baza la 0',
                        timer: 7000,
                    });
                  return;
                }
              }
              product.tipuriProduseDto = product.tipuriProduseDto.filter(type => type.categorieJsonDto.categorie_ro !== ""
                  &&  type.categorieJsonDto.categorie_en !== ""
              )
              product.culoriProdusDto = product.culoriProdusDto.filter(color => color.numeCuloareJsonDto.culoare_ro !== ""
                  &&  color.numeCuloareJsonDto.culoare_en !== "" && color.codCuloare !== ""
              )
              product.dimensiuniProduseDto = product.dimensiuniProduseDto.filter(dimension => dimension.lungimeDto !== "" &&
                dimension.latimeDto !== "" && dimension.pretDto !== "" && dimension.pretDto !== 0 )
              const addingProductResponse = await adminService.saveProductChanges(product,'empty');
              if(Array.isArray(addingProductResponse)){
                  Swal.fire("Salvat!", "", "success");
                  navigateTo(`/admin/product/${product.codProdusDto.toUpperCase()}`)
                  return
              }else{
                  Swal.fire("Nu s-a salvat.O eroare a avut loc" , "" , "error")
                  return;
              }
          } else if (result.isDenied) {
              Swal.fire("Nu ati salvat nimic", "", "info");
              return;
          }
          });
      return;
    }else{
      Swal.fire({
          icon: 'error',
          title: 'Eroare',
          text: 'O eroare a avut loc la validarea formularului',
          timer: 3000
      })
      return
    }
}

onMounted(async () => {
  await assingProductCodesAndNamesFromDb();
  isLoading.value = false;
})

onBeforeMount(async() => {
    await assignProductOptionsFromDb();
})



</script>

<style scoped>
.customBackground {
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
}

.extensionPanelGradient {
  background: linear-gradient(to right, #0083b0, #00b4db);
}
</style>
