import api from '../api/paper'

// state
const state = {
  paper: {},
  latestPapers: [],
  paperCategoryMenuVisible: true,
  leftPaperMenuVisible: false,
  leftPaperCategory: '所有类别'
}

const getters = {
  paper: state => state.paper,
  latestPapers: state => state.latestPapers,
  paperCategoryMenuVisible: state => state.paperCategoryMenuVisible,
  leftPaperMenuVisible: state => state.leftPaperMenuVisible,
  leftPaperCategory: state => state.leftPaperCategory
}

const actions = {
  getPaperDetails ({commit, state}, params) {
    let promise = api.getPaperDetails(params.paperId)
    promise.then((response) => {
      console.log(response.data)
      commit('setPaperDetails', response.data.data[0])
    }, (response) => {
      console.log(response.data)
      commit('setPaperDetails', {})
    })
  },
  getLatestPapers ({commit, state}, params) {
    // let promise = api.getLatestPapers(params.category, params.limit, params.page)
    let promise = api.getLatestPapers(params.issueId, params.limit, params.page)
    promise.then((response) => {
      console.log(response.data)
      commit('setLatestPapers', response.data.data)
    }, (response) => {
      console.log(response.data)
      commit('setLatestPapers', [])
    })
  }
}

const mutations = {
  setPaperDetails (state, paper) {
    state.paper = paper
  },
  setLatestPapers (state, latestPapers) {
    state.latestPapers = latestPapers
  },
  setPaperCategoryMenuVisible (state, paperCategoryMenuVisible) {
    state.paperCategoryMenuVisible = paperCategoryMenuVisible
  },
  setLeftPaperMenuVisible (state, leftPaperMenuVisible) {
    state.leftPaperMenuVisible = leftPaperMenuVisible
  },
  setLeftPaperCategory (state, leftPaperCategory) {
    state.leftPaperCategory = leftPaperCategory
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
