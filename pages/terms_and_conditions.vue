<template>
  <div>
    <div class="text-center p-2 m-1">
      <p class="font-weight-thin h4">{{ $t('termsAndConditions.title') }}</p>
    </div>
    <v-card class="font-weight-light text-left m-4 p-2 elevation-24">
      <v-card-text>
        <!-- Intro paragraph -->
        <p class="font-weight-light h6">
          <v-icon :icon="mdiStarFourPointsSmall" size="24"></v-icon>
          {{ $t('termsAndConditions.intro1') }}
        </p>
        <!-- Loop over sections 1 to 8 -->
        <div v-for="n in 8" :key="n" class="mb-4">
          <h4 class="font-weight-bold"> <v-icon :icon="mdiStarFourPointsSmall" size="24"></v-icon>{{ $t(`termsAndConditions.section${n}.header`) }}</h4>
          <p class="font-weight-light h6">{{ $t(`termsAndConditions.section${n}.content`) }}</p>
        </div>
      </v-card-text>
      <v-divider opacity="0"></v-divider>
      <v-card-actions>
        <p class="font-weight-normal h5">
          <v-icon :icon="mdiExclamation"></v-icon>
          {{ $t('termsAndConditions.finalNote') }}
        </p>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { mdiStarFourPointsSmall, mdiExclamation } from '@mdi/js'

useHead({
  title : 'Termeni si conditii'
})

</script>
