import api from '../api/rightPanel'

const state = {
  title: '热搜词汇',
  showCloud: true,
  tags: [],
}

const actions = {
  getHotWordList ({commit}, data) {
    let promise = api.getHotWordList()
    promise.then((response) => {
      commit('getHotWordList', response.data)
    }, (response) => {

    })
  },
  updateHotWords ({commit}, data) {
    let promise = api.updateHotWords(data)
    promise.then((response) => {
    }, (response) => {

    })
  }
}

const mutations = {
  setRightPanelNull (state) {
    this.title = '暂无数据'
    this.showCloud = false
  },
  getHotWordList (state, data) {
    state.tags = data
  }
}

export default {
  state,
  actions,
  mutations,
}
