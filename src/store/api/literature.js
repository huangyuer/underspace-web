import Vue from 'vue';
import config from '../config';


export default{
  getLatest (category, era, limit, page) {  
    category = encodeURI(category);
    era = encodeURI(era);
    let apiUrl = `${config.API_HOST}/literatures?category=${category}&era=${era}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  getHottest (category, limit, page) { 
    category = encodeURI(category);
    let apiUrl = `${config.API_HOST}/literatures/hottest?category=${category}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getLiteratureDetail (literatureId) {  
    let apiUrl = `${config.API_HOST}/literatures/${literatureId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  postLiterature (literature) {  
    let apiUrl = `${config.API_HOST}/literatures`;
    let promise = Vue.http.post(apiUrl, literature);
    return promise;
  },
  postLiteratureCategory (literatureId, category) {  
    let apiUrl = `${config.API_HOST}/literatures/${literatureId}/category`;
    let promise = Vue.http.post(apiUrl, category);
    return promise;
  },  
  putLiteratureCategory (literatureId, category) {   
    let apiUrl = `${config.API_HOST}/literatures/${literatureId}/category`;
    let promise = Vue.http.put(apiUrl, category);
    return promise;
  }, 
  moveToLiteratureCategory (literatureId, category, moveToId) {   
    let apiUrl = `${config.API_HOST}/literatures/${literatureId}/category/${moveToId}`;
    let promise = Vue.http.put(apiUrl, category);
    return promise;
  }, 
  deleteLiteratureCategory (literatureId, categoryId) {   
    let apiUrl = `${config.API_HOST}/literatures/${literatureId}/category/${categoryId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },  
  putLiterature (literature) {  
    let literatureId = literature._id || '';
    let apiUrl = `${config.API_HOST}/literatures/${literatureId}`;
    delete literature._id;
    let promise = Vue.http.put(apiUrl, literature);
    return promise;
  },  
  deleteLiterature (literatureId) {   
    let apiUrl = `${config.API_HOST}/literatures/${literatureId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(keywords, limit, page) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/literatures/search?keywords=${keywords}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
