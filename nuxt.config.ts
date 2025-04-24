// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NODE_ENV === 'production'
        ? 'https://texxshop.ro'
        : 'http://localhost:3000'
    }
  },
  ssr: true,
  vite:{
    build : {
      sourcemap : true,
      rollupOptions : {
        treeshake: true
      }
    }
  },
  robots: {
    blockNonSeoBots:true,
    blockAiBots: true,
    disallow : ['/en/admin/**' , '/admin/**' ,'/user/profile/**'
      , '/en/user/profile/*' , '/user/order/*' , '/en/user/order/*',
      '/en/user/checkout' , '/user/checkout' , '/en/terms_and_conditions' , 
      '/terms_and_conditions' , '/return_policy' , '/en/return_policy'
    ],
    sitemap : 'https://texxshop.ro/sitemap.xml'
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify())
      })
    },
  ],
  app: {
    pageTransition: {name: 'page' , mode:'out-in'},
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'canonical' , href: 'https://texxshop.ro'}
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' }
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
  site: {
    url: 'https://texxshop.ro',
    name: 'Takdecor',
  },
  components : false,
  gtm: {
    id :process.env.NODE_ENV === 'development'
     ? process.env.GTM_ID || 'development-id'
     : 'GTM-NWHGHS9Q',
    defer: false,
    compatibility: false,
    enabled: true,
    debug: process.env.NODE_ENV === 'development' , // false for production
    loadScript: true,
    trackOnNextTick: false,
    devtools: process.env.NODE_ENV === 'development',
    enableRouterSync: true
  },
  i18n: {
    lazy: true,
    langDir : "../locales",
    strategy : "prefix_except_default",
    baseUrl : process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://texxshop.ro',
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
    '/en/admin/**' : { redirect: `/error/404`},
    '/' : {redirect : '/home'},
    '/en' : {redirect : '/en/home'}
  },
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2024-04-03',
  devtools: 
  { 
    enabled: process.env.NODE_ENV === 'development' 
  },
  plugins: [
    '~/plugins/SweetAlert.js',
    '~/plugins/vuetify.js',
    '~/plugins/emitter.js',
    '~/plugins/google.recaptcha.client.js',
    '~/plugins/apexChart.client.js'
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ]
})