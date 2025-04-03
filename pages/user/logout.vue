<template>
    <div class="background-wrapper">
      <div class="background"></div>
      <v-container class="content">
        <v-row align="center" no-gutters>
          <v-col>
            <p class="text-center h2 pb-3 font-weight-thin">{{ $t("logout.title")  }}</p>
            <v-alert type="success" v-model="succesfullLogoutBanner" closable>
              {{ $t("logout.succesfullLogoutMessage")  }}
            </v-alert>
            <v-card class="bg-blue-grey-lighten-4 text-center">
              <v-card-title class="text-h6 text-md-h5 text-lg-h4">texx.ro</v-card-title>
              <v-card-text class="font-weight-light">{{ $t("logout.logoutMessage")  }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import RegisterService from '~/services/Register'

  definePageMeta({
    title : 'Delogare',
    layout: 'default',
    keywords:'log out , delogare',
    siteName : 'Texx - Delogare',
    // canonicalUrl : 'http://localhost:3000/user/logout',
    ogType : 'website',
    ogDescription : 'Delogare de pe Texx',
    description : 'Delogare de pe Texx'
  })

useHead({
  title : 'Delogare'
})
  
  // Reactive state
  const succesfullLogoutBanner = ref(false)
  const localePath = useLocalePath();
  const emitter = useNuxtApp().$emitter
  
  // Methods
  const showSuccesfullLogout = () => {
    succesfullLogoutBanner.value = true
    const info = localStorage.getItem('info')
    if(info !== null){
      localStorage.removeItem('info')
    }
    setTimeout(() => {
      succesfullLogoutBanner.value = false
      navigateTo(localePath('/user/login'))
    }, 5000)
  }
  
  const logout = async () => {
    emitter.emit('isLoggedIn' , false);
    const response = await RegisterService.logout()
    console.log(response)
    if (response === 1) {
      showSuccesfullLogout()
    }
  }
  
  // Lifecycle hook
  onMounted(async () => {
    await logout()
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
    z-index: 1;
  }
</style>
  