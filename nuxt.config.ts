// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  vite:{
    build : {
      sourcemap : true,
      rollupOptions : {
        treeshake: true
      }
    }
  },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  app: {
    pageTransition: {name: 'page' , mode:'out-in'},
    head: {
      link:
       [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
       ]
    }
  },
  image : {
    domains: ['https://dw45vxtt6tooj.cloudfront.net'],   
  },
  devServer: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000, // Optional: Specify a port, default is 3000
  },
  components : false,
  gtm: {
    id: 'GTM-NWHGHS9Q',
    defer: false,
    compatibility: false,
    enabled: true,
    debug: true , // false for production
    loadScript: true,
    trackOnNextTick: false,
    devtools: true,
    enableRouterSync: true
  },
  i18n: {
    lazy: true,
    langDir : "locales",
    strategy : "prefix_except_default",
    baseUrl : 'http://localhost:3000',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
    locales : [
      {
        code: 'en',
        name: "English(US)",
        language : 'en-US',
        file : "en-US.json"
      },
      {
        code : 'ro',
        language : 'ro-RO',
        name : "Romania(ROU)",
        file: "ro-RO.json",
      }
    ],
    defaultLocale: "ro",
  },
  routeRules : {
    '/:locale?/admin/**' : {ssr: false },
    '/en/admin/**' : {redirect : '/404'},
    // '/:locale?/user/profile' : {ssr: false},
    // '/:locale?/user/profile/**' : {ssr: false}
  },
  // nitro: {
  //   routeRules : {
  //     // '/:locale?/admin/**' : {ssr: false },
  //     '/en/admin/**' : {redirect : '/404'}
  //     // '/:locale?/user/profile' : {ssr: false},
  //     // '/:locale?/user/profile/**' : {ssr: false}
  //   }
  // },
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: [
    '~/plugins/SweetAlert.js',
    '~/plugins/vuetify.js',
    '~/plugins/emitter.js',
    '~/plugins/google.recaptcha.client.js'
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ]
})