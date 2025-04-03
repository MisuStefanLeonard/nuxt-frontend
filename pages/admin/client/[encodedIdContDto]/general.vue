<template>
    <v-app>
        <AdminNavDrawerOnClient
            v-if="accountData.emailDto && encodedIdAccountDto"
            :email-dto="accountData.emailDto"
            :encoded-id-account-dto="encodedIdAccountDto"
            type="client"
        ></AdminNavDrawerOnClient>
        <v-main class="bg-grey-darken-3">
            <v-container fluid v-if="route.query.personalData === '1'">
                <v-container class="p-2" fluid>
                    <p class="h3 font-weight-light">Date personale</p>
                </v-container>
                <v-divider></v-divider>
                <v-container fluid class="w-75 p-2">
                    <v-alert variant="tonal" type="info" >
                        Aici puteti gasii datele personale/contului ale clientului: 
                        <ul>
                            <li>Numele</li>
                            <li>Prenumele</li>
                            <li>Email</li>
                            <li>Data crearii</li>
                            <li>Rolul</li>
                            <li>Username-ul</li>
                            <li>Starea contului</li>
                        </ul>
                    </v-alert>
                </v-container>
                <v-container fluid class="text-center w-75">
                    <v-form ref="personalDataForm" validate-on="submit" class="bg-white">
                        <p class="h3 p-2 m-2 font-weight-light text-center">Datele clientului</p>
                        <div v-for="item in accountFormData" class="text-center"
                        :key="item.model">
                            <v-text-field v-if="item.type === 'text-field'" class="p-2 m-2"
                            :label="item.label"
                            :placeholder="item.placeholder"
                            :disabled="item.disabled"
                            v-model:model-value="accountData[item.model]"
                            variant="outlined"
                            ></v-text-field>
                            <v-switch v-else-if="item.type === 'switch'" class="p-2 m-2"
                            :label="`Stare cont: ${accountData.contActivDto === true ? 'Activat' : 'Neactivat'}`"
                            :placeholder="item.placeholder"
                            :disabled="item.disabled"
                            v-model="accountData.contActivDto"
                            color="success"
                            :false-value="false"
                            :true-value="true"
                            >
                            </v-switch>
                            <v-date-input v-else-if="item.type === 'date-input'" class="p-2 m-2"
                            :label="item.label"
                            :placeholder="item.placeholder"
                            :disabled="item.disabled"
                            v-model:model-value="accountData[item.model]"
                            variant="outlined"
                            ></v-date-input>
                        </div>
                        <v-btn
                            variant="flat"
                            color="success"
                            class="p-2 m-2"
                            :append-icon="mdiContentSave"
                            @click="changeUserData()"
                        >
                            Salveaza
                        </v-btn>
                    </v-form>
                </v-container>
            </v-container>
            <v-container fluid v-if="route.query.addresses === '1'">
                <v-container class="p-2" fluid>
                    <p class="h3 font-weight-light">Adresele clientului</p>
                </v-container>

                <v-divider></v-divider>

                <v-container fluid class="w-100 p-2">
                    <v-alert variant="tonal" type="info" class="text-left">
                        <p>Aici puteti gasii adresele clientului, 
                        cele de facturare, cat si cele de livrare.
                        Le puteti modifica sau le puteti sterge.</p>
                    </v-alert>
                    <v-alert variant="tonal" type="warning" class="text-left">
                        <p class="text-center font-weight-bold">ADRESE LIVRARE INFORMATII</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiMapMarkerOff"></v-icon> inseamna
                        ca acestea au fost comenzi aferente adreselor</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiMapMarker"></v-icon> inseamna ca
                        Nu au nicio adresa</p>
                    </v-alert>
                    <v-alert variant="tonal" type="warning" class="text-left">
                        <p class="text-center font-weight-bold">ADRESE FACTURARE INFORMATII</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiFileDocumentMinusOutline"></v-icon> inseamna
                        ca acestea au comenzi aferente adresei.</p>
                        <p>Adresele marcate cu iconita <v-icon color="white" :icon="mdiFileDocumentOutline"></v-icon> inseamna ca
                        inca nu au comenzi asupra lor</p>
                    </v-alert>
                </v-container>
                <v-container class="w-100" fluid >
                    <v-sheet elevation="24" rounded class="p-3 mt-4 " color="grey-darken-4">
                    <v-row class="text-center">
                        <v-col cols="12">
                            <p class="font-weight-light h3">Livrare</p>
                            <v-divider opacity="100"></v-divider>
                            <div v-if="deliveryAddresses.length > 0">
                                <v-card 
                                v-for="(address, index) in deliveryAddresses" 
                                :key="index" class="rounded-xl my-3 p-2 bg-grey-darken-3 position-relative">
                                    <v-card-title>
                                        <div class="ribbon" v-if="address.isDeletedDto === true" >Stearsa</div>
                                        <div>
                                           
                                            <v-icon v-if="address.isDeletedDto === false" :icon="mdiMapMarker">
                                              
                                            </v-icon>
                                            <v-icon :icon="mdiMapMarkerOff" v-else >
                                              
                                            </v-icon>
                                        </div>
                                        <v-divider></v-divider>
                                        <p class="font-weight-light h6 mb-2">Nume adresa: {{ address.aliasDto }}</p>
                                    </v-card-title>
                                   
                                    <v-card-text>
                                        <p class="font-weight-light h6 mb-2">Bloc: {{ address.blocDto }} - Nr bloc: {{ address.nrBlocDto }}</p>
                                        
                                        <p class="font-weight-light h6 mb-2">Strada :{{ address.stradaDto }} - Nr strada:  {{ address.nrStradaDto }}</p>
                                        
                                        <p class="font-weight-light h6 mb-2">Oras: {{ address.orasDto }} - Judet: {{ address.judetDto }}</p>
                                        
                                        <p class="font-weight-light h6 mb-2">Cod postal: {{ address.codPostalDto }}</p>
                                    </v-card-text> 
                                    <v-card-actions>
                                        <v-container>
                                            <v-btn color="primary" @click="openModifyDialog(address)" variant="flat" 
                                            class="mx-2">
                                                Modifica 
                                            </v-btn>
                                            <!-- <v-btn :color="address.isDeletedDto === true ? 'green' : 'red'" @click="modifyAddressState(address.isDeletedDto, address.aliasDto,address.tipAdresaDto)" variant="flat">
                                               <template v-if="address.isDeletedDto === true">
                                                    Activeaza
                                               </template>
                                               <template v-else>
                                                    Dezactiveaza
                                               </template>
                                            </v-btn> -->
                                        </v-container>
                                    </v-card-actions>   
                                </v-card>
                            </div>
                            <div v-else>
                                <v-card class="bg-grey-darken-3 rounded-xl">
                                    <v-card-title class="text-center">
                                        <p class="font-weight-bold h6">Clientul nu are adrese de livrare salvate!</p>
                                    </v-card-title>
                                </v-card>
                            </div>
                            
                        </v-col>

                        <v-divider  opacity="100"></v-divider>

                        <v-col cols="12">
                            <p class="font-weight-light h3">Facturare</p>
                            <div v-if="billingAddresses.length > 0">
                                <v-card 
                                v-for="(address, index) in billingAddresses" 
                                :key="index" class="rounded-xl my-3 p-2 bg-grey-darken-3">
                                    <v-card-title>
                                       
                                        <div v-if="address.isDeletedDto === true" class="ribbon">Comanda</div>
                                        <p>
                                            <v-icon v-if="address.isDeletedDto === false" :icon="mdiFileDocumentOutline">
                                                  
                                            </v-icon>
                                            <v-icon v-else :icon="mdiFileDocumentMinusOutline">
                                                  
                                            </v-icon>
                                        </p>
                                        <v-divider></v-divider>
                                        <p class="font-weight-light h6 mb-2">Nume adresa: {{ address.aliasDto }}</p>
                                    </v-card-title>
                                    
                                    <v-card-text>
                                        <p class="font-weight-light h6 mb-2">Bloc: {{ address.blocDto }} - Nr bloc: {{ address.nrBlocDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Strada :{{ address.stradaDto }} - Nr strada:  {{ address.nrStradaDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Oras: {{ address.orasDto }} - Judet: {{ address.judetDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Cod postal: {{ address.codPostalDto }}</p>
                                        <p class="font-weight-bold h6 mb-2">Date firma</p>
                                        <p class="font-weight-light h6 mb-2">Nume firma: {{ address.numeFirmaDto }}</p>
                                        <p class="font-weight-light h6 mb-2">Cif: {{ address.cifDto }}</p>

                                    </v-card-text>
                                    <v-card-actions>
                                        <v-container>
                                            <v-btn color="primary" @click="openModifyDialog(address)" variant="flat" 
                                            class="mx-2">
                                                Modifica 
                                            </v-btn>
                                            <v-btn :color="address.isDeletedDto === true ? 'green' : 'red'" @click="modifyAddressState(address.isDeletedDto , address.aliasDto,address.tipAdresaDto)" variant="flat">
                                               <template v-if="address.isDeletedDto === true">
                                                    Activeaza
                                               </template>
                                               <template v-else>
                                                    Dezactiveaza
                                               </template>
                                            </v-btn>
                                        </v-container>
                                    </v-card-actions> 
                                </v-card>
                            </div>
                            <div v-else>
                                <v-card class="bg-red rounded-xl">
                                    <v-card-text class="text-center">
                                        <p class="font-weight-bold h6">Clientul nu are adrese de facturare salvate!</p>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                </v-sheet>
                <v-dialog  v-model="showDialog" max-width="600px" persistent style="z-index: 999;">
                    <v-form ref="addressForm"  class="bg-grey-darken-4 text-center overflow-auto" >
                        <v-icon color="white" @click="closeModifyDialog()" class="p-2 m-2" :icon="mdiCloseCircle">
                        </v-icon>
                        <p class="font-weight-light h3 text-center my-2 p-2">Modifica adresa</p>
                        <div v-for="(data) in filteredDataForm" :key="data.label">
                        <v-text-field
                            v-if="notSelectables(data.model)"
                            :label="data.label"
                            :placeholder="data.placeholder"
                            :type="data.type"
                            :counter="data.counter"
                            :disabled="data.isDisabled"
                            v-model="addressToSaveToDb[data.model]"
                            :rules="data.rules"
                            class="px-4 pt-2"
                        ></v-text-field>

                        <v-select
                            v-else-if="data.model === 'tipAdresaDto'"
                            :label="data.label"
                            v-model="addressToSaveToDb[data.model]"
                            :items="data.options"
                            :rules="data.rules"
                            class="px-4"
                        ></v-select>

                        <v-text-field 
                            v-else
                            :label="data.label"
                            :placeholder="data.placeholder"
                            :rules="data.rules"
                            v-model="addressToSaveToDb[data.model]"
                            class="px-4 pt-2"
                        ></v-text-field>
                        </div>
                        <v-container >
                            <v-btn rounded="xl"  type="button" @click="modifyAddress(addressToSaveToDb)" color="success" variant="flat" 
                                class="font-weight-bold bg-grey-lighten-3  text-center">
                                Salveaza adresa
                                <v-icon class="pl-2">mdi-content-save</v-icon>
                            </v-btn>
                        </v-container>
                        
                    </v-form>
                </v-dialog>
                </v-container>
                <v-container class="text-center">
                    <v-btn @click="saveChanges()" color="success" variant="flat" class="p-2">
                        Salveaza
                        <v-icon class="pl-2" :icon="mdiContentSave"></v-icon>
                    </v-btn>
                </v-container>
                
            </v-container>
            <v-container fluid v-if="route.query.orders === '1'">
                <v-container class="p-2" fluid>
                    <p class="h3 font-weight-light">Comenzile clientului</p>
                </v-container>

                <v-divider></v-divider>

                <v-container fluid class="w-75 p-2">
                    <v-alert variant="tonal" type="info" class="text-left">
                        <p>Aici puteti vedea comenzile clientului, produsele de pe comanda,
                             variatiile produselor , AWB-ul coletului , cat si starea lor.
                        </p>
                    </v-alert>
                    <v-alert variant="tonal" type="info" class="text-left">
                        <p>Dati click pe iconita <v-icon size="22" color="white" :icon="mdiEye"></v-icon>
                            pentru a vedea detaliile comenzii.
                        </p>
                    </v-alert>
                    <v-alert variant="tonal" type="warning" class="text-left">
                        <p class="text-center font-weight-bold">COMENZI INFORMATII</p>
                        <p>Aveti posibilitatea de a modifica starea comenzii , atata timp cat aceasta
                            nu a fost procesata. Veti avea un buton -> <v-btn class="m-2 p-1" variant="flat" color="red">Anuleaza comanda</v-btn>
                            pentru a o putea anula. </p>
                        <p><b>DACA ACEASTA A FOST PROCESATA , NU O VETI MAI PUTEA ANULA</b>.</p>
                    </v-alert>
                </v-container>
                <v-divider></v-divider>
                <v-card v-if="parsedOrdersData.length !== 0" elevation="24" class="bg-grey-darken-4 m-2 p-4">
                    <v-card-title class="text-center">
                        <p class="font-weight-light h4">Comenzi</p>
                    </v-card-title>
                    <v-data-table 
                        class="bg-grey-darken-3 p-2 my-2"
                        items-per-page="10"
                        item-value="nrComanda"
                        :headers="visibleHeaders"
                        :items="parsedOrdersData">

                        <template #[`item.actions`]="{ item }">
                            <v-icon
                                color="primary"
                                size="28"
                                class="mr-2"
                                @click="seeOrderInfo(item.encodedOrderId)" :icon="mdiEye"
                                >
                               
                            </v-icon>
                        </template>

                        <template #[`item.statusComanda`]="{item}">
                            <div v-if="item.statusComanda === 'InProcesare'">
                                <span class="text-orange">In procesare</span>
                            </div>
                            <div v-if="item.statusComanda === 'Procesata'">
                                <span class="text-yellow">Procesata</span>
                            </div>
                            <div v-if="item.statusComanda === 'Finalizata'">
                                <span class="text-green">Finalizata</span>
                            </div>
                            <div v-if="item.statusComanda === 'Anulata'">
                                <span class="text-red">Anulata</span>
                            </div>
                            <div v-if="item.statusComanda === 'Rambursata'">
                                <span class="text-blue">Rambursata</span>
                            </div>
                            <div v-if="item.statusComanda === 'InAsteptare'">
                                <span class="text-blue">In asteptarea platii</span>
                            </div>
                        </template>

                        <template #[`item.tipPlata`]="{item}">
                            <div v-if="item.tipPlata === 'TransferBancar'">
                                <span class="text-blue">Transfer bancar</span>
                            </div>
                            <div v-if="item.tipPlata === 'Card'">
                                <span class="text-yellow">Plata card</span>
                            </div>
                        </template>

                    </v-data-table>
                </v-card>
                <v-card elevation="24" class="m-2 p-2 rounded-xl bg-grey-darken-4" v-else>
                    <v-card-title>
                        <p class="font-weight-light h3 text-center">Clientul nu are nicio comanda plasata.</p>
                    </v-card-title>
                </v-card>
            </v-container>
            <v-container fluid v-if="currentOrderData && route.query.encodedOrderId && route.query.encodedAccountId">

                <v-container class="p-2" fluid>
                    <p class="h3 font-weight-light">Comanda #{{ currentOrderData.orderId }}</p>
                    <v-row no-gutters>
                        <v-col cols="4">
                            <v-btn :disabled="currentOrderData.orderBillNumber !== null && currentOrderData.orderBillNumber.numar_ro !== null" 
                            flat class="p-2 m-2" color="success" @click="generateBill('RON')">
                                GENEREAZA FACTURA RO
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn :disabled="currentOrderData.orderBillNumber === null || currentOrderData.orderBillNumber.numar_ro === null" 
                            flat class="p-2 m-2" color="primary" @click="visualizeBill('RON')">
                                VIZUALIZARE FACTURA RO
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn :disabled="currentOrderData.orderBillNumber === null || currentOrderData.orderBillNumber.numar_ro === null"
                            flat class="p-2 m-2" color="error" @click="cancelBill('RON')">
                                ANULARE FACTURA RO
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn :disabled="currentOrderData.orderBillNumber !== null && currentOrderData.orderBillNumber.numar_en !== null" 
                             flat class="p-2 m-2" color="success" @click="generateBill('EUR')">
                                GENEREAZA FACTURA EN
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn :disabled="currentOrderData.orderBillNumber === null || currentOrderData.orderBillNumber.numar_en === null" 
                            flat class="p-2 m-2" color="primary" @click="visualizeBill('EUR')">
                                VIZUALIZARE FACTURA EN
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn  :disabled="currentOrderData.orderBillNumber === null || currentOrderData.orderBillNumber.numar_en === null"
                            flat class="p-2 m-2" color="error" @click="cancelBill('EUR')">
                                ANULARE FACTURA EN
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <p v-if="currentOrderData.orderBillNumber !== null && currentOrderData.orderBillNumber.numar_ro !== null">
                        <v-icon :icon="mdiCheck" color="success" class="mr-2"></v-icon> Nr. factura (RON): {{ currentOrderData.orderBillNumber.numar_ro }}
                    </p>
                    <p v-else>
                        <v-icon :icon="mdiAlert" color="error" class="mr-2"></v-icon>
                        Factura pe moneda RON inca nu a fost generata
                    </p>
                    <p v-if="currentOrderData.orderBillNumber !== null && currentOrderData.orderBillNumber.numar_en !== null">
                        <v-icon :icon="mdiCheck" color="success" class="mr-2"></v-icon>Nr. factura (EUR): {{ currentOrderData.orderBillNumber.numar_en }}
                    </p>
                    <p v-else>
                        <v-icon :icon="mdiAlert" color="error" class="mr-2"></v-icon>
                        Factura pe moneda EUR inca nu a fost generata
                    </p>


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
                                                                <v-card class="elevation-6 bg-grey-lighten-2 text-center">
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
                                                                <v-card class="elevation-6 bg-grey-lighten-2 text-center">
                                                                    <v-card-title>
                                                                        <span class="font-weight-light h5">{{ $t('cart.titles.line') }}</span>
                                                                    </v-card-title>
                                                                    <v-card-text >
                                                                        <p class="font-weight-light h6">{{ $t('profile.personalDataGeneral.name') }} : {{ item.cartItems[0].selectedManopera.tipLinie.numeTipCusaturaColt  }}</p>
                                                                        <p class="font-weight-light h6">{{ $t('cart.meterPrice') }} {{  item.cartItems[0].selectedManopera.tipLinie.pretTipCusaturaColt }}  RON </p>
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
                                                    <p class="font-weight-light h5">{{ $t('shop.height') }} preferata</p>
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

<script lang="js" setup>
    import { useDisplay } from 'vuetify';
    import { ref, onMounted } from 'vue';
    import { VDateInput } from 'vuetify/labs/components';
    import AdminNavDrawerOnClient from '~/components/admin/AdminNavDrawerOnClient.vue';
    import adminService from '~/services/Admin';
    import registerService from '~/services/Register'
    import { mdiCloseCircle,mdiEye ,mdiContentSave, mdiFileDocumentMinusOutline, mdiFileDocumentOutline, mdiMapMarker, mdiMapMarkerOff,
        mdiArrowLeft, mdiArrowRight, mdiBallotOutline, mdiCardAccountDetailsOutline, mdiFileDocumentPlusOutline, mdiMapMarkerOutline, mdiPackageVariant, mdiTruckCheckOutline,
        mdiAlert,
        mdiCheck
     } from '@mdi/js';
import { green } from 'vuetify/util/colors';
  
    definePageMeta({
        layout: 'admin',
        middleware: 'admin'
    });  
    const route = useRoute();
    const swal = useNuxtApp().$swal;
    const encodedIdAccountDto = route.params.encodedIdContDto;
    const personalDataForm = ref(null);
    const oldData = ref({});
    const accountData = ref({
        adreseClient: [],
        comenziClient: [],
        // seturi: [],
        contActivDto: null,
        dataCreareDto: null,
        emailDto: '',
        idContDto: null,
        numeDto: '',
        prenumeDto: '',
        rolDto: '',
        usernameDto: ''
    });


    const accountFormData = ref([
    {
        type: 'text-field',
        label: 'Nume',
        model: 'numeDto',
        placeholder: '',
        rules: [],
    },
    {
        type: 'text-field',
        label: 'Prenume',
        model: 'prenumeDto',
        placeholder: '',
        rules: [],
    },
    {
        type: 'date-input',
        label: 'Data creeare',
        disabled: true,
        model: 'dataCreareDto',
        placeholder: '',
    },
    {
        type: 'switch',
        label: 'Cont activ',
        placeholder: '',
        model: 'contActivDto',
        maxLength: '',
        rules: [],
    },
    {
        type: 'text-field',
        label: 'Username',
        model: 'usernameDto',
        placeholder: '',
        rules: [
            async(value) => {
                let response = await registerService.getUsernameInDbAsync(value)
                if(response === 1){
                    swal.close()
                    fireAlarm('warning' , 'Atentie' , 'Username-ul deja exista!')
                    return false
                }else{
                    return true;
                }
            }
        ],
    },
    {
        type: 'text-field',
        label: 'Email',
        model: 'emailDto',
        placeholder: '',
        rules: [
            async(value) => {
                let response = await registerService.getEmailInDbAsync(value)
                if(response === 1){
                    swal.close()
                    fireAlarm('warning' , 'Atentie' , 'Email-ul deja exista!')
                    return false
                }else{
                    return true;
                }
            }
        ],
    },
    ]);

    const deliveryAddresses = ref([]);
    const billingAddresses = ref([]);
    const showDialog = ref(false);
    const addressForm = ref(null);


    function fireAlarm(icon, title, text, isLoading) {
        if (isLoading === null) {
            swal.fire({
                icon: icon,
                title: title,
                text: text,
                showConfirmButton: true,
                timer: 4000,
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

    const changeUserData = async () => {
        fireAlarm('info', 'Asteptati...', '', true);
        const isValid = await personalDataForm.value.validate();
        if(isValid.valid){
        if(JSON.stringify(accountData.value) === JSON.stringify(oldData.value)){
            swal.close()
            fireAlarm('info', 'Atentie', 'Nu ati modificat nimic', null);
            return;
        }else{
            const form = new FormData();
            form.append('updatedClientDataDto' , JSON.stringify(accountData.value));
            const changeDataResponse = await adminService.modifyClientData(form );

            if(changeDataResponse === 1){
                swal.close()
                fireAlarm('success', 'Succes', 'Datele au fost schimbate cu success!', null);
                
            }else if(changeDataResponse === 2){
                swal.close()
                fireAlarm('warning', 'Atentie', 'Mail-ul a fost schimbat.O confirmare a fost trimisa pe noul mail', null);
                
            }else if(changeDataResponse === -3){
                swal.close()
                fireAlarm('error', 'Eroare', 'Mail-ul este invalid', null);
                
            }else {
                swal.close()
                fireAlarm('error', 'Eroare', 'O eroare a avut loc', null);
                
            }
            oldData.value = JSON.parse(JSON.stringify(accountData.value))
            // store.setAccountData(accountData.value);
            // store.setOriginalAccountData(accountData.value)
        }
        }else{
            swal.close()
            fireAlarm('error', 'Eroare', 'Verificati formularul', null);
            return;
        }

    }

    // const getEncodedOrderId=ref(route.query.order)

    const getClientData = async () => {
        fireAlarm('info', 'Asteptati...', '', true);
        const accountDataResponse = await adminService.getClientData(encodedIdAccountDto);
        if (Object.keys(accountDataResponse).length > 0) {
            accountData.value = accountDataResponse;
            oldData.value = JSON.parse(JSON.stringify(accountData.value));
        //   store.setAccountData(accountData.value)
        //   store.setOriginalAccountData(accountData.value)
        swal.close();
        } else {
            swal.close();
            fireAlarm('error', 'Eroare', 'O eroare a avut loc', null);
        }
        console.log(accountData.value)
    };

    /*
        ----- ADDRESS SECTION -----
    */

    watchEffect(() => {
        // accountData.value = store.getDataPassed;
        // Separate addresses based on their type
        if (accountData.value.adreseClient) {
            deliveryAddresses.value = accountData.value.adreseClient.filter(
                address => address.tipAdresaDto === 'Livrare'
            );
            billingAddresses.value = accountData.value.adreseClient.filter(
                address => address.tipAdresaDto === 'Facturare'
            );
        }
    });

    const openModifyDialog = ((address) => {
        addressToSaveToDb.value = {...address}
        showDialog.value = true;
    })

    const closeModifyDialog = (() => {
        // nu se afieaza
        
        swal.fire({
            title: "Ati salvat modificarile?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Da",
            denyButtonText: `Nu`
            }).then((result) => {
            if (result.isConfirmed) {
                showDialog.value = false;
            } else if (result.isDenied) {
                return;
            }
        });
    })

    const modifyAddress = ((currentAddressToModify) => {
        let indexOfAddressToModify = 
            accountData.value.adreseClient.findIndex(address => address.aliasDto === currentAddressToModify.aliasDto);

        if(indexOfAddressToModify === -1){
            fireTopEndAlarm(`Adresa cu numele ${currentAddressToModify.aliasDto} nu a fost gasita. Dati un refresh.` , 'error' , false)
            return;
        }

        accountData.value.adreseClient[indexOfAddressToModify] = {...currentAddressToModify}
        swal.fire({
            position: "top-end",
            icon: "success",
            title: "Adresa modificata cu success",
            showConfirmButton: false,
            timer: 2000
        });
    })

    function fireTopEndAlarm(title , icon  , showConfirmButton){
        swal.fire({
            position: "top-end",
            icon: icon,
            title: title,
            showConfirmButton: showConfirmButton,
            timer: 3000
        });
    }

    const modifyAddressState = (async (addressState, alias , tipAdresa) => {
    
        let indexOfAddressToModify = 
            accountData.value.adreseClient.findIndex(address => address.aliasDto === alias 
            && address.tipAdresaDto === tipAdresa);

        if(indexOfAddressToModify === -1){
            fireTopEndAlarm(`Adresa cu numele ${alias} nu a fost gasita. Dati un refresh.` , 'error' , false)
            return;
        }
        const response = await adminService.modifyAddressActivationState(alias,addressState,tipAdresa,encodedIdAccountDto);

        if(response === 1){
            fireTopEndAlarm(`Adresa ${addressState === true ? 'activata' : 'dezactivata'} cu success` , 'success' , false)
            accountData.value.adreseClient[indexOfAddressToModify].isDeletedDto = !addressState
            oldData.value = JSON.parse(JSON.stringify(accountData.value))
            // nu stiu inca sigur daca trebuie lasat linia asta // accountData.value = {...originalClientData.value}
            // store.setAccountData(clientData.value);
            // store.setOriginalAccountData(originalClientData.value)
            return
        }else if(response === -4){
            fireTopEndAlarm(`Adresa cu numele ${alias} nu a fost gasita. Dati un refresh.` , 'error' , false)
            return
        }else{
            fireTopEndAlarm(`O eroare a avut loc la modificarea starii adresei.` , 'error' , false)
            return
        }
    })

    const saveChanges = (async () => {
        let form = new FormData()
        form.append('updatedAddresses' , JSON.stringify(accountData.value))
        const responseFromSavingTheAddresses = await adminService.saveAddressChanges(form);

        if(responseFromSavingTheAddresses === 1){
            fireTopEndAlarm(`Adrese salvate cu succes!` , 'success' , false)
            return;
        }else{
            fireTopEndAlarm(`O eroare a avut loc! Dati refresh la pagina` , 'error' , false)
            return;
        }
    })


    // form detalis for address modifying
    const addressToSaveToDb = ref({
        aliasDto: '',
        tipAdresaDto: '',
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

    const validationRules = {
        required: v => !!v || 'This field is required',
        maxLength: (length) => v => !v || v.length <= length || `Maximum length is ${length} characters`,
        exactLength: (length) => v => !v || v.length == length || `Must be exactly ${length} characters`,
        onlyNumbers: v => /^[0-9]+$/.test(v) || 'Only numbers are allowed',
    };

    const dataForm = [
    {
        label: 'Alias',
        placeholder: '',
        type: 'text',
        isDisabled: true,
        model: 'aliasDto',
        rules: [validationRules.required, validationRules.maxLength(20)],
        counter: 20
    },
    {
        label: 'Tip adresa',
        placeholder: '',
        type: 'text',
        model: 'tipAdresaDto',
        options: ['Livrare', 'Facturare'],
        rules: [validationRules.required],
        counter: null // No counter needed for selection fields
    },
    {
        label: 'Bloc',
        placeholder: '',
        type: 'text',
        model: 'blocDto',
        rules: [validationRules.maxLength(10)],
        counter: 10
    },
    {
        label: 'Numar bloc',
        placeholder: '',
        type: 'text',
        model: 'nrBlocDto',
        rules: [validationRules.maxLength(7)],
        counter: 7
    },
    {
        label: 'Strada',
        placeholder: '',
        type: 'text',
        model: 'stradaDto',
        rules: [validationRules.required, validationRules.maxLength(30)],
        counter: 30
    },
    {
        label: 'Numar strada',
        placeholder: '',
        type: 'text',
        model: 'nrStradaDto',
        rules: [validationRules.required, validationRules.maxLength(5)],
        counter: 5
    },
    {
        label: 'Oras',
        placeholder: '',
        type: 'text',
        model: 'orasDto',
        rules: [validationRules.required, validationRules.maxLength(20)],
        counter: 20
    },
    {
        label: 'Judet',
        placeholder: '',
        type: 'text',
        model: 'judetDto',
        rules: [validationRules.required, validationRules.maxLength(15)],
        counter: 15
    },
    {
        label: 'Cod postal',
        placeholder: '',
        type: 'text',
        model: 'codPostalDto',
        rules: [validationRules.required, validationRules.exactLength(6), validationRules.onlyNumbers],
        counter: 6
    },
    {
        label: 'Cif',
        placeholder: '',
        type: 'text',
        model: 'cifDto',
        rules: [validationRules.required, validationRules.onlyNumbers],
        counter: 6 // No max length defined for Cif, so no counter
    },
    {
        label: 'Nume firma/persoana juridica',
        placeholder: '',
        type: 'text',
        model: 'numeFirmaDto',
        rules: [validationRules.required, validationRules.maxLength(50)],
        counter: 50
    }
    ];


    const filteredDataForm = computed(() => {
    return dataForm.filter(data => {
            // Only show 'cif' and 'nume_firma' fields if 'tip_adresa' is 'Facturare'
            if ((data.model === 'cifDto' || data.model === 'numeFirmaDto') && addressToSaveToDb.value.tipAdresaDto !== 'Facturare') {
            return false; // Exclude these fields if 'tip_adresa' is not 'Facturare'
            }
            return true; // Include all other fields
        });
    });

    const notSelectables = (currentModel) => {
        return currentModel !== 'tipAdresaDto';
    }
    
    /**
     * ---- ORDERS SECTION -----
    */

    const parsedOrdersData = ref([]);

    const headers = ref([
        { title: 'Numar comanda', align: 'center', key: 'nrComanda' , sortable: false},
        { title: 'Numar comanda codat', align: 'center', key: 'encodedOrderId' , sortable: false, hidden: true},
        { title: 'Status comanda', align: 'center', key: 'statusComanda' , sortable: false},
        { title: 'Tip plata', align: 'center', key: 'tipPlata' , sortable: false},
        { title: 'Data emitere', align: 'center', key: 'dataEmitere' , sortable: false},
        { title: 'Awb comanda', align: 'center', key: 'awbComanda', sortable: false },
        { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
    ]);

    const visibleHeaders = computed(() => {
        return headers.value.filter(header => !header.hidden); // Filter out headers with `hidden: true`
    });


    function seeOrderInfo(encodedOrderId) {
        navigateTo({
            path: `/admin/client/${encodedIdAccountDto}/general`,
            query: { encodedOrderId: encodedOrderId, encodedAccountId: encodedIdAccountDto }
        });
    }

    // Parsing Function
    const parseDataInfo = () => {
        // Clear existing data to avoid duplicates
        parsedOrdersData.value = [];

        if (!accountData.value || !accountData.value.comenziClient) return;

        accountData.value.comenziClient.forEach((comanda) => {
            // Original date string in UTC
            const parsedDataEmitere = comanda.orderDate;

            // Convert the UTC date string to a Date object
            const utcDate = new Date(parsedDataEmitere + 'Z'); // 'Z' indicates the string is in UTC time

            // Create a formatter for the Romanian locale with specific options
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Europe/Bucharest', // Set the timezone to Bucharest
                hour12: false, // Use 24-hour format
            };

            // Format the date to your local time (Romanian time)
            const localDate = new Intl.DateTimeFormat('ro-RO', options).format(utcDate);


            const parsedOrderDataItem = {
                nrComanda: comanda.orderId,
                statusComanda: comanda.orderStatus,
                tipPlata: comanda.orderPayment,
                dataEmitere: localDate,
                awbComanda: comanda.orderTrackingString,
                encodedOrderId : comanda.encodedIdComandaDto
            };

            // Push the parsed data item into the array
            parsedOrdersData.value.push(parsedOrderDataItem);
        });
    };

    watchEffect(() => {
        if (accountData.value) {
            parseDataInfo();
        }
    });

    /**
     * ---- SINGLE ORDER -----
    */

    const {name} = useDisplay()
    const stepValue = ref(0)
    const stepValueSet = ref(0)
    const encodedOrderId = ref(route.query.encodedOrderId);

    const screenSize = computed(() => {
        switch (name.value) {
            case 'xs': return true
            default : return 3
        }
    })

    const generateBill = (async (currency) => {
        swal.fire({
            title: 'Asteptati...',
            text: 'Factura se genereaza...',
            allowOutsideClick: false,
            didOpen: () => {
                swal.showLoading();
            }
        });
        const response = await adminService.generateBill(currentOrderData.value.orderId , currency)
        swal.close()
        if(response.status === 200){
            swal.fire({
                title: 'Succes!',
                text: currency === 'RON' ? 'Factura generata cu succes pe moneda RON' : 'Factura generata cu succes pe moneda EUR',
                icon: 'success',
                timer: 3000
            })
            if(indexOfCurrentOrder.value !== -1){
                if(accountData.value.comenziClient[indexOfCurrentOrder.value].orderBillNumber === null){
                    accountData.value.comenziClient[indexOfCurrentOrder.value].orderBillNumber = {
                        numar_ro : currency === 'RON' ? response.message : null,
                        numar_en : currency === 'RON' ? null : response.message
                    }
                }else{
                    if(currency === 'RON'){
                        accountData.value.comenziClient[indexOfCurrentOrder.value].orderBillNumber.numar_ro = response.message
                    }else{
                        accountData.value.comenziClient[indexOfCurrentOrder.value].orderBillNumber.numar_en = response.message

                    }
                }
            }
        }else if(response.status === 404){
            swal.fire({
                title: 'Atentie!',
                text: 'Credentialele SmartBill nu au fost gasite. Va rugam completatile in sectiunea de setari generale',
                icon: 'warning',
                timer: 6000
            })
        }else if(response.status === 400){
            swal.fire({
                title: 'Atentie!',
                text: 'Comanda careia vreti sa-i generati factura nu a fost gasita. Dati un refresh',
                icon: 'warning',
                timer: 6000
            })
        }else{
            swal.fire({
                title: 'Eroare!',
                text: 'O eroare a avut loc! Contactati administratorul.',
                icon: 'error',
                timer: 2000
            })
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

    const indexOfCurrentOrder = computed(() => {
        if (!accountData.value.comenziClient) return -1;
        return accountData.value.comenziClient.findIndex(
            (order) => order.encodedIdComandaDto === encodedOrderId.value
        );
    });
    
    const isDeliveryTheSameWithBilling = computed(() => {
        if(indexOfCurrentOrder.value === -1){
            return "-"
        }
        return accountData.value.comenziClient[indexOfCurrentOrder.value].clientBillingAddress.cifDto === null 
            && accountData.value.comenziClient[indexOfCurrentOrder.value].clientBillingAddress.numeFirmaDto === null ;
    })

    watch(() => route.query.encodedOrderId,
        (newVal) => {
            encodedOrderId.value = newVal;
            // Optionally re-fetch or re-calculate accountData here if needed.
        }
    );

    const currentOrderData = computed(() => {
        if(indexOfCurrentOrder.value === -1){
            return null
        }
        return accountData.value.comenziClient[indexOfCurrentOrder.value];
    })

    const visualizeBill = (async (currency) => {
            swal.fire({
                title: 'Asteptati...',
                text: '',
                allowOutsideClick: false,
                didOpen: () => {
                    swal.showLoading();
                }
            });
        const response = await adminService.visualizeBillApi(currentOrderData.value.orderId,currency)
        swal.close()
        if(response.status === 200){
            const blob = new Blob([response.message], { type: 'application/pdf' });
            
            const url = window.URL.createObjectURL(blob);
        
            const link = document.createElement('a');
            link.href = url;
            const currentDate = new Date()
            const formattedDate = currentDate.toISOString().split('T')[0];
            link.setAttribute('download', `factura_${currency === 'RON' ? 'RO' : 'EN'}_${formattedDate}_orderId_${currentOrderData.value.orderId}`);
        
            document.body.appendChild(link);
            link.click();
        
            link.remove();
            window.URL.revokeObjectURL(url);
        }else if(response.status === 404){
            swal.fire({
                title: 'Atentie',
                text: 'Credentialele SmartBill nu au fost gasite.Completati-le in sectiunea de setari generale',
                timer: 4000,
                icon:'warning'
            });
        }else if(response.status === 400){
            swal.fire({
                title: 'Atentie',
                text: 'Comanda nu a fost gasita.',
                timer: 4000,
                icon:'warning'
            });
        }else if(response.status === 204){
            swal.fire({
                title: 'Atentie',
                text: currency === 'RON' ? 'Factura nu a fost generata inca pe moneda RON' : 'Factura nu a fost generata inca pe moneda EUR',
                timer: 4000,
                icon:'warning'
            });
        }else if(response.status === 500){
            swal.fire({
                title: 'Eroare',
                text: '500 - Internal Server Error. Contactati administratorul.',
                timer: 4000,
                icon:'error'
            });
        }
        return
    })

    const cancelBill = (async (currency) => {
        swal.fire({
            title: 'Asteptati...',
            text: '',
            allowOutsideClick: false,
            didOpen: () => {
                swal.showLoading();
            }
        });
        const response = await adminService.cancelBill(currentOrderData.value.orderId , currency)
        console.log(response)
        swal.close()

        if(response === 1){
            swal.fire({
                title: 'Succes',
                text: currency === 'RON' ? 'Factura anulata cu succes pe moneda RON' : 'Factura anulata cu succes pe moneda EUR',
                timer: 4000,
                icon:'success'
            });
            if(indexOfCurrentOrder.value !== -1){
                if(currency === 'RON'){
                    accountData.value.comenziClient[indexOfCurrentOrder.value].orderBillNumber.numar_ro = null
                }else{
                    accountData.value.comenziClient[indexOfCurrentOrder.value].orderBillNumber.numar_en = null
                }
            }
        }else if(response === -4){
            swal.fire({
                title: 'Atentie',
                text: 'Credentialele SmartBill nu au fost gasite.Completati-le in sectiunea de setari generale',
                timer: 4000,
                icon:'warning'
            });
        }else if(response === -2){
            swal.fire({
                title: 'Atentie',
                text: 'Comanda nu a fost gasita.',
                timer: 4000,
                icon:'warning'
            });
        }else if(response === -3){
            swal.fire({
                title: 'Atentie',
                text: currency === 'RON' ? 'Factura a fost deja anulata pe moneda RON' : 'Factura a fost deja anulata pe moneda eUR',
                timer: 4000,
                icon:'warning'
            });
        }
        else if(response === 0){
            swal.fire({
                title: 'Atentie',
                text: currency === 'RON' ? 'Factura nu a fost generata inca pe moneda RON' : 'Factura nu a fost generata inca pe moneda EUR',
                timer: 4000,
                icon:'warning'
            });
        }else{
            swal.fire({
                title: 'Eroare',
                text: '500 - Internal Server Error. Contactati administratorul.',
                timer: 4000,
                icon:'error'
            });
        }
        return
    })

    onMounted(async () => {
        await getClientData();
    });


</script>

<style>
.swal2-container {
  z-index: 20000 !important; /* Higher than v-dialog's default z-index */
}

.ribbon {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 1.8;
  padding-inline: 1lh;
  clip-path: polygon(
    100% 100%,0 100%,999px calc(100% - 999px),calc(100% - 999px) calc(100% - 999px));
  transform: translate(calc((1 - cos(45deg))*100%), -100%) rotate(45deg);
  transform-origin: 0% 100%;
  background-color: red; /* the main color  */
}
</style>