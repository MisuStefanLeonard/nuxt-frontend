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
      <v-col cols="12" xs="12" sm="12" md="4">
        <NuxtImg preload  format="webp"
        src="/LogoTexx.png"
        width="150"
        height="150">

        </NuxtImg>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="4">
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
      <v-col cols="12" xs="12" sm="12" md="4">
        <p class="h4">{{ $t('footer.clientSupport') }}</p>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/contact')">{{ $t('menu.contact') }}</NuxtLink>
        <br>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/home#frequent')">{{$t('footer.clientSupportSubText.delivery') }}</NuxtLink>
        <br>
        <NuxtLink class="h6 font-weight-light text-display-none" :to="locale('/measurement')">{{ $t('general.howToMeasure') }}</NuxtLink>
        <br>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6">
        <p class="h4">{{ $t('footer.info') }}</p>
        <p class="h6 font-weight-light">{{ $t('footer.infoSubText.address') }} </p>
        <v-btn class="rounded-xl"  @mouseenter="makeOutlinedOfficeLocation2 = true"
        @mouseleave="makeOutlinedOfficeLocation2 = false"
        :variant="makeOutlinedOfficeLocation2 === true ? 'outlined' : 'flat'"
        @click="goToMapsOfficeLocation2()">
          <v-icon size="28" :icon="mdiMapMarker"></v-icon>Str. Harmanului nr.61, Brasov
        </v-btn>
        <br>
        <br>
        <p class="h4">Contact</p>
        <v-btn @mouseenter="mouseEnterFunc()"
        @mouseleave="mouseLeaveFunc()"
          @click="navigateTo('https://wa.me/40712345678')"  class="rounded-xl "
          :variant="makeOutlined === true ? 'outlined' : 'flat'">
          <v-icon class="mr-2" :icon="mdiPhone"></v-icon>
          {{ buttonText }}
        </v-btn>
        <br>
        <br>
        <v-btn @mouseenter="mouseEnterFuncMail()"
        @mouseleave="mouseLeaveFuncMail()"
           class="rounded-xl "
           @click="navigateTo('mailto:office@takdecor.ro')"
          :variant="makeOutlinedMail === true ? 'outlined' : 'flat'">
          <v-icon class="mr-2" :icon="mdiEmail"></v-icon>
          {{ buttonMailText }}
        </v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6">
        <p class="h4">Program</p>
        <p class="h6 font-weight-bold">{{ $t('footer.mondayToFriday') }} 9:00 PM - 18:00 PM </p>
        <p class="h5 font-weight-light">{{ $t('footer.office') }} </p>
        <v-btn class="rounded-xl"  @mouseenter="makeOutlinedOfficeLocation = true"
        @mouseleave="makeOutlinedOfficeLocation = false"
        :variant="makeOutlinedOfficeLocation === true ? 'outlined' : 'flat'"
        @click="goToMapsOfficeLocation()">
          <v-icon size="28" :icon="mdiMapMarker"></v-icon>Bd. Grivitei nr. 85, Brasov
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div>
      &copy;Copyright {{ new Date().getFullYear() }} — <strong>Takdecor</strong>
    </div>
  </v-footer>
</div>
</template>


<script setup>
import { NuxtImg } from '#components';
import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiPhone, mdiTwitter, mdiEmail, mdiMapMarker } from '@mdi/js';

const emitter = useNuxtApp().$emitter
const icons = [mdiFacebook,mdiTwitter,mdiLinkedin,mdiInstagram]
const {t} = useI18n()
const locale = useLocalePath()
const openCookieSection = () => {
  localStorage.setItem('gdpr', '0');
  emitter.emit('openCookieBanner');
};
const buttonText = ref('07xxxxxxxx')
const buttonMailText = ref('office@takdecor.ro')
const makeOutlined = ref(false)
const makeOutlinedMail = ref(false)
const makeOutlinedOfficeLocation = ref(false)
const makeOutlinedOfficeLocation2 = ref(false)

const mouseEnterFunc = () => {
  buttonText.value = t('footer.callNow')
  makeOutlined.value = true
}

const mouseLeaveFunc = () => {
  buttonText.value = "07xxxxxxxx"
  makeOutlined.value = false
}

const mouseEnterFuncMail = () => {
  buttonMailText.value = t('footer.leaveMail')
  makeOutlinedMail.value = true
}

const mouseLeaveFuncMail = () => {
  buttonMailText.value = "office@takdecor.ro"
  makeOutlinedMail.value = false
}

const goToMapsOfficeLocation = () => {
  window.open(
    'https://www.google.com/maps/place/Bulevardul+Grivitei+85,+Brasov',
    '_blank'
  )
}

const goToMapsOfficeLocation2 = () => {
  window.open(
    'https://www.google.com/maps/place/Strada+Harmanului+61,+Brașov',
    '_blank'
  )
}


</script>

<style scoped>

</style>
