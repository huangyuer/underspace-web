import Vue from 'vue';
import config from '../config';

export default{
    getUploadToken (authorizationToken) { 
        let apiUrl = `${config.API_HOST}/uploader/get/token`;
    let promise = Vue.http.post(apiUrl, {'Authorization': authorizationToken});
    return promise;
  }
};