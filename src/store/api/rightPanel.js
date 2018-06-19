import axios from 'axios'

import config from '../config'

export default {
  getHotWordList () {
    let apiUrl = `${config.API_HOST}/search/hotword/list`
    let promise = axios.post(apiUrl)
    return promise
  },
  updateHotWords (data) {
    let apiUrl = `${config.API_HOST}/search/update/hotword`
    let promise = axios.post(apiUrl, data)
    return promise
  }
}
