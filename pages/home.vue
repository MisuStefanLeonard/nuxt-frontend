<template>
  <v-container fluid class="m-auto pb-6">
    <v-container class="row shadow-lg p-3 mb-2 rounded bg-deep-purple-lighten-4" id="welcome">
      <h2 class="text-center pb-2 pt-2">Welcome</h2>
      <p class="text-justify">
        Welcome to your calorie tracker program. Here you can keep track of your daily intake of calories, proteins, fats, sugars, and carbohydrates.
      </p>
      <p class="text-justify">
        You can also see previous days' records, check if you reached your daily intake goals, and add foods based on their weight.
      </p>
      <p class="text-justify">
        Additionally, you can register an account to keep all your data securely accessible via login.
      </p>
    </v-container>
    
    <v-container class="row shadow-lg p-3 mb-2 bg-deep-purple-lighten-4 rounded" id="getstarted">
      <h2 class="text-center pb-2 pt-2">Get started</h2>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <nuxt-link to="/user/register" class="link-primary text-left">
              <v-btn variant="outlined" density="comfortable" size="large">Create an account</v-btn>
            </nuxt-link>
          </v-col>
          <v-col cols="auto">
            <nuxt-link to="/user/login" class="link-primary text-left">
              <v-btn variant="outlined" density="comfortable" size="large">Log in</v-btn>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    
    <v-container class="shadow-lg p-3 mb-2 bg-deep-purple-lighten-4 rounded" id="frequent">
      <h2 class="text-center pb-2 pt-2">Frequent questions</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto" variant="tonal">
            <v-card-item>
              <v-card-title class="font-weight-black bg-deep-purple-lighten-3">How do I create an account?</v-card-title>
              <v-card-text class="bg-surface-light pt-4">
                It's very easy to create an account on our platform. Click this <nuxt-link to="/user/register" class="link-primary">link</nuxt-link>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto" variant="tonal">
            <v-card-item>
              <v-card-title class="font-weight-black bg-deep-purple-lighten-3">How do I create an account?</v-card-title>
              <v-card-text class="bg-surface-light pt-4">
                It's very easy to create an account on our platform. Click this <nuxt-link to="/user/register" class="link-primary">link</nuxt-link>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto" variant="tonal">
            <v-card-item>
              <v-card-title class="font-weight-black bg-deep-purple-lighten-3">How do I create an account?</v-card-title>
              <v-card-text class="bg-surface-light pt-4">
                It's very easy to create an account on our platform. Click this <nuxt-link to="/user/register" class="link-primary">link</nuxt-link>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
definePageMeta({
  title : 'Acasa',
  layout: 'default'
})
</script>
