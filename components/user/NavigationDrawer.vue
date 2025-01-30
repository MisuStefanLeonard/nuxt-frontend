<template>
  <v-navigation-drawer v-model="internalSidebar" temporary  style="position:fixed; top:0; left:0; overflow-y:scroll;">
    <v-list class="text-left d-flex flex-column fill-height">
      <!-- Menu items -->
      <v-list-item v-for="item in menuItems" :key="item.title" @click="goTo(item.path)">
        <v-list-item-title> <v-icon class="mr-2">{{ item.icon }}</v-icon>{{$t(item.title)  }}</v-list-item-title>
      </v-list-item>
      
      <!-- Dropdown items -->
      <v-list-item v-for="item in menuItems2" :key="item.title" @click="item.dropdown.length > 0 ? toggleDropdown(item) : goTo(item.path)" >
        <v-list-item-title>
          <v-icon class="mr-2" >{{ item.icon }}</v-icon>
          {{ $t(item.title) }}
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
              <v-list-item v-for="dropitem in item.dropdown" :key="dropitem.title" @click="handleDropDown(dropitem)">
                <v-list-item-title>
                  <v-icon class="mr-2">
                    {{ dropitem.icon }}
                  </v-icon>
                  {{ $t(dropitem.title) }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </template>
      </v-list-item>
      <v-spacer></v-spacer>
      <v-container fluid class="text-center" >
        <v-row no-gutters>
          <v-col cols="12"  >
            <v-btn variant="flat" block :color="isLoggedIn === true ? 'error' : 'success' "
            @click="emitButtonAction">
              <div v-if="isLoggedIn === true">
                <span>{{ $t('menu.logout') }} <v-icon>mdi-arrow-left</v-icon></span>
              </div>
              <div v-else>
                <span>{{ $t('menu.login') }} <v-icon>mdi-arrow-right</v-icon></span>
              </div>
            </v-btn>
            <v-btn v-if="isLoggedIn === false" 
            variant="flat" block color="primary" @click="goToRegister" class="mt-2">
              <span>{{ $t('menu.register') }} <v-icon>mdi-account-plus</v-icon></span>
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

// Define props
const props = defineProps({
  sidebar: Boolean,
  menuItems: Array,
  menuItems2: Array
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

const handleDropDown = (dropitem) => {
  currentDropDown(t(dropitem.title))
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

const getAllProductCategoriesAndTypes = (async () => {
  const response = await Products.getProductTypesAndCategoriesForUser();
  console.log(response)
})


const currentDropDown = (option) => {
  const translatedGeneralShop = t('menu.allProducts') 
  const translatedCuverturi = t('menu.cuverturi') 
  const translatedPerdele = t('menu.perdele') 
  const translatedDraperii = t('menu.draperii')
  const translatedPerne = t('menu.perne')
  const translatedSets = t('menu.sets')
  const translatedCart = t('menu.shoppingCart')
  
  switch (option) {
    case translatedGeneralShop: {
      navigateTo(localePath('/shop'))
      break
    }
    case translatedCuverturi: {
      navigateTo({
        path: localePath('/shop'),
        query: {
          type: 'CUVERTURA'
        }
      })
      break
    }
    case translatedPerdele: { 
      navigateTo({
        path: localePath('/shop'),
        query: {
          type: 'PERDEA'
        }
      })
      break
    }
    case translatedDraperii: {
      navigateTo({
        path: localePath('/shop'),
        query: {
          type: 'DRAPERIE'
        }
      })
      break
    }
    case translatedPerne: { 
      navigateTo({
        path: localePath('/shop'),
        query: {
          type: 'PERNA'
        }
      })
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
  getAllProductCategoriesAndTypes()
  console.log("nav drawer mounted")
})

</script>

<style scoped>
/* Your styles here */
</style>
