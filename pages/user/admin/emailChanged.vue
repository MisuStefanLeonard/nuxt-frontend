<template>
    <div class="text-center">
      <v-container class="d-xs-block">
        <v-alert v-if="expiredLink" type="warning" v-model="expiredLink" closable>
          {{ $t('messages.textExpiredLinkTextAdmin') }}
        </v-alert>
        <v-alert v-if="confirmationError" type="error" v-model="confirmationError" closable>
          {{ $t('messages.textConfirmationErrorAlert') }}
        </v-alert>
        <v-alert v-if="changedDataSuccess" type="warning" v-model="changedDataSuccess" closable>
          {{ $t('messages.changeDataSuccessAdmin') }}
        </v-alert>
        <v-container class="text-h5 d-block justify-center">
          <v-card class="bg-blue-grey-lighten-4">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4">texx.ro</v-card-title>
            <v-card-text class="font-weight-light">
              <template v-if="changedDataSuccess">
               {{ $t('messages.changeDataSuccessAdmin') }}
              </template>
              <template v-if="expiredLink">
                {{  $t('messages.textExpiredLinkTextAdmin')  }}
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
    layout: 'default'
  })
  
  // Reactive state
  const changedDataSuccess = ref(false)
  const expiredLink = ref(false)
  const confirmationError = ref(false)
  const route = useRoute()
  
  // Method to confirm account data changes
  const confirmEmailChanging = async (changeRequest) => {
    const response = await UserService.updateDataFromAdmin(changeRequest)
    if (response === 1) {
      changedDataSuccess.value = true
      setTimeout(() => {
        navigateTo(useLocalePath("/user/logout"))
      },5000)
    } else if (response === -4) {
      confirmationError.value = true
    } else if (response === -2) {
      expiredLink.value = true
    }else{
      confirmationError.value = true
    }
  }
  
  // Lifecycle hook
  onMounted(async () => {
    const changeRequest = route.query.changeRequestId;
    await confirmEmailChanging(changeRequest)
  })
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  