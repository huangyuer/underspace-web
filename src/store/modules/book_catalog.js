import api from '../api/book_catalog';

// initial state
const state = {  
  bookCatalogs: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  bookCatalogDetail: {
    _id: '', 
    book: '',
    name: '', 
    pageNo: '',
    parentId: ''
  },
  currentCatalog: {
    _id: '', 
    book: '',
    name: '', 
    pageNo: '',
    parentId: ''
  },
  bookCatalogError: '',
  bookCatalogSaveStatus: false, 
  bookCatalogDeleteStatus: false,
  editCatalogDialogVisible: false,
  bookCatalogCreateStatus: false,
  bookCatalogUpdateStatus: false, 
  bookCatalogDeleteResult: {
    bookCatalogId: '',
    status: false
  },
  bookCatalogDetailReady: false,
  savedBookCatalog: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = {
   
  bookCatalogs: state => state.bookCatalogs.data,  
  bookCatalogsTotal: state => state.bookCatalogs.total, 
  bookCatalogDetail: state => state.bookCatalogDetail, 
  savedBookCatalog: state => state.savedBookCatalog,
  currentCatalog: state => state.currentCatalog,
  bookCatalogSaveStatus: state => state.bookCatalogSaveStatus, 
  bookCatalogCreateStatus: state => state.bookCatalogCreateStatus,
  bookCatalogUpdateStatus: state => state.bookCatalogUpdateStatus,    
  bookCatalogDeleteStatus: state => state.bookCatalogDeleteStatus,  
  bookCatalogDeleteResult: state => state.bookCatalogDeleteResult,
  bookCatalogDetailReady: state => state.bookCatalogDetailReady,
  editCatalogDialogVisible: state => state.editCatalogDialogVisible,
  
};

// actions
const actions = {  
  listBookCatalogs ({ commit,state }, params) {  
    let promise = api.listBookCatalogs(params.bookId, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      commit('setBookCatalogs', response.data); 
    }, (response) => {
      console.log(response); 
      commit('setBookCatalogs', []);
    });
  }, 
  searchBookCatalogs ({ commit }, params) {  
    let promise = api.search(params.bookId, params.keywords, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keywords': params.keywords};
      commit('setBookCatalogs', result); 
    }, (response) => {
      console.log(response); 
      commit('setBookCatalogs', []);  
    });
  }, 
  getBookCatalogDetail({ commit,state }, params) { 
    commit('setBookCatalogDetailReady',false);
    let promise = api.getBookCatalogDetail(params.bookCatalogId);
    promise.then((response) => {
      //console.log(response);
      commit('setBookCatalogDetail', response.data);  
      commit('setBookCatalogDetailReady',true);
    }, (response) => { 
      commit('setBookCatalogError', '目录不存在');
      console.log(response); 
    }); 
  }, 
  postBookCatalog ({ commit }, catalogInfo) {   
    commit('setBookCatalogCreateStatus', false);
    let promise = api.postBookCatalog(catalogInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBookCatalog', response.data); 
      commit('setBookCatalogCreateStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setBookCatalogCreateStatus', false);
      commit('setBookCatalogError', '目录保存失败'); 
    });
  }, 
  putBookCatalog ({ commit }, catalogInfo) {   
    commit('setBookCatalogUpdateStatus', false);
    let promise = api.putBookCatalog(catalogInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBookCatalog', response.data); 
      commit('setBookCatalogUpdateStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setBookCatalogUpdateStatus', false);
      commit('setBookCatalogError', '目录修改失败'); 
    });
  },
  deleteBookCatalog ({ commit }, catalogId) {   
    commit('setBookCatalogDeleteStatus', false);
    commit('setBookCatalogDeleteResult', {catalogId: catalogId, status: false});  
    let promise = api.deleteBookCatalog(catalogId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setBookCatalogDeleteStatus', true); 
      commit('setBookCatalogDeleteResult', {catalogId: catalogId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setBookCatalogError', '目录删除失败'); 
    });
  }
};

// mutations
const mutations = { 
  setBookCatalogs (state, bookCatalogs) {
    // 变更状态
    state.bookCatalogs = bookCatalogs; 
  }, 
  setBookCatalogDetail(state, bookCatalog) {
    // 变更状态
    if(bookCatalog){
      for(let k in bookCatalog){  
        state.bookCatalogDetail[k] = bookCatalog[k];  
      }
    }
  },
  setCurrentCatalog (state, catalog) {
      // 变更状态
    state.currentCatalog = catalog; 
  },
  showEditCatalogDialog(state) {
     state.editCatalogDialogVisible = true;
  },
  hideEditCatalogDialog(state) {
     state.editCatalogDialogVisible = false;
  },
  setSavedBookCatalog(state, bookCatalog) {
      // 变更状态
    state.savedBookCatalog.id = bookCatalog.id;
    state.savedBookCatalog.title = bookCatalog.title; 
  }, 
  setBookCatalogError(state, error) {
    // 变更状态
    state.bookCatalogError = error; 
  }, 
  clearBookCatalogError(state){
    state.bookCatalogError = '';
  }, 
  setBookCatalogSaveStatus(state, status) {
    // 变更状态
    state.bookCatalogSaveStatus = status; 
  },
  setBookCatalogCreateStatus(state, status) { 
    state.bookCatalogCreateStatus = status; 
  },
  setBookCatalogUpdateStatus(state, status) { 
    state.bookCatalogUpdateStatus = status; 
  },
  setBookCatalogDeleteStatus(state, status) {
    // 变更状态
    state.bookCatalogDeleteStatus = status; 
  }, 
  setBookCatalogDeleteResult(state, result) {
    // 变更状态
    state.bookCatalogDeleteResult = result; 
  },
  setBookCatalogDetailReady(state, status) {
    // 变更状态
    state.bookCatalogDetailReady = status; 
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
