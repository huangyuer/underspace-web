import api from '../api/book';
import router from "../../router";
import {bookItem} from "../objectDeclare";

// initial state
const state = {
  hottestBooks: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  latestBooks: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  // books: {
  //   'total': 0,
  //   'data': [],
  //   'isSearchResult': false,
  //   'keywords': ''
  // },
  bookDetail: {
     _id: '',
    name: '',
    ISBN: '',
    publishedAt: '',
    bookNo: '',
    recordNo: '',
    categories: [],
    summary: '',
    pdf: '',
    epub: '',
    strTags: '',
    texts: [],
    tags: [],
    creator: '',
  },
  bookError: '',
  bookSaveStatus: false,
  bookDeleteStatus: false,
  bookCategoriesEditDialogVisible: false,
  bookSublibsEditDialogVisible: false,
  bookClcsEditDialogVisible: false,
  bookDeleteResult: {
    bookId: '',
    status: false
  },
  bookDetailReady: false,
  savedBook: {
    id:'',
    title: ''
  },
  libMenuVisible: true,
  categoryMenuVisible: true,
  clcMenuVisible: true,
  leftBookMenuVisible: false,
  leftBookCategory: '所有类别',
  bookCategoryVisible: false
};

// getters
const getters = {
  hottestBooks: state => state.hottestBooks.data,
  // books: state => state.books.data,
  latestBooks: state => state.latestBooks.data,
  hottestBooksTotal: state => state.hottestBooks.total,
  booksTotal: state => state.latestBooks.total,
  latestBooksTotal: state => state.latestBooks.total,
  bookDetail: state => state.bookDetail,
  savedBook: state => state.savedBook,
  bookSaveStatus: state => state.bookSaveStatus,
  bookDeleteStatus: state => state.bookDeleteStatus,
  bookDeleteResult: state => state.bookDeleteResult,
  bookDetailReady: state => state.bookDetailReady,
  bookCategoriesEditDialogVisible: state => state.bookCategoriesEditDialogVisible,
  bookSublibsEditDialogVisible: state => state.bookSublibsEditDialogVisible,
  bookClcsEditDialogVisible: state => state.bookClcsEditDialogVisible,
  libMenuVisible: state => state.libMenuVisible,
  categoryMenuVisible: state => state.categoryMenuVisible,
  clcMenuVisible: state => state.clcMenuVisible,
  leftBookMenuVisible: state => state.leftBookMenuVisible,
  leftBookCategory: state => state.leftBookCategory,
  bookCategoryVisible: state => state.bookCategoryVisible
};

// actions
const actions = {
  getHottestBooks ({ commit, state }, params) {
    let promise = api.getHottest(params.category, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setHottestBooks', response.data);
      // commit('setBooks', state.hottestBooks);
    }, (response) => {
      console.log(response);
      commit('setHottestBooks', state.hottestBooks);
      // commit('setBooks', []);
    });
  },
  getLatestBooks ({ commit,state }, params) {
    let promise = api.getLatest(params.category,params.clc,params.lib, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setLatestBooks', response.data);

      // commit('setBooks', state.latestBooks);
    }, (response) => {
      console.log(response);
      commit('setLatestBooks', state.latestBooks);
      // commit('setBooks', []);
    });
  },
  // searchBooks ({ commit }, params) {
  //   let promise = api.search(params.keywords, params.limit, params.page);
  //   promise.then((response) => {
  //     console.log(response.data);
  //     let result = {'total': response.data.total,
  //                   'data': response.data.data,
  //                   'isSearchResult': true,
  //                   'keywords': params.keywords};
  //     commit('setBooks', result);
  //   }, (response) => {
  //     console.log(response);
  //     commit('setBooks', []);
  //   });
  // },
  getBookDetail({ commit,state }, params) {
    commit('setBookDetailReady',false);
    let promise = api.getBookDetail(params.bookId);
    promise.then((response) => {
      //console.log(response);
      commit('setBookDetail', response.data);
      commit('setBookDetailReady',true);
    }, (response) => {
      commit('setBookError', '专家不存在');
      console.log(response);
    });
  },
  postBook ({ commit }, bookInfo) {
    commit('setBookSaveStatus', false);
    let promise = api.postBook(bookInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBook', response.data);
      commit('setBookSaveStatus', true);
    }, (response) => {
      console.log(response);
      commit('setBookError', '专家保存失败');
    });
  },
  postBookCategory ({ commit }, categoryInfo) {
    commit('setBookSaveStatus', false);
    let promise = api.postBookCategory(categoryInfo.bookId, categoryInfo.category);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBook', response.data);
      commit('setBookSaveStatus', true);
    }, (response) => {
      console.log(response);
      commit('setBookError', '保存失败');
    });
  },
  putBook ({ commit }, bookInfo) {
    commit('setBookSaveStatus', false);
    let promise = api.putBook(bookInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBook', response.data);
      commit('setBookSaveStatus', true);
    }, (response) => {
      console.log(response);
      commit('setBookError', '修改失败');
    });
  },
  putBookCategory ({ commit }, categoryInfo) {
    commit('setBookSaveStatus', false);
    let promise = api.putBookCategory(categoryInfo.bookId, categoryInfo.category);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBook', response.data);
      commit('setBookSaveStatus', true);
    }, (response) => {
      console.log(response);
      commit('setBookError', '修改失败');
    });
  },
  moveToBookCategory ({ commit }, categoryInfo) {
    commit('setBookSaveStatus', false);
    let promise = api.moveToBookCategory(categoryInfo.bookId, categoryInfo.category, categoryInfo.moveToId);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedBook', response.data);
      commit('setBookSaveStatus', true);
    }, (response) => {
      console.log(response);
      commit('setBookError', '修改失败');
    });
  },
  deleteBook ({ commit }, bookId) {
    commit('setBookDeleteStatus', false);
    commit('setBookDeleteResult', {bookId: bookId, status: false});
    let promise = api.deleteBook(bookId);
    promise.then((response) => {
      console.log(response.data);
      commit('setBookDeleteStatus', true);
      commit('setBookDeleteResult', {bookId: bookId, status: true});
    }, (response) => {
      console.log(response);
      commit('setBookError', '删除失败');
    });
  },
  deleteBookCategory ({ commit }, categoryInfo) {
    commit('setBookDeleteStatus', false);
    commit('setBookDeleteResult', {bookId: categoryInfo.bookId, status: false});
    let promise = api.deleteBookCategory(categoryInfo.bookId, categoryInfo.categoryId);
    promise.then((response) => {
      console.log(response.data);
      commit('setBookDeleteStatus', true);
      commit('setBookDeleteResult', {bookId: categoryInfo.bookId, status: true});
    }, (response) => {
      console.log(response);
      commit('setBookError', '删除失败');
    });
  }
};

// mutations
const mutations = {
  setHottestBooks (state, books) {
    // 变更状态
    state.hottestBooks.total = books.total;
    state.hottestBooks.data = books.data;
    state.hottestBooks.isSearchResult = false;
  },
  // setBooks (state, books) {
  //   // 变更状态
  //   state.books = books;
  // },
  setLatestBooks (state, data) {
    // 变更状态
    state.latestBooks.total = data.total;
    state.latestBooks.data = data.data;
    state.latestBooks.isSearchResult = false;
  },
  setBookDetail(state, book) {
    // 变更状态
    if(book){
      for(let k in book){
        if(k === 'categories' || k === 'texts' || k === 'tags'){
            state.bookDetail[k] = [];
            for(let item of book[k]){
              state.bookDetail[k].push(item);
            }
            if(k === 'tags' && Object.prototype.toString.call(book.tags)==='[object Array]'){
              state.bookDetail.strTags = book.tags.join(' ');
            }
          }else{
             state.bookDetail[k] = book[k];
          }
      }
    }
  },
  setSavedBook(state, book) {
      // 变更状态
    state.savedBook.id = book.id;
    state.savedBook.title = book.title;
  },
  setBookError(state, error) {
    // 变更状态
    state.bookError = error;
  },
  clearBookError(state){
    state.bookError = '';
  },
  setBookSaveStatus(state, status) {
    // 变更状态
    state.bookSaveStatus = status;
  },
  setBookDeleteStatus(state, status) {
    // 变更状态
    state.bookDeleteStatus = status;
  },
  setBookDeleteResult(state, result) {
    // 变更状态
    state.bookDeleteResult = result;
  },
  setBookDetailReady(state, status) {
    // 变更状态
    state.bookDetailReady = status;
  },
  showBookCategoriesEditDialog(state) {
    // 变更状态
    state.bookCategoriesEditDialogVisible = true;
  },
  hideBookCategoriesEditDialog(state) {
    // 变更状态
    state.bookCategoriesEditDialogVisible = false;
  },
  showBookSublibsEditDialog(state) {
    // 变更状态
    state.bookSublibsEditDialogVisible = true;
  },
  hideBookSublibsEditDialog(state) {
    // 变更状态
    state.bookSublibsEditDialogVisible = false;
  },
  showBookClcsEditDialog(state) {
    // 变更状态
    state.bookClcsEditDialogVisible = true;
  },
  hideBookClcEditDialog(state) {
    // 变更状态
    state.bookClcsEditDialogVisible = false;
  },
  showLibMenu(state) {
    // 变更状态
    state.libMenuVisible = true;
  },
  hideLibMenu(state) {
    // 变更状态
    state.libMenuVisible = false;
  },
  showCategoryMenu(state) {
    // 变更状态
    state.categoryMenuVisible = true;
  },
  hideCategoryMenu(state) {
    // 变更状态
    state.categoryMenuVisible = false;
  },
  showClcMenu(state) {
    // 变更状态
    state.clcMenuVisible = true;
  },
  hideClcMenu(state) {
    // 变更状态
    state.clcMenuVisible = false;
  },
  setLeftBookMenuVisible(state, leftBookMenuVisible) {
    state.leftBookMenuVisible = leftBookMenuVisible
  },
  setLeftBookCategory(state, leftBookCategory) {
    state.leftBookCategory = leftBookCategory
  },
  setBookCategoryVisible(state, bookCategoryVisible) {
    state.bookCategoryVisible = bookCategoryVisible
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
