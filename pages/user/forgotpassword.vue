<template>
  <div class="background-wrapper">
    <div class="background"></div>
    <div v-if="$route.matched.length > 1">
      <NuxtPage/>
    </div>
    
    <div v-else>
      <v-row align="center" no-gutters>
      <v-col class="align-center justify-center">
        <v-container class="text-center justify-center">
          <p class="text-h3 mt-2 font-weight-thin">{{ $t('forgotPassword.title') }}</p>
        </v-container>
        <v-container class="content">
          <v-alert type="info" v-model="infoAlert" closable>
             {{ $t('forgotPassword.infoText') }}
          </v-alert>
          <v-spacer></v-spacer>
          <v-alert v-if="isSendingAlert" type="warning" v-model="isSendingAlert" closable>
            {{ $t('forgotPassword.isSendingAlertText') }}
          </v-alert>
          <v-alert v-if="emailSendingAlert" color="grey" v-model="emailSendingAlert" closable>
            {{ $t('forgotPassword.emailSendingText') }}
          </v-alert>
          <v-container class="d-flex justify-center h-100">
            <v-form ref="forgotPasswordForm" @submit.prevent="forgotPasswordPostRequest()"
                    class="text-center w-100 p-4 m-2 bg-blue-grey-lighten-5">
              <v-text-field
                v-model="email"
                label="E-mail address"
                placeholder="youremail@gmail.com"
                type="email"
                :rules="[rules.required, rules.emailRule]"
                clearable
              ></v-text-field>
              <v-btn rounded="xl"  
                     type="submit" variant="outlined" 
                     class="mt-6 font-weight-bold bg-grey-lighten-3"
                     color="blue"
                     :disabled="isSendingAlert">
                Trimite
                <v-icon class="pl-1" :icon="mdiArrowRight" size="24"></v-icon>
              </v-btn>
            </v-form>
          </v-container>
        </v-container>
      </v-col>    
    </v-row>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RegisterService from '../../services/Register'
import { mdiArrowRight } from '@mdi/js'


definePageMeta({
  title : 'Resetare parola',
  layout: 'default',
  keywords:'forgot password , uitare parola , am uitat parola',
  siteName : 'Texx - Resetare',
  canonicalUrl : 'http://localhost:3000/user/forgotpassword',
  ogType : 'website',
  ogDescription : 'Resetare parola pe Texx',
  description : 'Resetare parola pe Texx'
})

useHead({
  title : 'Resetare parola'
})

// State variables
const email = ref('')
const infoAlert = ref(true)
const isSendingAlert = ref(false)
const emailSendingAlert = ref(false)
const forgotPasswordForm = ref(null);
const $swal = useNuxtApp().$swal;
const {t} = useI18n()

// Validation rules
const rules = {
  required: value => !!value || t('textFieldsMessages.requiredRule'),
  emailRule: value => { 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(value) || t('textFieldsMessages.email')
  },
}

// Methods
const showRequestForgotPassword = () => {
  $swal.fire({
      icon: 'success',
      title: t('sweetAlert2.Success'),
      text: t('forgotPassword.ifEmailExists'),
      timer: 5000
    })
    return;
}

const showWrongInput = () => {
  $swal.fire({
      icon: 'error',
      title: t('sweetAlert2.Error'),
      text: t('forgotPassword.wrongEmailAddress'),
      timer: 5000
    })
    return;
}

const showError = () => {
  $swal.fire({
      icon: 'error',
      title: t('sweetAlert2.Error'),
      text: t('forgotPassword.error'),
      timer: 5000
    })
    return;
}

const disableButton = () => {
  const disableTime = new Date().getTime() + 60000
  localStorage.setItem("disableTime", disableTime)
  isSendingAlert.value = true
  setTimeout(() => {
    isSendingAlert.value = false
  }, 60000)
}

const checkButtonDisableStatus = () => {
  const disableTime = localStorage.getItem('disableTime')
  if (disableTime && Date.now() < disableTime) {
    isSendingAlert.value = true
    const remainingTime = disableTime - Date.now()
    setTimeout(() => {
      isSendingAlert.value = false
    }, remainingTime)
  }
}

const forgotPasswordPostRequest = async () => {
 
  emailSendingAlert.value = true
  
  const {valid} = await forgotPasswordForm?.value.validate();
  console.log(valid)
  if (forgotPasswordForm.value) {
    if(valid){
    const response = await RegisterService.sendEmailForForgotPassword(email.value)
    console.log(response)
    if (response === 1) {
      showRequestForgotPassword()
      disableButton()
      emailSendingAlert.value = false
    } else if (response === -4) {
      showError()
      showWrongInput()
      emailSendingAlert.value = false
    }
  }else{
    $swal.fire({
      icon: 'error',
      title: t('sweetAlert2.Error'),
      text: t('sweetAlert2.CheckForm'),
      timer: 2000
    })
    emailSendingAlert.value = false
    return;
  }
  } else {
    showWrongInput()
    emailSendingAlert.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  checkButtonDisableStatus()
})
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
