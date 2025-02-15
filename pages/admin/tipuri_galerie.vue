<template>
    <div class="bg-grey-darken-4 p-3">
        <v-container fluid>
            <p class="font-weight-light h3 text-center">Tipuri galerie</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
            <v-alert type="info" variant="tonal">
                <p class="text-justify font-weight-light">Pentru a cauta galeriile care nu necesita inele la prindere,
                    cautati dupa termenul <b class="text-white">fara_prindere_inele</b>
                </p>
                <p class="text-justify font-weight-light">Pentru a cauta galeriile care necesita inele la prindere,
                    cautati dupa termenul <b class="text-white">prindere_inele</b>
                </p>
            </v-alert>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Sectiunea de adaugare tipuri galerie </p>
                    <v-btn rounded class="m-2 " color="success" @click="redirectToAddingTipGalerie()">
                        Adauga tip galerie
                        <v-icon size="24" class="pl-3" right  :icon="mdiPlus" ></v-icon>
                    </v-btn>
                </v-col>
                <v-divider class="border-opacity-50" color="success" vertical></v-divider>
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Optiune pentru tipuri galerie selectate</p>
                    <v-btn rounded color="error" class="m-2 " @click="deleteSelectedTipGalerie()">
                        Sterge 
                        <v-icon size="24" class="pl-3" right :icon="mdiDelete"></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-card
            v-if="tipuriGalerieList"
            class="bg-blue-grey-darken-4 rounded-xl p-1"
            variant="outlined"
        >
            <v-card-title class="text-center">Tipuri galerie</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa numele galeriei"
                prepend-inner-icon="mdi-magnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredTipuriGalerie"
                :items-per-page="15"
                item-value="idTipGalerieDto"
                v-model="selectedTipuriGalerie"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteTipGalerie(item.encodedIdTipGalerieDto)"
                        class="mr-2"  :icon="mdiDelete"
                    >
                      
                    </v-icon>
                    <v-icon
                    color="primary"
                    size="28"
                    class="mr-2"
                    @click="seeTipGaleriePage(item.encodedIdTipGalerieDto)" :icon="mdiEye"
                    >
                   
                </v-icon>
                </template>
                <template #[`item.sePrindeCuIneleDto`]="{item}">
                    <div v-if="item.sePrindeCuIneleDto === false">
                        <span class="text-red">Nu</span>
                    </div>
                    <div v-else>
                        <span class="text-green">Da</span>
                    </div>
                </template>
                

            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import { mdiEye } from '@mdi/js';
import Swal from 'sweetalert2';
import adminService from '~/services/Admin'
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const search = ref('')
const selectedTipuriGalerie = ref([])
const swal = useNuxtApp().$swal;
const store = useUserStore();

var tipuriGalerieList = reactive([])
const headers = [
  { title: 'Id tip galerie', align: 'center', key: 'encodedIdTipGalerieDto' , sortable: false},
  { title: 'Nume tip galerie', align: 'center', key: 'numeTipGalerieDto' },
  { title: 'Pret/metru tip galerie', align: 'center', key: 'pretTipGalerieDto' , sortable: false},
  { title: 'Prindere inele', align: 'center', key: 'sePrindeCuIneleDto'},
  { title: 'Incretire' , align: 'cetner' , key:'incretireDto'},
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
]

const filteredTipuriGalerie = computed(() => {
  if (!search.value) return tipuriGalerieList;
  let searchTerm = search.value.toLowerCase();
  if(searchTerm === 'prindere_inele'){
    searchTerm = true;
  }else if(searchTerm === 'fara_prindere_inele'){
    searchTerm = false;
  }
  return tipuriGalerieList.filter((tip_galerie) => {
    return (
        tip_galerie.numeTipGalerieDto.toLowerCase().includes(searchTerm),
        tip_galerie.sePrindeCuIneleDto === searchTerm
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

function redirectToAddingTipGalerie(){
    navigateTo("/admin/tip_galerie/add")
}

function seeTipGaleriePage(encodedIdTipGalerieDto){
    navigateTo(`/admin/tip_galerie/${encodedIdTipGalerieDto}`)
}

async function deleteSelectedTipGalerie(){
    fireAlarm('info' , 'Asteptati..' , 'Tipurile galerie se sterg..' , true)
    if(selectedTipuriGalerie.value.length === 0){
        fireAlarm('info' , 'Info' , 'Niciun tip galerie selectat' , null)
        return;
    }else{
        const responseFromDeletion = await adminService.bulkOperations(selectedTipuriGalerie.value , 'deletion' , 'tipuri_galerie')
        if(responseFromDeletion === 1){
            fireAlarm('success' , 'Succes!' , 'Tipuri galerie sterse cu succes' , null);
            window.location.reload()
        }else if(responseFromDeletion === -3){
            fireAlarm('warning' , 'Atentie' , "Unul din tipurile de galerie selectate este folosit intr-o tranzactie.Asteptati" , null)
            return
        }
        else if(responseFromDeletion === -1){
            swal.close()
            store.snackbarMessage('Token-ul a expirat, logati-va din nou!')
            navigateTo('/user/logout')
        }else {
            fireAlarm('error' , 'Eroare!' , 'A avut loc o eroare la stergerea tipurilor de galerie' , null);
            return;
        }
    }
}


async function deleteTipGalerie(encodedIdTipGalerieDto){
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
                const deleteTipGalerieResponse = await adminService.deleteTipGalerie(encodedIdTipGalerieDto);
                console.log(deleteTipGalerieResponse)
                if(deleteTipGalerieResponse === 1){
                    Swal.fire("Sters cu succes!", "", "success");
                    window.location.reload();
                    return
                }else if(deleteTipGalerieResponse === -1){
                    store.showSnackbar('Token-ul a expirat!Logati-va din noua!');
                    navigateTo("/user/logout")
                    return;
                }else if(deleteTipGalerieResponse === -2){
                    Swal.fire("O eroare a avut loc" , "" , 'error')
                    return;
                }else if(deleteTipGalerieResponse === -3){
                    fireAlarm('warning' , 'Atentie' , "Tipul de galerie selectat este folosit intr-o tranzactie.Asteptati" , null)
                    return
                }
            } else if (result.isDenied) {
                Swal.fire("Nu ati sters nimic", "", "info");
                return;
            }
        });
}

async function getTipuriGalerie(){
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const getTipuriGalerie = await adminService.getTipuriGalerie();
    if(getTipuriGalerie.length === 0){
        swal.close()
        fireAlarm('warning','Avertizare' , 'Nu aveti tipuri de galerie in baza de date', null)
    }else if(getTipuriGalerie.length !== 0){
        swal.close()
        // Use splice to keep reactivity
        tipuriGalerieList.splice(0, tipuriGalerieList.length, ...getTipuriGalerie);
        console.log(tipuriGalerieList)
    }else {
        swal.close()
        fireAlarm('error' , 'Eroare' , 'O eroare a avut loc' , null)
    }
}



onBeforeMount(async () => {
    await getTipuriGalerie()
})



</script>