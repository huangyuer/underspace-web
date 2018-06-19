const state = {
  searchContextData: []
}

const actions = {}

const mutations = {
  setSearchContextData (state, data) {
    state.searchContextData = data
  },
  removeUserFavoriteBooks (state, data) {
    for (var i = 0; i < state.searchContextData.length; i++) {
      if (state.searchContextData[i].id === data.bookId) {
        state.searchContextData[i].isFavorited = false
      }
    }
  },
  addUserFavoriteBooks (state, data) {
    for (var i = 0; i < state.searchContextData.length; i++) {
      if (state.searchContextData[i].id === data.bookId) {
        state.searchContextData[i].isFavorited = true
      }
    }
  }
}

export default {
  state,
  actions,
  mutations,
}
