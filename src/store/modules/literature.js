import api from '../api/literature';

// initial state
const state = { 
  hottestLiteratures: {
    'total': 0,
    'data': [], 
    'isSearchResult': false,
  },
  latestLiteratures: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  literatures: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  literatureDetail: {
     _id: '', 
    name: '',
    ISBN: '',
    publishedAt: '',
    literatureNo: '',
    recordNo: '',
    categories: [],  
    summary: '',
    pdf: '', 
    epub: '',
    strTags: '',
    texts: [],
    tags: [], 
    creator: '',
  },
  literatureError: '',
  literatureSaveStatus: false, 
  literatureDeleteStatus: false,
  literatureCategoriesEditDialogVisible: false,
  literatureSublibsEditDialogVisible: false,
  literatureClcsEditDialogVisible: false,
  literatureDeleteResult: {
    literatureId: '',
    status: false
  },
  literatureDetailReady: false,
  savedLiterature: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = {
  hottestLiteratures: state => state.hottestLiteratures.data,
  literatures: state => state.literatures.data, 
  latestLiteratures: state => state.latestLiteratures.data,
  hottestLiteraturesTotal: state => state.hottestLiteratures.total,
  literaturesTotal: state => state.literatures.total,
  latestLiteraturesTotal: state => state.latestLiteratures.total,
  literatureDetail: state => state.literatureDetail, 
  savedLiterature: state => state.savedLiterature,
  literatureSaveStatus: state => state.literatureSaveStatus,  
  literatureDeleteStatus: state => state.literatureDeleteStatus,  
  literatureDeleteResult: state => state.literatureDeleteResult,
  literatureDetailReady: state => state.literatureDetailReady,
  literatureCategoriesEditDialogVisible: state => state.literatureCategoriesEditDialogVisible,
  literatureSublibsEditDialogVisible: state => state.literatureSublibsEditDialogVisible,
  literatureClcsEditDialogVisible: state => state.literatureClcsEditDialogVisible,
};

// actions
const actions = { 
  getHottestLiteratures ({ commit, state }, params) {  
    let promise = api.getHottest(params.category, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setHottestLiteratures', response.data); 
      commit('setLiteratures', state.hottestLiteratures); 
    }, (response) => {
      console.log(response);
      commit('setHottestLiteratures', []); 
      commit('setLiteratures', []); 
    });
  }, 
  getLatestLiteratures ({ commit,state }, params) {  
    let promise = api.getLatest(params.category, params.era, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setLatestLiteratures', response.data); 
      commit('setLiteratures', state.latestLiteratures); 
    }, (response) => {
      console.log(response);
      commit('setLatestLiteratures', []); 
      commit('setLiteratures', []);
    });
  }, 
  searchLiteratures ({ commit }, params) {  
    let promise = api.search(params.keywords, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keywords': params.keywords};
      commit('setLiteratures', result); 
    }, (response) => {
      console.log(response); 
      commit('setLiteratures', []);  
    });
  }, 
  getLiteratureDetail({ commit,state }, params) { 
    commit('setLiteratureDetailReady',false);
    let promise = api.getLiteratureDetail(params.literatureId);
    promise.then((response) => {
      //console.log(response);
      commit('setLiteratureDetail', response.data);  
      commit('setLiteratureDetailReady',true);
    }, (response) => { 
      commit('setLiteratureError', '专家不存在');
      console.log(response); 
    }); 
  }, 
  postLiterature ({ commit }, literatureInfo) {   
    commit('setLiteratureSaveStatus', false);
    let promise = api.postLiterature(literatureInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedLiterature', response.data); 
      commit('setLiteratureSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setLiteratureError', '专家保存失败'); 
    });
  }, 
  postLiteratureCategory ({ commit }, categoryInfo) {   
    commit('setLiteratureSaveStatus', false);
    let promise = api.postLiteratureCategory(categoryInfo.literatureId, categoryInfo.category);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedLiterature', response.data); 
      commit('setLiteratureSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setLiteratureError', '保存失败'); 
    });
  }, 
  putLiterature ({ commit }, literatureInfo) {   
    commit('setLiteratureSaveStatus', false);
    let promise = api.putLiterature(literatureInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedLiterature', response.data); 
      commit('setLiteratureSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setLiteratureError', '修改失败'); 
    });
  },
  putLiteratureCategory ({ commit }, categoryInfo) {   
    commit('setLiteratureSaveStatus', false);
    let promise = api.putLiteratureCategory(categoryInfo.literatureId, categoryInfo.category);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedLiterature', response.data); 
      commit('setLiteratureSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setLiteratureError', '修改失败'); 
    });
  },
  moveToLiteratureCategory ({ commit }, categoryInfo) {   
    commit('setLiteratureSaveStatus', false);
    let promise = api.moveToLiteratureCategory(categoryInfo.literatureId, categoryInfo.category, categoryInfo.moveToId);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedLiterature', response.data); 
      commit('setLiteratureSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setLiteratureError', '修改失败'); 
    });
  },
  deleteLiterature ({ commit }, literatureId) {   
    commit('setLiteratureDeleteStatus', false);
    commit('setLiteratureDeleteResult', {literatureId: literatureId, status: false});  
    let promise = api.deleteLiterature(literatureId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setLiteratureDeleteStatus', true); 
      commit('setLiteratureDeleteResult', {literatureId: literatureId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setLiteratureError', '删除失败'); 
    });
  },
  deleteLiteratureCategory ({ commit }, categoryInfo) {   
    commit('setLiteratureDeleteStatus', false);
    commit('setLiteratureDeleteResult', {literatureId: categoryInfo.literatureId, status: false});  
    let promise = api.deleteLiteratureCategory(categoryInfo.literatureId, categoryInfo.categoryId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setLiteratureDeleteStatus', true); 
      commit('setLiteratureDeleteResult', {literatureId: categoryInfo.literatureId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setLiteratureError', '删除失败'); 
    });
  }
};

// mutations
const mutations = {
  setHottestLiteratures (state, literatures) {
    // 变更状态
    state.hottestLiteratures.total = literatures.total;
    state.hottestLiteratures.data = literatures.data;
    state.hottestLiteratures.isSearchResult = false;
  }, 
  setLiteratures (state, literatures) {
    // 变更状态
    state.literatures = literatures; 
  },
  setLatestLiteratures (state, literatures) {
    // 变更状态
    state.latestLiteratures.total = literatures.total;
    state.latestLiteratures.data = literatures.data;
    state.latestLiteratures.isSearchResult = false;
  }, 
  setLiteratureDetail(state, literature) {
    // 变更状态
    if(literature){
      for(let k in literature){ 
        if(k === 'categories' || k === 'texts' || k === 'tags'){ 
            state.literatureDetail[k] = [];
            for(let item of literature[k]){ 
              state.literatureDetail[k].push(item);
            }
            if(k === 'tags' && Object.prototype.toString.call(literature.tags)==='[object Array]'){
              state.literatureDetail.strTags = literature.tags.join(' ');
            }
          }else{
             state.literatureDetail[k] = literature[k]; 
          } 
      }
    }
  },
  setSavedLiterature(state, literature) {
      // 变更状态
    state.savedLiterature.id = literature.id;
    state.savedLiterature.title = literature.title; 
  }, 
  setLiteratureError(state, error) {
    // 变更状态
    state.literatureError = error; 
  }, 
  clearLiteratureError(state){
    state.literatureError = '';
  }, 
  setLiteratureSaveStatus(state, status) {
    // 变更状态
    state.literatureSaveStatus = status; 
  },
  setLiteratureDeleteStatus(state, status) {
    // 变更状态
    state.literatureDeleteStatus = status; 
  }, 
  setLiteratureDeleteResult(state, result) {
    // 变更状态
    state.literatureDeleteResult = result; 
  },
  setLiteratureDetailReady(state, status) {
    // 变更状态
    state.literatureDetailReady = status; 
  },
  showLiteratureCategoriesEditDialog(state) {
    // 变更状态
    state.literatureCategoriesEditDialogVisible = true; 
  },
  hideLiteratureCategoriesEditDialog(state) {
    // 变更状态
    state.literatureCategoriesEditDialogVisible = false; 
  },
  showLiteratureSublibsEditDialog(state) {
    // 变更状态
    state.literatureSublibsEditDialogVisible = true; 
  },
  hideLiteratureSublibsEditDialog(state) {
    // 变更状态
    state.literatureSublibsEditDialogVisible = false; 
  },
  showLiteratureClcsEditDialog(state) {
    // 变更状态
    state.literatureClcsEditDialogVisible = true; 
  },
  hideLiteratureClcEditDialog(state) {
    // 变更状态
    state.literatureClcsEditDialogVisible = false; 
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};
