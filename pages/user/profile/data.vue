<template>
  <div class="background-wrapper">
    <div class="background"></div>
    <v-container class="content">
      <v-breadcrumbs >
        <v-breadcrumbs-item :to="localePath('/user/profile')"><p class="font-weight-bold h6">{{$t('profile.PROFIL')}}</p> </v-breadcrumbs-item>
        <v-breadcrumbs-divider><p class="font-weight-bold h6">/</p></v-breadcrumbs-divider>
        <v-breadcrumbs-item disabled><p class="font-weight-bold h6">{{$t('profile.personalDataGeneral.personalData')}}</p></v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-container class="justify-center">
        <v-alert v-if="infoAlert" v-model="infoAlert" type="info" closable>
          {{ $t('profile.personalDataGeneral.personalDataInfo') }}
        </v-alert>
      </v-container>
      <v-container class="d-block text-center w-100">
        <p class="h3 font-weight-light text-center p-3">{{t("profile.personalDataGeneral.accountData")}}  </p>
        <v-form ref="dataSubmitForm" validate-on="submit" @submit.prevent="modifyData()" class="bg-blue-grey-lighten-5">
          <div v-for="(data, index) in dataForm" :key="index">
            <v-text-field
              v-if="data.model !== 'gen'"
              :label="data.label"
              :placeholder="data.placeholder"
              :type="data.type"
              v-model="userDataFromDb[data.model]"
              :counter="data.maxLen"
              :disabled="data.model === 'username'"
              :rules="data.rules"
              class="px-4 pt-2"
            ></v-text-field>

            <v-select
              v-if="data.model === 'gen'"
              :label="data.label"
              v-model="userDataFromDb[data.model]"
              :items="sexOptions"
              class="px-4"
            ></v-select>
          </div>
          <v-btn
            rounded="xl"
            type="submit"
            color="green"
            variant="outlined"
            class="font-weight-bold bg-grey-lighten-3 my-4"
          >
            {{ $t('button.save') }}
            <v-icon class="pl-2">mdi-content-save</v-icon>
          </v-btn>
        </v-form>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import RegisterService from '~/services/Register'
import UserService from '~/services/User'

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})
const swal = useNuxtApp().$swal;
const {t} = useI18n()

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const infoAlert = ref(true)

const sexOptions = [
  t('profile.personalDataGeneral.genderOptions.feminine'),
  t('profile.personalDataGeneral.genderOptions.masculine'),
  t('profile.personalDataGeneral.genderOptions.preferNotToSay')]

const localePath = useLocalePath()

const oldUsersData = ref({
  nume: '',
  prenume: '',
  gen: '',
  nrTelefon: '',
  email: '',
  username: ''
})
const userDataFromDb = ref({
  nume: '',
  prenume: '',
  gen: '',
  nrTelefon: '',
  email: '',
  username: ''
})

const dataSubmitForm = ref(null);
const lettersRegex = /^[a-zA-Z]+$/;
const numbersRegex = /^[0-9]+$/;

const rules = {
  // Rule to check if input contains only letters (both uppercase and lowercase)
  onlyLetters: value => (!!value && lettersRegex.test(value)) || t('textFieldsMessages.onlyLetters'),
  onlyNumbers: value => (!!value && numbersRegex.test(value)) || t('textFieldsMessages.onlyNumbers'),
  maxLength: len => value => (!!value && value.length <= len) || `${ t('textFieldsMessages.maxLength')}${len}`,
  email: value => (!!value && emailRegex.test(String(value))) || t('textFieldsMessages.email'),
};

// Form structure
const dataForm = [
  {
    label: t("profile.personalDataGeneral.name"),
    placeholder: 'Numele de familie',
    type: 'text',
    model: 'nume',
    maxLen: 10,
    rules: [rules.onlyLetters, rules.maxLength(10)]
  },
  {
    label: t("profile.personalDataGeneral.prename"),
    placeholder: '',
    type: 'text',
    model: 'prenume',
    maxLen: 20,
    rules: [rules.onlyLetters, rules.maxLength(20)]
  },
  {
    label: t("profile.personalDataGeneral.gender"),
    placeholder: '',
    type: 'text',
    model: 'gen'
  },
  {
    label: t("profile.personalDataGeneral.number"),
    placeholder: 'ex 07xx xxx xxx',
    type: 'text',
    model: 'nrTelefon',
    maxLen: 10,
    rules: [rules.onlyNumbers, rules.maxLength(10)]
  },
  {
    label: t("profile.personalDataGeneral.email"),
    placeholder: '',
    type: 'text',
    model: 'email',
    maxLen: 50,
    rules: [rules.email, rules.maxLength(50)] // No async rule here
  },
  {
    label: t("profile.personalDataGeneral.username"),
    placeholder: 'Username',
    type: 'text',
    model: 'username'
  }
];

// Function to trigger SweetAlert notifications
function fireAlarm(icon, title, text, isLoading = null) {
    if (isLoading === true) {
        swal.fire({
            icon: 'info',
            title: title,
            text: text,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                swal.showLoading();
            },
        });
    } else{
        swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: true
        });
    }
}

// Load user data
const assignDataFromDb = async () => {
  fireAlarm('info', t('sweetAlert2.Attention'),t('sweetAlert2.WaitPlease'), true);
  const data = await UserService.getPersonalDataFromDb();
  userDataFromDb.value = data;

  if(userDataFromDb.value.gen === true){
    userDataFromDb.value.gen = t('profile.personalDataGeneral.genderOptions.masculine')
  }else if(userDataFromDb.value.gen === false){
    userDataFromDb.value.gen = t('profile.personalDataGeneral.genderOptions.feminine')
  }else {
    userDataFromDb.value.gen = t('profile.personalDataGeneral.genderOptions.preferNotToSay')
  }

  oldUsersData.value = { ...userDataFromDb.value };
  swal.close();
}

// Handle async validation (e.g. email existence check) during form submission
const modifyData = async () => {
  fireAlarm('info', t('sweetAlert2.Attention'),t('sweetAlert2.WaitPlease'), true);
  const isFormValid = await dataSubmitForm.value.validate();

  if (isFormValid.valid) {
    // Additional email uniqueness check
    if (userDataFromDb.value.email !== oldUsersData.value.email) {
      let response =  await RegisterService.getEmailInDbAsync(userDataFromDb.value.email)
      if (response === 1) {
        swal.close();
        fireAlarm('error',t('sweetAlert2.Error'), t('sweetAlert2.EmailAlreadyExists'), null);
        return;
      }
    }

    // Check if form has changed
    if (JSON.stringify(userDataFromDb.value) === JSON.stringify(oldUsersData.value)) {
      swal.close();
      fireAlarm('info', t('sweetAlert2.Attention'), t('sweetAlert2.NothingChanged'), null);
      return;
    }

    const response = await UserService.modifyPersonalDataFromDb(userDataFromDb.value);
    swal.close();
    if (response === 1) {
      fireAlarm('success', t('sweetAlert2.ModifiedSuccesfulyData'), '' , null);
      if(userDataFromDb.value.gen === true){
        userDataFromDb.value.gen = t('profile.personalDataGeneral.genderOptions.masculine')
      }else if(userDataFromDb.value.gen === false){
        userDataFromDb.value.gen = t('profile.personalDataGeneral.genderOptions.feminine')
      }else {
        userDataFromDb.value.gen = t('profile.personalDataGeneral.genderOptions.preferNotToSay')
      }
      oldUsersData.value = {...userDataFromDb.value}
      // de adaugat modificare in dto pe frontend
      return;
    } else if(response === 0) {
      fireAlarm('info',  t('sweetAlert2.Attention'),  t('sweetAlert2.EmailChanged') , null);
      return;
    }
  } else {
    fireAlarm('error',  t('sweetAlert2.Error'),  t('sweetAlert2.CheckForm'), null);
  }
}

// On mounted, load data
onMounted(() => {
  assignDataFromDb();
})
</script>


<style scoped>
.background-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/assets/background.jpeg);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
}

.content {
  position: relative;
  z-index: 1;
  padding: 20px;
  border-radius: 10px;
  max-width: 1000px;
  width: 100%;
}
</style>
