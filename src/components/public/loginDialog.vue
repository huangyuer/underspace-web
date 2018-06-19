<template> 
    <div id="login-dialog">
        <el-dialog title="登录" @close="hideLoginDialog();" top="5%" size="tiny" :visible.sync="loginDialogVisible">
              <el-form :model="loginForm">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="loginForm.username" auto-complete="off"></el-input>
            </el-form-item> 
              
             <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input type="password"  v-model="loginForm.password" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer"> 
            <el-button type="primary" @click="login">确 定</el-button>
            <el-button @click="hideLoginDialog">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<style> 

    #login-dialog .iconfont {
        margin: 20px;
        font-size: 48px;
        color: #ccc;
    }

    .login-dialog-title {
        font-size: 20px;
        text-align: center;
    }

    .el-tabs__header {
        border-bottom: 0px;
    }

    .el-tabs {
        width: 100%;
    }

    .login-btn {
        width: 100%;
    }

    hr {
        color: #ccc;
        margin-left: -20px;
        margin-right: -20px;
        padding-left: 0px;
        padding-right: 0px;
    }

    .forget-password-btn {
        float: right;
    }

    .dialog-footer {
        margin: auto;
        text-align: center;
    }

    .form-error {
        margin-bottom: 10px;
    }

</style>
<script>
  import authApi from '../../store/api/auth';
  import {setCookie, updateCookie, checkLoginCookie} from '../../assets/js/cookie'
  export default{
    name: 'LoginDialog', 
    data(){
      return {
        msg: '请登录',
        checked: false,
        formLabelWidth: '120px',
        loginForm: {
          username: '',
          password: '',
        }, 
        rules: {
          username: [
            { required: true, message: '请输入邮箱或密码', trigger: 'blur' }, 
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }, 
            { min: 6, max: 12, message: '长度一般为6-12个字母数字', trigger: 'blur' }
          ],
        }
      }
    },
    components: {
       
    },
    computed: { 
      loggedIn () {
          return this.$store.getters.loggedIn; 
      },
      loginDialogVisible(){
        return this.$store.getters.loginDialogVisible; 
      },
      rootUrl(){
        return this.$store.getters.rootUrl;
      }
    },
    methods: {
      login: function() {  
        // 登录
        let promise = authApi.login(this.loginForm.username, this.loginForm.password);
        let self = this;
        promise.then(function(response){
          console.log(response.data.status);
          if(response.data.success !== true){
            alert('用户名或密码错误，登录失败！'); 
          }else{
            self.$store.commit('setLoggedIn');
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
            self.hideLoginDialog();
          }
        }, function(error){
          console.log(error);
          alert('用户名或密码错误，登录失败！');
        });
      },
      openLoginDialog: function () {
        this.$store.commit('showLoginDialog');
         
      },
      hideLoginDialog: function () {
        this.$store.commit('hideLoginDialog');
      },
    }
  }
</script>
