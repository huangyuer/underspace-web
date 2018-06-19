import axios from 'axios'
import config from '../config'

export default {
  searchAll(data) {
    let apiUrl = `${config.API_HOST}/search/all`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchBook(data) {
    let apiUrl = `${config.API_HOST}/search/book`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchBookChapter(data) {
    let apiUrl = `${config.API_HOST}/search/bookchapter`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchProject(data) {
    let apiUrl = `${config.API_HOST}/search/project`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchEngineer(data) {
    let apiUrl = `${config.API_HOST}/search/engineer`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchMedia(data) {
    let apiUrl = `${config.API_HOST}/search/media`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchRequirement(data) {
    let apiUrl = `${config.API_HOST}/search/requirement`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchLiterature(data) {
    let apiUrl = `${config.API_HOST}/search/literature`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchExpertPatent(data) {
    let apiUrl = `${config.API_HOST}/search/expertpatent`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索图书时，侧边栏展示clcs分类
  searchBookClcs(data) {
    let apiUrl = `${config.API_HOST}/search/book/clcs`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索图书时，侧边栏展示sublibs分类
  searchBookSublibs(data) {
    let apiUrl = `${config.API_HOST}/search/book/sublibs`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //通过clcs字段搜索图书
  searchBookClcsDataList(data) {
    let apiUrl = `${config.API_HOST}/search/clcs`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //通过sublibs搜索图书
  searchBookSublibsDataList(data) {
    let apiUrl = `${config.API_HOST}/search/sublibs`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索工程时，侧边栏展示年代
  searchProjectEra(data) {
    let apiUrl = `${config.API_HOST}/search/project/era`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索工程时，侧边栏展示地区
  searchProjectArea(data) {
    let apiUrl = `${config.API_HOST}/search/project/area`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'工程师'或则searchAll界面上的'工程师'时
  searchEngineerEraDataList(data) {
    let apiUrl = `${config.API_HOST}/search/engineer/category/era`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'工程师'或则searchAll界面上的'工程师'时
  searchEngineerTradesDataList(data) {
    let apiUrl = `${config.API_HOST}/search/engineer/category/trades`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'企业需求'或则searchAll界面上的'需求'时
  searchRequirementProvinceDataList(data) {
    let apiUrl = `${config.API_HOST}/search/requirement/category/province`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'企业需求'或则searchAll界面上的'需求'时
  searchRequirementWayDataList(data) {
    let apiUrl = `${config.API_HOST}/search/requirement/category/way`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'企业需求'或则searchAll界面上的'工程师'时
  searchMediaDataList(data) {
    let apiUrl = `${config.API_HOST}/search/media/category`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'工程文献'或则searchAll界面上的'工程师'时
  searchLiteratureEraDataList(data) {
    let apiUrl = `${config.API_HOST}/search/literature/category/era`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'工程文献'或则searchAll界面上的'工程师'时
  searchLiteratureCategoryDataList(data) {
    let apiUrl = `${config.API_HOST}/search/literature/category/category`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击搜索上方的'知识产权'或则searchAll界面上的'工程师'时
  searchKnowledgeCategoryDataList(data) {
    let apiUrl = `${config.API_HOST}/search/knowledge/category`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //工程下点击"年代"类别
  searchProjectEraChild(data) {
    let apiUrl = `${config.API_HOST}/search/project/era/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //工程下点击"地区"类别
  searchProjectAreaChild(data) {
    let apiUrl = `${config.API_HOST}/search/project/area/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //工程师下点击"年代"
  searchEngineerEraChild(data) {
    let apiUrl = `${config.API_HOST}/search/engineer/era/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //工程师下点击"行业"
  searchEngineerTradeChild(data) {
    let apiUrl = `${config.API_HOST}/search/engineer/trade/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索图表
  searchBookchart(data) {
    let apiUrl = `${config.API_HOST}/search/bookchart`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索图片
  searchBookimage(data) {
    let apiUrl = `${config.API_HOST}/search/bookimage`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索公式
  searchBookformula(data) {
    let apiUrl = `${config.API_HOST}/search/bookformula`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击企业需求，"省份"
  searchRequirementProvinceChild(data) {
    let apiUrl = `${config.API_HOST}/search/requirement/province/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击企业需求，"途径"
  searchRequirementWayChild(data) {
    let apiUrl = `${config.API_HOST}/search/requirement/way/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击工程文献，"年代
  searchLiteratureEraChild(data) {
    let apiUrl = `${config.API_HOST}/search/literature/era/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //点击工程文献，"类别"
  searchLiteratureCategoryChild(data) {
    let apiUrl = `${config.API_HOST}/search/literature/category/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索专家
  searchExpertChild(data) {
    let apiUrl = `${config.API_HOST}/search/expert/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索专利
  searchPatentChild(data) {
    let apiUrl = `${config.API_HOST}/search/patent/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  // 搜索科研成果
  searchAchievementChild(data) {
    let apiUrl = `${config.API_HOST}/search/achievement/child`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  // 搜索论文
  searchPaper(data) {
    let apiUrl = `${config.API_HOST}/search/paper`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //搜索论文分类
  searchPaperAggs(data) {
    let apiUrl = `${config.API_HOST}/search/paper/aggs`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  searchMagazine(data) {
    let apiUrl = `${config.API_HOST}/search/magazine`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  // 获取登录用户收藏的图书
  getUserFavoriteBooks() {
    let apiUrl = `${config.API_HOST}/users/favorite/books`
    let promise = axios.get(apiUrl)
    return promise
  },
  // 收藏图书
  addUserFavoriteBooks(data) {
    let apiUrl = `${config.API_HOST}/users/add/favorite/book`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  //取消收藏图书
  removeUserFavoriteBooks(data) {
    let apiUrl = `${config.API_HOST}/users/cancel/favorite/book`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  // http://home.tjdesignx.com/#/selected   设计到的搜索
  searchHybrid(data) {
    let apiUrl = `${config.API_HOST}/search/hybrid`
    let promise = axios.post(apiUrl, data)
    return promise
  },
  // 增加点击数
  addClickCount(data) {
    let apiUrl = `${config.API_HOST}/search/click/count`
    let promise = axios.post(apiUrl, data)
    return promise
  }
}
