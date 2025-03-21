<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar app color="blue-grey-darken-4">
      <v-btn icon @click="toggleSidebar">
        <v-icon :icon="mdiMenu"></v-icon>
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
            <v-icon  :icon="item.icon">
            </v-icon>
            {{ item.title }}

            <v-expand-transition v-if="isHovering">
              <v-list right  v-if="item.dropdown.length > 0 ">
                <v-list-item
                  v-for="dropdownItem in item.dropdown"
                  :key="dropdownItem.title"
                  :to="dropdownItem.path"
                >
                  <v-icon :icon=" dropdownItem.icon">
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
import { mdiAccount, mdiCarShiftPattern, mdiCart, mdiCogOutline, mdiHome, mdiMenu, mdiMonitorDashboard, mdiShopping, mdiTicketPercent } from '@mdi/js';
import { ref } from 'vue';

const sidebar = ref(false);

const navAdminItems = ref([
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: mdiMonitorDashboard,
    dropdown: []
  },
  {
    title: 'Produse',
    path: '/admin/products',
    icon: mdiCart,
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
    icon: mdiTicketPercent,
    dropdown: []
  },
  {
    title: 'Clienti',
    path: '/admin/clienti',
    icon: mdiAccount,
    dropdown: []
  },
  {
    title: 'Comenzi',
    path: '/admin/orders',
    icon: mdiShopping,
    dropdown: []
  },
  {
    title: 'Manopere',
    path: '/admin/manopere',
    icon: mdiCarShiftPattern,
    dropdown: []
  },
  {
    title: 'General',
    path: '/admin/general',
    icon: mdiCogOutline,
    dropdown: []
  },
  {
    title: 'Acasa',
    path: '/home',
    icon: mdiHome,
    dropdown: []
  },
]);

const toggleSidebar = () => {
  sidebar.value = !sidebar.value;
};
</script>
