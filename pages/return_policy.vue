<template>
    <div>
        <div class="text-center ">
            <p class="font-weight-thin h5">{{ $t('returnPolicy.title') }}</p>
        </div>
        <v-divider opacity="0"></v-divider>
        <section>
            <v-card class="font-weight-light text-left m-4 p-2 elevation-24">
                <v-card-text>
                    <p><v-icon :icon="mdiArrowRight">{{ $t('returnPolicy.text') }}</v-icon></p>
                    <p><v-icon :icon="mdiArrowRight">{{ $t('returnPolicy.text2') }}</v-icon></p>
                </v-card-text>
            </v-card>
        </section>
    </div>
</template>

<script setup>
import { mdiArrowRight } from '@mdi/js'
useHead({
    title : 'Politica de retur'
})
</script>