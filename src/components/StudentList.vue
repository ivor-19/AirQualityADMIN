<template>
<!-- Loading screen and toast message -->
<Loader v-if="showLoading" class="loading"></Loader>
<Toast></Toast>

<!-- Modal for adding new students... -->
<BaseModal v-if="isAddNewStudentModalOpen" class="">
    <div class="modalHeaderContainer">
        <h1 class="modalHeader">New Student</h1>
        <button @click="closeAddNewStudentModal()"> <Icon icon="carbon:close-outline"  style="color: #7d7d7d" class="w-6 h-6"/> </button>
    </div>

    <!-- students Input Field -->
    <div class="mb-4">
        <BaseLabel class="modalLabel">Student ID:</BaseLabel> 
        <BaseInputField v-model="studentData.student_id" placeholder="Type Student ID"></BaseInputField>
    </div>

    <div class="mb-4">
        <BaseLabel class="modalLabel">Student Name:</BaseLabel> 
        <BaseInputField v-model="studentData.name" placeholder="Type Student Name"></BaseInputField>
    </div>

    <div class="mb-4">
        <BaseLabel class="modalLabel">Email:</BaseLabel> 
        <BaseInputField v-model="studentData.email" placeholder="Type Student Email"></BaseInputField>
    </div>

    <div class="mb-4">
        <BaseLabel class="modalLabel">Phone Number:</BaseLabel> 
        <BaseInputField v-model="studentData.phone_number" placeholder="Type Student Phone Number"></BaseInputField>
    </div>

    <!-- Cancel and Save Button -->
    <div class="flex justify-center gap-4 mt-10">
        <ButtonWhite  @click="closeAddNewStudentModal()" class="flex-1"> Cancel </ButtonWhite>

        <ButtonOrange @click="createStudent" class=" gap-4 items-center flex-1 h-[40px] font-semibold ">
            <Icon icon="tdesign:save"  style="color: #ffffff" class="h-5 w-5"/> Save 
        </ButtonOrange>
    </div>  
</BaseModal>

<!-- Delete manpower modal -->
<BaseModal v-if="isDeleteStudentModalOpen">
    <div class="alertIconContainer">
        <Icon icon="fluent:warning-20-filled" class="alertIcon"/>
    </div>
    <label class="alertTextHeader">Warning!</label>
    <p class="alertTextContent">Are you sure you want to delete this student?</p>

    <!-- Delete and cancel button -->
    <div class="modalButtonContainer">
        <button type="button" class="primaryButton" @click="deleteStudent">
            <Icon icon='material-symbols:delete-outline' class="buttonIcon"/>Yes, Delete
        </button>
        <button type="button" class="cancelButton" @click="closeDeleteStudentModal">
            <Icon icon='mdi:cancel-bold' class="buttonIcon"/>Cancel
        </button>
    </div>
</BaseModal>

<div class="">
    <h2 class="flex bg-[#1d1c1a] h-[40px] items-center p-5 font-semibold text-white text-lg rounded-xl">Student List</h2>

    <!-- Add Student -->
    <div class="searchContainer mt-8 px-10">
        <BaseSearchField v-model="searchQuery" @input="search" placeholder="Search Student" class="w-[500px]"/>
        <div v-if="studentList.length !== 0" class="fileUploadContainer px-10">
            <input type="file" ref="fileInput" accept=".xlsx, .xls" @change="handleFileUpload" class="hidden" />
            <button type="button" class="flex p-2 justify-center items-center text-white w-[200px] rounded-lg bg-pastel-black" @click="triggerFileInput">
            <Icon icon="mdi:upload" class="buttonIcon" /> Upload Excel </button>
        </div>
        <button v-if="studentList.length !== 0" type="button" class="flex px-4 py-2 items-center text-white w-[150px] rounded-lg bg-pastel-black" @click="openAddNewStudentModal"><Icon icon='ic:round-add' class="buttonIcon"/>New</button>
    </div>

    <div class="flex justify-center px-10 ">
        <table class="table">
            <thead class="">
                <tr class="tableHeaderContainer">
                    <th class="tableHeader hidden">ID</th>
                    <th class="tableHeader">Student ID</th>
                    <th class="tableHeader">Name</th>
                    <th class="tableHeader">Email</th>
                    <th class="tableHeader">Phone Number</th>
                    <th class="tableHeader">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="studentList.length === 0" class="h-60">
                    <td colspan="6" class="text-center text-gray-500 w-full">
                        <div class="my-10">Empty list</div>
                        <div class="flex flex-col w-full items-center justify-center gap-2">
                            <div v-if="studentList.length === 0" class="fileUploadContainer px-10">
                                <input type="file" ref="fileInput" accept=".xlsx, .xls" @change="handleFileUpload" class="hidden" />
                                <button type="button" class="flex p-2 justify-center items-center text-white w-[200px] rounded-lg bg-pastel-black" @click="triggerFileInput">
                                <Icon icon="mdi:upload" class="buttonIcon" /> Upload Excel </button>
                            </div>
                            <span>or</span>
                            <button v-if="studentList.length === 0" type="button" class="flex px-4 py-2 justify-center items-center text-white w-[150px] rounded-lg bg-pastel-black" @click="openAddNewStudentModal"><Icon icon='ic:round-add' class="buttonIcon"/>New</button>
                        </div>
                    </td> 
                </tr>
                <tr v-for="student in studentList" :key="student._id" class="tableRow">
                    <td class="tableData hidden">{{ student._id }}</td>
                    <td class="tableData">{{ student.student_id }}</td>
                    <td class="tableData">{{ student.name }}</td>
                    <td class="tableData">{{ student.email }}</td>
                    <td class="tableData">{{ student.phone_number }}</td>
                    <td class="tableData">
                        <div class="flex items-center justify-start space-x-2 cursor-pointer">
                            <Icon icon="mi:delete" @click="openDeleteStudentModal(student._id)" class="tableIconDelete"></Icon>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Pagination -->
    <div v-if="studentList.length !== 0" class="pagination-controls px-10">
        <button type="button" class="pagination-prev-button" @click="goToPreviousPage" :disabled="currentPage === 1">Prev</button>
        <span class="pagination-content"> {{ currentPage }} of {{ totalPages }}</span>
        <button type="button" class="pagination-next-button" @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</div>
</template>

<script setup>
import * as XLSX from 'xlsx'; 
import Loader from '@/components/alerts/Loading.vue';
import Toast from '@/components/alerts/Toast.vue';
import BaseSearchField from './input-fields/BaseSearchField.vue';
import BaseModal from './modal/BaseModal.vue';
import BaseLabel from './input-fields/BaseLabel.vue';
import BaseInputField from './input-fields/BaseInputField.vue';
import ButtonOrange from './input-fields/ButtonOrange.vue';
import ButtonWhite from './input-fields/ButtonWhite.vue';
import { ref, onMounted, computed, reactive } from "vue";
import { debounce } from 'lodash';
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const showLoading = computed(() => store.state.showLoading.state);
const studentList = computed(() => store.state.students.data);
const currentPage = computed(() => store.state.currentPage);
const totalPages = computed(() => store.state.totalPages);


/******************************************************************
FUNCTION FOR GETTING STUDENT LIST
******************************************************************/
// Function for getting Request list
async function getStudent() {
    await store.dispatch('getStudent', {
        currentPage: currentPage.value, // Pass as part of an object
    });
}


/******************************************************************
 FUNCTION FOR ADDING STUDENT
******************************************************************/
// V-model for adding student
const studentData = reactive({
    student_id: '',
    name: '',
    email: '',
    phone_number: '',
});

// Modal for addinG new student
const isAddNewStudentModalOpen = ref(false);

const openAddNewStudentModal = () => {
    isAddNewStudentModalOpen.value = true;
};

const closeAddNewStudentModal = () => {
    isAddNewStudentModalOpen.value = false;
    clearValues();
};

// Function for adding student
async function createStudent() {
    await store.dispatch('createStudent', studentData)
    .then((response) => {
        if(response.isSuccess == true) {
            closeAddNewStudentModal();
            getStudent();
        }
    });
}


/******************************************************************
 FUNCTION FOR DELETING MAN POWER
******************************************************************/
const isDeleteStudentModalOpen = ref(false); 
const toDelete = ref(null);

// Open delete modal 
const openDeleteStudentModal = (id) => {
    toDelete.value = id;
    isDeleteStudentModalOpen.value = true;
};

// Close delete modal 
const closeDeleteStudentModal = () => {
    isDeleteStudentModalOpen.value = false;
};

// Function for delete student
async function deleteStudent() {
    if (toDelete.value != "") {
        await store.dispatch('deleteStudent', toDelete.value)
        .then((response) => {
            if (response.isSuccess) {
                closeDeleteStudentModal();  
                getStudent(); 
            }
        })    
    }
}


/*********************************************************************
FUNCTIONS FOR SEARCH
*********************************************************************/
const searchQuery = ref('');

// Search student
const search = debounce(() => {
    store.dispatch('getStudent', { 
        search: searchQuery.value, 
    }).then(() => {
        if (studentList.value.length === 0) {
            store.commit('setCurrentPage', 0);
            store.commit('setTotalPages', 0);
        }
    });
}, 500) // Adjust the debounce delay as needed (300 milliseconds in this example)


/******************************************************************
FUNCTIONS FOR CLEARING VALUES
******************************************************************/
function clearValues(){
    studentData.student_id = '';
    studentData.name = '';
    studentData.email = '';
    studentData.phone_number = '';
}

/******************************************************************
PAGINATION
******************************************************************/
function goToPreviousPage() {
    if (currentPage.value > 1) {
        store.commit('setCurrentPage', currentPage.value - 1);
        getStudent();
    }
}

function goToNextPage() {
    if (currentPage.value < totalPages.value) {
        store.commit('setCurrentPage', currentPage.value + 1);
        getStudent();
    }
}


/******************************************************************
CALL FUNCTIONS ON PAGE LOAD
******************************************************************/
onMounted(() => {
    store.commit('setCurrentPage', 1);
    getStudent();

})


/******************************************************************
FUNCTION FOR EXCEL FILE UPLOAD
******************************************************************/
const fileInput = ref(null);

// File upload handler
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
        const result = await store.dispatch("uploadExcelFile", formData);
        if (result.isSuccess) {
            console.log("File uploaded successfully:", result.message);
            await getStudent(); // Refresh the student list
        } else {
            console.error("Upload failed:", result.message);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    } finally {
        if (fileInput.value) fileInput.value.value = ""; // Clear the file input
    }
};

// Trigger file input
const triggerFileInput = () => {
    fileInput.value.click();
};


</script>