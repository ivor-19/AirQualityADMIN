<template>
<!-- Loading screen and toast message -->
<Loader v-if="showLoading" class="loading"></Loader>
<Toast></Toast>

  <!-- Delete user modal -->
<BaseModal v-if="isDeleteUserModalOpen">
    <div class="alertIconContainer">
        <Icon icon="ant-design:alert-twotone" class="alertIcon"/>
    </div>
    <label class="alertTextHeader">Warning!</label>
    <p class="alertTextContent">Are you sure you want to delete this user?</p>
    
    <!-- Delete and cancel button -->
    <div class="modalButtonContainer">
        <button type="button" class="primaryButton" @click="deleteUser">
            <Icon icon='material-symbols:delete-outline' class="buttonIcon"/>Yes, Delete
        </button>
        <button type="button" class="cancelButton" @click="closeDeleteUserModal">
            <Icon icon='mdi:cancel-bold' class="buttonIcon"/>Cancel
        </button>
    </div>
</BaseModal>

<div class="">
    <div class="bg-pastel-black h-12 flex flex-col justify-center px-2">
        <h2 class="font-semibold text-white text-[16px]">Users</h2>
    </div>

    <!-- <div class="">
       <BaseSearchField v-model="searchQuery" @input="search" placeholder="Search control number"/>
    </div> -->

    <div class="flex justify-center mt-5 px-10 pt-5">
        <table class="table">
            <thead class="">
                <tr class="tableHeaderContainer">
                    <th class="tableHeader hidden">ID</th>
                    <th class="tableHeader">Username</th>
                    <th class="tableHeader">Password</th>
                    <th class="tableHeader">Asset model</th>
                    <th class="tableHeader">First access</th>
                    <th class="tableHeader">Actions</th>
                </tr>
            </thead>
            <tbody>
                <td v-if="userList.length === 0" colspan="6" class="text-center text-gray-500 w-full">
                    <div class="my-10">Empty list</div>
                </td> 
                <tr v-for="user in userList" :key="user._id" class="tableRow">
                    <td class="tableData hidden">{{ user._id }}</td>
                    <td class="tableData">{{ user.username }}</td>
                    <td class="tableData">{{ user.email }}</td>
                    <td class="tableData">{{ user.asset_model }}</td>
                    <td class="tableData">{{ user.first_access }}</td>
                    <td class="tableData">
                      <div class="flex items-center justify-start space-x-2 cursor-pointer">
                          <Icon icon="mi:delete" @click="openDeleteUserModal(user._id)" class="tableIconDelete"></Icon>
                      </div>
                  </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Pagination -->
    <div v-if="userList !== 0" class="pagination-controls px-10 ">
      <button type="button" class="pagination-prev-button" @click="goToPreviousPage" :disabled="currentPage === 1">Prev</button>
      <span class="pagination-content"> {{ currentPage }} of {{ totalPages }}</span>
      <button type="button" class="pagination-next-button" @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</div>
</template>

<script setup>
import Loader from '@/components/alerts/Loading.vue';
import Toast from '@/components/alerts/Toast.vue';
import BaseSearchField from './input-fields/BaseSearchField.vue';
import BaseModal from './modal/BaseModal.vue';
import { ref, onMounted, computed } from "vue";
import { debounce } from 'lodash';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';
import StudentList from './StudentList.vue';

const store = useStore();
const router = useRouter();

const showLoading = computed(() => store.state.showLoading.state);
const userList = computed(() => store.state.user.data);
const currentPage = computed(() => store.state.currentPage);
const totalPages = computed(() => store.state.totalPages);

/******************************************************************
FUNCTION FOR GETTING REQUEST
******************************************************************/
// Function for getting Request list
async function getUser() {
    await store.dispatch('getUser', {
        currentPage: currentPage.value, // Pass as part of an object
    });
}


/******************************************************************
 FUNCTION FOR DELETING MAN POWER
******************************************************************/
const isDeleteUserModalOpen = ref(false);
const toDelete = ref(null);

// Open delete modal 
const openDeleteUserModal = (id) => {
    toDelete.value = id;
    isDeleteUserModalOpen.value = true;
};

// Close delete modal 
const closeDeleteUserModal = () => {
    isDeleteUserModalOpen.value = false;
};

// Function for delete manpower
async function deleteUser() {
    if (toDelete.value != "") {
        await store.dispatch('deleteUser', toDelete.value)
        .then((response) => {
            if (response.isSuccess) {
                closeDeleteUserModal();  
                getUser(); 
            }
        })    
    }
}


/*********************************************************************
FUNCTIONS FOR SEARCH
*********************************************************************/
// const searchQuery = ref('');

// // Search student
// const search = debounce(() => {
//     store.dispatch('getUser', { 
//         search: searchQuery.value, 
//     }).then(() => {
//         if (userList.value.length === 0) {
//             store.commit('setCurrentPage', 0);
//             store.commit('setTotalPages', 0);
//         }
//     });
// }, 500) // Adjust the debounce delay as needed (300 milliseconds in this example)

/******************************************************************
PAGINATION
******************************************************************/
function goToPreviousPage() {
    if (currentPage.value > 1) {
        store.commit('setCurrentPage', currentPage.value - 1);
        getUser();
    }
}

function goToNextPage() {
    if (currentPage.value < totalPages.value) {
        store.commit('setCurrentPage', currentPage.value + 1);
        getUser();
    }
}


/******************************************************************
CALL FUNCTIONS ON PAGE LOAD
******************************************************************/
onMounted(() => {
    store.commit('setCurrentPage', 1);
    getUser();
    
})

</script>