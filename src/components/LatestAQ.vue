<template>
    <h2 class="flex bg-[#242426] h-[65px] items-center p-5 font-semibold text-white text-lg rounded-xl">AQ Readings</h2>
    
    <div class="flex justify-center mt-10 p-10">
        <table class="table">
            <thead class="">
                <tr class="tableHeaderContainer">
                    <th class="tableHeader">ID</th>
                    <th class="tableHeader">Name</th>
                    <th class="tableHeader">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" class="tableRow">
                    <td class="tableData">{{ user.id }}</td>
                    <td class="tableData">{{ user.name }}</td>
                    <td class="tableData">{{ user.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    
    // Dummy data for the table
    const users = ref([
      { id: 1, name: 'Ivor Cruz', email: 'Ivor@example.com' },
      { id: 2, name: 'janromil Erispe', email: 'Janromil@example.com' },
      { id: 3, name: 'Alice Johnson', email: 'alicej@example.com' },
      { id: 4, name: 'Bob Brown', email: 'bobbrown@example.com' },
      { id: 5, name: 'Charlie Adams', email: 'charlieadams@example.com' },
    ]);
    
    </script>