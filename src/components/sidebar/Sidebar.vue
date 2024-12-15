<template>
  <div class="h-screen flex flex-col justify-center p-1">
    <div class="h-full bg-pastel-black text-white flex flex-col w-64 rounded-[10px]">
      <div class="p-4 h-[65px] text-2xl font-bold border-b-2 border-[#111111]">
     
      </div>
      <nav class="flex-1 p-2">
        <ul>
          <li v-for="item in menuItems" :key="item.name" class="mb-2">
            <router-link 
              :to="item.path" 
              class="flex items-center p-2 rounded-[10px] text-lg"
              :class="{
                'hover:bg-[#d4d4d4] text-white hover:text-black': !isActive(item.path),
                'bg-[#ffff] text-black': isActive(item.path)
              }">
              <Icon :icon="item.icon" class="w-7 h-7 mr-2" />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';

const menuItems = reactive([
  { name: 'User', icon: 'mdi:home', path: '/UserTable' },
  { name: 'Student List', icon: 'ph:student-bold', path: '/StudentList' },
  { name: 'History', icon: 'mdi:chart-bar', path: '/HistoryTable' },
  { name: 'Assets', icon:'catppuccin:folder-assets', path: '/Assets' },
  // { name: 'AQ Readings', icon: 'mdi:home', path: '/LatestAQ' },
]);

const route = useRoute();

const isActive = (path) => route.path === path;
</script>

<style scoped>

</style>
