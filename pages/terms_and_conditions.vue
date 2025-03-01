<template>
    <div>
      <div class="text-center p-2 m-1">
        <p class="font-weight-thin h4">{{ $t('termsAndConditions.title') }}</p>
      </div>
      <v-card class="font-weight-light text-left m-4 p-2 elevation-24">
        <v-card-text>
          <!-- Introduction paragraphs -->
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.intro1') }}</p>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.intro2') }}</p>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.intro3') }}</p>

  
          <!-- Definition / Terminology Section -->
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.terminology') }}</p>
  
          <!-- Cookies Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.cookiesTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.cookiesText1') }}</p>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.cookiesText2') }}</p>

  
          <!-- License Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.licenseTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.licenseText') }}</p>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.youMustNot') }}</p>
          
          <v-list>
            <v-list-item v-for="(item, index) in licenseList" :key="index">
               
                <v-list-item-title>
                    <v-icon :icon="mdiArrowRight" class="mr-2" />
                    {{ item.name }}
                </v-list-item-title>
                
            </v-list-item>
          </v-list>
  
          <!-- Agreement and Comments Section -->
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.agreement') }}</p>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.comments') }}</p>

  
          <!-- Hyperlinking Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.hyperlinkTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.hyperlinkText1') }}</p>

          <v-list>
            <v-list-item v-for="(item, index) in hyperLinkList" :key="index">
               
                <v-list-item-title>
                    <v-icon :icon="mdiArrowRight" class="mr-2" />
                    {{ item.name }}
                </v-list-item-title>
                
            </v-list-item>
          </v-list>

       
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.hyperlinkText2') }}</p>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.hyperlinkText3') }}</p>

          <v-list>
            <v-list-item v-for="(item, index) in hyperLinkList2" :key="index">
               
                <v-list-item-title>
                    <v-icon :icon="mdiArrowRight" class="mr-2" />
                    {{ item.name }}
                </v-list-item-title>
               
            </v-list-item>
          </v-list>
  
          <!-- iFrames Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.iframesTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.iframesText') }}</p>
  
          <!-- Content Liability Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.contentLiabilityTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.contentLiabilityText') }}</p>
  
          <!-- Your Privacy Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.privacyTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.privacyText') }}</p>
  

          <!-- Reservation of Rights Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.reservationTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.reservationText') }}</p>
  

          <!-- Removal of Links Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.removalTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.removalText') }}</p>

  
          <!-- Disclaimer Section -->
          <h4 class="font-weight-bold">{{ $t('termsAndConditions.disclaimerTitle') }}</h4>
          <v-divider></v-divider>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.disclaimerText') }}</p>

          <v-list>
            <v-list-item v-for="(item, index) in disclaimerList" :key="index">
               
                <v-list-item-title>
                    <v-icon :icon="mdiArrowRight" class="mr-2" />
                    {{ item.name }}
                </v-list-item-title>
               
            </v-list-item>
          </v-list>
          <p class="font-weight-light h5" ><v-icon :icon="mdiStarFourPointsSmall"></v-icon>{{ $t('termsAndConditions.disclaimerText') }}</p>
        </v-card-text>
        <v-divider opacity="0"></v-divider>
        <v-card-actions>
          <p class="font-weight-normal h5"><v-icon :icon="mdiExclamation"></v-icon>{{ $t('termsAndConditions.finalNote') }}</p>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  

<script setup>
import { mdiArrowRight, mdiExclamation, mdiStarFourPointsSmall } from '@mdi/js';

useHead({
    title: 'Termeni si conditii'
})
const {t} = useI18n()
const licenseList = ref([
    {name : `${t('termsAndConditions.licenseList.text1')}`},
    {name : `${t('termsAndConditions.licenseList.text2')}`},
    {name : `${t('termsAndConditions.licenseList.text3')}`},
    {name : `${t('termsAndConditions.licenseList.text4')}`},
])

const hyperLinkList = ref([
    {name : `${t('termsAndConditions.hyperlinkList1.text1')}`},
    {name : `${t('termsAndConditions.hyperlinkList1.text2')}`},
    {name : `${t('termsAndConditions.hyperlinkList1.text3')}`},
    {name : `${t('termsAndConditions.hyperlinkList1.text4')}`},
    {name : `${t('termsAndConditions.hyperlinkList1.text5')}`},

])

const hyperLinkList2 = ref([
    {name : `${t('termsAndConditions.hyperlinkList2.text1')}`},
    {name : `${t('termsAndConditions.hyperlinkList2.text2')}`},
    {name : `${t('termsAndConditions.hyperlinkList2.text3')}`},
   
])

const disclaimerList = ref([
    {name : `${t('termsAndConditions.disclaimerList.text1')}`},
    {name : `${t('termsAndConditions.disclaimerList.text2')}`},
    {name : `${t('termsAndConditions.disclaimerList.text3')}`},
    {name : `${t('termsAndConditions.disclaimerList.text4')}`},
])
</script>