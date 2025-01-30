<template>
  <div>
   <v-footer
    class="bg-indigo-lighten-1 text-center d-flex flex-column"
    
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" xs="12" sm="4">
        <p class="h4">Texx.ro</p>
        <p class="h6 font-weight-light">Termeni si conditii</p>
        <p class="h6 font-weight-light">Despre noi</p>
        <p class="h6 font-weight-light">Prelucrare datelor cu caracter personal</p>
        <p class="h6 font-weight-light">Politica de utlizare a cookie-uri</p>
        <p class="h6 font-weight-light">Protectia consumatorului</p>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <p class="h4">Suport clienti</p>
        <p class="h6 font-weight-light">Contacteaza-ne</p>
        <p class="h6 font-weight-light">Livrare comenzi</p>
      </v-col>
      <v-col cols="12" xs="12" sm="4">
        <p class="h4">Informatii</p>
        <p class="h6 font-weight-light">Adresa: </p>
        <p class="h6 font-weight-light"><v-icon class="mr-2">mdi-phone</v-icon>07xxxxxxx</p>
      </v-col>
    </v-row>
    <!-- <div class="pt-0">
         <a href="#frequent" style="color:white;"
         class="text-decoration-none">FAQ</a>
    </div>
    <div class="pt-2">
        <a href="#welcome" style="color:white;"
        class="text-decoration-none">Welcome</a>
    </div>
    <div class="pt-2">
        <a href="#getstarted" style="color:white;"
        class="text-decoration-none">Get started</a>
    </div> -->

   
    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Texx</strong>
    </div>
  </v-footer>
</div>
</template>


<script>


export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
    name: 'FooterComp'
    
}
</script>
