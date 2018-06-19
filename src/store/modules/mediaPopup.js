const state = {
  popupStatus: false,
  url: '',
  content: '',
  title: '',
  clicks: '',
}

const actions = {}

const mutations = {
  setMediaPopupStatus (state, data) {
    state.popupStatus = data
  },
  setMediaPopupUrl (state, data) {
    state.url = data
  },
  setMediaPopupContent (state, data) {
    state.content = data
  },
  setMediaPopupTitle (state, data) {
    state.title = data
  },
  setMediaClicks (state, data) {
    state.clicks = data
  }
}

export default {
  state,
  actions,
  mutations
}
