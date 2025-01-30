<template>
    <div class="background-wrapper">
        <div class="background"></div>
        <div class="content">
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
        
            <div class="">
                <p class="h3 font-weight-light text-center p-3">Istoric comenzi</p>
                <v-container fluid v-if="emptyOrdersList" >
                    <v-card class="bg-grey-darken-4 my-2 rounded-xl elevation-12">
                        <v-card-title class="text-center">
                            <v-icon class="mx-2">
                                mdi-truck-fast
                            </v-icon>
                            Nu aveti nicio comanda
                        </v-card-title>
                    </v-card>
                </v-container>
            </div>   
        </div>  
    </div>
</template>



<script setup>

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})

const emptyOrdersList = ref([])

</script>


<style scoped>
.background-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
 
  overflow: auto;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/assets/background.jpeg);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
}

.content {
  position: relative;
  z-index: 1;
  padding: 20px;
  
  max-width: 1000px;
  width: 100%;
}
</style>