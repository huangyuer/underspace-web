<template>
  <div class="sidebar">
    <input type="checkbox" id="sidebar" />
    <!-- The menu -->
    <ul class="sidenav">
      <li class="top-bar">
        <router-link to="/" @click.native="closeSideBar()"  class="back-index"><span>返回首页</span></router-link>
        <router-link to="/about/us" @click.native="closeSideBar()" class="about-us"><span>关于我们</span></router-link>
        <div class="clear"></div>
      </li>
      <li class="side-item">
        <a class="link" @click="toggleSubLibs()" href="javascript:;"><b>·工程数据库</b></a>
        <ul class="down-content" v-show="isSubLibsShow">
          <li class="side-item" v-for="lib in sublibs">
            <a class="link" @click="listBooksByLib(lib.name)" href="javascript:;" ><b v-text="'·' + lib.name"></b></a>
          </li>
        </ul>
      </li>
      <li class="side-item"><a class="link" @click="closeSideBar()" href="/#/selected"><b>·工程师史</b></a></li>
      <li class="side-item"><a class="link" @click="closeSideBar()" href="http://trade.tongjix.cn/#/"><b>·版权贸易</b></a></li>
      <li class="side-item"><a class="link" @click="closeSideBar()" href="http://bbs.tongjix.cn/#/"><b>·工程技术论坛</b></a></li>
      <li class="side-item"><a class="link" @click="closeSideBar()" href="http://www.tjdesignx.com/#/"><b>·同济设计在线</b></a></li>
      <!-- <li class="side-item"><a class="link" @click="closeSideBar()" href="http://bim.tjdesignx.com/#/"><b>·BIM培训中心</b></a></li> -->

      <!--登录状态-->
      <li>
        <!--个人中心/退出-->
        <div class="sign-container" v-if="loggedIn">
          <router-link to="/user/info" @click.native="closeSideBar()" class="btn1">
            <span >个人中心</span>
          </router-link>
          <a href="javascript:;" @click="signOut()" class="btn2">
            <span>退 出</span>
          </a>
        </div>
        <!--登录/注册-->
        <div class="sign-container" v-else>
          <router-link to="/auth/login" @click.native="closeSideBar()" class="btn1">
            <span>登 录</span>
          </router-link>
          <router-link to="/auth/register" @click.native="closeSideBar()" class="btn2">
            <span>注 册</span>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {deleteCookie, getCookie, setCookie} from '../../utils/cookie'
  export default {
    data () {
      return {
        isSubLibsShow: true,
        isLoggedIn: false
      }
    },
    mounted () {
      this.$store.dispatch('listSublibs', {});
      this.checkLoginStatus();
    },
    methods: {
      // toggleSubLibs wap 切换子菜单
      toggleSubLibs: function () {
        this.isSubLibsShow = !this.isSubLibsShow
      },
      listBooksByLib: function (lib) {
        this.closeSideBar()
        this.$router.push('/book/list?lib=' + encodeURI(lib))
        this.$store.commit('setLeftBookCategory', lib)
      },
      closeSideBar: function () {
        document.getElementById('sidebar').checked = false
        this.$store.commit('setSideBarShow', false)
      },
      checkLoginStatus: function(){ 
        console.log('loggedIn', this.loggedIn); 
        if (! this.loggedIn) {
          let userId = getCookie('userId');
          console.log('userId', userId);
          if(userId){
            this.$store.commit('setLoggedIn'); 
          }
        }
      },
      // 退出登录
      signOut: function () {
        this.closeSideBar()
        deleteCookie('sessionToken')
        deleteCookie('userId')
        deleteCookie('userInfo')
        this.$store.commit('setLoggedOut')
        console.log('logged out')
        window.location.href = '/'
      },
    },
    computed: {
      sublibs () {
        return this.$store.getters.sublibs
      },
      loggedIn () { 
        return this.$store.getters.loggedIn; 
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/public/sideBar";
</style>
