<template>
  <div class="z_bg">
    <div class="grzx_main">
    <user-left-menu></user-left-menu>
    <div class="grzx_right">
    <div class="grzx_right1">
      <p>基本信息</p>
    </div>
    <div class="grzx_right2">
      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>手机号</p>
          <b>*</b>
        </div>
        <div class="grzx_right21r">
          <select name="" id="" class="select_1">
            <option value="">+86</option>
            <option value="">+86</option>
          </select>
          <input disabled="true" type="text" class="input_1" v-model="userForm.mobile">
        </div>
      </div>
      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>用户名</p>
          <b>*</b>
        </div>
        <div class="grzx_right21r">
          <input type="text" class="input_3 input_1" v-model="userForm.username">
        </div>
      </div>

      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>专业</p>
        </div>
        <div class="grzx_right21r">
          <input type="text" value="" v-model="userForm.speciality" class="input_3 input_1" >
        </div>
      </div>
      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>公司</p>

        </div>
        <div class="grzx_right21r">
          <input type="text" value="" v-model="userForm.company" class="input_3 input_1">
        </div>
      </div>
      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>学历</p>
        </div>
        <div class="grzx_right21r">
          <input type="text" value="" v-model="userForm.degree" class="input_3 input_1">
        </div>
      </div>
      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>邮箱</p>
        </div>
        <div class="grzx_right21r grzx_right21r">
          <input type="text" class="input_3 input_1" v-model="userForm.email">
        </div>
      </div>
      <div class="grzx_right21 grzx_right22">
        <div class="grzx_right21l">
          <p>个人简介</p>
        </div>
        <div class="grzx_right21r grzx_right21r2">
          <textarea  name="" cols="30" rows="10" v-model="userForm.intro" class="input_4"></textarea>
        </div>
      </div>
      <div class="grzx_a">
        <a href="javascript:void(0);" @click="saveUser()">更新个人信息</a>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
  import {errorHandle} from '../../assets/js/common'
  import UserLeftMenu from './leftMenu'
  import {checkLoginCookie, getCookie} from '../../assets/js/cookie'
  export default {
    name: 'UserInfo',
    data () {
      let checkRepass = (rule, value, callback) =>
      {
        if (value === '') {
          callback(new Error('请重输密码'));
        } else {
          if (value !== this.userForm.password) {
            callback(new Error('两次输入密码不一致'));
          }
          callback();
        }
      }
      ;
      let checkMobile = (rule, value, callback) =>
      {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (!validator.isMobilePhone(value, 'zh-CN')) {
            callback(new Error('请输入正确的手机号'));
          }
          callback();
        }
      };
      return {
        userForm: {
          id: '',
          username: '',
          mobile: '',
          email: '',
          avatar: '',
          company: '',
          speciality: '',
          intro: '',
          degree: '',
        },

      }
    },
    watch: {
      userError: {
        handler: function (val, oldVal) {
          if (val) {
            this.$message({
              showClose: true,
              message: 'val',
              type: 'error'
            });
            this.$store.commit('clearUserError');
          }
        },
        deep: true
      },
      userSaveStatus: {
        handler: function (val, oldVal) {
          if (val) {
            this.$message({
              showClose: true,
              message: '用户保存成功',
              type: 'success'
            });
            this.$router.push('/user/info');
          }
        },
        deep: true
      },
      userDetailReady: {
        handler: function (val, oldVal) {
          this.getData();
        },
        deep: true
      },
      nicknameExists: {
        handler: function (val, oldVal) {
          if (val) {
            this.$message({
              showClose: true,
              message: '昵称已存在，请重新输入',
              type: 'error'
            });
          }
        },
        deep: true
      }
    },
    computed: {
      userDetail(){
        return this.$store.getters.userDetail;
      },
      userDetailReady(){
        return this.$store.getters.userDetailReady;
      },
      userSaveStatus(){
        return this.$store.getters.userSaveStatus;
      },
      userInfo () {
        let userInfo = getCookie('userInfo');
        if (userInfo) {
          let user = JSON.parse(userInfo);
          return user;
        } else {
          return this.$store.getters.userInfo;
        }
      },
    },
    components:{
      'user-left-menu': UserLeftMenu
    },
    methods: {
      getData: function () {
        if(this.userDetail){
          for (let k in this.userDetail) {
            this.userForm[k] = this.userDetail[k];
          }
        } 
      },
      saveUser: function () {
        this.$store.dispatch('putUser', this.userForm);
      }
    },
    mounted () {
      //this.initData()
      let userId = getCookie('userInfo');
      if(userId !== ''){
        this.$store.dispatch("getUserFullInfo", {'userId': this.userInfo.userId})
      }else{
        this.$router.push('/auth/login')
      }
    }
  }
</script>

<style>
</style>
