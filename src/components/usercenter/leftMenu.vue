<template> 
      <div class="grzx_left">
        <div class="grzx_left1">个人中心</div>
        <div v-if="userInfo.avatar" class="grzx_left2"><img :src="userInfo.avatar" alt=""></div>
        <div v-if="! userInfo.avatar" class="grzx_left2"><img src="../../assets/images/logo.png" alt=""></div>
        <div class="grzx_left3">
          <ul>
            <router-link to="/user/info"><li><a href="javascript:void(0);">基本信息</a></li></router-link>
             <router-link to="/user/password/change"><li><a href="javascript:void(0);">修改密码</a></li></router-link>
            <router-link to="/user/favorites"><li><a href="javascript:void(0);">收藏夹</a></li></router-link>
            <router-link to="/user/list/entries"><li><a href="javascript:void(0);">我的词条</a></li></router-link>
           <!--  <router-link to="/user/messages"><li><a href="javascript:void(0);">站内信</a></li></router-link>  -->
          </ul>
        </div>
      </div> 
    
</template>

<script>
  import {checkLoginCookie, getCookie} from '../../assets/js/cookie'
  import {errorHandle} from '../../assets/js/common'

  export default {
    name: 'UserLeftMenu',
    data () {
      return {
        avatarUrl: ''
      }
    },
    computed: {
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
    methods: {
      
    },
    mounted () { 
    }
  }
</script>

<style>
</style>
