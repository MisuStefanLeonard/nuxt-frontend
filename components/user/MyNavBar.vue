<template>
  <div>
    <!-- Use the custom NavigationDrawer component -->
    <NavigationDrawer 
      :sidebar="sidebar" 
      :menu-items="menuItems" 
      :menu-items2="menuItems2" 
      :admin-items="adminItems"
    />
    <v-toolbar style="z-index: 2;">
      <v-app-bar-nav-icon @click="sidebar = !sidebar">
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="d-flex align-center justify-center flex-grow-1">
        <v-toolbar-title class="d-flex align-center justify-center">
          <NuxtLink :to="localePath('/home')" style="cursor: pointer" class="text-decoration-none d-flex align-center">
            <img src="../../assets/LogoTexx.png" alt="Logo" height=45 class="mr-1" preload/>
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
            <v-btn @click="handleMenuClick(item)"
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
              <v-icon  :icon="item.icon" v-else></v-icon>
            </v-btn>
          </template>
          <v-list v-if="item.dropdown.length > 0">
            <v-list-item v-for="dropitem in item.dropdown" :key="dropitem.title" :to="localePath({path: dropitem.path , query: dropitem.query})"
              class="hover:tw-bg-gray-600 dark:hover:tw-bg-gray-600 hover:tw-cursor-pointer" 
              @click="toggleDropdown(item)">
              <v-list-item-title @click="navigateTo(localePath(dropitem.path))">
                <v-icon class="mr-2" :icon="dropitem.icon"></v-icon>
                {{dropitem.dynamic === true ? `${dropitem.title}`  :`${ $t(dropitem.title) }` }}
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
import productService from '~/services/Products'
import { mdiHome, mdiInformation,mdiAccount,mdiStore,mdiPackageVariant,mdiBedKingOutline,mdiWindowShutterOpen,
  mdiBlindsHorizontal,mdiBedOutline,mdiGift,mdiShoppingOutline,
  mdiSecurity,
  mdiArrowRight,
  mdiAccountGroup,
  mdiRoomService
 } from '@mdi/js'
// Inject the emitter
const nuxtApp = useNuxtApp()
const emitter = nuxtApp.$emitter
const isClient = ref(false)
const localePath  = useLocalePath()
const productTypesRo= ref([])
const productTypesEn= ref([])
const { locale} = useI18n()

const sidebar = ref(false)
const isLoggedIn = ref(false)

function handleMenuClick(item) {
  // If the item has a dropdown (dynamic), toggle it instead of navigating.
  if (item.dropdown && item.dropdown.length > 0) {
    item.showItems = !item.showItems;
  } else {
    navigateTo(localePath(item.path));
  }
}


// Define your menu items with translation keys
const menuItems = [
  { title: 'menu.home', path: '/home', icon: mdiHome },
  { title: 'menu.contact', path: '/contact', icon: mdiInformation },
  { title: 'menu.about', path: '/about', icon: mdiAccountGroup },
  { title: 'menu.services', path: '/servicii', icon: mdiRoomService },

]

const menuItems2 = ref([
  { title: 'menu.profile', path: '/user/profile', icon: mdiAccount, dropdown: [] , dynamic : false },
  { 
    title: 'menu.shop', 
    path: '/shop', 
    icon: mdiStore,
    // initially empty; will be updated dynamically
    dropdown: [] 
  },
  { title: 'menu.shoppingCart', path: '/cart', icon: mdiShoppingOutline, dropdown: [] ,dynamic : false }
])

const adminItems = ref([
  {title: 'menu.admin' , path: '/admin/login' , icon: mdiSecurity,dynamic : false  }
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

      cartCountS = localStorage.getItem('cartCount')
      
      cartCount.value = String(parseInt(cartCountS))
    }
  } catch (exception) {
    console.error("Local storage not available" , ex);
    return 0 // def value
  }
}

const getProductTypesAndCategories = (async () => {
  const productTypesAndCategories = await productService.getProductTypesAndCategoriesForUser()
  console.log(productTypesAndCategories)
  productTypesRo.value = productTypesAndCategories.productTypesJson.map(elem => elem.tip_ro)
  productTypesEn.value = productTypesAndCategories.productTypesJson.map(elem => elem.tip_en)
  
})

const shopDropdown = computed(() => {
  // Always include a static "all products" option and "sets"
  const staticItems = [
    { title: 'menu.allProducts', path: '/shop', icon: mdiPackageVariant, query: {} ,dynamic : false },
    { title: 'menu.sets', path: '/shopSeturi', icon: mdiGift, query: {} ,dynamic : false }
  ]
  // Build dynamic items from productTypes arrays
  const dynamicItems = productTypesRo.value.map((tipRo, index) => {
    const tipEn = productTypesEn.value[index] || tipRo;
    return {
      // Display the appropriate title based on the locale
      title: (locale.value === 'ro' ? tipRo : tipEn).toUpperCase(),
      // Always store the Romanian version as the "value" field
      value: tipRo,
      path: '/shop',
      icon: mdiArrowRight,
      query: { type: tipRo.toLowerCase() },
      dynamic: true,
    }
  })
  return [...staticItems, ...dynamicItems]
})


// Watch the computed shopDropdown and update only the shop part of menuItems2
watch(shopDropdown, (newDropdown) => {
  const shopItem = menuItems2.value.find(item => item.title === 'menu.shop')
  if (shopItem) {
    shopItem.dropdown = newDropdown
  }
}, { immediate: true })



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
onMounted(async () => {
  isLoggedIn.value = isAuthenticated();
  isClient.value = true;
  getCartCount()
  await getProductTypesAndCategories()
})


</script>
