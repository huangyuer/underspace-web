import api from '../api/magazine'

// state
const state = {
  magazine: {},
  latestMagazines: [],
  magazineCategoryMenuVisible: true,
  leftMagazineMenuVisible: false,
  leftMagazineCategory: '所有类别'
}

const getters = {
  magazine: state => state.magazine,
  latestMagazines: state => state.latestMagazines,
  magazineCategoryMenuVisible: state => state.magazineCategoryMenuVisible,
  leftMagazineMenuVisible: state => state.leftMagazineMenuVisible,
  leftMagazineCategory: state => state.leftMagazineCategory
}

const actions = {
  getMagazineDetails ({commit, state}, params) {
    let promise = api.getMagazineDetails(params.magazineId)
    promise.then((response) => {
      console.log(response.data)
      commit('setMagazineDetails', response.data.data[0])
    }, (response) => {
      console.log(response)
      commit('setMagazineDetails', {})
    })
  },
  getLatestMagazines ({ commit,state }, params) {
    let promise = api.getLatestMagazines(params.limit, params.page)
    promise.then((response) => {
      console.log(response.data)
      commit('setLatestMagazines', response.data.data)
    }, (response) => {
      console.log(response)
      commit('setLatestMagazines', [])
    })
  },
}

const mutations = {
  setMagazineDetails (state, magazine) {
    state.magazine = magazine
  },
  setLatestMagazines (state, latestMagazines) {
    state.latestMagazines = latestMagazines
  },
  setMagazineCategoryMenuVisible (state, magazineCategoryMenuVisible) {
    state.magazineCategoryMenuVisible = magazineCategoryMenuVisible
  },
  setLeftMagazineMenuVisible (state, leftMagazineMenuVisible) {
    state.leftMagazineMenuVisible = leftMagazineMenuVisible
  },
  setLeftMagazineCategory (state, leftMagazineCategory) {
    state.leftMagazineCategory = leftMagazineCategory
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
