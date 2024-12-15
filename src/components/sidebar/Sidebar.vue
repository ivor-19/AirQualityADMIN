<template>
  <div class="h-screen bg-[#242426] text-white flex flex-col w-64">
    <div class="p-4 h-[65px] text-2xl font-bold border-b-2 border-[#111111]">
      Dashboard
    </div>
    <nav class="flex-1 p-2">
      <ul>
        <li v-for="item in menuItems" :key="item.name" class="mb-2">
          <router-link :to="item.path" class="flex items-center p-2 rounded-xl hover:bg-[#1ED760] text-white hover:text-black text-lg font-semibold">
            <Icon :icon="item.icon" class="w-7 h-7 mr-2" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';

// Define the menu items and their corresponding icons
const menuItems = reactive([
  { name: 'User', icon: 'mdi:home', path: '/UserTable' },
  { name: 'Student List', icon: 'ph:student-bold', path: '/StudentList' },
  { name: 'History', icon: 'mdi:chart-bar', path: '/HistoryTable' },
  { name: 'Assets', icon:'catppuccin:folder-assets', path: '/Assets' },
  { name: 'AQ Readings', icon: 'mdi:home', path: '/LatestAQ' },
]);
</script>

<style scoped>
/* Add any scoped CSS if necessary */
</style>
