import api from '../api/book_chapter';

// initial state
const state = {  
  bookChapters: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  bookChapterDetail: {
     _id: '', 
    book: '',  
    src: '',
    content: '',
    contentRaw: '',
    pageFrom: 0,  
    pageTo: 0,  
  },
  bookChapterError: '',
  bookChapterSaveStatus: false, 
  bookChapterDeleteStatus: false,
  
  bookChapterDeleteResult: {
    bookChapterId: '',
    status: false
  },
  bookChapterDetailReady: false,
  savedBookChapter: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = { 
  bookChapters: state => state.bookChapters.data,  
  bookChaptersTotal: state => state.bookChapters.total, 
  bookChapterDetail: state => state.bookChapterDetail, 
  savedBookChapter: state => state.savedBookChapter,
  bookChapterSaveStatus: state => state.bookChapterSaveStatus,  
  bookChapterDeleteStatus: state => state.bookChapterDeleteStatus,  
  bookChapterDeleteResult: state => state.bookChapterDeleteResult,
  bookChapterDetailReady: state => state.bookChapterDetailReady, 
};

// actions
const actions = {  
  listBookChapters ({ commit,state }, params) {  
    let promise = api.listBookChapters(params.bookId, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      commit('setBookChapters', response.data); 
    }, (response) => {
      console.log(response); 
      commit('setBookChapters', []);
    });
  }, 
  searchBookChapters ({ commit }, params) {  
    let promise = api.search(params.keywords, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keywords': params.keywords};
      commit('setBookChapters', result); 
    }, (response) => {
      console.log(response); 
      commit('setBookChapters', []);  
    });
  }, 
  getBookChapterDetail({ commit,state }, params) { 
    commit('setBookChapterDetailReady',false);
    let promise = api.getBookChapterDetail(params.bookChapterId);
    promise.then((response) => {
      //console.log(response);
      commit('setBookChapterDetail', response.data);  
      commit('setBookChapterDetailReady',true);
    }, (response) => { 
      commit('setBookChapterError', '章节不存在');
      console.log(response); 
    }); 
  }, 
  getBookChapterBySrc({ commit,state }, params) { 
    commit('setBookChapterDetailReady',false);
    let promise = api.getBookChapterBySrc(params.bookId, params.src);
    promise.then((response) => {
      //console.log(response);
      commit('setBookChapterDetail', response.data);  
      commit('setBookChapterDetailReady',true);
    }, (response) => { 
      commit('setBookChapterError', '章节不存在');
      console.log(response); 
    }); 
  }, 
  postBookChapter ({ commit }, chapterInfo) {   
    commit('setBookChapterSaveStatus', false);
    let promise = api.postBookChapter(chapterInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBookChapter', response.data); 
      commit('setBookChapterSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setBookChapterError', '章节保存失败'); 
    });
  }, 
  putBookChapter ({ commit }, chapterInfo) {   
    commit('setBookChapterSaveStatus', false);
    let promise = api.putBookChapter(chapterInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBookChapter', response.data); 
      commit('setBookChapterSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setBookChapterError', '章节修改失败'); 
    });
  },
  deleteBookChapter ({ commit }, chapterId) {   
    commit('setBookChapterDeleteStatus', false);
    commit('setBookChapterDeleteResult', {chapterId: chapterId, status: false});  
    let promise = api.deleteBookChapter(chapterId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setBookChapterDeleteStatus', true); 
      commit('setBookChapterDeleteResult', {chapterId: chapterId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setBookChapterError', '章节删除失败'); 
    });
  }
};

// mutations
const mutations = { 
  setBookChapters (state, bookChapters) {
    // 变更状态
    state.bookChapters = bookChapters; 
  }, 
  setBookChapterDetail(state, bookChapter) {
    // 变更状态
    if(bookChapter){
      for(let k in bookChapter){  
        state.bookChapterDetail[k] = bookChapter[k];  
      }
    }
  },
  setSavedBookChapter(state, bookChapter) {
      // 变更状态
    state.savedBookChapter.id = bookChapter.id;
    state.savedBookChapter.title = bookChapter.title; 
  }, 
  setBookChapterError(state, error) {
    // 变更状态
    state.bookChapterError = error; 
  }, 
  clearBookChapterError(state){
    state.bookChapterError = '';
  }, 
  setBookChapterSaveStatus(state, status) {
    // 变更状态
    state.bookChapterSaveStatus = status; 
  },
  setBookChapterDeleteStatus(state, status) {
    // 变更状态
    state.bookChapterDeleteStatus = status; 
  }, 
  setBookChapterDeleteResult(state, result) {
    // 变更状态
    state.bookChapterDeleteResult = result; 
  },
  setBookChapterDetailReady(state, status) {
    // 变更状态
    state.bookChapterDetailReady = status; 
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
