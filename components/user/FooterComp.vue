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
    <div class="pt-0">
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
    </div>
   
    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Calories Tracker</strong>
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
