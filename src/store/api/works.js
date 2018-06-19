import Vue from 'vue';
import config from '../config';


export default{
	getLatest (category,era, area, limit, page) {  
    category = encodeURI(category);
    era = encodeURI(era);
    area = encodeURI(area);
    let apiUrl = `${config.API_HOST}/works?category=${category}&era=${era}&area=${area}&limit=${limit}&page=${page}&orderBy=latest`;
    
   	let promise = Vue.http.get(apiUrl);
   	return promise;
  }, 
  getWorksDetail (worksId) {  
    let apiUrl = `${config.API_HOST}/works/${worksId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  postWorks (works) {  
    let apiUrl = `${config.API_HOST}/works`;
    let promise = Vue.http.post(apiUrl, works);
    return promise;
  },  
  putWorks (works) {  
    let worksId = works._id || '';
    let apiUrl = `${config.API_HOST}/works/${worksId}`;
    delete works.id;
    let promise = Vue.http.put(apiUrl, works);
    return promise;
  },  
  deleteWorks (worksId) {   
    let apiUrl = `${config.API_HOST}/works/${worksId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(keywords, limit, page) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/works/search?keywords=${keywords}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
