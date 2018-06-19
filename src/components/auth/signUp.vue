<template>
  <div class="reg">
    <p>账号注册</p>
    <div class="zhmm2">
      <input type="text" placeholder="请输入手机号" class="input_111" v-model="phone">
    </div>
    <div class="zhmm3">
      <input type="text" placeholder="验证码" v-model="vercode">
      <a id="btn-get-vercode" href="javascript:void(0);" @click="getVerCode()">{{text}}</a>
    </div>
    <div class="clear"></div>
    <div class="zhmm2">
      <input type="password" placeholder="请输入密码" class="input_333" v-model="password">
    </div>
    <div class="zhmm2">
      <input type="password" placeholder="请再一次输入密码" class="input_444" v-model="repassword">
    </div>
    <small>注册代表您已经阅读并同意<a href="javascript:void(0);"><b>《同济工程数据库用户协议》</b></a></small>
    <em><a href="javascript:void(0);"  @click="register()">注 册</a></em>
    <strong>已有账号？
       去<router-link to="/auth/login"><a href="javascript:void(0);">登录</a></router-link>
    </strong>
  </div>
</template>

<script>
  import {setCookie, checkLoginCookie} from '../../assets/js/cookie'
  import {errorHandle} from '../../assets/js/common'
  import validator from 'validator'
  import Vue from 'vue'
  import api from '../../store/api/auth';

  export default {
    name: 'sign_up',
    props: {
      second: {
        type: Number,
        default: 30
      }
    },
    data () {
      return {
        phone: '',
        password: '',
        repassword: '',
        vercode: '',
        time: 0
      }
    },
    computed: {
      loginError () {
        return this.$store.getters.loginError;
      },
      text() {
        return this.time > 0 ? this.time + '秒后重试' : '获取验证码'
      },
      loggedIn () {
        return this.$store.getters.loggedIn;
      },
      registered(){
        return this.$store.getters.registered;
      },
      registerSuccess(){
        return this.$store.getters.registerSuccess;
      },
      registerError(){
        return this.$store.getters.registerError;
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
      },
      registerSuccess: {
        handler: function (val, oldVal) {
          if(val){
            this.$router.push({path: '/'});
          }
        }
      },
      registerError: {
        handler: function (val, oldVal) {
          alert(val);
        }
      }
    },
    methods: {
      register: function() {
        // 检查手机号是否有效
        if(this.phone === '' || !validator.isMobilePhone(this.phone, 'zh-CN')){
          alert('请输入有效的手机号');
          return;
        }
        // 检查验证码和密码是否输入
        if(this.password === '' || this.vercode === ''){
          alert('请输入密码和验证码');
          return;
        }
        // 检查密码长度
        if(this.password.length < 6){
          alert('密码至少为6位以上的字母或者数字组合');
          return;
        }
        // 检查密码是否有非法字符

        // 检查两次输入密码是否一致
        if(this.password !== this.repassword){
          alert('两次输入密码不一致');
          return;
        }
        this.$store.dispatch('registerByMobile', {'username': this.phone,'vercode': this.vercode, 'mobile': this.phone, 'password': this.password, 'repassword': this.repassword});
      },
      stopClick: function(){
        if(this.time > 0){
          return true;
        }else{
          return false;
        }
      },
      getVerCode: function(){
        if(this.registered){
          this.$router.push('/');
        }
        // 检查手机号是否有效
        if(this.phone === '' || !validator.isMobilePhone(this.phone, 'zh-CN')){
          alert('请输入有效的手机号');
          return;
        }
        // 检查手机是否已注册
        let promise = api.checkRegisterStatus(this.phone);
        let self = this;
        promise.then(function(response){
          console.log(response.data.status);
          if(response.data.status === true){
            alert('手机已注册，请直接登录');
            self.$router.push('/auth/login');
          }else{
            if(self.time === 0){
              self.$store.dispatch('getVercode', {'mobile': self.phone, 'kind': 'REGISTER'});
            }
            self.time = self.second;
            self.timer();
          }
        }, function(error){
          alert(error);
          console.log(error);
        });
      },
      timer() {
        if (this.time > 0) {
          //document.getElementById("btn-get-vercode").disabled = ' disabled';
          this.time = this.time - 1;
          setTimeout(this.timer, 1000);
        }
      }
    },
    mounted () {
      if(this.loggedIn){
        this.$router.push('/');
      }
    }
  }
</script>

<style>
</style>
