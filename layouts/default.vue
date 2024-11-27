<template>
    <v-app>
      <MyNavBar />
      <v-main>
        <SnackbarExpired />
        <NuxtPage />
      </v-main>
      <FooterComp />
    </v-app>
  </template>
  
  <script setup>
  import MyNavBar from '~/components/user/MyNavBar.vue';
  import SnackbarExpired from '~/components/SnackbarExpired.vue';
  import FooterComp from '~/components/user/FooterComp.vue';
  import { ref, onMounted } from 'vue';
  import { useNuxtApp } from '#app';

  const route = useRoute();

  const isLoggedIn = ref(false);
  const emitter = useNuxtApp().$emitter;

  useHead({
    titleTemplate : (titleChunk) => {
      return titleChunk ? `${titleChunk} - Site Title` : 'Site Title';
    },
    htmlAttrs:{
      lang: route.path.startsWith('/en') ? 'en' : 'ro',
      dir: route.meta.ltr
    },
    meta : [
      {
        property : 'og:title' , 
        content: `Texx - ${route.meta.title || 'Default'}` 
      },
      {
        property: 'og:description',
        content: route.meta.ogDescription || '',
      },
      {
        property: 'og:locale',
        content: 'ro_RO',
      },
      {
        property: 'og:locale:alternate',
        content: 'en_US',
      },
      {
        property: 'og:type',
        content: route.meta.ogType || 'Default',
      },
      {
        property: 'og:url',
        content: route.meta.canonicalUrl || 'Default',
      },
      {
        property: 'og:site_name',
        content: route.meta.siteName || 'Default',
      },
      {
        name : 'description',
        content: route.meta.description || 'Default'
      },
      
      {
        name : 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        name: 'author',
        content: 'Misu Stefan-Leonard, Romania , all rights reserved'
      },
      {
        name: 'charset',
        content: 'UTF-8'
      },
      {
        name: 'keywords',
        content: route.meta.keywords || 'Default'
      }
    ],
    script: 
    [
      {
        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NWHGHS9Q');`,
        type: 'text/javascript'
      },
    ],
    noscript: 
    [
      {
        innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWHGHS9Q"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }
    ],
    link:
    [
      {rel :'canonical' , href: route.meta.canonicalUrl || 'Default'},
      {rel :'dns-prefetch' , href: route.meta.externalAPI_URL || 'Default'},
      {rel :'prefetch' , href: route.meta.externalResource || 'Default'},
      {rel :'alternate', href: route.meta.alternateLang || 'Default'}
    ]
  })

  onMounted(() => {
    const token = useCookie('userLoggedIn').value;
    isLoggedIn.value = token === 1;  // Ensure `1` means the user is logged in
    // Emit the correct login state to update your navigation
    emitter.emit('isLoggedIn', isLoggedIn.value);
  });
</script>