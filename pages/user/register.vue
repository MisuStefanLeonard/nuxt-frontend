<template>
  <div class="background-wrapper">
    <div class="background"></div>
    <v-row align="center" no-gutters class="content">
      <v-col class="d-flex align-center justify-center">
        <v-container class="text-center overBackground">
          <p class="text-h3 mt-2 font-weight-thin">{{ $t('register.title1')}}</p>
        </v-container>
      </v-col>
      <v-col cols="12" md="7" class="border-md">
        <v-container class="text-center">
          <p class="text-h3 mt-2 font-weight-thin">{{ $t('register.title2')}}</p>
        </v-container>
        <v-container class="d-flex align-center justify-center h-screen">
          <v-container class="w-100 d-block">
            <v-alert type="success" v-model="succesfullAlert" closable>
              {{ $t('register.succesfullText')}}
            </v-alert>
            <v-alert type="error" v-model="unsuccesfullAlert" closable>
              {{ $t('register.unsuccesfullText') }}
            </v-alert>
            <v-alert v-if="waitRegister" type="grey" v-model="waitRegister" closable>
              {{  $t('register.waitRegisterText') }}
            </v-alert>
            <v-form ref="form" validate-on="submit" @submit.prevent="registerAccount" class="w-100 p-4 m-2 bg-blue-grey-lighten-5">
              <v-text-field class="p-2"
                v-model="email"
                :label="$t('register.labels.email')"
                placeholder=""
                type="email"
                :rules="[rules.required, rules.emailRule, rules.emailExists]"
                clearable
                variant="outlined"
              ></v-text-field>
              <v-text-field class="p-2"
                v-model="username"
                :label="$t('register.labels.username')"
                placeholder=""
                type="text"
                :rules="[rules.required, rules.usernameRule, rules.usernameExists]"
                clearable
                variant="outlined"
              ></v-text-field>
              <v-text-field class="p-2"
                v-model="password"
                :label="$t('register.labels.password')"
                placeholder="Password"
                :type="passwordVisible ? 'text' : 'password'"
                :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'" 
                @click:append="togglePasswordVisibility"
                :rules="[rules.required, rules.passwordRule]"
                variant="outlined"
                clearable
              ></v-text-field>
              <v-text-field class="p-2"
                v-model="r_password"
                :label="$t('register.labels.repeatPassword')"
                placeholder="Password"
                :type="passwordVisible ? 'text' : 'password'"
                :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'" 
                @click:append="togglePasswordVisibility"
                :rules="[rules.required, rules.repeatPasswordRule]"
                variant="outlined"
                clearable
              ></v-text-field>
              <v-container class="text-center d-sm-flex d-xs-block">
                <v-btn
                  rounded="xl"
                  type="submit"
                  variant="outlined"
                  color="green"
                  class="font-weight-bold bg-grey-lighten-3"
                  :disabled="isRegistering"
                >
                  {{ $t('register.registerText') }}
                  <v-icon class="pl-1"  :icon="mdiAccountPlus" size="24"></v-icon>
                </v-btn>
                <v-spacer class="mt-2"></v-spacer>
                <v-btn
                  rounded="xl"
                  @click="goToLogIn"
                  type="button"
                  variant="outlined"
                  color="blue"
                  class="font-weight-bold bg-grey-lighten-3"
                >
                {{ $t('register.alreadyHaveAccount') }}
                  <v-icon class="pl-1" :icon="mdiLogin" size="24"></v-icon>
                </v-btn>
              </v-container>
              <v-container class="justify-center d-flex">
                <div>
                  <v-checkbox
                    v-model="termsAndConditions"
                    color="primary"
                    :label="$t('register.labels.termsAndConditions')"
                    value="success"
                    :rules="[rules.required]"
                  ></v-checkbox>
                </div>
              </v-container>
            </v-form>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { mdiAccountPlus, mdiLogin } from '@mdi/js';
import { ref } from 'vue'
import RegisterService from '~/services/Register'


definePageMeta({
  layout: 'default'
})

const localePath = useLocalePath();

// Reactive state to track password visibility
const passwordVisible = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
}

const swal = useNuxtApp().$swal;

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

// Regular expressions for validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const usernameRegex = /^[a-zA-Z0-9]{6,}$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const email = ref('')
const username = ref('')
const password = ref('')
const r_password = ref('')
const succesfullAlert = ref(false)
const unsuccesfullAlert = ref(false)
const termsAndConditions = ref(false)
const isRegistering = ref(false)
const waitRegister = ref(false)
const form = ref(null)
const {t} = useI18n();

// Validation rules
const rules = {
  required: value => !!value || t('textFieldsMessages.requiredRule'),
  emailRule: value => emailRegex.test(value) ||  t('textFieldsMessages.email'),
  usernameRule: value => usernameRegex.test(value) || t('textFieldsMessages.usernameRule'),
  passwordRule: value => passwordRegex.test(value) || t('textFieldsMessages.passwordRule'),
  repeatPasswordRule: value => value === password.value ||t('textFieldsMessages.repeatPasswordRule'),
  emailExists : async(value) => {
    let response = await RegisterService.getEmailInDbAsync(value);
    if(response === 1){
      swal.close()
      fireAlarm('warning' , t('sweetAlert2.Attention') , t('sweetAlert2.EmailExists') , null)
      return false;
    }else if(response === -4){
      return true;
    }
  },
  usernameExists : async(value) => {
    let response = await RegisterService.getUsernameInDbAsync(value)

    if(response === 1){
        swal.close()
        fireAlarm('warning' ,  t('sweetAlert2.Attention') , t('sweetAlert2.UsernameExists') , null)
        return false;
    }else if (response === -4){
      return true;
    }
  }
}



const goToLogIn = () => {
  navigateTo(localePath('/user/login'))
}

const showSuccesfulRegistrationBanner = () => {
  succesfullAlert.value = true
  setTimeout(() => {
    succesfullAlert.value = false
  }, 4000)
}

const showUnsuccesfulRegistrationBanner = () => {
  unsuccesfullAlert.value = true
  setTimeout(() => {
    unsuccesfullAlert.value = false
  }, 4000)
}


const registerAccount = async () => {
  // if (emailExists.value || usernameExists.value || !termsAndConditions.value) return
  fireAlarm('info' , t('sweetAlert2.WaitPlease') , t('sweetAlert2.WaitRegister') , true)
  const isValid = await form?.value.validate();
  if (form.value) {
    if(isValid.valid && termsAndConditions.value){
        const registerData = {
          nume: null,
          prenume: null,
          gen: null,
          nr_telefon: null,
          username: username.value,
          email: email.value,
          parola: password.value,
          data_creare: new Date().toISOString(),
          CodActivare: 'temporaryToken',
          verificat: false,
          rol: 'Client',
        }
        let response = await RegisterService.registerAccount(registerData);
        console.log('in .vue' , response)
        email.value = ''
        username.value = ''
        password.value = ''
        r_password.value = ''
        termsAndConditions.value = false

        if (response === 1) {
          swal.close()
          showSuccesfulRegistrationBanner()
          form.value.resetValidation()
        } else {
          showUnsuccesfulRegistrationBanner()
          swal.close()
          return;
        }
    }else{
      swal.close()
      fireAlarm('error' , t('sweetAlert2.Error') , t('sweetAlert2.CheckForm') , null);
    
      return;
    }
    
  }
}
</script>

<style scoped>
.background-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
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
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
}

.overBackground {
  z-index: 3;
  opacity: 1;
}

@media (max-width: 600px) {
  .form-container {
    padding: 0 16px;
  }
}
</style>
