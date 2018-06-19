<template>
  <div class="log">
    <p>欢迎回来</p>
    <div class="zhmm2">
      <input type="text" placeholder="手机号" v-model="phone">
    </div>
    <div class="zhmm2">
      <input type="password" placeholder="密码" v-model="password">
    </div>
    <div class="zhmm2">
      <input type="checkbox" class="input_555" v-model="isRemembered">
      <span>记住我</span>
      <router-link to="/auth/password/reset">
        <em><a href="javascript:void(0);">找回密码</a></em>
      </router-link>
    </div>
    <div class="clear"></div>
    <small><a href="javascript:void(0);" @click="login()">登录</a></small>
    <strong>还没有账号？
      <router-link to="/auth/register"><a href="javascript:void(0);">注册</a></router-link>
    </strong>
  </div>
</template>

<script>
  import {setCookie, updateCookie, checkLoginCookie} from '../../assets/js/cookie'
  import Vue from 'vue'
  import {errorHandle} from '../../assets/js/common'
  import authApi from '../../store/api/auth'
  
  export default {
    name: 'sign_in',
    data () {
      return {
        phone: '',
        password: '',
        isRemembered: false
      }
    },
    computed: {
      loginError () {
        return this.$store.getters.loginError;
      },
      loggedIn () {
        return this.$store.getters.loggedIn;
      }
    },
    watch: {
      loggedIn: {
        handler: function (val, oldVal) {
          console.log('loggedIn');
          if(val){
            this.$router.push({path: '/'});
          }
        }
      }
    },
    methods: {
      checkLoginValidation: function () {
        let msg = "";
        if (this.phone === '' || this.password === '') {
          msg = "用户名或密码不能为空";
        }
        return msg;
      },
      // 登录
      // login: function() {
      //   let msg = this.checkLoginValidation();
      //   if (msg !== '') {
      //       alert(msg);
      //       return;
      //   }
      //   this.$store.dispatch('login', {'username': this.phone, 'password': this.password});
      // },
      login: function() {
        let msg = this.checkLoginValidation();
        if (msg !== '') {
            alert(msg);
            return;
        }
        let promise = authApi.login(this.phone, this.password);
        let self = this;
        promise.then(function(response){
          console.log(JSON.stringify(response.data)); 
          let userId = response.data.userId;
          let token = response.data.sessionToken; 
          let user = {
            userId: userId,
            sessionToken: token, 
            nickname: response.data.nickname,
            avatar: response.data.avatar,
          };
          self.$store.commit('setUserInfo', user);
          self.$store.commit('setLoggedIn'); 
          self.$store.commit('hideAllDialog'); 
          if(token.indexOf('Bearer') !== 0){
            token = 'Bearer ' + token;
          }
          setCookie('sessionToken', token, 7);
          setCookie('userId', userId, 7); 
          setCookie('userInfo', JSON.stringify(user), 7); 
        }, function(error){
          console.log(error); 
          alert('登录失败：' + error.response.data.error)
        });
        // this.$store.dispatch('login', {'username': this.phone, 'password': this.password});
      },
      // 检查是否已登录
      checkLoginStatus: function () {
        if (this.loggedIn) {
          // 若未失效则跳转到首页
          alert('您已登录！将转至首页！')
          this.$router.push({path: '/'})
        }
      }
    },
    mounted () {
      //this.checkLoginStatus()
    }
  }
</script>

<style>
</style>
