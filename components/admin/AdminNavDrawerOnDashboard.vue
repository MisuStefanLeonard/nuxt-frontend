<template>
</template>
<!-- <template>
    <div>
        <v-navigation-drawer
            color="grey-darken-4"
            expand-on-hover
            rail
            
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


const navData = computed(() => [
    {
        title: 'Informatii generale' ,
        icon:'mdi-information' , 
        subtitle:'',
        route: `/admin/dashboard`
    },
    {
        title: 'Informatii periodice' ,
        icon:'mdi-calendar' , 
        subtitle:'',
        route: `/admin/dateInformation`
    },
  ])

</script> -->