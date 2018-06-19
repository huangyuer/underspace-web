import Vue from 'vue'
import config from '../config'

export default {
  getPaperDetails (paperId) {
    let apiUrl = `${config.API_HOST}/papers/${paperId}/details`
    return Vue.http.get(apiUrl)
  },
  getLatestPapers (issueId, limit, page) {
    // category = encodeURI(category)
    let apiUrl = `${config.API_HOST}/papers?issueId=${issueId}&limit=${limit}&page=${page}&orderBy=latest`
    return Vue.http.get(apiUrl)
  },
}
