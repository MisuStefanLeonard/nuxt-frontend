import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      auth: false,
      admin: false,
      snackbarMessage: '',
      snackbarVisible: false,
      accountData: {},
      originalAccountData: {}
    };
  },
  // persist: {
  //   debug: true,
  //   pick: ['accountData' , 'originalAccountData']
  // },
  persist:{
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['accountData' , 'originalAccountData']
  },
  getters: {
    isAuthenticated:state => state.auth === true ,
    isAdmin: state => state.admin === true,
    isSnackBarVisible: state => state.snackbarVisible === true,
    getDataPassed : state => state.accountData,
    getOriginalDataPassed : state => state.originalAccountData
  },
  actions: {
    initializeAuth() {
      this.auth = useCookie('userLoggedIn').value === 1;
      this.admin = useCookie('admin').value === 1;
    },
    setUser(user) {
      this.auth = user.auth;
      this.admin = user.admin;
    },
    showSnackbar(message) {
      this.snackbarMessage = '';
      this.snackbarVisible = false;
      setTimeout(() => {
        this.snackbarMessage = message;
        this.snackbarVisible = true;
        
      }, 200);
    },
    setAccountData(clientData){
     
      this.accountData = clientData;
    },
    setOriginalAccountData(clientData){
      
      this.originalAccountData = clientData;
    }
  }
});
