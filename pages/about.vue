<template>
    <div class="m-auto">
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
                <span class="font-weight-light h1">{{ $t('menu.about').toUpperCase() }}</span>
                </v-col>
              </v-row>
            
            </div>
            </v-carousel-item>
          </v-carousel>
        </div>
        <section class="row elevation-24 p-4  rounded bg-grey-lighten-5" id="about-us-info">
          <h3 class="text-center pb-2 pt-2  font-weight-thin">{{ $t('aboutUsPage.text1') }} </h3>
          <h4 class="text-center font-weight-normal my-3">
            {{ $t('aboutUsPage.text2') }}
          </h4>
          <v-divider opacity="0"></v-divider>
          <v-divider opacity="0"></v-divider>
          <v-divider opacity="0"></v-divider>
          <v-divider opacity="0"></v-divider>

          <v-row>
            <v-col cols="12" md="6" sm="12" xs="12">
              <div class="d-flex justify-center align-center fill-height text-black text-h6 font-weight-thin">
                <v-img src="/cuv4.jpeg" class="rounded-xl"
                :aspect-ratio="height !== true ? 10 / 6 : 4/ 3"
                cover>

                </v-img>
              </div>
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <div class="d-flex justify-center align-center fill-height text-black text-h6 font-weight-thin">
                <span class="font-weight-thin text-center">
                  {{ $t('aboutUsPage.text3') }}
                </span>
              </div>
             
            </v-col>
          </v-row>
          <v-divider opacity="0"></v-divider>
          <v-divider opacity="0"></v-divider>
          <v-divider opacity="0"></v-divider>
          <v-divider opacity="0"></v-divider>
          <v-divider opacity="0"></v-divider>

          <v-row>
              <v-col cols="12" md="6" sm="12" xs="12">
              <div class="d-flex justify-center align-center fill-height text-black text-h6 font-weight-thin">
                <v-row>
                  <v-col cols="12">
                    <p class="text-center">
                      {{ $t('aboutUsPage.text4') }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <p  class="text-center">
                      {{ $t('aboutUsPage.text5') }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <p  class="text-center">
                      {{ $t('aboutUsPage.text6') }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <p  class="text-center">
                      {{ $t('aboutUsPage.text7') }}
                    </p>
                  </v-col>
                </v-row>
              </div>
              </v-col>
              <v-col cols="12" md="6" sm="12" xs="12">
                <div class="d-flex justify-center align-center fill-height text-black text-h6 font-weight-thin">
                  <v-img src="/cuv5.jpeg" class="rounded-xl"
                  :aspect-ratio="height !== true ? 10 / 6 : 4/ 3"
                  cover>

                  </v-img>
                </div>
              </v-col>
          </v-row>
        </section>
        <ContactBannerFooter>
        </ContactBannerFooter>
    </div>
</template>



<script setup>
import { useDisplay } from 'vuetify';
import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue';
definePageMeta({
  title : `Takdecor - Despre noi`,
  keywords: [
    // **Romanian Keywords**
  'despre noi magazin textile casă',
  'firma producătoare de perdele și draperii',
  'despre brandul nostru de textile casă',
  'cine suntem și ce oferim',
  'despre compania noastră de cuverturi și perne',
  'experiență în producția de textile pentru casă',
  'valori și misiune în industria textilelor',
  'producător perdele și draperii de calitate',
  'istoria companiei noastre',
  'cumpără perdele direct de la producător',
  'companie specializată în textile premium',
  'despre noi cuverturi și perne de lux',
  'perdele și draperii fabricate cu pasiune',
  'calitate și tradiție în textile pentru casă',
  'fabricăm cuverturi și perne de înaltă calitate',
  'lideri în industria textilelor de casă',
  'despre noi  perdele și draperii personalizate',
  'angajamentul nostru față de calitate',
  'producător românesc de perdele și draperii',
  'despre brandul nostru premium de textile',
  'echipa noastră și viziunea brandului',
  'inovație și design în textile pentru casă',
  'despre noi  expertiză în textile decorative',
  'descoperă istoria brandului nostru',
  'textile casă create cu atenție la detalii',
  'companie de încredere pentru perdele și cuverturi',
  'perne și cuverturi pentru un confort suprem',
  'despre noi  magazin de perdele și perne online',
  'cine suntem și de ce ne aleg clienții',
  'firma noastră  specialiști în textile pentru casă',
  'tradiție și calitate în perdele și draperii',
  'de ce să alegi perdelele noastre?',
  'despre noi  experiență de peste X ani',
  'textile casă premium, direct de la producător',
  'despre noi  misiunea și valorile noastre',
  'colaborăm cu cei mai buni producători de textile',
  'ce ne diferențiază în industria textilelor de casă',
  'pasiunea noastră pentru design și confort',
  'servicii personalizate pentru perdele și draperii',
  'fabricăm textile de casă sustenabile și elegante',

  // **English Keywords**
  'about us home textiles company',
  'curtains and drapes manufacturer',
  'about our home textiles brand',
  'who we are and what we offer',
  'about our bedding and pillow company',
  'experience in home textiles production',
  'values and mission in the textile industry',
  'quality curtains and drapes manufacturer',
  'our company history',
  'buy curtains directly from the manufacturer',
  'specialized home textiles company',
  'about us  premium bedding and pillows',
  'curtains and drapes made with passion',
  'tradition and quality in home textiles',
  'we manufacture high-quality bedding and pillows',
  'leaders in the home textile industry',
  'about us  custom-made curtains and drapes',
  'our commitment to quality',
  'Romanian manufacturer of curtains and drapes',
  'about our premium home textile brand',
  'our team and brand vision',
  'innovation and design in home textiles',
  'about us  expertise in decorative textiles',
  'discover the story behind our brand',
  'home textiles crafted with attention to detail',
  'trusted company for curtains and bedding',
  'pillows and bedspreads for ultimate comfort',
  'about us  online store for curtains and pillows',
  'who we are and why customers choose us',
  'our company  home textiles specialists',
  'tradition and quality in curtains and drapes',
  'why choose our curtains?',
  'about us  over X years of experience',
  'premium home textiles directly from the manufacturer',
  'about us  our mission and values',
  'we collaborate with top home textile producers',
  'what makes us different in the home textile industry',
  'our passion for design and comfort',
  'personalized services for curtains and drapes',
  'we manufacture sustainable and elegant home textiles'
  ],
  layout: 'default',
  description : 'Paseste pe texx pentru ati gasii perdeaua si draperia perfecta pentru casa ta'
})

useHead({
    title: 'Despre noi'
})

useSeoMeta({
  title : `Takdecor - Despre noi`,
  ogSiteName : 'Takdecor - Despre noi',
  ogType : 'website',
  ogDescription : 'Paseste pe texx pentru ati gasii perdeaua perfecta pentru casa ta',
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

