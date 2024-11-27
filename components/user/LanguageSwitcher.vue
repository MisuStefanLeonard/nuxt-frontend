<template>
    <v-menu location="top" class="d-xs-none">
        <template v-slot:activator="{props} ">
            <v-btn v-bind="props" variant="flat" density="compact"  size="50" class="bg-grey-lighten-3 mr-2">
                <div v-if="getCurrentLocaleProps !== 'empty'">
                    <img :src="`/${getCurrentLocaleProps.code}.png`" 
                    :alt="`${getCurrentLocaleProps.code}`"
                    width="40"
                    height="30">
                   
                </div>
                
            </v-btn>
        </template>
        <v-list>
            <v-list-item
            v-for="(currLocale,index) in parseLocales" 
            :key="index"
            @click="switchLanguage(currLocale.code.toLowerCase())">
                <v-list-item-title>
                    <img 
                    :src="`/${currLocale.code}.png`" 
                    :alt="`Limba ${currLocale.code}`"
                    width="40"
                    height="30">
                    {{ currLocale.language}}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
  
  <script setup>
  import { useI18n } from 'vue-i18n';

  const { locale , locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath()

  const parseLocales = computed(() => {
    let parsedLocales = []
    locales.value.forEach(local => {
        parsedLocales.push({
            language : local.code.toUpperCase(),
            code : local.code.toUpperCase()
        })
    })
    return parsedLocales
  })

  const getCurrentLocaleProps = computed(() => {
    console.log(locale.value)
    const currentLocaleProps  = locales.value.find(lang => lang.code.toUpperCase() === locale.value.toUpperCase())
    console.log(currentLocaleProps)
    if(currentLocaleProps !== undefined){
        currentLocaleProps.language = currentLocaleProps.name
        currentLocaleProps.code = currentLocaleProps.code.toUpperCase()
        return currentLocaleProps
    }
    return 'empty'
  })


  const switchLanguage = (code) => {
    const currLocale = locale.value;
    if(currLocale !== code){
        console.log(code)
        navigateTo(switchLocalePath(code))
        useCookie('i18n_redirected').value = code
    }
    
  };
  </script>
  
  

  