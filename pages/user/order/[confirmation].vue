<template>
    <v-sheet class="text-center  p-2 m-2" color="bg-grey-lighten-1">
        <p class="h5 text-center font-weight-thin">{{ $t('orderConfirmationPage.title') }}</p>
        <v-divider opacity="0"></v-divider>
        <v-card class="elevation-24 m-1 p-2 bg-grey-lighten-1 font-weight-thin ">
   
            <v-card-text class="text-center ">
                <span class="h5 text-center font-weight-thin">{{ $t('orderConfirmationPage.cardTitle') }} <b>#{{ orderId }}</b> {{ $t('orderConfirmationPage.wasPlaced') }}</span>
                <br>
                <span class="h5 font-weight-thin">{{ $t('orderConfirmationPage.emailSentWithOrderDetails') }}</span>
                <br>
                <span v-if="useCookie('userLoggedIn') === 1" class="h5 font-weight-thin">{{ $t('orderConfirmationPage.seeOrderDetails') }}</span>
                <br>
                <span class="h5 font-weight-thin mb-2">{{ $t('orderConfirmationPage.canLeavePage') }}</span>
                <br>
                <span class="h5 font-weight-thin"> {{ $t('orderConfirmationPage.thankYou') }}</span>
                <br>
                <v-icon size="24" :icon="mdiEmoticonHappyOutline"></v-icon>
                <br>
                <br>
                <span class="h5 font-weight-normal "> {{ $t('orderConfirmationPage.checkMail') }}</span>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script setup>
import { mdiEmoticonHappyOutline } from '@mdi/js'
import orderService from '~/services/Order'


definePageMeta({
  title : 'Confirmare comanda',
  layout: 'default',
  keywords:'confirmare comanda , order confirmation',
  siteName : 'Takdecor - Confirmare',
})

useHead({
  title : 'Confirmare comanda'
})
// 
const route = useRoute()
const orderId = route.query.i || 'empty'
// /user/order/[confid]?params
const confirmationId = route.params.confirmation || 'empty'
const localePath = useLocalePath();
const {t} = useI18n()
const swal = useNuxtApp().$swal

const getConfPage = (async () => {
    const response = await orderService.getConfirmationPage(orderId , confirmationId);
    if(response === 1){
        console.log('ok')
    }else if(response === 0){
        swal.fire({
            position : 'top-end',
            title : t('sweetAlert2.Attention'),
            text : t('sweetAlert2.AlreadyVisited'),
            timer : 2000
        })
        setTimeout(() => {
            navigateTo(localePath('/home'))
        }, 2000);
    }else{
        swal.fire({
            position : 'top-end',
            title : t('sweetAlert2.Error'),
            text : t('sweetAlert2.Error'),
            timer : 2000
        })
        setTimeout(() => {
            navigateTo(localePath('/home'))
        }, 2000);
    }
})

onMounted(async() => {
    console.log(orderId , confirmationId);
    if(orderId === 'empty' || confirmationId === 'empty'){
        navigateTo(localePath('/user/logout'))
    }
    await getConfPage();
})


</script>