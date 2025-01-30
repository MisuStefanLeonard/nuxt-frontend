import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: '6LePu8QqAAAAALanLIMAZnkRdEF3XvDjf80Trc0Y',
        loaderOptions: {
            autoHideBadge: true
        }
    });
});
