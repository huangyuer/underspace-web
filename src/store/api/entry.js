import Vue from 'vue';
import config from '../config';


export default{
  getLatest (kind, limit, page) {  
    kind = encodeURI(kind); 
    let apiUrl = `${config.API_HOST}/entries?kind=${kind}&limit=${limit}&page=${page}&orderBy=latest`;
     
    let promise = Vue.http.get(apiUrl);
    return promise;
  },  
  getMyEntries (kind, limit, page) {  
    kind = encodeURI(kind); 
    let apiUrl = `${config.API_HOST}/entries/of/me?kind=${kind}&limit=${limit}&page=${page}&orderBy=latest`;
     
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  getEntryDetail (entryId) {  
    let apiUrl = `${config.API_HOST}/entries/${entryId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  postEntry (entry) {  
    let apiUrl = `${config.API_HOST}/entries`;
    let promise = Vue.http.post(apiUrl, entry);
    return promise;
  },  
  putEntry (entry) {  
    let entryId = entry._id || '';
    let apiUrl = `${config.API_HOST}/entries/${entryId}`;
    delete entry.id;
    let promise = Vue.http.put(apiUrl, entry);
    return promise;
  },  
  deleteEntry (entryId) {   
    let apiUrl = `${config.API_HOST}/entries/${entryId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(keywords, limit, page) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/entries/search?keywords=${keywords}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
