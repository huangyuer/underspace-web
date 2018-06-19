import api from '../api/works';

// initial state
const state = { 
  hottestWorks: {
    'total': 0,
    'data': [], 
    'isSearchResult': false,
  },
  latestWorks: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  works: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  worksDetail: {
    _id: '',
    title: '',
    categories: [],
    designKinds: [],
    summary: '',
    content: '',
    cover: '',
    oriAuthor: '',
    oriAuthorIntro: '',
    speciality: '',
    background: '',
    gain: '',
    courses: '',
    target: '',
    author: '',
    tags: [], 
    strTags: '',
    images: []
  },
  worksError: '',
  worksSaveStatus: false, 
  worksDeleteStatus: false,
  
  worksDeleteResult: {
    worksId: '',
    status: false
  },
  worksDetailReady: false,
  savedWorks: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = {
  hottestWorks: state => state.hottestWorks.data,
  works: state => state.works.data, 
  latestWorks: state => state.latestWorks.data,
  hottestWorksTotal: state => state.hottestWorks.total,
  worksTotal: state => state.works.total,
  latestWorksTotal: state => state.latestWorks.total,
  worksDetail: state => state.worksDetail, 
  savedWorks: state => state.savedWorks,
  worksSaveStatus: state => state.worksSaveStatus,  
  worksDeleteStatus: state => state.worksDeleteStatus,  
  worksDeleteResult: state => state.worksDeleteResult,
  worksDetailReady: state => state.worksDetailReady,
  isSearchResult: state => state.works.isSearchResult,
};

// actions
const actions = { 
  getHottestWorks ({ commit, state }, params) {  
    let promise = api.getHottest(params.profession,params.era, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setHottestWorks', response.data); 
      commit('setWorks', state.hottestWorks); 
    }, (response) => {
      console.log(response);
      commit('setHottestWorks', []); 
      commit('setWorks', []); 
    });
  }, 
  getLatestWorks ({ commit,state }, params) {  
    let promise = api.getLatest(params.category, params.era, params.area, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setLatestWorks', response.data); 
      commit('setWorks', state.latestWorks); 
    }, (response) => {
      console.log(response);
      commit('setLatestWorks', []); 
      commit('setWorks', []);
    });
  }, 
  searchWorks ({ commit }, params) {  
    let promise = api.search(params.keywords, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keywords': params.keywords};
      commit('setWorks', result); 
    }, (response) => {
      console.log(response); 
      commit('setWorks', []);  
    });
  }, 
  getWorksDetail({ commit,state }, params) { 
    commit('setWorksDetailReady',false);
    let promise = api.getWorksDetail(params.worksId);
    promise.then((response) => {
      //console.log(response);
      commit('setWorksDetail', response.data);  
      commit('setWorksDetailReady',true);
    }, (response) => { 
      commit('setWorksError', '作品内容为空或不存在');
      console.log(response); 
    }); 
  }, 
  postWorks ({ commit }, worksInfo) {   
    commit('setWorksSaveStatus', false);
    let promise = api.postWorks(worksInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedWorks', response.data); 
      commit('setWorksSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setWorksError', '作品保存失败'); 
    });
  }, 
  putWorks ({ commit }, worksInfo) {   
    commit('setWorksSaveStatus', false);
    let promise = api.putWorks(worksInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedWorks', response.data); 
      commit('setWorksSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setWorksError', '作品修改失败'); 
    });
  },
  deleteWorks ({ commit }, worksId) {   
    commit('setWorksDeleteStatus', false);
    commit('setWorksDeleteResult', {worksId: worksId, status: false});  
    let promise = api.deleteWorks(worksId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setWorksDeleteStatus', true); 
      commit('setWorksDeleteResult', {worksId: worksId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setWorksError', '作品删除失败'); 
    });
  }
};

// mutations
const mutations = {
  setHottestWorks (state, works) {
    // 变更状态
    state.hottestWorks.total = works.total;
    state.hottestWorks.data = works.data;
    state.hottestWorks.isSearchResult = false;
  }, 
  setWorks (state, works) {
    // 变更状态
    state.works = works; 
  },
  setLatestWorks (state, works) {
    // 变更状态
    state.latestWorks.total = works.total;
    state.latestWorks.data = works.data;
    state.latestWorks.isSearchResult = false;
  }, 
  setWorksDetail(state, works) {
    // 变更状态
    if(works){
      for(let k in works){
        let s = ['designKinds', 'images', 'categories', 'tags'];
        if(s.indexOf(k) >= 0){ 
            state.worksDetail[k] = [];
            for(let item of works[k]){ 
              state.worksDetail[k].push(item);
            }
            if(k === 'tags' && Object.prototype.toString.call(works.tags)==='[object Array]'){
              state.worksDetail.strTags = works.tags.join(' ');
            }
          }else{
             state.worksDetail[k] = works[k]; 
          }
      }
    } 
  },
  setSavedWorks(state, works) {
      // 变更状态
    state.savedWorks.id = works.id;
    state.savedWorks.title = works.title; 
  }, 
  setWorksError(state, error) {
    // 变更状态
    state.worksError = error; 
  }, 
  clearWorksError(state){
    state.worksError = '';
  }, 
  setWorksSaveStatus(state, status) {
    // 变更状态
    state.worksSaveStatus = status; 
  },
  setWorksDeleteStatus(state, status) {
    // 变更状态
    state.worksDeleteStatus = status; 
  }, 
  setWorksDeleteResult(state, result) {
    // 变更状态
    state.worksDeleteResult = result; 
  },
  setWorksDetailReady(state, status) {
    // 变更状态
    state.worksDetailReady = status; 
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
