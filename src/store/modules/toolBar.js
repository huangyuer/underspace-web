const state = {
  currentOption: '',
  options: [
    {
      name: '相关性',
    },
    {
      name: '发布时间'
    }
  ]
}

const actions = {}

const mutations = {
  setCurrentOption (state, data) {
    state.currentOption = data
  }
}

export default {
  state,
  actions,
  mutations,
}
