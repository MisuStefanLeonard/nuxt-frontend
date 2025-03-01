<template>
  <div class="text-center">
    <v-container class="d-xs-block">
      <!-- Ensure that nothing is rendered until the component is mounted -->
      <div v-if="!isLoading || safariFix">
        <v-alert v-if="confirmationSucces" type="success" v-model="confirmationSucces" closable>
          {{ $t('messages.textConfirmationSucces') }}
        </v-alert>
        <v-alert v-if="expiredLink" type="warning" v-model="expiredLink" closable>
          {{ $t('messages.textExpiredLinkInConfirmation') }}
        </v-alert>
        <v-alert v-if="confirmationError" type="error" v-model="confirmationError" closable>
          {{ $t('messages.textConfirmationErrorAlert') }}
        </v-alert>
        <v-container class="text-h5 d-block justify-center">
          <v-card class="bg-blue-grey-lighten-4">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4">texx.ro</v-card-title>
            <v-card-text class="font-weight-light">
              <template v-if="confirmationSucces">
                Bun venit pe texx.ro!
              </template>
              <template v-if="expiredLink">
                {{ $t('messages.textExpiredLink') }}
              </template>
              <template v-if="newConfirmationSucces">
                {{ $t('messages.textNewConfirmationLinkSucces') }}
              </template>
              <template v-if="newConfirmationError">
                {{ $t('messages.textErrorNewConfirmationLink') }}
              </template>
              <template v-if="confirmationError">
                {{ $t('messages.textConfirmationError') }}
              </template>
            </v-card-text>
          </v-card>
        </v-container>
        <v-container>
          <v-btn v-if="confirmationSucces" rounded="xl" type="submit" color="blue"
            variant="outlined" class="font-weight-bold bg-grey-lighten-4" @click="navigateTo(localePath('/user/login'))">
            {{ $t('messages.goToLogIn') }}
          </v-btn>
          <v-btn v-if="expiredLink" rounded="xl" type="submit" color="success"
            variant="outlined" class="font-weight-bold bg-grey-lighten-4" @click="reSendActivationLink">
            {{ $t('messages.resend') }}
          </v-btn>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegisterService from '~/services/Register'


definePageMeta({
    title : 'Confirmare cont',
    layout: 'default',
    keywords:'account confirmation , confirmare cont',
    siteName : 'Texx - Confirmare cont',
  })

  useHead({
    title : 'Confirmare cont'
  })

// Reactive state variables
const isLoading = ref(true)
const confirmationSucces = ref(false)
const confirmationError = ref(false)
const expiredLink = ref(false)
const newConfirmationSucces = ref(false)
const newConfirmationError = ref(false)
const safariFix = ref(false)

// Route and Router instances
const route = useRoute()
const localePath = useLocalePath()

// Method to confirm account
const confirmAccount = async (token) => {
    const response = await RegisterService.getConfirmationLink(token)
    if (response === 1) {
      confirmationSucces.value = true
    } else if (response === -4) {
      expiredLink.value = true
    } else if (response === -2) {
      confirmationError.value = true
    }
  isLoading.value = false
}

// Method to redirect to login


// Method to resend activation link
const reSendActivationLink = async () => {
  const token = route.params.token
  const response = await RegisterService.requestNewConfirmationLink(token)
  if (response === 1) {
    newConfirmationSucces.value = true
  } else if (response === -4) {
    newConfirmationError.value = true
  } else {
    newConfirmationError.value = true
  }
}

// Lifecycle hook to confirm account on component creation
onMounted(async () => {
  const token = route.params.token
  await confirmAccount(token)

  if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    nextTick(() => {
      safariFix.value = true;
    });
  }
})
</script>

<style scoped>
/* Your styles here */
</style>
