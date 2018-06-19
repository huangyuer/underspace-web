import Vue from 'vue';
import config from '../config';

export default{
    listCategories (limit, page) { 
        let apiUrl = `${config.API_HOST}/categories?limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  listSubjects (limit, page) { 
    let apiUrl = `${config.API_HOST}/categories/subjects?limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  listSublibs (limit, page) { 
    let apiUrl = `${config.API_HOST}/categories/sublibs?limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  },
  listClcs (limit, page) { 
    let apiUrl = `${config.API_HOST}/categories/clcs?limit=${limit}&page=${page}`;
    let promise = Vue.http.get(apiUrl);
    return promise;
  }, 
  updateCategory (category) { 
    let id = category._id; 
    delete category._id;
        let apiUrl = `${config.API_HOST}/categories/${id}`;
    let promise = Vue.http.put(apiUrl, category);
    return promise;
  },
  deleteCategory (id) { 
        let apiUrl = `${config.API_HOST}/categories/${id}`;
    let promise = Vue.http.delete(apiUrl);
    return promise;
  },
  createCategory (name, parentId) { 
        let apiUrl = `${config.API_HOST}/categories`;
    let promise = Vue.http.post(apiUrl, {name: name, parentId: parentId});
    return promise;
  },  
  createSibling (name, currentId) { 
    let apiUrl = `${config.API_HOST}/categories/create/sibling`;
    let promise = Vue.http.post(apiUrl, {name: name, currentId: currentId});
    return promise;
  }, 
  createChild (name, parentId) { 
    let apiUrl = `${config.API_HOST}/categories/${parentId}/create/child`;
    let promise = Vue.http.post(apiUrl, {name: name});
    return promise;
  },
  moveCategory (srcId, srcParentId, destId) { 
        let apiUrl = `${config.API_HOST}/categories/${srcId}/moveto/${destId}`;
    let promise = Vue.http.put(apiUrl, {'srcParentId': srcParentId});
    return promise;
  },
  copyCategory (srcId, destId) { 
    let apiUrl = `${config.API_HOST}/categories/${srcId}/copyto/${destId}`;
    let promise = Vue.http.put(apiUrl, {});
    return promise;
  },
};
