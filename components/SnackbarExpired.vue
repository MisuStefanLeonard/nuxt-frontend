<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '~/store/user';

const store = useUserStore()

const snackbar = ref(false);
const message = ref('');
const timeout = ref(5000);
const color = ref('error');

// Watch the Pinia store for changes
watch(
  () => store.snackbarVisible,
  (newVal) => {
    snackbar.value = newVal;
    if (newVal) {
      message.value = store.snackbarMessage;
    }
  }
);
</script>
