import Vue from 'vue';
import config from '../config';


export default{
  getLatest (magazineId,  limit, page) { 
    let apiUrl = `${config.API_HOST}/issues?magazineId=${magazineId}&limit=${limit}&page=${page}&orderBy=latest`;
    
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  getRelated (issueId,  limit, page) { 
    let apiUrl = `${config.API_HOST}/issues/related?issueId=${issueId}&limit=${limit}&page=${page}&orderBy=latest`;
    
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  getHottest (category, limit, page) { 
    category = encodeURI(category);
        let apiUrl = `${config.API_HOST}/issues?category=${category}&limit=${limit}&page=${page}&orderBy=hottest`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getIssueDetail (issueId) {  
    let apiUrl = `${config.API_HOST}/issues/${issueId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  search(keywords, limit, page) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/issues/search?keywords=${keywords}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
