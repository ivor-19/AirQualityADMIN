export default {
    toggleLoader: (state, value) => {
        state.showLoading.state = value;
    },

    showToast: (state, { showToast, toastMessage, toastType }) => {
        state.toast.showToast = showToast;
        state.toast.toastMessage = toastMessage;
        state.toast.toastType = toastType;
    },
    setCurrentPage(state, currentPage) {
        state.currentPage = currentPage;
    },

    setItemsPerPage(state, itemsPerPage) {
        state.itemsPerPage = itemsPerPage;
    },

    setTotalPages(state, totalPages) {
        state.totalPages = totalPages;
    },
    setUserListData: (state, user) => {
        state.user.data = user;
    },
    setHistoryListData: (state, history) => {
        state.history.data = history;
    },
    setAssetListData: (state, asset) => {
        state.asset.data = asset;
    },
    setStudentListData: (state, students) => {
        state.students.data = students;
    },
    addStudents(state, students) {
        state.students.data.push(...students);
    },
     
    //SEARCH LIST
    setSearchTerm: (state, searchTerm) => {
    state.searchTerm = searchTerm;
    }
}