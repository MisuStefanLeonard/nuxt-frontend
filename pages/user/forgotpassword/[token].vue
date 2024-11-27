<template>
    <div class="background-wrapper">
      <div class="background"></div>
      <v-row align="center" no-gutters>
        <v-col class="align-center justify-center">
          <v-container class="text-center">
            <p class="text-h3 mt-2 font-weight-thin">Parola noua</p>
          </v-container>
          <v-container class="content">
            <v-alert v-if="validToken" type="info" v-model="infoAlert" closable>
              {{ $t('messages.infoText') }}
            </v-alert>
            <v-alert v-if="forgotPasswordAlert && validToken" type="success" v-model="forgotPasswordAlert" closable>
              {{ $t('messages.forgotPasswordText') }}
            </v-alert>
            <v-alert v-if="wrongInputAlert && validToken" type="error" v-model="wrongInputAlert" closable>
              {{ $t('messages.wrongInputText') }}
            </v-alert>
            <v-alert v-if="errorAlert && validToken" type="error" v-model="errorAlert" closable>
              {{ $t('messages.errorAlertText') }}
            </v-alert>
            <v-alert v-if="isSendingAlert && validToken" type="warning" v-model="isSendingAlert" closable>
              {{ $t('messages.isSendingAlertText') }}
            </v-alert>
            <v-alert v-if="waitAlert && validToken" color="grey" v-model="waitAlert" closable>
              {{ $t('messages.waitAlertText') }}
            </v-alert>
            <v-alert v-if="!validToken" type="warning" v-model="validToken" closable>
              {{ $t('messages.validTokenText') }}
            </v-alert>
            <v-container v-if="!validToken" class="text-h5 d-block justify-center">
              <v-card class="bg-blue-grey-lighten-2 text-center" variant="tonal">
                <v-card-title>texx.ro</v-card-title>
                <v-card-text class="font-weight-bold">{{ $t('messages.expiredCardText') }}</v-card-text>
              </v-card>
            </v-container>
            <v-container v-if="validToken" class="d-flex justify-center h-100">
              <v-form ref="newPasswordForm" validate-on="submit" @submit.prevent="newPasswordPost()" class="text-center w-100 p-4 m-2 bg-blue-grey-lighten-5">
                <v-text-field
                  v-model="password"
                  label="Noua parola"
                  placeholder="Password"
                  type="password"
                  :rules="[rules.required, rules.passwordRule, passwordExistsRule]"
                  clearable
                  @input="checkPasswordSameAsOldOne(password)"
                ></v-text-field>
                <v-text-field
                  v-model="r_password"
                  label="Repetati noua parola"
                  placeholder="Password"
                  type="password"
                  :rules="[rules.required, rules.repeatPasswordRule]"
                  clearable
                ></v-text-field>
                <v-btn rounded="xl" type="submit" variant="outlined" class="mt-4 font-weight-bold bg-grey-lighten-3" :disabled="isSendingAlert.value">
                  Schimba parola
                  <v-icon class="pl-1">mdi-arrow-right</v-icon>
                </v-btn>
              </v-form>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import RegisterService from '~/services/Register';
  
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  const waitAlert = ref(false);
  const forgotPasswordAlert = ref(false);
  const infoAlert = ref(true);
  const wrongInputAlert = ref(false);
  const errorAlert = ref(false);
  const isSendingAlert = ref(false);
  const samePassword = ref(false);
  const validToken = ref(true);
  const token = ref('');
  const password = ref('');
  const r_password = ref('');
  const newPasswordForm = ref(null);
  
  const { t } = useI18n()
  const route = useRoute();
  
  const rules = {
    required: value => !!value || `${t('textFieldsMessages.requiredRule')}`,
    passwordRule: value => passwordRegex.test(value) || `${t('textFieldsMessages.passwordRule')}`,
    repeatPasswordRule: value => value === password.value || `${t('textFieldsMessages.repeatPasswordRule')}`
  };
  
  const passwordExistsRule = computed(() => {
    return !samePassword.value ||  `${t('textFieldsMessages.sameAsOldPasswordRule')}`
  });
  
  const showRequestForgotPassword = () => {
    forgotPasswordAlert.value = true;
    setTimeout(() => {
      forgotPasswordAlert.value = false;
      navigateTo(useLocalePath('/user/login'));
    }, 5000);
  };
  
  const showWrongInput = () => {
    wrongInputAlert.value = true;
    setTimeout(() => {
      wrongInputAlert.value = false;
    }, 5000);
  };
  
  const showError = () => {
    errorAlert.value = true;
    setTimeout(() => {
      errorAlert.value = false;
    }, 3000);
  };
  
  const disableButton = () => {
    isSendingAlert.value = true;
    setTimeout(() => {
      isSendingAlert.value = false;
    }, 60000);
  };
  
  const checkPasswordSameAsOldOne = async (password) => {
    samePassword.value = false;
 
    const isValid = passwordRegex.test(password)
    if (isValid) {
      const response = await RegisterService.checkPasswordInDb(password, token.value);
      switch (response) {
        case 1:
          samePassword.value = false;
          break;
        case -4:
          samePassword.value = true;
          break;
        default:
          showError();
          samePassword.value = false;
          break;
      }
    } else {
      samePassword.value = false;
    }
  };
  
  const confirmForgotPasswordToken = async token => {
    const response = await RegisterService.checkTokenValiditiy(token);
    if (response === -1) {
      validToken.value = false;
      return;
    }
  } 
  
  const newPasswordPost = async () => {
  const isValid = await newPasswordForm.value.validate();
  if (newPasswordForm.value && isValid.valid) {
    const valid = newPasswordForm.value.validate();
    if (valid) {
      waitAlert.value = true;
      const response = await RegisterService.changePassword(password.value, token.value);
      switch (response) {
        case 1:
          showRequestForgotPassword();
          disableButton();
          waitAlert.value = false;
          return;
        case -2:
          showError();
          waitAlert.value = false;
          return;
        case -4:
          validToken.value = false;
          return;
        case -3:
          showError();
          waitAlert.value = false;
          return;
        default:
          showError();
          waitAlert.value = false;
          return;
      }
    } else {
      showWrongInput();
      waitAlert.value = false;
      return;
    }
  }else{
    
  }
};
  
  onMounted(() => {
    token.value = route.params.token;
    confirmForgotPasswordToken(token.value);
  });
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
    z-index: 1;
  }
  </style>
  