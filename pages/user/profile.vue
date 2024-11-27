<template>
    <div>
        <div v-if="$route.fullPath !== '/user/profile' && $route.fullPath !== '/en/user/profile'">
            <NuxtPage/>
        </div>
      <div v-else>

      <v-container class="pb-2 text-center shadow-lg mt-2">
        <p class="h2 font-weight-light"><v-icon class="mr-2" size="24">mdi-cog-outline</v-icon>{{$t('profile.generalInfo.accountSettings')}}</p>
      </v-container>
      <v-container class="mt-4 text-center d-block">
        <v-card 
          v-for="card_item in cardData" 
          :key="card_item.card_title" 
          class="w-100 bg-grey-darken-4 my-2"
        >
          <nuxt-link :to="localePath(card_item.card_path)" class="d-flex flex-column justify-center align-center" style="text-decoration: none;">
            <v-card-title>
              <v-row align="center" justify="center">
                <v-col cols="auto">
                  <v-icon>{{ card_item.card_icon }}</v-icon>
                </v-col>
                <v-col cols="auto">
                  <span class="font-weight-thin">{{ card_item.card_title }}</span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pt-2 black">{{ card_item.card_text }}</v-card-text>
          </nuxt-link>
        </v-card>
      </v-container>
    </div>
    </div>
  </template>
  

<script setup>
import { ref } from 'vue'

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})

const {t} = useI18n();
const localePath = useLocalePath()

// Reactive state
const cardData = ref([
    { 
        card_title: t('profile.generalInfo.accountData'), 
        card_icon: 'mdi-account-box-outline', 
        card_path: '/user/profile/data',
        card_text: t('profile.generalInfo.info')
    },
    { 
        card_title: t('profile.generalInfo.addresses'), 
        card_icon: 'mdi-map-marker-outline', 
        card_path: '/user/profile/addresses', 
        card_text: t('profile.generalInfo.infoAddresses')
    },
    { 
        card_title: t('profile.generalInfo.orders'), 
        card_icon: 'mdi-truck-fast', 
        card_path: '/user/profile/orders',
        card_text: t('profile.generalInfo.infoOrders')
    }
])


</script>
