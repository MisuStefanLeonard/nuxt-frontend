<template>
    <div fluid class>
      <v-dialog v-model="dialog" persistent max-width="1000">
        <v-card class="pa-4">
          <v-card-title class="text-h5 font-weight-bold text-center">
            🎉 Bine ați venit pe site-ul nostru! 🎉
          </v-card-title>
  
          <v-card-text class="text-body-1 text-center">
            Sunteți client nou pe site? Vrem să vă mulțumim cu un VOUCHER DE 5% REDUCERE la prima comandă! 🎁
          </v-card-text>
  
          <v-divider class="my-2"></v-divider>
  
          <v-card-text class="text-h6 text-center">
            <strong>Cod Voucher: <span class="text-primary">WELCOME5</span></strong>
          </v-card-text>
  
          <v-card-actions class="justify-center">
            <v-btn color="primary" variant="flat" @click="getVoucher()">❌ Închide</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const dialog = ref(false);
  
  onMounted(() => {
    console.log(dialog.value)
    var getVoucherReceived = localStorage.getItem("voucherReceived");
    if(getVoucherReceived !== null && getVoucherReceived === "1"){
        dialog.value = false;
    }else{
        dialog.value = true;
    }
   
  });
  
  const getVoucher =  (() => {
    dialog.value = false;
    localStorage.setItem("voucherReceived" , "1");
  })
 
  </script>
  