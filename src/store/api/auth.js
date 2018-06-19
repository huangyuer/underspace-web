import Vue from 'vue';
import config from '../config';

export default{
  login (username, password) {
    let apiUrl = `${config.API_HOST}/users/login`;
    let promise = Vue.http.post(apiUrl, {'username': username, 'password': password});
    return promise;
  },
  checkRegisterStatus (mobile) {
    let apiUrl = `${config.API_HOST}/users/exists/mobile/${mobile}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getVercode (mobile, kind) {
    let apiUrl = `${config.API_HOST}/sms/send/vercode?mobile=${mobile}&kind=${kind}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  registerByEmail (username, email, password) {
    let apiUrl = `${config.API_HOST}/users/register/by/email`;
    let promise = Vue.http.post(apiUrl, {
      'username': username, 'email': email,
      'password': password
    });
    return promise;
  },  
  registerByMobile (userInfo) {  
    let apiUrl = `${config.API_HOST}/users/register/by/mobile`;
    let promise = Vue.http.post(apiUrl,  userInfo); 
    return promise;
  },
  completeRegister (userId, type, school) {
    let apiUrl = `${config.API_HOST}/users/register/complete/` + userId;

    let promise = Vue.http.put(apiUrl, {'type': type, 'school': school});
    return promise;
  }, 
  getFavoriteBooks () {
    let apiUrl = `${config.API_HOST}/users/favorite/books`; 
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
};
