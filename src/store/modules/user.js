import api from '../api/user';

// initial state
const state = {  
  latestUsers: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
  },
  users: {
    'total': 0,
    'data': [],
    'isSearchResult': false,
    'keyword': ''
  },
  defaultAvatars: [
    'http://tjdesigner.oss-cn-shanghai.aliyuncs.com/upload/avatar/b.png',
    'http://tjdesigner.oss-cn-shanghai.aliyuncs.com/upload/avatar/r.png',
    'http://tjdesigner.oss-cn-shanghai.aliyuncs.com/upload/avatar/y.png',
    'http://tjdesigner.oss-cn-shanghai.aliyuncs.com/upload/avatar/ghost.png'
  ],
  userDetail: {
    _id: '',
    username: '',
    avatar: '',
    mobile: '',
    nickname: '',
    school: '',
    roles: [],
    degree: '',
    speciality: '',
    truename: '', //真实姓名
    IDCard: '', // 身份证扫描件
    IDCardNo: '', // 身份证号
    company: '', // 所在公司
    havePartner: '', // 有无合作伙伴
    operatorName: '', // 营运机构名称
    address: '', // 联系地址
    manager: '',  // 法定代表人
    managerPhone: '',  // 电话
    managerEmail: '', // 电子邮箱
    operatorType: '', // 企业法人营业执照所注公司类型
    TBLNo: '', // 电信经营许可证编号
    operatorLicence:'', // 企业法人营业执照扫描件
    operatorCity: '', // 归属地
    contact: '', // 联系人
    contactMobile: '', // 联系人手机 
    zipcode: '', // 邮编 
  },
  userError: '',
  userSaveStatus: false, 
  userDeleteStatus: false,
  setUserStatusSuccess: false,
  setUserAuditStatusSuccess: false,
  changePasswordStatus: false, 
  resetPasswordByMobileStatus: false,
  resetPasswordByMobileError: false,
  passwordError: '',
  userDeleteResult: {
    userId: '',
    status: false
  },
  userDetailReady: false,
  userCacheReady: false,
  savedUser: {
    id:'',
    title: ''
  }, 
};

// getters
const getters = { 
  users: state => state.users, 
  latestUsers: state => state.latestUsers,
  userDetail: state => state.userDetail, 
  savedUser: state => state.savedUser,
  userSaveStatus: state => state.userSaveStatus,  
  userDeleteStatus: state => state.userDeleteStatus,  
  userDeleteResult: state => state.userDeleteResult,
  userDetailReady: state => state.userDetailReady,
  userCacheReady: state => state.userCacheReady,
  defaultAvatars: state => state.defaultAvatars,
  setUserStatusSuccess: state => state.setUserStatusSuccess,
  setUserAuditStatusSuccess: state => state.setUserAuditStatusSuccess,
  changePasswordStatus: state => state.changePasswordStatus,
  passwordError: state => state.passwordError,
  resetPasswordByMobileStatus: state => state.resetPasswordByMobileStatus,
  resetPasswordByMobileError: state => state.resetPasswordByMobileError,
};

// actions
const actions = { 
  getLatestUsers ({ commit,state }, params) {  
    let promise = api.getLatest(params.kind, params.status, params.auditStatus, params.orderBy, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data);
      commit('setLatestUsers', response.data); 
      commit('setUsers', state.latestUsers); 
    }, (response) => {
      console.log(response);
      commit('setLatestUsers', []); 
      commit('setUsers', []);
    });
  }, 
  searchUsers ({ commit }, params) {  
    let promise = api.search(params.keyword, params.limit, params.page);
    promise.then((response) => {
      console.log(response.data); 
      let result = {'total': response.data.total, 
                    'data': response.data.data,
                    'isSearchResult': true,
                    'keyword': params.keyword};
      commit('setUsers', result); 
    }, (response) => {
      console.log(response); 
      commit('setUsers', []);  
    });
  }, 
  getUserDetail({ commit,state }, params) { 
    commit('setUserDetailReady',false);
    let promise = api.getUserDetail(params.userId);
    promise.then((response) => {
      //console.log(response);
      commit('setUserDetail', response.data);  
      commit('setUserDetailReady',true);
    }, (response) => { 
      commit('setUserError', '用户内容为空或不存在');
      console.log(response); 
    }); 
  }, 
  getUserFullInfo({ commit,state }, params) { 
    commit('setUserDetailReady',false);
    let promise = api.getUserFullInfo(params.userId);
    promise.then((response) => {
      //console.log(response);
      commit('setUserDetail', response.data);  
      commit('setUserDetailReady',true);
    }, (response) => { 
      commit('setUserError', '用户内容为空或不存在');
      console.log(response); 
    }); 
  }, 
  changePassword ({ commit }, params) {   
    commit('setChangePasswordStatus', false);
    commit('setPasswordError', ''); 
    let promise = api.changePassword(params.id, params);
    promise.then((response) => {
      console.log(response.data); 
      commit('setChangePasswordStatus', true);
    }, (response) => {
      
      let error = response.response.data.error;
      console.log(error);
      commit('setPasswordError', error); 
    });
  },
  resetPasswordByMobile({ commit }, passwordInfo) {  
    let promise = api.resetPasswordByMobile(passwordInfo);
    promise.then((response) => {
      console.log(response); 
      commit('hideAllDialog'); 
      commit('setResetPasswordByMobileStatus', true);
    }, (response) => {
      console.log(response.data);
      commit('setResetPasswordByMobileError', response.data); 
    }); 
  },
  postUser ({ commit }, userInfo) {   
    commit('setUserSaveStatus', false);
    let promise = api.postUser(userInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedUser', response.data); 
      commit('setUserSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setUserError', '用户保存失败'); 
    });
  }, 
  putUser ({ commit }, userInfo) {   
    commit('setUserSaveStatus', false);
    let promise = api.putUser(userInfo);
    promise.then((response) => {
      console.log(response.data);
      commit('setSavedUser', response.data); 
      commit('setUserSaveStatus', true); 
    }, (response) => {
      console.log(response);
      commit('setUserError', '用户修改失败'); 
    });
  },
  deleteUser ({ commit }, userId) {   
    commit('setUserDeleteStatus', false);
    commit('setUserDeleteResult', {userId: userId, status: false});  
    let promise = api.deleteUser(userId);
    promise.then((response) => {  
      console.log(response.data);
      commit('setUserDeleteStatus', true); 
      commit('setUserDeleteResult', {userId: userId, status: true}); 
    }, (response) => {
      console.log(response);
      commit('setUserError', '用户删除失败'); 
    });
  },
  setUserStatus ({ commit }, statusInfo) {  
    commit('setUserStatusSuccess', false); 
    let promise = api.putUser({_id: statusInfo.userId, status: statusInfo.status});
    promise.then((response) => {
      console.log(response.data); 
      commit('setUserStatusSuccess', true);
    }, (response) => {
      console.log(response); 
      commit('setUserStatusSuccess', false);
    });
  },
  setUserAuditStatus ({ commit }, statusInfo) {  
    commit('setUserAuditStatusSuccess', false); 
    let promise = api.putUser({_id: statusInfo.userId, auditStatus: statusInfo.auditStatus});
    promise.then((response) => {
      console.log(response.data); 
      commit('setUserAuditStatusSuccess', true);
    }, (response) => {
      console.log(response); 
      commit('setUserAuditStatusSuccess', false);
    });
  },
};

// mutations
const mutations = { 
  setUsers (state, users) {
    // 变更状态
    state.users = users; 
  },
  setPasswordError(state, error) {
    // 变更状态
    state.passwordError = error; 
  },
  clearUserError(state){
    state.userError = '';
  },
  setLatestUsers (state, users) {
    // 变更状态
    state.latestUsers.total = users.total;
    state.latestUsers.data = users.data;
    state.latestUsers.isSearchResult = false;
  }, 
  setMobileExists(state, status){
    state.mobileExists = status;
  },
  setChangePasswordStatus(state, status){
    state.changePasswordStatus = status;
  },
  setResetPasswordByMobileStatus(state, status) {
    // 变更状态
    state.resetPasswordByMobileStatus = status; 
  }, 
  setResetPasswordByMobileError(state, error){
    let errorInfo = (typeof error === 'string') ? JSON.parse(error) : error;
    
    state.resetPasswordByMobileError = errorInfo.error;
  },
  clearResetPasswordByMobileError(state){
    state.resetPasswordByMobileError = '';
  }, 
  setUserDetail(state, user) {
    // 变更状态
    if(user){
      for(let k in user){
        let s = ['roles'];
        if(s.indexOf(k) >= 0){ 
            state.userDetail[k] = [];
            for(let item of user[k]){ 
              state.userDetail[k].push(item);
            } 
          }else{
             state.userDetail[k] = user[k]; 
          }
      }
    } 
  },
  
  setSavedUser(state, user) {
      // 变更状态
    state.savedUser.id = user.id;
    state.savedUser.username = user.username; 
  }, 
  setUserError(state, error) {
    // 变更状态
    state.userError = error; 
  }, 
  clearUserError(state){
    state.userError = '';
  }, 
  setUserSaveStatus(state, status) {
    // 变更状态
    state.userSaveStatus = status; 
  },
  setUserStatusSuccess(state, status) {
    // 变更状态
    state.setUserStatusSuccess = status; 
  },
  setUserAuditStatusSuccess(state, status) {
    // 变更状态
    state.setUserAuditStatusSuccess = status; 
  },
  setUserDeleteStatus(state, status) {
    // 变更状态
    state.userDeleteStatus = status; 
  }, 
  setUserDeleteResult(state, result) {
    // 变更状态
    state.userDeleteResult = result; 
  },
  setUserDetailReady(state, status) {
    // 变更状态
    state.userDetailReady = status; 
  },
  setUserCacheReady(state, status) {
    // 变更状态
    state.userCacheReady = status; 
  },
  cacheUser(state, userForm){
    state.userCacheReady = false; 
    let storedId = userForm._id || 'userForm';
    let storedForm = JSON.parse(localStorage.getItem(storedId));
    if(! storedForm){
      storedForm = {};
    }
    for(let k in userForm){
      let s = ['roles'];
        if(s.indexOf(k) >= 0){ 
          storedForm[k] = [];
          for(let item of userForm[k]){ 
            storedForm[k].push(item);
          } 
        }else{
          storedForm[k] = userForm[k]; 
        }
    }
    if(storedForm.__v){
      storedForm.__v += 1;
    }else{
      storedForm.__v = 1;
    }
    localStorage.setItem(storedId, JSON.stringify(storedForm));
    state.userCacheReady = true; 
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
