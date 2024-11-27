import { useUserStore } from "~/store/user";
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();   // Adjust this if using Vuex or Pinia
  const {$i18n} = useNuxtApp()
  var isUserloggedIn = useCookie("userLoggedIn");
  var isAdminLoggedIn =  useCookie("admin");
  const user = {
    auth : isUserloggedIn.value === 1,
    admin : isAdminLoggedIn.value === 1
  }
  userStore.setUser(user)

  console.log(userStore.isAuthenticated,userStore.isAdmin)

  if (!userStore.isAuthenticated || !userStore.isAdmin) {
    const requiredForAdminMessage = $i18n.t('messages.loginRequiredForAdmin')
    userStore.showSnackbar(requiredForAdminMessage);
    return navigateTo(('/user/logout'));
  }
});
