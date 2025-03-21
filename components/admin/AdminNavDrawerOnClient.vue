<template>
    <div v-if="type === 'client'">
        <v-navigation-drawer 
            color="grey-darken-4"
            expand-on-hover
            rail
            app
            permanent
        >
            <v-list>
                <v-list-item v-for="item in navDataClient" 
                :key="item.title"
                :title="item.title"
                :prepend-icon=item.icon
                :subtitle="item.subtitle"
                @click="item.route === null ? '' : navigateTo(item.route)"
                >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
    <div v-else>
        <v-navigation-drawer 
            color="grey-darken-4"
            expand-on-hover
            app
            permanent
        >
            <v-list>
                <v-list-item v-for="item in navDataProduct" 
                :key="item.title"
                :title="item.title"
                :prepend-icon=item.icon
                :subtitle="item.subtitle"
                @click="item.route === null ? '' : navigateTo(item.route)"
                >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>


<script setup>
import { mdiAccountCircleOutline, mdiAlphaDBoxOutline, mdiCardAccountDetailsOutline, mdiCartOutline, mdiCog, mdiFormatColorFill, mdiMapMarkerOutline, mdiPen, mdiPlus, mdiShape } from '@mdi/js';


const props = defineProps({
    emailDto: String,
    productCode : String,
    encodedIdAccountDto: String,
    accountData: Object,
    type: String
})



const navDataClient = computed(() => [
    {
        title: 'Administrare' ,
        icon: mdiAccountCircleOutline,
        subtitle: props.emailDto,
        route: null
    },
    {
        title: 'Date personale' ,
        icon:mdiCardAccountDetailsOutline , 
        subtitle:'',
        route: `/admin/client/${props.encodedIdAccountDto}/data`
    },
    {
        title: 'Adrese' ,
        icon:mdiMapMarkerOutline , 
        subtitle:'',
        route: `/admin/client/${props.encodedIdAccountDto}/addresses`
    },
    {
        title: 'Comenzi' ,
        icon:mdiCartOutline , 
        subtitle:'',
        route: `/admin/client/${props.encodedIdAccountDto}/orders`
    },
  ])

  const navDataProduct = computed(() => [
  {
        title:  props.productCode !== 'ADAUGARE PRODUS' ? 'Modificare produs' :  'Aduagare produs',
        icon: props.productCode !== 'ADAUGARE PRODUS' ? mdiPen : mdiPlus,
        subtitle: '',
        route : null
    },
    {
        title: 'Caracteristici generale' ,
        icon: mdiCog,
        subtitle: props.productCode !== 'ADAUGARE PRODUS' ? props.productCode : '',
        route : props.productCode !== 'ADAUGARE PRODUS' ? `/admin/product/${props.productCode}?general=1` : '/admin/product/add?general=1'
    },
    {
        title: 'Categorii' ,
        icon:mdiShape , 
        subtitle:'',
        route :  props.productCode !== 'ADAUGARE PRODUS' ?  `/admin/product/${props.productCode}?category=1` : '/admin/product/add?category=1'
    },
    {
        title: 'Dimensiuni' ,
        icon:mdiAlphaDBoxOutline , 
        subtitle:'',
        route : props.productCode !== 'ADAUGARE PRODUS' ?  `/admin/product/${props.productCode}?dimension=1` : '/admin/product/add?dimension=1'
    },
    {
        title: 'Culori' ,
        icon:mdiFormatColorFill , 
        subtitle:'',
        route : props.productCode !== 'ADAUGARE PRODUS' ?  `/admin/product/${props.productCode}?color=1` : '/admin/product/add?color=1'

    },
   
  ])

</script>