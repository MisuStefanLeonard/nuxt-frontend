import { createGtm } from "@gtm-support/vue-gtm";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(createGtm({
        id : 'GTM-NWHGHS9Q',
        defer: false,
        compatibility: false,
        enabled: true,
        debug: true , // false for production
        loadScript: true,
        vueRouter: useRouter(),
        trackOnNextTick: false,
    }))
})