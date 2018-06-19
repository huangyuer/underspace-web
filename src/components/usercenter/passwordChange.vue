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
          <p>旧密码</p>

        </div>
        <div class="grzx_right21r">
          <input type="password" v-model="passwordForm.oldPassword" value="" class="input_3 input_1">
        </div>
      </div>
      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>新密码</p>

        </div>
        <div class="grzx_right21r">
          <input type="password" v-model="passwordForm.newPassword" value="" class="input_3 input_1">
        </div>
      </div>
      <div class="grzx_right21">
        <div class="grzx_right21l">
          <p>确认密码</p>

        </div>
        <div class="grzx_right21r">
          <input type="password" value="" v-model="passwordForm.rePassword" class="input_3 input_1">
        </div>
      </div>


      <div class="grzx_a">
        <a href="javascript:void(0);" @click="changePassword()">确认</a>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<style>
    .reset-password-container {
        padding: 62px;
    }

    .reset-password-container > div {
        margin-top: 25px;
    }

    .reset-password-container > div > span {
        display: inline-block;
        width: 58px;
    }

    .reset-password-container > div:first-child {
        margin-top: 0;
    }

    .reset-password-container > div:first-child > span {
        display: inline;
    }

    .reset-password-container > div > input {
        margin-left: 59px;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        border: 1px solid #DFDFDF;
        width: 220px;
    }

    .reset-password-container > div:last-child > input {
        margin-left: 44px;
    }

    .reset-password-container > div:last-child > span {
        display: inline;
    }

    .reset-password-container > div:last-child {
        margin: 25px auto auto auto;
        width: 135px;
        height: 30px;
        text-align: center;
        color: #ffffff;
        background-color: #F04D4E;
        user-select: none;
        line-height: 30px;
        border-radius: 3px;
        cursor: pointer;
    }
</style>
<script>
  import validator from 'validator';
  import UserLeftMenu from './leftMenu'
  import {getCookie, deleteCookie} from '../../utils/cookie';
  export default{
    name: 'PasswordForm',
    data(){
      return {
        passwordForm: {
          id: '',
          oldPassword: '',
          newPassword: '',
          rePassword: ''
        }
      }
    },
    props: [],
    mounted: function(){

    },
    beforeCompile: function () {
      //this.init();
    },
    components:{
      'user-left-menu': UserLeftMenu
    },
    computed: {
      loggedUser(){
        return this.$store.getters.loggedUser;
      },
      changePasswordStatus(){
        return this.$store.getters.changePasswordStatus;
      },
      passwordError(){
        return this.$store.getters.passwordError;
      }
    },
    watch:{
       passwordError: {
        handler: function (val, oldVal) {
          if(val !== ''){
            this.error = val;
            this.$message({
              showClose: true,
              message: val,
              type: 'error'
            });
          }
          //this.$store.commit('setPasswordError', '');
        },
        deep: true
      },
      changePasswordStatus: {
        handler: function (val, oldVal) {
          if (val) {
            this.$message({
              showClose: true,
              message: '密码修改成功',
              type: 'success'
            });
          }
        },
        deep: true
      }
    },
    methods: {
      checkValidation: function(){
        let msg = "";
        if (this.passwordForm.rePassword === '' || this.passwordForm.oldPassword === '' || this.passwordForm.newPassword === '' ) {
          msg = "密码不能为空";
        } else {
          if(this.passwordForm.newPassword.length < 6){
            msg = "密码长度至少为6位以上";
          }
          if (this.passwordForm.oldPassword  === this.passwordForm.newPassword ) {
             msg = "新旧密码不能相同";
          }
          if (this.passwordForm.rePassword  !== this.passwordForm.newPassword ) {
             msg = "两次输入密码不一致";
          }
        }
        return msg;
      },
      changePassword: function() {
        let msg = this.checkValidation();
        if(msg != ''){
            this.$message({
              showClose: true,
              message: msg,
              type: 'error'
            });
            return;
        }else {
          if(this.loggedUser.userId){
            this.passwordForm.id = this.loggedUser.userId;
            this.$store.dispatch('changePassword', this.passwordForm);
          }
        }
      },
      checkOldPassword: function(){
        this.$store.dispatch('checkOldPassword', this.passwordForm);
      }
    }
  }
</script>
