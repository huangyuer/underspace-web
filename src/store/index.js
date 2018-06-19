import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
// import * as getters from './getters'
import book from './modules/book'
import uploader from './modules/uploader'
import category from './modules/category'
import bookCatalog from './modules/book_catalog'
import bookChapter from './modules/book_chapter'
import works from './modules/works'
import engineer from './modules/engineer'
import literature from './modules/literature'
import magazine from './modules/magazine'
import issue from './modules/issue'
import paper from './modules/paper'
import auth from './modules/auth'

import search from './modules/search'
import searchComponent from './modules/searchComponent'
import leftPanel from './modules/leftPanel'
import rightPanel from './modules/rightPanel'
import paginator from './modules/paginator'
import searchMedia from './modules/searchMedia'
import searchContext from './modules/searchContext'
import mediaPopup from './modules/mediaPopup'
import toolBar from './modules/toolBar'
import loadingComponent from './modules/loadingComponent'
import user from './modules/user'
import mediaDetail from './modules/mediaDetail'
import sideBar from './modules/sideBar'
import comment from './modules/comment'
import entry from './modules/entry'

Vue.use(Vuex)

const state = {
  rootUrl: 'http://118.178.238.202:8000/',
  coverUrlPrefix: 'http://media.tongjix.cn/',
  OSS_PDF_SERVER_PREFIX: 'http://pdf.tongjix.cn/pc/viewer.html?docuri=',
  BOOKS_PDF_SERVER_PREFIX: 'http://pdf.tongjix.cn/pc/viewer.html?docuri=http://127.0.0.1:9090/books/', // 图书pdf服务地址前缀
  BOOKS_PDF_MOBILE_SERVER_PREFIX: 'http://pdf.tongjix.cn/mobile/viewer.html?docuri=http://127.0.0.1:9090/books/', // 手机版图书pdf服务地址前缀
  MAGAZINES_PDF_SERVER_PREFIX: 'http://pdf.tongjix.cn/pc/viewer.html?docuri=http://127.0.0.1:9090/magzines/', // 期刊pdf服务地址前缀
  MAGAZINES_PDF_MOBILE_SERVER_PREFIX: 'http://pdf.tongjix.cn/mobile/viewer.html?docuri=http://127.0.0.1:9090/magzines/', // 手机版期刊pdf服务地址前缀
  IMAGE_SERVER_PREFIX: 'http://media.tongjix.cn/' // 图片服务地址前缀
}

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state,
  getters,
  actions,
  modules: {
    book,
    bookCatalog,
    bookChapter,
    category,
    search,
    searchComponent,
    leftPanel,
    rightPanel,
    paginator,
    auth,
    searchMedia,
    searchContext,
    works,
    literature,
    magazine,
    issue,
    paper,
    engineer,
    mediaPopup,
    toolBar,
    loadingComponent,
    user,
    mediaDetail,
    sideBar,
    comment,
    uploader,
    entry
  },
  strict: debug
})
