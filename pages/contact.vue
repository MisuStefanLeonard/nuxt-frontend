<template>
    <div class="background-wrapper">
      <div class="background"></div>
      <div class="content" fluid>
        <div class="text-center mb-4">
          <p class="font-weight-light h4 my-2">{{ $t('contactPage.title') }}</p>
        </div>
        <v-container fluid class="text-center">
          <v-form ref="validateContactForm" class="bg-grey-lighten-4 elevation-24 p-2"
          @submit.prevent="sendForm()" validate-on="input">
          <div   v-for="(data,index) in contactForm" :key="index">
            <v-text-field variant="outlined" v-if="data.htmlType === 'text-field'"
            class="p-2 m-2"
            :label="data.label"
            :placeholder="data.placeholder"
            :type="data.type"
            :rules="data.rules"
          
            v-model="formData[data.model]">
            </v-text-field>

            <v-select :items="selectReason" v-if="data.htmlType === 'select'"
            class="p-2 m-2" variant="outlined"
            v-model="reasonSelected" :label="data.label"
            :placeholder="data.placeholder"
            :rules="data.rules"
            :type="data.type">

            </v-select>

            <v-textarea v-model="formData[data.model]" v-if="data.htmlType === 'description-text-field'"
            class="p-2 m-2"
            variant="outlined"
            :label="data.label"
            :placeholder="data.placeholder"
            :rules="data.rules">

            </v-textarea>

            
          </div>
            <v-btn type="submit" variant="flat"
              color="primary">
                {{ $t('button.sendForm') }} <v-icon  :icon="mdiArrowRight" size="24"></v-icon>
              </v-btn>
          </v-form>
          <p class="font-weight-bold h6 text-subtitle-2 my-3">{{ $t('contactPage.assureReason') }}</p>
        </v-container>
      </div>  
        
    </div>
</template>


<script setup>
import userService from '~/services/User';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { mdiArrowRight } from '@mdi/js';

definePageMeta({
  layout: 'default',
})

useHead({
  title : `Contact - Texx`,
  keywords : ['Contact Us', 'Get in Touch', 'Customer Support', 'Reach Us', 'Send a Message', 'Feedback Form', 'Email Support', 'Phone Number', 'Address', 'Contact Form', 
  'Chat with Us', 'Frequently Asked Questions', 'Submit a Request', 'Online Assistance', 'Business Hours', 
  'Contact Page Support', 'Talk to Our Team', '24/7 Customer Service', 'Write to Us', 'Online Contact', 
  'Customer Helpline', 'Contact for Queries', 'Request Callback', 'Instant Help', 'How to Reach Us', 
  'Help Center', 'Contact Details', 'Speak to a Representative', 'Send Feedback', 'Support Email Address', 
  'Reach Out Online', 'Contact via Chat', 'Customer Queries Form','Contactați-ne', 'Ia legătura cu noi', 'Suport clienți', 'Trimite un mesaj', 'Formular de contact', 'Asistență clienți', 'Număr de telefon', 
  'Adresă', 'Formular de feedback', 'Chat cu noi', 'Întrebări frecvente', 
  'Program de lucru', 'Suport online', 'Trimitere cerere', 'Asistență rapidă', 'Pagina de contact', 'Scrie-ne un mesaj', 'Echipa noastră de suport', 'Serviciu clienți 24/7', 'Cere ajutor', 'Suport tehnic',
   'Cum să ne contactați', 'Apel de asistență', 'Solicită un răspuns', 'Asistență imediată', 'Cum ne puteți găsi', 'Centru de ajutor', 'Detalii de contact', 'Vorbește cu un consultant', 'Trimite un feedback', 
   'Suport prin e-mail', 'Accesează asistența', 'Cerere de suport clienți']
})


const {t}= useI18n();
const lettersRegex = /^[a-zA-Z]+$/;
const numbersRegex = /^[0-9]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const reasonSelected = ref('')
const validateContactForm = ref(null)
const swal = useNuxtApp().$swal;
const reCaptcha = useReCaptcha();

const rules = {
  // Rule to check if input contains only letters (both uppercase and lowercase)
  required: v => !!v || `${t('textFieldsMessages.requiredRule')}`,
  onlyLetters: value => (!!value && lettersRegex.test(value)) || t('textFieldsMessages.onlyLetters'),
  email: value => (!!value && emailRegex.test(String(value))) || t('textFieldsMessages.email'),
  onlyNumbers: value => (!value || numbersRegex.test(value)) || t('textFieldsMessages.onlyNumbers')
};

const selectReason = ref([
  `${t('contactPage.reasonToContact.orderProblem')}`,
  `${t('contactPage.reasonToContact.returnProduct')}`,
  `${t('contactPage.reasonToContact.generalProblem')}`,
  `${t('contactPage.reasonToContact.suggestions')}`,
  `${t('contactPage.reasonToContact.damagedProducts')}`,
])

const formData = ref({
  nrTelefon : '',
  email : '',
  orderNumber: '',
  description: ''
})

// Form structure
const contactForm = [
  {
    htmlType : 'text-field',
    label: `${t("profile.personalDataGeneral.number")}`,
    placeholder: 'ex 07xx xxx xxx',
    type: 'text',
    model: 'nrTelefon',
    rules: [rules.required,rules.onlyNumbers]
  },
  {
    htmlType : 'text-field',
    label: `* ${t("profile.personalDataGeneral.email")}`,
    placeholder: '',
    type: 'text',
    model: 'email',
    maxLen: 50,
    rules: [rules.required,rules.email]
  },
  {
    htmlType : 'text-field',
    label: t("contactPage.orderNumber"),
    placeholder: '',
    type: 'text',
    model: 'orderNumber',
    rules:[rules.onlyNumbers]
  },
  {
    htmlType : 'select',
    label : `* ${t("contactPage.reason")}`,
    type : 'text',
    placeholder: '',
    rules:[rules.required]
  },
  {
    htmlType : 'description-text-field',
    label : `* ${t("contactPage.problemDescription")}`,
    type : 'text',
    placeholder: '',
    model : 'description',
    rules:[rules.required]
  },
];

const sendForm = (async () => {
  const isFormValid = await validateContactForm.value.validate()
  if(isFormValid.valid){
    const recaptchaToken = await recaptcha()
    if(!recaptchaToken){
      console.log('aici')
      return;
    }
    const details = {
       nrTelefon : formData.value.nrTelefon,
       email : formData.value.email,
       numarComanda : formData.value.orderNumber,
       motivContact : reasonSelected.value,
       descriere : formData.value.description,
       captchaToken : recaptchaToken
    }
    const form = new FormData()
    form.append('contactDetails',JSON.stringify(details));
    const response = await userService.sendContactEmail(form)
    if(response === 1){
      fireAlarm('success' , `${t('sweetAlert2.Success')}` , `${t('sweetAlert2.SendSuccesfully')}` , 2000)
      return
    }else if(response === -4){
      fireAlarm('error' , `${t('sweetAlert2.Error')}` , `${t('sweetAlert2.ErrorOccured')}` , 2000)
      return
    }else {
      fireAlarm('error' , `${t('sweetAlert2.Error')}` , `${t('sweetAlert2.ServerError')}` , 2000)
      return
    }
  }else{
    fireAlarm('error' , `${t('sweetAlert2.Error')}` , `${t('sweetAlert2.CheckForm')}` , 2000)
    return
  }
})

const recaptcha = async () => {
  try {
    await reCaptcha.recaptchaLoaded(); // Wait for reCAPTCHA to fully load
    const token = await reCaptcha.executeRecaptcha('contact') // Execute reCAPTCHA with action "contact"
    console.log(token)
    return token; // Return the generated token
  } catch (error) {
    console.error("reCAPTCHA failed to execute:", error);
    return null;
  }
};

function fireAlarm(icon, title, text,timer) {
  swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: timer
  });
}


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