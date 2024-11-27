<template>
    <div class="bg-grey-darken-4 p-3">
        <v-container fluid>
            <p class="font-weight-light h3 text-center">Vouchere</p>
            <v-divider class="border-opacity-50" color="success"></v-divider>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Sectiunea de adaugare vouchere</p>
                    <v-btn rounded class="m-2 " color="success" @click="redirectToAddingVoucher()">
                        Adauga voucher
                        <v-icon size="24" class="pl-3" right>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
                <v-divider class="border-opacity-50" color="success" vertical></v-divider>
                <v-col cols="6" class="d-block text-center">
                    <p class="h5 font-weight-light text-white">Optiune pentru voucherele selectate</p>
                    <v-btn rounded color="error" class="m-2 " @click="deleteSelectedVouchers()">
                        Sterge 
                        <v-icon size="24" class="pl-3" right>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-sheet color="grey-darken-3 m-2">
            <p class="font-weight-light h3 text-center p-2 m-2">
                <v-icon size="24" color="primary">mdi-information</v-icon>
                Informatii
            </p>
            <v-container fluid>
                <v-alert color="info" variant="tonal" class="text-black">
                    Pentru cautarea voucherelor in functie de validitate ,
                    folositi cuvantul <b class="text-red ">"expirat"</b> sau 
                    folositi cuvantul <b class="text-black">"valid"</b>
                </v-alert>
            </v-container>
        </v-sheet>
        <v-card
            v-if="vouchersList"
            class="bg-blue-grey-darken-4 rounded-xl p-1"
            variant="outlined"
        >
            <v-card-title class="text-center">Vouchere</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa codul voucherului sau starea de validitate"
                prepend-inner-icon="mdi-magnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredVouchers"
                :items-per-page="15"
                item-value="idVoucherDto"
                v-model="selectedVouchers"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

                <template #[`item.expirat`]="{ item }">
                    <span class="text-red" v-if="new Date(item.dataExpirareDto) < new Date()">
                        Expirat
                    </span>
                    <span class="text-green" v-else>
                        Valid
                    </span>
                </template>

                <template #[`item.dataExpirareDto`]="{ item }">
                {{ formatDate(item.dataExpirareDto) }}
                </template>
              
              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteVoucher(item.encodedIdVoucherDto)"
                        class="mr-2"
                    >
                        mdi-delete
                    </v-icon>
                    <v-icon
                    color="primary"
                    size="28"
                    class="mr-2"
                    @click="seeVoucherPage(item.encodedIdVoucherDto)"
                    >
                    mdi-eye
                </v-icon>
                </template>
                

            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import adminService from '~/services/Admin'
import { useUserStore } from '~/store/user';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const search = ref('')
const selectedVouchers = ref([])
const swal = useNuxtApp().$swal;
const store = useUserStore();



var vouchersList = reactive([])
const headers = [
  { title: 'Id voucher', align: 'center', key: 'encodedIdVoucherDto' , sortable: false},
  { title: 'Cod voucher', align: 'center', key: 'codVoucherDto' },
  { title: 'Reducere voucher(%)', align: 'center', key: 'reducereDto' , sortable: false},
  { title: 'Data expirare', align: 'center', key: 'dataExpirareDto', sortable: false },
  { title: 'Stare voucher', align: 'center', key: 'expirat'},
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
]

const filteredVouchers = computed(() => {
  if (!search.value) return vouchersList;
  
  let searchTerm = search.value.toLowerCase().trim();
  const currentDate = new Date(); // Get current date

  return vouchersList.filter((voucher) => {
    // Check if the search term is 'expirat' or 'neexpirat'
    if (searchTerm === 'expirat') {
      return new Date(voucher.dataExpirareDto) < currentDate; // Voucher expired
    } else if (searchTerm === 'valid') {
      return new Date(voucher.dataExpirareDto) >= currentDate; // Voucher still valid
    }

    // Otherwise, perform a normal search based on voucher code
    return voucher.codVoucherDto.toLowerCase().includes(searchTerm);
  });
});



function fireAlarm(icon,title,text,isLoading){
    if(isLoading === null){
        console.log('NORMAL')
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 2000,
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' gives 'YYYY-MM-DD' format
};

function redirectToAddingVoucher(){
    navigateTo("/admin/voucher/add")
}

function seeVoucherPage(encodedIdVoucher){
    navigateTo(`/admin/voucher/${encodedIdVoucher}`)
}

async function deleteSelectedVouchers(){
    fireAlarm('info' , 'Asteptati..' , 'Materialele se sterg..' , true)
    console.log(selectedVouchers.value)
    if(selectedVouchers.value.length === 0){
        fireAlarm('info' , 'Info' , 'Niciun material selectat' , null)
        return;
    }else{
        const responseFromDeletion = await adminService.bulkOperations(selectedVouchers.value , 'deletion' , 'vouchere')
        if(responseFromDeletion === 1){
            fireAlarm('success' , 'Succes!' , 'Vouchere sterse cu succes' , null);
            window.location.reload()
        }else if(responseFromDeletion === -1){
            swal.close()
            store.snackbarMessage('Token-ul a expirat, logati-va din nou!')
            navigateTo('/user/logout')
        }else {
            fireAlarm('error' , 'Eroare!' , 'A avut loc o eroare la stergerea voucherelor' , null);
            return;
        }
    }
}

async function deleteVoucher(idVoucherDto){
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
                const deleteVoucherResponse = await adminService.deleteVoucher(idVoucherDto);
                if(deleteVoucherResponse === 1){
                    Swal.fire("Sters cu succes!", "", "success");
                    window.location.reload();
                    return
                }else if(deleteVoucherResponse === -1){
                    store.showSnackbar('Token-ul a expirat!Logati-va din noua!');
                    navigateTo("/user/logout")
                    return;
                }else if(deleteVoucherResponse === -2){
                    Swal.fire("O eroare a avut loc" , "" , 'error')
                    return;
                }
            } else if (result.isDenied) {
                Swal.fire("Nu ati sters nimic", "", "info");
                return;
            }
        });
}

async function getVouchers(){
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const getVouchers = await adminService.getVouchers();
    console.log(getVouchers)
    if(getVouchers.length === 0){
        swal.close()
        fireAlarm('warning','Avertizare' , 'Nu aveti vouchere in baza de date', null)
    }else if(getVouchers.length !== 0){
        swal.close()
        // Use splice to keep reactivity
        vouchersList.splice(0, vouchersList.length, ...getVouchers);
    }else {
        swal.close()
        fireAlarm('error' , 'Eroare' , 'O eroare a avut loc' , null)
    }
}


onBeforeMount(() => {
    getVouchers()
})



</script>