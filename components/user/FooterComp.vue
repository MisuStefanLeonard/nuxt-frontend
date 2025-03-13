<template>
  <div>
   <v-footer
    class="bg-grey-darken-4 text-center d-flex flex-column"
    
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" xs="12" sm="3">
        <NuxtImg
        src="/LogoTexx.png"
        width="150"
        height="150">

        </NuxtImg>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <p class="h4">{{ $t('footer.title') }}</p>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/terms_and_conditions')">{{ $t('footer.titleSubText.termsAndConditions') }}</NuxtLink>
        <br>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/home#aboutUs')">{{ $t('menu.about') }}</NuxtLink>
        <br>
        <p class="h6 font-weight-light">{{ $t('footer.titleSubText.personalData') }}</p>
        <p class="h6 font-weight-normal cursor-pointer text-white" @click="openCookieSection">{{ $t('footer.titleSubText.utilizationPolicy') }}</p>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/return_policy')">{{ $t('footer.returnPolicy') }}</NuxtLink>
        <br>
        <NuxtLink class="h6 font-weight-light text-display-none" to="https://anpc.ro/">{{ $t('footer.titleSubText.anpc') }}</NuxtLink>

        <br>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <p class="h4">{{ $t('footer.clientSupprt') }}</p>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/contact')">{{ $t('menu.contact') }}</NuxtLink>
        <br>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/home#frequent')">{{$t('footer.clientSupportSubText.delivery') }}</NuxtLink>
        <br>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/measurement')">{{ $t('general.howToMeasure') }}</NuxtLink>
        <br>
      </v-col>
      <v-col cols="12" xs="12" sm="3">
        <p class="h4">{{ $t('footer.info') }}</p>
        <p class="h6 font-weight-light">{{ $t('footer.infoSubText.address') }} </p>
        <p class="h6 font-weight-light">
          <v-icon class="mr-2" :icon="mdiPhone"></v-icon>
          07xxxxxxx
        </p>
      </v-col>
    </v-row>

   
    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Texx</strong>
    </div>
  </v-footer>
</div>
</template>


<script setup>
import { NuxtImg } from '#components';
import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiPhone, mdiTwitter } from '@mdi/js';

const emitter = useNuxtApp().$emitter
const icons = [mdiFacebook,mdiTwitter,mdiLinkedin,mdiInstagram]
const locale = useLocalePath()
const openCookieSection = () => {
  localStorage.setItem('gdpr', '0');
  emitter.emit('openCookieBanner');
};
</script>
