import Vue from 'vue';
import config from '../config';

export default{
  getLatest (category, clc, lib, limit, page) {  
    category = encodeURI(category);
    clc = encodeURI(clc);
    lib = encodeURI(lib);
    let apiUrl = `${config.API_HOST}/books?category=${category}&clc=${clc}&lib=${lib}&limit=${limit}&page=${page}`;
    console.log(apiUrl); 
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  getHottest (category, limit, page) { 
    category = encodeURI(category);
    let apiUrl = `${config.API_HOST}/books/hottest?category=${category}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getBookDetail (bookId) {  
    let apiUrl = `${config.API_HOST}/books/${bookId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  postBook (book) {  
    let apiUrl = `${config.API_HOST}/books`;
    let promise = Vue.http.post(apiUrl, book);
    return promise;
  },
  postBookCategory (bookId, category) {  
    let apiUrl = `${config.API_HOST}/books/${bookId}/category`;
    let promise = Vue.http.post(apiUrl, category);
    return promise;
  },  
  putBookCategory (bookId, category) {   
    let apiUrl = `${config.API_HOST}/books/${bookId}/category`;
    let promise = Vue.http.put(apiUrl, category);
    return promise;
  }, 
  moveToBookCategory (bookId, category, moveToId) {   
    let apiUrl = `${config.API_HOST}/books/${bookId}/category/${moveToId}`;
    let promise = Vue.http.put(apiUrl, category);
    return promise;
  }, 
  deleteBookCategory (bookId, categoryId) {   
    let apiUrl = `${config.API_HOST}/books/${bookId}/category/${categoryId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },  
  putBook (book) {  
    let bookId = book._id || '';
    let apiUrl = `${config.API_HOST}/books/${bookId}`;
    delete book._id;
    let promise = Vue.http.put(apiUrl, book);
    return promise;
  },  
  deleteBook (bookId) {   
    let apiUrl = `${config.API_HOST}/books/${bookId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(keywords, limit, page) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/books/search?keywords=${keywords}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};