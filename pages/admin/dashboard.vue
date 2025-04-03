<template>
      <v-app class="bg-grey-darken-3">
        <!-- <AdminNavDrawerOnDashboard></AdminNavDrawerOnDashboard> -->
        <v-main>
          <v-container fluid>
            <v-sheet color="grey-darken-3">
              <v-container fluid>
                <p class="font-weight-light h3">
                  <v-icon class="mr-2" :icon="mdiMonitorDashboard" size="24"></v-icon>
                  Dashboard
                </p>
              </v-container>
              <v-divider></v-divider>
              <v-container fluid class="text-center">
                <v-alert v-if="loaded" class="mb-3 p-2" variant="tonal" type="success"
                closable>
                  <p class="font-weight-thin h6 text-center text-white">
                    Datele din perioada selectata au fost incarcate!
                  </p>
                </v-alert>
                <v-alert class="mb-3 p-2" variant="tonal" type="info">
                  <p class="font-weight-thin h6 text-left text-white">
                    Initial , nicio data nu este selectata , deci informatiile care se afiseaza sunt 
                    de la prima , pana la ultima comanda din ziua de azi
                  </p>
                </v-alert>
                <v-alert class="mb-6 p-2" variant="tonal" type="info">
                  <p class="font-weight-thin h6 text-left text-white">
                    Pentru a vedea informatii dintr-o anumita perioada , selectati doua date.
                  </p>
                </v-alert>
                <v-alert class="mb-6 p-2" variant="tonal" type="info">
                  <p class="font-weight-thin h6 text-left text-white">
                    Unde se afiseaza <b>N/A</b> inseamna ca nu sunt date pentru acel element ,
                      in perioada curenta / perioada totala.
         
                  </p>
                </v-alert>
                <v-date-input
                  v-model="chooseDate"
                  label="Selecteaza date"
                  multiple="range"
                  :max="maxDate"
                  variant="outlined"
                 base-color="blue">
                </v-date-input>
                <v-btn variant="flat" color="primary" class="text-center"
                @click="displayDataInRange(chooseDate)">
                  Modifica
                </v-btn>
                <v-btn variant="flat" color="primary" class="text-center mx-2"
                @click="reset()">
                  Reseteaza
                </v-btn>
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  color="primary"
                  class="ma-3"
                ></v-progress-circular>
                <p v-if="loaded && chooseDate !== null" class="font-weight-light h3 my-4">Perioada selectata: 
                  <b>{{ new Date(Math.min(...chooseDate)).toISOString().substring(0,10) }}</b> --- <b>{{ new Date(Math.max(...chooseDate)).toISOString().substring(0,10) }}</b>
                </p>
              </v-container>
              <v-divider></v-divider>
              <v-row no-gutters>
                <v-col cols="6" class="p-2">
                 
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-title>
                      <p class="text-center font-weight-light">TOTAL INCASARI</p>
                    </v-card-title>
                    <v-card-text>
                      <p class="text-center font-weight-light h4">{{ dashBoardData.totalIncasariGeneral }} RON</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6" class="p-2">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4">
                    <v-card-title>
                      <p class="text-center font-weight-light">PRET MEDIU COMANDA</p>
                    </v-card-title>
                    <v-card-text>
                      <p class="text-center font-weight-light h4">{{ dashBoardData.pretMediuComandaGeneral }} RON</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row v-if="mounted">
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                        <LineChartClient v-if="computedSeriesForTodayOrders && mounted"
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'Venit zi curenta'"
                          :title-alignment="'center'"
                          :x-label="'Ora'"
                          :y-label="'Valoare(RON)'"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computedSeriesForTodayOrders">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                        <LineChartClient v-if="computedSeriesForMonthlyOrders && mounted"
                          :chart-type="'area'"
                          :height="300"
                          :title-text="'Venit lunar'"
                          :title-alignment="'center'"
                          :x-label="'Data'"
                          :y-label="'Valoare(RON)'"
                          :is-category-x-axis="false"
                          :is-numeric-x-axis="false"
                          :is-date-time-x-axis="true"
                          :series="computedSeriesForMonthlyOrders">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                        <LineChartClient v-if="computedSeriesForYearlyOrders && mounted"
                          :chart-type="'area'"
                          :height="300"
                          :title-text="'Venit anual'"
                          :title-alignment="'center'"
                          :x-label="'Data'"
                          :y-label="'Valoare(RON)'"
                          :is-category-x-axis="false"
                          :is-numeric-x-axis="false"
                          :is-date-time-x-axis="true"
                          :series="computedSeriesForYearlyOrders">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                        <LineChartClient v-if="computeSeriesFor10MostSelledProducts && mounted"
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'10 cele mai vandute produse'"
                          :title-alignment="'center'"
                          :x-label="'COD PRODUS'"
                          :y-label="'Valoare vanzari (RON)'"
                          :categories="Object.keys(dashBoardData.venitTotalPeProdus)"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computeSeriesFor10MostSelledProducts">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                      <LineChartClient v-if="computeSeriesForOrders && mounted" 
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'Comenzi'"
                          :title-alignment="'center'"
                          :y-label="'Nr. comenzi'"
                          :x-label="'Stare comenzi'"
                          :categories="Object.keys(dashBoardData.tipuriComenziGeneral)"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computeSeriesForOrders">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                      <LineChartClient v-if="computeSeriesForSalesPerProduct && mounted" 
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'Venit pe produs'"
                          :x-label="'COD PRODUS'"
                          :y-label="'Valoare vanzari (RON)'"
                          :title-alignment="'center'"
                          :categories="Object.keys(dashBoardData.venitTotalPeProdus)"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computeSeriesForSalesPerProduct">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                      <LineChartClient v-if="computeBounceRate && mounted" 
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'Rata de iesire (%)'"
                          :title-alignment="'center'"
                          :y-label="'Procentaj (%)'"
                          :categories="['Rata de iesire (%)']"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computeBounceRate">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                      <LineChartClient v-if="computeAverageSessionTime&&mounted" 
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'Utilizatorul normal'"
                          :title-alignment="'center'"
                          :y-label="'Minute'"
                          :categories="['Sesiune media a utilizatorului']"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computeAverageSessionTime">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                      <LineChartClient v-if="computeEngagementSession && mounted" 
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'Numarul de sesiuni mai lungi (>10 secunde)'"
                          :title-alignment="'center'"
                          :y-label="'Numar sesiuni'"
                          :categories="['Numarul de sesiuni']"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computeEngagementSession">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card :style="boxShadowStyle" class="p-2 bg-grey-darken-4 ">
                    <v-card-text>
                      <LineChartClient v-if="computeEngagementRate&&mounted" 
                          :chart-type="'bar'"
                          :height="300"
                          :title-text="'Rata de angajament mai lunga (>10 secunde)'"
                          :title-alignment="'center'"
                          :y-label="'Procentaj (%)'"
                          :categories="['Sesiune media a utilizatorului']"
                          :is-category-x-axis="true"
                          :is-numeric-x-axis="false"
                          :series="computeEngagementRate">
                      
                      </LineChartClient>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <!-- <v-col cols="12" class="p-2">
                  <v-expansion-panels >
                    <v-expansion-panel
                     :style="boxShadowStyle" class="bg-grey-darken-4"
                     :expand-icon="mdiPlus"
                     :collapse-icon="mdiMinus">
                      <v-expansion-panel-title>
                        <p class="h5 font-weight-light">VENIT PER PRODUS</p>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-data-table v-if="mounted"
                            :headers="filteredHeaders"
                            :items="parseTotalRevenuePerProduct"
                            :items-per-page="15"
                            item-value="codProdus"
                            class="bg-grey-darken-3 p-4"
                            >
                            <template #[`item.codProdus`]="{ item }">
                              <p class="font-weight-light text-"> <v-icon @click="navigateTo(`/admin/product/${item.codProdus}` , {open:{target: '_blank'}})" class="mx-2" :icon="mdiEye" size="24"></v-icon>
                                <NuxtLink class="text-decoration-none text-white" :to="{ name: 'admin-product-codProdus___ro', params: { codProdus: item.codProdus }}"
                                target="_blank">
                                    {{ item.codProdus }}</NuxtLink>
                              </p>
                            </template>

                        </v-data-table>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col> -->
                <v-col cols="12" class="p-2 my-2">
                  <v-card :style="boxShadowStyle" class="bg-grey-darken-4">
                    <v-card-title>
                      <p class="font-weight-light h5 text-center">PRODUSE</p>
                    </v-card-title>
                    <v-card-text>
                      <v-expansion-panels>
                        <v-expansion-panel class="my-2 bg-grey-darken-1" 
                        v-for="(categories, productType, index) in dashBoardData.tipuriProduse" :key="index"
                        :collapse-icon="mdiMinus" :expand-icon="mdiPlus">
                          <v-expansion-panel-title>
                            <p class="h5 font-weight-light text-uppercase">{{ productType }}</p>
                          </v-expansion-panel-title>
                          <v-expansion-panel-text >
                            <v-expansion-panels>
                              <v-expansion-panel  class="bg-grey-darken-3 p-2 m-2" :collapse-icon="mdiMinus"
                              :expand-icon="mdiPlus"
                              v-for="(statuses, category, idx) in categories" :key="idx"
                              :title="category">
                                <v-expansion-panel-text   
                                class="p-2 ">
                                <v-row no-gutters>
                                    <v-col cols="6">
                                      <p class="font-weight-light h5">PRODUSE ACTIVE</p>
                                      <v-row v-for="(count, i) in Object.entries(statuses).filter(([status]) => status === 'Activ')" :key="i">
                                        <v-col>
                                          <p v-if="count[1]" class="font-weight-light h6">{{ count[1] }} {{ count[1] === 1 ? 'produs' : 'produse' }}</p>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                    <v-col cols="6">
                                      <p class="font-weight-light h5">PRODUSE INACTIVE</p>
                                      <v-row v-for="(count, i) in Object.entries(statuses).filter(([status]) => status === 'Inactiv')" :key="i">
                                        <v-col>
                                          <p class="font-weight-light h6">{{ count[1] }} {{ count[1] === 1 ? 'produs' : 'produse' }}</p>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-text>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                      <v-divider></v-divider>
                      <v-row no-gutters>
                        <v-col col="6" class="mx-1 p-2">
                          <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2">
                            <v-card-title>
                              <p class="text-center font-weight-light text-green">Active</p>
                            </v-card-title>
                            <v-card-text  v-for="(count, i) in activeProductsTotal" :key="i">
                              <p class="text-center font-weight-light h5">{{ count[1] }} produse</p>
                            </v-card-text>
                          </v-card>
                        </v-col>
                        <v-col col="6" class="mx-1 p-2">
                          <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2">
                            <v-card-title>
                              <p class="text-center font-weight-light text-red">Inactive</p>
                            </v-card-title>
                            <v-card-text  v-for="(count, i) in inactiveProductsTotal" :key="i">
                              <p class="text-center font-weight-light h5">{{ count[1] }} produse</p>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                     
                    </v-card-text>
                  </v-card>
                </v-col>
                <!-- <v-col cols="12" class="my-2 p-2">
                  <v-expansion-panels >
                    <v-expansion-panel
                     :style="boxShadowStyle" class="bg-grey-darken-4"
                     :expand-icon="mdiPlus"
                     :collapse-icon="mdiMinus">
                      <v-expansion-panel-title>
                        <p class="h5 font-weight-light">5 CELE MAI VANDUTE PRODUSE</p>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-data-table v-if="mounted"
                            :headers="headers"
                            :items="parseinfoPerTop5Product"
                            :items-per-page="5"
                            item-value="codProdus"
                            class="bg-grey-darken-3 p-4"
                            >
                            <template #[`item.codProdus`]="{ item }">
                              <p class="font-weight-light text-"> <v-icon @click="navigateTo(`/admin/product/${item.codProdus}` , {open:{target: '_blank'}})" class="mx-2" :icon="mdiEye" size="24">mdi-eye</v-icon>
                                <NuxtLink class="text-decoration-none text-white" :to="{name:'admin-product-codProdus___ro' , params: {codProdus : item.codProdus}}"
                                target="_blank">
                                    {{ item.codProdus }}</NuxtLink>
                              </p>
                            </template>

                        </v-data-table>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col> -->
                <v-col cols="12" class="my-2 p-2">
                  <!-- <v-card :style="boxShadowStyle" class="bg-grey-darken-4">
                    <v-card-title>
                      <p class="font-weight-light h3 text-center">CLIENTI</p>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-card  class="bg-grey-darken-4">
                          <v-card-title>
                            <p class="font-weight-light text-center h5 text-green">INREGISTRATI</p>
                          </v-card-title>
                          <v-card-text v-if="registeredClients.length > 0">
                            <div v-for="(clientType,i) in registeredClients"
                            :key="i">
                              <p class="font-weight-light h5 text-center">{{ clientType[1] }} </p>
                            </div>
                          </v-card-text>
                          <v-card-text v-else>
                              <p class="font-weight-light h5 text-center">N/A</p>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="6">
                        <v-card  class="bg-grey-darken-4">
                          <v-card-title>
                            <p class="font-weight-light text-center h5 text-red">NEINREGISTRATI</p>
                          </v-card-title>
                          <v-card-text v-if="unregisteredClients.length > 0">
                            <div v-for="(clientType,i) in unregisteredClients"
                            :key="i">
                              <p class="font-weight-light h5 text-center">{{ clientType[1] }} </p>
                            </div>
                          </v-card-text>
                          <v-card-text v-else>
                            <p class="font-weight-light h5 text-center"> N/A </p>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card> -->
                </v-col>
              </v-row>
              <!-- <v-col cols="12" class="my-2 p-2">
                <v-card :style="boxShadowStyle" class="bg-grey-darken-4">
                    <v-card-title>
                      <p class="font-weight-light h3 text-center">COMENZI</p>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-row no-gutters>
                      <v-col cols="4">
                        <v-card  class="bg-grey-darken-4">
                          <v-card-title>
                            <p class="font-weight-light text-center h5 text-green">FINALIZATE</p>
                          </v-card-title>
                          <v-card-text v-if="finishedOrders.length > 0">
                            <div v-for="(orderType,i) in finishedOrders"
                            :key="i">
                              <p class="font-weight-light h5 text-center">{{ orderType[1] }} </p>
                            </div>
                          </v-card-text>
                          <v-card-text v-else>
                              <p class="font-weight-light h5 text-center">N/A</p>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="4">
                        <v-card  class="bg-grey-darken-4">
                          <v-card-title>
                            <p class="font-weight-light text-center h5 text-red">ANULATE</p>
                          </v-card-title>
                          <v-card-text v-if="canceledOrders.length > 0">
                            <div v-for="(orderType,i) in canceledOrders"
                            :key="i">
                              <p class="font-weight-light h5 text-center">{{ orderType[1] }} </p>
                            </div>
                          </v-card-text>
                          <v-card-text v-else>
                            <p class="font-weight-light h5 text-center"> N/A </p>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="4">
                        <v-card  class="bg-grey-darken-4">
                          <v-card-title>
                            <p class="font-weight-light text-center h5 text-orange">PROCESATE</p>
                          </v-card-title>
                          <v-card-text v-if="processedOrders.length > 0">
                            <div v-for="(orderType,i) in canceledOrders"
                            :key="i">
                              <p class="font-weight-light h5 text-center">{{ orderType[1] }} </p>
                            </div>
                          </v-card-text>
                          <v-card-text v-else>
                            <p class="font-weight-light h5 text-center"> N/A </p>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-divider></v-divider>
                      <v-col cols="6">
                        <v-card  class="bg-grey-darken-4">
                          <v-card-title>
                            <p class="font-weight-light text-center h5 text-blue">IN PROCESARE</p>
                          </v-card-title>
                          <v-card-text v-if="processingOrders.length > 0">
                            <div v-for="(orderType,i) in processingOrders"
                            :key="i">
                              <p class="font-weight-light h5 text-center">{{ orderType[1] }} </p>
                            </div>
                          </v-card-text>
                          <v-card-text v-else>
                            <p class="font-weight-light h5 text-center"> N/A </p>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="6">
                        <v-card  class="bg-grey-darken-4">
                          <v-card-title>
                            <p class="font-weight-light text-center h5 text-yellow">RETURNATE</p>
                          </v-card-title>
                          <v-card-text v-if="returnedOrders.length > 0">
                            <div v-for="(orderType,i) in returnedOrders"
                            :key="i">
                              <p class="font-weight-light h5">{{ orderType[1] }} </p>
                            </div>
                          </v-card-text>
                          <v-card-text v-else>
                            <p class="font-weight-light h5 text-center"> N/A </p>
                          </v-card-text>
                        </v-card>
                      </v-col>
                     
                    </v-row>
                  </v-card>
              </v-col> -->
              <v-container fluid class="my-3">
                <v-divider opacity="0"></v-divider>
                <v-divider opacity="0"></v-divider>

                <p class="font-weight-light h3 text-center">Date Google Analytics </p>
                <v-divider></v-divider>
                <v-container fluid>
                  <p class="font-weight-light h4 mt-3">Date generale <v-btn color="blue" @click="getGAData()"><v-icon :icon="mdiRefresh"  ></v-icon></v-btn></p>
                  <v-progress-circular
                    v-if="isLoadingGAData"
                    indeterminate
                    color="primary"
                    class="ma-3"
                  ></v-progress-circular>
                  <v-divider></v-divider>
                  <v-row no-gutters>
                    <v-col cols="4">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 mx-1">
                        <v-card-text>
                          <p class="font-weight-light h5 text-center">Useri activi: {{ GAData.totalActiveUsers !== 0 ? GAData.totalActiveUsers : 'N/A'}}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 mx-1">
                        <v-card-text>
                          <p class="font-weight-light h5 text-center">Useri activi(1 zi): {{ GAData.totalOneDayActiveUsers !== 0 ? GAData.totalOneDayActiveUsers : 'N/A'}}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="4">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 mx-1">
                        <v-card-text>
                          <p class="font-weight-light h5 text-center">Useri activi(28 zile): {{ GAData.total28DayActiveUsers !== 0 ? GAData.total28DayActiveUsers : 'N/A'}}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 m-2">
                        <v-card-text>
                          <p class="font-weight-light h5 text-center">Vizualizari pagini: {{ GAData.totalScreenPageViews !== 0 ? GAData.totalScreenPageViews : 'N/A'}}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 m-2">
                        <v-card-title class="my-2">
                          <p class="font-weight-light h4 text-center">Vizualizari / Pagina</p>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-data-table  v-if="mounted"
                            :headers="usersPerPageHeaders"
                            :items="parsedUsersPerPageData"
                            :items-per-page="15"
                            item-value="pageName"
                            class="bg-grey-darken-3 p-4"
                            >
                        </v-data-table>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <p class="font-weight-light h4 mt-3">Date reale  <v-btn color="blue" @click="getGAData()"><v-icon :icon="mdiRefresh"  ></v-icon></v-btn></p>
                  <v-progress-circular
                    v-if="isLoadingGAData"
                    indeterminate
                    color="primary"
                    class="ma-3"
                  ></v-progress-circular>
                  <v-divider></v-divider>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 mx-1">
                        <v-card-text>
                          <p class="font-weight-light h5 text-center">Useri activi: {{ GAData.totalActiveUsersReal !== 0 ? GAData.totalActiveUsersReal : 'N/A'}}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 m-2">
                        <v-card-text>
                          <p class="font-weight-light h5 text-center">Vizualizari pagini: {{ GAData.totalScreenPageViewsReal !== 0 ? GAData.totalScreenPageViewsReal : 'N/A'}}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-card :style="boxShadowStyle" class="bg-grey-darken-4 p-2 m-2">
                        <v-card-title class="my-2">
                          <p class="font-weight-light h4 text-center">Vizualizari / Pagina</p>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-data-table  v-if="mounted"
                            :headers="filteredHeadersReal"
                            :items="parsedUsersPerPageDataReal"
                            :items-per-page="15"
                            item-value="pageName"
                            class="bg-grey-darken-3 p-4"
                            >
                        </v-data-table>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
            </v-sheet>
            
          </v-container>
        </v-main>
      </v-app>
  </template>

<script setup>
import adminService from '~/services/Admin';
import { VDateInput } from 'vuetify/labs/components';
import { mdiEye, mdiMinus, mdiMonitorDashboard, mdiPlus, mdiRefresh, mdiRefreshCircle } from '@mdi/js';
import LineChartClient from '~/components/admin/ApexCharts/LineChart.client.vue';
const dashBoardData = ref({
  pretMediuComandaGeneral: 0,
  // tipuriClientiGeneral : {},
  
  tipuriComenziGeneral: {},
  tipuriProduse: {},
  topProduseVanduteGeneral : [],
  totalIncasariGeneral : 0,
  venitTotalPeProdus : {}
})
const GAData = ref({})
const chooseDate = ref(null)
const today = new Date().toISOString().substring(0,10)
const maxDate = ref(today)
const isLoading = ref(false);
const loaded = ref(false)
const isLoadingGAData = ref(false)
const mounted = ref(false)

definePageMeta({
    layout: 'admin',
    middleware: ['admin']
})

// const runTimeConfig = useRuntimeConfig();

const usersPerPageHeaders = ref([
  { title: 'Nume pagina', align: 'center', key: 'pageName' },
  { title: 'Total useri activi', align: 'center', key: 'activeUsers' , sortable: false},
  { title: 'Total useri activi(1 zi)', align: 'center', key: 'active1DayUsers', sortable: false },
  { title: 'Total useri activi(28 zi)', align: 'center', key: 'active28DayUsers' , sortable: false},
  { title: 'Vizualizari pagina', align: 'center', key: 'pageViews' , sortable: false},
  { title: 'Orase', align: 'center', key: 'cities'},
])

const usersPerPageHeaderReal = ref([
  { title: 'Nume pagina', align: 'center', key: 'pageName' },
  { title: 'Total useri activi ', align: 'center', key: 'activeUsers' , sortable: false},
  { title: 'Total useri activi(1 zi) ', align: 'center', key: 'active1DayUsers', sortable: false  , isAdded: true},
  { title: 'Total useri activi(28 zi) ', align: 'center', key: 'active28DayUsers' , sortable: false, isAdded: true},
  { title: 'Vizualizari pagina', align: 'center', key: 'pageViews' , sortable: false},
  { title: 'Orase', align: 'center', key: 'cities'},
])

const filteredHeadersReal = usersPerPageHeaderReal.value.filter(state => state.isAdded != true)


const headers =ref( [
  { title: 'Cod produs', align: 'center', key: 'codProdus' },
  { title: 'Venit acumulat(RON)', align: 'center', key: 'venitTotal' },
  { title: 'Nr. vanzari', align: 'center', key: 'nrVanzari'  , isAdded: true},
])

const filteredHeaders = headers.value.filter(state => state.isAdded != true)

const swal = useNuxtApp().$swal;
const boxShadowStyle = {
  boxShadow: '27px 21px 102px -21px rgba(32,18,230,1)',
  webkitBoxShadow: '27px 21px 102px -21px rgba(32,18,230,1)',
  mozBoxShadow: '27px 21px 102px -21px rgba(32,18,230,1)',
}




const activeProductsTotal = computed(() => {
  return Object.entries(dashBoardData.value.totalProduse ?? {}).filter(([status]) => status === 'Active');
});

const inactiveProductsTotal = computed(() => {
  return Object.entries(dashBoardData.value.totalProduse ?? {}).filter(([status]) => status === 'Inactive');
});

// const registeredClients = computed(() => {
//   if (dashBoardData.value.tipuriClientiGeneral) {
//     return Object.entries(dashBoardData.value.tipuriClientiGeneral).filter(([status]) => status === 'Inregistrat');
//   }
//   return []; // Return an empty array if the data is not yet available
// });

// const unregisteredClients = computed(() => {
//   if (dashBoardData.value.tipuriClientiGeneral) {
//     return Object.entries(dashBoardData.value.tipuriClientiGeneral).filter(([status]) => status === 'Neinregistrat');
//   }
//   return []; // Return an empty array if the data is not yet available
// });

// const finishedOrders = computed(() => {
//   if (dashBoardData.value.tipuriComenziGeneral) {
//     return Object.entries(dashBoardData.value.tipuriComenziGeneral).filter(([status]) => status === 'Finalizata');
//   }
//   return []; // Return an empty array if the data is not yet available
// });

// const returnedOrders = computed(() => {
//   if (dashBoardData.value.tipuriComenziGeneral) {
//     return Object.entries(dashBoardData.value.tipuriComenziGeneral).filter(([status]) => status === 'Rambursata');
//   }
//   return []; // Return an empty array if the data is not yet available
// });

// const canceledOrders = computed(() => {
//   if (dashBoardData.value.tipuriComenziGeneral) {
//     return Object.entries(dashBoardData.value.tipuriComenziGeneral).filter(([status]) => status === 'Anulata');
//   }
//   return []; // Return an empty array if the data is not yet available
// });


// const processingOrders = computed(() => {
//   if (dashBoardData.value.tipuriComenziGeneral) {
//     return Object.entries(dashBoardData.value.tipuriComenziGeneral).filter(([status]) => status === 'InProcesare');
//   }
//   return []; // Return an empty array if the data is not yet available
// });

// const processedOrders = computed(() => {
//   if (dashBoardData.value.tipuriComenziGeneral) {
//     return Object.entries(dashBoardData.value.tipuriComenziGeneral).filter(([status]) => status === 'Procesata');
//   }
//   return []; // Return an empty array if the data is not yet available
// });



const parsedUsersPerPageData = computed(() => {
  if(GAData.value.useriActiviPerPagina){
    return Object.entries(GAData.value.useriActiviPerPagina).map(userData => {
      return {
        pageName : userData[0],
        activeUsers : userData[1].totalActiveUserPerPage,
        active1DayUsers : userData[1].totalActiveUser1DayPerPage,
        active28DayUsers : userData[1].totalActiveUser28DayPerPage,
        pageViews : userData[1].totalCurrentPageViews,
        cities : userData[1].cities.join(", ")
      };
    });
  }
})

const parsedUsersPerPageDataReal = computed(() => {
  if(GAData.value.useriActiviPerPagina){
    return Object.entries(GAData.value.useriActiviPerPaginaReal).map(userData => {
      return {
        pageName : userData[0],
        activeUsers : userData[1].totalActiveUserPerPage,
        active1DayUsers : userData[1].totalActiveUser1DayPerPage,
        active28DayUsers : userData[1].totalActiveUser28DayPerPage,
        pageViews : userData[1].totalCurrentPageViews,
        cities : userData[1].cities.join(", ")
      };
    });
  }
})

const reset = (async () => {
  isLoading.value = true;
  const responseFromDatabaseData = await adminService.getMainDashboardData(null, null)
  const responseFromAnalyticsData  = await adminService.getGoogleAnalyticsData(null , null)
  Object.assign(dashBoardData.value, responseFromDatabaseData);
  Object.assign(GAData.value, responseFromAnalyticsData);
  chooseDate.value = null
  loaded.value = false;
  isLoading.value = false;
})

const displayDataInRange = (async (chooseDate) => {
  if(chooseDate !== null){
    isLoading.value = true;
    loaded.value = false;
    let minDateMilisecs = Math.min(...chooseDate)
    let maxDateMilisecs = Math.max(...chooseDate)

    const minDate_DateTime = new Date(minDateMilisecs).toISOString() //string
    const maxDate_DateTime = new Date(maxDateMilisecs).toISOString() // string

    const minDate_Date = minDate_DateTime.substring(0,10); // string
    const maxDate_Date = maxDate_DateTime.substring(0,10); // string

    const responseFromDatabaseData = await adminService.getMainDashboardData(minDate_DateTime, maxDate_DateTime)
    const responseFromAnalyticsData  = await adminService.getGoogleAnalyticsData(minDate_Date , maxDate_Date)
    console.log(responseFromAnalyticsData)
    console.log(responseFromDatabaseData)

    Object.assign(dashBoardData.value, responseFromDatabaseData);
    Object.assign(GAData.value, responseFromAnalyticsData);

    isLoading.value = false;
    loaded.value = true;

    setTimeout(() => {
      loaded.value = false
    }, 5000);

  }else{
    fireAlarm('error' , '' , 'Selectati doua date!' , 4000)
    return;
  }
  




})





function fireAlarm(icon, title, text,timer) {
  if (timer !== null) {
    swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: true,
      timer: timer,
    });
  } else {
    swal.fire({
      icon: 'info',
      title: 'Loading...',
      text: 'Asteptati...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        swal.showLoading();
      },
    });
  }
}

const getDashboardData = (async () => {
  const response = await adminService.getMainDashboardData();
  if(Object.keys(response).length !== 0){
    Object.assign(dashBoardData.value,response)
    // dashBoardData.value = response
    console.log('in fetch' , dashBoardData.value)
    swal.close()
  }else{
    swal.close()
    fireAlarm('error' , 'Eroare' , 'O eroare a avut loc' , 5000)
  }
})

const getGAData = (async () => {
  isLoadingGAData.value = true;
  const response_GA = await adminService.getGoogleAnalyticsData()
  swal.close()
  Object.assign(GAData.value , response_GA);
  console.log(GAData.value)
  GAData.value.bounceRate = (GAData.value.bounceRate * 100).toFixed(2);
  GAData.value.engagementRate = (GAData.value.engagementRate * 100).toFixed(2);
  GAData.value.averageSessionDuration = Math.round(GAData.value.averageSessionDuration / 60)
  isLoadingGAData.value = false;
})

// const parseTotalRevenuePerProduct = computed(() => {
//   // Use Object.entries to iterate over the object
//   return Object.entries(dashBoardData.value.venitTotalPeProdus).map(([key, value]) => {
//     // Create a new object with codProdus and venitTotal
//     return {
//       codProdus: key,     // The product code (key)
//       venitTotal: value   // The total revenue (value)
//     };
//   });
// });

// const parseinfoPerTop5Product = computed(() => {
//   return Object.values(dashBoardData.value.topProduseVanduteGeneral).map(product => {
//     return {
//       codProdus: product.codProdus,     // The product code
//       venitTotal: product.venitTotal,   // The total revenue
//       nrVanzari: product.nrVanzari      // The number of sales
//     };
//   });
// });


const computeSeriesFor10MostSelledProducts = computed(() => {
  if (dashBoardData.value.topProduseVanduteGeneral) {
    return [
      {
        // name: '5 cele mai vandute produse',
        data: dashBoardData.value.topProduseVanduteGeneral.map(product => ({
          x: product.codProdus,
          y: product.venitTotal,
          sales: product.nrVanzari,
        }))
      }
    ];
  }
  return [];
});

const  computeSeriesForSalesPerProduct = computed(() => {
  if(dashBoardData.value.venitTotalPeProdus){
    return [
      {
        data: Object.entries(dashBoardData.value.venitTotalPeProdus).map(([key, value]) => {
          return {
            x: key.split("_")[0],    // product code
            y: value , // total sum acquired
            sales:  key.split("_")[1]  // the sales
          };
        })
      }
    ]
  }
})

const  computeSeriesForOrders = computed(() => {
  if(dashBoardData.value.tipuriComenziGeneral){
    return [
      {
        data: Object.entries(dashBoardData.value.tipuriComenziGeneral).map(([key, value]) => {
          return {
            x: key,    // order type
            y: value , // total orders per type
            order : 'type'
          };
        })
      }
    ]
  }
})

const computeBounceRate = computed(() => {
  if(GAData.value.bounceRate){
    return [{
      data : [
        {
          x : 'Rata de iesire (%)',
          y : GAData.value.bounceRate,
          percent : 'percent'
        }
      ]
    }]
  }
}) 

const computeAverageSessionTime = computed(() => {
  if(GAData.value.averageSessionDuration){
    return [{
      data : [
        {
          x : 'Sesiune medie utilizator',
          y : GAData.value.averageSessionDuration,
          seconds : 'seconds'
        }
      ]
    }]
  }
})// + averageSessionDurations

const computeEngagementRate = computed(() => {
  if(GAData.value.engagementRate){
    return [{
      data : [
        {
          x : 'Rata de sesiuni (%)',
          y : GAData.value.engagementRate,
          percent : 'percent'
        }
      ]
    }]
  }
})

const computeEngagementSession = computed(() => {
  if(GAData.value.engagementSessions){
    return [{
      data : [
        {
          x : 'Nr. de sesiuni mai lungi',
          y : GAData.value.engagementSessions,
          order : 'type'
        }
      ]
    }]
  }
})

const computedSeriesForTodayOrders = computed(() => {
  if(dashBoardData.value.oneDayRevenue){
    return [
      {
        data: dashBoardData.value.oneDayRevenue.map(item => ({
          x: item.orderHourTime,
          y: item.revenue,
          typeCount : 'typeCount',
          count : item.ordersCount
        }))
      },
    ];
  }
  
});

const computedSeriesForMonthlyOrders = computed(() => {
  if(dashBoardData.value.oneMonthRevenue){
    return [
      {
        data: dashBoardData.value.oneMonthRevenue.map(item => ({
          x: item.day.split("T")[0],
          y: item.revenue,
          month : 'month',
          // typeCount : 'typeCount',
          count : item.ordersCount
        }))
      },
    ];
  }
})

const computedSeriesForYearlyOrders = computed(() => {
  if(dashBoardData.value.oneYearRevenue){
    return [
      {
        data: dashBoardData.value.oneYearRevenue.map(item => ({
          x: item.month,
          y: item.revenue,
          month : 'month',
          count : item.ordersCount
        }))
      },
    ];
  }
})

// const pointAnnotations = computed(() => {
//   if (!dashBoardData.value.oneYearRevenue) return [];

//   return dashBoardData.value.oneYearRevenue.map(item => ({
//     x: item.month, 
//     y: item.revenue,
//     marker: {
//       size: 5,
//       fillColor: '#fff',
//       strokeColor: '#B71C1C',
//       radius: 2,
//     },
//     label: {
//       borderColor: '#B71C1C',
//       offsetY: 0,
//       style: {
//         color: '#fff',
//         background: '#B71C1C',
//       },
//       text: `${item.ordersCount} comenzi`,
//     },
//   }));
// });






onMounted(async () => {
  mounted.value = true
})

onBeforeMount(async () => {
  await getDashboardData()
  await getGAData()
})


</script>

<style scoped>

</style>