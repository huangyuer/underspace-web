import api from '../api/engineer';

// initial state
const state = { 
  hottestEngineers: {
    'total': 0,
    'data': [], 
    'isSearchResult': false,
  },
  latestEngineers: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  engineers: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  engineerDetail: {
    _id: '',
    name: '',
    birthday: '',
    deathday: '',
    era: '',
    birthplace: '',
    avatar: '',
    professions: [],
    trades: [],
    education: '',
    works: [],
    achievement: '',
    summary: '',
    content: '',
    author: '', 
    tags: [], 
    strTags: '',
  },
  engineerWorks: {
    _id: '',
    name: '',
    birthday: '',
    deathday: '',
    era: '',
    birthplace: '',
    avatar: '',
    professions: [],
    trades: [],
    education: '',
    works: [],
    achievement: '',
    summary: '',
    content: '',
    author: '', 
    tags: [], 
    strTags: '',
  }, // 工程师相关工程项目
  engineerWorksReady: false,
  engineerError: '',
  engineerSaveStatus: false, 
  engineerDeleteStatus: false,
  engineerWorksRelationDialogVisible: false,
  
  engineerDeleteResult: {
    engineerId: '',
    status: false
  },
  engineerDetailReady: false,
  savedEngineer: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = {
  hottestEngineers: state => state.hottestEngineers.data,
  engineers: state => state.engineers.data, 
  latestEngineers: state => state.latestEngineers.data,
  hottestEngineersTotal: state => state.hottestEngineers.total,
  engineersTotal: state => state.engineers.total,
  latestEngineersTotal: state => state.latestEngineers.total,
  engineerDetail: state => state.engineerDetail, 
  savedEngineer: state => state.savedEngineer,
  engineerSaveStatus: state => state.engineerSaveStatus,  
  engineerDeleteStatus: state => state.engineerDeleteStatus,  
  engineerDeleteResult: state => state.engineerDeleteResult,
  engineerDetailReady: state => state.engineerDetailReady,
  engineerWorks: state => state.engineerWorks,
  engineerWorksReady: state => state.engineerWorksReady,
  engineerWorksRelationDialogVisible: state => state.engineerWorksRelationDialogVisible,
};

// actions
const actions = { 
  getHottestEngineers ({ commit, state }, params) {  
    let promise = api.getHottest(params.category, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setHottestEngineers', response.data); 
      commit('setEngineers', state.hottestEngineers); 
    }, (response) => {
      console.log(response);
      commit('setHottestEngineers', []); 
      commit('setEngineers', []); 
    });
  }, 
  getLatestEngineers ({ commit,state }, params) {  
    console.log(params);
    let promise = api.getLatest(params.category, params.era, params.area, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setLatestEngineers', response.data); 
      commit('setEngineers', state.latestEngineers); 
    }, (response) => {
      console.log(response);
      commit('setLatestEngineers', []); 
      commit('setEngineers', []);
    });
  }, 
  getEngineerWorks ({ commit,state }, params) { 
    commit('setEngineerWorksReady',false); 
    let promise = api.getEngineerWorks(params.engineerId);
    promise.then((response) => { 
      commit('setEngineerWorks', response.data);  
      commit('setEngineerWorksReady',true); 
    }, (response) => {
      console.log(response);
      commit('setEngineerWorks', []); 
      commit('setEngineerWorksReady',false);
    });
  },
  searchEngineers ({ commit }, params) {  
    let promise = api.search(params.keywords, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keywords': params.keywords};
      commit('setEngineers', result); 
    }, (response) => {
      console.log(response); 
      commit('setEngineers', []);  
    });
  }, 
  getEngineerDetail({ commit,state }, params) { 
    commit('setEngineerDetailReady',false);
    let promise = api.getEngineerDetail(params.engineerId);
    promise.then((response) => {
      //console.log(response);
      commit('setEngineerDetail', response.data);  
      commit('setEngineerDetailReady',true);
    }, (response) => { 
      commit('setEngineerError', '文章内容为空或不存在');
      console.log(response); 
    }); 
  }, 
  postEngineer ({ commit }, engineerInfo) {   
    commit('setEngineerSaveStatus', false);
    let promise = api.postEngineer(engineerInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedEngineer', response.data); 
      commit('setEngineerSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setEngineerError', '文章保存失败'); 
    });
  }, 
  putEngineer ({ commit }, engineerInfo) {   
    commit('setEngineerSaveStatus', false);
    let promise = api.putEngineer(engineerInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedEngineer', response.data); 
      commit('setEngineerSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setEngineerError', '文章修改失败'); 
    });
  },
  deleteEngineer ({ commit }, engineerId) {   
    commit('setEngineerDeleteStatus', false);
    commit('setEngineerDeleteResult', {engineerId: engineerId, status: false});  
    let promise = api.deleteEngineer(engineerId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setEngineerDeleteStatus', true); 
      commit('setEngineerDeleteResult', {engineerId: engineerId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setEngineerError', '文章删除失败'); 
    });
  }
};

// mutations
const mutations = {
  setHottestEngineers (state, engineers) {
    // 变更状态
    state.hottestEngineers.total = engineers.total;
    state.hottestEngineers.data = engineers.data;
    state.hottestEngineers.isSearchResult = false;
  }, 
  setEngineers (state, engineers) {
    // 变更状态
    state.engineers = engineers; 
  },
  setLatestEngineers (state, engineers) {
    // 变更状态
    state.latestEngineers.total = engineers.total;
    state.latestEngineers.data = engineers.data;
    state.latestEngineers.isSearchResult = false;
  }, 
  setEngineerDetail(state, engineer) {
    // 变更状态
    if(engineer){
      for(let k in engineer){ 
        if(k === 'professions' || k === 'trades' || k === 'tags' || k === 'works'){ 
            state.engineerDetail[k] = [];
            for(let item of engineer[k]){ 
              state.engineerDetail[k].push(item);
            }
            if(k === 'tags' && Object.prototype.toString.call(engineer.tags)==='[object Array]'){
              state.engineerDetail.strTags = engineer.tags.join(' ');
            }
          }else{
             state.engineerDetail[k] = engineer[k]; 
          } 
      }
    }
  },
  setSavedEngineer(state, engineer) {
      // 变更状态
    state.savedEngineer.id = engineer.id;
    state.savedEngineer.title = engineer.title; 
  }, 
  setEngineerError(state, error) {
    // 变更状态
    state.engineerError = error; 
  }, 
  clearEngineerError(state){
    state.engineerError = '';
  }, 
  setEngineerSaveStatus(state, status) {
    // 变更状态
    state.engineerSaveStatus = status; 
  },
  setEngineerDeleteStatus(state, status) {
    // 变更状态
    state.engineerDeleteStatus = status; 
  }, 
  setEngineerDeleteResult(state, result) {
    // 变更状态
    state.engineerDeleteResult = result; 
  },
  setEngineerDetailReady(state, status) {
    // 变更状态
    state.engineerDetailReady = status; 
  },
  setEngineerWorks(state, engineer) {
    // 变更状态
    if(engineer){
      for(let k in engineer){ 
        if(k === 'professions' || k === 'trades' || k === 'tags' || k === 'works'){ 
            state.engineerWorks[k] = [];
            for(let item of engineer[k]){ 
              state.engineerWorks[k].push(item);
            }
            if(k === 'tags' && Object.prototype.toString.call(engineer.tags)==='[object Array]'){
              state.engineerWorks.strTags = engineer.tags.join(' ');
            }
          }else{
             state.engineerWorks[k] = engineer[k]; 
          } 
      }
    }
  },
  setEngineerWorksReady(state, status) {
    // 变更状态
    state.engineerWorksReady = status; 
  },
  showEngineerWorksRelationDialog(state) {
    // 变更状态
    state.engineerWorksRelationDialogVisible = true; 
  },
  hideEngineerWorksRelationDialog(state) {
    // 变更状态
    state.engineerWorksRelationDialogVisible = false; 
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
