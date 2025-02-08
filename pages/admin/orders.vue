<template>
    <v-container fluid class="bg-grey-darken-4 p-3 h-100">
        <p class="font-weight-light p-2 m-2 h3">Comenzi</p>
        <v-divider></v-divider>
        <v-container fluid v-if="orders.length !== 0">
            <v-alert type="info" variant="tonal" class="my-2">
                <p class="font-weight-light text-white">Aici puteti vedea ultimele comenzi efectuate de catre clienti.</p>
            </v-alert>
            <v-alert type="info" variant="tonal">
                <p class="font-weight-light text-white">Puteti ordona dupa statusul comenzii si data emiterii comenzii.</p>
            </v-alert>
            <v-sheet elevation="24" class="bg-grey-darken-4 p-3 m-1">
                <v-data-table 
                        class="bg-grey-darken-3 p-2 my-2"
                        items-per-page="10"
                        item-value="idComandaDto"
                        :headers="visibleHeaders"
                        :items="orders">

                        <template #[`item.actions`]="{ item }">
                            <v-icon
                                color="primary"
                                size="28"
                                class="mr-2"
                                @click="seeOrder(item.encodedIdComandaDto , item .encodedIdContDto)"
                                >
                                mdi-eye
                            </v-icon>
                        </template>

                        <template #[`item.statusComandaDto`]="{item}">
                            <div v-if="item.statusComandaDto === 'InProcesare'">
                                <span class="text-orange">In procesare</span>
                            </div>
                            <div v-if="item.statusComandaDto === 'Procesata'">
                                <span class="text-yellow">Procesata</span>
                            </div>
                            <div v-if="item.statusComandaDto === 'Finalizata'">
                                <span class="text-green">Finalizata</span>
                            </div>
                            <div v-if="item.statusComandaDto === 'Anulata'">
                                <span class="text-red">Anulata</span>
                            </div>
                            <div v-if="item.statusComandaDto === 'Rambursata'">
                                <span class="text-blue">Rambursata</span>
                            </div>
                            <div v-if="item.statusComandaDto === 'InAsteptare'">
                                <span class="text-blue">In asteptarea platii</span>
                            </div>
                        </template>

                        <template #[`item.tipPlataDto`]="{item}">
                            <div v-if="item.tipPlataDto === 'Ramburs'">
                                <span class="text-blue">Ramburs</span>
                            </div>
                            <div v-else>
                                <span class="text-yellow">Plata card</span>
                            </div>
                        </template>

                    </v-data-table>
            </v-sheet>
        </v-container>
        <v-container fluid v-else>
            <v-card class="bg-grey-darken-4 m-2 p-2">
                Nicio comanda nu a fost plasata inca.
            </v-card>
        </v-container>
    </v-container>
</template>


<script setup>
import adminService from '~/services/Admin';
import { ref,onBeforeMount } from 'vue';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})


const headers = ref([
  { title: 'Id comanda', align: 'center', key: 'idComandaDto' , sortable: false},
  { title: 'Numar comanda codat', align: 'center', key: 'encodedIdComandaDto' , sortable: false , hidden: true},
  { title: 'Numar cont codat', align: 'center', key: 'encodedIdContDto' , sortable: false , hidden: true},
  { title: 'Data emitere', align: 'center', key: 'dataEmitereComandaDto'},
  { title: 'Status comanda', align: 'center', key: 'statusComandaDto'},
  { title: 'Tip plata', align: 'center', key: 'tipPlataDto', sortable: false },
  { title: 'AWB', align: 'center', key: 'awbComandaDto', sortable: false },
  { title: 'Pret(RON)', align: 'center', key: 'pretTotalComanda', sortable: false },
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
])

const visibleHeaders = computed(() => {
  return headers.value.filter(header => !header.hidden); 
});

const orders = ref([])

const getOrders = (async () => {
    const response = await adminService.getMainOrders()
    if(response.length != 0){
        orders.value = response
        console.log(orders.value)
    }
})

function seeOrder(encodedIdComanda , encodedIdCont){
    navigateTo({
        path: `/admin/client/${encodedIdCont}/data`,
        query: {
            order: encodedIdComanda
        }
    })
}


onBeforeMount(async () => {
    await getOrders()
})

</script>