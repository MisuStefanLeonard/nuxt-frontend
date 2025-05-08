<template>
    <v-app>
      <!-- <FirstTimeEntering /> -->
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

  const route = useRoute();
  const runTimeConfigs = useRuntimeConfig()
  const canonicalUrl = computed(() => `${runTimeConfigs.public.siteUrl}${route.fullPath}`)
  const head = useLocaleHead({
    seo: true,
    dir: true,
    lang: true,
  })

  useHead(() => ({
    titleTemplate : (titleChunk) => {
      return titleChunk ? `${titleChunk}` : 'Site Title';
    },
    htmlAttrs : {
      lang: head.value.htmlAttrs.lang
    },
    link: [
      {rel: 'canonical' , href: `${canonicalUrl.value}`},
      ...(head.value.link.filter(h => h.hreflang && h.hreflang.includes('-')) || [])
    ],
    meta : [
      {
        property : 'og:title' , 
        content: `Takdecor - ${route.meta.title || 'Default'}` 
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
        property: 'og:url',
        content: canonicalUrl.value|| 'Default',
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
        content: 'Takdecor, Romania , all rights reserved'
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

  }))

</script>