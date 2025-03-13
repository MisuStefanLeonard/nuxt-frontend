<template>
    <div class="bg-grey-darken-4 p-3">
        <v-container fluid>
            <p class="font-weight-light h3 text-center">Manopere</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
            <v-alert type="info" variant="tonal">
                <p class="text-justify font-weight-light">
                    Puteti cauta manopere dupa <b class="text-white font-weight-bold">numele manoperei</b>.
                </p>
                <p class="text-justify font-weight-light">
                    Puteti cauta dupa <b class="text-white font-weight-bold">numele cusaturii de colt</b>  folosite la manopera
                </p>
                <p class="text-justify font-weight-light">
                    Puteti cauta dupa <b class="text-white font-weight-bold">numele rejansei  </b> folosite la manopera
                </p>
                <p class="text-justify font-weight-light">
                    Puteti cauta dupa <b class="text-white font-weight-bold">culoare inelului</b>   folosit la manopera.
                    Daca vreti manopere care nu folosesc inele de prindere , cautati dupa termenul  <b class="text-white font-weight-bold">"||"</b>  
                </p>
            </v-alert>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="12" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Sectiunea de adaugare manopere </p>
                    <v-btn rounded class="m-2 " color="success" @click="navigateTo('/admin/manopera/add')">
                        Adauga manopera
                        <v-icon size="24" class="pl-3" right :icon="mdiPlus"></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-card
            v-if="manopere"
            class="bg-blue-grey-darken-4 rounded-xl p-1"
            variant="outlined"
        >
            <v-card-title class="text-center">Manopere</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta "
                :prepend-inner-icon="mdiMagnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredManopere"
                :items-per-page="15"
                item-value="encodedIdManoperaDto"
                v-model="selectedManopere"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="primary"
                        size="28"
                        class="mr-2"
                        @click="navigateTo(`/admin/manopera/${item.encodedIdManoperaDto}`)"
                        :icon="mdiEye">
                      
                    </v-icon>
                </template>
                <template #[`item.tipInelDto`]="{ item }">
                    <div  v-if="item.tipInelDto === null">
                        <span class="text-red">
                            Nu are
                        </span>
                    </div>
                    <div v-else>
                        <span>
                           {{ item.tipInelDto }}
                        </span>
                    </div>
                </template>
            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import { mdiEye, mdiMagnify, mdiPlus } from '@mdi/js';
import adminService from '~/services/Admin'

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const search = ref('')
const selectedManopere = ref([])
const swal = useNuxtApp().$swal;

const manopere = ref([])
const headers = [
  { title: 'Id manopera', align: 'center', key: 'encodedIdManoperaDto' , sortable: false},
  { title: 'Nume manopera', align: 'center', key: 'numeManoperaDto' },
  { title: 'Tip rejansa', align: 'center', key: 'tipCusaturaDto' , },
  { title: 'Inele prindere', align: 'center', key: 'tipInelDto' , },
  { title: 'Tip cusatura colt' , align: 'center' , key:'tipLinieDto'},
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
]

const filteredManopere = computed(() => {
  if (!search.value) return manopere.value;

  const searchTerm = search.value.toLowerCase();

  return manopere.value.filter((manopera) => {
    return (
      (manopera.numeManoperaDto?.toLowerCase().includes(searchTerm)) || // Check for null and include
      (manopera.tipCusaturaDto?.toLowerCase().includes(searchTerm)) || // Check for null and include
      (manopera.tipLinieDto?.toLowerCase().includes(searchTerm)) || // Check for null and include
      (( searchTerm === "||" && manopera.tipInelDto === null ) ||
      (manopera.tipInelDto?.toLowerCase().includes(searchTerm) ))
    );
  });
});



function fireAlarm(icon,title,text,isLoading){
    if(isLoading === null){
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 2000,
        });
    }else{
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


const getManopere = async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const getManopere = await adminService.getManopere();
    if(getManopere.length === 0){
        swal.close()
        fireAlarm('warning','Avertizare' , 'Nu aveti manopere in baza de date', null)
    }else if(getManopere.length !== 0){
        swal.close()
        manopere.value = getManopere;
        console.log(manopere.value)
    }else {
        swal.close()
        fireAlarm('error' , 'Eroare' , 'O eroare a avut loc' , null)
    }
}



onMounted(async () => {
    await getManopere()
})



</script>