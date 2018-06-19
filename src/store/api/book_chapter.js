import Vue from 'vue';
import config from '../config';


export default{
  listBookChapters (bookId, limit, page) {   
    let apiUrl = `${config.API_HOST}/book/chapters?bookId=${bookId}&limit=${limit}&page=${page}`;
     
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  getBookChapterDetail (bookChapterId) {  
    let apiUrl = `${config.API_HOST}/book/chapters/${bookChapterId}/details`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  getBookChapterBySrc (bookId, src) {  
    let apiUrl = `${config.API_HOST}/book/chapters/bookId/${bookId}/chapter?src=${src}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  postBookChapter (bookChapter) {  
    let apiUrl = `${config.API_HOST}/book/chapters`;
    let promise = Vue.http.post(apiUrl, bookChapter);
    return promise;
  },  
  putBookChapter (bookChapter) {  
    let bookChapterId = bookChapter._id || '';
    let apiUrl = `${config.API_HOST}/book/chapters/${bookChapterId}`;
    delete bookChapter.id;
    let promise = Vue.http.put(apiUrl, bookChapter);
    return promise;
  },  
  deleteBookChapter (bookChapterId) {   
    let apiUrl = `${config.API_HOST}/book/chapters/${bookChapterId}`; 
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  search(keywords, limit, chapter) { 
    keywords = encodeURI(keywords);
    let apiUrl = `${config.API_HOST}/book/chapters/search?keywords=${keywords}&limit=${limit}&chapter=${chapter}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
};
