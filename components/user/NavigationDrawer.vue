<template>
  <v-navigation-drawer v-model="internalSidebar" temporary  style="position:fixed; top:0; left:0; overflow-y:scroll;">
    <div class="text-center">
      <NuxtImg
       class="text-center"
        src="/LogoTexx.png"
        width="75"
        height="75">

        </NuxtImg>
    </div>
    <v-list class="text-left d-flex flex-column fill-height">
      <!-- Menu items -->
      <v-list-item v-for="item in menuItems" :key="item.title" @click="goTo(item.path)">
        <v-list-item-title> <v-icon class="mr-2" :icon="item.icon"></v-icon>{{$t(item.title)  }}</v-list-item-title>
      </v-list-item>
      
      <!-- Dropdown items -->
      <v-list-item v-for="item in menuItems2" :key="item.title" @click="item.dropdown.length > 0 ? toggleDropdown(item) : goTo(item.path)" >
        <v-list-item-title>
          <v-icon class="mr-2" :icon="item.icon"></v-icon>
          {{ $t(item.title)}}
          <v-badge inline
            v-if="item.title === 'menu.shoppingCart' && isClient"
            :content="cartCount"
            color="yellow"
            :max="9"
            size="small"
            :offset-y="2"
          >
          </v-badge>
        </v-list-item-title>
        <template v-if="item.dropdown.length > 0">
          <v-expand-transition>
            <v-list v-if="item.expand" >
              <v-list-item v-for="dropitem in item.dropdown" :key="dropitem.title" @click="handleDropDown(dropitem )">
                <v-list-item-title>
                  <v-icon class="mr-2" :icon="dropitem.icon"></v-icon>
                  {{dropitem.dynamic === true ? `${dropitem.title}`  :`${ $t(dropitem.title) }` }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </template>
      </v-list-item>
      <div v-if="useCookie('admin').value === 1">
        <v-list-item v-for="item in adminItems" :key="item.title" @click="goToQuery(item.path)">
          <v-list-item-title> <v-icon class="mr-2" :icon="item.icon"></v-icon>{{$t(item.title)  }}</v-list-item-title>
        </v-list-item>
      </div>
      
      <v-spacer></v-spacer>
      <v-container fluid class="text-center" >
        <v-row no-gutters>
          <v-col cols="12"  >
            <v-btn variant="flat" block :color="isLoggedIn === true ? 'error' : 'success' "
            @click="emitButtonAction">
              <div v-if="isLoggedIn === true">
                <span>{{ $t('menu.logout') }} <v-icon :icon="mdiArrowLeft"></v-icon></span>
              </div>
              <div v-else>
                <span>{{ $t('menu.login') }} <v-icon :icon="mdiArrowRight"></v-icon></span>
              </div>
            </v-btn>
            <v-btn v-if="isLoggedIn === false" 
            variant="flat" block color="primary" @click="goToRegister" class="mt-2">
              <span>{{ $t('menu.register') }} <v-icon :icon="mdiAccountPlus"></v-icon></span>
            </v-btn>
          </v-col>
          
          <v-col cols="12" class="mt-2">
            <LanguageSwitcher></LanguageSwitcher>
          </v-col>
        </v-row>
        
        
      </v-container>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useNuxtApp } from '#app'
import LanguageSwitcher from './LanguageSwitcher.vue';
import { cartCount } from '~/middleware/cart'
import Products from '~/services/Products';
import { mdiAccountPlus, mdiArrowLeft, mdiArrowRight } from '@mdi/js';

// Define props
const props = defineProps({
  sidebar: Boolean,
  menuItems: Array,
  menuItems2: Array,
  adminItems: Array
})

const isClient = ref(false)




// Reactive state
const internalSidebar = ref(props.sidebar)
const isLoggedIn = ref(false)

// Router instance
const nuxtApp = useNuxtApp()
const emitter = nuxtApp.$emitter
const localePath = useLocalePath()
const { t } = useI18n()

watch(() => props.sidebar, (newValue) => {
  internalSidebar.value = newValue
})

// Methods
const getCookie = (name) => {
  return useCookie(name).value
}


emitter.on('isLoggedIn' , (state) => {
  if(state === true){
    isLoggedIn.value = true;
  }else {
    isLoggedIn.value = false;
  }
})




const emitButtonAction = () => {
  if(isLoggedIn.value === true){
    navigateTo(localePath('/user/logout'))
  }else{
    navigateTo(localePath('/user/login'))
  }
}

const goToRegister = () => {
  navigateTo(localePath('/user/register'))
}


const goTo = (path) => {
  navigateTo(localePath(path))
}

const goToQuery = (pathP) => {
  navigateTo({path : localePath(pathP) , query : {redirect: 'redirect'}})
}

const handleDropDown = (dropitem ) => {
  console.log(dropitem , dropitem.dynamic , dropitem.value)
  if(dropitem.dynamic === true){
    currentDropDown(dropitem.title , dropitem.dynamic , dropitem.value)
  }else{
    currentDropDown(t(dropitem.title), 'none' )
  }
 
}

function toggleDropdown(item) {
  console.log(item)
  item.expand = !item.expand;
  props.menuItems2.forEach(menuItem => {
    if (menuItem !== item) {
      menuItem.expand = false;
    }
  });
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


const currentDropDown = (option , isDynamic , valueRo) => {
  const translatedGeneralShop = t('menu.allProducts') 
  // const translatedCuverturi = t('menu.cuverturi') 
  // const translatedPerdele = t('menu.perdele') 
  // const translatedDraperii = t('menu.draperii')
  // const translatedPerne = t('menu.perne')
  const translatedSets = t('menu.sets')
  const translatedCart = t('menu.shoppingCart')

  if(isDynamic === true){
    navigateTo({path: localePath('/shop') , query : {type: valueRo}})
  }
  
  switch (option) {
    case translatedGeneralShop: {
      navigateTo(localePath('/shop'))
      break
    }
   
    case translatedSets: { 
      navigateTo({
        path: localePath('/shopSeturi')
      })
      break
    }
    case translatedCart: {
      navigateTo(localePath('/cart'))
      break;
    }
    default:
      break
  }
}

onMounted(() => {
  isLoggedIn.value = getCookie('userLoggedIn') === 1
  isClient.value = true
  getCartCount()
  
})

</script>

<style scoped>
/* Your styles here */
</style>
