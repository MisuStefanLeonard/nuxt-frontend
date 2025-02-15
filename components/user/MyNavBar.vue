<template>
  <div>
    <!-- Use the custom NavigationDrawer component -->
    <NavigationDrawer 
      :sidebar="sidebar" 
      :menu-items="menuItems" 
      :menu-items2="menuItems2" 
    />
    <v-toolbar style="z-index: 2;">
      <v-app-bar-nav-icon @click="sidebar = !sidebar">
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="d-flex align-center justify-center flex-grow-1">
        <v-toolbar-title class="d-flex align-center justify-center">
          <NuxtLink :to="localePath('/home')" style="cursor: pointer" class="text-decoration-none d-flex align-center">
            <img src="../../assets/LogoTexx.png" alt="Logo" height=45 class="mr-1">
          </NuxtLink>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>

      <div class="d-md-flex">
        <LanguageSwitcher ></LanguageSwitcher>
        <v-menu  v-for="item in menuItems2" :key="item.title"  
          v-model="item.showItems"
        >
          <template v-slot:activator="{ props }">
            <v-btn @click="navigateTo(localePath(item.path))"
             text v-bind="props" density="compact" size="50" >
              <v-badge 
                v-if="item.title === 'menu.shoppingCart' && isClient"
                :content="cartCount"
                color="yellow"
                size="small"
                :max="9"
              >
                <v-icon class="mr-2" :icon="item.icon"></v-icon>
              </v-badge>
              <v-icon @click="navigateTo(localePath(item.path))" :icon="item.icon" v-else></v-icon>
            </v-btn>
          </template>
          <v-list v-if="item.dropdown.length > 0">
            <v-list-item v-for="dropitem in item.dropdown" :key="dropitem.title" :to="localePath({path: dropitem.path , query: dropitem.query})"
              class="hover:tw-bg-gray-600 dark:hover:tw-bg-gray-600 hover:tw-cursor-pointer" 
              @click="toggleDropdown(item)">
              <v-list-item-title @click="navigateTo(localePath(dropitem.path))">
                <v-icon class="mr-2" :icon="item.icon"></v-icon>
                {{ $t(dropitem.title) }} 
              </v-list-item-title>
             
            </v-list-item>
          </v-list>
        </v-menu>
       
      </div>

    </v-toolbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavigationDrawer from './NavigationDrawer.vue' 
import LanguageSwitcher from './LanguageSwitcher.vue'
import { cartCount } from '~/middleware/cart'
import { useDisplay } from 'vuetify'
import { mdiHome,mdiAccountBox, mdiInformation,mdiAccount,mdiStore,mdiPackageVariant,mdiBedKingOutline,mdiWindowShutterOpen,
  mdiBlindsHorizontal,mdiBedOutline,mdiGift,mdiShoppingOutline
 } from '@mdi/js'
// Inject the emitter
const nuxtApp = useNuxtApp()
const emitter = nuxtApp.$emitter
const isClient = ref(false)
const localePath  = useLocalePath()
const {name} = useDisplay()

const heightComp = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return 3
    }
})
// Router instance

const sidebar = ref(false)
const isLoggedIn = ref(false)

// Define your menu items with translation keys
const menuItems = [
  { title: 'menu.home', path: '/home', icon: mdiHome },
  { title: 'menu.about', path: '/about', icon: mdiAccountBox },
  { title: 'menu.contact', path: '/contact', icon: mdiInformation },
]

const menuItems2 = ref([
{ title: 'menu.profile' , path: '/user/profile' , icon:mdiAccount , dropdown : []},
  { 
    title: 'menu.shop', 
    path: '/shop', 
    icon: mdiStore,
    dropdown: [
        { title: 'menu.allProducts', path: '/shop', icon: mdiPackageVariant , query : {} },
        { title: 'menu.cuverturi', path: '/shop', icon: mdiBedKingOutline, query: {type : 'cuvertura'}},
        { title: 'menu.perdele', path: '/shop', icon: mdiWindowShutterOpen, query: {type : 'perdea'} },
        { title: 'menu.draperii', path: '/shop', icon: mdiBlindsHorizontal,query: {type : 'draperie'} },
        { title: 'menu.perne', path: '/shop', icon: mdiBedOutline , query: {type : 'perna'} },
        { title: 'menu.sets', path: '/shopSeturi', icon: mdiGift , query: {} },
        
    ]
  },
  
  { title: 'menu.shoppingCart' , path: '/cart' , icon: mdiShoppingOutline , dropdown : []}
])


if (emitter) {
  emitter.on('isLoggedIn', (status) => {
    isLoggedIn.value = status;
  })
}
const getCartCount = function(){ 
  try {
    localStorage.setItem('test' , 'test');
    var getItem = localStorage.getItem('test');
    if(getItem !== null ){
      localStorage.removeItem('test');
      var cartCountS = localStorage.getItem('cartCount');
      if(cartCountS === null){
        localStorage.setItem('cartCount' , '0')
      }
      cartCount.value = String(parseInt(cartCountS))

    }
  } catch (exception) {
    console.error("Local storage not available" , ex);
    return 0 // def value
  }
}


function toggleDropdown(item) {
  item.expand = !item.expand;
  menuItems2.value.forEach(menuItem => {
    if (menuItem !== item) {
      menuItem.expand = false;
    }
  });
}

function isAuthenticated() {
  const token = useCookie('userLoggedIn');
  return token.value === 1;
}

// Run this once the component is mounted
onMounted(() => {
  isLoggedIn.value = isAuthenticated();
  isClient.value = true;
  getCartCount()
})


</script>
