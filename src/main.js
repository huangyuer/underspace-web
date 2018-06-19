// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import {
  Pagination,
  Tree,
  Table,
  TableColumn,
  Button,
  MessageBox,
  Message,
  Row,
  Col,
  Dialog,
  Form,
  FormItem,
  Select,
  Upload,
  Option,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem
   
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
 
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;

import {
  AUTH_TOKEN
} from './assets/js/config'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont'

// 全局配置axios
axios.defaults.timeout = 120000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.common.Authorization = AUTH_TOKEN

// axios.defaults.baseURL = 'http://localhost:9988/v1/'

Vue.config.productionTip = false
// Vue.prototype.$axios = axios
Vue.http = axios

router.beforeEach((to, from, next) => {
  if (to.matched.length < 1) {
    next('/lost')
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
