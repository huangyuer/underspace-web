<template>
  <div class="z_bg">
    <div class="grzx_main">
      <user-left-menu></user-left-menu>
      <div class="grzx_right">
      	<div id="entry-create">
      		<h4>修改词条</h4>
      		<hr class="title-hr" /> 
      		<entry-form :entryDetail='entryDetail'></entry-form>
      	</div> 
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
    name: 'EntryEdit',
    data(){
      return {
      	'msg': 'entry edit'
      }
    }, 
    components:{
       'entry-form': EntryForm,
       'user-left-menu': UserLeftMenu
    },
    created:function(){
      this.getData();
    },
    computed: { 
      entryError () {
          return this.$store.getters.entryError;
      },
      entryId(){ 
        console.log(this.$route.params.id);
        return this.$route.params.id || 0;
      },
      entryDetail(){
        return this.$store.getters.entryDetail;
      }
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
      },
      '$route': 'getData'
    },
    methods: {
      getData: function() { 
        this.$store.dispatch('getEntryDetail', {'entryId': this.$route.params.id || 0 });    
      }
    }  
  }
</script>