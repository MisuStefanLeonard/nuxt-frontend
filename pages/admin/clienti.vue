<template>
    <div fluid class="bg-grey-darken-4 p-4">
        <div class="text-center  p-4">
            <p class="font-weight-light h3 ">Clienti</p>
            <v-divider opacity="0" color="success"></v-divider>
            <v-text-field
                v-model="search"
                label="Cauta dupa numele/prenumele/email/tipul contului/username a clientului"
                :prepend-inner-icon="mdiMagnify"
                class="p-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredClients"
                :items-per-page="15"
                item-value="idContDto"
                v-model="selectedClients"
                show-select
                class="bg-blue-grey-darken-4 p-3 "
            >
                <!-- Toggle Activation/Deactivation for Each Row -->
                <template v-slot:[`item.contActivDto`]="{ item }">
                    <v-switch
                        v-model="item.contActivDto"
                        @change="toggleAccountStatus(item)"
                        color="success"
                        :label="item.contActivDto === true ? 'Cont activ' : 'Cont neactivat'"
                    ></v-switch>
                </template>

                <!-- Date Formatting for 'dataCreareDto' -->
                <template v-slot:[`item.dataCreareDto`]="{ item }">
                    <p>{{ formatDateTime(item.dataCreareDto) }}</p>
                </template>

                <!-- Custom displaying for guest/registered account -->
                <template v-slot:[`item.tipContDto`]="{ item }">
                    <div v-if="getAccountType(item.tipContDto) === 'Registered'">
                        <span class="text-green">
                            Inregistrat
                        </span>
                    </div>
                    <div v-else>
                        <span class="text-red">
                            Neinregistrat
                        </span>
                    </div>
                </template>

                <!-- Custom Actions for Each Row -->
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        color="primary"
                        size="28"
                        class="mr-2"
                        @click="seeClientPage(item.encodedIdContDto)" :icon="mdiEye"
                    >
                       
                    </v-icon>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script setup>
import { mdiEye, mdiMagnify } from '@mdi/js';
import { ref, onBeforeMount, computed } from 'vue';
import adminService from '~/services/Admin';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const search = ref('');
const selectedClients = ref([]);
const clientsList = ref([]);
const swal = useNuxtApp().$swal;

// Headers for the table
const headers = [
    { title: 'Id client', align: 'center', key: 'encodedIdContDto', sortable: false },
    { title: 'Nume', align: 'center', key: 'numeDto' },
    { title: 'Prenume', align: 'center', key: 'prenumeDto' },
    { title: 'Data creare', align: 'center', key: 'dataCreareDto' },
    { title: 'Email', align: 'center', key: 'emailDto' },
    { title: 'Username', align: 'center', key: 'usernameDto' },
    { title: 'Rol', align: 'center', key: 'rolDto' },
    { title: 'Tip cont', align: 'center', key: 'tipContDto' },
    { title: 'Activ/Dezactiv', align: 'center', key: 'contActivDto' },
    { title: 'Actiuni', align: 'center', key: 'actions', sortable: false },
];

// Function to map `tipContDto` to its correct string value
function getAccountType(tipContDto) {
    if (tipContDto === 'Registered' || tipContDto === 'Guest') {
        return tipContDto; // If it's already a string, return it directly
    }
    
    // Assuming the backend sends 0 for Registered and 1 for Guest
    return tipContDto === 0 ? 'Registered' : 'Guest';
}

// Function to format the date in 'yyyy-mm-dd : hh:mm:ss' format
function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} : ${hh}:${min}:${ss}`;
}

// Filtered clients based on search query
const filteredClients = computed(() => {
    if (!search.value) return clientsList.value;
    let searchTerm = search.value.toLowerCase();
    if (searchTerm === 'activ') {
        searchTerm = true;
    } else if (searchTerm === 'neactiv') {
        searchTerm = false;
    }
    return clientsList.value.filter((client) => {
        return (
            client.numeDto?.toLowerCase().includes(searchTerm) ||
            client.prenumeDto?.toLowerCase().includes(searchTerm) ||
            client.emailDto?.toLowerCase().includes(searchTerm) ||
            client.usernameDto?.toLowerCase().includes(searchTerm) ||
            getAccountType(client.tipContDto)?.toLowerCase().includes(searchTerm) ||
            client.contActivDto === searchTerm
        );
    });
});

// Fetching client data from the server
async function getClientsData() {
    try {
        const clients = await adminService.getClientsData();
        if (clients && clients.length > 0) {
            clientsList.value = clients;
        } else {
            fireAlarm('warning', 'Avertizare', 'Inca nu aveti clienti pe site', null);
        }
    } catch (error) {
        fireAlarm('error', 'Eroare', 'A avut loc o eroare la incarcarea clientilor', null);
    }
}

// Fire alerts for different statuses
function fireAlarm(icon, title, text, isLoading) {
    if (isLoading === null) {
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 1500,
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

// Navigate to client page
function seeClientPage(encodedIdContDto) {
    navigateTo(`/admin/client/${encodedIdContDto}/data`);
}

onBeforeMount(() => {
    getClientsData();
});
</script>
