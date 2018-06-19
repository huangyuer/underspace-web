const state = {
  rows: 10,
  total: 0,
  paginatorCategory: {
    parent: '',
    child: '',
    content: '',
  },//记录当前一级分类、二级分类
}

const actions = {}

const mutations = {
  setPaginatorTotal (state, data) {
    state.total = data
  },
  setPaginatorRows (state, data) {
    state.rows = data
  },
  setPaginatorCategory (state, data) {
    if (data.hasOwnProperty('parent')) {
      state.paginatorCategory.parent = data.parent
    }
    if (data.hasOwnProperty('child')) {
      state.paginatorCategory.child = data.child
    }
    if (data.hasOwnProperty('content')) {
      state.paginatorCategory.content = data.content
    }
  }
}

export default {
  state,
  actions,
  mutations,
}
