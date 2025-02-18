<template>
  <v-app>
    <!-- Use NuxtLayout to dynamically render the layout specified for each page -->
    <NuxtLayout>
      <!-- NuxtPage renders the current page inside the layout -->
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup>
useHead({

  link: [{ rel: 'icon', type: 'image/png', href: 'favicon.ico' }]

}) 
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem)
}
</style>
