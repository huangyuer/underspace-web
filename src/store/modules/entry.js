import api from '../api/entry';

// initial state
const state = { 
  hottestEntries: {
    'total': 0,
    'data': [], 
    'isSearchResult': false,
  },
  latestEntries: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  entries: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  entryDetail: {
    _id: '',
    title: '',
    cover: '',
    kind: '', 
    summary: '',
    content: '',
    author: '', 
    tags: [], 
    strTags: '',
  }, 
  entryError: '',
  entrySaveStatus: false, 
  entryDeleteStatus: false,
   
  entryDeleteResult: {
    entryId: '',
    status: false
  },
  entryDetailReady: false,
  savedEntry: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = { 
  entries: state => state.entries.data, 
  latestEntries: state => state.latestEntries.data,
  entriesTotal: state => state.entries.total,
  latestEntriesTotal: state => state.latestEntries.total,
  entryDetail: state => state.entryDetail, 
  savedEntry: state => state.savedEntry,
  entrySaveStatus: state => state.entrySaveStatus,  
  entryDeleteStatus: state => state.entryDeleteStatus,  
  entryDeleteResult: state => state.entryDeleteResult,
  entryDetailReady: state => state.entryDetailReady, 
   
};

// actions
const actions = {  
  getLatestEntries ({ commit,state }, params) {  
    let promise = api.getLatest(params.kind,  params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setLatestEntries', response.data); 
      commit('setEntries', state.latestEntries); 
    }, (response) => {
      console.log(response);
      commit('setLatestEntries', []); 
      commit('setEntries', []);
    });
  }, 
  getMyEntries ({ commit,state }, params) {  
    let promise = api.getMyEntries(params.kind,  params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      commit('setEntries', response.data); 
    }, (response) => {
      console.log(response); 
      commit('setEntries', []);
    });
  }, 
  searchEntries ({ commit }, params) {  
    let promise = api.search(params.keywords, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keywords': params.keywords};
      commit('setEntries', result); 
    }, (response) => {
      console.log(response); 
      commit('setEntries', []);  
    });
  }, 
  getEntryDetail({ commit,state }, params) { 
    commit('setEntryDetailReady',false);
    let promise = api.getEntryDetail(params.entryId);
    promise.then((response) => {
      //console.log(response);
      commit('setEntryDetail', response.data);  
      commit('setEntryDetailReady',true);
    }, (response) => { 
      commit('setEntryError', '词条内容为空或不存在');
      console.log(response); 
    }); 
  }, 
  postEntry ({ commit }, entryInfo) {   
    commit('setEntrySaveStatus', false);
    let promise = api.postEntry(entryInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedEntry', response.data); 
      commit('setEntrySaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setEntryError', '词条保存失败'); 
    });
  }, 
  putEntry ({ commit }, entryInfo) {   
    commit('setEntrySaveStatus', false);
    let promise = api.putEntry(entryInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedEntry', response.data); 
      commit('setEntrySaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setEntryError', '词条修改失败'); 
    });
  },
  deleteEntry ({ commit }, entryId) {   
    commit('setEntryDeleteStatus', false);
    commit('setEntryDeleteResult', {entryId: entryId, status: false});  
    let promise = api.deleteEntry(entryId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setEntryDeleteStatus', true); 
      commit('setEntryDeleteResult', {entryId: entryId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setEntryError', '词条删除失败'); 
    });
  }
};

// mutations
const mutations = {
   
  setEntries (state, entries) {
    // 变更状态
    state.entries = entries; 
  },
  setLatestEntries (state, entries) {
    // 变更状态
    state.latestEntries.total = entries.total;
    state.latestEntries.data = entries.data;
    state.latestEntries.isSearchResult = false;
  }, 
  setEntryDetail(state, entry) {
    // 变更状态
    if(entry){
      for(let k in entry){ 
        if( k === 'tags'){ 
            state.entryDetail[k] = [];
            for(let item of entry[k]){ 
              state.entryDetail[k].push(item);
            }
            if(k === 'tags' && Object.prototype.toString.call(entry.tags)==='[object Array]'){
              state.entryDetail.strTags = entry.tags.join(' ');
            }
          }else{
             state.entryDetail[k] = entry[k]; 
          } 
      }
    }
  },
  setSavedEntry(state, entry) {
      // 变更状态
    state.savedEntry.id = entry.id;
    state.savedEntry.title = entry.title; 
  }, 
  setEntryError(state, error) {
    // 变更状态
    state.entryError = error; 
  }, 
  clearEntryError(state){
    state.entryError = '';
  }, 
  setEntrySaveStatus(state, status) {
    // 变更状态
    state.entrySaveStatus = status; 
  },
  setEntryDeleteStatus(state, status) {
    // 变更状态
    state.entryDeleteStatus = status; 
  }, 
  setEntryDeleteResult(state, result) {
    // 变更状态
    state.entryDeleteResult = result; 
  },
  setEntryDetailReady(state, status) {
    // 变更状态
    state.entryDetailReady = status; 
  }, 
};

export default {
  state,
  getters,
  actions,
  mutations
};
