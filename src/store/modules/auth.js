import api from '../api/auth';
import {getCookie, setCookie} from '../../utils/cookie';

// initial state
const state = {
  loggedIn: false,
  userInfo:{
    userId: '',
    username: '',
    nickname: '',
    avatar: '',
    sessionToken: ''
  },
 
  favoriteBooks: [],
  favoriteBooksReady: false,
 
  registered: false,
  loginAndRegisterDialogVisible: false,
  loginDialogVisible: false,
  registerDialogVisible: false,
  registerNextStepVisible: false,  
  getBackPasswordDialogVisible: false,   
  loginError: '',
  registerError: '',
  loginOrRegister: 'login', 
  registerSuccess: false, 
};

// getters
const getters = {
  loggedIn: state => state.loggedIn,
  registerError: state => state.registerError,
  userInfo: state => state.userInfo,
  loggedUser: state => { 
    let userInfo = getCookie('userInfo');
    if (userInfo) {
      let user = JSON.parse(userInfo);
      return user;
    } else {
      return state.userInfo;
    }
  }, 
  loginError: state => state.loginError,
  registered: state => state.registered,

  loginOrRegister: state => state.loginOrRegister,
  registerSuccess: state => state.registerSuccess, 
  favoriteBooks: state => state.favoriteBooks,
  favoriteBooksReady: state => state.favoriteBooksReady,
  
  
  loginAndRegisterDialogVisible: state => state.loginAndRegisterDialogVisible,
  loginDialogVisible: state => state.loginDialogVisible,
  registerDialogVisible: state => state.registerDialogVisible, 
  registerNextStepVisible: state => state.registerNextStepVisible,
  getBackPasswordDialogVisible: state => state.getBackPasswordDialogVisible,
  
};

// actions
const actions = { 
  login ({ commit }, userInfo) {  
    let promise = api.login(userInfo.username, userInfo.password);
    promise.then((response) => {
      console.log(response);
      if(response){
        let userId = response.data.userId;
        let token = response.data.sessionToken; 
        let user = {
          userId: userId,
          sessionToken: token, 
          nickname: response.data.nickname,
          avatar: response.data.avatar,
        };
        commit('setUserInfo', user);
        commit('setLoggedIn'); 
        commit('hideAllDialog'); 
        if(token.indexOf('Bearer') !== 0){
          token = 'Bearer ' + token;
        }
        setCookie('sessionToken', token, 7);
        setCookie('userId', userId, 7); 
        setCookie('userInfo', JSON.stringify(user), 7);
      }  
    }, (error) => {
      console.log(error);
      commit('setLoginError', error); 
    }); 
  }, 
  registerByEmail ({ commit }, userInfo) {  
    let promise = api.registerByEmail(userInfo.username,userInfo.email, userInfo.password);
    promise.then((response) => {
      console.log(response);

      commit('setUserInfo', userInfo);
      commit('setLoggedIn'); 
      commit('hideLoginDialog');
      commit('showRegisterDialog');
    }, (response) => {
      console.log(response);
      commit('setLoginError', response.data);
      
    }); 
  }, 
  registerByMobile({ commit }, userInfo) { 
    commit('setRegisterSuccess', false); 
    let promise = api.registerByMobile(userInfo);
    promise.then((response) => {
      console.log(response);
      let userId = response.data.userId;
      let token = response.data.sessionToken; 
      let user = {
        userId: userId,
        sessionToken: token,
        nickname: response.data.nickname,
        avatar: response.data.avatar, 
      };
      commit('setUserInfo', user); 
      commit('setLoggedIn');  
      if(token.indexOf('Bearer') !== 0){
        token = 'Bearer ' + token;
      }
      setCookie('sessionToken', token, 7);
      setCookie('userId', userId, 7); 
      setCookie('userInfo', JSON.stringify(user), 7);
      commit('setRegisterSuccess', true);
      commit('hideAllDialog'); 
    }, (error) => { 
      console.log(error);
      commit('setRegisterError', error); 
      commit('setRegisterSuccess', false);
    }); 
  }, 
  completeRegister({ commit }, userInfo) {  
    let promise = api.completeRegister(userInfo.userId, userInfo.type,userInfo.school);
    promise.then((response) => {
      console.log(response);  
      commit('hideLoginDialog'); 
    }, (response) => {
      console.log(response); 
      commit('setLoginError', response.data);
      console.log(state.loginError);
    }); 
  }, 
  checkRegisterStatus({ commit }, params){
    commit('setRegisterStatus', false);
    let promise = api.checkRegisterStatus(params.mobile);
    promise.then((response) => {
       console.log(response.data); 
       commit('setRegisterStatus', true);
    }, (error) => { 
       commit('setRegisterStatus', false);
    }); 
  },

 
  getVercode({ commit }, mobileInfo){
    let promise = api.getVercode(mobileInfo.mobile, mobileInfo.kind);
    promise.then((response) => {
       console.log(response.status);
    }, (error) => { 
       commit('setLoginError', error);
    }); 
  },
  getFavoriteBooks({ commit }, mobileInfo){
    commit('setFavoriteBooksReady', false);
    let promise = api.getFavoriteBooks();
    promise.then((response) => { 
      commit('setFavoriteBooks', response.data);
      commit('setFavoriteBooksReady', true);
    }, (error) => { 
        commit('setFavoriteBooksReady', false);
    }); 
  }
};

// mutations
const mutations = {
  toggleLoginState (state) {
      // 变更状态
    state.loggedIn = ! state.loggedIn;
  }, 
  setUserInfo(state, userInfo){
    let resUserInfo = (typeof userInfo === 'string') ? JSON.parse(userInfo) : userInfo;
    if(resUserInfo){
      for(let k in resUserInfo){  
        state.userInfo[k] = resUserInfo[k];  
      }
    }
  },
 
  setFavoriteBooks(state, favoriteBooks){
    state.favoriteBooks = favoriteBooks;
  },
  setFavoriteBooksReady(state, status){
    state.favoriteBooksReady = status;
  }, 
  setLoggedOut(state){
    state.loggedIn = false;
  },


  
  setLoggedOut(state){
    state.loggedIn = false;
  },
 
  setLoggedIn(state){
    state.loggedIn = true;
  },
  showLoginDialog(state){
    state.loginAndRegisterDialogVisible = true;
    state.loginDialogVisible = true; 
  },
  hideLoginDialog(state){ 
    state.loginDialogVisible = false;
  },
  showRegisterDialog(state){
    state.loginAndRegisterDialogVisible = true;
    state.registerDialogVisible = true; 
  },
  hideRegisterDialog(state){
    state.registerDialogVisible = false;
  }, 
  showRegisterNextStep(state){
    state.loginAndRegisterDialogVisible = true;
    state.registerNextStepVisible = true; 
  },
  hideRegisterNextStep(state){
    state.registerNextStepVisible = false;
  },
  hideGetBackPasswordDialog(state){
    state.getBackPasswordDialogVisible = false;
  },
  hideAllDialog(state){
    state.loginDialogVisible = false;
    state.registerDialogVisible = false;
    state.registerNextStepVisible = false;
    state.getBackPasswordDialogVisible = false;
    state.loginAndRegisterDialogVisible = false;
  }, 
  showGetBackPasswordDialog(state){
    state.loginAndRegisterDialogVisible = true;
    state.getBackPasswordDialogVisible = true;
  },
  setLoginError(state, error){
    let errorInfo = (typeof error === 'string') ? JSON.parse(error) : error;

    state.loginError = errorInfo.error;
  },
  setRegisterError(state, error){ 
    state.registerError = error;
  },
  clearLoginError(state){
    state.loginError = '';
  },
  clearRegisterError(state){
    state.registerError = '';
  },
  setLogin(state){
    state.loginOrRegister = 'login';
  },
  setRegister(state){
    state.loginOrRegister = 'register';
  },
  setRegisterStatus(state, status){
    state.registered = status;
  },
  setRegisterSuccess(state, status){
    state.registerSuccess = status;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
