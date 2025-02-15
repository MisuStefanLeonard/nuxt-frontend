<template>
    <div class="bg-grey-darken-4 p-3">
        <v-container fluid>
            <p class="font-weight-light h3 text-center">Seturi produse</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Sectiunea de adaugare set</p>
                    <v-btn rounded class="m-2 " color="primary" @click="redirectToAddingSet()">
                        Adauga set
                        <v-icon size="24" class="pl-3" right :icon="mdiPlus" ></v-icon>
                    </v-btn>
                </v-col>
                <v-divider class="border-opacity-50" color="success" vertical></v-divider>
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Optiune pentru produsele selectate</p>
                    <v-btn rounded color="error" class="m-2 " @click="deleteSelectedSets()">
                        Sterge 
                        <v-icon size="24" class="pl-3" right  :icon="mdiDelete"></v-icon>
                    </v-btn>
                        <v-btn rounded color="primary" class="m-2 " @click="activateSelectedSets()">
                        Activeaza in magazin
                        <v-icon size="24" class="pl-3" right :icon="mdiToggleSwitchOutline" ></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-card
            v-if="seturiList"
            class="bg-blue-grey-darken-4 rounded-xl p-1"
            variant="outlined"
        >
            <v-card-title class="text-center">Seturi</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa numele setului sau starea produsului in magazin"
                prepend-inner-icon="mdi-magnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredSets"
                :items-per-page="15"
                item-value="idSetDto"
                v-model="selectedSets"
                show-select
                class="bg-blue-grey-darken-4 p-4 text-center"
                >
              <!-- Toggle Activation/Deactivation for Each Row -->
                <template #[`item.setActivInMagazin`]="{ item }">
                    <v-switch
                        v-model="item.setActivInMagazin"
                        @change="toggleSetStatus(item)"
                        :true-value="true"
                        :false-value="false"
                        color="success"
                        :label="item.setActivInMagazin === true ? 'Activ in magazin' : 'Nu e activ in magazin'"
                    ></v-switch>
                </template>

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteSet(item.encodedIdSetDto)"
                        class="mr-2" :icon="mdiDelete"
                    >
                       
                    </v-icon>
                    <v-icon
                    color="primary"
                    size="28"
                    class="mr-2"
                    @click="seeSetPage(item.encodedIdSetDto)" :icon="mdiEye"
                    >
                   
                </v-icon>
                </template>
                

            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import adminService from '~/services/Admin'
import {ref,onBeforeMount} from 'vue'
import { mdiDelete, mdiEye, mdiToggleSwitchOutline } from '@mdi/js'

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const search = ref('')
const selectedSets = ref([])
const swal = useNuxtApp().$swal;
const seturiList = ref([])
const headers = [
  { title: 'Id set', align: 'center', key: 'encodedIdSetDto' , sortable: false},
  { title: 'Nume set', align: 'center', key: 'numeSetDto' },
  { title: 'Descriere set', align: 'center', key: 'descriereSetDto' , sortable: false},
  { title: 'Pret set', align: 'center', key: 'pretSetDto' , sortable: false},
  { title: 'Pret redus set', align: 'center', key: 'pretRedusSetDto', sortable: false },
  { title: 'Activ/Dezactiv', align: 'center', key: 'setActivInMagazin', sortable: true },
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
]

const filteredSets = computed(() => {
  if (!search.value) return seturiList.value;
  let searchTerm = search.value.toLowerCase();
  if (searchTerm === 'activ') {
    searchTerm = true;
  } else if (searchTerm === 'neactiv') {
    searchTerm = false;
  }
  return seturiList.value.filter((set) => {
    return (
      set.numeSet.toLowerCase().includes(searchTerm) ||
      set.setActivInMagazin === searchTerm
    );
  });
})

function fireAlarm(icon,title,text,isLoading = null){
    if(isLoading === null){
        console.log('NORMAL')
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 1500,
        });
    }else{
        console.log('NORMAL 2')

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

function redirectToAddingSet(){
    navigateTo("/admin/set/add")
}

function seeSetPage(encodedIdSetDto){
    navigateTo(`/admin/set/${encodedIdSetDto}`)
}


const deleteSelectedSets = async () => {
  if (selectedSets.value.length === 0) {
    fireAlarm('error',"Eroare",'Nu aveti niciun set selectat')
    return;
  }
  const responseFromSetBulkDeletion = await adminService.bulkOperations(selectedSets.value, 'deletion' , 'seturi');
  if (responseFromSetBulkDeletion === 1) {
    fireAlarm('success',"Succes",'Ati sters seturile selectate cu succes')
    seturiList.value = seturiList.value.filter(set => !selectedSets.value.includes(set.encodedIdSetDto));
    selectedSets.value = [];
  }else if(responseFromSetBulkDeletion === -3){
    fireAlarm('error' , "Atentie" , "Cineva cumpara acest set. Va rugam astepati")
    return
  } else {
    fireAlarm('error',"Eroare",'O eroare a avut loc')
}}

const activateSelectedSets = async () => {
  fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
  // Check if there are selected sets
  if (selectedSets.value.length === 0) {
    fireAlarm('error', "Eroare", 'Nu aveti niciun set selectat');
    return;
  }

  // Filter only the deactivated sets for activation
  const setsToActivate = selectedSets.value.filter(
    (setId) => {
      const set = seturiList.value.find(s => s.idSetDto === setId);
      return set && set.setActivInMagazin === false;
    }
  );

  // If no sets need to be activated, notify the user and exit
  if (setsToActivate.length === 0) {
    fireAlarm('info', "Info", 'Toate seturile selectate sunt deja activate');
    return;
  }

  // Call the bulk activation operation with filtered sets
  const responseFromSetActivationInBulk = await adminService.bulkOperations(setsToActivate, 'update', 'seturi');
  if (responseFromSetActivationInBulk === 1) {
    fireAlarm('success', "Succes", 'Ati activat seturile selectate cu succes');
    console.log(setsToActivate)
    // Update seturiList to mark these sets as activated
    seturiList.value.forEach(set => {
      if (setsToActivate.includes(set.idSetDto)) {
        set.setActivInMagazin = true;
      }
    });

    // Clear the selected sets
    selectedSets.value = [];
  }else if(responseFromSetBulkDeletion === -3){
    fireAlarm('error' , "Atentie" , "Cineva cumpara acest set. Va rugam astepati")
    return
  } else {
    fireAlarm('error', "Eroare", 'O eroare a avut loc');
  }
};




const toggleSetStatus = async (set) => {
  const response = await adminService.toggleSetActivationState(
    set.encodedIdSetDto,
    set.setActivInMagazin
  );
  console.log(response)
  console.log(set.setActivInMagazin)
  if (response === 1) {
    fireAlarm('success',"Succes",`Setul a fost ${
        set.setActivInMagazin ? 'activat' : 'dezactivat'
      } cu succes`)
  }else if(response === -3){
    fireAlarm('error' , "Atentie" , "Cineva cumpara acest set. Va rugam astepati")
    return
  } else {
    swal.close()
    fireAlarm('error',"Eroare",'O eroare a avut loc!Dati un refresh la pagina')
    set.setActivInMagazin = !set.setActivInMagazin; 
  }
}
const deleteSet = async (encodedIdSetDto) => {
  fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
  const responseFromSetDeletion = await adminService.deleteCurrentSet(encodedIdSetDto);
  if (responseFromSetDeletion === 1) {
    fireAlarm('success',"Succes",'Setul a fost sters cu succes')
    seturiList.value = seturiList.value.filter(set => set.encodedIdSetDto !== encodedIdSetDto);
  }else if(responseFromSetDeletion === -3){
    fireAlarm('error' , "Atentie" , "Cineva cumpara acest set. Va rugam astepati")
    return
  } else if (responseFromSetDeletion === -4) {
    fireAlarm('error',"Eroare",' Setul nu mai exista! Dati un refresh la pagina')
  } else {
    fireAlarm('error',"Eroare",'O eroare a avut loc !Dati un refresh la pagina')

  }
}

async function getSeturi(){
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const getSeturi = await adminService.getSeturi();
    console.log(getSeturi)
   
    if(getSeturi.length === 0){
        swal.close()
        fireAlarm('warning','Avertizare' , 'Nu aveti seturi in baza de date', null)
        return
    }else if(getSeturi.length !== 0){
        swal.close()
        // Use splice to keep reactivity
        seturiList.value = getSeturi;
       
    }else {
        swal.close()
        fireAlarm('error' , 'Eroare' , 'O eroare a avut loc' , null)
        return
    }
}


onMounted(async () => {
    await getSeturi()
})



</script>