import { decryptData } from '@/components/composable/CryptoUtility';

export default {
    showLoading: {
        state: false
    },

    toast:{
        showToast: false,
        toastMessage: '',
        toastType: 'default',
    },

    currentPage: 1,

    totalPages: 1,

    itemsPerPage: 10,
    
    userData: JSON.parse(decryptData(sessionStorage.getItem('USER'))) || {
        data: [],
    },

    user: {
        data:[],
    },
    history: {
        data:[],
    },
    asset: {
        data:[],
    },
    students: {
        data:[],
    },
    searchTerm: '',
}