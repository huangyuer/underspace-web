import Vue from 'vue'
import config from '../config'

export default {
  getMagazineDetails (magazineId) {
    let apiUrl = `${config.API_HOST}/magzines?${magazineId}/details`
    return Vue.http.get(apiUrl)
  },
  getLatestMagazines (limit, page) {
    // category = encodeURI(category)
    let apiUrl = `${config.API_HOST}/magzines?&limit=${limit}&page=${page}&orderBy=latest`
    return Vue.http.get(apiUrl)
  },
}
