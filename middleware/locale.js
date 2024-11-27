// middleware/locale.js
import { useCookie } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
    const currentLanguage = useCookie('i18n_redirected').value;
    const selectedCurrency = useState('selectedCurrency', () => 'RON'); 

    if (currentLanguage === 'ro') {
        selectedCurrency.value = 'RON';
    } else if (currentLanguage === 'en') {
        selectedCurrency.value = 'EUR';
    }

    return;
});