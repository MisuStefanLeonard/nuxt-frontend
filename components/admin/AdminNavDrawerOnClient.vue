<template>
    <div>
        <v-navigation-drawer
            color="grey-darken-4"
            expand-on-hover
            rail
            app
            permanent
        >
            <v-list>
                <v-list-item v-for="item in navData" 
                :key="item.title"
                :title="item.title"
                :prepend-icon='item.icon'
                :subtitle="item.subtitle"
                @click="item.route === null ? '' : navigateTo(item.route)"
                >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>


<script setup>

const props = defineProps({
    emailDto: String,
    encodedIdAccountDto: String,
    accountData: Object,
})



const navData = computed(() => [
    {
        title: 'Administrare' ,
        icon: 'mdi-account-circle-outline',
        subtitle: props.emailDto,
        route: null
    },
    {
        title: 'Date personale' ,
        icon:'mdi-card-account-details-outline' , 
        subtitle:'',
        route: `/admin/client/${props.encodedIdAccountDto}/data`
    },
    {
        title: 'Adrese' ,
        icon:'mdi-map-marker-outline' , 
        subtitle:'',
        route: `/admin/client/${props.encodedIdAccountDto}/addresses`
    },
    {
        title: 'Comenzi' ,
        icon:'mdi-cart-outline' , 
        subtitle:'',
        route: `/admin/client/${props.encodedIdAccountDto}/orders`
    },
  ])

</script>