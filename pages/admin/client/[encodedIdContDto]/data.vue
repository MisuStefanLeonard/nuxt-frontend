<template>
    <v-app>
        <AdminNavDrawerOnClient
            v-if="accountData.emailDto && encodedIdAccountDto && accountData"
            :email-dto="accountData.emailDto"
            :encoded-id-account-dto="encodedIdAccountDto"
            :account-data="accountData"
        ></AdminNavDrawerOnClient>
      <v-main class="bg-grey-darken-3" >
        <v-container fluid>
            <v-container class="p-2" fluid>
                <p class="h3 font-weight-light">Date personale</p>
            </v-container>
            <v-divider></v-divider>
            <v-container fluid class="w-75 p-2">
                <v-alert variant="tonal" type="info" >
                    Aici puteti gasii datele personale/contului ale clientului: 
                    <ul>
                        <li>Numele</li>
                        <li>Prenumele</li>
                        <li>Email</li>
                        <li>Data crearii</li>
                        <li>Rolul</li>
                        <li>Username-ul</li>
                        <li>Starea contului</li>
                    </ul>
                </v-alert>
            </v-container>
            <v-container fluid class="text-center w-75">
                <v-form ref="personalDataForm" validate-on="submit" class="bg-white">
                    <p class="h3 p-2 m-2 font-weight-light text-center">Datele clientului</p>
                    <div v-for="item in accountFormData" class="text-center"
                    :key="item.model">
                        <v-text-field v-if="item.type === 'text-field'" class="p-2 m-2"
                        :label="item.label"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        v-model:model-value="accountData[item.model]"
                        variant="outlined"
                        ></v-text-field>
                        <v-switch v-else-if="item.type === 'switch'" class="p-2 m-2"
                        :label="`Stare cont: ${accountData.contActivDto}`"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        v-model="accountData.contActivDto"
                        color="success"
                        false-value="Neactivat"
                        true-value="Activat"
                        >
                        </v-switch>
                        <v-date-input v-else-if="item.type === 'date-input'" class="p-2 m-2"
                        :label="item.label"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        v-model:model-value="accountData[item.model]"
                        variant="outlined"
                        ></v-date-input>
                    </div>
                    <v-btn
                        variant="flat"
                        color="success"
                        class="p-2 m-2"
                        append-icon="mdi-content-save"
                        @click="changeUserData"
                    >
                        Salveaza
                    </v-btn>
                </v-form>
            </v-container>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { VDateInput } from 'vuetify/labs/components';
  import { useUserStore } from '~/store/user';
  import AdminNavDrawerOnClient from '~/components/admin/AdminNavDrawerOnClient.vue';
  import adminService from '~/services/Admin';
  import registerService from '~/services/Register'
  
  definePageMeta({
    layout: 'admin',
    middleware: 'admin'
  });  
  // State to hold account data
  const route = useRoute();
  const store = useUserStore();
  const encodedIdAccountDto = route.params.encodedIdContDto;
  const personalDataForm = ref(null);
  const oldData = ref({});
  const accountData = ref({
    adreseClient: [],
    comenziCleint: [],
    seturi: [],
    contActivDto: null,
    dataCreareDto: null,
    emailDto: '',
    idContDto: null,
    numeDto: '',
    prenumeDto: '',
    rolDto: '',
    usernameDto: ''
  });

  const accountFormData = ref([
    {
        type: 'text-field',
        label: 'Nume',
        model: 'numeDto',
        placeholder: '',
        rules: [],
    },
    {
        type: 'text-field',
        label: 'Prenume',
        model: 'prenumeDto',
        placeholder: '',
        rules: [],
    },
    {
        type: 'date-input',
        label: 'Data creeare',
        disabled: true,
        model: 'dataCreareDto',
        placeholder: '',
    },
    {
        type: 'switch',
        label: 'Cont activ',
        placeholder: '',
        model: 'contActivDto',
        maxLength: '',
        rules: [],
    },
    {
        type: 'text-field',
        label: 'Username',
        model: 'usernameDto',
        placeholder: '',
        rules: [
            async(value) => {
                let response = await registerService.getUsernameInDbAsync(value)
                if(response === 1){
                    swal.close()
                    fireAlarm('warning' , 'Atentie' , 'Username-ul deja exista!')
                    return false
                }else{
                    return true;
                }
            }
        ],
    },
    {
        type: 'text-field',
        label: 'Email',
        model: 'emailDto',
        placeholder: '',
        rules: [
            async(value) => {
                let response = await registerService.getEmailInDbAsync(value)
                if(response === 1){
                    swal.close()
                    fireAlarm('warning' , 'Atentie' , 'Email-ul deja exista!')
                    return false
                }else{
                    return true;
                }
            }
        ],
    },
]);

  
  
  const swal = useNuxtApp().$swal;
  
  function fireAlarm(icon, title, text, isLoading) {
    if (isLoading === null) {
      swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: true,
        timer: 4000,
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

  const changeUserData = async () => {
    fireAlarm('info', 'Asteptati...', '', true);
    const isValid = await personalDataForm.value.validate();
    if(isValid.valid){
        if(JSON.stringify(accountData.value) === JSON.stringify(oldData.value)){
            swal.close()
            fireAlarm('info', 'Atentie', 'Nu ati modificat nimic', null);
            return;
        }else{
            const form = new FormData();
            form.append('updatedClientDataDto' , JSON.stringify(accountData.value));
            const changeDataResponse = await adminService.modifyClientData(form );

            if(changeDataResponse === 1){
                swal.close()
                fireAlarm('success', 'Succes', 'Datele au fost schimbate cu success!', null);
               
            }else if(changeDataResponse === 2){
                swal.close()
                fireAlarm('warning', 'Atentie', 'Mail-ul a fost schimbat.O confirmare a fost trimisa pe noul mail', null);
                
            }else if(changeDataResponse === -3){
                swal.close()
                fireAlarm('error', 'Eroare', 'Mail-ul este invalid', null);
               
            }else {
                swal.close()
                fireAlarm('error', 'Eroare', 'O eroare a avut loc', null);
               
            }
            oldData = JSON.parse(JSON.stringify(accountData.value))
            store.setAccountData(accountData.value);
            store.setOriginalAccountData(accountData.value)
        }
    }else{
        swal.close()
        fireAlarm('error', 'Eroare', 'Verificati formularul', null);
        return;
    }
   
  }
  
  const getEncodedOrderId=ref(route.query.order)

  const getClientData = async () => {
    fireAlarm('info', 'Asteptati...', '', true);
    const accountDataResponse = await adminService.getClientData(encodedIdAccountDto);
    if (Object.keys(accountDataResponse).length > 0) {
      accountData.value = accountDataResponse;
      oldData.value = JSON.parse(JSON.stringify(accountData.value));
      store.setAccountData(accountData.value)
      store.setOriginalAccountData(accountData.value)
      if(route.query.order !== undefined) {
        await navigateTo(`/admin/client/${route.params.encodedIdContDto}/order/${getEncodedOrderId.value}`)
      }
      swal.close();
    } else {
      swal.close();
      fireAlarm('error', 'Eroare', 'O eroare a avut loc', null);
    }
  };
  
  onMounted(async () => {
    await getClientData();

  });



  
  </script>
  
