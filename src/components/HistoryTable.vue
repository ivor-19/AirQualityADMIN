<template>

<!-- Loading screen and toast message -->
<Loader v-if="showLoading" class="loading"></Loader>
<Toast></Toast>

<div class="bg-pastel-black h-12 flex flex-col justify-center px-2">
    <h2 class="font-semibold text-white text-[16px]">History</h2>
</div>
    
<div class="flex justify-center mt-5 px-10 pt-5">
    <table class="table">
        <thead>
            <tr class="tableHeaderContainer">
                <th class="tableHeader hidden">ID</th>
                <th class="tableHeader">Date</th>
                <th class="tableHeader">Timestamp</th>
                <th class="tableHeader">Aqi</th>
                <th class="tableHeader">pm2_5</th>
                <th class="tableHeader">Co</th>
                <th class="tableHeader">no2</th>
                <th class="tableHeader" style="width: 600px;">Message</th>
            </tr>
        </thead>
        <tbody>
            <td v-if="historyList.length === 0" colspan="8" class="text-center text-gray-500 w-full">
                <div class="my-10">Empty list</div>
            </td> 
            <tr v-for="history in historyList" :key="history._id" class="tableRow">
                <td class="tableData hidden">{{ history._id }}</td>
                <td class="tableData">{{ history.date }}</td>
                <td class="tableData">{{ history.timestamp }}</td>
                <td class="tableData">{{ history.aqi }}</td>
                <td class="tableData">{{ history.pm2_5 }}</td>
                <td class="tableData">{{ history.co }}</td>
                <td class="tableData">{{ history.no2 }}</td>
                <td class="tableData" style="width: 600px;">{{ history.message }}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<script setup>
import Loader from '@/components/alerts/Loading.vue';
import Toast from '@/components/alerts/Toast.vue';
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const showLoading = computed(() => store.state.showLoading.state);
const historyList = computed(() => store.state.history.data);
// const currentPage = computed(() => store.state.currentPage);
// const totalPages = computed(() => store.state.totalPages);

/******************************************************************
FUNCTION FOR GETTING HSITORY
******************************************************************/
// Function for getting History list
async function getHistory() {
    await store.dispatch('getHistory', {
        // currentPage: currentPage.value, // Pass as part of an object
    });
}

/******************************************************************
PAGINATION
******************************************************************/
// function goToPreviousPage() {
//     if (currentPage.value > 1) {
//         store.commit('setCurrentPage', currentPage.value - 1);
//         getRequest();
//     }
// }

// function goToNextPage() {
//     if (currentPage.value < totalPages.value) {
//         store.commit('setCurrentPage', currentPage.value + 1);
//         getRequest();
//     }
// }

/******************************************************************
CALL FUNCTIONS ON PAGE LOAD
******************************************************************/
onMounted(() => {
    // store.commit('setCurrentPage', 1);
    getHistory();
})
        
    </script>