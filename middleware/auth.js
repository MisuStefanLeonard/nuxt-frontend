// middleware/auth.js
import { useUserStore } from "~/store/user";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()  // Adjust this if using Vuex or Pinia
  const localePath = useLocalePath()
  const emitter = useNuxtApp().$emitter;
  const {$i18n} = useNuxtApp()

  // de folosit set user 
  const isUserloggedInCookie =  useCookie('userLoggedIn')
  const isAdminloggedInCookie =  useCookie('admin')
  console.log(isUserloggedInCookie.value)
  console.log(isAdminloggedInCookie.value)

  const user = {
    auth : isUserloggedInCookie.value === 1,
    admin : isAdminloggedInCookie.value === 1
  }
  userStore.setUser(user)

  emitter.emit('isLoggedIn' , isUserloggedInCookie.value)

  if (!userStore.isAuthenticated) {
    const logoutMessage = $i18n.t('messages.loginRequired')
    userStore.showSnackbar(logoutMessage);
    return navigateTo(localePath('/user/login'));
    
  }
});
