<template>
  <div class="app-header">
    <div class="inner">

      <!--wap menu bar-->
      <div class="wap-menu-bar">
        <label for="sidebar" @click="setSideBarShow()">
          <img src="../../assets/images/wap_menu.png"/>
        </label>
      </div>

      <!--logo-->
      <div class="logo-container">
        <a href="/"><img src="../../assets/images/header-logo.png" alt=""></a>
      </div>

      <!--wap search bar-->
      <div class="wap-search-bar">
        <img src="../../assets/images/wap_search_bar.png"/>
      </div>

      <!--web端 登录状态-->
      <div class="login-container">
        <div v-if="isLoggedIn" class="grzx_grzx">
          <a href="javascript:;" @click="logout()">
            <p>退出登录</p>
          </a>
          <router-link to="/user/info">
            <img src="../../assets/images/grzx_ico1.png" alt="">
          </router-link>
        </div>
        <div v-else>
          <div @click="register" class="btn btn-register">
            <span>注 册</span>
          </div>
          <div @click="login" class="btn btn-login">
            <span>登 录</span>
          </div>
        </div>
      </div>

      <!--web端 首页 / 关于我们-->
      <div class="z_home home">
        <router-link to="/">首页</router-link>
        |
        <!-- <router-link to="/#/selected"><a href="/#/selected" class="menu_item link">工程与工程师</a></router-link>|
          <router-link to="http://trade.tjdesignx.com/#/"><a href="http://trade.tjdesignx.com/#/" class="menu_item link">版权贸易</a></router-link>|
           <router-link to="http://bbs.tjdesignx.com/#/"><a href="http://bbs.tjdesignx.com/#/" class="menu_item link">工程技术论坛</a></router-link>|
           <router-link to="http://x.tjdesignx.com/#/"><a href="http://x.tjdesignx.com/#/" class="menu_item link">同济设计在线</a></router-link>|
           <router-link to="http://bim.tjdesignx.com/#/"><a href="http://bim.tjdesignx.com/#/" class="menu_item link">BIM培训中心</a></router-link>| -->
        <router-link to="/about/us">关于我们</router-link>
      </div>


      <!--</div>-->

      <!--<div class="z_home home ">-->
      <!--<router-link to="/"><a href="javascript:void(0);">首页</a></router-link>-->
      <!--|-->
      <!--<router-link to="/about_us"><a href="javascript:void(0);">关于我们</a></router-link>-->
      <!--</div>-->

    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/css/public/appHeader.scss";
</style>
<script>

  import { getCookie, setCookie, deleteCookie } from '../../utils/cookie'

  export default {

    mounted: function () {
      // 检查登录信息 
      this.checkLoginStatus();
    },
    components: {},
    data () {
      return {
        isLoggedIn: false
      }
    },
    methods: {
      setSideBarShow: function () {
        this.$store.commit('setSideBarShow', !this.isSideBarShow)
      },
      checkLoginStatus: function(){ 
        console.log('loggedIn', this.loggedIn); 
        if (! this.loggedIn) {
          let userId = getCookie('userId');
          console.log('userId', userId);
          if(userId){
            //this.$store.commit('setLoggedIn');
            this.isLoggedIn = true;
          }
        }else{
          this.isLoggedIn = true;
        }
      },
      login: function () {
        this.$router.push('/auth/login')
      },
      register: function () {
        this.$router.push('/auth/register')
      },
      // 退出登录
      logout: function () {
        deleteCookie('sessionToken')
        deleteCookie('userInfo')
        deleteCookie('userId') 
        this.$store.commit('setLoggedOut')
        console.log('logged out')
        window.location.href = '/'
      },
    },
    watch: {
      loggedIn: {
        handler: function (val, oldVal) {  
          this.checkLoginStatus(); 
        }
      },
      '$route': 'checkLoginStatus'
    }, 
    computed: {
      isSideBarShow () {
        return this.$store.getters.isSideBarShow
      },
      loggedIn () { 
        return this.$store.getters.loggedIn; 
      },
    },
    filters: {} 
  }
</script>
