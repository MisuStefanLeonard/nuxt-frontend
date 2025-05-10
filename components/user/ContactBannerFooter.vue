<template>
    <div>
        <section class="row elevation-24 rounded bg-grey-lighten-5" id="contact">
          <v-img src="/cuv2.jpeg" preload
          format="webp"
          alt="background_image"
          :aspect-ratio="height !== true ? 9 / 4 : 4 / 3"
          cover>
          <div class="overlay d-flex justify-center align-center fill-height text-h6  elevation-24">
            <v-row>
              <v-col cols="12" class="pa-3">
                <p class="text-center text-white mt-4 font-weight-bold">
                  {{ $t('aboutUsPage.text8') }}
                </p>
                <v-divider opacity="0"></v-divider>
                <v-divider opacity="0"></v-divider>
                <p class="text-center text-white">
                  {{ $t('aboutUsPage.text9') }}
                </p>
                <v-divider opacity="0"></v-divider>
                <p class="text-center text-white font-weight-bold">
                  {{ $t('aboutUsPage.text10') }}
                </p>
              </v-col>
              <v-col cols="12" class="text-center mb-5">
                <v-btn color="white"  variant="outlined" class="rounded-xl hoverBtn"
                 @click="navigateTo('https://wa.me/40712345678')">
                  {{ $t('aboutUsPage.text11') }}
                  <span class="text-white font-weight-thin text-h5"></span>
                </v-btn>
                <v-divider opacity="0"></v-divider>
                <span class="text-white font-weight-bold text-subtitle-1">
                  <v-icon :icon="mdiPhone" size="28"></v-icon>
                  0712345678
                </span>
                <br>
                <span class="text-white font-weight-bold text-subtitle-1">
                  <v-icon :icon="mdiEmail" size="28"></v-icon>
                  office@takdecor.ro
                </span>
              </v-col>
            </v-row>
          </div>
          </v-img>
        </section>
    </div>
    
</template>

<script setup>
import { mdiEmail, mdiPhone } from '@mdi/js';
import { NuxtImg } from '#components';
import { useDisplay } from 'vuetify';
const {name} = useDisplay()
const height = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return 3
    }
})
</script>

<style scoped>
.hoverBtn:hover {
  background-color: #311B92 !important; /* equivalent to grey-darken-4 */
  border-color: #311B92 !important;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.4); /* dark overlay */
}

</style>