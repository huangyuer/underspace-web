<template>
	<div class="z_bg">
    <div class="grzx_main">
      <user-left-menu></user-left-menu>
      <div class="grzx_right">
    		<h2 class="new-entry-title">添加词条</h2>
    		<hr class="title-hr" />
    		<entry-form></entry-form> 
      </div>
	 </div> 
  </div>
</template>

<style>
	.new-entry-title{padding-left: 20px;}
</style>
<script> 
  import EntryForm from './entryForm.vue';
  import UserLeftMenu from './leftMenu'
  import {checkLoginCookie, getCookie} from '../../assets/js/cookie'

  export default{
    name: 'EntryCreate',
    data(){
      return {
      	'msg': 'entry create'
      }
    }, 
    mounted () {  
      let userId = getCookie('userInfo');
      if(userId === ''){ 
        this.$router.push('/auth/login');
      } else{
        this.$store.dispatch("getUserFullInfo", {'userId': this.userInfo.userId});
      }
    },
    components:{
      'entry-form': EntryForm,
      'user-left-menu': UserLeftMenu
    },
    computed: { 
       entryError () {
          return this.$store.getters.entryError;
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
    watch:{
      entryError: {
        handler: function (val, oldVal) { 
          if(val){
            this.error = val;
            this.$message({
              showClose: true,
              message: val,
              type: 'error'
            });
            this.$store.commit('clearEntryError');
          } 
        },
        deep: true
      }
    },
    methods: {
      
    } 
  }
</script>