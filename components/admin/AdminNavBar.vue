<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar app color="blue-grey-darken-4">
      <v-btn icon @click="toggleSidebar">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>Admin Panel</v-toolbar-title>
    </v-toolbar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="sidebar" app color="blue-grey-darken-4" temporary>
      <img src="../../assets/LogoTexx.png" alt="Logo" height="100" class="mr-1" />

      <v-list center>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item
            v-bind="item.dropdown.length > 0 ? props : {}"
            v-for="item in navAdminItems"
            :key="item.title"
            :to="item.path"
          >
            <v-icon>
              {{ item.icon }}
            </v-icon>
            {{ item.title }}

            <v-expand-transition v-if="isHovering">
              <v-list right  v-if="item.dropdown.length > 0 ">
                <v-list-item
                  v-for="dropdownItem in item.dropdown"
                  :key="dropdownItem.title"
                  :to="dropdownItem.path"
                >
                  <v-icon>
                    {{ dropdownItem.icon }}
                  </v-icon>
                  {{ dropdownItem.title }}
                </v-list-item>
              </v-list>
            </v-expand-transition>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sidebar = ref(false);

const navAdminItems = ref([
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'mdi-monitor-dashboard',
    dropdown: []
  },
  {
    title: 'Produse',
    path: '/admin/products',
    icon: 'mdi-cart',
    dropdown: [
      { title: 'Inele', path: '/admin/inele', icon: '' },
      { title: 'Cusaturi', path: '/admin/tipuri_galerie', icon: '' },
      { title: 'Cusaturi linie', path: '/admin/tipuri_linie', icon: '' },
      { title: 'Seturi produse', path: '/admin/seturi', icon: '' }
    ]
  },
  {
    title: 'Vouchere',
    path: '/admin/vouchere',
    icon: 'mdi-ticket-percent',
    dropdown: []
  },
  {
    title: 'Clienti',
    path: '/admin/clienti',
    icon: 'mdi-account',
    dropdown: []
  },
  {
    title: 'Comenzi',
    path: '/admin/orders',
    icon: 'mdi-shopping',
    dropdown: []
  },
  {
    title: 'Manopere',
    path: '/admin/manopere',
    icon: 'mdi-car-shift-pattern',
    dropdown: []
  },
  {
    title: 'General',
    path: '/admin/general',
    icon: 'mdi-cog-outline',
    dropdown: []
  }
]);

const toggleSidebar = () => {
  sidebar.value = !sidebar.value;
};
</script>
