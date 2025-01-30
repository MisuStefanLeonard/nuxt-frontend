<template>
    <v-app>
        <AdminNavDrawerOnClient
            v-if="clientData.emailDto && encodedIdAccountDto"
            :email-dto="clientData.emailDto"
            :encoded-id-account-dto="encodedIdAccountDto"
        ></AdminNavDrawerOnClient>
        <v-main class="bg-grey-darken-3">
            <v-container fluid>
                <v-container class="p-2" fluid>
                    <p class="h3 font-weight-light">Comanda #{{ orderId }}</p>
                    <v-alert class="text-left" type="warning" variant="tonal">
                        ATENTIE! Daca apasati pe butonul "ANULEAZA COMANDA" , comanda clientului va fi anulata
                        daca nu a fost procesata. Daca a fost procesata , butonul va fi inchis.
                    </v-alert>
                    <v-btn flat class="p-2 m-2" color="error" :disabled="!isCancelable">
                        ANULEAZA COMANDA
                    </v-btn>
                </v-container>
                <v-divider></v-divider>
                <v-container>
                    <p class="h3 font-weight-light text-center">Detalii comanda</p>
                </v-container>
                <v-divider></v-divider>
                <v-container fluid>
                    <p class="h4 font-weight-light p-2 m-2">Adrese</p>
                    <v-card elevation="24" class="bg-grey-darken-4 m-2 p-2">
                        <v-card-title class="p-2" v-if="!isDeliveryTheSameWithBilling">
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <p class="h5 font-weight-light">Livrare</p>
                                </v-col>
                                <v-divider vertical></v-divider>
                                <v-col cols="6">
                                    <p class="h5 font-weight-light">Facturare</p>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-title class="p-2 text-center" v-else>
                            <p class="h5 font-weight-light">Livrare/Facturare</p>
                            <p class="h6 font-weight-light">(adresa de facturare coincide cu cea de livrare)</p>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text v-if="!isDeliveryTheSameWithBilling">
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <p class="font-weight-light h5 p-2 m-1">Oras: {{ billingAddressDetails.orasDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Judet: {{ billingAddressDetails.judetDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Cod postal: {{ billingAddressDetails.codPostalDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Strada: {{ billingAddressDetails.stradaDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Numar strada: {{ billingAddressDetails.nrStradaDto }}</p>
                                    <p v-if=" deliveryAddressDetails.blocDto !== null" class="font-weight-light h5 p-2 m-1">Bloc: {{ billingAddressDetails.blocDto }}</p>
                                    <p v-if=" deliveryAddressDetails.nrBlocDto !== null" class="font-weight-light h5 p-2 m-1">Numar bloc: {{ billingAddressDetails.nrBlocDto }}</p>
                                </v-col>
                                <v-col cols="6">
                                    <p class="font-weight-light h5 p-2 m-1">Oras: {{ deliveryAddressDetails.orasDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Judet: {{ deliveryAddressDetails.judetDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Cod postal: {{ deliveryAddressDetails.codPostalDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Strada: {{ deliveryAddressDetails.stradaDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Numar strada: {{ deliveryAddressDetails.nrStradaDto }}</p>
                                    <p v-if=" deliveryAddressDetails.blocDto !== null" class="font-weight-light h5 p-2 m-1">Bloc: {{ deliveryAddressDetails.blocDto }}</p>
                                    <p v-if=" deliveryAddressDetails.nrBlocDto !== null" class="font-weight-light h5 p-2 m-1">Numar bloc: {{ deliveryAddressDetails.nrBlocDto }}</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-text v-else>
                            <v-row no-gutters>
                                <v-col cols="6" class="text-center">
                                    <p class="font-weight-light h5 p-2 m-1">Oras: {{ deliveryAddressDetails.orasDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Judet: {{ deliveryAddressDetails.judetDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Cod postal: {{ deliveryAddressDetails.codPostalDto }}</p>
                                </v-col>
                                <v-divider vertical opacity="100"></v-divider>
                                <v-col cols="6" class="text-center">
                                    <p class="font-weight-light h5 p-2 m-1">Strada: {{ deliveryAddressDetails.stradaDto }}</p>
                                    <p class="font-weight-light h5 p-2 m-1">Numar strada: {{ deliveryAddressDetails.nrStradaDto }}</p>
                                    <p v-if=" deliveryAddressDetails.blocDto !== null" class="font-weight-light h5 p-2 m-1">Bloc: {{ deliveryAddressDetails.blocDto }}</p>
                                    <p v-if=" deliveryAddressDetails.nrBlocDto !== null" class="font-weight-light h5 p-2 m-1">Numar bloc: {{ deliveryAddressDetails.nrBlocDto }}</p>
                                </v-col>
                                <!-- de terminat afisarea produselor/ partea cand are adresa de facturare/  pretul total al comenzii-->
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                </v-container>
                <v-container fluid class="w-100">
                    <p class="h4 font-weight-light p-2 m-2">Produse</p>
                    <v-divider></v-divider>
                    <v-row no-gutters v-for="product in productsOnCurrentOrder"
                        :key="`${product.idProdusDto} + ${product.codProdusDto} `"
                       >
                        <v-col cols="2"  xs="12" class="bg-grey-darken-4 my-2" elevation="24">
                            <p class="font-weight-light h5 p-3 d-flex justify-center d-xs-none">Cantitate </p>
                            <v-divider></v-divider>
                            <v-container fluid class="d-flex justify-center h-100">
                                <p class="font-weight-light h5 p-3 m-1 align-self-center">x{{ product.nrBucatiDto }} </p>
                            </v-container>
                        </v-col>
                        <v-col cols="10" xs="12" >
                            <v-card class="bg-grey-darken-4 m-2 p-2"  elevation="24" >
                                <v-card-title class="text-center">
                                    <p class="h5 font-weight-light">Cod produs: 
                                        <nuxt-link :to="localePath(`/admin/product/${product.codProdusDto}`)"
                                        target="_blank">
                                            {{ product.codProdusDto  }}</nuxt-link>
                                    </p>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text v-if="product.numeSetDto === null">
                                    <v-row no-gutters>
                                        <v-col cols="4" class="text-center">
                                            <p class="h5 font-weight-light p-1 m-2 text-center">Date generale</p>
                                            <v-divider></v-divider>
                                            <p class="h6 font-weight-light p-1 m-2">Tip produs: {{ product.tipulProdusuluiDto.toUpperCase() }}</p>
                                            <p class="h6 font-weight-light p-1 m-2">Nume produs: {{ product.numeProdusDto.toUpperCase() }}</p>
                                            <p class="h6 font-weight-light p-1 m-2">FATA REVERSIBILA: {{ product.fataReversibilaDto === true ? "Da" : "Nu" }}</p>
                                        </v-col>
                                        <v-divider vertical></v-divider>
                                        <v-col cols="4" class="text-center">
                                            <p class="h5 font-weight-light p-1 m-2 text-center">Culoare</p>
                                            <v-divider></v-divider>
                                            <p v-if="product.numeCuloareDto !== null" class="h6 font-weight-light p-1 m-2">Nume culoare: {{ product.numeCuloareDto }}</p>
                                            <p v-if="product.numeCuloareDto !== null" class="h6 font-weight-light p-1 m-2">Cod culoare: {{ product.codCuloareDto }}</p>
                                        </v-col>
                                        <v-divider vertical></v-divider>
                                        <v-col cols="4" class="text-center">
                                            <p class="h5 font-weight-light p-1 m-2 text-center">Dimensiune</p>
                                            <v-divider></v-divider>
                                            <p v-if="product.lungimeDto !== null" class="h6 font-weight-light p-1 m-2">Lungime: {{ product.lungimeDto }}cm</p>
                                            <p v-if="product.latimeDto !== null" class="h6 font-weight-light p-1 m-2">Latime:  {{ product.latimeDto }}cm</p>
                                            <p v-if="product.perdeaEstePerecheDto !== null" class="h6 font-weight-light p-1 m-2">Pereche perdea/draperie: {{ product.perdeaEstePerecheDto === true ? 'Da' : 'Nu' }}</p>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col v-if="product.tipulProdusuluiDto !== 'perdea' && product.tipulProdusuluiDto !== 'draperie'" cols="12" class="text-center">
                                            <p class="h6 font-weight-light p-1 m-2">Pret: {{ product.pretBazaDto }} RON x {{ product.nrBucatiDto }}(bucati) = {{ product.pretBazaDto * product.nrBucatiDto }} RON</p>
                                        </v-col>
                                        <v-col v-else cols="12" class="text-center">
                                            <p class="h5 font-weight-light p-1 m-2 text-center">Manopera</p>
                                            <v-divider></v-divider>
                                            <div v-if="product.inelePrindereDto !== null">
                                                <v-row no-gutters>
                                                    <v-col cols="3">
                                                        <p class="h5 font-weight-light p-1 m-2">MATERIAL</p>
                                                        <v-divider></v-divider>
                                                        <p class="h6 font-weight-light p-1 m-2">Pret material: {{ product.pretBazaDto }} RON/metru</p>
                                                    </v-col>
                                                    <v-divider vertical></v-divider>
                                                    <v-col cols="3">
                                                        <p class="h5 font-weight-light p-1 m-2">REJANSA</p>
                                                        <v-divider></v-divider>
                                                        <p class="h6 font-weight-light p-1 m-2">Tip rejansa: {{ product.tipGalerieCusaturaDto }} </p>
                                                        <p class="h6 font-weight-light p-1 m-2">Incretire : {{ product.incretireRejansaDto }}</p>
                                                        <p class="h6 font-weight-light p-1 m-2">Pret : {{ product.pretTipGalerieCusaturaDto }} RON/metru</p>
                                                       
                                                        
                                                    </v-col>
                                                    <v-divider vertical></v-divider>
                                                    <v-col cols="3">
                                                        <p class="h5 font-weight-light p-1 m-2">CUSATURA COLT</p>
                                                        <v-divider></v-divider>
                                                        <p class="h6 font-weight-light p-1 m-2">Tip cusatura colt: {{ product.tipLinieCusaturaDto }} </p>
                                                        <p class="h6 font-weight-light p-1 m-2">Pret : {{ product.pretTipLinieCusaturaDto }} RON/metru</p>
                                                        
                                                    </v-col>
                                                    <v-divider vertical></v-divider>
                                                    <v-col cols="3">
                                                        <p class="h5 font-weight-light p-1 m-2">INELE</p>
                                                        <v-divider></v-divider>
                                                        <p  class="h6 font-weight-light p-1 m-2">Culoare inel prindere: {{ product.inelePrindereDto === null ? 'N/A' : product.inelePrindereDto }} </p>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <v-divider></v-divider>
                                            <p class="h6 font-weight-light p-1 m-2">METRU MATERIAL: {{ product.totalMetruMaterial }} metru</p>
                                            <p class="h6 font-weight-light p-1 m-2"> Material: ({{ product.pretBazaDto }} RON/metru) x {{ product.totalMetruMaterial }} = {{ product.pretBazaDto * product.totalMetruMaterial }} RON</p>
                                            <p class="h6 font-weight-light p-1 m-2"> Cusatura galerie: ({{ product.pretTipGalerieCusaturaDto }} RON/metru) x {{ product.totalMetruMaterial }} = {{ product.pretTipGalerieCusaturaDto * product.totalMetruMaterial }} RON</p>
                                            <p class="h6 font-weight-light p-1 m-2"> Cusatura linie: ({{ product.pretTipLinieCusaturaDto }} RON/metru) x {{ product.totalMetruMaterial }} = {{ product.pretTipLinieCusaturaDto * product.totalMetruMaterial }} RON</p>
                                            <v-divider></v-divider>
                                            <p class="h6 font-weight-light p-1 m-2"> Pret: {{ totalManoperaCost }} RON</p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-container fluid v-if="seturi.length !== 0">
                        <p class="h4 font-weight-light p-2 m-2">Seturi</p>
                        <v-divider></v-divider>
                        <v-row class="m-2 p-2" no-gutters v-for="(productOnSet,index) in seturi"
                            :key="index">
                            <v-card class="bg-grey-darken-4 p-4" elevation="24">
                                <v-col cols="12" v-if="productOnSet.length && productOnSet[index].numeSetDto" class="mb-2">
                                    <p class="h5 font-weight-light text-center">NUME SET: 
                                        <nuxt-link :to="localePath( `admin/set/${productOnSet[index].numeSetDto}`)"
                                        target="_blank">
                                            {{ productOnSet[index].numeSetDto }}
                                        </nuxt-link>
                                    </p>
                                </v-col>
                                <v-col cols="12" v-for="product in productOnSet"
                                    :key="product.idProdusDto">
                                    <v-row >
                                        <v-col cols="2"  xs="12" class="bg-grey-darken-3 my-2 p-1 rounded" elevation="24">
                                            <p class="font-weight-light h5 p-2 m-1 d-flex justify-center d-xs-none">Cantitate </p>
                                            <v-container fluid class="d-flex justify-center h-100">
                                                <p class="font-weight-light h5 p-3 m-1 align-self-center">x{{ product.nrBucatiDto }} </p>
                                            </v-container>
                                        </v-col>
                                        <v-col cols="10"  xs="12">
                                            <v-card elevation="24" class="mb-2 p-2 bg-grey-darken-3">
                                                    <!-- Product information -->
                                                    <v-card-title class="h6 font-weight-light text-center">
                                                        COD PRODUS: <nuxt-link :to="localePath(`/admin/product/${product.codProdusDto}`)"
                                                        target="_blank">
                                                            {{ product.codProdusDto }}
                                                        </nuxt-link>
                                                    </v-card-title>
                                                    <v-card-subtitle class="font-weight-light">
                                                        
                                                    </v-card-subtitle>
                                                    <v-divider></v-divider>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="4" class="text-center">
                                                                <p class="h5 font-weight-light p-1 m-2 text-center">Date generale</p>
                                                                <v-divider></v-divider>
                                                                <p class="font-weight-light h6 m-1 p-1">NUME PRODUS: {{ product.numeProdusDto }}</p>
                                                                <p class="font-weight-light h6 m-1 p-1">TIP PRODUS: {{ product.tipulProdusuluiDto.toUpperCase() }}</p>
                                                                <p class="font-weight-light h6 m-1 p-1">FATA REVERSIBILA: {{ product.fataReversibilaDto ? 'Da' : 'Nu' }}</p>
                                                                <p v-if="product.numeProducatorDto !== null" class="font-weight-light h6 m-1 p-1">Nume producator: {{ product.numeProducatorDto }}</p>
                                                            </v-col>
                                                            <v-divider vertical></v-divider>
                                                            <v-col cols="4" class="text-center">
                                                                <p class="h5 font-weight-light p-1 m-2 text-center">Culoare</p>
                                                                <v-divider></v-divider>
                                                                <p class="font-weight-light h6 m-1 p-1">Nume culoare: {{ product.numeCuloareDto }}</p>
                                                                <p class="font-weight-light h6 m-1 p-1">Cod culoare: {{ product.codCuloareDto }}</p>
                                                            </v-col>
                                                            <v-divider vertical></v-divider>
                                                            <v-col cols="4" class="text-center">
                                                                <p class="h5 font-weight-light p-1 m-2 text-center">Dimensiune</p>
                                                                <v-divider></v-divider>
                                                                <p v-if="product.lungimeDto !== null" class="h6 font-weight-light p-1 m-2">Lungime: {{ product.lungimeDto }}cm</p>
                                                                <p v-if="product.latimeDto !== null" class="h6 font-weight-light p-1 m-2">Latime:  {{ product.latimeDto }}cm</p>
                                                                <p v-if="product.perdeaEstePerecheDto !== null" class="h6 font-weight-light p-1 m-2">Pereche perdea/draperie: {{ product.perdeaEstePerecheDto === true ? 'Da' : 'Nu' }}</p>
                                                            </v-col>
                                                            <v-divider vertical></v-divider>
                                                            <v-divider></v-divider>
                                                            <v-col v-if="product.tipulProdusuluiDto === 'perdea' || product.tipulProdusuluiDto === 'draperie'" cols="12" class="text-center">
                                                                <p class="h5 font-weight-light p-1 m-2 text-center">Manopera</p>
                                                                <v-divider></v-divider>
                                                                <div >
                                                                    <v-row no-gutters>
                                                                        <v-col cols="4">
                                                                            <p class="h5 font-weight-light p-1 m-2">REJANSA</p>
                                                                            <v-divider></v-divider>
                                                                            <p class="h6 font-weight-light p-1 m-2">Tip rejansa: {{ product.tipGalerieCusaturaDto }} </p>
                                                                            <p class="h6 font-weight-light p-1 m-2">Incretire: {{ product.incretireRejansaDto }} </p>
                                                                        </v-col>
                                                                        <v-divider vertical></v-divider>
                                                                        <v-col cols="4">
                                                                            <p class="h5 font-weight-light p-1 m-2">CUSATURA COLT</p>
                                                                            <v-divider></v-divider>
                                                                            <p class="h6 font-weight-light p-1 m-2">Tip cusatura colt: {{ product.tipLinieCusaturaDto }} </p>
                                                                        </v-col>
                                                                        <v-divider vertical></v-divider>
                                                                        <v-col cols="4">
                                                                            <p class="h5 font-weight-light p-1 m-2">INELE</p>
                                                                            <v-divider></v-divider>
                                                                            <p  class="h6 font-weight-light p-1 m-2">Culoare inel prindere: {{ product.inelePrindereDto }} </p>
                                                                        </v-col>
                                                                        <v-divider></v-divider>
                                                                        <v-col cols="12">
                                                                            <p class="h5 font-weight-light p-1 m-2">Inaltime aleasa: {{ product.inaltimeSetDto }}</p>
                                                                        </v-col>
                                                                        <v-divider></v-divider>
                                                                        <v-col cols="12">
                                                                            <p class="h5 font-weight-light p-1 m-2">TOTAL MATERIAL FOLOSIT</p>
                                                                            <v-divider></v-divider>
                                                                            <p  class="h6 font-weight-light p-1 m-2">{{ product.totalMetruMaterial }} METRI</p>
                                                                        </v-col>
                                                                    </v-row>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider></v-divider>
                                <p class="font-weight-light h6 p-2 m-1 text-center">Pret set: {{ productOnSet[index].pretBazaDto }} RON</p>
                            </v-card>
                        </v-row>
                    </v-container>
                </v-container>
                <v-divider></v-divider>
                <v-container fluid class="text-center">
                    <p class="h4 font-weight-light p-2 m-2">TOTAL COMANDA : {{ totalOrderCost }} RON</p>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>


<script setup>
import { useUserStore } from '~/store/user';
import { ref,onMounted } from 'vue';
import AdminNavDrawerOnClient from '~/components/admin/AdminNavDrawerOnClient.vue';

const route = useRoute()
const store = useUserStore()

const encodedIdAccountDto = route.params.encodedIdContDto;
const encodedOrderId = route.params.encodedOrderId;
const deliveryDetails = ref({
        blocDto : '-',
        nrBlocDto : '-',
        cifDto : '-',
        codPostalDto : '-',
        judetDto : '-',
        nrBlocDto: '-',
        nrStradaDto: '-',
        numeFirmaDto: '-',
        orasDto: '-',
        stradaDto: '-',
        tipAdresaDto: '-'
})
const billingDetails = ref({
        blocDto : '-',
        nrBlocDto : '-',
        cifDto : '-',
        codPostalDto : '-',
        judetDto : '-',
        nrBlocDto: '-',
        nrStradaDto: '-',
        numeFirmaDto: '-',
        orasDto: '-',
        stradaDto: '-',
        tipAdresaDto: '-'
})

const clientData = ref({});
const localePath = useLocalePath();

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

watch(
  () => store.getDataPassed,
  (newData) => {
    clientData.value = newData;
  },
  { immediate: true }
);



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

const seturi = computed(() => {
    if(indexOfCurrentOrder === -1){
       return '-'
    }

    return clientData.value.comenziClient[indexOfCurrentOrder.value].seturi;
   
})

const isDeliveryTheSameWithBilling = computed(() => {
    if(indexOfCurrentOrder === -1){
        return "-"
    }
    let deliveryAddress =  clientData.value.comenziClient[indexOfCurrentOrder.value].adresaFacturareDto
    let billingAddress =  clientData.value.comenziClient[indexOfCurrentOrder.value].adresaLivrareDto
    let isDeliverySameWithBilling = JSON.stringify(deliveryAddress) === JSON.stringify(billingAddress)

    return isDeliverySameWithBilling;
})

const deliveryAddressDetails = computed(() => {
    if(indexOfCurrentOrder === -1){
        return deliveryDetails;
    }
   
    return clientData.value.comenziClient[indexOfCurrentOrder.value].adresaLivrareDto
})

const billingAddressDetails = computed(() => {
    if(indexOfCurrentOrder === -1){
        return billingDetails;
    }
   
    return clientData.value.comenziClient[indexOfCurrentOrder.value].adresaFacturareDto
})

const productsOnCurrentOrder = computed(() => {
    if(indexOfCurrentOrder === -1){
        return "-"
    }

    return clientData.value.comenziClient[indexOfCurrentOrder.value].produseCuComenziDto
})

const isCancelable = computed(() => {
    if(indexOfCurrentOrder === -1){
        return false
    }

    return clientData.value.comenziClient[indexOfCurrentOrder.value].isCancelableDto
})

const totalManoperaCost = computed(() => {
  if (indexOfCurrentOrder.value === -1 || !clientData.value.comenziClient) return 0;

  return productsOnCurrentOrder.value.reduce((total, product) => {
    // Only calculate for products of type 'perdea'
    if (product.tipulProdusuluiDto.toLowerCase() !== 'perdea') return total;

    // Calculate the manopera cost for each 'perdea' product
    const materialCost = product.pretBazaDto * product.totalMetruMaterial;
    const cusaturaGalerieCost = product.pretTipGalerieCusaturaDto * product.totalMetruMaterial;
    const cusaturaLinieCost = product.pretTipLinieCusaturaDto * product.totalMetruMaterial;

    // Sum up the total manopera cost for this product
    const totalManoperaForProduct = materialCost + cusaturaGalerieCost + cusaturaLinieCost

    // Multiply by the number of pieces for this product
    const totalManoperaForProductWithQty = totalManoperaForProduct * product.nrBucatiDto;

    // Add this product's manopera cost to the total
    return total + totalManoperaForProductWithQty;
  }, 0);
});

const totalOrderCost = computed(() => {
    if (indexOfCurrentOrder.value === -1 || !clientData.value.comenziClient) return '-';

    return clientData.value.comenziClient[indexOfCurrentOrder.value].pretTotalComanda
})




onMounted(() => {
  clientData.value = store.getDataPassed
});


</script>