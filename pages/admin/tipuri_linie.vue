<template>
    <div class="bg-grey-darken-4 p-3">
        <v-container fluid>
            <p class="font-weight-light h3 text-center">Tipuri linie</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Sectiunea de adaugare tipuri linie </p>
                    <v-btn rounded class="m-2 " color="success" @click="redirectToAddingTipLinie()">
                        Adauga tip linie
                        <v-icon size="24" class="pl-3" right :icon="mdiPlus"></v-icon>
                    </v-btn>
                </v-col>
                <v-divider class="border-opacity-50" color="success" vertical></v-divider>
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Optiune pentru tipurile de linie selectate</p>
                    <v-btn rounded color="error" class="m-2 " @click="deleteSelectedTipLinie()">
                        Sterge 
                        <v-icon size="24" class="pl-3" right  :icon="mdiDelete"></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-card
            v-if="loaded"
            class="bg-blue-grey-darken-4 rounded-xl p-1"
            variant="outlined"
        >
            <v-card-title class="text-center">Tipuri Linie</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa numele galeriei"
                :prepend-inner-icon="mdiMagnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredTipuriLinie"
                :items-per-page="15"
                item-value="idTipLinieDto"
                v-model="selectedTipuriLinie"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteTipLinie(item.encodedIdTipLinie)"
                        class="mr-2"  :icon="mdiDelete"
                    >
                     
                    </v-icon>
                    <v-icon
                    color="primary"
                    size="28"
                    class="mr-2"
                    @click="seeTipGaleriePage(item.encodedIdTipLinie)"
                    :icon="mdiEye"
                    >
                    
                </v-icon>
                </template>
                

            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import { mdiDelete, mdiEye, mdiMagnify, mdiPlus } from '@mdi/js';
import Swal from 'sweetalert2';
import adminService from '~/services/Admin'
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const search = ref('')
const selectedTipuriLinie = ref([])
const swal = useNuxtApp().$swal;
const store = useUserStore();
const loaded = ref(false)

const tipuriLinieList = ref([])
const headers = [
  { title: 'Id tip linie', align: 'center', key: 'encodedIdTipLinie' , sortable: false},
  { title: 'Nume tip linie', align: 'center', key: 'numeTipLinieJsonDto.nume_ro' },
  { title: 'Pret tip linie', align: 'center', key: 'pretPeTipLinieDto' , sortable: false},
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
]

const filteredTipuriLinie = computed(() => {
  if (!search.value) return tipuriLinieList.value;
  let searchTerm = search.value.toLowerCase();
  return tipuriLinieList.value.filter((tip_Linie) => {
    return (
        tip_Linie.numeTipLinieJsonDto.nume_ro.toLowerCase().includes(searchTerm) ||
        tip_Linie.numeTipLinieJsonDto.nume_en.toLowerCase().includes(searchTerm)

    );
  });
})


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

function redirectToAddingTipLinie(){
    navigateTo("/admin/tip_linie/add")
}

function seeTipGaleriePage(encodedIdTipLinie){
    navigateTo(`/admin/tip_linie/${encodedIdTipLinie}`)
}

async function deleteSelectedTipLinie(){
    fireAlarm('info' , 'Asteptati..' , 'Tipurile de linie se sterg..' , true)
    if(selectedTipuriLinie.value.length === 0){
        fireAlarm('info' , 'Info' , 'Niciun tip galerie selectat' , null)
        return;
    }else{
        const responseFromDeletion = await adminService.bulkOperations(selectedTipuriLinie.value , 'deletion' , 'tipuri_linie')
        if(responseFromDeletion === 1){
            fireAlarm('success' , 'Succes!' , 'Tipurile de linie selectate sterse cu succes' , null);
            window.location.reload()
        }else if(responseFromDeletion === -3){
            fireAlarm('warning' , 'Atentie' , "Unul din tipurile de linie selectate este folosit intr-o tranzactie.Asteptati" , null)
            return
        }else if(responseFromDeletion === -1){
            swal.close()
            store.snackbarMessage('Token-ul a expirat, logati-va din nou!')
            navigateTo('/user/logout')
        }else {
            fireAlarm('error' , 'Eroare!' , 'A avut loc o eroare la stergerea tipurilor de linie' , null);
            return;
        }
    }
}


async function deleteTipLinie(encodedIdTipLinie){
    console.log()
    swal.fire({
          title: "Confirmati stergerea?",
          showDenyButton: true,
          showCancelButton: true,
          allowOutsideClick: false, 
          allowEscapeKey: false,
          confirmButtonText: "Da",
          denyButtonText: `Nu`,
      }).then(async (result) => 
        {
            if (result.isConfirmed) {
                const deleteTipLinieResponse = await adminService.deleteTipLinie(encodedIdTipLinie);
                if(deleteTipLinieResponse === 1){
                    Swal.fire("Sters cu succes!", "", "success");
                    window.location.reload();
                    return
                }else if(deleteTipLinieResponse === -1){
                    store.showSnackbar('Token-ul a expirat!Logati-va din noua!');
                    navigateTo("/user/logout")
                    return;
                }else if(deleteTipLinieResponse === -2){
                    Swal.fire("O eroare a avut loc" , "" , 'error')
                    return;
                }else if(deleteTipLinieResponse === -3){
                    fireAlarm('warning' , 'Atentie' , "Tipul de linie este folosit intr-o tranzactie.Asteptati" , null)
                    return
                }
            } else if (result.isDenied) {
                Swal.fire("Nu ati sters nimic", "", "info");
                return;
            }
        });
}
// de termiat add / modificare 

async function getTipuriLinie(){
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const getTipuriLinie = await adminService.getTipuriLinie();
    if(getTipuriLinie.length === 0){
        swal.close()
        fireAlarm('warning','Avertizare' , 'Nu aveti tipuri de galerie in baza de date', null)
    }else if(getTipuriLinie.length !== 0){
        swal.close()
        // Use splice to keep reactivity
        tipuriLinieList.value = getTipuriLinie
        console.log(tipuriLinieList)
    }else {
        swal.close()
        fireAlarm('error' , 'Eroare' , 'O eroare a avut loc' , null)
    }
}



onBeforeMount(async () => {
    await getTipuriLinie()
})

onMounted(() => {
    loaded.value = true;
})



</script>