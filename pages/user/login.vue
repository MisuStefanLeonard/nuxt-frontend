<template>
  <div class="background-wrapper">
    <div class="background"></div>
    <v-container class="content">
      <p class="text-center h2 pb-3 font-weight-thin">{{ $t('login.title') }}</p>
      <v-row align="center" no-gutters>
        <v-container class="bg-blue-grey-lighten-5 w-100">
          <v-alert type="error" v-model="wrongCredentialsBanner" closable>
            {{ $t('login.wrongCredentials') }}
          </v-alert>
          <v-alert type="error" v-model="errorBanner" closable>
            {{ $t('login.errorMessage') }}
          </v-alert>
          <v-alert type="info" v-model="waitLogInBanner" closable>
            {{ $t('login.waitLogInMessage') }}
          </v-alert>
          <v-col class="p-2">
            <v-form ref="loginForm" validate-on="submit" @submit.prevent="loginAccount" >
              <v-text-field class="p-1 m-1" 
                v-for="data in dataForm"
                :key="data.model"
                :label="data.label"
                :placeholder="data.placeholder"
                :type="data.model === 'password' ? (passwordVisible ? 'text' : 'password') : data.type" 
                :append-icon="data.model === 'password' ? (passwordVisible ? mdiEyeOff : mdiEye) : ''"
                @click:append="data.model === 'password' ? togglePasswordVisibility() : ''" 
                v-model="formData[data.model]"
                :rules="[rules.required]"
                variant="outlined"
              ></v-text-field>
              <v-container class="text-center">
                <v-btn
                  rounded="xl"
                  type="submit"
                  variant="outlined"
                  color="green"
                  class="font-weight-bold bg-grey-lighten-3"
                >
                  {{ $t('login.logInText') }}
                  <v-icon class="pl-2" :icon="mdiLogin" size="24"></v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  rounded="xl"
                  type="submit"
                  @click="GoogleLogIn"
                  variant="outlined"
                  class="font-weight-bold bg-blue-lighten-1 mt-2"
                >
                  {{ $t("login.logInWithGoogle") }}
                  <v-icon class="pl-2" :icon="mdiGooglePlus" size="24"></v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  rounded="xl"
                  type="button"
                  @click="forgotPassword"
                  variant="outlined"
                  color="red"
                  class="font-weight-bold bg-grey-lighten-3 mt-2"
                >
                  {{ $t('login.forgotPasswordText') }}
                  <v-icon class="pl-2" :icon="mdiLockQuestion" size="24"></v-icon>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  rounded="xl"
                  type="button"
                  variant="outlined"
                  class="font-weight-bold bg-grey-lighten-3 mt-6"
                >
                  <nuxt-link
                    :to="localePath('/user/register')"
                    style="cursor: pointer"
                    class="text-decoration-none"
                  >
                    {{ $t('login.noAccount') }}
                  </nuxt-link>
                </v-btn>
              </v-container>
            </v-form>
          </v-col>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { mdiEye, mdiEyeOff, mdiGooglePlus, mdiLockQuestion, mdiLogin } from '@mdi/js';
import { ref } from 'vue'
import RegisterService from '~/services/Register'
import { useUserStore } from '~/store/user';

definePageMeta({
  title : 'Logare',
  layout: 'default',
  keywords:'log in , logare',
  siteName : 'Texx - Logare',
  canonicalUrl : process.env.NODE_ENV === 'development' ? 'http://localhost:3000/user/login' : 'https://texxshop.ro/user/login',
  ogType : 'website',
  ogDescription : 'Logare pe Texx',
  description : 'Logare pe Texx'
})

useHead({
  title : 'Logare'
})
  

const localePath = useLocalePath()
const {t} = useI18n();

// State
const wrongCredentialsBanner = ref(false)
const errorBanner = ref(false)
const waitLogInBanner = ref(false)
const stayLoggedIn = ref(false)
const isLoggedIn = ref(false)
const loginForm = ref(null)
const $swal = useNuxtApp().$swal;

// Define reactive state for password visibility
const passwordVisible = ref(false);

// Toggle function for password visibility
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
}

const formData = ref({
  username_email: '',
  password: ''
})

const dataForm = [
  {
    label: t('login.labels.accountNameOrEmail'),
    placeholder: 'Georgel123/Georgel@gmail.com',
    type: 'text',
    model: 'username_email'
  },
  {
    label:  t('login.labels.password'),
    placeholder: '',
    type: 'password',
    model: 'password'
  }
]

const rules = {
  required: value => !!value || t('textFieldsMessages.requiredRule')
}

// Methods
const showWrongCredentialsBanner = () => {
  wrongCredentialsBanner.value = true
  setTimeout(() => {
    wrongCredentialsBanner.value = false
  }, 3000)
}

const showError = () => {
  errorBanner.value = true
  setTimeout(() => {
    errorBanner.value = false
  }, 3000)
}

const nuxtApp = useNuxtApp();
const swal = nuxtApp.$swal
const emitter = nuxtApp.$emitter;
const store = useUserStore();

const loginAccount = async () => {
  // Ensure the form exists and the validate method is available
  const isValid = await loginForm.value.validate();
  waitLogInBanner.value = true;
  if (isValid.valid) {
      const response = await RegisterService.login(formData.value.username_email, formData.value.password);
      if (response === 1) {
        isLoggedIn.value = true;
        await emitter.emit('isLoggedIn', isLoggedIn.value);
        store.initializeAuth();
        localStorage.setItem('info' , formData.value.username_email);
        navigateTo(localePath("/home"))
        waitLogInBanner.value = false;
      } else if (response === -4) {
        waitLogInBanner.value = false;
        showWrongCredentialsBanner();
      }else if(response === -2){
        navigateTo(localePath("/home"))
      }else if(response === -3){
        waitLogInBanner.value = false;
        $swal.fire({
          icon: 'error',
          title: t('sweetAlert2.Error'),
          text: t('login.alreadyLoggedIn'),
          timer: 2000
        });
      }
       else if (response === 0) {
        waitLogInBanner.value = false;
        showError();
      }
  } else {
    $swal.fire({
      icon: 'error',
      title: t('sweetAlert2.Error'),
      text: t('sweetAlert2.CheckForm'),
      timer: 2000
    });
    waitLogInBanner.value = false;
  }
};



const forgotPassword = () => {
  navigateTo(localePath('/user/forgotpassword'))
}

const GoogleLogIn = () => {
  RegisterService.googleLogIn()
}
</script>

<style scoped>
.background-wrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(/assets/background.jpeg);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
}

.content {
  position: relative;
  z-index: 1; /* Ensures the content is above the background */
}
</style>
