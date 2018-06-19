import api from '../api/uploader';

// initial state
const state = {
  uploadToken: {
          'accessId': '',
          'policy': '', 
          'callback': '',
          'signature': ''
        }, 
  uploadError: ''
};

// getters
const getters = {
  uploadToken: state => state.uploadToken,  
};

// actions
const actions = { 
  getUploadToken ({ commit }, params) {  
    let promise = api.getUploadToken(params.authorizationToken);
    promise.then((response) => {
      console.log(response);
      let token = response.body;
      if(token){
        commit('setUploadToken', token);
      } 
    }, (response) => {
      console.log(response);
      commit('setUploadError', '获取Upload Token失败');
      console.log(state.uploadError);
    }); 
  }
};

// mutations
const mutations = {
  setUploadToken (state, token) {
      // 变更状态
    state.uploadToken.accessId = token.accessid;
    state.uploadToken.callback = token.callback;
    state.uploadToken.signature = token.signature;
    state.uploadToken.policy = token.policy; 
  }, 
  setUploadError(state, error){ 
    state.uploadError = error;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
