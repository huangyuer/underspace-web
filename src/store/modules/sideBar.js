// state
const state = {
  isSideBarShow: false
}

// getters
const getters = {
  isSideBarShow: state => state.isSideBarShow
}

// mutations
const mutations = {
  setSideBarShow (state, isSideBarShow) {
    state.isSideBarShow = isSideBarShow
  }
}

export default {
  state,
  getters,
  mutations
}
