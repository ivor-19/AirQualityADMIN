
<template>
   <div class="flex">
     <Sidebar />
     <div class="flex-1 bg-[#fafafa] p-4">
       <router-view />
     </div>
   </div>
 </template>

<script setup>
import Sidebar from './components/sidebar/Sidebar.vue';
</script>

