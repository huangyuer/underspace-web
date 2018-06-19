import Vue from 'vue';
import config from '../config';


export default{
    getLatest (kind, status, auditStatus, orderBy, limit, page) {   
    let apiUrl = `${config.API_HOST}/users?kind=${kind}&status=${status}&auditStatus=${auditStatus}&orderBy=${orderBy}&limit=${limit}&page=${page}`; 
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getUserDetail (userId) {  
    let apiUrl = `${config.API_HOST}/users/${userId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getUserFullInfo (userId) {  
    let apiUrl = `${config.API_HOST}/users/${userId}/fullinfo`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  postUser (user) {  
    let apiUrl = `${config.API_HOST}/users`;
    let promise = Vue.http.post(apiUrl, user);
    return promise;
  },  
  putUser (user) {  
    let userId = user._id || '';
    let apiUrl = `${config.API_HOST}/users/${userId}`;
    delete user._id;
    let promise = Vue.http.put(apiUrl, user);
    return promise;
  },  
  changePassword (userId, params) {   
    let apiUrl = `${config.API_HOST}/users/${userId}/password`; 
    let promise = Vue.http.put(apiUrl, params);
    return promise;
  },
  resetPasswordByMobile (passwordInfo) {   
    let apiUrl = `${config.API_HOST}/users/reset/password/by/mobile`; 
    let promise = Vue.http.put(apiUrl, passwordInfo);
    return promise;
  }, 
  deleteUser (userId) {   
    let apiUrl = `${config.API_HOST}/users/${userId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(keyword, limit, page) { 
    keyword = encodeURI(keyword);
    let apiUrl = `${config.API_HOST}/users/search?keyword=${keyword}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
