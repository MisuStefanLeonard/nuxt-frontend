<template>
    <v-app>
      <FirstTimeEntering />
      <MyNavBar :key="route.fullPath" />
      <v-main>
        <SnackbarExpired />
        <NuxtPage />
       
      </v-main>
      <FooterComp />
      <CookieBanner/>
    </v-app>
  </template>
  
  <script setup>
  import MyNavBar from '~/components/user/MyNavBar.vue';
  import SnackbarExpired from '~/components/SnackbarExpired.vue';
  import FooterComp from '~/components/user/FooterComp.vue';
  import FirstTimeEntering from '~/components/user/FirstTimeEntering.vue';
  import CookieBanner from '~/components/user/CookieBanner.vue';
  import { ref, onMounted } from 'vue';
  import { useNuxtApp } from '#app';

  const route = useRoute();
  const i18n = useI18n()
  const runTimeConfigs = useRuntimeConfig()
  const canonicalUrl = ref(`${runTimeConfigs.public.siteUrl}${route.fullPath}`)

  useHead({
    titleTemplate : (titleChunk) => {
      return titleChunk ? `${titleChunk}` : 'Site Title';
    },
    htmlAttrs:{
      lang: i18n.locale.value
    },
    link: [
      ...useLocaleHead({ addSeoAttributes: true }).value.link.filter(l => l.rel !== 'canonical'),
      {
        rel: 'canonical',
        href: canonicalUrl
      }
    ],
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
        // { rel: 'icon', type: 'image/png', href: 'favicon-16x16.png' },
        // { rel: 'icon', type: 'image/png', href: 'favicon-32x32.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
  
  })

</script>