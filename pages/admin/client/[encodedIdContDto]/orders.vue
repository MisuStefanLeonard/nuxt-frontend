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
        </v-main>
    </v-app>
</template>


<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useUserStore } from '~/store/user';
import AdminNavDrawerOnClient from '~/components/admin/AdminNavDrawerOnClient.vue';
import { mdiEye } from '@mdi/js';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

// Store and Route Information
const route = useRoute();
const store = useUserStore();
const encodedIdAccountDto = route.params.encodedIdContDto;

// Reactive References
const clientData = ref({});
const parsedOrdersData = ref([]); // Use `ref` for arrays or single values

// Table Headers
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
    navigateTo(`/admin/client/${encodedIdAccountDto}/order/${encodedOrderId}`)
}

// Parsing Function
const parseDataInfo = () => {
  // Clear existing data to avoid duplicates
  parsedOrdersData.value = [];

  // Check if clientData has orders to parse
  if (!clientData.value || !clientData.value.comenziClient) return;

  clientData.value.comenziClient.forEach((comanda) => {
    // Original date string in UTC
    console.log(comanda.orderDate)
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

    // Construct a parsed order data item
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



// Watch Effect to Parse Orders Data When Client Data Changes
watchEffect(() => {
  clientData.value = store.getDataPassed;
  console.log(clientData.value)
  if (clientData.value) {
    parseDataInfo();
  }
});

// Fetch Data on Mounted
onMounted(() => {
  clientData.value = store.getDataPassed
  console.log(clientData.value)
});



</script>
