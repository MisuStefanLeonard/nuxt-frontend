import Swal from 'sweetalert2'

export default defineNuxtPlugin((nuxtApp) => {
  // Adding SweetAlert to the global properties
  nuxtApp.vueApp.config.globalProperties.$swal = Swal

  // Alternatively, you can use provide/inject pattern:
  nuxtApp.provide('swal', Swal)
})