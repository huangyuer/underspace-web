const state = {
  searchMediaData: [
    {
      children: [],
    },
    {
      children: [],
    },
    {
      children: [],
    },
  ],
  total: ''
}

const actions = {}

const mutations = {
  setSearchMediaData (state, data) {
    for (var i = 0; i < state.searchMediaData.length; i++) {
      state.searchMediaData[i].children = []
    }
    for (var i = 0; i < state.searchMediaData.length; i++) {
      state.searchMediaData[i].children = data.slice(3 * i, 3 * (i + 1))
    }
  },
  setSearchMediaTotal (state, data) {
    state.total = data
  }
}
export default {
  state,
  mutations,
  actions,
}
