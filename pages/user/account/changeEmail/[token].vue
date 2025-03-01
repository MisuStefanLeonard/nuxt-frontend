<template>
  <div class="text-center">
    <v-container class="d-xs-block">
      <v-alert v-if="changedDataSuccess" type="success" v-model="changedDataSuccess" closable>
        {{ $t('messages.changedDataSuccessText') }}
      </v-alert>
      <v-alert v-if="expiredLink" type="warning" v-model="expiredLink" closable>
        {{ $t('messages.textExpiredLink') }}
      </v-alert>
      <v-alert v-if="confirmationError" type="error" v-model="confirmationError" closable>
        {{ $t('messages.textConfirmationErrorAlert') }}
      </v-alert>
      <v-container class="text-h5 d-block justify-center">
        <v-card class="bg-blue-grey-lighten-4">
          <v-card-title class="text-h6 text-md-h5 text-lg-h4">texx.ro</v-card-title>
          <v-card-text class="font-weight-light">
            <template v-if="changedDataSuccess">
              {{  $t('messages.changedDataSuccess') }}
            </template>
            <template v-if="expiredLink">
              {{  $t('messages.textExpiredLink') }}
            </template>
          </v-card-text>
        </v-card>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import UserService from '~/services/User'

definePageMeta({
    title : 'Schimbare email',
    layout: 'default',
    keywords:'email changing , schimbare email , admin',
    siteName : 'Texx - Schimbare mail',
  })


  useHead({
    title : 'Schimbare mail'
  })
// Reactive state
const changedDataSuccess = ref(false)
const expiredLink = ref(false)
const confirmationError = ref(false)
const confirmationSucces = ref(false)

// Router and Route instances
const route = useRoute()

// Method to confirm account data changes
const confirmAccount = async (token, updatedDto) => {
  const response = await UserService.confirmPersonalDataChanging(token,updatedDto)
  
  if (response === 1) {
    changedDataSuccess.value = true
    confirmationSucces.value = true
    setTimeout(() => {
      navigateTo(useLocalePath("/user/logout"))
    },3000)
  } else if (response === -4) {
    expiredLink.value = true
  } else if (response === -2) {
    confirmationError.value = true
  }
}

// Lifecycle hook
onMounted(() => {
  const token = route.params.token
  const updatedDto = {
    nume: route.query.nume,
    prenume: route.query.prenume,
    gen: route.query.gen,
    nrTelefon: route.query.nrTelefon,
    email: route.query.email,
    username: route.query.username
  }
  
  confirmAccount(token, updatedDto)
})
</script>

<style scoped>
/* Your styles here */
</style>
