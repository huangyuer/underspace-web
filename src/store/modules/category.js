import api from '../api/category'

// initial state
const state = {
  categories: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  subjects: { // 学科分类
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  clcs: { // 中图分类
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  sublibs: { // 子库列表
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  categoryCreateStatus: false,
  categoryUpdateStatus: false,
  currentCategory: {},
  editCategoryDialogVisible: false,
  moveCategoryDialogVisible: false,
}

// getters
const getters = {
  categories: state => state.categories.data,
  subjects: state => state.subjects.data,
  clcs: state => state.clcs.data,
  sublibs: state => state.sublibs.data,
  currentCategory: state => state.currentCategory,
  categoryCreateStatus: state => state.categoryCreateStatus,
  categoryUpdateStatus: state => state.categoryUpdateStatus,

  editCategoryDialogVisible: state => state.editCategoryDialogVisible,
  moveCategoryDialogVisible: state => state.moveCategoryDialogVisible,
}

// actions
const actions = {
  listCategories ({commit}, params) {
    let promise = api.listCategories(params.limit, params.page)
    promise.then((response) => {
      console.log(response.data)
      commit('setCategories', response.data)
    }, (response) => {
      console.log(response)
      commit('setCategories', [])
    })
  },
  listSubjects ({commit}, params) {
    let promise = api.listSubjects(params.limit, params.page)
    promise.then((response) => {
      console.log(response.data)
      commit('setSubjects', response.data)
    }, (response) => {
      console.log(response)
      commit('setSubjects', [])
    })
  },
  listSublibs ({commit}, params) {
    let promise = api.listSublibs(params.limit, params.page)
    promise.then((response) => {
      commit('setSublibs', response.data)
    }, (response) => {
      commit('setSublibs', [])
    })
  },
  listClcs ({commit}, params) {
    let promise = api.listClcs(params.limit, params.page)
    promise.then((response) => {
      console.log(response.data)
      commit('setClcs', response.data)
    }, (response) => {
      console.log(response)
      commit('setClcs', [])
    })
  },
  updateCategory ({dispatch, commit}, params) {
    let promise = api.updateCategory(params)
    commit('setCategoryUpdateStatus', false)
    promise.then((response) => {
      commit('setCategoryUpdateStatus', true)
      console.log(response.data)
    }, (response) => {
      commit('setCategoryUpdateStatus', false)
      console.log(response)
      //commit('setCategories', []);
    })
  },
  createCategory ({dispatch, commit}, params) {
    let promise = api.createCategory(params.name, params.parentId)
    commit('setCategoryCreateStatus', false)
    promise.then((response) => {
      console.log(response.data)
      commit('setCategoryCreateStatus', true)
    }, (response) => {
      commit('setCategoryCreateStatus', false)
      console.log(response)
    })
  },
  createSibling ({dispatch, commit}, params) {
    let promise = api.createSibling(params.name, params.currentId)
    promise.then((response) => {
      console.log(response.data)
    }, (response) => {
      console.log(response)
    })
  },
  createChild ({dispatch, commit}, params) {
    let promise = api.createChild(params.name, params.parentId)
    promise.then((response) => {
      console.log(response.data)
    }, (response) => {
      console.log(response)
    })
  },
  deleteCategory ({dispatch, commit}, id) {
    let promise = api.deleteCategory(id)
    promise.then((response) => {
      console.log(response.data)
    }, (response) => {
      console.log(response)

    })
  },
  moveCategory ({dispatch, commit}, params) {
    let promise = api.moveCategory(params.parentId, params.srcId, params.destId)
    promise.then((response) => {
      console.log(response.data)
    }, (response) => {
      console.log(response)
    })
  },
  copyCategory ({dispatch, commit}, params) {
    let promise = api.moveCategory(params.categoryId, params.parentId, params.moveToId)
    promise.then((response) => {
      console.log(response.data)
    }, (response) => {
      console.log(response)
    })
  },
}

// mutations
const mutations = {
  setCategories (state, categories) {
    // 变更状态
    state.categories = categories
  },
  setClcs (state, clcs) {
    // 变更状态
    state.clcs = clcs
  },
  setSublibs (state, sublibs) {
    // 变更状态
    state.sublibs = sublibs
  },
  setSubjects (state, subjects) {
    // 变更状态
    state.subjects = subjects
  },
  setCurrentCategory (state, category) {
    // 变更状态
    state.currentCategory = category
  },
  setCategoryCreateStatus (state, status) {
    // 变更状态
    state.categoryCreateStatus = status
  },
  setCategoryUpdateStatus (state, status) {
    // 变更状态
    state.categoryUpdateStatus = status
  },
  showEditCategoryDialog (state) {
    state.editCategoryDialogVisible = true
  },
  hideEditCategoryDialog (state) {
    state.editCategoryDialogVisible = false
  },
  showMoveCategoryDialog (state) {
    state.moveCategoryDialogVisible = true
  },
  hideMoveCategoryDialog (state) {
    state.moveCategoryDialogVisible = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
