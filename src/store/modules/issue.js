import api from '../api/issue';

// initial state
const state = { 
  hottestIssues: {
    'total': 0,
    'data': [], 
    'isSearchResult': false,
  },
  latestIssues: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  issues: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
  issueDetail: {
    _id: '',
    year: '',
    issue: '',  
    cover: '',
    price: '',
    wordNum: 0,
    pages: 0,
    pdf: '',
    epub: '',
    xml: '',
    mobi: '',
    publishedAt: '',
    description: '',
    creator:'',
    strTags: '',
    tags: []
  },
  issueError: '',
  issueSaveStatus: false, 
  issueDeleteStatus: false,
  
  issueDeleteResult: {
    issueId: '',
    status: false
  },
  issueDetailReady: false,
  savedIssue: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = {
  hottestIssues: state => state.hottestIssues.data,
  issues: state => state.issues.data, 
  latestIssues: state => state.latestIssues.data,
  hottestIssuesTotal: state => state.hottestIssues.total,
  issuesTotal: state => state.issues.total,
  latestIssuesTotal: state => state.latestIssues.total,
  issueDetail: state => state.issueDetail, 
  savedIssue: state => state.savedIssue,
  issueSaveStatus: state => state.issueSaveStatus,  
  issueDeleteStatus: state => state.issueDeleteStatus,  
  issueDeleteResult: state => state.issueDeleteResult,
  issueDetailReady: state => state.issueDetailReady,
  
};

// actions
const actions = { 
  getHottestIssues ({ commit, state }, params) {  
    let promise = api.getHottest(params.category, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setHottestIssues', response.data); 
      commit('setIssues', state.hottestIssues); 
    }, (response) => {
      console.log(response);
      commit('setHottestIssues', []); 
      commit('setIssues', []); 
    });
  }, 
  getLatestIssues ({ commit,state }, params) {  
    let promise = api.getLatest(params.magazineId,  params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setLatestIssues', response.data); 
      commit('setIssues', state.latestIssues); 
    }, (response) => {
      console.log(response);
      commit('setLatestIssues', []); 
      commit('setIssues', []);
    });
  }, 
  searchIssues ({ commit }, params) {  
    let promise = api.search(params.keywords, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keywords': params.keywords};
      commit('setIssues', result); 
    }, (response) => {
      console.log(response); 
      commit('setIssues', []);  
    });
  }, 
  getIssueDetail({ commit,state }, params) { 
    commit('setIssueDetailReady',false);
    let promise = api.getIssueDetail(params.issueId);
    promise.then((response) => {
      //console.log(response);
      commit('setIssueDetail', response.data);  
      commit('setIssueDetailReady',true);
    }, (response) => { 
      commit('setIssueError', '文章内容为空或不存在');
      console.log(response); 
    }); 
  }
};

// mutations
const mutations = {
  setHottestIssues (state, issues) {
    // 变更状态
    state.hottestIssues.total = issues.total;
    state.hottestIssues.data = issues.data;
    state.hottestIssues.isSearchResult = false;
  }, 
  setIssues (state, issues) {
    // 变更状态
    state.issues = issues; 
  },
  setLatestIssues (state, issues) {
    // 变更状态
    state.latestIssues.total = issues.total;
    state.latestIssues.data = issues.data;
    state.latestIssues.isSearchResult = false;
  }, 
  setIssueDetail(state, issue) {
    // 变更状态
    if(issue){
      for(let k in issue){ 
        if( k === 'tags'){ 
            state.issueDetail[k] = [];
            for(let item of issue[k]){ 
              state.issueDetail[k].push(item);
            }
            if(k === 'tags' && Object.prototype.toString.call(issue.tags)==='[object Array]'){
              state.issueDetail.strTags = issue.tags.join(' ');
            }
          }else{
             state.issueDetail[k] = issue[k]; 
          } 
      }
    }
  },
  setSavedIssue(state, issue) {
      // 变更状态
    state.savedIssue.id = issue.id;
    state.savedIssue.title = issue.title; 
  }, 
  setIssueError(state, error) {
    // 变更状态
    state.issueError = error; 
  }, 
  clearIssueError(state){
    state.issueError = '';
  }, 
  setIssueSaveStatus(state, status) {
    // 变更状态
    state.issueSaveStatus = status; 
  },
  setIssueDeleteStatus(state, status) {
    // 变更状态
    state.issueDeleteStatus = status; 
  }, 
  setIssueDeleteResult(state, result) {
    // 变更状态
    state.issueDeleteResult = result; 
  },
  setIssueDetailReady(state, status) {
    // 变更状态
    state.issueDetailReady = status; 
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
