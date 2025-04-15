<template>
    <div >
        <div class=" text-center">
          <v-alert density="compact" color="red-darken-4" variant="flat" v-if="showFreeDeliveryBanner">
            <span class="font-weight-thin h5"> <v-icon class="mx-2"  :icon="mdiTruck" size="24"></v-icon>{{$t('homePage.orderOver1')}} {{ getMinOrderPriceForFreeDelivery }} {{ selectedCurrency === 'RON' ? 'RON' : 'EUR'  }} {{$t('homePage.orderOver2')}}</span>
          </v-alert>
          <v-carousel height="auto" hide-delimiters show-arrows="hover" >
            <v-carousel-item v-for="img in carouselImgs" 
              :key="img"
              :src="img"
              :aspect-ratio="height !== true ? 10 / 4 : 4/ 3"
              cover
            >
            <div class="d-flex justify-center align-center fill-height text-black text-h6 font-weight-thin elevation-24">
              <v-row>
                <v-col cols="12" >
                <span class="font-weight-light h1">{{ $t('menu.services').toUpperCase() }}</span>
                </v-col>
              </v-row>
            
            </div>
            </v-carousel-item>
          </v-carousel>
        </div>
        <section class="row elevation-24  bg-grey-lighten-5 elevation-24" id="services">
            <h3 class="text-center pb-2 pt-2  font-weight-light">{{ $t('menu.services').toUpperCase() }} </h3>
            <v-divider opacity="0"></v-divider>
            <v-divider opacity="0"></v-divider>
            <p class="font-weight-light h4 mx-1 p-4">
                <v-icon :icon="mdiArrowRight" size="20"></v-icon>
                {{ $t('servicesPage.text1') }}
            </p>
            <v-divider opacity="0"></v-divider>
            <p class="font-weight-light h4  mx-1 p-4">
                <v-icon :icon="mdiArrowRight" size="20"></v-icon>
                {{ $t('servicesPage.text2') }}
                
            </p>
            <v-divider opacity="0"></v-divider>
            <p class="font-weight-light h4  mx-1 p-4">
                <v-icon :icon="mdiArrowRight" size="20"></v-icon>
                {{ $t('servicesPage.text3') }}
                
            </p>
            <v-divider opacity="0"></v-divider>
            <p class="font-weight-light h4 mx-1 p-4">
                <v-icon :icon="mdiArrowRight" size="20"></v-icon>
                {{ $t('servicesPage.text4') }}
            </p>
        </section>
        <ContactBannerFooter>
        </ContactBannerFooter>
    </div>
</template>

<script setup>
import { mdiArrowRight } from '@mdi/js';
import { useDisplay } from 'vuetify';
import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue';

useHead({
  title : `Servicii`,
  keywords: 'Servicii montaj cuverturi, Draperii personalizate pentru locuințe, Perne decorative la comandă, Decor textil interior la domiciliu, Consultanță perdele acasă, Instalare profesională draperii, Cuverturi livrate și montate, Textile pentru decorarea locuinței, Măsurători perdele la fața locului, Amenajare textilă rezidențială, Stilizare interioară cu textile, Montaj perdele și draperii, Textile elegante pentru dormitor, Consultanță decor la domiciliu, Cuverturi și accesorii de lux, Servicii textile pentru camere rezidențiale, Perdele la comandă cu montaj, Personalizare perne și lenjerii, Instalare galerii de perdele, Decor textil complet pentru casă, Bedspread installation services, Custom drapes for homes, Decorative pillow design services, Personalized textile decor for interiors, Home visit for curtain consultation, Premium curtains installation, Bedspread design and delivery, Home decor textile services, On-site drapery measurement, Residential textile decoration, Home styling with textiles, Curtain and drape mounting service, Elegant bedroom textiles, Home visit decor consultations, Luxury bedspreads and accessories, Textile setup for residential interiors, Made-to-measure curtains service, Pillow and bedding customization, Curtain rod installation services, Full-service home textile decor',
  layout: 'default',
  siteName : 'Takdecor - Servicii',
  description : 'Servicii Takdecor - Home decor. Oferim servicii de cea mai inalta calitate, montare de galerii,draperii,perdele cat si solutii de decorare camerei dumnevoastra'
})

useSeoMeta({
  title: 'Servicii',
  ogSiteName : 'Takdecor - Servicii',
  ogType: 'website',
  ogDescription : 'Servicii de montare draperii,galerii,perdele cat si cele mai calitative cuverturi din Romania, marca Reig Marti.',
})

const carouselImgs = ['/cuv1.jpeg','/cuv2.jpeg','/cuv3.jpeg','/cuv4.jpeg','/cuv5.jpeg','/cuv6.jpeg',]
const {name} = useDisplay()
const height = computed(() => {
    switch (name.value) {
      case 'xs': return true
      default : return 3
    }
})

</script>
