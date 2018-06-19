const state = {
  mediaDetail: '',
  mediaType: '',
}

const actions = {}

const mutations = {
  setMediaDetail (state, data) {
    state.mediaDetail = data
  },
  setMediaType (state, data) {
    state.mediaType = data
  }
}

export default {
  state,
  actions,
  mutations,
}
