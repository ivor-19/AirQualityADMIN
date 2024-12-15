<template>

<!-- Loading screen and toast message -->
<Loader v-if="showLoading" class="loading"></Loader>
<Toast></Toast>

<!-- Modal for adding new assets... -->
<BaseModal v-if="isAddNewAssetModalOpen" class="">
        <div class="modalHeaderContainer">
            <h1 class="modalHeader">New Assets</h1>
            <button @click="closeAddNewAssetModal()"> <Icon icon="carbon:close-outline"  style="color: #7d7d7d" class="w-6 h-6"/> </button>
        </div>
        
        <!-- Asset Input Field -->
        <div class="mb-4">
            <BaseLabel class="modalLabel">Asset Name:</BaseLabel> 
            <BaseInputField v-model="assetsData.assetName" placeholder="Type Asset Name"></BaseInputField>
        </div>
       
        <!-- Cancel and Save Button -->
        <div class="flex justify-center gap-4 mt-10">
            <ButtonWhite class="flex-1"> Cancel </ButtonWhite>

            <ButtonOrange @click="createAsset" class=" gap-4 items-center flex-1 h-[40px] font-semibold ">
             <Icon icon="tdesign:save"  style="color: #ffffff" class="h-5 w-5"/> Save 
            </ButtonOrange>
        </div>  
</BaseModal>

<h2 class="flex bg-[#242426] h-[65px] items-center p-5 font-semibold text-white text-lg rounded-xl">Assets</h2>

<!-- Search field -->
<div class="flex justify-end px-10">
    <button type="button" class="flex p-2 justify-center items-center text-white border-2 border-gray-400 w-[100px] rounded-lg mt-5" @click="openAddNewAssetModal"><Icon icon='ic:round-add' class="buttonIcon"/>New</button>
</div>

<div class="flex justify-center mt-5 px-10">
    <table class="table">
        <thead class="">
            <tr class="tableHeaderContainer">
                <th class="tableHeader">ID</th>
                <th class="tableHeader">Asset Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="asset in assetList" :key="asset._id" class="tableRow">
                <td class="tableData">{{ asset._id }}</td>
                <td class="tableData">{{ asset.assetName }}</td>
            </tr>
        </tbody>
    </table>
</div>

<!-- Pagination -->
<div class="pagination-controls px-10">
    <button type="button" class="pagination-prev-button" @click="goToPreviousPage" :disabled="currentPage === 1">Prev</button>
    <span class="pagination-content"> {{ currentPage }} of {{ totalPages }}</span>
    <button type="button" class="pagination-next-button" @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
</div>

</template>
    
<script setup>

import Loader from '@/components/alerts/Loading.vue';
import Toast from '@/components/alerts/Toast.vue';
import BaseSearchField from './input-fields/BaseSearchField.vue';
import BaseLabel from './input-fields/BaseLabel.vue';
import BaseInputField from './input-fields/BaseInputField.vue';
import BaseModal from './modal/BaseModal.vue';
import ButtonOrange from './input-fields/ButtonOrange.vue';
import ButtonWhite from './input-fields/ButtonWhite.vue';
import { ref, onMounted, computed, reactive } from "vue";
import { debounce } from 'lodash';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const showLoading = computed(() => store.state.showLoading.state);
const assetList = computed(() => store.state.asset.data);
const currentPage = computed(() => store.state.currentPage);
const totalPages = computed(() => store.state.totalPages);


/******************************************************************
FUNCTION FOR GETTING ASSETS
******************************************************************/
// Function for getting Assets
async function getAsset() {
    await store.dispatch('getAsset', {
        currentPage: currentPage.value, // Pass as part of an object
    });
}


/******************************************************************
 FUNCTION FOR ADDING ASSETS
******************************************************************/
// V-model for adding assets
const assetsData = reactive({
    assetName: '',
});

// Modal for addinG new request
const isAddNewAssetModalOpen = ref(false);

const openAddNewAssetModal = () => {
  isAddNewAssetModalOpen.value = true;
};

const closeAddNewAssetModal = () => {
  isAddNewAssetModalOpen.value = false;
     clearValues();
};

// Function for adding man power
async function createAsset() {
      router.push({name: 'Assets'});
        await store.dispatch('createAsset', assetsData)
        .then((response) => {
            if(response.isSuccess == true) {
                closeAddNewAssetModal();
                getAsset();
            }
        })   
}


/******************************************************************
FUNCTIONS FOR CLEARING VALUES
******************************************************************/
function clearValues(){
    assetsData.assetName = '';
}


/******************************************************************
PAGINATION
******************************************************************/
function goToPreviousPage() {
    if (currentPage.value > 1) {
        store.commit('setCurrentPage', currentPage.value - 1);
        getAsset();
    }
}

function goToNextPage() {
    if (currentPage.value < totalPages.value) {
        store.commit('setCurrentPage', currentPage.value + 1);
        getAsset();
    }
}


/******************************************************************
CALL FUNCTIONS ON PAGE LOAD
******************************************************************/
onMounted(() => {
    store.commit('setCurrentPage', 1);
    getAsset();
    
})
</script>