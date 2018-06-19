import Vue from 'vue';
import config from '../config';


export default{
	getLatest (category,era,area, limit, page) {  
    category = encodeURI(category);
    era = encodeURI(era);
    area = encodeURI(area);
    let apiUrl = `${config.API_HOST}/engineers?category=${category}&era=${era}&area=${area}&limit=${limit}&page=${page}&orderBy=latest`;
   	let promise = Vue.http.get(apiUrl);
   	return promise;
  },  
  getEngineerDetail (engineerId) {  
    let apiUrl = `${config.API_HOST}/engineers/${engineerId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getEngineerWorks (engineerId) {  
    let apiUrl = `${config.API_HOST}/engineers/${engineerId}/works`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  postEngineer (engineer) {  
    let apiUrl = `${config.API_HOST}/engineers`;
    let promise = Vue.http.post(apiUrl, engineer);
    return promise;
  },  
  putEngineer (engineer) {  
    let engineerId = engineer._id || '';
    let apiUrl = `${config.API_HOST}/engineers/${engineerId}`;
    delete engineer.id;
    let promise = Vue.http.put(apiUrl, engineer);
    return promise;
  },  
  deleteEngineer (engineerId) {   
    let apiUrl = `${config.API_HOST}/engineers/${engineerId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(keywords, limit, page) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/engineers/search?keywords=${keywords}&limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
