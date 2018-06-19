<template>
  <div class="zhmm">
    <div class="zhmm1">
      <p>找回密码</p>
    </div>
    <div class="zhmm2">
      <input type="text" placeholder="请输入手机号" v-model="form.mobile">
    </div>
    <div class="zhmm3">
      <input type="text" placeholder="验证码" v-model="form.vercode">
      <a id="btn-get-vercode" href="javascript:void(0);" @click="getVerCode()">{{text}}</a>
    </div>
    <div class="zhmm2">
      <input type="password" placeholder="请输入密码" v-model="form.password">
    </div>
    <div class="zhmm2">
      <input type="password" placeholder="请再次输入密码" v-model="form.rePassword">
    </div>
    <div class="zhmm4">
      <a href="javascript:void(0);" @click="pswReset()">确认</a>
    </div>
  </div>
</template>

<script>
  import {errorHandle} from '../../assets/js/common'
  import {checkLoginCookie} from '../../assets/js/cookie'
  import validator from 'validator'
  import authApi from '../../store/api/auth';
  import userApi from '../../store/api/user';

  export default {
    name: 'psw_reset',
    props: {
      second: {
        type: Number,
        default: 30
      }
    },
    data () {
      return {
        form: {
          mobile: '',
          password: '',
          rePassword: '',
          vercode: '',
        }, 
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
      }
    },
    methods: {
      // 检查手机是否注册过 
      getVerCode: function(){ 
        // 检查手机号是否有效
        if(this.form.mobile === '' || !validator.isMobilePhone(this.form.mobile, 'zh-CN')){
          alert('请输入有效的手机号');
          return;
        }
        // 检查手机是否已注册
        let promise = authApi.checkRegisterStatus(this.form.mobile);
        let self = this;
        promise.then(function(response){
          console.log(response.data.status);
          if(response.data.status !== true){
            alert('手机尚未注册，请先注册');
            self.$router.push('/auth/register');
          }else{
            if(self.time === 0){
              self.$store.dispatch('getVercode', {'mobile': self.form.mobile, 'kind': 'CHANGE_PASSWORD'});
            }
            self.time = self.second;
            self.timer();
          }
        }, function(error){
          console.log(error);
        });
      },
      timer() {
        if (this.time > 0) {
          //document.getElementById("btn-get-vercode").disabled = ' disabled';
          this.time = this.time - 1;
          setTimeout(this.timer, 1000);
        }
      }, 
      // 找回密码
      pswReset: function () {
        let promise = userApi.resetPasswordByMobile(this.form);
        let self = this;
        promise.then(function(response){
          console.log(response.data.success);
          if(response.data.success === true){
            alert('密码重置成功');
            self.$router.push('/auth/login') 
          }else{
            alert('密码重失败');
          }
        }, function(error){
          console.log(error);
        });
      },
      // 检查是否登录或token是否失效
      checkToken: function () {
        if (checkLoginCookie()) {
          // 若未失效则跳转到首页
          alert('您已登录！将转至首页！')
          this.$router.push({path: '/'})
        }
      }
    },
    mounted () {
      this.checkToken()
    }
  }
</script>

<style>
</style>
