import Vue from 'vue';
import config from '../config';


export default{
  listBookCatalogs (bookId, limit, page) {   
    let apiUrl = `${config.API_HOST}/book/catalogs/bookId/${bookId}?limit=${limit}&page=${page}`;
     
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  getBookCatalogDetail (catalogId) {  
    let apiUrl = `${config.API_HOST}/book/catalogs/${catalogId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  postBookCatalog (catalog) {   
    delete catalog._id;
    let apiUrl = `${config.API_HOST}/book/catalogs`;
    let promise = Vue.http.post(apiUrl, catalog);
    return promise;
  },  
  putBookCatalog (catalog) {   
    let apiUrl = `${config.API_HOST}/book/catalogs/${catalog._id}`; 
    delete catalog._id;
    let promise = Vue.http.put(apiUrl, catalog);
    return promise;
  },  
  deleteBookCatalog (catalogId) {   
    let apiUrl = `${config.API_HOST}/book/catalogs/${catalogId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(bookId, keywords, limit, page) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/book/catalogs/bookId/${bookId}/search?keywords=${keywords}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
