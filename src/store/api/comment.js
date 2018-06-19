import Vue from 'vue';
import config from '../config';

export default{
	getLatest (kind, srcId, limit, page) { 
		let apiUrl = `${config.API_HOST}/comments?kind=${kind}&srcId=${srcId}&limit=${limit}&page=${page}&orderBy=latest`;
   	let promise = Vue.http.get(apiUrl);
   	return promise;
  },
  postComment (commentInfo) {  
    let apiUrl = `${config.API_HOST}/comments`;
    let promise = Vue.http.post(apiUrl, commentInfo);
    return promise;
  }, 
  deleteComment (userId, commentId, parentId) { 
    let apiUrl = `${config.API_HOST}/comments/${commentId}?userId=${userId}`; 
    if(parentId){
      apiUrl = apiUrl + `&parentId=${parentId}`;
    }
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
};
