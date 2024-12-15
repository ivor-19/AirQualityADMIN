import axiosClient from '@/axios/axios';
import { toastDelay } from '@/components/composable/GlobalVariables';
import { toastDuration } from '@/components/composable/GlobalVariables';

export default {

/******************************************************************
 API FOR USER
******************************************************************/
// API for getting List Of User
async getUser({commit}, { currentPage, search }) {
        commit('toggleLoader', true, { root: true })
        return await axiosClient.get(`users`, { params: { page: currentPage, search } })
        .then((response) => {
            commit('toggleLoader', false, { root: true })
            commit('setUserListData', response.data.users);
            commit('setCurrentPage', response.data.pagination.current_page, { root: true });
            commit('setItemsPerPage', response.data.pagination.per_page, { root: true });
            commit('setTotalPages', response.data.pagination.last_page, { root: true });
            return response.data;
        })
        .catch((error) => {
            commit('toggleLoader', false, { root: true })
            if(error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                setTimeout(() => {
                    commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
                }, toastDelay);

                setTimeout(() => {
                    commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
                }, toastDuration);
            }   
        })    
    },

// API for delete user
async deleteUser({commit}, deleteUserData) {
    commit('toggleLoader', true, { root: true })
    return await axiosClient.post(`users/deleteUser/${deleteUserData}`)
    .then((response) => {
        commit('toggleLoader', false, { root: true })
        setTimeout(() => {
            commit('showToast', { showToast: true, toastMessage: response.data.message, toastType: 'success'}, { root: true });
        }, toastDelay);

        setTimeout(() => {
            commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
        }, toastDuration);

        return response.data;
    })
    .catch((error) => {
        commit('toggleLoader', false, { root: true })
        if(error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
            }, toastDelay);

            setTimeout(() => {
                commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
            }, toastDuration);
        }   
    })
},


/******************************************************************
 API FOR HISTORY
******************************************************************/
// API for getting List Of History
async getHistory({commit}, { currentPage, search }) {
    commit('toggleLoader', true, { root: true })
    return await axiosClient.get('history', { search, page:currentPage } )
    .then((response) => {
        commit('toggleLoader', false, { root: true })
        commit('setHistoryListData', response.data.history);
        return response.data;
    })
    .catch((error) => {
        commit('toggleLoader', false, { root: true })
        if(error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
            }, toastDelay);

            setTimeout(() => {
                commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
            }, toastDuration);
        }   
    })    
},


/******************************************************************
 API FOR ASSETS
******************************************************************/
// API for getting List Of Assets
async getAsset({commit}, { currentPage, search }) {
    commit('toggleLoader', true, { root: true })
    return await axiosClient.get(`assets`, { params: { page: currentPage, search } })
    .then((response) => {
        commit('toggleLoader', false, { root: true })
        commit('setAssetListData', response.data.asset);
        commit('setCurrentPage', response.data.pagination.current_page, { root: true });
        commit('setItemsPerPage', response.data.pagination.per_page, { root: true });
        commit('setTotalPages', response.data.pagination.last_page, { root: true });
        return response.data;
    })
    .catch((error) => {
        commit('toggleLoader', false, { root: true })
        if(error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
            }, toastDelay);

            setTimeout(() => {
                commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
            }, toastDuration);
        }   
    })    
},

// API for adding Assets
async createAsset({commit}, assetData) {
    commit('toggleLoader', true, { root: true })
    return await axiosClient.post('assets/addAsset', assetData)
    .then((response) => {
        commit('toggleLoader', false, { root: true })
        setTimeout(() => {
            commit('showToast', { showToast: true, toastMessage: response.data.message, toastType: 'success'}, { root: true });
        }, toastDelay);

        setTimeout(() => {
            commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
        }, toastDuration);

        return response.data;
    })
    .catch((error) => {
        commit('toggleLoader', false, { root: true })
        if(error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
            }, toastDelay);

                setTimeout(() => {
                    commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
                }, toastDuration);
            }   
        })
    },


/******************************************************************
 API FOR STUDENTS
******************************************************************/
// API for getting List Of Students
async getStudent({commit}, { currentPage, search }) {
    commit('toggleLoader', true, { root: true })
    return await axiosClient.get(`students/getList`, { params: { page: currentPage, search } })
    .then((response) => {
        commit('toggleLoader', false, { root: true })
        commit('setStudentListData', response.data.students);
        commit('setCurrentPage', response.data.pagination.current_page, { root: true });
        commit('setItemsPerPage', response.data.pagination.per_page, { root: true });
        commit('setTotalPages', response.data.pagination.last_page, { root: true });
        return response.data;
    })
    .catch((error) => {
        commit('toggleLoader', false, { root: true })
        if(error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
            }, toastDelay);

            setTimeout(() => {
                commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
            }, toastDuration);
        }   
    })    
},

// API for uploading excelfile
async uploadExcelFile({ commit }, formData) {
    commit('toggleLoader', true, { root: true });
    return await axiosClient.post(`students/uploadExcel`, formData)
        .then((response) => {
            commit('toggleLoader', false, { root: true });
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: response.data.message, toastType: 'success' }, { root: true });
            }, toastDelay);

            setTimeout(() => {
                commit('showToast', { showToast: false, toastMessage: '', toastType: 'default' }, { root: true });
            }, toastDuration);

            return response.data;
        })
        .catch((error) => handleApiError(commit, error));
},


// API for adding Student
async createStudent({commit}, studentData) {
    commit('toggleLoader', true, { root: true })
    return await axiosClient.post('students/addStudent', studentData)
    .then((response) => {
        commit('toggleLoader', false, { root: true })
        setTimeout(() => {
            commit('showToast', { showToast: true, toastMessage: response.data.message, toastType: 'success'}, { root: true });
        }, toastDelay);

        setTimeout(() => {
            commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
        }, toastDuration);

        return response.data;
    })
    .catch((error) => {
        commit('toggleLoader', false, { root: true })
        if(error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
            }, toastDelay);

                setTimeout(() => {
                    commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
                }, toastDuration);
            }   
        })
    },

// API for delete Student
async deleteStudent({commit}, deleteStudentData) {
    commit('toggleLoader', true, { root: true })
    return await axiosClient.post(`students/deleteStudent/${deleteStudentData}`)
    .then((response) => {
        commit('toggleLoader', false, { root: true })
        setTimeout(() => {
            commit('showToast', { showToast: true, toastMessage: response.data.message, toastType: 'success'}, { root: true });
        }, toastDelay);

        setTimeout(() => {
            commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
        }, toastDuration);

        return response.data;
    })
    .catch((error) => {
        commit('toggleLoader', false, { root: true })
        if(error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            setTimeout(() => {
                commit('showToast', { showToast: true, toastMessage: errorMessage, toastType: 'error'}, { root: true });
            }, toastDelay);

            setTimeout(() => {
                commit('showToast', { showToast: false, toastMessage: '', toastType: 'default'}, { root: true });
            }, toastDuration);
        }   
    })
},



};

