<template>
    <div>
        <v-empty-state
            :headline="errorShown.headline"
            :title="errorShown.title"
            :text="errorShown.text"
            image="/LogoTexx.png"
        ></v-empty-state>
    </div>
   
</template>


<script setup>

const route = useRoute()
const errorCode  = parseInt(route.params.errorCode)
const {t} = useI18n();
const errorShown =  ref({
    headline : '',
    title : '',
    text : ''
})

useHead({
    title : errorCode
})

const errorInfo = ref([
    {
        id:404 ,headline : t('errorPage.404.headline') , 
        title : t('errorPage.404.title'),
        text : t('errorPage.404.text')
    },
    {
        id:400 ,headline : t('errorPage.400.headline') , 
        title : t('errorPage.400.title'),
        text : t('errorPage.400.text')
    },
    {
        id:500 ,headline : t('errorPage.500.headline') , 
        title : t('errorPage.500.title'),
        text : t('errorPage.500.text')
    },
])

const findErrorCode = (() => {
    const error = errorInfo.value.find(v => v.id === errorCode)
    errorShown.value = error;
})

onMounted(() => {
    findErrorCode()
})

</script>