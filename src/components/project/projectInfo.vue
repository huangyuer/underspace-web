<template>
  <div class="project_info_wrapper">
    <back-bar></back-bar>
    <div class="project_info">
      <div class="project_info_left">
        <h4 v-text="project.title"></h4>
        <p class="project_content" v-html="project.content"></p>
        <!-- 评论组件 -->
        <div style="margin:  0 auto;">
          <app-comment  kind="works" :srcId="worksId"></app-comment>
        </div>
        <!-- 评论组件 -->
      </div>
      <div class="project_info_right">
        <h4><span>|&nbsp;</span><span class="blue">所属年代</span></h4>
        <p>
           <span>{{project.era}}</span>
        </p>
        <h4><span>|&nbsp;</span><span class="blue">所属类别</span></h4>

        <p>
          <span v-for="category in project.categories">{{category}}&nbsp;</span>
        </p>
        <div class="project_info_right_img">
          <img v-show="project.cover === ''" src="../../assets/images/default.jpg" />
          <img v-show="project.cover !==''" :src="project.cover + '?x-oss-process=image/resize,w_230'" />
        </div>

        <div class="divider" style="margin: 30px 0;"></div>
        <h4><span>|&nbsp;</span><span v-text="project.title" class="blue"></span></h4>
        <h5 v-text="project.category"></h5>
        <h5>
          <img src="../../assets/images/eye_close_up.png"/>
          <span>{{project.clicks||0}}</span>
          <img src="../../assets/images/star.png"/>
          <span>{{project.stars||0}}</span>
          <img src="../../assets/images/chat.png"/>
          <span>{{project.comment_count||0}}</span>
        </h5>
        <div class="print" @click="clickPrint">
          <span>打印本页</span>
        </div>
        <div class="divider" style="margin: 30px 0;"></div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/project/projectInfo";
</style>

<script>
  import backBar from '../public/backBar.vue';
  import AppComment from '../public/appComment.vue';
  export default {
    data () {
      return {
      }
    },
    components: {
      backBar,
       AppComment
    },
    mounted(){
      this.getData();
    },
    computed: {
      worksError () {
          return this.$store.getters.worksError;
      },
      worksId(){
        return this.$route.params.projectId || '0';
      },
      project(){
        return this.$store.getters.worksDetail;
      }
    },
    watch:{
      worksError: {
        handler: function (val, oldVal) {
          if(val){
            this.error = val;
            this.$message({
              showClose: true,
              message: val,
              type: 'error'
            });
            this.$store.commit('clearWorksError');
          }
        },
        deep: true
      },
      '$route': 'getData'
    },
    methods: {
      getData: function() {
        this.$store.dispatch('getWorksDetail', {'worksId': this.worksId});
      },
      backHome:function(){
        this.$router.push('/project/list');
      },
      clickPrint:function(){
        window.print()
      }
    }
  }
</script>
