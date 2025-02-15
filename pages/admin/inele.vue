<template>
    <div class="bg-grey-darken-4 p-3">
        <v-container fluid>
            <p class="font-weight-light h3 text-center">Inele prindere</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Sectiunea de adaugare inele </p>
                    <v-btn rounded class="m-2 " color="success" @click="redirectToAddingInel()">
                        Adauga inel
                        <v-icon size="24" class="pl-3" right :icon="mdiPlus"></v-icon>
                    </v-btn>
                </v-col>
                <v-divider class="border-opacity-50" color="success" vertical></v-divider>
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Optiune pentru inele selectate</p>
                    <v-btn rounded color="error" class="m-2 " @click="deleteSelectedInele()">
                        Sterge 
                        <v-icon size="24" class="pl-3" right :icon="mdiDelete"></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-card
            v-if="inelePrindereList"
            class="bg-blue-grey-darken-4 rounded-xl p-1"
            variant="outlined"
        >
            <v-card-title class="text-center">Inele prindere</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa numele culorii"
                prepend-inner-icon="mdi-magnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredInele"
                :items-per-page="15"
                item-value="idInelDto"
                v-model="selectedInele"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteInel(item.encodedIdInelDto)"
                        class="mr-2" :icon="mdiDelete"
                    >
                        
                    </v-icon>
                    <v-icon
                    color="primary"
                    size="28"
                    class="mr-2"
                    @click="seeInelPage(item.encodedIdInelDto)" :icon="mdiEye"
                    >
                   
                </v-icon>
                </template>
                

            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import { mdiDelete, mdiEye, mdiPlus } from '@mdi/js';
import Swal from 'sweetalert2';
import adminService from '~/services/Admin'
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const search = ref('')
const selectedInele = ref([])
const swal = useNuxtApp().$swal;
const store = useUserStore();

var inelePrindereList = reactive([])
const headers = [
  { title: 'Id inel', align: 'center', key: 'encodedIdInelDto' , sortable: false},
  { title: 'Culoare inel', align: 'center', key: 'culoareInelDto' },
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
]

const filteredInele = computed(() => {
  if (!search.value) return inelePrindereList;
  let searchTerm = search.value.toLowerCase();
  return inelePrindereList.filter((inele) => {
    return (
        inele.culoareInelDto.toLowerCase().includes(searchTerm)
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

function redirectToAddingInel(){
    navigateTo("/admin/inel/add")
}

function seeInelPage(encodedIdInel){
    navigateTo(`/admin/inel/${encodedIdInel}`)
}

async function deleteSelectedInele(){
    fireAlarm('info' , 'Asteptati..' , 'Inelele se sterg..' , true)
    if(selectedInele.value.length === 0){
        fireAlarm('info' , 'Info' , 'Niciun inel selectat' , null)
        return;
    }else{
        const responseFromDeletion = await adminService.bulkOperations(selectedInele.value , 'deletion' , 'inele')
        if(responseFromDeletion === 1){
            fireAlarm('success' , 'Succes!' , 'Inele sterse cu succes' , null);
            window.location.reload()
        }else if(responseFromDeletion === -3){
            fireAlarm('warning' , 'Atentie' , "Unul din inele selectate este folosit intr-o tranzactie.Asteptati" , null)
            return
        }else if(responseFromDeletion === -1){
            swal.close()
            store.snackbarMessage('Token-ul a expirat, logati-va din nou!')
            navigateTo('/user/logout')
        }else {
            fireAlarm('error' , 'Eroare!' , 'A avut loc o eroare la stergerea materialelor' , null);
            return;
        }
    }
}


async function deleteInel(encodedIdInel){
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
                const deleteMaterialResponse = await adminService.deleteInel(encodedIdInel);
                console.log(deleteMaterialResponse);
                if(deleteMaterialResponse === 1){
                    Swal.fire("Sters cu succes!", "", "success");
                    window.location.reload();
                    return
                }else if(deleteMaterialResponse === -1){
                    store.showSnackbar('Token-ul a expirat!Logati-va din noua!');
                    navigateTo("/user/logout")
                    return;
                }else if(deleteMaterialResponse === -2){
                    Swal.fire("O eroare a avut loc" , "" , 'error')
                    return;
                }else if(deleteMaterialResponse === -3){
                    fireAlarm('warning' , 'Atentie' , "Inelul selectat este folosit intr-o tranzactie.Asteptati" , null)
                    return
                }
            } else if (result.isDenied) {
                Swal.fire("Nu ati sters nimic", "", "info");
                return;
            }
        });
}

async function getInele(){
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const getInele = await adminService.getInelePrindere();
    if(getInele.length === 0){
        swal.close()
        fireAlarm('warning','Avertizare' , 'Nu aveti inele de prindere in baza de date', null)
    }else if(getInele.length !== 0){
        swal.close()
        // Use splice to keep reactivity
        inelePrindereList.splice(0, inelePrindereList.length, ...getInele);
        console.log(inelePrindereList)
    }else {
        swal.close()
        fireAlarm('error' , 'Eroare' , 'O eroare a avut loc' , null)
    }
}



onBeforeMount(async () => {
    await getInele()
})



</script>