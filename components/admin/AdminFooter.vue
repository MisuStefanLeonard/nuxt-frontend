<template>
    <div>
        <v-footer class="bg-blue-grey-darken-4 text-center d-flex flex-column" app>
            <v-row justify="center" no-gutters class="d-block text-center">
                <v-col>
                    Administrare <strong class=""> texx</strong> -
                {{ new Date().getFullYear()}} 
                </v-col>
                <v-col >
                    <p>texx<span class="ml-1">&#169;</span></p>
                </v-col>
            </v-row>
            
        </v-footer>
    </div>
</template>


<script>

export default {
    name: 'AdminFooter',
    data() {
        return {

        }
    }
}

</script>