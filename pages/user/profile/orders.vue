<template>
    <div>
        <div class="background"></div>
        <div class="background-wrapper">
            <v-container class="content">
                <v-breadcrumbs divider="-">
                    <v-breadcrumbs-item :to="'/user/profile'"><p class="font-weight-bold h6">PROFIL</p> </v-breadcrumbs-item>
                    <v-breadcrumbs-divider><p class="font-weight-bold h6">/</p></v-breadcrumbs-divider>
                    <v-breadcrumbs-item disabled><p class="font-weight-bold h6">COMENZI</p></v-breadcrumbs-item>
                </v-breadcrumbs>
                <v-alert v-if="infoAlert" v-model="infoAlert" type="info" closable>
                    {{ infoAlertText }}
                </v-alert>
                <v-alert v-if="errorWhenFetchingDataAlert" v-model="errorWhenFetchingDataAlert" type="info" closable>
                    {{ errorWhenFetchingDataAlertText }}
                </v-alert>
            </v-container>
            <v-container class="d-block text-center">
                <p class="h3 font-weight-light text-center p-3">Istoric comenzi</p>
                <v-container v-if="emptyOrdersList" class="justify-center">
                    <v-card class="bg-grey-darken-4 my-2 rounded-xl ">
                        <v-card-title>
                            <v-icon>
                                mdi-truck-fast
                            </v-icon>
                            Nu aveti nicio comanda efectuata
                        </v-card-title>
                        <v-card-text>
                            {{ emptyOrdersListText }}
                        </v-card-text>
                    </v-card>
                </v-container>
                <v-container class="d-block w-sm-75 w-lg-75 h-75">
                    
                </v-container>
            </v-container>     
        </div>
    </div>
</template>



<script setup>

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})

</script>