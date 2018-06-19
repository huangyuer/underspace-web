import api from '../api/comment';

// initial state
const state = { 
   
  comments: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keywords': ''
  },
   
  commentSaveStatus: false, 
  savedComment: {
    _id:'',
    content: '',
    parentId: '',
    userId: '',
    nickname: '',
    avatar: '',
    createdAt: '',
  },
  commentDeleteStatus: false, 
  deletedComment: {
    _id: '',
    parentId: '', 
    success: false
  }, 
};

// getters
const getters = {
  comments: state => state.comments.data, 
  commentsTotal: state => state.comments.total, 

  commentSaveStatus: state => state.commentSaveStatus,
  savedComment: state => state.savedComment,

  commentDeleteStatus: state => state.commentDeleteStatus,  
  deletedComment: state => state.deletedComment,
};

// actions
const actions = {  
  getLatestComments ({ commit,state }, params) {  
    let promise = api.getLatest(params.kind, params.srcId, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      commit('setComments', response.data); 
    }, (response) => {
      console.log(response); 
      commit('setComments', []);
    });
  }, 
  postComment ({ commit }, commentInfo) {   
    commit('setCommentSaveStatus', false);
    commit('clearSavedComment');
    let promise = api.postComment(commentInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedComment', response.data); 
      commit('setCommentSaveStatus', true); 
    }, (response) => {
      console.log(response); 
    });
  },
  deleteComment ({ commit }, params) {   
    commit('setCommentDeleteStatus', false); 
    commit('clearDeletedComment');
    let promise = api.deleteComment(params.userId, params._id, params.parentId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setCommentDeleteStatus', true); 
      commit('setDeletedComment', response.data); 
    }, (response) => {
      console.log(response);
    });
  }
};

// mutations
const mutations = {
   
  setComments (state, comments) {
    // 变更状态
    state.comments = (typeof comments === 'string') ? JSON.parse(comments) : comments; 
  },

  setCommentSaveStatus(state, status) {
    // 变更状态
    state.commentSaveStatus = status; 
  },

  clearSavedComment(state) {
    // 变更状态
    for(let k in state.savedComment){
      state.savedComment[k] = '';
    }
  }, 

  setSavedComment(state, comment) {
      // 变更状态
    state.savedComment = (typeof comment === 'string') ? JSON.parse(comment) : comment; 
  },

  setCommentDeleteStatus(state, status) {
    // 变更状态
    state.commentDeleteStatus = status; 
  }, 
  clearDeletedComment(state) {
    // 变更状态
    for(let k in state.deletedComment){
      state.deletedComment[k] = '';
    }
  },
  setDeletedComment(state, result) {
    // 变更状态

    state.deletedComment = (typeof result === 'string') ? JSON.parse(result) : result;
  },

  addComment(state, commentInfo){ 
    let resCommentInfo = (typeof commentInfo === 'string') ? JSON.parse(commentInfo) : commentInfo;
   
    if(resCommentInfo._id && resCommentInfo._id.length > 0){  
      let comment = {};
      for(let k in resCommentInfo){
        comment[k] = resCommentInfo[k];
      }
      state.comments.data.unshift(comment); 
      state.comments.total += 1;
    }
  },
  deleteComment(state, commentId){ 
    for(let k in state.comments.data){
      if(state.comments.data[k]._id === commentId){
        state.comments.data.splice(k, 1);
        state.comments.total -= 1;
      } 
    }
  },
  deleteReply(state, params){  
    for(let comment of state.comments.data){
      if(comment._id === params.parentId){ 
        for(let k in comment.replies){
          if(comment.replies[k]._id === params.commentId){
            comment.replies.splice(k, 1);
          }
        }
      }
    } 
  },
  addReply(state, replyInfo){ 

    let resReplyInfo = (typeof replyInfo === 'string') ? JSON.parse(replyInfo) : replyInfo;
   
    if(resReplyInfo && resReplyInfo.parentId !== '' && resReplyInfo._id !== ''){
      let reply = {};
      for(let k in resReplyInfo){
        reply[k] = resReplyInfo[k];
      }
      for(let comment of state.comments.data){
        if(comment._id === resReplyInfo.parentId){
          let exists = false;
          for(let rpl of comment.replies){
            if(rpl._id === reply._id){
              exists = true;
            }
          }
          if(! exists){
            comment.replies.push(reply);
          } 
        }
      }
    } 
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
